import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as documentsActions from '../actions';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { DocumentsService } from '../../services';
import { Error, IDocumentConsolidate, Page } from '@app/core';
import { of } from 'rxjs';
import { DocumentConsolidate, DocumentMetadata } from '../../models/';
import { CoreState } from '@app/core/store';
import { Store } from '@ngrx/store';

@Injectable()
export class DocumentsEffect {

  @Effect()
  loadDocuments$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.LoadDocuments),
      switchMap(() => this.documentsService.list()
          .pipe(
              map((documentsPage: Page<DocumentMetadata>) => new documentsActions.LoadDocumentsSuccess(documentsPage)),
              catchError(error => of(new documentsActions.LoadDocumentsFail(error)))
          )
      ));

  @Effect()
  loadConsolidatedDocument$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.LoadConsolidatedDocumentById),
      map((action: documentsActions.LoadConsolidatedDocumentById) => action.payload),
      switchMap((entry) => this.documentsService.getConsolidated(entry)
          .pipe(
              map((documentsPage: DocumentConsolidate) => new documentsActions.LoadConsolidatedDocumentByIdSuccess(documentsPage)),
              catchError(error => of(new documentsActions.LoadConsolidatedDocumentByIdFail(error)))
          )
      ));

  @Effect()
  saveDocument$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.SaveDocument),
      map((action: documentsActions.SaveDocument) => action.payload),
      concatMap((document: DocumentMetadata) => {
        return this.documentsService.save(document).pipe(
            map((savedDocument: DocumentMetadata) => new documentsActions.SaveDocumentSuccess(savedDocument)),
            catchError(error => of(new documentsActions.SaveDocumentFail(this.mapError(error))))
        );
      })
  );

  constructor(private store$: Store<CoreState>,
              private actions$: Actions,
              private documentsService: DocumentsService) {
  }

  private mapError(payload: any): Error {
    return payload.error.i18nFieldErrors;
  }
}
