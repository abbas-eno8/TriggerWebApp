/**
@author : Shahbaz Shaikh
@class : CommentService
@description : CommentService is created for update/delete comment & attachment.
**/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// ------------------------------------------------ //
import { environment } from '../../../../../../environments/environment';
import { GlobalResponseHandlerService } from '../../../../../core/global-response-handler/global-response-handler';
import { ApiResponse, ApiURL, Version, Version2 } from '../../../../../core/magic-string/common.model';
import { Encryption } from '../../../../../core/magic-string/common-validation-model';
import { EditCommentAdapter, PublishAssessmentAdapter, ShareCommentAdapter } from '../../../adapter/individual-employee.adpater';
@Injectable()
export class CommentService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private editCommentAdapter: EditCommentAdapter,
    private publishAssessmentAdapter: PublishAssessmentAdapter,
    private shareCommentAdapter: ShareCommentAdapter
  ) {
    this.baseUrl = environment.baseUrl;
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 22-07-2019
  * Descriotion : Update assessment-comment.
  */
  public updateComment(remark: any): Observable<ApiResponse> {
    const body = this.editCommentAdapter.toRequest(remark);
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey)
    return this.httpClient.put<ApiResponse>(this.baseUrl + ApiURL.AssessmentComment, body);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 21-12-2018
   * Descriotion : Delete assessment-comment.
   */
  public deleteComment(deleteComment): Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
      body: deleteComment,
    };
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey)
    return this.httpClient.delete<Response>(this.baseUrl + ApiURL.AssessmentComment, httpOptions);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 21-12-2018
   * Descriotion : Delete assessment-comment.
   */
  public deleteAttachment(deleteAttachment: any): Observable<ApiResponse> {
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey)
    return this.httpClient.put<ApiResponse>(this.baseUrl + ApiURL.Attachment, deleteAttachment);
  }

  /**
   * Author : Shahbaz Shaikh
   * Created Date: 11-03-2022
   * @param assessmentId 
   */
  public getEmailPreview(assessmentId: number, empId: number): Observable<ApiResponse> {
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey);
    const url = this.baseUrl + ApiURL.assessmentPublishEmailPreview + assessmentId + '/' + empId;
    return this.httpClient.get<ApiResponse>(url).pipe(map((result: any) => {
      return result;
    }));
  }

  /**
   * Author : Shahbaz Shaikh
   * Created Date: 11-03-2022
   * @param assessment
   */
  public publishAssessment(evaluation): Observable<ApiResponse> {
    const body = this.publishAssessmentAdapter.toRequest(evaluation);
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey);
    return this.httpClient.put<ApiResponse>(this.baseUrl + ApiURL.publishAssessment, body);
  }

  /**
  * Author : Shahbaz Shaikh
  * Modified-Date : 25-05-2022
  * Descriotion : Shared assessment-comment.
  */
  public shareComment(remark: any, remarkId: number, userId: number): Observable<ApiResponse> {
    const body = this.shareCommentAdapter.toRequest({remark, remarkId, userId});
    this.globalResponseHandlerService.encriptData(Version.Version1, Encryption.Version, Encryption.VersionKey)
    return this.httpClient.put<ApiResponse>(this.baseUrl + 'SendRemarkMail', body);
  }
}
