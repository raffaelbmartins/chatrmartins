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

  constructor(private _http: Http) {}

  getAllContacts() {
    return this._http.get(environment.urlGet, optionsGet)
      .pipe(
        retry(3),
        map((res: Response) => res.json() || [])
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
}
