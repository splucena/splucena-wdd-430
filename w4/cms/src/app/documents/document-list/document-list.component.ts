import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  public documents: Document[] = [
    new Document(1, 'CIT 260', 'Object Oriented Programming', 'CIT 260 URL', null),
    new Document(2, 'CIT 366', 'Web Full Stack Development', 'CIT 430 URL', null),
    new Document(3, 'Eng 150', 'English Writing & Reasoning', 'CIT 150 URL', null),
    new Document(4, 'CIT 262', 'DevOps', 'CIT 262 URL', null),
    new Document(5, 'CIT 301', 'Web Engineering', 'CIT 301 URL', null)
  ]

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
