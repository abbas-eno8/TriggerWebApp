import { Component, OnInit, Input } from '@angular/core';
import { SurveyPreviewPresenter } from './survey-preview-presenter/survey-preview-presenter';
import { LoaderService } from '../../../core/loader/loader.service';
import { Route } from '../../../core/magic-string/common.model';
import { UrlEncryptionDecryptionService } from '../../../core/url-encryption-decryption/url-encryption-decryption.service';

@Component({
  selector: 'trigger-survey-preview-presentation',
  templateUrl: './survey-preview-presentation.html',
  styleUrls: ['./survey-preview-presentation.scss']
})
export class SurveyPreviewPresentation implements OnInit {
  /** This property is used for store survey-details by survey id */
  public surveyDetail: any;
  /** This property is used for get survey-datails based on survey id response from container component */
  @Input() public set getSurveyById(getSurveyById: any[]) {
    if (getSurveyById) {
      this.surveyDetail = this.surveyPreviewPresenter.checkResponse(getSurveyById);
    }
  }

  public get getSurveyById(): any[] {
    return this.surveyDetail;
  }
  public islastredirectFromEditPage: boolean = false;
  public surveyId: number;
  
  constructor(
    private surveyPreviewPresenter: SurveyPreviewPresenter,
    private loaderService: LoaderService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService) { }

  ngOnInit() {
    if (!!sessionStorage.getItem('SurveyDetail')) {
      this.islastredirectFromEditPage = true;
      let sessionData = JSON.parse(sessionStorage.getItem('SurveyDetail'));
      this.surveyDetail = this.surveyPreviewPresenter.getDataInFormat(sessionData);         
      this.loaderService.emitIsLoaderShown(false);
    }
  }

  ngOnChanges() {
    if (this.getSurveyById) {
      this.loaderService.emitIsLoaderShown(false);
    }
  }
  ngOnDestroy(): void {
    sessionStorage.setItem('SurveyDetail', '');
  }

  redirectToAddSurve() {
    let copObject = this.surveyPreviewPresenter.getCopyObject(this.surveyDetail)
    sessionStorage.setItem('CopySurvey', JSON.stringify(copObject));
    this.urlEncryptionDecryptionService.urlEncryption('0', Route.AddSurvey);
  }

  redirectedToLastRoute() {
    if (this.islastredirectFromEditPage) {
      this.surveyId = this.surveyDetail.surveyId;
    } else {
      this.surveyId = 0;
    }
    sessionStorage.setItem('CopySurvey', JSON.stringify(this.surveyDetail));
    this.surveyPreviewPresenter.redirectedToRespectedRoute(this.islastredirectFromEditPage,this.surveyId)
  }
}
