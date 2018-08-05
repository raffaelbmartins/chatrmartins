import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Message } from '../model/message';

@Component({
  selector: 'app-message-body',
  templateUrl: './message-body.component.html',
  styleUrls: ['./message-body.component.scss']
})
export class MessageBodyComponent implements OnInit {

  messages: Array<Message> = [];
  @Input() contact : {
    id: number,
    user: string,
    input: string,
    output: string,
    description: string,
    active: boolean,
    avatar: string,
    messages: Array<{
      id: number,
      content: string,
      timesend: Date,
      user_id: number,
      user_username: string,
      read: boolean
    }>;
  };
  
  constructor() { }

  ngOnInit() {
    
  }

}
