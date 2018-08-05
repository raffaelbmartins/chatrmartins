import { Injectable, EventEmitter, Output } from '@angular/core';
import { Message } from '../model/message';
import { Http, Response, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Observable } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Contact } from '../model/contact';

const options = new RequestOptions({
  method: RequestMethod.Get,
  url: environment.url,
  headers: new Headers({
    'Accept': 'application/json',
    'X-sprofissional-Token' : environment.token
  })
});

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Array<Message> = [];
  lastid: number;
  contacts: Contact[] = [];

  @Output() readEvent = new EventEmitter();
  @Output() openMessages : EventEmitter<Contact> = new EventEmitter();

  constructor(private _http: Http) { }

  sendMessage(_message) {
    let message = new Message(_message);
    //this.processMessage(message);
    console.log('Send Message',message);
  }

  processMessage(message: Message) {
    this.saveMessage(message);
  }

  saveMessage(message: Message) {
    this.messages.push(message);
    this.readEvent.emit();
  }

  getMessage(id : number) : Contact {
    return this.contacts.find(x => x.id == id);
  }

  getMessages() : Observable<Contact[]> {

    return this._http.get(environment.url, options)
      .pipe(
        map((res : Response) => {
          
          this.contacts = [];
          let json = res.json();

          json.forEach(data => {
            
            let contact = new Contact();
            contact.id = data.id;
            contact.input = data.input;
            contact.output = data.output;
            contact.description = data.description;
            contact.messages = data.messages;
            contact.user = data.user;
            contact.active = data.active;

            this.contacts.push(contact);

          });

          return this.contacts;

        })
      );
  }

  private handleError(error: Response) {
    console.log(error.json());
    return [];
  }
}
