import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { Message } from '../model/message';
import { Contact } from '../model/contact';
import { MessageService } from '../message/message.service';
import { Subscription, Subject } from '../../../node_modules/rxjs';
import { DOCUMENT } from '../../../node_modules/@angular/common';

@Component({
  selector: 'app-message-body',
  templateUrl: './message-body.component.html',
  styleUrls: ['./message-body.component.scss']
})
export class MessageBodyComponent implements OnInit {

  @Input() contact : Contact;
  @Input() scrollChange : Subject<any>;

  constructor(private messageService: MessageService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.messageService.scrollChange.subscribe(() => {
      this.scrollToBottom();
    }); 
  }

  ngOnDestroy(): void {
    this.messageService.scrollChange.unsubscribe();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom() : void {
    let h = this.document.querySelector('#chat-body');
    h.scrollTo(0,h.querySelector('ul').offsetHeight);
  }

}
