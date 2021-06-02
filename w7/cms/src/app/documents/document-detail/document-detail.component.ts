import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/win-ref.service';

// always declare this
// to avoid property does not exist on type object error
// ng will display error even when using
// the safe navigation operator "?."
// document?.name or document !== null ? document.name : ''
// will still return an error
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private windowRefService: WindRefService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.document = this.documentService.getDocument(this.id);
    });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}