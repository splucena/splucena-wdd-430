import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public contacts: Contact[] = [
    new Contact(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "https://images.unsplash.com/photo-1487018036150-0742359c9139?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80", null),
    new Contact(2, "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "https://images.unsplash.com/photo-1487018036150-0742359c9139?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80", null),
  ];

  //  
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(contact: Contact) {
    // exposes the contact object
    // from the list of contacts
    this.selectedContactEvent.emit(contact);
  }

}
