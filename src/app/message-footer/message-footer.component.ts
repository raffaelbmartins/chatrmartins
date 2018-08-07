import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../message/message.service';


@Component({
  selector: 'app-message-footer',
  templateUrl: './message-footer.component.html',
  styleUrls: ['./message-footer.component.scss']
})
export class MessageFooterComponent implements OnInit {

  message: string;

  constructor(private messageService: MessageService) { }
  
  ngOnInit() {
  }

  sendMessage() {
    // this.messageService.sendMessage(this.message);
    this.message = null;
  }

}
