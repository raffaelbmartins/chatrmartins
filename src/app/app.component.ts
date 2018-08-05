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
  
  contacts : Contact[];
  private _subscription : Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this._subscription = this.messageService.readEvent.subscribe(() => this.read());
    this.read();
  }

  read() {
    this.messageService.getMessages().subscribe(data => {
      this.contacts = data;
      console.log("Read", this.contacts);
    });
  }

  ngOndestroy() : void {
    this._subscription.unsubscribe();
  }
}
