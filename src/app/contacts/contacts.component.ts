import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../model/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @Input() contacts: Contact[] = [];

  constructor() { }

  ngOnInit() {
  }

}
