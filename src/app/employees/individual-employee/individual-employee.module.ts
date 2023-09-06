/**
@author : Mihir Patel
@class : AssessmentModule
@description :AssessmentModule is created for assessment page, which contain AssessmentComponent.
**/
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
// ........................................ //
import { SharedModule } from '../../shared/shared.module';
import { IndividualEmployeeComponent } from './individual-employee.component';
import { TriggerCommentComponent } from './individual-employee-widget/trigger-comment/trigger-comment.component';
import { IndividualEmployeeRoutingModule } from './individual-employee.routing.module';
import { SparkAnEmployeeService } from '../spark-an-employee/spark-an-employee-service/spark-an-employee.service';
import { SparkAnEmployeeAdapter } from '../spark-an-employee/spark-an-employee-adapter/spark-an-employee-adapter';
import { PdfSelectionComponent } from './generate-pdf/pdf-selection/pdf-selection.component';
import { PdfViewComponent } from './generate-pdf/pdf-view/pdf-view.component';
import { GeneratePdfService } from './generate-pdf/generate-pdf-service/generate-pdf.service';
import { ManagerActionsComponent } from './individual-employee-widget/manager-actions/manager-actions.component';
import { EditCommentAdapter, PublishAssessmentAdapter, ShareCommentAdapter } from './adapter/individual-employee.adpater';
import { CommentService } from './individual-employee-widget/trigger-comment/service/comment.service';
import { EditCommentComponent } from './individual-employee-widget/trigger-comment/edit-delete-comment/edit-delete-comment.component';
import { PreviewAttachmentComponent } from './individual-employee-widget/trigger-comment/preview-attachment/preview-attachment.component';

@NgModule({
  imports: [
    SharedModule,
    IndividualEmployeeRoutingModule
  ],
  declarations: [
    IndividualEmployeeComponent,
    TriggerCommentComponent,
    // SparkWidgetComponent,
    ManagerActionsComponent,
    PdfSelectionComponent,
    PdfViewComponent,
    EditCommentComponent,
    PreviewAttachmentComponent
  ],
  providers: [
    DatePipe,
    SparkAnEmployeeService,
    SparkAnEmployeeAdapter,
    GeneratePdfService,
    CommentService,
    EditCommentAdapter,
    PublishAssessmentAdapter,
    ShareCommentAdapter
  ],
  entryComponents: [
    TriggerCommentComponent,
    // SparkWidgetComponent,
    PdfSelectionComponent,
    PdfViewComponent,
    ManagerActionsComponent,
    EditCommentComponent,
    PreviewAttachmentComponent
  ]
})
export class IndividualEmployeeModule { }