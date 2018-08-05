import { User } from "./user";

export class Message {
    id: number;
    content: string;
    user: User;
    type: string;
    timesend: Date;
    read: boolean = false;
    
    constructor(data : {id: number, content: string, user_id: number, user_username: string, timesend: Date}) {
        this.id = data.id || null;
        this.content = data.content || null;
        this.user = new User();
        this.user.id = data.user_id || null;
        this.user.username = data.user_username || null;
        this.timesend = data.timesend || null;
    }
}