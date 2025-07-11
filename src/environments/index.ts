/** @format */

export const DimoEnvironment = {
	Production: {
		Attestation: "https://attestation-api.dimo.zone",
		Auth: "https://auth.dimo.zone",
		Identity: "https://identity-api.dimo.zone/query",
		Devices: "https://devices-api.dimo.zone",
		DeviceDefinitions: "https://device-definitions-api.dimo.zone",
		Telemetry: "https://telemetry-api.dimo.zone/query",
		TokenExchange: "https://token-exchange-api.dimo.zone",
		Trips: "https://trips-api.dimo.zone",
		Valuations: "https://valuations-api.dimo.zone",
		VehicleSignalDecoding: "https://vehicle-signal-decoding.dimo.zone",
		VehicleEvents: "https://vehicle-events-api.dimo.zone",
	},
	Dev: {
		Attestation: "https://attestation-api.dev.dimo.zone",
		Auth: "https://auth.dev.dimo.zone",
		Identity: "https://identity-api.dev.dimo.zone/query",
		Devices: "https://devices-api.dev.dimo.zone",
		DeviceDefinitions: "https://device-definitions-api.dev.dimo.zone",
		Telemetry: "https://telemetry-api.dev.dimo.zone/query",
		TokenExchange: "https://token-exchange-api.dev.dimo.zone",
		Trips: "https://trips-api.dev.dimo.zone",
		Valuations: "https://valuations-api.dev.dimo.zone",
		VehicleSignalDecoding: "https://vehicle-signal-decoding.dev.dimo.zone",
		VehicleEvents: "https://vehicle-events-api.dev.dimo.zone",
	},
} as const;

export type DimoEnvironment =
	| typeof DimoEnvironment.Production
	| typeof DimoEnvironment.Dev;
