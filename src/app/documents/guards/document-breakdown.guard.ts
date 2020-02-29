import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { DocumentsState } from '@app/core/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import * as fromStore from '../../core/store';

@Injectable()
export class DocumentBreakdownGuard implements CanActivate {
  constructor(private store: Store<DocumentsState>) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const theDocumentId = (route.params as any).documentId;

    return this.hasDetailedAsset(theDocumentId)
        .pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
  }

  hasDetailedAsset(documentId: string): Observable<boolean> {
    return this.store.pipe(select(fromStore.hasConsolidatedInformation(documentId)))
        .pipe(
            tap((hasDetail: boolean) => {
              console.log(hasDetail);
              if (!hasDetail) {
                return this.store.dispatch(new fromStore.LoadConsolidatedDocumentById(documentId));
              }
            })
        );
  }
}
