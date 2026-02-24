import axios from 'axios';
import * as functionIndex from '../graphql/functions/';
import { DimoEnvironment } from '../environments';
import { DimoError } from '../errors';

// GraphQL query factory function
export const Query = async(resource: any, baseUrl: any, params: any = {}, env: keyof typeof DimoEnvironment) => {
    /**
     * Headers
     */
    
    let headers: Record<string, string> = {};
    if (['developer_jwt', 'vehicle_jwt'].includes(resource.auth)) {
        if (params.headers.Authorization) {
            headers = params.headers;
        } else {
            throw new DimoError({
                message: `Access token not provided for ${resource.auth} authentication`,
                statusCode: 401
            });
        }
    }
    headers = { 
        ...headers, 
        ...{
            'Content-Type': 'application/json',
            'User-Agent': 'dimo-node-sdk'
        }   
    }

    // If resource.method is 'FUNCTION', call the function defined
    if (resource.method === 'FUNCTION') {
        const functionName = resource.path;
        const dynamicFunction = (functionIndex as Record<string, Function>)[functionName];
        if (typeof dynamicFunction === 'function') {
            // Call the dynamic function with params and pass the necessary arguments
            return dynamicFunction(params, env);
        } else {
            throw new DimoError({
                message: `Function in ${resource.path} is not a valid function.`,
                statusCode: 400
            });
        }

    }

    const paramDefs = resource.params || {};
    let query = resource.query;
    let requestData: { query: string; variables?: Record<string, unknown> } = { query };

    if (resource.useVariables && resource.variableKeys) {
        const variables: Record<string, unknown> = {};
        for (const key of resource.variableKeys) {
            if (params[key] !== undefined && params[key] !== null) {
                variables[key] = params[key];
            }
        }
        if (Object.keys(variables).length > 0) {
            requestData.variables = variables;
        }
    } else {
        for (const key in paramDefs) {
            const placeholder = new RegExp(`\\$${key}\\b`, 'g');
            if (paramDefs[key] === true) {
                if (params[key] === undefined || params[key] === null) {
                    // ACC-303: Replace the placeholder with null string to handle pagination
                    query = query.replace(placeholder, "null");
                } else {
                    const value = typeof params[key] === 'string' ? `"${params[key]}"` : params[key];
                    query = query.replace(placeholder, value);
                }
            }
        }
        requestData.query = query;
    }

    try {
        const response = await axios({
            method: 'POST',
            url: baseUrl,
            headers: headers,
            data: requestData
        });

        return response.data;
    } catch (error: any) {
        console.error('Error executing GraphQL query:', error);
        throw new DimoError({
            message: `Error executing GraphQL query`,
            statusCode: error.response?.status ?? 400,
            body: error.response?.data
        });
    }
};

export const CustomQuery = async (resource: any, baseUrl: string, params: any = {}) => {
    /**
     * Headers
     */

    let headers: Record<string, string> = {};
    if (['developer_jwt', 'vehicle_jwt'].includes(resource.auth)) {
        if (params.headers.Authorization) {
            headers = params.headers;
        } else {
            throw new DimoError({
                message: `Access token not provided for ${resource.auth} authentication`,
                statusCode: 401
            });
        }
    }
    headers = { 
        ...headers, 
        ...{
            'Content-Type': 'application/json',
            'User-Agent': 'dimo-node-sdk'
        }   
    }

    const query = params.query || {};
    try {
        const response = await axios({
            method: 'POST',
            url: baseUrl,
            headers: headers,
            data: {
                query
            }
        });

        return response.data;
    } catch (error: any) {
        console.error('Error executing Custom GraphQL query:', error);
        throw new DimoError({
            message: 'Error executing Custom GraphQL query',
            statusCode: error.response?.status ?? 400,
            body: error.response?.data
        });
    }
};

