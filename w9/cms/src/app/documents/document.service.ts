import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

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
      .get('https://openerp-204808-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents || [];
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          this.documentChangeEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log(error.message);
        }
      );
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

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    //let documentListClone = this.documents.slice();
    //this.documentChangeEvent.next(documentListClone);
    this.storeDocuments();
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
    this.documents[pos] = newDocument;
    //const documentListClose = this.documents.slice();
    //this.documentChangeEvent.next(documentListClose);
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    //const documentListClone = this.documents.slice();
    //this.documentChangeEvent.next(documentListClone);
    this.storeDocuments();
  }
}
