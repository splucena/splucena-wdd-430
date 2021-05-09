import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-documents',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  selectedDocument: Document;
  
  constructor() { }

  ngOnInit(): void {
  }

}
