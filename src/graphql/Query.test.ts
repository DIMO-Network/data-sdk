import axios from 'axios';
import { CustomQuery, Query } from './Query'; // Import the Query function to be tested
import { DimoError } from '../errors';
import { DimoEnvironment } from '../environments';

const PROD = 'Production';
const RESOURCE = {
    method: 'POST',
    path: '',
    queryParams: { param1: true },
};
const PARAM = { query: `{
    vehicles (first:10) {
      totalCount
    }
}`};

describe('Query Function', () => {
    test('Valid API Call - Identity API Server is up and returning data', async () => {
        jest.spyOn(axios, 'request').mockResolvedValue({ query: `{
            vehicles (first:10) {
              totalCount
            }
        }`});

        const response = await CustomQuery(RESOURCE, DimoEnvironment.Production.Identity, PARAM);

        expect(response.data).toBeDefined();
    });

    test('Missing Required Query Parameter - Throws Error', async () => {
        const resource = {
            Query: 'POST',
            path: '',
            queryParams: { expectedParam: true },
        };
        const params = { unexpectedParam: 'value1' };

        await expect(Query(resource, DimoEnvironment.Production.Identity, params, PROD)).rejects.toThrow(DimoError);
        await expect(Query(resource, DimoEnvironment.Production.Telemetry, params, PROD)).rejects.toThrow(DimoError);
    });
});
