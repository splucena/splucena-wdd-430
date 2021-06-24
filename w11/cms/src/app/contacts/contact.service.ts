import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact-list/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { map } from 'rxjs/operators';

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
      .get<{ message: string; contacts: any }>('http://localhost:3000/contacts')
      .pipe(
        map((contactData) => {
          console.log(contactData.contacts);
          return contactData.contacts.map((contact) => {
            return {
              id: contact.id,
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
              imageUrl: contact.imageUrl,
              group: contact.group,
            };
          });
        })
      )
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contacts.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          this.contactChangeEvent.next([...this.contacts]);
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

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; contact: Contact; id: string }>(
        'http://localhost:3000/contacts',
        newContact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        newContact.id = responseData.id;
        this.contacts.push(newContact);
        this.contactChangeEvent.next([...this.contacts]);
      });
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
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.contacts[pos] = newContact;
        this.contactChangeEvent.next([...this.contacts]);
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response) => {
        this.contacts.splice(pos, 1);
        this.contactChangeEvent.next([...this.contacts]);
      });
  }
}
