import { Injectable, EventEmitter, Output } from '@angular/core';
import { Message } from '../model/message';
import { Http, Response, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Contact } from '../model/contact';
import { retry } from 'rxjs/internal/operators/retry';

const optionsGet = new RequestOptions({
  method: RequestMethod.Get,
  url: environment.urlGet,
  headers: new Headers({
    'Accept': 'application/json',
    'X-sprofissional-Token' : environment.token
  })
});

const optionsSave = new RequestOptions({
  method: RequestMethod.Post,
  url: environment.urlSave,
  headers: new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
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
  contact: Observable<Contact>;
  private _contact : BehaviorSubject<Contact>;
  _contact$ : Observable<Contact>;
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
    this._contact = new BehaviorSubject<Contact>(new Contact({}));
    this._contact$ = this._contact.asObservable();
  }

  loadChats() : Observable<Contact[]> {
    return this._http.get(environment.urlGet, optionsGet)
      .pipe(
        retry(5),
        map((data) => {
          let j = data.json();
          this.dataStore.contacts = [];
          j.forEach(element => {
            this.dataStore.contacts.push(new Contact(element));
          });
          return this.dataStore.contacts;
        })
      );
  }

  loadChat(_contact : Contact) : Observable<Contact> {
    this._contact.next((this.dataStore.contacts.find(x => x.id === _contact.id)));
    return this._contact$;
  }

  getMessages(_contact : Contact) {
    let c = this.dataStore.contacts.find(x => x.id === _contact.id);
    return c.messages;
  }

  getMessage(contact : Contact) : Array<any> {
    
    let _contact = this.dataStore.contacts.find(x => x.id == contact.id);
    let _newMessages = [];
    
    if (_contact) {
      
      _contact.messages.forEach((x : any) => {
        let find = contact.messages.some((y: any) => y.id === x.id );
        if (! find) {
          _newMessages.push(x);
        }
      });
    }

    this.contact
    
    return _newMessages;

    

  }

  sendMessage(message : string, id : number) {
    
    let _chat = this.dataStore.contacts.find((e) => e.id === id);
    
    if (_chat) {
      
      let _body = new URLSearchParams();
      _body.set('chat', _chat.id.toString());
      _body.set('mensagem', message);
      
      return this._http.post(environment.urlSave, _body.toString(), optionsSave)
        .pipe(
          retry(5)
        )
        .subscribe(resp => {
          _chat.messages.push(resp.json());
          this.readEvent.emit();
        },error => Observable.throw("Coul not save message")),
        () => this.readEvent.emit();

    } else {
      return Observable.throw("Coul not sava message");
    }
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