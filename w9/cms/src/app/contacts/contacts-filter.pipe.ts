import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact-list/contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], searchTerm: string): any {
    let filteredContacts: Contact[] = [];
    if (searchTerm && searchTerm.length > 0) {
      filteredContacts = contacts.filter((contact: Contact) =>
        contact.name
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      );
    }

    if (filteredContacts.length < 1) {
      console.log('HERE');
      return contacts;
    }

    return filteredContacts;
  }
}
