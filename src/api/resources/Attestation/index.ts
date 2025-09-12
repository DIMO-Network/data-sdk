import { Resource } from '../../Resource';
import { DimoEnvironment } from '../../../environments';

export class Attestation extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Attestation', env);
        this.setResource({
            createVinVC: {
                method: 'POST',
                path: '/v2/attestation/vin/:tokenId',
                auth: 'vehicle_jwt'
            },
            createOdometerStatementVC: {
                method: 'POST',
                path: '/v2/attestation/odometer-statement/:tokenId',
                auth: 'vehicle_jwt',
                body: {
                    'timestamp': false  // Optional parameter
                }
            },
            createVehicleHealthVC: {
                method: 'POST',
                path: '/v2/attestation/vehicle-health/:tokenId',
                auth: 'vehicle_jwt',
                body: {
                    'startTime': true,  // Required parameter
                    'endTime': true     // Required parameter
                }
            },
            createVehiclePositionVC: {
                method: 'POST',
                path: '/v2/attestation/vehicle-position/:tokenId',
                auth: 'vehicle_jwt',
                body: {
                    'timestamp': true   // Required parameter
                }
            }
        })
    }
}
