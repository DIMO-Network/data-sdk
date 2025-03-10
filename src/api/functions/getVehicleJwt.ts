import { DIMO } from '../../dimo';
import { DimoEnvironment } from '../../environments';
import { decodeJwt, decodePermissions } from '../../util';

export const getVehicleJwt = async(input: { headers: { Authorization: string }, tokenId: number }, env: keyof typeof DimoEnvironment) => {
    const sdk = new DIMO(env);
    const developerJwt = input.headers.Authorization;

    if (!developerJwt || !developerJwt.startsWith('Bearer ')) {
        throw new Error('Invalid Authorization header format');
    }

    // Remove "Bearer " prefix
    const decodedToken = decodeJwt(developerJwt.slice(7));
    const clientId = decodedToken.ethereum_address;

    const privileges = await sdk.identity.getVehiclePrivileges({ 
        tokenId: input.tokenId,
        clientId: clientId // We want to pass in the clientId
    })

    const decodedPrivileges = decodePermissions(privileges[0].permissions);

    const vehicleJwt = await sdk.tokenexchange.exchange({
        ...input,
        privileges: decodedPrivileges,
        tokenId: input.tokenId
    });

    return vehicleJwt;
}