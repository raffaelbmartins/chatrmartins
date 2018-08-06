import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contact/contact.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageComponent } from './message/message.component';
import { MessageHeaderComponent } from './message-header/message-header.component';
import { MessageBodyComponent } from './message-body/message-body.component';
import { MessageFooterComponent } from './message-footer/message-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactComponent,
    MessagesComponent,
    MessageComponent,
    MessageHeaderComponent,
    MessageBodyComponent,
    MessageFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
