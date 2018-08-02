import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() text: string;
  @Input() type: string = 'out';
  @Input() timeSend: Date = new Date('01/01/0000 00:00:00');

  constructor() { }

  ngOnInit() {
  }

  setIn() {
    this.type = 'in';
    return this;
  }

  setOut() {
    this.type = 'out';
    return this;
  }

}
