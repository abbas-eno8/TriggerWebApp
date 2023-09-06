
/**
@author : Anjali Tandel
@class : TeamsService
@description : TeamsService service created for team-view/add/edit/inactive & get team employees & managers.
**/
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiURL, ApiResponse, ResponseById } from '../../core/magic-string/common.model';
import { TeamsListAdapter, TeamsFormAdapter } from '../teams-adapter/teams-adapter';
import { TeamsRequestModel } from '../teams-model';

@Injectable()
export class TeamsService {
  
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private listadapter: TeamsListAdapter,
    private formAdapter: TeamsFormAdapter
    ) { 
      this.baseUrl = environment.baseUrl;
    }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Descriotion : Http server call get list of teams.
   */
  public getTeams(clientId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.TeamConfiguration + clientId).pipe(map((data: any) => {
      return this.listadapter.toResponse(data)
    }));
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Descriotion : Http server call for get team by team-id.
   */
  public getTeamById(clientId: number, teamId: number): Observable<ResponseById> {
    return this.httpClient.get<ResponseById>(this.baseUrl + ApiURL.TeamConfiguration + clientId + '/' + teamId).pipe(map((data: any) => {
      return this.formAdapter.toResponse(data)
    }));
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Descriotion : Http server call for get list of team-managers.
   */
  public getManagers(clientId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.ActiveManagers + clientId).pipe(map((data: any) => {
      return this.formAdapter.getManagers(data)
    }));;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Descriotion : Http server call for get list of team-non-managers.
   */
  public getNonManagers(clientId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.NonManager + clientId).pipe(map((data: any) => {
      return this.formAdapter.getMembers(data)
    }));;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Descriotion : Http server call for add-new-team.
   */
  public addTeam(object: TeamsRequestModel, clientId: number): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.baseUrl + ApiURL.TeamConfiguration + clientId, object)
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Descriotion : Http server call for update-exsting-team.
   */
  public updateTeam(object: TeamsRequestModel, clientId: number): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(this.baseUrl + ApiURL.TeamConfiguration + clientId, object)
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Descriotion : Http server call for inactive-exsting-team.
   */
  public inactiveTeam(clientId: number, teamId: number, userId: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(this.baseUrl + ApiURL.TeamConfigurationSetInactive + clientId + '/' + teamId + '/' + userId);
  }
}
