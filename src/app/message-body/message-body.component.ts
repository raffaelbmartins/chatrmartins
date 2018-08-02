import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../message/message.service';
import { Message } from '../model/message';

@Component({
  selector: 'app-message-body',
  templateUrl: './message-body.component.html',
  styleUrls: ['./message-body.component.scss']
})
export class MessageBodyComponent implements OnInit {

  @Output() messages: Array<Message> = [];
  
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.readEvent.subscribe(messages => this.read(messages));
    this.messages = this.messageService.getMessages();
  }

  read(messages : Array<Message>) {
    this.messages = messages;
  }

}
