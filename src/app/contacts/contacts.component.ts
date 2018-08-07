import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../model/contact';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @Input() contacts : Contact[];

  constructor(private messageService : MessageService) {}

  ngOnInit() {
    // this.messageService.chats.subscribe(data => this.contacts = data);
  }

  openBody(_contact : Contact) : void {
    this.messageService.openMessages.emit(_contact);
  }

}
