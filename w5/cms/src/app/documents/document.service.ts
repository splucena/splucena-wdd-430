import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  documentSelectedEvent = new EventEmitter<Document>();

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
}
