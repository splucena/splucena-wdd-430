import { Route } from '@angular/compiler/src/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  public documents: Document[] = [];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangeEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }

  onNewDocument() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
