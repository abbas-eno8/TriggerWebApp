import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from '../../core/magic-string/common.model';
import { LoaderService } from '../../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { SurveyService } from '../survey-service/survey.service';
import { ActivatedRoute } from '@angular/router';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';

@Component({
  selector: 'trigger-survey-details-container',
  templateUrl: './survey-details.container.html'
})
export class SurveyDetailsContainer implements OnInit {
  /** This is a observable of calling sync API which passes the list of submitted survey details to its presentation */
  public surveyDetails$: Observable<ApiResponse>;
  /** This is a observable of calling sync API which passes the list of submitted survey list to its presentation */
  public survey$: Observable<ApiResponse> = this.surveyService.getSubmittedSurvey(this.globalResponseHandlerService.getUser().clientId);
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private surveyService: SurveyService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService
  ) {
  }

  ngOnInit() {
    let selectedSurvey = this.activatedRoute.snapshot.queryParams['id'];
    selectedSurvey = parseInt(this.urlEncryptionDecryptionService.urlDecryption(selectedSurvey));
    this.getSurveyDetails(selectedSurvey);
    this.loaderService.emitIsLoaderShown(true);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 09-04-2020
   * Description : Create event-method for invoke server call for get survey details by surveyId.
   */
  public getSurveyDetails(surveyId: number): void {
    this.surveyDetails$ = this.surveyService.getSubmittedAnswerBySurveyId(this.globalResponseHandlerService.getUser().clientId, surveyId);
  }

}
