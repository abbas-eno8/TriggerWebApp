/**
 @author : Sonal Patil
 @class : TriggerCommentComponent
 @description :TriggerCommentComponent is created for employee dashboard separation.
 **/
import { Component, OnInit, Input, Output, EventEmitter, ComponentRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { ComponentPortal } from '@angular/cdk/portal';
import { saveAs } from 'file-saver';
import { ToasterService } from 'angular2-toaster';
// ------------------------------------------------- //
import { SearchPipePipe } from '../../../../shared/pipes/search-pipe.pipe';
import { Remarks, Model } from '../../../../shared/modals/individual-employee-model';
import { TriggerAComment } from '../../../../shared/tooltip/tooltip-model';
import { DeletePopupComponent } from '../../../../shared/modal-popup/delete-popup/delete-popup.component';
import { LoaderService } from '../../../../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { EvaluationComments, EvaluationSavedAndMailNotSent, EvaluationSavedAndMailSent, TeamMemberAssessment } from '../../../../shared/modals/shared-model';
import { ActionType, dashboardClass, Route, SendMail, Success_Title, Success_Type } from '../../../../core/magic-string/common.model';
import { CommonService } from '../../../../core/services/common/common.service';
import { PreviewAttachmentComponent } from './preview-attachment/preview-attachment.component';
import { EditCommentComponent } from './edit-delete-comment/edit-delete-comment.component';
import { Encryption } from '../../../../core/magic-string/common-validation-model';
import { UrlEncryptionDecryptionService } from '../../../../core/url-encryption-decryption/url-encryption-decryption.service';
import { TriggerScore } from '../../../../assessment/assessment-model';
import { PublishEvaultionComponent } from '../../../../shared/modal-popup/publish-evaultion/publish-evaultion.component';
import { CommentService } from './service/comment.service';

@Component({
  selector: 'trigger-trigger-comment',
  templateUrl: './trigger-comment.component.html',
  styleUrls: ['./trigger-comment.component.scss']
})
export class TriggerCommentComponent implements OnInit {

  @Input() public employeeName: string;

  @Input() public set remarks(value: any[]) {
    if (value) {
      this._remarks = value;
    }
  };
  public get remarks(): any[] {
    return this._remarks;
  }

  @Input() public set empData(value: any[]) {
    if (value) {
      this._empData = value;
    }
  };
  public get empData(): any[] {
    return this._empData;
  }

  @Output() updateRemark: EventEmitter<Remarks> = new EventEmitter<Remarks>();
  @Output() deleteRemark: EventEmitter<Remarks> = new EventEmitter<Remarks>();

  public teamMemberAssessment: any;
  public isSrcValid: boolean;
  public _searchText: string;
  public pageTitle: string;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  public userData: any;

  private _remarks: any[];
  private _empData: any[];
  public sendMailObject: SendMail;
  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;
  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;
  private triggerScore: TriggerScore;
  // private employeeName: string;

  constructor(
    private overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory,
    private searchPipePipe: SearchPipePipe,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private loaderService: LoaderService,
    public commentService: CommentService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private globalEventsManager: GlobalEventsManager,
    private commonService: CommonService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private toasterService: ToasterService
  ) {
    this.userData = this.globalResponseHandlerService.getUserData();
    this.pageTitle = TriggerAComment;
    this.teamMemberAssessment = TeamMemberAssessment;
    this.isSrcValid = false;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    });
  }

  ngOnInit() { }

  /**
   * Author :Sonal patil
   * Modified-Date : 20-12-2018
   * Description : For search name of commented user on comment section
   */
  searchFields = ['name', 'profileName', 'attitude', 'general', 'maintenance', 'performance'];
  get searchText() {
    return this._searchText;
  }
  set searchText(search: string) {
    this._searchText = search;
    this.remarks = this.searchText ? this.searchPipePipe.transform(this.empData, this.searchText, this.searchFields) : this.empData;
  }

  /**
   * Author : Sonal patil
   * Modified-Date :  20-12-2018
   * Description : For show short name of user if image not get from server
   */
  public onError(): void {
    this.isSrcValid = true;
  }

  public preview(remark: Remarks, modelName: string): void {
    const extension = remark[modelName].attachmentpath.substring(remark[modelName].attachmentpath.lastIndexOf('.') + 1);
    if (!!remark[modelName].cloudFilePath) {
      let cloudUrl = remark[modelName].cloudFilePath;
      window.open(cloudUrl, "_blank");
    } else {
      if (extension === 'csv') {
        this.httpClient.get(remark[modelName].attachmentpath, { responseType: 'text' }).subscribe(data => {
          let blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, remark[modelName].documentName.substring(remark[modelName].documentName.indexOf('$') + 1));
        });
      } else {
        this.previewAttachment(remark, modelName)
      }
    }
  }

  public previewAttachment(remark: Remarks, modelName): void {
    const remarkObj: any = { remark, modelName };
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    const dialogRef = this.matDialog.open(PreviewAttachmentComponent, {
      data: remarkObj,
      panelClass: ['xl-dialog-container', modalBackground],
      // panelClass: 'xl-dialog-container',
      position: {
        top: '', bottom: '', left: '', right: ''
      }
    });
    dialogRef.componentInstance.confirm.subscribe((object) => {
      this.updateRemark.emit(object);
      dialogRef.close();
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 25-07-2019
   * Description : Open Modal-popup for update comment.
   */
  public edit(remarkObj: Remarks): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    const dialogRef = this.matDialog.open(EditCommentComponent, {
      data: remarkObj,
      panelClass: ['lg-dialog-container', modalBackground],
      // panelClass: 'lg-dialog-container',
      position: {
        top: '', bottom: '', left: '', right: ''
      }
    });
    dialogRef.componentInstance.confirm.subscribe((remark) => {
      if (remark) {
        const isComment: boolean = remark.performance === '' && remark.attitude === '' && remark.maintenance === '' ? true : false;
        remark.isDelete = remark.isDeletable && isComment ? true : false;
        this.updateRemark.emit(remark);
        dialogRef.close();
      }
    });

    dialogRef.afterClosed().subscribe((object) => {
      if (object) {
        this.updateRemark.emit(object);
        dialogRef.close();
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 25-07-2019
   * Description : Open Modal-popup for ask to delete comment.
   */
  public delete(remark: Remarks): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: 'Comment'
    });
    dialogRef.componentInstance.confirm.subscribe((data) => {
      if (data) {
        remark.isDelete = true;
        this.deleteComment(remark, dialogRef);
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 25-07-2019
   * Description : Call API for delete comment.
   */
  public deleteComment(remark: any, dialogRef: MatDialogRef<DeletePopupComponent>): void {
    const deleteRemark: any = {
      assessmentId: remark.assessmentId,
      updatedby: this.userData.userId,
      isTriggerSent: remark.isTriggerSent,
      performanceRemarkId: remark.performanceRemarkId,
      attitudeRemarkId: remark.attitudeRemarkId,
      maintenanceRemarkId: remark.maintenanceRemarkId
    }
    this.loaderService.emitIsLoaderShown(true);
    this.commentService.deleteComment(deleteRemark).subscribe((response) => {
      if (this.globalResponseHandlerService.getApiResponse(response)) {
        this.deleteRemark.emit(remark);
        dialogRef.close();
      }
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 10-03-2022
   * Description : Open modal popup.
   */
  public onSaveAssessment(remark: any): void {
    // Get Eamil Preview
    this.commentService.getEmailPreview(remark.assessmentId, remark.empid).subscribe((response) => {
      if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
        this.sendMailObject = new SendMail(response.data[0].assessmentId, ActionType.TriggerAnEmployee, response.data[0].employeeEmail, response.data[0].emailContent);
        if (remark.isTriggerSent === 0) {
          this.sendEmailAssessment(remark, true);
        } else if (remark.isTriggerSent === 2) {
          this.openPublishModal(response.data[0], remark);
        }
      }
    });
  }



  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 10-03-2022
   * Descripation : Send email to user
   * @param remark 
   * @param isSendMail 
   */
  private sendEmailAssessment(remark, isSendMail: boolean = false): void {
    this.loaderService.emitIsLoaderShown(true);
    this.commonService.sendMail(this.sendMailObject).subscribe(
      (sendMail) => {
        if (this.globalResponseHandlerService.getApiResponse(sendMail, true, true)) {
          if (isSendMail) {
            remark.isTriggerSent = 1;
          }
        }
      });
  }

  /**
    * Author : Shahbaz Shaikh
    * Created-Date : 25-05-2022
    */
  public shareComment(remark, remarkId): void {
    this.loaderService.emitIsLoaderShown(true);
    this.commentService.shareComment(remark, remarkId, this.userData.userId).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, true, true)) {
          if (remarkId === EvaluationComments.GeneralRemarkId) {
            remark.isGeneralRemarkSend = 2;
          } else if (remarkId === EvaluationComments.PerformanceRemarkId) {
            remark.isPerformanceCommentSend = 2;
          } else if (remarkId === EvaluationComments.AttitudeRemarkId) {
            remark.isAttitudeCommentSend = 2;
          } else if (remarkId === EvaluationComments.MaintenanceRemarkId) {
            remark.isMaintenanceCommentSend = 2;
          }
        }
      });
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 10-03-2022
   * Descripation : Publish assessment
   * @param remark 
   * @param formValue 
   * @param isSendMail 
   */
  private publishAssessment(remark, formValue, isSendMail): void {
    this.loaderService.emitIsLoaderShown(true);
    this.commentService.publishAssessment(formValue).subscribe((response) => {
      if (this.globalResponseHandlerService.getApiResponse(response, true)) {
        this.overlayRef.dispose();
        if (isSendMail) {
          // this.sendEmailAssessment(remark);
          this.toasterService.pop(Success_Type, Success_Title, EvaluationSavedAndMailSent);
        } else {
          this.toasterService.pop(Success_Type, Success_Title, EvaluationSavedAndMailNotSent);
        }
        this.updateModel(remark, response.data[0]);
        this.redirectToTruvelopScore(response.data[0]);
      }
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 22-02-2022
   * Description : Open publish modal popup.
   */
  public openPublishModal(response: any, remark: any): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(PublishEvaultionComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.componentOverlayRef.instance.data = {
      dynamicContent: response.emailContent,
      formValue: remark,
      isSendMail: response.sendTrigger
    };

    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
    });

    this.componentOverlayRef.instance.publish.subscribe((formValue) => {
      this.publishAssessment(remark, formValue, true);
    });
    this.componentOverlayRef.instance.save.subscribe((formValue) => {
      this.publishAssessment(remark, formValue, false);
    });
    this.componentOverlayRef.instance.cancel.subscribe((isCancel) => {
      this.overlayRef.dispose();
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 10-03-2022
   * Description : Update model remarks-value which we updated locally.
     */
  private updateModel(remark, response): void {
    remark.assessmentId = response.assessmentId;
    remark.assessmentDate = new Date(response.assessmentDate).toString();
    remark.isTriggerSent = response.isTriggerSent;

    remark.performanceRemarkId = response.performanceRemarkId;
    remark.performance = response.performance;
    remark.performanceCategory = remark.performanceCategory;
    // Performance Model
    // this.remark.performanceModel.empId = this.remark.empid;
    // this.remark.performanceModel.assessmentId = this.remark.assessmentId;
    // this.remark.performanceModel.remarkId = this.remark.performanceRemarkId;
    remark.performanceModel.documentName = response.performanceDocumentName ? response.performanceDocumentName.substring(response.performanceDocumentName.lastIndexOf('/') + 1, response.performanceDocumentName.length) : '';
    remark.performanceModel.attachmentpath = response.performanceDocumentName;
    remark.performanceModel.cloudFilePath = response.performanceCloudFilePath;
    remark.performanceModel.remarks = response.performance;
    remark.performanceModel.updatedby = this.userData.userId;
    remark.performanceModel.isPreview = (response.performanceDocumentName ? true : false) || (response.performanceCloudFilePath ? true : false);
    remark.performanceModel.fileName = response.performanceDocumentName ? response.performanceDocumentName.substring(response.performanceDocumentName.indexOf('$') + 1) : response.performanceCloudFilePath ? response.performanceCloudFilePath : '';
    remark.performanceModel.isFileDeletable = response.performanceDocumentName ? true : response.performanceCloudFilePath ? true : false;

    remark.attitudeRemarkId = response.attitudeRemarkId;
    remark.attitude = response.attitude;
    remark.attitudeCategory = remark.attitudeCategory;
    // Attitude Model
    // this.remark.attitudeModel.empId = this.remark.empid;
    // this.remark.attitudeModel.assessmentId = this.remark.assessmentId;
    // this.remark.attitudeModel.remarkId = this.remark.attitudeRemarkId;
    remark.attitudeModel.documentName = response.attitudeDocumentName ? response.attitudeDocumentName.substring(response.attitudeDocumentName.lastIndexOf('/') + 1, response.attitudeDocumentName.length) : '';
    remark.attitudeModel.attachmentpath = response.attitudeDocumentName;
    remark.attitudeModel.cloudFilePath = response.attitudeCloudFilePath;
    remark.attitudeModel.remarks = response.attitude;
    remark.attitudeModel.updatedby = this.userData.userId;
    remark.attitudeModel.isPreview = (response.attitudeDocumentName ? true : false) || (response.attitudeCloudFilePath ? true : false);
    remark.attitudeModel.fileName = response.attitudeDocumentName ? response.attitudeDocumentName.substring(response.attitudeDocumentName.indexOf('$') + 1) : response.attitudeCloudFilePath ? response.attitudeCloudFilePath : '';
    remark.attitudeModel.isFileDeletable = response.attitudeDocumentName ? true : response.attitudeCloudFilePath ? true : false;

    remark.maintenanceRemarkId = response.maintenanceRemarkId;
    remark.maintenance = response.maintenance;
    remark.maintenanceCategory = remark.maintenanceCategory;
    // Maintenance Model
    // this.remark.maintenanceModel.empId = this.remark.empid;
    // this.remark.maintenanceModel.assessmentId = this.remark.assessmentId;
    // this.remark.maintenanceModel.remarkId = this.remark.maintenanceRemarkId;
    remark.maintenanceModel.documentName = response.maintenanceDocumentName ? response.maintenanceDocumentName.substring(response.maintenanceDocumentName.lastIndexOf('/') + 1, response.maintenanceDocumentName.length) : '';
    remark.maintenanceModel.attachmentpath = response.maintenanceDocumentName;
    remark.maintenanceModel.cloudFilePath = response.maintenanceCloudFilePath;
    remark.maintenanceModel.remarks = response.maintenance;
    remark.maintenanceModel.updatedby = this.userData.userId;
    remark.maintenanceModel.isPreview = (response.maintenanceDocumentName ? true : false) || (response.maintenanceCloudFilePath ? true : false);
    remark.maintenanceModel.fileName = response.maintenanceDocumentName ? response.maintenanceDocumentName.substring(response.maintenanceDocumentName.indexOf('$') + 1) : response.maintenanceCloudFilePath ? response.maintenanceCloudFilePath : '';
    remark.maintenanceModel.isFileDeletable = response.maintenanceDocumentName ? true : response.maintenanceCloudFilePath ? true : false;


    remark.generalRemarkId = response.generalRemarkId;
    remark.general = response.general;
    remark.generalCategory = remark.generalCategory;
    // General Model
    // this.remark.generalModel.empId = this.remark.empid;
    // this.remark.generalModel.assessmentId = this.remark.assessmentId;
    // this.remark.generalModel.remarkId = this.remark.generalRemarkId;
    remark.generalModel.documentName = response.generalDocumentName ? response.generalDocumentName.substring(response.generalDocumentName.lastIndexOf('/') + 1, response.generalDocumentName.length) : '';
    remark.generalModel.attachmentpath = response.generalDocumentName;
    remark.generalModel.cloudFilePath = response.generalCloudFilePath;
    remark.generalModel.remarks = response.general;
    remark.generalModel.updatedby = this.userData.userId;
    remark.generalModel.isPreview = (response.generalDocumentName ? true : false) || (response.generalCloudFilePath ? true : false);
    remark.generalModel.fileName = response.generalDocumentName ? response.generalDocumentName.substring(response.generalDocumentName.indexOf('$') + 1) : response.generalCloudFilePath ? response.generalCloudFilePath : '';
    remark.generalModel.isFileDeletable = response.generalDocumentName ? true : response.generalCloudFilePath ? true : false;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 27-01-2020
   * Description : Created method for redirected to Trigger-score page.
   */
  public redirectToTruvelopScore(response: any): void {
    this.triggerScore = {
      assessmentId: response.assessmentId,
      assessmentById: response.assessmentBy,
      companyId: response.createdBy,
      empId: response.empId,
      empName: this.employeeName,
      empScoreRank: response.empScoreRank,
      generalScoreRank: response.generalScoreRank,
      managerAction: response.managerAction,
      ratingDate: response.ratingDate,
      scoreRemarks: response.scoreRemarks,
      scoreSummary: response.scoreSummary,
      gradeClass: this.getClassByGrade(response.empScoreRank),
      isDisabledBtnEmployeeDhashboard: false,
      isDisabledBtnTruvelopDashboard: !this.globalResponseHandlerService.getUserData().isManagerAccess,
    };

    this.globalResponseHandlerService.encriptData(JSON.stringify(this.triggerScore), Encryption.TriggerScoreMessage, Encryption.TriggerScoreKey);
    this.urlEncryptionDecryptionService.urlEncryption(response.empId.toString(), Route.TriggerScore);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 10-09-2019
   * Description : Get class by grade.
   */
  private getClassByGrade(grade: string): string {
    if (grade !== '') {
      return dashboardClass.find(c => grade.includes(c.grade)).bindClass;
    } else {
      return '';
    }
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
}