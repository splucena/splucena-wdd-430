import { Component, Input, OnInit } from '@angular/core';

// always declare this
// to avoid property does not exist on type object error
// ng will display error even when using
// the safe navigation operator "?."
// document?.name or document !== null ? document.name : ''
// will still return an error
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  @Input('document') document: Document;

  constructor() { }

  ngOnInit(): void {
  }

}
