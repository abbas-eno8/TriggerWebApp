/**
 * Author : Shahbaz Shaikh
 */
import { Component, OnInit, Inject, EventEmitter, ViewChild, ComponentRef, ElementRef, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OverlayConfig, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { saveAs } from 'file-saver';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// ------------------------------------------------------ //
import { LoaderService } from '../../../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { DeletePopupComponent } from '../../../shared/modal-popup/delete-popup/delete-popup.component';
import { AttachFileUrlComponent } from '../../../shared/modal-popup/attach-file-url/attach-file-url.component';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
import { EvaluationPreviewAttachmentComponent } from '../evaluation-preview-attachment/evaluation-preview-attachment.component';
import { DraftEvaulationService } from '../../service/draft-evaulation.service';
import { Error_Title, Error_Type } from '../../../core/magic-string/common.model';
import { AttitudeField, GeneralFiled, MaintenancField, PerformanceField } from '../../draft-evaluation.model';

@Component({
  selector: 'trigger-edit-evaluation',
  templateUrl: './edit-evaluation.component.html',
  styleUrls: ['./edit-evaluation.component.scss']
})
export class EditEvaluationComponent implements OnInit {

  /** Get the focusOnField element Ref */
  @ViewChild('focusOnField', { static: false }) inputElement: ElementRef;

  /** confirm event emitted for update remark model while remark updated/deleted */
  @Output() public confirm: EventEmitter<any>;

  // @ViewChild('dateTimeStamp', { read: DateTimeStampComponent })
  /** Public varibale */
  /** created field form */
  public remarksForm: FormGroup;
  /** created remark object for store curremt selected remark */
  public remark: any;
  /** fileName is created for store file name for updated and newly added attachment file name which is bind in HTMl */
  public fileName: string;
  /** isFileDeletable is created for show/hide delete icon locally on add attachment */
  public isFileDeletable: boolean;
  // componentOverlayRef is defined defined and used when create dynamic component.
  public isCloudUrl: boolean = false;
  public isLocalAttachment: boolean = false;
  public filePath: string = '';
  public cloudUrl: string = '';
  public isDarkTheme: boolean;
  public themeEmitter: any;

  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;
  private componentOverlayRef: ComponentRef<any>;
  private userData: any;
  private performanceField: string[];
  private attitudeField: string[];
  private maintenancField: string[];
  private generalFiled: string[];
  /** destroy  */
  private destroy: Subject<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditEvaluationComponent>,
    public overlay: Overlay,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private focusTrapFactory: FocusTrapFactory,
    private globalEventsManager: GlobalEventsManager,
    private draftEvaulationService: DraftEvaulationService,
    private toasterService: ToasterService
  ) {
    this.setProperty(data);
  }

  ngOnInit() {
    this.bindForm(this.remark);
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    this.themeEmitter.unsubscribe();
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 10-06-2019
   * Description : Preview icon click event, added condition for download file if file format is CSV.
   */
  public preview(modelName: string): void {
    if (!!this.remark[modelName].cloudFilePath) {
      let cloudUrl = this.remark[modelName].cloudFilePath;
      window.open(cloudUrl, "_blank");
    } else {
      if (!this.isFileDeletable) {
        const extension = this.remark[modelName].attachmentpath.substring(this.remark[modelName].attachmentpath.lastIndexOf('.') + 1);
        if (extension === 'csv') {
          this.httpClient.get(this.remark[modelName].attachmentpath, { responseType: 'text' }).subscribe(data => {
            let blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, this.remark[modelName].documentName.substring(this.remark[modelName].documentName.indexOf('$') + 1));
          });
        } else {
          this.previewAttachment(modelName)
        }
      }
    }

  }
  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 10-06-2019
   * Description : Open modal for preview attachment and handle click event for update current model.
   */
  public previewAttachment(modelName: string): void {
    const remarkObj: any = {
      remark: this.remark,
      modelName: modelName
    };
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
      this.fileName = '';
      this.remark = object;
      dialogRef.close();
      this.inputElement.nativeElement.focus();
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 10-06-2019
   * Description : Open modal for Delete-attachment and handle click event for update current model.
   */
  public deleteAttachment(modelName: string): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: 'Attachment'
    });
    dialogRef.componentInstance.confirm.subscribe((data) => {
      if (data) {
        dialogRef.close(true);
        this.resetModel(modelName);
        this.remark[modelName].isFileDeletable = false;
        this.inputElement.nativeElement.focus();
      }
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Create method for open attach file or enter cloud url modal popup.
   */
  public openCustomFileChooser(modelName: string): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(AttachFileUrlComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);

    if (!!this.remark[modelName].cloudFilePath) {
      this.componentOverlayRef.instance.data = {
        cloudUrl: this.remark[modelName].cloudFilePath,
        isEditMode: true
      };
    } else {
      this.componentOverlayRef.instance.data = {
        cloudUrl: '',
        isEditMode: false
      };
    }

    this.componentOverlayRef.instance.cancel.subscribe(status => {
      this.overlayRef.dispose();
      this.inputElement.nativeElement.focus();
    });
    this.componentOverlayRef.instance.update.subscribe(attachedObject => {
      this.setUrl(attachedObject, modelName)
      this.overlayRef.dispose();
      this.inputElement.nativeElement.focus();
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Call API for update remark.
   */
  public onSubmit(): void {
    if (this.checkValidation()) {
      let formData: any = this.remarksForm.getRawValue();
      this.loaderService.emitIsLoaderShown(true);
      this.draftEvaulationService.updateComment(formData).subscribe(
        (response) => {
          if (this.globalResponseHandlerService.getApiResponse(response)) {
            this.updateModel(response.data[0]);
            this.confirm.emit(this.remark);
          } else {
            this.cancel();
          }
        });
    } else {
      this.toasterService.pop(Error_Type, Error_Title, 'General comment required.')
    }
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Click event onclick close button of edit-remark modal-popup.
   */
  public cancel(): void {
    this.dialogRef.close(this.remark);
  }

  /** Private Method */
  /** Initializes default properties for the component */
  public setProperty(data): void {
    this.destroy = new Subject();
    this.confirm = new EventEmitter();
    this.performanceField = PerformanceField;
    this.attitudeField = AttitudeField;
    this.maintenancField = MaintenancField;
    this.generalFiled = GeneralFiled;
    this.userData = this.globalResponseHandlerService.getUserData();
    this.isFileDeletable = false;
    this.remark = data;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.pipe(takeUntil(this.destroy)).subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    });
  }
  /**
   * This method used for Check tha validation of general comment
   * @returns 
   */
  private checkValidation(): boolean {
    if (this.remarksForm.get('general').value.trim() === '') {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 10-03-2022
   * Description : Update model remarks-value which we updated locally.
     */
  private updateModel(response: any): void {
    this.remark.assessmentId = response.assessmentId;
    this.remark.assessmentDate = new Date(response.assessmentDate).toString();

    this.remark.performanceRemarkId = response.performanceRemarkId;
    this.remark.performance = response.performance;
    this.remark.performanceCategory = this.remark.performanceCategory;
    // Performance Model
    // this.remark.performanceModel.empId = this.remark.empid;
    // this.remark.performanceModel.assessmentId = this.remark.assessmentId;
    // this.remark.performanceModel.remarkId = this.remark.performanceRemarkId;
    this.remark.performanceModel.documentName = response.performanceDocumentName ? response.performanceDocumentName.substring(response.performanceDocumentName.lastIndexOf('/') + 1, response.performanceDocumentName.length) : '';
    this.remark.performanceModel.attachmentpath = response.performanceDocumentName;
    this.remark.performanceModel.cloudFilePath = response.performanceCloudFilePath;
    this.remark.performanceModel.remarks = response.performance;
    this.remark.performanceModel.updatedby = this.userData.userId;
    this.remark.performanceModel.isPreview = (response.performanceDocumentName ? true : false) || (response.performanceCloudFilePath ? true : false);
    this.remark.performanceModel.fileName = response.performanceDocumentName ? response.performanceDocumentName.substring(response.performanceDocumentName.indexOf('$') + 1) : response.performanceCloudFilePath ? response.performanceCloudFilePath : '';
    this.remark.performanceModel.isFileDeletable = response.performanceDocumentName ? true : response.performanceCloudFilePath ? true : false;

    this.remark.attitudeRemarkId = response.attitudeRemarkId;
    this.remark.attitude = response.attitude;
    this.remark.attitudeCategory = this.remark.attitudeCategory;
    // Attitude Model
    // this.remark.attitudeModel.empId = this.remark.empid;
    // this.remark.attitudeModel.assessmentId = this.remark.assessmentId;
    // this.remark.attitudeModel.remarkId = this.remark.attitudeRemarkId;
    this.remark.attitudeModel.documentName = response.attitudeDocumentName ? response.attitudeDocumentName.substring(response.attitudeDocumentName.lastIndexOf('/') + 1, response.attitudeDocumentName.length) : '';
    this.remark.attitudeModel.attachmentpath = response.attitudeDocumentName;
    this.remark.attitudeModel.cloudFilePath = response.attitudeCloudFilePath;
    this.remark.attitudeModel.remarks = response.attitude;
    this.remark.attitudeModel.updatedby = this.userData.userId;
    this.remark.attitudeModel.isPreview = (response.attitudeDocumentName ? true : false) || (response.attitudeCloudFilePath ? true : false);
    this.remark.attitudeModel.fileName = response.attitudeDocumentName ? response.attitudeDocumentName.substring(response.attitudeDocumentName.indexOf('$') + 1) : response.attitudeCloudFilePath ? response.attitudeCloudFilePath : '';
    this.remark.attitudeModel.isFileDeletable = response.attitudeDocumentName ? true : response.attitudeCloudFilePath ? true : false;

    this.remark.maintenanceRemarkId = response.maintenanceRemarkId;
    this.remark.maintenance = response.maintenance;
    this.remark.maintenanceCategory = this.remark.maintenanceCategory;
    // Maintenance Model
    // this.remark.maintenanceModel.empId = this.remark.empid;
    // this.remark.maintenanceModel.assessmentId = this.remark.assessmentId;
    // this.remark.maintenanceModel.remarkId = this.remark.maintenanceRemarkId;
    this.remark.maintenanceModel.documentName = response.maintenanceDocumentName ? response.maintenanceDocumentName.substring(response.maintenanceDocumentName.lastIndexOf('/') + 1, response.maintenanceDocumentName.length) : '';
    this.remark.maintenanceModel.attachmentpath = response.maintenanceDocumentName;
    this.remark.maintenanceModel.cloudFilePath = response.maintenanceCloudFilePath;
    this.remark.maintenanceModel.remarks = response.maintenance;
    this.remark.maintenanceModel.updatedby = this.userData.userId;
    this.remark.maintenanceModel.isPreview = (response.maintenanceDocumentName ? true : false) || (response.maintenanceCloudFilePath ? true : false);
    this.remark.maintenanceModel.fileName = response.maintenanceDocumentName ? response.maintenanceDocumentName.substring(response.maintenanceDocumentName.indexOf('$') + 1) : response.maintenanceCloudFilePath ? response.maintenanceCloudFilePath : '';
    this.remark.maintenanceModel.isFileDeletable = response.maintenanceDocumentName ? true : response.maintenanceCloudFilePath ? true : false;


    this.remark.generalRemarkId = response.generalRemarkId;
    this.remark.general = response.general;
    this.remark.generalCategory = this.remark.generalCategory;
    // General Model
    // this.remark.generalModel.empId = this.remark.empid;
    // this.remark.generalModel.assessmentId = this.remark.assessmentId;
    // this.remark.generalModel.remarkId = this.remark.generalRemarkId;
    this.remark.generalModel.documentName = response.generalDocumentName ? response.generalDocumentName.substring(response.generalDocumentName.lastIndexOf('/') + 1, response.generalDocumentName.length) : '';
    this.remark.generalModel.attachmentpath = response.generalDocumentName;
    this.remark.generalModel.cloudFilePath = response.generalCloudFilePath;
    this.remark.generalModel.remarks = response.general;
    this.remark.generalModel.updatedby = this.userData.userId;
    this.remark.generalModel.isPreview = (response.generalDocumentName ? true : false) || (response.generalCloudFilePath ? true : false);
    this.remark.generalModel.fileName = response.generalDocumentName ? response.generalDocumentName.substring(response.generalDocumentName.indexOf('$') + 1) : response.generalCloudFilePath ? response.generalCloudFilePath : '';
    this.remark.generalModel.isFileDeletable = response.generalDocumentName ? true : response.generalCloudFilePath ? true : false;
  }

  /**
   * THis method use for set the file control
   * @param attachedObject Get attchement object
   * @param modelName Get the model name
   */
  private setUrl(attachedObject: any, modelName: string) {
    let fileName = attachedObject.attachFileName ? attachedObject.attachFileName : '';
    let cloudUrl = attachedObject.CloudFilePath ? attachedObject.CloudFilePath : '';
    if (modelName === 'performanceModel') {
      this.setFormControl(this.performanceField, fileName, cloudUrl, attachedObject);
    }
    if (modelName === 'attitudeModel') {
      this.setFormControl(this.attitudeField, fileName, cloudUrl, attachedObject);
    }
    if (modelName === 'maintenanceModel') {
      this.setFormControl(this.maintenancField, fileName, cloudUrl, attachedObject);
    }
    if (modelName === 'generalModel') {
      this.setFormControl(this.generalFiled, fileName, cloudUrl, attachedObject);
    }
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Reset field - filename, documentName and documentContents.
   */
  private resetModel(modelName: string): void {
    if (modelName === 'performanceModel') {
      this.setFormControl(this.performanceField);
    }
    if (modelName === 'attitudeModel') {
      this.setFormControl(this.attitudeField);
    }
    if (modelName === 'maintenanceModel') {
      this.setFormControl(this.maintenancField);
    }
    if (modelName === 'generalModel') {
      this.setFormControl(this.generalFiled);
    }
  }

  /**
   * Set the form control based on form array
   * @param formFieldArray Get the array of form control
   * @param fileName get file name
   * @param cloudUrl get the file cloud file url
   * @param attachedObject get the attchment object
   */
  private setFormControl(formFieldArray, fileName: any = '', cloudUrl: any = '', attachedObject: any = ''): void {
    const formGroup = this.remarksForm;
    formGroup.get(formFieldArray[0]).setValue(fileName ? fileName : '');
    formGroup.get(formFieldArray[1]).setValue(attachedObject ? attachedObject.attachFileContent : attachedObject.attachFileContent ? attachedObject.attachFileContent : '');
    formGroup.get(formFieldArray[2]).setValue(attachedObject.CloudFilePath ? attachedObject.CloudFilePath : '');
    formGroup.get(formFieldArray[3]).setValue(fileName ? true : cloudUrl ? true : false);
    formGroup.get(formFieldArray[4]).setValue(fileName ? fileName : cloudUrl ? cloudUrl : '');
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Create form and bind in HTML.
   */
  private bindForm(remark: any): void {
    this.remarksForm = this.formBuilder.group({
      assessmentId: [remark.assessmentId],
      updatedby: [this.userData.userId],
      isTriggerSent: [remark.isTriggerSent],

      performanceRemarkId: [remark.performanceRemarkId],
      performance: [remark.performance],
      performanceDocumentName: [remark.performanceModel.documentName],
      performanceDocumentContents: [remark.performanceModel.documentContents],
      performanceCloudFilePath: [remark.performanceModel.cloudFilePath],
      isDeletePerformance: [remark.performanceModel.isFileDeletable],
      performanceFileName: [remark.performanceModel.fileName],
      isPerformanceCommentSend: [remark.isPerformanceCommentSend],

      attitudeRemarkId: [remark.attitudeRemarkId],
      attitude: [remark.attitude],
      attitudeDocumentName: [remark.attitudeModel.documentName],
      attitudeDocumentContents: [remark.attitudeModel.documentContents],
      attitudeCloudFilePath: [remark.attitudeModel.cloudFilePath],
      isDeleteAttitude: [remark.attitudeModel.isFileDeletable],
      attitudeFileName: [remark.attitudeModel.fileName],
      isAttitudeCommentSend: [remark.isAttitudeCommentSend],

      maintenanceRemarkId: [remark.maintenanceRemarkId],
      maintenance: [remark.maintenance],
      maintenanceDocumentName: [remark.maintenanceModel.documentName],
      maintenanceDocumentContents: [remark.maintenanceModel.documentContents],
      maintenanceCloudFilePath: [remark.maintenanceModel.cloudFilePath],
      isDeleteMaintenance: [remark.maintenanceModel.isFileDeletable],
      maintenanceFileName: [remark.maintenanceModel.fileName],
      isMaintenanceCommentSend: [remark.isMaintenanceCommentSend],

      generalRemarkId: [remark.generalRemarkId],
      general: [remark.general],
      generalDocumentName: [remark.generalModel.documentName],
      generalDocumentContents: [remark.generalModel.documentContents],
      generalCloudFilePath: [remark.generalModel.cloudFilePath],
      isDeleteGeneral: [remark.generalModel.isFileDeletable],
      generalFileName: [remark.generalModel.fileName],
      isGeneralRemarkSend: [remark.isGeneralRemarkSend],

      commentUpdDateTime: [new Date()]
    });
  }
}
