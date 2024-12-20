import { Resource } from '../../Resource';
import { DimoEnvironment } from '../../../environments';

export class Valuations extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Valuations', env);
        this.setResource({
            getValuations: {
                method: 'GET',
                path: '/v2/vehicles/:tokenId/valuations',
                auth: 'vehicle_jwt'
            },
            getInstantOffers: {
                method: 'GET',
                path: '/v2/vehicles/:tokenId/instant-offer',
                auth: 'vehicle_jwt'
            },
            getOffers: {
                method: 'GET',
                path: '/v2/vehicles/:tokenId/offers',
                auth: 'vehicle_jwt'
            }
        })
    }
}