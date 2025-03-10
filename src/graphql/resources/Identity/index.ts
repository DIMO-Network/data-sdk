import { Resource } from '../../Resource';
import { DimoEnvironment } from '../../../environments';
import { DimoConstants } from '../../../constants';

export class Identity extends Resource {
    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Identity', env);
        this.query({
          query: true
        }), 
        this.setQueries({
          getVehiclePrivileges: {
            method: 'FUNCTION',
            path: 'getVehiclePrivileges',
          },
          listSacdPerVehicleTokenId: {
            params: {
              tokenId: true,
              after: true
            },
            query: `
            { 
              vehicle(tokenId: $tokenId) {
                sacds(first: ${DimoConstants.Query.PAGE_SIZE}, after: $after) {
                  nodes {
                    permissions
                    grantee
                  }
                  totalCount
                  pageInfo {
                    startCursor
                    endCursor
                  }
                }
              }
            }
            `
          },
          countDimoVehicles: {
            query: `
            { 
              vehicles (first: ${DimoConstants.Query.PAGE_SIZE}) {
                  totalCount,
              }
            }
            `
          },
          listVehicleDefinitionsPerAddress: {
            params: {
                address: true,
                limit: true
            },
            query: `
            {
              vehicles(filterBy: {owner: $address}, first: $limit) {
                nodes {
                  aftermarketDevice {
                      tokenId
                      address
                  }
                    syntheticDevice {
                      address
                      tokenId
                  }
                  definition {
                    make
                    model
                    year
                  }
                }
              }
            }
          `
          }
        })
    }
}