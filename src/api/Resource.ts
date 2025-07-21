/** @format */

import { Method } from './Method';
import { DimoEnvironment } from '../environments';
import { ResourceMap } from './types/Endpoint';

export class Resource<TApi = string> {
	[key: string]: any;
	public api: TApi;
	public resourceName: string;
	public env: keyof typeof DimoEnvironment;

	constructor(
		api: TApi,
		resourceName: string,
		env: keyof typeof DimoEnvironment,
	) {
		this.api = api;
		this.resourceName = resourceName;
		this.env = env;
	}

	protected setResource<T extends ResourceMap>(resources: T): void {
		Object.keys(resources).forEach((key) => {
			this[key] = (params: any = {}) =>
				Method(resources[key], this.api, params, this.env);
		});
	}
}
