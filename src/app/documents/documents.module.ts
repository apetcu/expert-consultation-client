import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { DocumentsRoutingModule } from './documents-routing.module';
import * as fromComponents from './components';
import * as fromContainer from './containers';
import * as fromGuards from './guards';
import { CommonModule } from '@angular/common';
import { DocumentParagraphComponent } from './components/document-paragraph/document-paragraph.component';
import { MatGridListModule } from '@angular/material';
import { DocumentSidenavComponent } from './components/document-sidenav/document-sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DocumentsRoutingModule,
    MatGridListModule,
  ],
  declarations: [
    ...fromContainer.components,
    ...fromComponents.components,
    DocumentParagraphComponent,
    DocumentSidenavComponent,
  ],
  providers: [
    ...fromGuards.guards,
  ],
})
export class DocumentsModule {
}
