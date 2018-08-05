import { User } from './user';
import { Message } from './message';

export class Contact {

    public id: number;
    public input: string;
    public output: string;
    public description: string;
    public messages: Array<Object> = [];
    public user: string;
    public active: boolean;

}