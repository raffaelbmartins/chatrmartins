import { User } from './user';
import { Message } from './message';

export class Contact {

    public id: number;
    public input: string;
    public output: string;
    public description: string;
    public messages: any = [];
    public user: string;
    public active: boolean;
    public unread: boolean;

    constructor(data: Contact|Object) {
        Object.assign(this, data);
    }

}