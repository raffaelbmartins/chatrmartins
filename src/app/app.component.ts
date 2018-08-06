import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { MessageService } from './message/message.service';
import { Message } from '../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { Contact } from './model/contact';
import { Observable, Subscription, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  private contacts : Contact[];
  private contact : Contact;
  private _subContact : Subscription;
  private _scrollChage : Subject<any>;

  constructor(private messageService: MessageService, private spinner: NgxSpinnerService) {
    this.contacts  = [];
    this.contact = new Contact({});
    this._scrollChage = new Subject;
  }

  ngOnInit() {

    this.spinner.show();

    this._subContact = this.messageService.loadChats()
      .subscribe(
        (contacts : Contact[]) => {
          this.contacts = contacts;
        }, 
        error => {},
        () => this.spinner.hide()
      );

    this._scrollChage.subscribe(() => {
      let c = document.querySelector('#chat-body');
      c.scrollTop=c.scrollHeight;
    });
  }

  ngOnDestroy() : void {
    this._subContact.unsubscribe();
    this._scrollChage.unsubscribe();
  }

  openBody(_contact : Contact, el) {
    this.contact = _contact;
    setTimeout(() => {
        this._scrollChage.next();
    }, 3);
  }
}
