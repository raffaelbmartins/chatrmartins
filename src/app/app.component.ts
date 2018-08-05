import { Component } from '@angular/core';
import { MessageService } from './message/message.service';
import { Message } from '../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { Contact } from './model/contact';
import { Observable, Subscription } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  contacts : Contact[] = [];

  private _subscription : Subscription;
  private _check;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.read();
    this.check(); 
  }

  read() {
    this.messageService.getMessages().subscribe((data : Array<Contact>) => {
      
      if (data.length > this.contacts.length) {
        data.forEach((elem : Contact) => {
          let find = this.contacts.some((y : Contact) => y.id == elem.id);
          if (! find) {
            this.contacts.push(elem);
          }
        });
      }

      // console.log("Read", this.contacts);
    });
  }

  check() {
    this._check = setInterval(() => {
      this.read();      
    }, 5000);
  }
}
