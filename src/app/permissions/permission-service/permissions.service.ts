import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// -------------------------------------------------- //
import { ApiURL } from '../../core/magic-string/common.model';
import { ActionWisePermissionModel } from '../permissions-model';
import { environment } from '../../../environments/environment';

@Injectable()
export class PermissionsService {

  private baseUrl: string;
  
  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 19-06-2019
   * Descriotion : get all dimensions.
   */
  public getDimensions(): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.Dimension);
  }

  /**
  * Author : Mihir Patel
  * Modified-Date : 19-06-2019
  * Descriotion : get all system configuration data.
  */
  public getSystemConguration(clientId: number): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.ActionPermission + clientId);
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 21-06-2019
   * Descriotion : get all Actions from master.
   */
  public getAllActions(): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.ActionPermission);
  }
  
  /**
   * Author : Mihir Patel
   * Modified-Date : 21-06-2019
   * Descriotion : get all dimension Elements.
   */
  public getDimensionsElement(clientId: number): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.DimensionElements + clientId);
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 26-06-2019
   * Descriotion : For submit system-configuration.
   */
  public updateSysyemConfiguration(configurationArray: ActionWisePermissionModel[], clientId: number): Observable<Response> {
    return this.httpClient.post<Response>(this.baseUrl + ApiURL.ActionPermission + clientId, configurationArray);
  }

}
