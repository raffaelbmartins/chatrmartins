import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { MessageService } from './message/message.service';
import { Message } from '../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { Contact } from './model/contact';
import { Observable, Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  contacts : Contact[];
  contact : Contact;
  private _subContact : Subscription;
  private _check;
  private _scrollChage : Subject<any>;

  constructor(private messageService: MessageService) {
    this.contacts  = [];
    this.contact = new Contact();
    this._scrollChage = new Subject;
  }

  ngOnInit() {
    this.messageService.loadAll();
    this.messageService.chats.subscribe((contacts : Contact[]) => {
      this.contacts = contacts;
    });

    this._scrollChage.subscribe(() => {
      let c = document.querySelector('#chat-body');
      c.scrollTop=c.scrollHeight;
    });
  }

  openBody(_contact : Contact, el) {

    if (this._subContact) {
      this._subContact.unsubscribe();
    }

    this._subContact = this.messageService.chats.pipe(
      map(contacts => contacts.find((item : Contact) => item.id === _contact.id))
    ).subscribe((contact : Contact) => {
      this.contact = contact
      setTimeout(() => {
        this._scrollChage.next();
      }, 3);
    });

  }

  check() {
    this._check = setInterval(() => {
      // this.read();      
    }, 5000);
  }
}
