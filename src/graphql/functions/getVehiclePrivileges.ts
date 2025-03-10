import { DIMO } from '../../dimo';
import { DimoEnvironment } from '../../environments';
import { DimoError } from '../../errors';
import { paginate } from '../util/paginate';

export const getVehiclePrivileges = async (input: { headers: any, tokenId: string, clientId?: string }, env: keyof typeof DimoEnvironment) => {
    const sdk = new DIMO(env);

    try {
        const getSacds = async (after: string | undefined) => {
            const response = await sdk.identity.listSacdPerVehicleTokenId({
                tokenId: input.tokenId,
                after
            });

            const sacds = response.data?.vehicle?.sacds || [];
            const pageInfo = response.data?.vehicle?.sacds.pageInfo || { endCursor: null };
            const totalCount = response.data?.vehicle?.sacds?.totalCount || null;

            if (input.clientId) {
                const matchingSacd = sacds.nodes.find((sacd: any) => sacd.grantee === input.clientId);
                if (matchingSacd) {
                    return {
                        nodes: [matchingSacd],
                        pageInfo: { endCursor: null },
                        totalCount: 1
                    }
                }
            }

            return {
                nodes: sacds,
                pageInfo,
                totalCount
            };
        };
        
        if (input.clientId) {
            const { nodes } = await getSacds(undefined);
            if (nodes.length > 0) {
                return nodes;
            }
        }

        return await paginate(getSacds);

    } catch (error: any) {
        console.error(error);
        throw new DimoError({
            message: `Error getting vehicle privileges: ${error.message || error}`,
            statusCode: 400
        });
    }
};
