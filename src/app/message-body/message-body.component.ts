import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Message } from '../model/message';
import { Contact } from '../model/contact';
import { MessageService } from '../message/message.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-message-body',
  templateUrl: './message-body.component.html',
  styleUrls: ['./message-body.component.scss']
})
export class MessageBodyComponent implements OnInit {

  @Input() contact : Contact;

  constructor() { }

  ngOnInit() {
  }
}
