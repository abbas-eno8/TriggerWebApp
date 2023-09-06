/**
 * @author Shahbaz Shaikh
 * DraftEvalutionPresenter
 */
import { ComponentRef, Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { saveAs } from 'file-saver';
// ------------------------------------------------ //
import { dashboardClass, Route } from '../../../core/magic-string/common.model';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { PublishEvaultionComponent } from '../../../shared/modal-popup/publish-evaultion/publish-evaultion.component';
import { LoaderService } from '../../../core/loader/loader.service';
import { UrlEncryptionDecryptionService } from '../../../core/url-encryption-decryption/url-encryption-decryption.service';
import { Encryption } from '../../../core/magic-string/common-validation-model';
import { UserModel } from '../../../core/model/user';
import { TriggerScore } from '../../../assessment/assessment-model';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
import { EvaluationPreviewAttachmentComponent } from '../evaluation-preview-attachment/evaluation-preview-attachment.component';
import { EditEvaluationComponent } from '../edit-evaluation/edit-evaluation.component';
import { DeletePopupComponent } from '../../../shared/modal-popup/delete-popup/delete-popup.component';
import { ActionPermissionService } from '../../../core/services/action-permission/action-permission.service';

@Injectable()
export class DraftEvalutionPresenter {

  /** This is used for subscribing the value of subject add */
  public updatedEvaluation$: Observable<any>;
  /** This is used for subscribing the value of subject add */
  public deleteEvaluation$: Observable<any>;
  /** This is used for subscribing the value of subject add */
  public emailPreview$: Observable<any>;
  /** This is used for subscribing the value of subject add */
  public publishEvalution$: Observable<any>;
  public evaluationDraftList: any;

  /** Store the user data */
  private user: UserModel;
  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;
  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;
  /** Store trigger score data */
  private triggerScore: TriggerScore;
  /** Store isDarkTheme */
  private isDarkTheme: boolean;
  /** Store themeEmitter */
  private themeEmitter: any;
  /** This is used for add camelCaseModelName object */
  private updatedEvaluation: Subject<any>;
  /** This is used for add camelCaseModelName object */
  private deleteEvaluation: Subject<any>;
  /** This is used for add camelCaseModelName object */
  private emailPreview: Subject<any>;
  /** This is used for add camelCaseModelName object */
  private publishEvalution: Subject<any>;
  /** Store the evaluation */
  private evalution: any;
  /** Store the delete evaluation object */
  private deleteEvaluationObj: any;
  /** Check wether button is disable or not */
  private isDisabledBtnEmployeeDhashboard: boolean;

  constructor(
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory,
    private loaderService: LoaderService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private globalEventsManager: GlobalEventsManager,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private actionPermissionService: ActionPermissionService
  ) {
    this.setProperty();
  }

  /**
   * Author: Shahbaz Shaikh
   * Descripation: Set the evaluation list 
   * @param evaluationDraftList Get the drfat evaluation list
   * @returns 
   */
  public setEvaulationDraftList(evaluationDraftList): void {
    this.evaluationDraftList = evaluationDraftList.map((item) => ({
      isDisplayEmployeeDashboard: this.actionPermissionService.isDisplyEmployeeDashboard(item),
      empId: item.empId,
      empProfileName: item.empFirstName.charAt(0).toUpperCase() + item.empLastName.charAt(0).toUpperCase(),
      empName: item.empFirstName + ' ' + item.empLastName,
      empImgPath: item.empImgPath,
      departmentId: item.departmentId,

      assessmentId: item.assessmentId,
      assessmentById: item.assessmentById,
      assessmentDate: item.assessmentDate,
      assessmentByImgPath: item.assessmentByImgPath,
      name: item.firstName + ' ' + item.lastName,
      profileName: item.firstName.charAt(0).toUpperCase() + item.lastName.charAt(0).toUpperCase(),
      isTriggerSent: item.isTriggerSent,
      empRelation: item.empRelation,
      protectionLevel: item.protectionLevel,
      teamType: item.teamType,
      joiningDate: item.joiningDate,
      empStatus: item.empStatus,
      sendSpark: item.sendSpark,

      isPerformanceCommentSend: item.isPerformanceCommentSend,
      isAttitudeCommentSend: item.isAttitudeCommentSend,
      isMaintenanceCommentSend: item.isMaintenanceCommentSend,
      isGeneralRemarkSend: item.isGeneralRemarkSend,

      performanceRemarkId: item.performanceRemarkId,
      performance: item.performance,
      performanceCategory: item.performanceCategory,
      performanceModel: {
        empId: item.empId,
        assessmentId: item.assessmentId,
        remarkId: item.performanceRemarkId,
        remarks: item.performance,
        documentName: item.performanceDocumentName ? item.performanceDocumentName.substring(item.performanceDocumentName.lastIndexOf('/') + 1, item.performanceDocumentName.length) : '',
        documentContents: '',
        updatedby: this.user.userId,
        cloudFilePath: item.performanceCloudFilePath,
        attachmentpath: item.performanceDocumentName,
        isPreview: (item.performanceDocumentName !== '' ? true : false) || (item.performanceCloudFilePath !== '' ? true : false),
        fileName: item.performanceDocumentName ? item.performanceDocumentName.substring(item.performanceDocumentName.indexOf('$') + 1) : item.performanceCloudFilePath ? item.performanceCloudFilePath : '',
        isCsvFile: (item.performanceDocumentName !== '' && item.performanceDocumentName.substring(item.performanceDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
        isDeletableAttachment: item.performanceDocumentName !== '' ? true : false,
        isFileDeletable: item.performanceDocumentName ? true : false,
      },

      attitudeRemarkId: item.attitudeRemarkId,
      attitude: item.attitude,
      attitudeCategory: item.attitudeCategory,
      attitudeModel: {
        empId: item.empId,
        assessmentId: item.assessmentId,
        remarkId: item.attitudeRemarkId,
        remarks: item.attitude,
        documentName: item.attitudeDocumentName ? item.attitudeDocumentName.substring(item.attitudeDocumentName.lastIndexOf('/') + 1, item.attitudeDocumentName.length) : '',
        documentContents: '',
        updatedby: this.user.userId,
        cloudFilePath: item.attitudeCloudFilePath,
        attachmentpath: item.attitudeDocumentName,
        isPreview: (item.attitudeDocumentName !== '' ? true : false) || (item.attitudeCloudFilePath !== '' ? true : false),
        fileName: item.attitudeDocumentName ? item.attitudeDocumentName.substring(item.attitudeDocumentName.indexOf('$') + 1) : item.attitudeCloudFilePath ? item.attitudeCloudFilePath : '',
        isCsvFile: (item.attitudeDocumentName !== '' && item.attitudeDocumentName.substring(item.attitudeDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
        isDeletableAttachment: item.attitudeDocumentName !== '' ? true : false,
        isFileDeletable: item.attitudeDocumentName ? true : false,
      },

      maintenanceRemarkId: item.maintenanceRemarkId,
      maintenance: item.maintenance,
      maintenanceCategory: item.maintenanceCategory,
      maintenanceModel: {
        empId: item.empId,
        assessmentId: item.assessmentId,
        remarkId: item.maintenanceRemarkId,
        remarks: item.maintenance,
        documentName: item.maintenanceDocumentName ? item.maintenanceDocumentName.substring(item.maintenanceDocumentName.lastIndexOf('/') + 1, item.maintenanceDocumentName.length) : '',
        documentContents: '',
        updatedby: this.user.userId,
        cloudFilePath: item.maintenanceCloudFilePath,
        attachmentpath: item.maintenanceDocumentName,
        isPreview: (item.maintenanceDocumentName !== '' ? true : false) || (item.maintenanceCloudFilePath !== '' ? true : false),
        fileName: item.maintenanceDocumentName ? item.maintenanceDocumentName.substring(item.maintenanceDocumentName.indexOf('$') + 1) : item.maintenanceCloudFilePath ? item.maintenanceCloudFilePath : '',
        isCsvFile: (item.maintenanceDocumentName !== '' && item.maintenanceDocumentName.substring(item.maintenanceDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
        isDeletableAttachment: item.maintenanceDocumentName !== '' ? true : false,
        isFileDeletable: item.maintenanceDocumentName ? true : false,
      },

      generalRemarkId: item.generalRemarkId,
      general: item.general,
      generalCategory: item.generalCategory,
      generalModel: {
        empId: item.empId,
        assessmentId: item.assessmentId,
        remarkId: item.generalRemarkId,
        remarks: item.general,
        documentName: item.generalDocumentName ? item.generalDocumentName.substring(item.generalDocumentName.lastIndexOf('/') + 1, item.generalDocumentName.length) : '',
        documentContents: '',
        updatedby: this.user.userId,
        cloudFilePath: item.generalCloudFilePath,
        attachmentpath: item.generalDocumentName,
        isPreview: (item.generalDocumentName !== '' ? true : false) || (item.generalCloudFilePath !== '' ? true : false),
        fileName: item.generalDocumentName ? item.generalDocumentName.substring(item.generalDocumentName.indexOf('$') + 1) : item.generalCloudFilePath ? item.generalCloudFilePath : '',
        isCsvFile: (item.generalDocumentName !== '' && item.generalDocumentName.substring(item.generalDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
        isDeletableAttachment: item.generalDocumentName !== '' ? true : false,
        isFileDeletable: item.generalDocumentName ? true : false,
      },
      isEditable: true,
      isDeletable: true,
      itemUpdDateTime: new Date(),
    }));
    return this.evaluationDraftList;
  }

  /**
   * Author: Shahbaz Shaikh
   * Descripation: Edit the evaluation
   * @param evaluation Get the evaluation
   */
  public editEvaluation(evaluation): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    const dialogRef = this.matDialog.open(EditEvaluationComponent, {
      data: evaluation,
      panelClass: ['lg-dialog-container', modalBackground],
      // panelClass: 'lg-dialog-container',
      position: {
        top: '', bottom: '', left: '', right: ''
      }
    });

    dialogRef.componentInstance.confirm.subscribe((evaluation) => {
      if (evaluation) {
        this.updatedEvaluation.next(this.evaluationDraftList);
        dialogRef.close();
      }
    });

    dialogRef.afterClosed().subscribe((object) => {
      if (object) {
        this.updatedEvaluation.next(this.evaluationDraftList);
        dialogRef.close();
      }
    });
  }

  /**
   * Author: Shahbaz Shaikh
   * Descripation: Delete the evaluation
   * @param evaluation Get the evaluation
   */
  public deleteEvaluations(evaluation): void {
    this.deleteEvaluationObj = evaluation;
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: 'Comment'
    });
    dialogRef.componentInstance.confirm.subscribe((data) => {
      if (data) {
        const deleteEvaluation: any = {
          assessmentId: evaluation.assessmentId,
          updatedby: this.user.userId,
          isTriggerSent: evaluation.isTriggerSent,
          performanceRemarkId: evaluation.performanceRemarkId,
          attitudeRemarkId: evaluation.attitudeRemarkId,
          maintenanceRemarkId: evaluation.maintenanceRemarkId
        }
        this.deleteEvaluation.next(deleteEvaluation);
        dialogRef.close();
        this.resetDeleteCommet(evaluation);
      }
    });
  }

  /**
   * Author: Shahbaz Shaikh
   * Descripation: Update deleted evaluation
   */
  public updateDeletedEvaluation(): void {
    this.loaderService.emitIsLoaderShown(false);
    this.updatedEvaluation.next(this.evaluationDraftList);
  }

  /**
   * Author: Shahbaz Shaikh
   * Descripation: Preview the attachment
   * @param remark Get the reamrk
   * @param modelName Get the model of attachment
   */
  public preview(remark: any, modelName: string): void {
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
        this.previewAttachment(remark, modelName);
      }
    }
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Save evaluation 
   * @param evalution 
   */
  public saveEvaultion(evalution): void {
    this.isDisabledBtnEmployeeDhashboard = evalution.isDisplayEmployeeDashboard;
    this.getEmailPreview(evalution);
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 22-02-2022
   * Description : Open publish modal popup.
   */
  public openPublishModal(emailPreview: any): void {
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
      dynamicContent: emailPreview.emailContent,
      formValue: this.evalution,
      isSendMail: emailPreview.sendTrigger
    };

    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
    });

    this.componentOverlayRef.instance.publish.subscribe((formValue) => {
      this.onPublishEvalution(formValue, true);
    });

    this.componentOverlayRef.instance.save.subscribe((formValue) => {
      this.onPublishEvalution(formValue, false);
    });

    this.componentOverlayRef.instance.cancel.subscribe((isCancel) => {
      this.overlayRef.dispose();
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 22-03-2022
   * Description : Created method for redirected to Trigger-score page.
   */
  public redirectToTruvelopScore(response: any): void {
    this.overlayRef.dispose();
    this.loaderService.emitIsLoaderShown(true);

    this.triggerScore = {
      assessmentId: response.assessmentId,
      assessmentById: response.assessmentBy,
      companyId: response.createdBy,
      empId: response.empId,
      empName: this.evalution.empName,
      empScoreRank: response.empScoreRank,
      generalScoreRank: response.generalScoreRank,
      managerAction: response.managerAction,
      ratingDate: response.ratingDate,
      scoreRemarks: response.scoreRemarks,
      scoreSummary: response.scoreSummary,
      gradeClass: this.getClassByGrade(response.empScoreRank),
      isDisabledBtnEmployeeDhashboard: !this.isDisabledBtnEmployeeDhashboard,
      isDisabledBtnTruvelopDashboard: !this.globalResponseHandlerService.getUserData().isManagerAccess,
    };

    this.globalResponseHandlerService.encriptData(JSON.stringify(this.triggerScore), Encryption.TriggerScoreMessage, Encryption.TriggerScoreKey);
    this.urlEncryptionDecryptionService.urlEncryption(response.empId.toString(), Route.TriggerScore);
    this.loaderService.emitIsLoaderShown(false);
  }

  /** Private Method */
  /** Initializes default properties for the component */
  private setProperty(): void {
    this.user = this.globalResponseHandlerService.getUser();
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    });
    this.updatedEvaluation = new Subject();
    this.updatedEvaluation$ = this.updatedEvaluation.asObservable();
    this.deleteEvaluation = new Subject();
    this.deleteEvaluation$ = this.deleteEvaluation.asObservable();
    this.emailPreview = new Subject();
    this.emailPreview$ = this.emailPreview.asObservable();
    this.publishEvalution = new Subject();
    this.publishEvalution$ = this.publishEvalution.asObservable();
  }

  private previewAttachment(remark: any, modelName): void {
    const remarkObj: any = { remark, modelName };
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    const dialogRef = this.matDialog.open(EvaluationPreviewAttachmentComponent, {
      data: remarkObj,
      panelClass: ['xl-dialog-container', modalBackground],
      // panelClass: 'xl-dialog-container',
      position: {
        top: '', bottom: '', left: '', right: ''
      }
    });
    dialogRef.componentInstance.confirm.subscribe((object) => {
      this.updatedEvaluation.next(this.evaluationDraftList);
      dialogRef.close();
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 10-03-2022
   * Description : Get email preview
   */
  private getEmailPreview(evalution): void {
    this.evalution = evalution;
    this.emailPreview.next(evalution);
    this.updatedEvaluation.next(this.evaluationDraftList);
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 10-03-2022
   * Descripation : Publish assessment
   * @param formValue Get the form value 
   * @param isSendMail Check email send or not
   */
  private onPublishEvalution(formValue, isSendMail: boolean): void {
    const evaluation = { formValue, isSendMail };
    this.publishEvalution.next(evaluation);
  }

  /**
   * Author : Shahbaz Shaikh
   * Reset the deleted comment
   * @param remark Get the Remark data
   */
  private resetDeleteCommet(remark): void {
    //Find index of specific object using findIndex method. 
    let objIndex = this.evaluationDraftList.findIndex(((obj) => obj.assessmentId === remark.assessmentId));

    this.evaluationDraftList[objIndex].performanceRemarkId = 5;
    this.evaluationDraftList[objIndex].performance = '';
    this.evaluationDraftList[objIndex].performanceCategory = '';
    this.evaluationDraftList[objIndex].performanceModel = {
      empId: 0,
      assessmentId: remark.assessmentId,
      remarkId: 0,
      remarks: '',
      documentName: '',
      documentContents: '',
      updatedby: this.user.userId,
      cloudFilePath: '',
      attachmentpath: '',
      fileName: '',
      isPreview: false,
      isCsvFile: false,
      isFileDeletable: false,
    };

    this.evaluationDraftList[objIndex].attitudeRemarkId = 10;
    this.evaluationDraftList[objIndex].attitude = '';
    this.evaluationDraftList[objIndex].attitudeCategory = '';
    this.evaluationDraftList[objIndex].attitudeModel = {
      empId: 0,
      assessmentId: remark.assessmentId,
      remarkId: 0,
      remarks: '',
      documentName: '',
      documentContents: '',
      updatedby: this.user.userId,
      cloudFilePath: '',
      attachmentpath: '',
      fileName: '',
      isPreview: false,
      isCsvFile: false,
      isFileDeletable: false,
    };

    this.evaluationDraftList[objIndex].maintenanceRemarkId = 13;
    this.evaluationDraftList[objIndex].maintenance = '';
    this.evaluationDraftList[objIndex].maintenanceCategory = '';
    this.evaluationDraftList[objIndex].maintenanceModel = {
      empId: 0,
      assessmentId: remark.assessmentId,
      remarkId: 0,
      remarks: '',
      documentName: '',
      documentContents: '',
      updatedby: this.user.userId,
      cloudFilePath: '',
      attachmentpath: '',
      fileName: '',
      isPreview: false,
      isCsvFile: false,
      isFileDeletable: false,
      url: ''
    };

    this.evaluationDraftList[objIndex].generalRemarkId = remark.generalRemarkId;
    this.evaluationDraftList[objIndex].general = remark.general;
    this.evaluationDraftList[objIndex].generalCategory = remark.generalCategory;
    this.evaluationDraftList[objIndex].generalModel = {
      empId: remark.empid,
      assessmentId: remark.assessmentId,
      remarkId: remark.generalRemarkId,
      remarks: remark.general,
      documentName: remark.generalDocumentName ? remark.generalDocumentName.substring(remark.generalDocumentName.lastIndexOf('/') + 1, remark.generalDocumentName.length) : '',
      documentContents: '',
      updatedby: this.user.userId,
      cloudFilePath: remark.generalCloudFilePath,
      attachmentpath: remark.generalDocumentName,
      isPreview: (remark.generalDocumentName !== '' ? true : false) || (remark.generalDocumentName !== '' ? true : false),
      fileName: remark.generalDocumentName ? remark.generalDocumentName.substring(remark.generalDocumentName.indexOf('$') + 1) : remark.generalDocumentName ? remark.generalCloudFilePath : '',
      isCsvFile: (remark.generalDocumentName !== '' && remark.generalDocumentName.substring(remark.generalDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
      isDeletableAttachment: remark.generalDocumentName !== '' ? true : false,
      isFileDeletable: false,
      url: ''
    };
    this.evaluationDraftList[objIndex].isEditable = true;
    this.evaluationDraftList[objIndex].isDeletable = true;
    this.evaluationDraftList[objIndex].itemUpdDateTime = new Date();
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 22-03-2022
   * Description : Get class by grade.
   */
  private getClassByGrade(grade: string): string {
    if (grade !== '') {
      return dashboardClass.find(c => grade.includes(c.grade)).bindClass;
    } else {
      return '';
    }
  }
}
