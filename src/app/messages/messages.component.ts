import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Contact } from '../model/contact';
import { Message } from '../../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  
  messages: Array<Object> = [];
  contact: Contact;
  private _subscription : Subscription;
  private _check;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this._subscription = this.messageService.openMessages.subscribe((response : Contact) => {
      this.contact = response;
      this.check();
    });
  }

  read(_messages: Array<Object>) {
    this.messages = _messages;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  check() {
    this._check = setInterval(() => {
      this.contact = this.messageService.getMessage(this.contact.id);
      console.log("Check Messages");
    }, 5000);
  }

}
