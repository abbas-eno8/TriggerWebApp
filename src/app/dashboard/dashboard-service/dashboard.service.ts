
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, ApiURL, ResponseById, Version, Version2 } from '../../core/magic-string/common.model';
import { TeamDashboardAdapter } from '../dashboard-adapter/dashboard-adapter';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { Encryption } from '../../core/magic-string/common-validation-model';

@Injectable()
export class DashboardService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private adapter: TeamDashboardAdapter,
    private globalResponseHandlerService: GlobalResponseHandlerService,) {
    this.baseUrl = environment.baseUrl;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 03-10-2019
   * Descriotion : Http server call for bind dropdown list of team-dashboard. 
   */
  public getTeams(clientId: number, yearId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.TeamDashboard + clientId + '/' + yearId)
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 18-10-2019
   * Descriotion : Http server call for bind dropdown list of team-years. 
   */
  public getYear(companyId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.TeamAssessmentYear + companyId);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 03-10-2019
   * Descriotion : Http server call for bind dropdown list of team-dashboard. 
   */
  public getTeamDashboard(clientId: number, yearId: number, teamId: number): Observable<ResponseById> {
    return this.httpClient.get<ResponseById>(this.baseUrl + ApiURL.TeamDashboard + clientId + '/' + yearId + '/' + teamId).pipe(map((data: any) => {
      return this.adapter.toResponse(data)
    }));
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 25-11-2019
   * Descriotion : Http server call for reporting manager list
   */
  public getManagerList(employeeId: number, actionId: number): Observable<ApiResponse> {
    this.globalResponseHandlerService.encriptData(Version2.Version3, Encryption.Version, Encryption.VersionKey);
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.NonmanagerDashboardManagerList + employeeId + '/' + actionId);
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 28-11-2019
   * Descriotion : Http server call for send request for spark or trigger
   */
  public sendRequestToManager(requestObject): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.baseUrl + ApiURL.myDashboarSendActionRequest, requestObject);
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 17-12-2019
   * Descriotion : Get create request list
   */
  public getCreateRequestList(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.CreatedRequestList);
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 17-12-2019
   * Descriotion : Get create request list
   */
  public getMyRequestList(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.MyRequestList);
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 19-12-2019
   * Descriotion : get Action Request Detail by request type
   */
  public getActionRequestDetail(requestId: number, empId: number, actionId: number, loggedinEmpId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.ActionRequestDetail + requestId + '/' + loggedinEmpId + '/' + empId + '/' + actionId);
  }

  public getMyDashboard(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + ApiURL.Mydashboard);
  }

  public getEmployeeDatewiseEvaluation(empId, evaluationDate, dashboardTypeId): Observable<any> {
    this.globalResponseHandlerService.encriptData(Version.Version2, Encryption.Version, Encryption.VersionKey);
    const url = `EmployeeDatewiseEvaluation/${empId}/?fromDate=${evaluationDate.fromDate}&toDate=${evaluationDate.toDate}&dashboardId=${dashboardTypeId}`;
    return this.httpClient.get<any>(this.baseUrl + url);
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  19-12-2018
   * Description : Store static widget position into array for get default value, which is used to pass widget api when all widget unchecked from right bar.
   */
  public getDefaultWidgetPosition(userId: number) {
    const teamWidgetArray = [
      {
        "userId": userId,
        "widgetId": "21",
        "widgetName": "team-average-score",
        "widgetActualName": "Team Average Score",
        "sequenceNumber": 1,
        "tileSequence": 1,
        "position": 0.0,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
      {
        "userId": userId,
        "widgetId": "22",
        "widgetName": "team-average-score-by-day",
        "widgetActualName": "Team Average Score by Day",
        "sequenceNumber": 2,
        "tileSequence": 2,
        "position": 0.25,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
    ]
    return teamWidgetArray;
  }
}

