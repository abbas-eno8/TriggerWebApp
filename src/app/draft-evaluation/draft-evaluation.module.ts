/**
 * @author Shahbaz Shaikh
 * @description Draft Evaluation module file
 */
import { NgModule } from '@angular/core';
// -------------------------------------------------------- //
import { SharedModule } from '../shared/shared.module';
import { DraftEvaluationRoutingModule } from './draft-evaluation-routing.module';
import { DraftEvaulationService } from './service/draft-evaulation.service';
import { EditEvaluationAdapter, EvaluationDraftListAdapter, PublishEvaluationAdapter } from './adapter/draft-evaluation.adapter';
import { DraftEvalutionContainerComponent } from './draft-evalution-container/draft-evalution.container';
import { DraftEvalutionPresentationComponent } from './draft-evalution-container/draft-evalution-presentation/draft-evalution.presentation';
import { EvaluationPreviewAttachmentComponent } from './draft-evalution-container/evaluation-preview-attachment/evaluation-preview-attachment.component';
import { EditEvaluationComponent } from './draft-evalution-container/edit-evaluation/edit-evaluation.component';


@NgModule({
  declarations: [
    DraftEvalutionContainerComponent,
    DraftEvalutionPresentationComponent,
    EvaluationPreviewAttachmentComponent,
    EditEvaluationComponent,
  ],
  imports: [
    SharedModule,
    DraftEvaluationRoutingModule,
  ],
  providers: [
    DraftEvaulationService,
    EvaluationDraftListAdapter,
    EditEvaluationAdapter,
    PublishEvaluationAdapter
  ],
  entryComponents:[
    EvaluationPreviewAttachmentComponent,
    EditEvaluationComponent
  ]
})
export class DraftEvaluationModule { }
