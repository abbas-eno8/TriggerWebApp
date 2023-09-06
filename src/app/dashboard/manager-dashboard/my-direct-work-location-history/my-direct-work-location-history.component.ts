import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, ComponentRef } from '@angular/core';
import { MyDirectWorkLocationHistoryService } from './my-direct-location-history-service/my-direct-work-location-history.service';
import { LoaderService } from '../../../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { UserModel } from '../../../core/model/user';
import { CustomLoaderService } from '../../../core/custom-loader/custom-loader.service';
import { DashboardPassHeaderName } from '../manager-dashboard-model';
import { OverlayRefModel } from '../../../shared/modals/survey-form-model';
import { SurveyFormComponent } from '../../../shared/components/survey-form/survey-form.component';
import { OverlayRef } from '@angular/cdk/overlay';
import { OpenOverlayService } from '../../../shared/services/open-cdk-overlay/open-overlay.service';
import { AssessmentAdapter } from '../../../shared/adapter/assessment-adapter/assessment-adapter';
import { MyDirectLocationPresenter } from './my-direct-location-presenter/my-direct-location-presenter.service';
import { WorkLocationHistory } from './my-direct-location-model';

@Component({
  selector: '[trigger-my-direct-work-location-history].col-xl-12 .col-sm-12 .px-0 .grid-item[id=my-direct-work-location-history]',
  templateUrl: './my-direct-work-location-history.component.html',
  styleUrls: ['./my-direct-work-location-history.component.scss'],
  providers: [MyDirectWorkLocationHistoryService, MyDirectLocationPresenter]
})
export class MyDirectWorkLocationHistoryComponent implements OnInit {
  @Output() removeTile = new EventEmitter<string>();
  public todayWorkLocationHistory: WorkLocationHistory[];
  public todayWorkLocationPastHistory;
  public user: UserModel;
  public selectedEmployeeId: number;
  public selectedName: string;
  public isNoRecordFound: boolean;
  public showLoader: boolean;
  constructor(
    private assessmentAdapter: AssessmentAdapter,
    private openOverlayService: OpenOverlayService,
    private changeDetector: ChangeDetectorRef,
    private customLoaderService: CustomLoaderService,
    private service: MyDirectWorkLocationHistoryService,
    private loaderService: LoaderService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private presenter: MyDirectLocationPresenter,
  ) {
    this.user = this.globalResponseHandlerService.getUser();
    this.selectedName = '';
    this.getCustomLoaderStatus();
    //this.customLoaderService.setLoaderStatus(true);
  }

  ngOnInit() {
    this.getWorkLocationHistory();
  }


  public getWorkLocationHistory(): void {
    this.service.getWorkLocationHistory(this.user.empId).subscribe(
      (getResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(getResponse)) {
          this.customLoaderService.setLoaderStatus(true);
          this.todayWorkLocationHistory = this.presenter.bindTodayLocation(getResponse.data);
          this.selectedEmployeeId = this.todayWorkLocationHistory[0].empId;
          this.selectedName = this.todayWorkLocationHistory[0].name;
          //this.selectedName = this.todayWorkLocationHistory[0].firstName + ' ' + this.todayWorkLocationHistory[0].lastName;
          this.getWorkLocationPastHistoryByEmpId(this.todayWorkLocationHistory[0].empId)
        }
      }
    );
  }

  public onClickHistory(workLocation: WorkLocationHistory): void {
    this.customLoaderService.setLoaderStatus(true);
    this.selectedName = workLocation.name;
    this.selectedEmployeeId = workLocation.empId;
    this.getWorkLocationPastHistoryByEmpId(workLocation.empId);
  }

  public getWorkLocationPastHistoryByEmpId(empId: number): void {
    this.todayWorkLocationPastHistory = [];
    this.isNoRecordFound = true;
    this.service.getWorkLocationPastHistoryByEmpId(empId).subscribe(
      (getResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(getResponse)) {
          this.todayWorkLocationPastHistory = getResponse.data;
          this.isNoRecordFound = false;
        }
        this.customLoaderService.setLoaderStatus(false);
      }
    );
  }

  getCustomLoaderStatus() {
    this.showLoader = false;
    this.customLoaderService.isCustomLoaderShow.subscribe(
      (isShown) => {
        this.showLoader = isShown;
        this.changeDetector.detectChanges(); // If not added causes change in value error.
      });
  }

  openSubmittedForm(surveyId: number, surveySubmissionId: number) {
    this.service.getSubmittedSurveyForm(surveyId, surveySubmissionId).subscribe(
      (surveyFormResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(surveyFormResponse, false, false)) {
          this.loaderService.emitIsLoaderShown(true);
          this.openSurveyFromPopup(surveyFormResponse);
        }
      });
  }

  private openSurveyFromPopup(surveyFormResponse): void {
    let surveyForm = this.assessmentAdapter.toResponse(surveyFormResponse);
    let object: OverlayRefModel = this.openOverlayService.openSurveyForm(SurveyFormComponent);
    let overlayRef: OverlayRef;
    let componentOverlayRef: ComponentRef<any>;
    overlayRef = object.overLay;
    componentOverlayRef = object.component;
    componentOverlayRef.instance.surveyForm = surveyForm.data;
    componentOverlayRef.instance.cancel.subscribe(status => {
      overlayRef.dispose();
    });
  }


  public onclickremoveTile(): void {
    this.removeTile.emit(DashboardPassHeaderName.MyDirectWorkLocationHistory);
  }

}
