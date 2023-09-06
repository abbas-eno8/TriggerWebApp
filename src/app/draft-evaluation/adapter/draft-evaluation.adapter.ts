/**
 * @author Shahbaz Shaikh
 * @description Draft evaluation adpater file
 */
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
// ----------------------------------------- //
import { Adapter } from '../../core/adapter/adpater';
import { ApiResponse } from '../../core/magic-string/common.model';
import { AssessmentDateTimeStamp, EvaulationDraftResponse, PublishAssessmentRequest } from '../draft-evaluation.model';
import { RemarkEditRequest } from '../../shared/modals/individual-employee-model';

/** Evaulation Draft List Adapter */
@Injectable()
export class EvaluationDraftListAdapter implements Adapter<ApiResponse> {

  constructor() { }
  /**
   * Get the response from API and bind
   * @param response Get Response
   * @returns 
   */
  public toResponse(response: any): ApiResponse {
    const evaulationDraftList: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindEvaulationDraft(response.data) : [],
      response.status,
      response.message,
    );
    return evaulationDraftList;
  }

  /**
   * This method used for loop the evulation list and bind single object
   * @param data Get the Evaluation list
   * @returns 
   */
  private bindEvaulationDraft(data: any): EvaulationDraftResponse[] {
    let evaluation: any[];
    evaluation = data.map(t => (
      this.evaluation(t)
    ));
    return evaluation;
  }

  /**
   * This method used for bind the value in the evaluation object
   * @param data get the evaluation object
   * @returns 
   */
  private evaluation(data: any): EvaulationDraftResponse {
    const evaluation: EvaulationDraftResponse = new EvaulationDraftResponse();

    evaluation.empId = data.empid;
    evaluation.empFirstName = data.empFirstName;
    evaluation.empLastName = data.empLastName;
    evaluation.empImgPath = data.empImgPath;
    evaluation.departmentId = data.departmentId;

    evaluation.assessmentId = data.assessmentId;
    evaluation.assessmentById = data.assessmentById;
    evaluation.assessmentDate = data.assessmentDate;
    evaluation.assessmentByImgPath = data.assessmentByImgPath;
    evaluation.firstName = data.firstName;
    evaluation.lastName = data.lastName;
    evaluation.isTriggerSent = data.isTriggerSent;
    evaluation.empRelation = data.empRelation;
    evaluation.protectionLevel = data.protectionLevel;
    evaluation.teamType = data.teamType;
    evaluation.joiningDate = data.joiningDate;
    evaluation.empStatus = data.empStatus;

    evaluation.performanceRemarkId = data.performanceRemarkId;
    evaluation.performance = data.performance ? data.performance : '';
    evaluation.performanceCategory = data.performanceCategory;
    evaluation.performanceDocumentName = data.performanceDocumentName;
    evaluation.performanceCloudFilePath = data.performanceCloudFilePath;

    evaluation.attitudeRemarkId = data.attitudeRemarkId;
    evaluation.attitude = data.attitude ? data.attitude : '';
    evaluation.attitudeCategory = data.attitudeCategory;
    evaluation.attitudeDocumentName = data.attitudeDocumentName;
    evaluation.attitudeCloudFilePath = data.attitudeCloudFilePath;

    evaluation.maintenanceRemarkId = data.maintenanceRemarkId;
    evaluation.maintenance = data.maintenance ? data.maintenance : '';
    evaluation.maintenanceCategory = data.maintenanceCategory;
    evaluation.maintenanceDocumentName = data.maintenanceDocumentName;
    evaluation.maintenanceCloudFilePath = data.maintenanceCloudFilePath;

    evaluation.generalRemarkId = data.generalRemarkId;
    evaluation.general = data.general ? data.general : '';
    evaluation.generalCategory = data.generalCategory;
    evaluation.generalDocumentName = data.generalDocumentName;
    evaluation.generalCloudFilePath = data.generalCloudFilePath;

    // evaluation.scoreSummary = data.scoreSummary;
    evaluation.sendSpark = data.sendSpark;
    evaluation.isPerformanceCommentSend = data.isPerformanceCommentSend;
    evaluation.isAttitudeCommentSend = data.isAttitudeCommentSend;
    evaluation.isMaintenanceCommentSend = data.isMaintenanceCommentSend;
    evaluation.isGeneralRemarkSend = data.isGeneralRemarkSend;

    return evaluation;
  }

}

/** Edit Evaluation Adapter */
@Injectable()
export class EditEvaluationAdapter implements Adapter<any> {
  /** This method is used to transform response object into T object. */
  constructor(
    private datePipe: DatePipe
  ) { }

  /**
   * This method used of bind the edit evuluation object
   * @param response get the edit evaluation object
   * @returns 
   */
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

/** Publish Evaluation Adapter */
@Injectable()
export class PublishEvaluationAdapter implements Adapter<any> {
  /** This method is used to transform response object into T object. */
  constructor(
    private datePipe: DatePipe
  ) { }

  /**
   * This method used of bind the add evuluation object
   * @param response get the add evaluation object
   * @returns 
   */
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