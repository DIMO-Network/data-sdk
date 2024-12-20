import { Resource } from '../../Resource';
import { DimoEnvironment } from '../../../environments';

export class Devices extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Devices', env);
        this.setResource({
        })
    }
}