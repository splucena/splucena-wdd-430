import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[];
  private maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  documentSelectedEvent = new Subject<Document>();
  documentChangeEvent = new Subject<Document[]>();

  getDocuments() {
    return this.documents.slice();
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
    let documentListClone = this.documents.slice();
    this.documentChangeEvent.next(documentListClone);
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
    const documentListClose = this.documents.slice();
    this.documentChangeEvent.next(documentListClose);
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
    const documentListClone = this.documents.slice();
    this.documentChangeEvent.next(documentListClone);
  }
}
