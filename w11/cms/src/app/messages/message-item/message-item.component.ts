import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/contacts/contact-list/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {}
}
