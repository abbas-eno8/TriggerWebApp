import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse, ApiURL, ResponseById } from '../../core/magic-string/common.model';
import { SurveyListAdapter, SurveyFormAdapter, SurveyActiveListAdapter } from '../survey-adapter/survey-adapter';
import { SurveyRequestModel, DimensionElemet } from '../survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private baseUrl: string

  constructor(private httpClient: HttpClient,
    private surveyListAdapter: SurveyListAdapter,
    private surveyActiveListAdapter: SurveyActiveListAdapter,
    private formAdapter: SurveyFormAdapter
  ) {
    this.baseUrl = environment.baseUrl;
  }

  public getSurvey(clientId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.Survey + clientId).pipe(map((data: any) => {
      return this.surveyListAdapter.toResponse(data);
    }));
  }

  public getActiveSurvey(empId: number): Observable<ApiResponse> {
    const url: string = this.baseUrl + ApiURL.Survey + ApiURL.ActiveSurvey + empId;
    return this.httpClient.get<ApiResponse>(url).pipe(map((data: any) => {
      return this.surveyActiveListAdapter.toResponse(data);
    }));
  }

  public addSurvey(object: SurveyRequestModel, clientId: number): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.baseUrl + ApiURL.Survey + clientId, object)
  }

  public updateSurvey(object: SurveyRequestModel, clientId: number): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(this.baseUrl + ApiURL.Survey + clientId, object)
  }

  public getSurveyById(clientId: number, surveyId: number): Observable<ResponseById> {
    return this.httpClient.get<ResponseById>(this.baseUrl + ApiURL.Survey + clientId + '/' + surveyId).pipe(map((data: any) => {
      return this.formAdapter.toResponse(data);
    }));
  }

  public deleteSurvey(clientId: number, surveyId: number, userId: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(this.baseUrl + ApiURL.Survey + clientId + '/' + surveyId + '/' + userId);
  }

  public updatestatus(object: any, clientId: number): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(this.baseUrl + ApiURL.Survey + '/' + ApiURL.UpdateStatus + clientId, object)
  }

  public getSubmittedSurvey(clientId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.SubmittedSurvey + clientId).pipe(map((data: any) => {
      return this.surveyListAdapter.toResponse(data);
    }));
  }

  public getSubmittedAnswerBySurveyId(clientId: number, surveyId: number): Observable<ApiResponse> {
    return this.httpClient.get<ResponseById>(this.baseUrl + ApiURL.SubmittedSurvey + clientId + '/' + surveyId);
  }

  public getSurveyTypeMaster(companyId: number): Observable<ResponseById> {
    return this.httpClient.get<ResponseById>(this.baseUrl + ApiURL.Survey + ApiURL.SurveyTypeConfiguration + companyId).pipe(map((data: any) => {
      return this.formAdapter.toMasterSurveyTypeResponse(data);
    }));
  }

  public publishNotification(object, clientId: number): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.baseUrl + ApiURL.Survey + ApiURL.SendAssessmentNotification + clientId, object)
  }

  // public getEmployees(clientId: number, dimensionObj: DimensionElemet): Observable<ApiResponse> {
  //   return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.TeamMemberByDimension + clientId + '/' + dimensionObj.dimensionId + '/' + dimensionObj.dimensionElementString).pipe(map((data: any) => {
  //     return this.formAdapter.toTeamMemberResponse(data);
  //   }));
  // }

  public getEmployees(clientId: number, dimensionObj: DimensionElemet): Observable<ApiResponse> {
    const dimensionObjNew =
    {
      DimensionId: dimensionObj.dimensionId,
      DimensionElementId: dimensionObj.dimensionElementString,
      CompanyId: clientId,
    }
    return this.httpClient.post<ApiResponse>(this.baseUrl + ApiURL.TeamMemberByDimension, dimensionObjNew).pipe(map((data: any) => {
      return this.formAdapter.toTeamMemberResponse(data);
    }));
  }
  
}
