import axios from 'axios';
import { Method } from './Method'; // Import the Method function to be tested
import { DimoError } from '../errors';
import { DimoEnvironment } from '../environments';

jest.mock('axios');
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

const PROD = 'Production';
const RESOURCE = {
    method: 'GET',
    path: '',
    queryParams: { param1: true },
};
const PARAM = { param1: 'value1' };

describe('Method Function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Valid API Call - Device Definitions API Server is up and returning data', async () => {
        mockedAxios.mockResolvedValue({ data: 'device definitions api running!' } as any);

        const response = await Method(RESOURCE, DimoEnvironment.Production.DeviceDefinitions, PARAM, PROD);

        expect(response).toEqual('device definitions api running!');
    });

    test('Valid API Call - Devices API Server is up and returning data', async () => {
        mockedAxios.mockResolvedValue({ data: { data: 'Server is up and running' } } as any);

        const response = await Method(RESOURCE, DimoEnvironment.Production.Devices, PARAM, PROD);

        expect(response).toEqual({ data: 'Server is up and running' });
    });

    test('Valid API Call - Token Exchange API Server is up and returning data', async () => {
        mockedAxios.mockResolvedValue({ data: { data: 'Server is up and running' } } as any);

        const response = await Method(RESOURCE, DimoEnvironment.Production.TokenExchange, PARAM, PROD);

        expect(response).toEqual({ data: 'Server is up and running' });
    });

    test('Valid API Call - Valuations API Server is up and returning data', async () => {
        mockedAxios.mockResolvedValue({ data: { code: 200, message: 'Server is up.' } } as any);

        const response = await Method(RESOURCE, DimoEnvironment.Production.Valuations, PARAM, PROD);

        expect(response).toEqual({ code: 200, message: 'Server is up.' });
    });

    test('Valid API Call - Vehicle Signal Decoding API Server is up and returning data', async () => {
        mockedAxios.mockResolvedValue({ data: 'healthy' } as any);

        const response = await Method(RESOURCE, DimoEnvironment.Production.VehicleSignalDecoding, PARAM, PROD);

        expect(response).toEqual('healthy');
    });

    test('Missing Required Query Parameter - Throws Error', async () => {
        const resource = {
            method: 'GET',
            path: '/example/endpoint',
            queryParams: { expectedParam: true },
        };
        const baseUrl = 'https://example.com/api';
        const params = { unexpectedParam: 'value1' };

        await expect(Method(resource, baseUrl, params, PROD)).rejects.toThrowError(DimoError);
    });
});
