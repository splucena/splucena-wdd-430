import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact-list/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  private maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  contactSelectedEvent = new Subject<Contact>();
  contactChangeEvent = new Subject<Contact[]>();

  getContacts(): any {
    this.http
      .get('https://openerp-204808-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          this.contactChangeEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error.message);
        }
      );
  }

  storeContacts() {
    let stringifyContacts = JSON.stringify(this.contacts);
    this.http
      .put(
        'https://openerp-204808-default-rtdb.firebaseio.com/contacts.json',
        stringifyContacts,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe(() => {
        this.contactChangeEvent.next(this.contacts.slice());
      });
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
    this.storeContacts();
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
    this.storeContacts();
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
    this.storeContacts();
  }
}
