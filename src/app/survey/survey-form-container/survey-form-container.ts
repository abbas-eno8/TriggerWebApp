import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey-service/survey.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { Router, ActivatedRoute } from '@angular/router';
import { Route, ApiResponse } from '../../core/magic-string/common.model';
import { Survey, SurveyRequestModel, ResponseModel } from '../survey.model';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { Observable } from 'rxjs/internal/Observable';
import { LoaderService } from '../../core/loader/loader.service';

@Component({
  selector: 'trigger-survey-form-container',
  templateUrl: './survey-form-container.html'
})
export class SurveyFormContainer implements OnInit {
  /** This is a observable of calling sync API which passes the get survey-details based on survey-id to its presentation */
  public getSurveyById$: Observable<ApiResponse>;
  public surveyId: number;
  public copySurvey: any;
  public surveyMaster$: Observable<ApiResponse>;
  public getEmployeesByDimension$ : Observable<ApiResponse>;
  public isAddSurvey: boolean;
  public surveyIdAfterAddSurvey: number;
  constructor(private surveyService: SurveyService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private loaderService: LoaderService) {
    this.isAddSurvey = false;
    this.surveyIdAfterAddSurvey = 0;
    // this.loaderService.emitIsLoaderShown(true);
  }

  ngOnInit() {
    let surveyDetail = sessionStorage.getItem('CopySurvey');
    let encryptedKey = this.activatedRoute.snapshot.queryParams['id'];
    /** This is a observable of calling sync API which passes the get survey-details based on survey-id to its presentation */
    this.surveyId = encryptedKey ? parseInt(this.urlEncryptionDecryptionService.urlDecryption(encryptedKey)) : 0;
    if (!!surveyDetail) {
      if (!!JSON.parse(sessionStorage.getItem('CopySurvey'))) {
        this.copySurvey = JSON.parse(sessionStorage.getItem('CopySurvey'));
      }
    } else if (!surveyDetail && this.surveyId > 0) {
      this.loaderService.emitIsLoaderShown(true);
      this.getSurveyById$ = this.surveyService.getSurveyById(this.globalResponseHandlerService.getUser().clientId, this.surveyId);
    }
    this.getSurveyTypeMaster();
  }

  public addSurvey(surveyObject: SurveyRequestModel): void {
    this.isAddSurvey = false;
    this.surveyService.addSurvey(surveyObject, this.globalResponseHandlerService.getUser().clientId).subscribe(
      (survey) => {
        if (this.globalResponseHandlerService.getApiResponse(survey, true)) {
          if (surveyObject.surveyType === 1) {
            this.router.navigate([Route.Survey]);
          } else { 
            this.updateList(survey);
            this.surveyIdAfterAddSurvey = survey.data[0].surveyId;
            this.isAddSurvey = true;
          }
        }
      }
    );
  }

  updateList(survey){
    let data =survey.data[0];
    let allSuveyList = sessionStorage.getItem('SurveyList');
    if(!!allSuveyList){
      let surveyList = JSON.parse(sessionStorage.getItem('SurveyList'));
      const surveyObj: ResponseModel = new ResponseModel(
        data.surveyId,
        data.surveyName,
        data.fromDate,
        data.toDate,
        data.isActive,
        data.isSurveySubmitted,
        data.surveyType,
        data.isPublished,
        data.surveyTypeName
      );
      surveyList.push(surveyObj);
      sessionStorage.setItem('SurveyList', JSON.stringify(surveyList));
    } else {
      let surveyList = [];
      const surveyObj: ResponseModel = new ResponseModel(
        data.surveyId,
        data.surveyName,
        data.fromDate,
        data.toDate,
        data.isActive,
        data.isSurveySubmitted,
        data.surveyType,
        data.isPublished,
        data.surveyTypeName
      );
      surveyList.push(surveyObj);
      sessionStorage.setItem('SurveyList', JSON.stringify(surveyList));
    }
  }

  public updateSurvey(survey: SurveyRequestModel): void {
    this.surveyService.updateSurvey(survey, this.globalResponseHandlerService.getUser().clientId).subscribe(
      (survey) => {
        if (this.globalResponseHandlerService.getApiResponse(survey, true)) {
          this.router.navigate([Route.Survey]);
        }
      }
    );
  }

  public getSurveyTypeMaster(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.surveyMaster$ = this.surveyService.getSurveyTypeMaster(this.globalResponseHandlerService.getUser().clientId);
  }

  public publishNotification(publishObject): void {
    this.surveyService.publishNotification(publishObject, this.globalResponseHandlerService.getUser().clientId).subscribe(
      (publishResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(publishResponse, true)) {
          this.router.navigate([Route.Survey]);
        }
      }
    );
  }

  public getEmployeeList(dimensionObj) {
    this.getEmployeesByDimension$ = this.surveyService.getEmployees(this.globalResponseHandlerService.getUser().clientId, dimensionObj);
  }
}
