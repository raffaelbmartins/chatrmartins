import { Component, OnInit } from '@angular/core';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-message-body',
  templateUrl: './message-body.component.html',
  styleUrls: ['./message-body.component.scss']
})
export class MessageBodyComponent implements OnInit {

  messages: MessageComponent[] = [];

  constructor() {

    let message = new MessageComponent();
    message.text = "Testando";

    let message2 = new MessageComponent();
    message2.text = "Testando 2";

    let message3 = new MessageComponent();
    message3.text = "Testando 3";

    this.messages.push(message.setIn());
    this.messages.push(message2.setOut());
    this.messages.push(message3.setIn());

  }

  ngOnInit() {
  }

}
