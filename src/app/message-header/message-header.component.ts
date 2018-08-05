import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../model/contact';

@Component({
  selector: 'app-message-header',
  templateUrl: './message-header.component.html',
  styleUrls: ['./message-header.component.scss']
})
export class MessageHeaderComponent implements OnInit {

  @Input() contact : Contact;

  constructor() {}

  ngOnInit() {
  }

}
