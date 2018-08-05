import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Contact } from '../model/contact';
import { Message } from '../../../node_modules/@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  
  messages: Array<Object> = [];
  contact: Contact;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.openMessages.subscribe((response : Contact) => this.contact = response);
  }

  read(_messages: Array<Object>) {
    this.messages = _messages;
  }

}
