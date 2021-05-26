import { EventEmitter } from '@angular/core';
import { Contact } from './contact-list/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

export class ContactService {
  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangeEvent = new EventEmitter<Contact[]>();

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let c of this.contacts) {
      if (c.id === id) {
        return c;
      }
    }

    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    // Delete contact on position pos
    this.contacts.splice(pos, 1);
    // Emit an updated copy of contacts
    this.contactChangeEvent.emit(this.contacts.slice());
  }
}
