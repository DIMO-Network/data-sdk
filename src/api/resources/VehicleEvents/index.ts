/** @format */

import { Method } from "api/Method";
import { Resource } from "api/Resource";
import { DimoEnvironment } from "environments";
import { WebhookDefinitionParams } from "./types";

const endpoints = {
	listWebhooks: {
		method: "GET",
		path: "/v1/webhooks",
		auth: "developer_jwt",
	},
	createWebhook: {
		method: "POST",
		path: "/v1/webhooks",
		body: {
			service: true,
			data: true,
			trigger: true,
			setup: true,
			description: false,
			target_uri: true,
			status: true,
			verification_token: true,
		},
		auth: "developer_jwt",
	},
	updateWebhook: {
		method: "PUT",
		path: "/v1/webhooks/:webhookId",
		body: {
			service: true,
			data: true,
			trigger: true,
			setup: true,
			description: false,
			target_uri: true,
			status: true,
			verification_token: true,
		},
		auth: "developer_jwt",
	},
	deleteWebhook: {
		method: "DELETE",
		path: "/v1/webhooks/:webhookId",
		auth: "developer_jwt",
	},
	getWebhookSignalNames: {
		method: "GET",
		path: "/v1/webhooks/signals",
		auth: "developer_jwt",
	},
	listSubscribedVehicles: {
		method: "GET",
		path: "/v1/webhooks/:webhookId",
		auth: "developer_jwt",
	},
	listVehicleSubscriptions: {
		method: "GET",
		path: "/v1/webhooks/vehicles/:tokenId",
		auth: "developer_jwt",
	},
	subscribeVehicle: {
		method: "POST",
		path: "/v1/webhooks/:webhookId/subscribe/:tokenId",
		auth: "developer_jwt",
	},
	subscribeAllVehicles: {
		method: "POST",
		path: "/v1/webhooks/:webhookId/subscribe/all",
		auth: "developer_jwt",
	},
	unsubscribeVehicle: {
		method: "DELETE",
		path: "/v1/webhooks/:webhookId/unsubscribe/:tokenId",
		auth: "developer_jwt",
	},
	unsubscribeAllVehicles: {
		method: "DELETE",
		path: "/v1/webhooks/:webhookId/unsubscribe/all",
		auth: "developer_jwt",
	},
};

class VehicleEvents extends Resource {
	constructor(api: any, env: keyof typeof DimoEnvironment) {
		super(api, "VehicleEvents", env);
	}

	listWebhooks(authToken: string) {
		return Method(
			endpoints.listWebhooks,
			this.api,
			{ headers: { Authorization: authToken } },
			this.env,
		);
	}

	createWebhook(authToken: string, definition: WebhookDefinitionParams) {
		return Method(
			endpoints.createWebhook,
			this.api,
			{ ...definition, headers: { Authorization: authToken } },
			this.env,
		);
	}

	updateWebhook(
		authToken: string,
		webhookId: string,
		definition: WebhookDefinitionParams,
	) {
		return Method(
			endpoints.updateWebhook,
			this.api,
			{ ...definition, webhookId, headers: { Authorization: authToken } },
			this.env,
		);
	}

	deleteWebhook(authToken: string, webhookId: string) {
		return Method(
			endpoints.deleteWebhook,
			this.api,
			{ webhookId, headers: { Authorization: authToken } },
			this.env,
		);
	}

	getWebhookSignalNames(authToken: string) {
		return Method(
			endpoints.getWebhookSignalNames,
			this.api,
			{ headers: { Authorization: authToken } },
			this.env,
		);
	}

	listSubscribedVehicles(authToken: string, webhookId: string) {
		return Method(
			endpoints.listSubscribedVehicles,
			this.api,
			{ webhookId, headers: { Authorization: authToken } },
			this.env,
		);
	}

	listVehicleSubscriptions(authToken: string, tokenId: number) {
		return Method(
			endpoints.listVehicleSubscriptions,
			this.api,
			{ tokenId, headers: { Authorization: authToken } },
			this.env,
		);
	}

	subscribeVehicle(authToken: string, webhookId: string, tokenId: number) {
		return Method(
			endpoints.subscribeVehicle,
			this.api,
			{ webhookId, tokenId, headers: { Authorization: authToken } },
			this.env,
		);
	}

	subscribeAllVehicles(authToken: string, webhookId: string) {
		return Method(
			endpoints.subscribeAllVehicles,
			this.api,
			{ webhookId, headers: { Authorization: authToken } },
			this.env,
		);
	}

	unsubscribeVehicle(authToken: string, webhookId: string, tokenId: number) {
		return Method(
			endpoints.unsubscribeVehicle,
			this.api,
			{ webhookId, tokenId, headers: { Authorization: authToken } },
			this.env,
		);
	}

	unsubscribeAllVehicles(authToken: string, webhookId: string) {
		return Method(
			endpoints.unsubscribeAllVehicles,
			this.api,
			{ webhookId, headers: { Authorization: authToken } },
			this.env,
		);
	}
}

export * from "./types";
export { VehicleEvents };
