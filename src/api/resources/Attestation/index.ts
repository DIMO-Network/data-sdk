import { Resource } from '../../Resource';
import { DimoEnvironment } from '../../../environments';

export class Attestation extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Attestation', env);
        this.setResource({
            createVinVC: {
                method: 'POST',
                path: '/v1/vc/vin/:tokenId',
                auth: 'privilege_token',
                queryParams: {
                  'force': true
                }
            },
            createPomVC: {
                method: 'POST',
                path: '/v1/vc/pom/:tokenId',
                auth: 'privilege_token'
            }
        })
    }
}
