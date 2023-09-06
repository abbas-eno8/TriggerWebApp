import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/magic-string/common.model';
import { LoaderService } from '../../core/loader/loader.service';
import { SurveyService } from '../survey-service/survey.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';

@Component({
  selector: 'trigger-survey-preview-container',
  templateUrl: './survey-preview-containern.html'
})
export class SurveyPreviewContainer implements OnInit {
  /** This is a observable of calling sync API which passes the get survey-details based on survey-id to its presentation */
  public getSurveyById$: Observable<ApiResponse>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private loaderService: LoaderService,
    private surveyService: SurveyService,
    private globalResponseHandlerService: GlobalResponseHandlerService,) { }

  ngOnInit() {
    /** This is a observable of calling sync API which passes the get survey-details based on survey-id to its presentation */
    let surveyId = parseInt(this.urlEncryptionDecryptionService.urlDecryption(this.activatedRoute.snapshot.queryParams['id']));
    if (surveyId > 0) {
      this.loaderService.emitIsLoaderShown(true);
      this.getSurveyById$ = this.surveyService.getSurveyById(this.globalResponseHandlerService.getUser().clientId, surveyId);
    }
  }

}
