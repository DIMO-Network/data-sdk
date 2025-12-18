import { Resource } from '../../Resource';
import { DimoEnvironment } from '../../../environments';

export class Telemetry extends Resource {
    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Telemetry', env);
        this.query({
            auth: 'vehicle_jwt',
            query: true,
        }), 
        this.setQueries({
            getLatestSignals: {
                auth: 'vehicle_jwt',
                params: {
                    tokenId: true
                },
                query: `
                query {
                    SignalsLatest(tokenID: $tokenId){
                        powertrainTransmissionTravelledDistance {
                            timestamp
                            value
                        }
                        exteriorAirTemperature {
                            timestamp
                            value
                        }
                        speed{
                            timestamp
                            value
                        }
                        powertrainType{
                            timestamp
                            value
                        }
                    }
                }`
            },
            getLatestVinVC: {
                auth: 'vehicle_jwt',
                params: {
                    tokenId: true
                },
                query: `
                    query {
                        vinVCLatest(tokenId: $tokenId) {
                            vin
                        }
                }`
            },
            getVin: {
                auth: 'vehicle_jwt',
                method: 'FUNCTION',
                path: 'getVin',
            },
            getTrips: {
                auth: 'vehicle_jwt',
                method: 'FUNCTION',
                path: 'getTrips',
            }
        })
    }

}