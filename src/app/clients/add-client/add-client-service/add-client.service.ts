import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, ApiURL, ResponseById } from '../../../core/magic-string/common.model';
import { WorkLocation } from '../../client-model';
@Injectable({
  providedIn: 'root'
})
export class AddClientService {

  private baseUrl: string;
  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = environment.baseUrl;
  }

  // public getWorkLocations(clientId: number): Observable<ApiResponse> {
  //   return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.WorkLocation + clientId);
  // }

  public addWorkLocation(clientId: number, object: WorkLocation): Observable<ResponseById> {
    return this.httpClient.post<ResponseById>(this.baseUrl + ApiURL.WorkLocation + clientId, object);
  }

  public updateWorkLocation(clientId: number, object: WorkLocation): Observable<ResponseById> {
    return this.httpClient.put<ResponseById>(this.baseUrl + ApiURL.WorkLocation + clientId, object);
  }

  public deleteWorkLocation(clientId: number, workLocationId: number, updatedBy: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(this.baseUrl + ApiURL.WorkLocation + clientId + '/' + workLocationId + '/' + updatedBy);
  }

}
