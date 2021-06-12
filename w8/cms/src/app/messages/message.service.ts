import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[];
  constructor() {
    this.messages = MOCKMESSAGES;
  }

  selectedMessageEvent = new EventEmitter<Message>();
  messageChangeEvent = new EventEmitter<Message[]>();

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (let m of this.messages) {
      if (m.id === id) {
        return m;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }
}
