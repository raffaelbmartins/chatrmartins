import { Injectable, EventEmitter, Output } from '@angular/core';
import { Message } from '../model/message';
import { Http, Response, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Contact } from '../model/contact';

const options = new RequestOptions({
  method: RequestMethod.Get,
  url: environment.url,
  headers: new Headers({
    'Accept': 'application/json',
    //'X-sprofissional-Token' : environment.token
  })
});

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Array<Message> = [];
  lastid: number;
  contacts: Contact[] = [];
  private _contacts : BehaviorSubject<Contact[]>;
  private dataStore : {
    contacts: Contact[];
  }
  
  contacts$ : Observable<Contact[]>;

  @Output() readEvent = new EventEmitter();
  @Output() scrollChange = new EventEmitter();
  @Output() openMessages : EventEmitter<Contact> = new EventEmitter();
  @Output() newMessage : EventEmitter<any> = new EventEmitter();

  constructor(private _http: Http) {
    this.dataStore = { contacts: [] };
  }

  loadChats() : Observable<Contact[]> {
    return this._http.get(environment.url, options)
      .pipe(
        map((data) => {
          let j = data.json();
          j.forEach(element => {
            this.dataStore.contacts.push(new Contact(element));
          });
          return this.dataStore.contacts;
        })
      );
  }

  getMessage(contact : Contact) : Array<any> {
    
    let _contact = this.contacts.find(x => x.id == contact.id);
    let _newMessages = [];

      _contact.messages.forEach((x : any) => {
        let find = contact.messages.some((y: any) => y.id === x.id );
        if (! find) {
          _newMessages.push(x);
        }
      });

    return _newMessages;

  }

  // getMessages() : Observable<Contact[]> {

  //   return this._http.get(environment.url, options)
  //     .pipe(
  //       map((res : Response) => {
          
  //         this.contacts = [];
  //         let json = res.json();

  //         json.forEach(data => {
            
  //           let contact = new Contact();
  //           contact.id = data.id;
  //           contact.input = data.input;
  //           contact.output = data.output;
  //           contact.description = data.description;
  //           contact.messages = data.messages;
  //           contact.user = data.user;
  //           contact.active = data.active;

  //           this.contacts.push(contact);

  //         });

  //         return this.contacts;

  //       })
  //     );
  // }

  private handleError(error: Response) {
    console.log(error.json());
    return [];
  }
}
