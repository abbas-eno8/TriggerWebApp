import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
// -------------------------------------------- //
import { RemarkEditRequest } from "../../../shared/modals/individual-employee-model";
import { Adapter } from "../../../core/adapter/adpater";
import { AssessmentDateTimeStamp } from "../../../assessment/assessment-model";
import { PublishAssessmentRequest, shareCommentRequest } from "../../../draft-evaluation/draft-evaluation.model";

@Injectable()
export class EditCommentAdapter implements Adapter<any> {
  /** This method is used to transform response object into T object. */
  constructor(
    private datePipe: DatePipe
  ) { }

  public toRequest(response: any): RemarkEditRequest {

    const reamrk: RemarkEditRequest = new RemarkEditRequest(
      response.assessmentId,
      response.updatedby,
      response.isTriggerSent,

      response.performanceRemarkId,
      response.performance != '' ? response.performance.trim() : '',
      response.performanceDocumentName,
      response.performanceDocumentContents,
      response.performanceCloudFilePath,

      response.attitudeRemarkId,
      response.attitude != '' ? response.attitude.trim() : '',
      response.attitudeDocumentName,
      response.attitudeDocumentContents,
      response.attitudeCloudFilePath,

      response.maintenanceRemarkId,
      response.maintenance != '' ? response.maintenance.trim() : '',
      response.maintenanceDocumentName,
      response.maintenanceDocumentContents,
      response.maintenanceCloudFilePath,

      response.generalRemarkId,
      response.general != '' ? response.general.trim() : '',
      response.generalDocumentName,
      response.generalDocumentContents,
      response.generalCloudFilePath,

      this.datePipe.transform(new Date(), AssessmentDateTimeStamp),

      response.isPerformanceCommentSend,
      response.isAttitudeCommentSend,
      response.isMaintenanceCommentSend,
      response.isGeneralRemarkSend
    );
    return reamrk;
  }
}

@Injectable()
export class PublishAssessmentAdapter implements Adapter<any> {
  /** This method is used to transform response object into T object. */
  constructor(
    private datePipe: DatePipe
  ) { }

  public toRequest(response: any): PublishAssessmentRequest {
    const reamrk: PublishAssessmentRequest = new PublishAssessmentRequest(
      response.assessmentId,
      this.datePipe.transform(response.assessmentDate, AssessmentDateTimeStamp),
      response.assessmentBy,
      response.createdBy,
      response.empId,
      response.requestId,
      response.isTriggerSent,

      response.performanceRemarkId,
      response.performance != '' ? response.performance.trim() : '',
      response.performanceDocumentName,
      response.performanceDocumentContents,
      response.performanceCloudFilePath,

      response.attitudeRemarkId,
      response.attitude != '' ? response.attitude.trim() : '',
      response.attitudeDocumentName,
      response.attitudeDocumentContents,
      response.attitudeCloudFilePath,

      response.maintenanceRemarkId,
      response.maintenance != '' ? response.maintenance.trim() : '',
      response.maintenanceDocumentName,
      response.maintenanceDocumentContents,
      response.maintenanceCloudFilePath,

      response.generalRemarkId,
      response.general != '' ? response.general.trim() : '',
      response.generalDocumentName,
      response.generalDocumentContents,
      response.generalCloudFilePath,

      this.datePipe.transform(new Date(), AssessmentDateTimeStamp),

      response.isPerformanceCommentSend ? 1 : 0,
      response.isAttitudeCommentSend ? 1 : 0,
      response.isMaintenanceCommentSend ? 1 : 0,
      response.isGeneralRemarkSend ? 1 : 0,
    );
    return reamrk;
  }
}

@Injectable()
export class ShareCommentAdapter implements Adapter<any, any> {
  /** This method is used to transform response object into T object. */
  constructor(
  ) { }

  public toRequest(response): shareCommentRequest {
    const shareComment: shareCommentRequest = new shareCommentRequest(
      response.remark.assessmentId,
      response.remark.empid,
      response.remarkId,
      response.userId
    );
    
    return shareComment;
  }
}