/**
@author : Mihir Patel
@class : AssessmentModule
@description :AssessmentModule is created for assessment page, which contain AssessmentComponent.
**/
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// ........................................ //
import { AssessmentRoutingModule } from './assesment-routing.module';
import { AssessmentComponent } from './assessment.component';
import { AssessmentScoreComponent } from './assessment-score/assessment-score.component';
import { AssessmentService } from './assessment.service';
import { SharedModule } from '../shared/shared.module';
import { FeedbackConfirmationComponent } from './feedback-confirmation/feedback-confirmation.component';
import { SelectScoreComponent } from './select-score/select-score.component';
import { SurveyConfirmationComponent } from './survey-confirmation/survey-confirmation.component';

@NgModule({
  imports: [
    AssessmentRoutingModule,
    SharedModule
  ],
  declarations: [
    AssessmentComponent,
    AssessmentScoreComponent,
    FeedbackConfirmationComponent,
    SelectScoreComponent,
    SurveyConfirmationComponent
  ],
  providers: [
    AssessmentService
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    FeedbackConfirmationComponent,
    SelectScoreComponent,
    SurveyConfirmationComponent
  ]
})
export class AssessmentModule { }