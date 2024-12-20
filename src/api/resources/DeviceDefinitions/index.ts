import { Resource } from '../../Resource';
import { DimoEnvironment } from '../../../environments';

export class DeviceDefinitions extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'DeviceDefinitions', env);
        this.setResource({
            decodeVin: {
                method: 'POST',
                path: '/device-definitions/decode-vin',
                body: {
                    countryCode: true,
                    vin: true
                },
                auth: 'developer_jwt'
            },
            search: {
                method: 'GET',
                path: '/device-definitions/search',
                queryParams: {
                    query: true,
                    makeSlug: false,
                    modelSlug: false,
                    year: false,
                    page: false,
                    pageSize: false
                }
            }
        })
    }
        
}