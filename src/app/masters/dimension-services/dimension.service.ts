/**
@author : Anjali Tandel
@class : DimensionService
@description :DimensionService is created for dimension crud operation functionality.
**/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiURL } from '../../core/magic-string/common.model';
import { Response } from '../../../app/core/common.response';
import { AttributeModel } from '../masters.model';

@Injectable()
export class DimensionService {
  
  private baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    ) {
      this.baseUrl = environment.baseUrl;
     }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 14-06-2019
   * Descriotion : get all master-dimension.
   */
  public getDimension(): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.Dimension);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 14-06-2019
   * Descriotion : get all master-dimension Elements.
   */
  public getDimensionElements(clientId: number): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.DimensionElements + clientId);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  10-06-2019
   * Description : API for add new dimension-attribute.
   */
  public addAttribute(object: AttributeModel, clientId: number): Observable<Response> {
    return this.httpClient.post<Response>(this.baseUrl + ApiURL.DimensionElements + clientId, object);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  10-06-2019
   * Description : API for update existing dimension-attribute.
   */
  public updateAttribute(object: AttributeModel, clientId: number): Observable<Response> {
    return this.httpClient.put<Response>(this.baseUrl + ApiURL.DimensionElements + clientId, object);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 20-06-2019
   * Description : API for delete existing dimension-attribute.
   */
  public deleteAttribute(object: AttributeModel, clientId: number): Observable<Response> {
    return this.httpClient.delete<Response>(this.baseUrl + ApiURL.DimensionElements + clientId + '/' + object.dimensionId + '/' + object.dimensionValueid + '/' + object.updatedBy);
  }
}
