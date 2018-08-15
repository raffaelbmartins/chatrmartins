import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { MessageService } from './message/message.service';
import { Contact } from './model/contact';
import { Observable, Subscription, Subject, timer } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

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
  private timerSubscription : Subscription;
  private contactSubscription : Subscription;
  unread : {
    id: number,
    read: boolean;
  }

  send: boolean = false;

  constructor(private messageService: MessageService, private spinner: NgxSpinnerService) {
    this.contacts  = [];
    this.contact = new Contact({});
    this._scrollChage = new Subject;
  }

  ngOnInit() {
    this.spinner.show();
    this.refreshData();
  }
  
  ngOnDestroy(): void {
    if (this.contactSubscription) {
        this.contactSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
    }
  }

  private subscribeToData(): void {
    this.timerSubscription = timer(5000).subscribe(() => this.refreshData());
  }

  private refreshData(): void {
    this.contactSubscription = this.messageService.getAllContacts()
      .subscribe(
        (data:Contact[]) => {
          
          this.contacts = data;

          if (this.contact && this.contact.id) {
            let _c = this.contacts.find(x=>x.id===this.contact.id);
          }
          this.subscribeToData();
        },
        error => {
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
  }

  openBody(_contact : Contact, el) {
    
    let find = this.contacts.find(x=>x.id === _contact.id);

    if (find) {
      this.contact = find;
    }

    setTimeout(function() {
      let c = document.querySelector('#chat-body');
      c.scrollTop = c.scrollHeight;
    }, 3);
  }

  sendMessage() {
    this.send = true;
    this.messageService.sendMessage(this.formMessage, this.contact.id)
      .subscribe(resp => {
      this.contact.messages.push(resp.json());
      },error => {},
      () => {
        this.send = false;
        setTimeout(function() {
          let c = document.querySelector('#chat-body');
          c.scrollTop = c.scrollHeight;
        }, 3);
      }
    );
    this.formMessage = '';
  }
}
