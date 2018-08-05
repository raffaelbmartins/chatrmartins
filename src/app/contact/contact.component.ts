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
  avatar : string = 'assets/images/avatar_logo.png';
  
  constructor(private messageService: MessageService) { }

  ngOnInit() {    
  }

}
