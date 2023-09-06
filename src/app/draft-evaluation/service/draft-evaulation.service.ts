/**
 * @author Shahbaz Shaikh
 * @description Draft Evaluation API service file
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// -------------------------------------- //
import { environment } from '../../../environments/environment';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { ApiResponse, ApiURL, Version2 } from '../../core/magic-string/common.model';
import { Encryption } from '../../core/magic-string/common-validation-model';
import { EditEvaluationAdapter, EvaluationDraftListAdapter, PublishEvaluationAdapter } from '../adapter/draft-evaluation.adapter';

@Injectable()
export class DraftEvaulationService {

  /** Store the API baseUrl */
  private baseURL: string;

  constructor(
    private http: HttpClient,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private evaulationDraftListAdapter: EvaluationDraftListAdapter,
    private editEvaluationAdapter: EditEvaluationAdapter,
    private publishEvaluationAdapter: PublishEvaluationAdapter
  ) {
    this.baseURL = environment.baseUrl;
  }

  /**
   * Get the draft evaulation list
   * @param userId Get the user id
   * @returns return the draft evaulation API response
   */
  public getDraftEvaulationList(userId: number): Observable<ApiResponse> {
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey);
    const url = this.baseURL + `EvaluationDraftMode/${userId}`;
    return this.http.get<ApiResponse>(url).pipe(map((data: any) => {
      const response: ApiResponse = this.evaulationDraftListAdapter.toResponse(data);
      return response;
    }));
  }

  /**
  * Author : Shahbaz Shaikh
  * Descriotion : Update assessment-comment.
  * @param remark Get the request body for update comment 
  */
  public updateComment(remark: any): Observable<ApiResponse> {
    const body = this.editEvaluationAdapter.toRequest(remark);
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey)
    return this.http.put<ApiResponse>(this.baseURL + ApiURL.AssessmentComment, body);
  }

  /**
   * Author : Shahbaz Shaikh
   * Descriotion : Delete assessment-comment.
   * @param deleteComment get the request body for delete comment
   */
  public deleteComment(deleteComment): Observable<ApiResponse> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
      body: deleteComment,
    };
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey)
    return this.http.delete<ApiResponse>(this.baseURL + ApiURL.AssessmentComment, httpOptions);
  }

  /**
   * Author : Shahbaz Shaikh
   * @param assessmentId Get Assessment id
   * @param empId Get the employee id
   */
  public getEmailPreview(assessmentId: number, empId: number): Observable<ApiResponse> {
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey);
    const url = this.baseURL + ApiURL.assessmentPublishEmailPreview + assessmentId + '/' + empId;
    return this.http.get<ApiResponse>(url).pipe(map((result: any) => {
      return result;
    }));
  }

  /**
   * Author : Shahbaz Shaikh
   * Descriotion : Delete assessment-comment.
   * @param deleteAttachment get body for delete attachment
   */
  public deleteAttachment(deleteAttachment: any): Observable<ApiResponse> {
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey)
    return this.http.put<ApiResponse>(this.baseURL + ApiURL.Attachment, deleteAttachment);
  }

  /**
   * Author : Shahbaz Shaikh
   * Created Date: 11-03-2022
   * Descriotion : Publish the assesment and add
   * @param evaluation Get the evaualtion body object 
   */
  public publishAssessment(evaluation): Observable<ApiResponse> {
    const body = this.publishEvaluationAdapter.toRequest(evaluation);
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey);
    return this.http.put<ApiResponse>(this.baseURL + ApiURL.publishAssessment, body);
  }
}
