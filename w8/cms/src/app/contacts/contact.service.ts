import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact-list/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

export class ContactService {
  private contacts: Contact[] = [];
  private maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  contactSelectedEvent = new Subject<Contact>();
  contactChangeEvent = new Subject<Contact[]>();

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

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    console.log(newContact);
    this.contacts.push(newContact);
    let contactListClone = this.contacts.slice();
    this.contactChangeEvent.next(contactListClone);
  }

  getMaxId(): number {
    let maxId = 0;

    this.contacts.forEach((element) => {
      let currentId = +element.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  udpateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactListClose = this.contacts.slice();
    this.contactChangeEvent.next(contactListClose);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    const contactListClone = this.contacts.slice();
    this.contactChangeEvent.next(contactListClone);
  }
}
