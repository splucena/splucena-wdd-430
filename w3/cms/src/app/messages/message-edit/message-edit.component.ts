import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('message') messageInputRef: ElementRef;
  private messageId: number = 0;
  private currentSender = 'Sum';

  @Output() addMessageEvent = new EventEmitter<Message>();
  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    var messageId: number = this.messageId++;
    const subject = this.subjectInputRef.nativeElement.value;
    const message = this.messageInputRef.nativeElement.value;
    const newMessage = new Message(messageId, subject, message, this.currentSender);

    this.addMessageEvent.emit(newMessage);
    
  }
  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }

}
