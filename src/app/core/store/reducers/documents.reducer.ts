import { DocumentConsolidate, DocumentMetadata, Error, IDocumentConsolidate, IDocumentMetadata, IPageData, PageData } from '../../models';
import * as fromDocuments from '../actions/documents.action';

export interface DocumentsState {
  entities: { [id: string]: IDocumentMetadata };
  loaded: boolean;
  loading: boolean;
  pageData: IPageData;
  error: Error;
}

export const initialState: DocumentsState = {
  entities: {},
  loaded: false,
  loading: false,
  pageData: {} as IPageData,
  error: null
};

export function reducer(state = initialState, action: fromDocuments.DocumentsAction): DocumentsState {

  switch (action.type) {
    case fromDocuments.DocumentsActionTypes.LoadDocuments:
      return {
        ...state,
        loading: true,
      };

    case fromDocuments.DocumentsActionTypes.LoadDocumentsSuccess: {
      const documentsPage = action.payload;
      const documents = documentsPage.content;
      const entities = documents.reduce((e: { [id: string]: DocumentMetadata }, document: DocumentMetadata) => {
        return {
          ...e,
          [document.id]: document.toJson(),
        };
      }, {});
      const pageData = new PageData();
      pageData.fromPage(documentsPage);

      return {
        ...state,
        loading: false,
        loaded: true,
        pageData: pageData.toJson(),
        entities,
      };
    }

    case fromDocuments.DocumentsActionTypes.LoadConsolidatedDocumentByIdSuccess: {
      console.log(action.payload);
      const theDocument: DocumentConsolidate = action.payload;
      const entities = {
        ...state.entities,
        [theDocument.id]: {
          ...state.entities[theDocument.id], consolidated: theDocument
        },
      };

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }
    case fromDocuments.DocumentsActionTypes.LoadDocumentsFail:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default: {
      return state;
    }
  }
}

export const getDocumentsEntities = (state: DocumentsState) => state.entities;
export const getDocumentsLoading = (state: DocumentsState) => state.loading;
export const getDocumentsLoaded = (state: DocumentsState) => state.loaded;
export const getDocumentsPageData = (state: DocumentsState) => state.pageData;
