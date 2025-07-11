/** @format */

import { Resource } from "api/Resource";
import { DimoEnvironment } from "environments";

class VehicleEvents extends Resource {
	constructor(api: any, env: keyof typeof DimoEnvironment) {
		super(api, "VehicleEvents", env);
		this.setResource({
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
		});
	}
}

export { VehicleEvents };
