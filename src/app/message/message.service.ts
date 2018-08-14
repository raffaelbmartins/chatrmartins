import { Injectable, EventEmitter, Output } from '@angular/core';
import { Message } from '../model/message';
import { Http, Response, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Contact } from '../model/contact';

const optionsGet = new RequestOptions({
  method: RequestMethod.Get,
  url: environment.urlGet,
  headers: new Headers({
    'Accept': 'application/json',
    'X-sprofissional-Token' : environment.token
  })
});
// return this._http.get(environment.urlGet, optionsGet)

const optionsSave = new RequestOptions({
  method: RequestMethod.Post,
  url: environment.urlSave,
  headers: new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-sprofissional-Token' : environment.token
  })
});
// return this._http.post(environment.urlSave, _body.toString(), optionsSave)

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _http: Http) {}

  getAllContacts() {
    return this._http.get(environment.urlGet, optionsGet)
      .pipe(
        retry(3),
        map((res: Response) => res.json())
      );
  }

  sendMessage(message : string, id : number) {
    
    let _body = new URLSearchParams();
    _body.set('chat', id.toString());
    _body.set('mensagem', message);
    
    return this._http.post(environment.urlSave, _body.toString(), optionsSave)
      .pipe(
        retry(3)
      );
  }

  // messages: Array<Message> = [];
  // lastid: number;
  // contacts: Contact[] = [];
  // private _contacts : BehaviorSubject<Contact[]>;
  // private dataStore : {
  //   contacts: Contact[];
  // }
  
  // contacts$ : Observable<Contact[]>;

  // @Output() readEvent = new EventEmitter();
  // @Output() scrollChange = new EventEmitter();
  // @Output() openMessages : EventEmitter<Contact> = new EventEmitter();
  // @Output() newMessage : EventEmitter<any> = new EventEmitter();

  // constructor(private _http: Http) {
  //   this.dataStore = { contacts: [] };
  // }

  // loadChats() : Observable<Contact[]> {
  //   return this._http.get(environment.urlGet, optionsGet)
  //     .pipe(
  //       map((data) => {
  //         let j = data.json();
  //         this.dataStore.contacts = [];
  //         j.forEach(element => {
  //           this.dataStore.contacts.push(new Contact(element));
  //         });
  //         console.log(this.dataStore.contacts);
  //         return this.dataStore.contacts;
  //       })
  //     );
  // }

  // loadChat(_contact : Contact) : Contact {
  //   return this.dataStore.contacts.find(x => x.id === _contact.id);
  // }

  // getMessage(contact : Contact) : Array<any> {
    
  //   let _contact = this.contacts.find(x => x.id == contact.id);
  //   let _newMessages = [];

  //     _contact.messages.forEach((x : any) => {
  //       let find = contact.messages.some((y: any) => y.id === x.id );
  //       if (! find) {
  //         _newMessages.push(x);
  //       }
  //     });

  //   return _newMessages;

  // }

  // sendMessage(message : string, id : number) {
    
  //   let _chat = this.dataStore.contacts.find((e) => e.id === id);
    
  //   if (_chat) {
      
  //     let _body = new URLSearchParams();
  //     _body.set('chat', _chat.id.toString());
  //     _body.set('mensagem', message);
      
  //     return this._http.post(environment.urlSave, _body.toString(), optionsSave)
  //       .subscribe(resp => {
  //         _chat.messages.push(resp.json());
  //         this.readEvent.emit();
  //       },error => Observable.throw("Coul not save message")),
  //       () => this.readEvent.emit();

  //   } else {
  //     return Observable.throw("Coul not sava message");
  //   }
  // }

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
}
