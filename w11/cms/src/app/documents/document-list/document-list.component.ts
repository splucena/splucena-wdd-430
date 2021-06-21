import { Route } from '@angular/compiler/src/core';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  public documents: Document[] = [];
  private subscription: Subscription;

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentChangeEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.documents.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      }
    );
  }

  onNewDocument() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
