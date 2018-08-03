import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: Contact;
  active: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
