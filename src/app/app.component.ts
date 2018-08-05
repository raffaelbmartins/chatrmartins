import { Component } from '@angular/core';
import { MessageService } from './message/message.service';
import { Message } from '../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { Contact } from './model/contact';
import { Observable } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  contacts : Contact[];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.readEvent.subscribe(_contacts => this.read(_contacts));
    this.messageService.getMessages().subscribe(data => {
      this.contacts = data;
      console.log(this.contacts);
    });
  }

  read(_contacts: Array<Contact>) {
    this.contacts = _contacts;
  }
}
