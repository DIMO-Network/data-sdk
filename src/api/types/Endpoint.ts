/** @format */

export type EndpointDefinition = {
	method: "GET" | "POST" | "PUT" | "DELETE" | "FUNCTION";
	path: string;
	auth?: "developer_jwt" | "vehicle_jwt";
	body?: Record<string, boolean | string | number>;
	queryParams?: Record<string, boolean | string | number>;
	headers?: Record<string, string>;
	return?: string;
};

export type ResourceMap = Record<string, EndpointDefinition>;
