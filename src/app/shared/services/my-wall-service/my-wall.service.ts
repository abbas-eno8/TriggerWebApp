import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, ApiURL, Version } from '../../../core/magic-string/common.model';
import { MyWallAdapter } from '../my-wall-adapter/my-wall-adapter';
import { ReactionRequest } from '../../../my-wall/my-wall.model';
import { environment } from '../../../../environments/environment';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { Encryption } from '../../../core/magic-string/common-validation-model';

@Injectable({
  providedIn: 'root'
})
export class MyWallService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private adapter: MyWallAdapter,
    private globalResponseHandlerService: GlobalResponseHandlerService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  public getUserSparks(pageNumber: number, pageSize: number): Observable<ApiResponse> {
    this.globalResponseHandlerService.encriptData(Version.Version2, Encryption.Version, Encryption.VersionKey);
    const url: string = this.baseUrl + ApiURL.MyWall + pageNumber + '/' + pageSize;
    return this.httpClient.get<ApiResponse>(url).pipe(map((data: any) => {
      return this.adapter.getSparks(data);
    }));
  }

  public getUserSubSparks(groupSparkRandomNumber: number, pageNumber: number, pageSize: number): Observable<ApiResponse> {
    const url: string = this.baseUrl + ApiURL.MyWall + pageNumber + '/' + pageSize + '/' + groupSparkRandomNumber;
    return this.httpClient.get<ApiResponse>(url).pipe(map((data: any) => {
      return this.adapter.getSubSparks(data, groupSparkRandomNumber);
    }));
  }

  public getReactions(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.MyWall + ApiURL.ReactType);
  }

  public getSparkReactionsById(sparkId: number, commentId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.MyWall + '/' + ApiURL.React + sparkId + '/' + commentId).pipe(map((data: any) => {
      return this.adapter.getSparkReactions(data);
    }));
  }

  public getSparkComments(sparkId: number, pageNumber: number, pageSize: number): any {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.MyWall + ApiURL.Comment + sparkId + '/' + pageNumber + '/' + pageSize).pipe(map((data: any) => {
      return this.adapter.getSparkComments(data);
    }));
  }
  
  public addReaction(object: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.baseUrl + ApiURL.MyWall + ApiURL.React, object);
  }

  public deleteReaction(object: ReactionRequest): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(this.baseUrl + ApiURL.MyWall + ApiURL.React + object.sparkId + '/' + object.commentId + '/' + object.empId);
  }

  public addComment(object: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.baseUrl + ApiURL.MyWall + ApiURL.Comment, object);
  }
}

