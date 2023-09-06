import { NgModule } from '@angular/core';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyListContainer } from './survey-list-container/survey-list-container';
import { SurveyListPresentation } from './survey-list-container/survey-list-presentation/survey-list-presentation';
import { SurveyDesktopPresentation } from './survey-list-container/survey-list-presentation/survey-desktop-presentation/survey-desktop-presentation';
import { SurveyAccordionPresentation } from './survey-list-container/survey-list-presentation/survey-accordion-presentation/survey-accordion-presentation';
import { SharedModule } from '../shared/shared.module';
import { SurveyPresenter } from './survey-list-container/survey-list-presentation/survey-presenter/survey-presenter';
import { SurveyFormContainer } from './survey-form-container/survey-form-container';
import { SurveyFormPresenter } from './survey-form-container/survey-form-presentation/survey-form-presenter/survey-form-presenter';
import { SurveyFormPresentation } from './survey-form-container/survey-form-presentation/survey-form-presentation';
import { SurveyService } from './survey-service/survey.service';
import { SurveyListAdapter, SurveyFormAdapter, SurveyDeatilsAdapter, SurveyActiveListAdapter } from './survey-adapter/survey-adapter';
import { SurveyPreviewPresentation } from './survey-preview-containern/survey-preview-presentation/survey-preview-presentation';
import { SurveyPreviewContainer } from './survey-preview-containern/survey-preview-containern';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateSurveyConfirmationComponent } from './survey-form-container/survey-form-presentation/create-survey-confirmation/create-survey-confirmation.component';
import { SurveyPreviewPresenter } from './survey-preview-containern/survey-preview-presentation/survey-preview-presenter/survey-preview-presenter';
import { SurveyDetailsContainer } from './survey-details-container/survey-details.container';
import { SurveyDetailsPresentation } from './survey-details-container/survey-deatils-presentation/survey-details.presentation';
import { SurveyDetailsPresenter } from './survey-details-container/survey-details-presenter/survey-details.presenter';
import { SurveyPaginationPresentation } from './survey-list-container/survey-list-presentation/pagination-presentation/pagination.presentation';
import { CsvExportService } from './survey-details-container/csv-export/csv-export.service';
import { ActiveSurveyConfirmationComponent } from './survey-list-container/survey-list-presentation/active-survey-confirmation/active-survey-confirmation.component';
import { SelectDimensionComponent } from './survey-form-container/select-dimension/select-dimension.component';
import { SelectDimensionPresenter } from './survey-form-container/select-dimension-presenter/select-dimension-presenter';

@NgModule({  
  imports: [
    SharedModule,
    SurveyRoutingModule,
    DragDropModule
  ],
  providers: [
    SurveyListAdapter,
    SurveyActiveListAdapter,
    SurveyFormAdapter,
    SurveyPresenter,
    SurveyFormPresenter,
    SurveyPreviewPresenter,
    SurveyService,
    SurveyDetailsPresenter,
    CsvExportService,
    SurveyDeatilsAdapter,
    SelectDimensionPresenter
  ],
  declarations: [
    SurveyListContainer,
    SurveyListPresentation,
    SurveyDesktopPresentation,
    SurveyAccordionPresentation,
    SurveyFormContainer,
    SurveyFormPresentation,
    SurveyPreviewContainer,
    SurveyPreviewPresentation,
    CreateSurveyConfirmationComponent,
    SurveyDetailsContainer,
    SurveyDetailsPresentation,
    SurveyPaginationPresentation,
    ActiveSurveyConfirmationComponent,
    SelectDimensionComponent
  ],
  entryComponents: [
    SurveyDesktopPresentation,
    SurveyAccordionPresentation,
    CreateSurveyConfirmationComponent,
    SurveyDetailsPresentation,
    SurveyPaginationPresentation,
    ActiveSurveyConfirmationComponent,
    SelectDimensionComponent
  ]
})
export class SurveyModule { }
