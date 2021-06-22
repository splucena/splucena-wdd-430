import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  //messageChangeEvent = new EventEmitter<Message[]>();
  messageChangeEvent = new Subject<Message[]>();

  getMessages(): any {
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

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; messages: Message; _id: string }>(
        'http://localhost:3000/Messages',
        newMessage,
        { headers: headers }
      )
      .subscribe((responseData) => {
        newMessage.id = responseData._id;
        this.messages.push(newMessage);
        this.messageChangeEvent.next([...this.messages]);
      });

    //this.messages.push(message);
    //this.storeMessages();
  }
}
