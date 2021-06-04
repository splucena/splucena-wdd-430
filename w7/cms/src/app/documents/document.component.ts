import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit, OnDestroy {
  selectedDocument: Document;
  private subscription: Subscription;

  constructor(private documentService: DocumentService) {
    this.subscription = this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
