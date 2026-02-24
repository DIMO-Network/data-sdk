import { Resource } from '../../Resource';
import { DimoEnvironment } from '../../../environments';

const cloudEventHeaderFields = `
  id
  source
  producer
  specversion
  subject
  time
  type
  datacontenttype
  dataschema
  dataversion
  signature
  tags
`;

export class Fetch extends Resource {
    constructor(api: string, env: keyof typeof DimoEnvironment) {
        super(api, 'Fetch', env);
        this.query({
            auth: 'vehicle_jwt',
            query: true,
        });
        this.setQueries({
            getIndexKeys: {
                auth: 'vehicle_jwt',
                useVariables: true,
                variableKeys: ['did', 'limit', 'filter'],
                query: `
query GetIndexes($did: String!, $limit: Int, $filter: CloudEventFilter) {
  indexes(did: $did, limit: $limit, filter: $filter) {
    header { ${cloudEventHeaderFields} }
    indexKey
  }
}`,
            },
            getLatestIndexKey: {
                auth: 'vehicle_jwt',
                useVariables: true,
                variableKeys: ['did', 'filter'],
                query: `
query GetLatestIndex($did: String!, $filter: CloudEventFilter) {
  latestIndex(did: $did, filter: $filter) {
    header { ${cloudEventHeaderFields} }
    indexKey
  }
}`,
            },
            getLatestObject: {
                auth: 'vehicle_jwt',
                useVariables: true,
                variableKeys: ['did', 'filter'],
                query: `
query GetLatestCloudEvent($did: String!, $filter: CloudEventFilter) {
  latestCloudEvent(did: $did, filter: $filter) {
    header { ${cloudEventHeaderFields} }
    data
    dataBase64
  }
}`,
            },
            getObjects: {
                auth: 'vehicle_jwt',
                useVariables: true,
                variableKeys: ['did', 'limit', 'filter'],
                query: `
query GetCloudEvents($did: String!, $limit: Int, $filter: CloudEventFilter) {
  cloudEvents(did: $did, limit: $limit, filter: $filter) {
    header { ${cloudEventHeaderFields} }
    data
    dataBase64
  }
}`,
            },
        });
    }
}
