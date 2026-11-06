import { DIMO } from './dimo';

const PROD = 'Production';

const dimo = new DIMO(PROD);

describe('Production Environment', () => {
    test('Production resources are initialized with the correct environment', () => {
        expect(dimo.agents.env).toBe(PROD);
        expect(dimo.attestation.env).toBe(PROD);
        expect(dimo.auth.env).toBe(PROD);
        expect(dimo.devicedefinitions.env).toBe(PROD);
        expect(dimo.devices.env).toBe(PROD);
        expect(dimo.fetch.env).toBe(PROD);
        expect(dimo.identity.env).toBe(PROD);
        expect(dimo.telemetry.env).toBe(PROD);
        expect(dimo.tokenexchange.env).toBe(PROD);
        expect(dimo.trips.env).toBe(PROD);
        expect(dimo.valuations.env).toBe(PROD);
    });

    test('Production API endpoints are defined', () => {
        expect(dimo.agents.api).toBeDefined;
        expect(dimo.attestation.api).toBeDefined;
        expect(dimo.auth.api).toBeDefined;
        expect(dimo.devicedefinitions.api).toBeDefined;
        expect(dimo.devices.api).toBeDefined;
        expect(dimo.fetch.api).toBeDefined;
        expect(dimo.identity.api).toBeDefined;
        expect(dimo.telemetry.api).toBeDefined;
        expect(dimo.tokenexchange.api).toBeDefined;
        expect(dimo.trips.api).toBeDefined;
        expect(dimo.valuations.api).toBeDefined;
    });
});

