import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  public contacts: Contact[];

  //@Output() selectedContactEvent = new EventEmitter<Contact>();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  onSelected(contact: Contact) {
    // exposes the contact object
    // from the list of contacts
    //this.selectedContactEvent.emit(contact);
    this.contactService.contactSelectedEvent.emit(contact);
    console.log(contact);
  }
}
