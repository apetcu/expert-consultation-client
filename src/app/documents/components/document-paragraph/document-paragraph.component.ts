import { Component, Input, OnInit } from '@angular/core';
import { DocumentNode } from '@app/core';

@Component({
  selector: 'app-document-paragraph',
  templateUrl: './document-paragraph.component.html',
  styleUrls: ['./document-paragraph.component.scss']
})
export class DocumentParagraphComponent {
  @Input() documentNode: DocumentNode;
}
