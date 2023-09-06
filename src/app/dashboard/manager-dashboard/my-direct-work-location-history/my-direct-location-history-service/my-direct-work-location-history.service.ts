import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiResponse, ApiURL, DateFormat } from '../../../../core/magic-string/common.model';

@Injectable({
  providedIn: 'root'
})
export class MyDirectWorkLocationHistoryService {
  private baseUrl: string;

  constructor(
    private datePipe: DatePipe,
    private httpClient: HttpClient,
  ) {
    this.baseUrl =  environment.baseUrl
   }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-04-2020
   * Descriotion : Http server call for get my-direct-reportee's work-location hitory. 
   */
  public getWorkLocationHistory(managerId: number): Observable<ApiResponse> {
    let date = this.datePipe.transform(new Date(), DateFormat);
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.WorkLocation + ApiURL.TeamMemberWorkLocation  + ApiURL.Today + managerId + '/' + date);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-04-2020
   * Descriotion : Http server call for get single my-direct-reportee's work-location past hitory. 
   */
  public getWorkLocationPastHistoryByEmpId(empId: number): Observable<ApiResponse> {
    let date = this.datePipe.transform(new Date(), DateFormat);
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.WorkLocation + ApiURL.TeamMemberWorkLocation  + ApiURL.History + empId + '/' + date);
  }

  public getSubmittedSurveyForm(surveyId: number, surveySubmissionId: number): Observable<Response> {
    let date = this.datePipe.transform(new Date(), DateFormat);
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.Survey + ApiURL.SubmittedSurveyAnswerDetails  + surveyId + '/' + surveySubmissionId);
  }
}
