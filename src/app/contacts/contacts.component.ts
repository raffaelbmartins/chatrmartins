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
  }

  openBody(_contact : Contact) : void {
    this.messageService.readEvent.emit();
    this.messageService.openMessages.emit(_contact);
    this.messageService.scrollChange.emit();
  }

}
