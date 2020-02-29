import {DocumentNode, IDocumentNode} from './document-node.model';

export interface IDocumentConsolidate {
  id: string;
  documentNode?: IDocumentNode;
}

export class DocumentConsolidate {
  id: string;
  documentNode?: DocumentNode;

  constructor(data: IDocumentConsolidate) {
    this.fromJson(data);
  }

  fromJson(data: IDocumentConsolidate) {
    this.id = data.id;
    this.documentNode = new DocumentNode(data.documentNode);
  }

  toJson(): IDocumentConsolidate {
    return {
      id: this.id,
      documentNode: this.documentNode.toJson(),
    };
  }
}
