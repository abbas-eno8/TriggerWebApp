/**
@author : Anjali Tandel
@class : RemarkService
@description : RemarkService is created for update/delete comment & attachment.
**/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { ApiURL, Version2 } from '../../../../../core/magic-string/common.model';
import { Model } from '../../../../../shared/modals/individual-employee-model';
import { Response } from '../../../../../core/common.response';
import { Encryption } from '../../../../../core/magic-string/common-validation-model';
import { GlobalResponseHandlerService } from '../../../../../core/global-response-handler/global-response-handler';

@Injectable()
export class RemarkService {
  private baseUrl: string;
  constructor(
    private httpClient: HttpClient,
    private globalResponseHandlerService: GlobalResponseHandlerService
    ) {
    this.baseUrl = environment.baseUrl;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 22-07-2019
   * Descriotion : Update assessment-comment.
   */
  public updateComment(remark: Model): Observable<Response> {
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey)
    return this.httpClient.put<Response>(this.baseUrl + ApiURL.AssessmentComment, remark);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 21-12-2018
   * Descriotion : Delete assessment-comment.
   */
  public deleteComment(AssessmentId: number, remarkId: number, userId: number): Observable<Response> {
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey)
    return this.httpClient.delete<Response>(this.baseUrl + ApiURL.AssessmentComment + '/' + AssessmentId + '/' + remarkId + '/' + userId);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 21-12-2018
   * Descriotion : Delete assessment-comment.
   */
  public deleteAttachment(remark: Model): Observable<Response> {
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey)
    return this.httpClient.put<Response>(this.baseUrl + ApiURL.Attachment, remark);
  }
}
