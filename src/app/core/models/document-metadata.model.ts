import { DocumentType } from './document-type.enum';
import { DocumentConsolidate, IDocumentConsolidate } from '@app/core';

export interface IDocumentMetadata {
  id: string;
  documentNumber: number;
  documentTitle: string;
  documentInitializer: string;
  documentType: DocumentType;
  dateOfDevelopment: Date;
  dateOfReceipt: Date;
  filePath: string;
  consolidated?: IDocumentConsolidate;
}

export class DocumentMetadata {
  id: string;
  documentNumber: number;
  documentTitle: string;
  documentInitializer: string;
  documentType: DocumentType;
  dateOfDevelopment: Date;
  dateOfReceipt: Date;
  filePath: string;
  consolidated?: DocumentConsolidate;

  constructor(data?: IDocumentMetadata) {
    if (data) {
      this.fromJson(data);
    }
  }

  fromJson(data: IDocumentMetadata) {
    this.id = data.id;
    this.documentNumber = data.documentNumber;
    this.documentTitle = data.documentTitle;
    this.documentInitializer = data.documentInitializer;
    this.documentType = data.documentType;
    this.dateOfDevelopment = new Date(data.dateOfDevelopment);
    this.dateOfReceipt = new Date(data.dateOfReceipt);
    this.filePath = data.filePath;
    this.consolidated = data.consolidated ? new DocumentConsolidate(data.consolidated) : null;
  }

  toJson(): IDocumentMetadata {
    return {
      id: this.id,
      documentNumber: this.documentNumber,
      documentTitle: this.documentTitle,
      documentInitializer: this.documentInitializer,
      documentType: this.documentType,
      dateOfDevelopment: this.dateOfDevelopment,
      dateOfReceipt: this.dateOfReceipt,
      filePath: this.filePath
    };
  }

  fromFormData(formData: any, filePath: string) {
    this.fromJson(formData);
  }

  toFormData(): any {
    return this.toJson();
  }

  hasConsolidatedInformation(): boolean {
    return this.consolidated !== null;
  }
}
