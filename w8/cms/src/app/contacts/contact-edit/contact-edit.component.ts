import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact-list/contact.model';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  groupContacts: Contact[];

  constructor() {}

  ngOnInit(): void {}

  onCancel() {
    //
  }
}
