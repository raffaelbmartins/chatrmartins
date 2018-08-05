import { Component } from '@angular/core';
import { MessageService } from './message/message.service';
import { Message } from '../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { Contact } from './model/contact';
import { Observable, Subscription } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  contacts : Contact[] = [];
  private _check;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.loadAll();
    //this.check(); 
  }

  check() {
    this._check = setInterval(() => {
      this.read();      
    }, 5000);
  }
}
