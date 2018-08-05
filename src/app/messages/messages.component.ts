import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Contact } from '../model/contact';
import { Subscription, Subject } from 'rxjs';

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
  scrollChange : Subject<any> = new Subject();
  
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this._subscription = this.messageService.openMessages.subscribe((response : Contact) => {
      this.contact = response;
      console.log(response);
      this.scrollChange.next();
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
      let messages : Array<any> = this.messageService.getMessage(this.contact);
      if (messages.length > 0) {
        this.contact.messages = this.contact.messages.concat(messages);
        this.scrollChange.next(); 
      }
    }, 3000);
  }

}
