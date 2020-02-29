import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentMetadata } from '@app/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-breakdown',
  templateUrl: './document-breakdown.component.html',
  styleUrls: ['./document-breakdown.component.scss']
})
export class DocumentBreakdownComponent implements OnInit {
  public documentInfo$: Observable<DocumentMetadata>;

  constructor(private store: Store<CoreState>, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.documentInfo$ = this.store.pipe(select(fromStore.getDocumentById(params.documentId)));
    });
  }

}
