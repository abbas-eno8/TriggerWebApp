import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
// -------------------------------------------------- //
import { environment } from '../../../../environments/environment';
import { ApiResponse, ApiURL, Version } from '../../../core/magic-string/common.model';
import { TeamMembersAdapter } from '../team-member-adapter/team-member-adapter';
import { ColumnConfiguration, SendMail } from '../team-member-model';
import { Encryption } from '../../../core/magic-string/common-validation-model';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';

@Injectable()
export class TeamMemberService {
  
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private teamMembersAdapter: TeamMembersAdapter
    ) { 
     this.baseUrl = environment.baseUrl;
    }

  /**
   * Author : Anjali Tandel
   * Created-Date : 02-03-2020
   * Descriotion : Http server call for getting team-member custom columns.
   */
  public getCustomColumn(clientId: number, empId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.CustomColumnConfig + clientId + '/' + empId).pipe(map((data: any) => {
      return this.teamMembersAdapter.customColumnResponse(data);
    }));
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 02-03-2020
   * Descriotion : Http post server call for save configured team-member custom columns.
   */
  public customColumnConfiguration(ColumnConfiguration: ColumnConfiguration[]): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.baseUrl + ApiURL.CustomColumnConfig, ColumnConfiguration);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 02-03-2020
   * Descriotion : Http server call for get departments by client-id.
   */
  public getDepartmentByClientId(clientId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.Department + clientId).pipe(map((data: any) => {
      return this.teamMembersAdapter.departmentResponse(data);
    }));
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 02-03-2020
   * Descriotion : Http server call for getting team-members by selected departments.
   */
  public getTeamMembers(queryString: string): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.Employees + queryString).pipe(map((data: any) => {
      return this.teamMembersAdapter.toResponse(data);
    }));
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 02-03-2020
   * Descriotion : Http server call for getting dashboard-team-members by selected departments.
   */
  public getDashboardTeamMembers(queryString: string): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.DashboardTeamMember + queryString).pipe(map((data: any) => {
      return this.teamMembersAdapter.toResponse(data);
    }));
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 02-03-2020
   * Descriotion : Http server call for send-mail to selected team-member.
   */
  public sendEmail(userId: number, sendMail: SendMail): Observable<Response> {
    return this.httpClient.put<Response>(this.baseUrl + ApiURL.SendMail + userId, sendMail);
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 02-03-2020
   * Descriotion : Http server call for getting dimenstion-elemenets based on configured permission.
   */
  public getFilterElement(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.PermissionwiseDimensionElements).pipe(map((data: any) => {
      return this.teamMembersAdapter.toElementResponse(data);
    }));
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 02-03-2020
   * Descriotion : Http server call for getting dimenstion-elemenets based on configured permission.
   */
  public getFilterElementData(): Observable<ApiResponse> {
    this.globalResponseHandlerService.encriptData(Version.Version1, Encryption.Version, Encryption.VersionKey);
    return this.httpClient.get<ApiResponse>(this.baseUrl + 'TeamMemberFilter').pipe(map((data: any) => {
      return data;
    }));
  }
}
