/**
@author : Mihir Patel
@class : SharedModule
@description :SharedModule is imported with all modules which are created.
**/
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TextMaskModule } from 'angular2-text-mask';
//  ................................................ //
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { CustomValidation } from './Validation/custom.validation';
import { TooltipComponent } from './tooltip/tooltip.component';
import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReadMoreComponent } from './read-more/read-more.component';
import { DatexPipe } from './pipes/date-pipe/date-pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatExpansionModule,
  MatListModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import { AddEditDepartmentComponent } from './modal-popup/add-edit-department/add-edit-department.component';
import { DeletePopupComponent } from './modal-popup/delete-popup/delete-popup.component';
import { ContentModalComponent } from './modal-popup/content-modal/content-modal.component';
import { CropImageComponent } from './modal-popup/crop-image/crop-image.component';
import { NoRecordsFoundComponent } from './no-records-found/no-records-found.component';
import { HeaderViewComponent } from './header-view/header-view.component';
import { ChildHeaderViewComponent } from './child-header-view/child-header-view.component';
import { MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { SearchViewComponent } from './search-view/search-view.component';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { A11yModule } from '@angular/cdk/a11y';
import { CustomFieldValidation } from './Validation/field-validation';
import { SettingsPopupComponent } from './modal-popup/settings-popup/settings-popup.component';
import { DateTimeStamp } from './directive/date-time-stamp/date-time-stamp';
import { AutoFocusDirective } from './directive/auto-focus-directive/auto-focus.directive';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SortByFieldService } from './services/sort-by-field/sort-by-field.service';
import { ReadMoreDirective } from './directive/read-more/read-more.directive';
import { NgSelectModule } from '@ng-select/ng-select';;
import { DateTimeConverterService } from './services/date-time-converter/date-time-converter.service';
import { AttachFileUrlComponent } from './modal-popup/attach-file-url/attach-file-url.component';
import { FocusInitDirective } from './directive/focus-initialize/focus-init.directive';
import { CurrentScoreComponent } from './components/dashboard-components/current-score/current-score.component';
import { ActualRatingCompletedComponent } from './components/dashboard-components/actual-rating-completed/actual-rating-completed.component';
import { CurrentYearAverageScoreComponent } from './components/dashboard-components/current-year-average-score/current-year-average-score.component';
import { ComparedAverageScoreComponent } from './components/dashboard-components/compared-average-score/compared-average-score.component';
import { LineGraphComponent } from './components/dashboard-components/line-graph/line-graph.component';
import { MonthlyLineGraphComponent } from './components/dashboard-components/monthly-line-graph/monthly-line-graph.component';
import { YearlyLineGraphComponent } from './components/dashboard-components/yearly-line-graph/yearly-line-graph.component';
import { ThreeColumnMobileViewComponent } from './components/dashboard-components/mobile-view/three-column-mobile-view/three-column-mobile-view.component';
import { SparkViewComponent } from './components/dashboard-components/spark-view/spark-view.component';
import { CommentViewComponent } from './components/dashboard-components/comment-view/comment-view.component';
import { PreviewFileComponent } from './components/dashboard-components/preview-file/preview-file.component';
import { EvaluationStatusComponent } from './components/dashboard-components/evaluation-status/evaluation-status.component';
import { MailContentComponent } from './modal-popup/mail-content/mail-content.component';
import { SharedFunctionService } from './services/shared-function/shared-function.service';
import { BlobToByteArrayService } from './services/blob-to-byte-array/blob-to-byte-array.service';
import { ListPresentation } from './components/list-presentation/list.presentation';
import { DesktopViewPresentation } from './components/list-presentation/desktop-view-presentation/desktop-view.presentation';
import { AccordianViewPresentation } from './components/list-presentation/accordian-view-presentation/accordian-view.presentation';
import { SharedPaginationPresentation } from './components/list-presentation/pagination-presentation/pagination.presentation';
import { ActionsPresentation } from './components/list-presentation/actions-presentation/actions.presentation';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { KeyEventDirective } from './directive/key-event/key-event.directive';
import { UserWorkLocationComponent } from '../user-work-location/user-work-location.component';
import { SparkWidgetComponent } from './components/dashboard-components/spark-widget/spark-widget.component';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';
import { OpenOverlayService } from './services/open-cdk-overlay/open-overlay.service';
import { AssessmentAdapter } from './adapter/assessment-adapter/assessment-adapter';
import { MyWallContainer } from './components/my-wall-container/my-wall.container';
import { MyWallPresentation } from './components/my-wall-container/my-wall-presentation/my-wall.presentation';
import { LikePresentation } from './components/my-wall-container/my-wall-presentation/like-presentation/like.presentation';
import { ReactionTooltip } from './components/my-wall-container/my-wall-presentation/reaction-tooltip/reaction-tooltip';
import { MyWallAdapter } from './services/my-wall-adapter/my-wall-adapter';
import { MyWallService } from './services/my-wall-service/my-wall.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MyWallPresenter } from './components/my-wall-container/my-wall-presenter/my-wall.presenter';
import { SignatureComponent } from './components/signature/signature.component';
import { ReportsViewComponent } from './components/dashboard-components/reports-view/reports-view.component';
import { DateAgoPipe } from './pipes/date-ago-Pipe/date-ago.pipe';
import { PublishEvaultionComponent } from './modal-popup/publish-evaultion/publish-evaultion.component';
import { SparkUsersComponent } from './components/my-wall-container/my-wall-presentation/spark-users/spark-users.component';
import { LinkifyPipe } from './pipes/LinkiFy/linkify.pipe';
import { AlphabetWiseSearchPipe } from './pipes/alphabet-wise-search/alphabet-wise-search.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    TextMaskModule,
    ImageCropperModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    LayoutModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    NgSelectModule,
    A11yModule,
    //NgxMaterialTimepickerModule,
    NgxMaterialTimepickerModule.setLocale("pt-PT"),
    InfiniteScrollModule
  ],
  declarations: [
    EllipsisPipe,
    SearchPipePipe,
    CustomValidation,
    TooltipComponent,
    DatexPipe,
    DateAgoPipe,
    ReadMoreComponent,
    ContentModalComponent,
    AddEditDepartmentComponent,
    DeletePopupComponent,
    CropImageComponent,
    NoRecordsFoundComponent,
    SearchViewComponent,
    HeaderViewComponent,
    ChildHeaderViewComponent,
    CustomFieldValidation,
    SettingsPopupComponent,
    KeyEventDirective,
    DateTimeStamp,
    AutoFocusDirective,
    ReadMoreDirective,
    AttachFileUrlComponent,
    FocusInitDirective,
    CurrentScoreComponent,
    ActualRatingCompletedComponent,
    CurrentYearAverageScoreComponent,
    ComparedAverageScoreComponent,
    LineGraphComponent,
    MonthlyLineGraphComponent,
    YearlyLineGraphComponent,
    ThreeColumnMobileViewComponent,
    SparkViewComponent,
    CommentViewComponent,
    PreviewFileComponent,
    EvaluationStatusComponent,
    MailContentComponent,
    ListPresentation,
    DesktopViewPresentation,
    AccordianViewPresentation,
    SharedPaginationPresentation,
    ActionsPresentation,
    UserWorkLocationComponent,
    SparkWidgetComponent,
    SurveyFormComponent,
    MyWallContainer,
    MyWallPresentation,
    LikePresentation,
    ReactionTooltip,
    SignatureComponent,
    ReportsViewComponent,
    PublishEvaultionComponent,
    SparkUsersComponent,
    LinkifyPipe,
    AlphabetWiseSearchPipe
  ],
  providers: [
    SearchPipePipe,
    CustomValidation,
    DatexPipe,
    DateAgoPipe,
    CustomFieldValidation,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        disableClose: true,
        position: { top: '30' },
        panelClass: 'custom-dialog-container',
        autoFocus: true,
        backdropClass: 'backdropClass'
      }
    },
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' },
    KeyEventDirective,
    SortByFieldService,
    ReadMoreDirective,
    DateTimeConverterService,
    SharedFunctionService,
    BlobToByteArrayService,
    OpenOverlayService,
    AssessmentAdapter,
    MyWallAdapter,
    MyWallPresenter,
    MyWallService,
    DatePipe
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    EllipsisPipe,
    SearchPipePipe,
    CustomValidation,
    TooltipComponent,
    BsDatepickerModule,
    TextMaskModule,
    DatexPipe,
    DateAgoPipe,
    ImageCropperModule,
    ReadMoreComponent,
    NoRecordsFoundComponent,
    SearchViewComponent,
    HeaderViewComponent,
    ChildHeaderViewComponent,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    SearchViewComponent,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    LayoutModule,
    MatExpansionModule,
    CustomFieldValidation,
    KeyEventDirective,
    DateTimeStamp,
    AutoFocusDirective,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    ReadMoreDirective,
    NgSelectModule,
    A11yModule,
    FocusInitDirective,
    CurrentScoreComponent,
    ActualRatingCompletedComponent,
    CurrentYearAverageScoreComponent,
    ComparedAverageScoreComponent,
    LineGraphComponent,
    MonthlyLineGraphComponent,
    YearlyLineGraphComponent,
    ThreeColumnMobileViewComponent,
    SparkViewComponent,
    CommentViewComponent,
    PreviewFileComponent,
    MailContentComponent,
    ListPresentation,
    NgxMaterialTimepickerModule,
    UserWorkLocationComponent,
    //NgxMaterialTimepickerModule.setLocale("pt-PT")
    SparkWidgetComponent,
    SurveyFormComponent,
    MyWallContainer,
    MyWallPresentation,
    LikePresentation,
    ReactionTooltip,
    SignatureComponent,
    ReportsViewComponent,
    PublishEvaultionComponent,
    SparkUsersComponent,
    LinkifyPipe,
    AlphabetWiseSearchPipe,
  ],
  entryComponents: [
    ContentModalComponent,
    AddEditDepartmentComponent,
    DeletePopupComponent,
    CropImageComponent,
    SettingsPopupComponent,
    NoRecordsFoundComponent,
    AttachFileUrlComponent,
    CurrentScoreComponent,
    ActualRatingCompletedComponent,
    CurrentYearAverageScoreComponent,
    ComparedAverageScoreComponent,
    LineGraphComponent,
    MonthlyLineGraphComponent,
    YearlyLineGraphComponent,
    ThreeColumnMobileViewComponent,
    SparkViewComponent,
    CommentViewComponent,
    PreviewFileComponent,
    EvaluationStatusComponent,
    MailContentComponent,
    ListPresentation,
    DesktopViewPresentation,
    AccordianViewPresentation,
    SharedPaginationPresentation,
    SparkWidgetComponent,
    SurveyFormComponent,
    MyWallContainer,
    LikePresentation,
    SignatureComponent,
    ReportsViewComponent,
    PublishEvaultionComponent,
    SparkUsersComponent
  ]
})
export class SharedModule { }
