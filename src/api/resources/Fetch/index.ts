import { Resource } from '../../Resource';
import { DimoEnvironment } from '../../../environments';

export class Fetch extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Fetch', env);
        this.setResource({
            getIndexKeys: {
                method: 'GET',
                path: '/v1/vehicle/index-keys/:tokenId',
                queryParams: {
                    after: false,
                    before: false,
                    id: false,
                    limit: false,
                    producer: false,
                    source: false,
                    type: false
                },
                auth: 'vehicle_jwt'
            },
            getLatestIndexKey: {
                method: 'GET',
                path: '/v1/vehicle/latest-index-key/:tokenId',
                queryParams: {
                    after: false,
                    before: false,
                    id: false,
                    limit: false,
                    producer: false,
                    source: false,
                    type: false
                },
                auth: 'vehicle_jwt'
            },
            getLatestObject: {
                method: 'GET',
                path: '/v1/vehicle/latest-object/:tokenId',
                queryParams: {
                    after: false,
                    before: false,
                    id: false,
                    limit: false,
                    producer: false,
                    source: false,
                    type: false
                },
                auth: 'vehicle_jwt'
            },
            getObjects: {
                method: 'GET',
                path: '/v1/vehicle/objects/:tokenId',
                queryParams: {
                    after: false,
                    before: false,
                    id: false,
                    limit: false,
                    producer: false,
                    source: false,
                    type: false
                },
                auth: 'vehicle_jwt'
            }
        })
    }
}
