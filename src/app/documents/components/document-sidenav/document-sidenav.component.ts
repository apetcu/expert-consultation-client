import { Component, Input, OnInit } from '@angular/core';
import { DocumentNode } from '@app/core';

@Component({
  selector: 'app-document-sidenav',
  templateUrl: './document-sidenav.component.html',
  styleUrls: ['./document-sidenav.component.scss']
})
export class DocumentSidenavComponent {
  @Input() documentNode: DocumentNode;

  scrollIntoView(id: string) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
  }

}
