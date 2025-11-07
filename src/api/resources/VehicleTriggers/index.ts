/** @format */

import { Resource } from '../../Resource';
import { DimoEnvironment } from '../../../environments';

class VehicleTriggers extends Resource {
	constructor(api: any, env: keyof typeof DimoEnvironment) {
		super(api, 'VehicleTriggers', env);
		this.setResource({
			listWebhooks: {
				method: 'GET',
				path: '/v1/webhooks',
				auth: 'developer_jwt',
			},
			createWebhook: {
				method: 'POST',
				path: '/v1/webhooks',
				body: {
					service: true,
					metricName: true,
					condition: true,
					coolDownPeriod: true,
					description: false,
					targetURL: true,
					status: true,
					verificationToken: true,
					displayName: false
				},
				auth: 'developer_jwt',
			},
			updateWebhook: {
				method: 'PUT',
				path: '/v1/webhooks/:webhookId',
				body: {
					request: true
				},
				auth: 'developer_jwt',
			},
			deleteWebhook: {
				method: 'DELETE',
				path: '/v1/webhooks/:webhookId',
				auth: 'developer_jwt',
			},
			getWebhookSignalNames: {
				method: 'GET',
				path: '/v1/webhooks/signals',
				auth: 'developer_jwt',
			},
			listSubscribedVehicles: {
				method: 'GET',
				path: '/v1/webhooks/:webhookId',
				auth: 'developer_jwt',
			},
			listVehicleSubscriptions: {
				method: 'GET',
				path: '/v1/webhooks/vehicles/:tokenDID',
				auth: 'developer_jwt',
			},
			subscribeVehicle: {
				method: 'POST',
				path: '/v1/webhooks/:webhookId/subscribe/:tokenDID',
				auth: 'developer_jwt',
			},
			subscribeAllVehicles: {
				method: 'POST',
				path: '/v1/webhooks/:webhookId/subscribe/all',
				auth: 'developer_jwt',
			},
			unsubscribeVehicle: {
				method: 'DELETE',
				path: '/v1/webhooks/:webhookId/unsubscribe/:tokenDID',
				auth: 'developer_jwt',
			},
			unsubscribeAllVehicles: {
				method: 'DELETE',
				path: '/v1/webhooks/:webhookId/unsubscribe/all',
				auth: 'developer_jwt',
			},
		});
	}
}

export { VehicleTriggers };
