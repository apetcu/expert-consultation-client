import { Action } from '@ngrx/store';
import { IDocumentMetadata, DocumentConsolidate, Page, DocumentMetadata } from '../../models';

export enum DocumentsActionTypes {
  LoadDocuments = '[Documents] Load Documents',
  LoadConsolidatedDocumentById = '[Documents] Load Consolidated Document by ID',
  LoadConsolidatedDocumentByIdSuccess = '[Documents] Load Consolidated Document by ID Success',
  LoadConsolidatedDocumentByIdFail = '[Documents] Load Consolidated Document by ID FAIL',
  LoadDocumentsSuccess = '[Documents] Load Documents Success',
  LoadDocumentsFail = '[Documents] Load Documents Fail',
  SaveDocument = '[Documents] Save Documents',
  SaveDocumentSuccess = '[Documents] Save Documents Success',
  SaveDocumentFail = '[Documents] Save Documents Fail'
}

export class LoadConsolidatedDocumentById implements Action {
  readonly type = DocumentsActionTypes.LoadConsolidatedDocumentById;
  constructor(public payload: string) {
  }
}

export class LoadConsolidatedDocumentByIdSuccess implements Action {
  readonly type = DocumentsActionTypes.LoadConsolidatedDocumentByIdSuccess;

  constructor(public payload: DocumentConsolidate) {
  }
}

export class LoadConsolidatedDocumentByIdFail implements Action {
  readonly type = DocumentsActionTypes.LoadConsolidatedDocumentByIdFail;

  constructor(public payload: DocumentConsolidate) {
  }
}

export class LoadDocuments implements Action {
  readonly type = DocumentsActionTypes.LoadDocuments;
}

export class LoadDocumentsSuccess implements Action {
  readonly type = DocumentsActionTypes.LoadDocumentsSuccess;

  constructor(public payload: Page<DocumentMetadata>) {
  }
}

export class LoadDocumentsFail implements Action {
  readonly type = DocumentsActionTypes.LoadDocumentsFail;

  constructor(public error: any) {
  }
}

export class SaveDocument implements Action {
  readonly type = DocumentsActionTypes.SaveDocument;

  constructor(public payload: IDocumentMetadata) {}
}

export class SaveDocumentSuccess implements Action {
  readonly type = DocumentsActionTypes.SaveDocumentSuccess;

  constructor(public payload: IDocumentMetadata) {}
}

export class SaveDocumentFail implements Action {
  readonly type = DocumentsActionTypes.SaveDocumentFail;

  constructor(public payload: any) {}
}

export type DocumentsAction =
    | LoadDocuments
    | LoadDocumentsFail
    | LoadConsolidatedDocumentById
    | LoadConsolidatedDocumentByIdSuccess
    | LoadConsolidatedDocumentByIdFail
    | LoadDocumentsSuccess
    | SaveDocument
    | SaveDocumentSuccess
    | SaveDocumentFail;
