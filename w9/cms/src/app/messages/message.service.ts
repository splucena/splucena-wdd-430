import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[];
  private maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  selectedMessageEvent = new EventEmitter<Message>();
  messageChangeEvent = new EventEmitter<Message[]>();

  getMessages(): any {
    this.http
      .get('https://openerp-204808-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          // this.messages.sort((a, b) =>
          //   a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          // );
          this.messageChangeEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error.message);
        }
      );
  }

  storeMessages() {
    let stringifyMessages = JSON.stringify(this.messages);
    this.http
      .put(
        'https://openerp-204808-default-rtdb.firebaseio.com/messages.json',
        stringifyMessages,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe(() => {
        this.messageChangeEvent.next(this.messages.slice());
      });
  }

  getMaxId(): number {
    let maxId = 0;

    this.messages.forEach((element) => {
      let currentId = +element.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
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
    this.storeMessages();
  }
}
