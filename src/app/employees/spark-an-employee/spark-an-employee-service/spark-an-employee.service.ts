/**
 @author : Anjali Tandel
 @class : SparkAnEmployeeService
 @description : SparkAnEmployeeService service created for spark-view/add/edit/delete.
 **/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiURL, Version2 } from '../../../core/magic-string/common.model';
import { SparkAnEmployeeAdapter } from '../spark-an-employee-adapter/spark-an-employee-adapter';
import { Encryption } from '../../../core/magic-string/common-validation-model';
import { ApiResponse, RequestModel, SparkReplyObject } from '../spark-an-employee-model';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { environment } from '../../../../environments/environment';
@Injectable()
export class SparkAnEmployeeService {

  private baseUrl: string;

  constructor(
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private httpClient: HttpClient,
    private adapter: SparkAnEmployeeAdapter) {
      this.baseUrl = environment.baseUrl;
     }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 05-09-2019
   * Descriotion : Create method for get all category.
   */
  public getCategory(clientId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.Category + clientId).pipe(map((data: any) => {
      return this.adapter.toResponseCategory(data)
    }));
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 09-08-2019
   * Descriotion : Create method for get all spark-classifications.
   */
  public getSparkClassification(clientId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.Classification + clientId).pipe(map((data: any) => {
      return this.adapter.toResponseClassification(data)
    }));
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 09-08-2019
   * Descriotion : Create method for get all sparks.
   */
  public getSparks(empId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.SparkAnEmployee + empId).pipe(map((data: any) => {
      return this.adapter.toResponse(data);
    }));
  }

  public getSparksBySelectedTab(queryString: string): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.EmployeeSparkReply + queryString).pipe(map((data: any) => {
      return this.adapter.toWidgetResponse(data)
    }));
  }

  public addReply(object: SparkReplyObject): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.baseUrl + ApiURL.EmployeeSparkReply, object);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 09-08-2019
   * Descriotion : Create method for add-spark.
   */
  public addSpark(object: RequestModel): Observable<ApiResponse> {
    this.globalResponseHandlerService.encriptData(Version2.Version3, Encryption.Version, Encryption.VersionKey);
    return this.httpClient.post<ApiResponse>(this.baseUrl + ApiURL.SparkAnEmployee, object).pipe(map((data: any) => {
      return this.adapter.getSparkResponse(data)
    }));
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 09-08-2019
   * Descriotion : Create method for update-spark.
   */
  public updateSpark(object: RequestModel): Observable<ApiResponse> {
    this.globalResponseHandlerService.encriptData(Version2.Version3, Encryption.Version, Encryption.VersionKey)
    return this.httpClient.put<ApiResponse>(this.baseUrl + ApiURL.SparkAnEmployee, object).pipe(map((data: any) => {
      return this.adapter.toResponse(data)
    }));
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 09-08-2019
   * Descriotion : Create method for delete-spark.
   */
  public deleteSpark(empId: number, sparkId: number, userId: number): Observable<ApiResponse> {
    this.globalResponseHandlerService.encriptData(Version2.Version3, Encryption.Version, Encryption.VersionKey)
    return this.httpClient.delete<ApiResponse>(this.baseUrl + ApiURL.SparkAnEmployee + empId + '/' + sparkId + '/' + userId);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 09-08-2019
   * Descriotion : Create method for delete-attachment-spark.
   */
  public deleteSparkAttachment(object: RequestModel): Observable<ApiResponse> {
    this.globalResponseHandlerService.encriptData(Version2.Version3, Encryption.Version, Encryption.VersionKey)
    return this.httpClient.put<ApiResponse>(this.baseUrl + ApiURL.SparkAnEmployeeAttachment, object).pipe(map((data: any) => {
      return this.adapter.toResponse(data)
    }));
  }
}
