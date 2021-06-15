import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { HeaderComponent } from './header/header.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentComponent } from './documents/document.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-list/document-item/document-item.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirectiveDirective } from './dropdown-directive.directive';
import { AppRoutingModule } from './app-routing.module';
import { DocumentStartComponent } from './documents/document-start/document-start.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { ContactStartComponent } from './contacts/contact-start/contact-start.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactListComponent,
    HeaderComponent,
    ContactItemComponent,
    DocumentComponent,
    DocumentDetailComponent,
    DocumentListComponent,
    DocumentItemComponent,
    MessagesComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirectiveDirective,
    DocumentStartComponent,
    DocumentEditComponent,
    ContactStartComponent,
    ContactEditComponent,
    ContactsFilterPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, DndModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
