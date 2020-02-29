import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentsApiService } from '../http';
import { DocumentConsolidate, DocumentMetadata, DocumentNode, IDocumentConsolidate, IDocumentMetadata, Page } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class DocumentsService {

  constructor(private documentsApiService: DocumentsApiService) {
  }

  public list(): Observable<Page<DocumentMetadata>> {
    return this.documentsApiService.list()
        .pipe(map(value => this.mapPage(value)));
  }

  public get(id: string): Observable<IDocumentConsolidate> {
    return this.documentsApiService.get(id)
        .pipe(map(value => new DocumentConsolidate(value)));
  }

  public getConsolidated(id: string): Observable<IDocumentConsolidate> {
    return this.documentsApiService.getConsolidated(id)
        .pipe(map(value => new DocumentConsolidate(value)));
  }

  public save(documentMetadata: DocumentMetadata): Observable<DocumentMetadata> {
    return this.documentsApiService
        .post(documentMetadata.toJson())
        .pipe(map((iDocument: IDocumentMetadata) => new DocumentMetadata(iDocument)));
  }

  private mapPage(userPage: Page<IDocumentMetadata>): Page<DocumentMetadata> {
    const result = new Page<DocumentMetadata>(userPage);
    result.content = userPage.content.map(this.fromResponse);
    return result;
  }

  private fromResponse(documentResponse: IDocumentMetadata): DocumentMetadata {
    return new DocumentMetadata(documentResponse);
  }
}
