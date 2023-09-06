/**
@author : Mihir Patel
@class : AssessmentService
@description :AssessmentService is created for Assessment operations.
**/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// ------------------------------------- //
import { Observable } from 'rxjs';
import { Response } from '../core/common.response';
import { ApiURL, Version2, ApiResponse } from '../core/magic-string/common.model';
import { Encryption } from '../core/magic-string/common-validation-model';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { environment } from '../../environments/environment';

@Injectable()
export class AssessmentService {
  public baseUrl: string;

  constructor(
    private http: HttpClient,
    private globalResponseHandlerService: GlobalResponseHandlerService
  ) {
    this.baseUrl = environment.baseUrl;
  }
  //  Return all question list :
  getAllQuestions(): Observable<Response> {
    const questionListUrl = this.baseUrl + ApiURL.QuestionList;
    return this.http.get<Response>(questionListUrl);
  }

  //  For Employee assessment
  employeeAssessment(assessmentObj): Observable<Response> {
    const body = assessmentObj;
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey)
    const assessmentUrl = this.baseUrl + ApiURL.Assesment;
    return this.http.post<any>(assessmentUrl, body);
  }

  /**
  * Author : Mihir Patel
  * Modified-Date :  14-10-2019
  * Descriotion :  For get trigger score list : 
  */
  getTriggerScore(): Observable<Response> {
    const triggerScoreUrl = this.baseUrl + ApiURL.TriggerScore;
    return this.http.get<Response>(triggerScoreUrl);
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  14-10-2019
   * Descriotion : API for update Trigger score
   */
  public submitFeedback(feedbackObj): Observable<Response> {
    const updateScoreUrl = this.baseUrl + ApiURL.ScoreFeedback;
    return this.http.put<Response>(updateScoreUrl, feedbackObj);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 27-01-2020
  * Description : API for send email for spark/evalution
  */
  public getAcivatedSurvey(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + ApiURL.Survey);
  }

  /**
  * Author : Shahbaz Shaikh
  * Modified-Date : 14-04-2022
  * Description : API for save as draft evalution
  */
  public saveAsDraftEvaluation(assessmentId: number, evalution: any): Observable<Response> {
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey)
    const url = this.baseUrl + ApiURL.Assesment + assessmentId;
    const body = evalution;
    return this.http.post<Response>(url, body);
  }
}
