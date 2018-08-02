import { User } from "./user";

export class Message {

    text: string;
    type: string;
    timesend: string;
    usersend: User;
    read: boolean;
    
    constructor(_text: string = '') {
        this.text = _text;
    }
}