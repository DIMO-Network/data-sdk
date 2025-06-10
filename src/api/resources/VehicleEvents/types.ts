/** @format */

export interface WebhookDefinitionParams {
	service: "Telemetry";
	data: string;
	trigger: string;
	setup: "Realtime" | "Hourly";
	description?: string;
	target_uri: string;
	status: "Active" | "Inactive";
	verification_token: string;
}

export interface WebhookUpdateParams extends WebhookDefinitionParams {
	webhookId: string;
}

export interface WebhookIdParams {
	webhookId: string;
}

export interface TokenIdParams {
	tokenId: number;
}

export interface WebhookIdTokenIdParams {
	webhookId: string;
	tokenId: number;
}
