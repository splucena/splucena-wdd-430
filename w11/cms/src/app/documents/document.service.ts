import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  documentSelectedEvent = new Subject<Document>();
  documentChangeEvent = new Subject<Document[]>();

  getDocuments(): any {
    this.http
      .get<{ message: string; documents: any }>(
        'http://localhost:3000/documents'
      )
      .pipe(
        map((documentData) => {
          return documentData.documents.map((document) => {
            return {
              name: document.name,
              description: document.description,
              url: document.url,
              children: document.children,
              id: document._id,
            };
          });
        })
      )
      .subscribe((transformedDocuments) => {
        this.documents = transformedDocuments;
        this.documents.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        this.documentChangeEvent.next([...this.documents]);
      });
  }

  storeDocuments() {
    let stringifyDocuments = JSON.stringify(this.documents);
    this.http
      .put(
        'https://openerp-204808-default-rtdb.firebaseio.com/documents.json',
        stringifyDocuments,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe(() => {
        this.documentChangeEvent.next(this.documents.slice());
      });
  }

  getDocument(id: string) {
    for (let d of this.documents) {
      if (d.id === id) {
        return d;
      }
    }

    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach((element) => {
      let currentId = +element.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; document: Document; _id: string }>(
        'http://localhost:3000/documents',
        newDocument,
        { headers: headers }
      )
      .subscribe((responseData) => {
        newDocument.id = responseData._id;
        this.documents.push(newDocument);
        this.documentChangeEvent.next([...this.documents]);
      });
  }

  udpateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    //newDocument._id = originalDocument._id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        this.documentChangeEvent.next([...this.documents]);
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe((response: Response) => {
        this.documents.splice(pos, 1);
        this.documentChangeEvent.next([...this.documents]);
      });
  }
}
