import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() contact : Contact;
 
  constructor(private messageService: MessageService) { }

  ngOnInit() {    
  }

  openMessages() {
    this.messageService.openMessages.emit(this.contact);
    console.log(this.contact);
  }

}
