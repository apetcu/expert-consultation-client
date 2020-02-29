import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentConsolidate, IDocumentMetadata, Page } from '../models/';
import { environment } from '@env/environment';

@Injectable()
export class DocumentsApiService {

  constructor(private http: HttpClient) {
  }

  private get url() {
    return `${environment.api_url}/documents`;
  }

  public list(): Observable<Page<IDocumentMetadata>> {
    return this.http.get<Page<IDocumentMetadata>>(this.url);
  }

  public get(documentId: string): Observable<IDocumentConsolidate> {
    return this.http.get<IDocumentConsolidate>(`${this.url}/${documentId}`);
  }


  public getConsolidated(documentId: string): Observable<IDocumentConsolidate> {
    return this.http.get<IDocumentConsolidate>(`${this.url}/${documentId}/consolidated`);
  }

  public post(documentMetadata: IDocumentMetadata) {
    return this.http.post(`${this.url}`, documentMetadata);
  }
}
