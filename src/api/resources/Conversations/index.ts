import { Resource } from '../../Resource';
import { DimoEnvironment } from '../../../environments';

export class Conversations extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Conversations', env);
        this.setResource({
            healthCheck: {
                method: 'GET',
                path: '/'
            },
            createAgent: {
                method: 'POST',
                path: '/agents',
                body: {
                    'user': true,
                    'vehicleIds': false,
                },
                auth: 'developer_jwt'
            },
            deleteAgent: {
                method: 'DELETE',
                path: '/agents/:agentId',
                auth: 'developer_jwt'
            },
            sendMessage: {
                method: 'POST',
                path: '/agents/:agentId/message',
                body: {
                    'message': true,
                    'vehicleIds': false,
                    'user': false
                },
                auth: 'developer_jwt'
            },
            streamMessage: {
                method: 'POST',
                path: '/agents/:agentId/stream',
                body: {
                    'message': true,
                    'vehicleIds': false,
                    'user': false
                },
                auth: 'developer_jwt'
            },
            getHistory: {
                method: 'GET',
                path: '/agents/:agentId/history',
                queryParams: {
                    'limit': false
                },
                auth: 'developer_jwt'
            }
        })
    }
}
