import { Injectable, EventEmitter, Output } from '@angular/core';
import { Message } from '../model/message';
import { Observable, BehaviorSubject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Array<Message> = [];
  @Output() readEvent = new EventEmitter<Message[]>();

  constructor() { }

  sendMessage(_message: string) {
    let message = new Message(_message);
    this.processMessage(message);
  }

  processMessage(message: Message) {
    this.saveMessage(message);
  }

  saveMessage(message: Message) {
    this.messages.push(message);
    this.readEvent.emit(this.messages);
  }

  getMessages() {
    this.messages = this.testMessages();
    return this.messages;
  }

  testMessages() {
    
    let message = new Message();
    message.text = "Ola tudo bem";
    message.type = 'in';

    let message2 = new Message();
    message2.text = "Tudo sim e você";
    message2.type = 'out';

    let message3 = new Message();
    message3.text = "Estou ótimo graças a Deus";
    message3.type = 'in';

    let m = [];

    m.push(message);
    m.push(message2);
    m.push(message3);

    return m;

  }
}
