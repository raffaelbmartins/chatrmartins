import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { MessageService } from './message/message.service';
import { Contact } from './model/contact';
import { Observable, Subscription, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  contacts : Contact[];
  contact : Contact;
  private _subContact : Subscription;
  private _subRead : Subscription;
  private _scrollChage : Subject<any>;
  formMessage : string;

  constructor(private messageService: MessageService, private spinner: NgxSpinnerService) {
    this.contacts  = [];
    this.contact = new Contact({});
    this._scrollChage = new Subject;
  }

  ngOnInit() {

    this.spinner.show();

    let checkContacts = setInterval(() => {
      this.loadContacts();
    }, 5000);

    this._subRead = this.messageService.readEvent.subscribe(() => {
      setTimeout(() => {
        this._scrollChage.next();
      }, 3);
    })

    this._scrollChage.subscribe(() => {
      let c = document.querySelector('#chat-body');
      c.scrollTop=c.scrollHeight;
    });
  }

  loadContacts() {
    this._subContact = this.messageService.loadChats()
      .subscribe(
        (contacts : Contact[]) => {
          this.contacts = contacts;
        }, 
        error => this.spinner.hide(),
        () => this.spinner.hide()
      );
  }

  ngOnDestroy() : void {
    this._subContact.unsubscribe();
    this._scrollChage.unsubscribe();
    this._subRead.unsubscribe();
  }

  openBody(_contact : Contact, el) {
    
    this.messageService.loadChat(_contact)
      .subscribe((c) => this.contact = c);

      let getContact = setInterval(() => {
        let messages = this.messageService.getMessages(this.contact);
        
        if (messages.length > this.contact.messages.length) {
          this.contact.messages = messages;
          setTimeout(() => {
            this._scrollChage.next();
          }, 3);
        }
      }, 1500);

    setTimeout(() => {
        this._scrollChage.next();
    }, 3);
  }

  sendMessage() : void {
    this.messageService.sendMessage(this.formMessage, this.contact.id);
    this.formMessage = '';
  }
}
