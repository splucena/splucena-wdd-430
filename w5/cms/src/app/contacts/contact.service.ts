import { EventEmitter } from '@angular/core';
import { Contact } from './contact-list/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

export class ContactService {
  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  contactSelectedEvent = new EventEmitter<Contact>();

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string) {
    for (let c of this.contacts) {
      if (c.id === id) {
        return this.contacts[0][id];
      }
    }

    return null;
  }
}
