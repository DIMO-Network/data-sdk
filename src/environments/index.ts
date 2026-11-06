/** @format */

export const DimoEnvironment = {
	Production: {
		Agents: 'https://agents.dimo.zone',
		Attestation: 'https://attestation-api.dimo.zone',
		Auth: 'https://auth.dimo.zone',
		Identity: 'https://identity-api.dimo.zone/query',
		Devices: 'https://devices-api.dimo.zone',
		DeviceDefinitions: 'https://device-definitions-api.dimo.zone',
		Fetch: 'https://fetch-api.dimo.zone/query',
		Telemetry: 'https://telemetry-api.dimo.zone/query',
		TokenExchange: 'https://token-exchange-api.dimo.zone',
		Trips: 'https://trips-api.dimo.zone',
		Valuations: 'https://valuations-api.dimo.zone',
		VehicleSignalDecoding: 'https://vehicle-signal-decoding.dimo.zone',
		VehicleTriggers: 'https://vehicle-triggers-api.dimo.zone',
	},
} as const;

export type DimoEnvironment = typeof DimoEnvironment.Production;
