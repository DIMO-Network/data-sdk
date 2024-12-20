import { DIMO } from '../../dimo';
import { DimoEnvironment } from '../../environments';
import { DimoError } from '../../errors';

export const getVin = async(input: { headers: any, tokenId: string }, env: keyof typeof DimoEnvironment) => {
    const sdk = new DIMO(env);
    let result;

    try {
        const getVinVC = await sdk.attestation.createVinVC({
            headers: input.headers,
            tokenId: input.tokenId
        });
        if (getVinVC) {
            const vin = await sdk.telemetry.getLatestVinVC({
                headers: input.headers,
                tokenId: input.tokenId
            });
            result = vin.data.vinVCLatest.vin;
            return result;
        } else {
            throw new DimoError({
                message: `Error getting attestation, make sure that you have the correct permissions.`,
                statusCode: 400
            });
        }
    } catch(error: any) {
        console.error(error);
        throw new DimoError({
            message: `Error getting VIN: ${error}`,
            statusCode: 400
        });
    }
}