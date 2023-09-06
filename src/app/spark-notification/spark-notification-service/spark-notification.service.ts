
import {map} from 'rxjs/operators';
/**
@author : Mihir Patel
@class : SparkNotificationService
@description : SparkNotificationService service created for get un-approved spark list and update status of un-approved spark(approved/reject).
**/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SparkNotificationAdapter } from '../spark-notification-adapter/spark-notification.adapter';
import { ApiURL } from '../../core/magic-string/common.model';
import { ApiResponse, RequestModel } from '../spark-notification-model';

@Injectable()
export class SparkNotificationService {
  
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private adapter: SparkNotificationAdapter
    ) {
      this.baseUrl = environment.baseUrl;
    }

  /**
   * Author : Mihir Patel
   * Created-Date : 10-09-2019
   * Descriotion : Create method for get all sparks.
   */
  public getSparks(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.UnApprovedSpark).pipe(map((data: any) => {
      return this.adapter.toResponseSparkNotificationList(data)
    }));
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 10-09-2019
   * Descriotion : Create method for update spark with status approved or reject.
   */
  public submitSpark(object: RequestModel): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(this.baseUrl + ApiURL.SmsSparkApproval, object).pipe(map((data: any) => {
      return this.adapter.toResponseSparkNotificationList(data)
    }));
  }
}
