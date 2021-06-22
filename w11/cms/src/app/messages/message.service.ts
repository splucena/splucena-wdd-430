import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { map } from 'rxjs/operators';

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
    // this.http
    //   .get('https://openerp-204808-default-rtdb.firebaseio.com/messages.json')
    //   .subscribe(
    //     (messages: Message[]) => {
    //       this.messages = messages;
    //       this.maxMessageId = this.getMaxId();
    //       // this.messages.sort((a, b) =>
    //       //   a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    //       // );
    //       this.messageChangeEvent.next(this.messages.slice());
    //     },
    //     (error: any) => {
    //       console.log(error.message);
    //     }
    //   );
    this.http
      .get<{ message: string; messages: any }>('http://localhost:3000/messages')
      .pipe(
        map((messageData) => {
          return messageData.messages.map((message) => {
            console.log(message.sender.name);
            return {
              id: message._id,
              subject: message.subject,
              msgText: message.msgText,
              sender: message.sender.name,
            };
          });
        })
      )
      .subscribe((transformedMessage) => {
        this.messages = transformedMessage;
        this.messageChangeEvent.next([...this.messages]);
      });
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
