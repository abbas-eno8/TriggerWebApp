/**
@author : Anjali Tandel
@class : ClinetService
@description :ClinetService is created for client functionality.
**/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//  ................................................ //
import { ApiURL } from '../../core/magic-string/common.model';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { Response } from '../../../app/core/common.response';
import { environment } from '../../../environments/environment';

@Injectable()
export class ClientService {
  public user: any;
  public userId: any;
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private globalResponseHandlerService: GlobalResponseHandlerService
  ) {
    this.baseUrl = environment.baseUrl
    this.getUserData();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  02-01-2018
   * Description : Create method for get user data.
   */
  private getUserData() {
    this.user = this.globalResponseHandlerService.getUserData();
    this.userId = this.user.userId;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : get all client API.
   */
  public getAllClient(): Observable<Response> {
    const getClientUrl = this.baseUrl + ApiURL.Client;
    return this.httpClient.get<Response>(getClientUrl);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : get client by client Id API.
   */
  public getClientById(clientId): Observable<Response> {
    const getClientUrl = this.baseUrl + ApiURL.Client + clientId;
    return this.httpClient.get<Response>(getClientUrl);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : get list of industry type API. 
   */
  public getIndustryType(): Observable<Response> {
    const getIndustryTypeUrl = this.baseUrl + ApiURL.IndustyType;
    return this.httpClient.get<Response>(getIndustryTypeUrl);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : delete client by client id API.
   */
  public deleteClientById(clientId): Observable<Response> {
    const getDeleteUrl = this.baseUrl + ApiURL.Client + clientId + '/' + this.userId;
    return this.httpClient.delete<Response>(getDeleteUrl);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : API for add client.
   */
  public addClient(object): Observable<Response> {
    const addClientUrl = this.baseUrl + ApiURL.Client + this.userId;
    this.convertTointeger(object)
    return this.httpClient.post<Response>(addClientUrl, object);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : API for update client by client id.
   */
  public updateClient(object): Observable<Response> {
    const updateClientUrl = this.baseUrl + ApiURL.Client + this.userId;
    this.convertTointeger(object)
    return this.httpClient.put<Response>(updateClientUrl, object);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : This method created for format costPerEmp & fixedAmtPerMon to integer number.
   */
  private convertTointeger(object): void {
    if (object.costPerEmp) {
      let costPerEmp = object.costPerEmp + '';
      object.costPerEmp = costPerEmp.replace(/[^0-9]/g, '');
    }
    if (object.fixedAmtPerMon) {
      let fixedAmtPerMon = object.fixedAmtPerMon + '';
      object.fixedAmtPerMon = fixedAmtPerMon.replace(/[^0-9]/g, '');
    }
  }

  /**
   * Author : Mihir Patel
   * Created-Date :  19-09-2019
   * Descriotion : get all organization type.
   */
  public getOrgType(): Observable<Response> {
    const getOrgTypeUrl = this.baseUrl + ApiURL.OrganizationType;
    return this.httpClient.get<Response>(getOrgTypeUrl);
  }

}