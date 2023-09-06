import { Component, OnInit, Output, EventEmitter, Input, ComponentRef, ViewChild, ElementRef } from "@angular/core";
import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FocusTrapFactory } from "@angular/cdk/a11y";
import { ComponentPortal } from "@angular/cdk/portal";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { MatDialog } from "@angular/material";
import { ToasterService } from "angular2-toaster";
// ------------------------------------------------------- //
import { GlobalEventsManager } from "../../../core/navbar/globalEventsManager";
import { AttachFileUrlComponent } from "../attach-file-url/attach-file-url.component";
import { DeletePopupComponent } from "../delete-popup/delete-popup.component";
import { GlobalResponseHandlerService } from "../../../core/global-response-handler/global-response-handler";
import { Error_Title, Error_Type } from "../../../core/magic-string/common.model";


@Component({
  selector: 'trigger-publish-evaultion',
  templateUrl: './publish-evaultion.component.html',
  styleUrls: ['./publish-evaultion.component.scss']
})
export class PublishEvaultionComponent implements OnInit {

  @Input() public data: any;

  @Output() publish: EventEmitter<any>;
  @Output() save: EventEmitter<any>;
  @Output() cancel: EventEmitter<boolean>;

  @ViewChild('focusOnField', { static: false }) inputElement: ElementRef;

  public dynamicContent: SafeHtml;
  public formGroup: FormGroup;
  public isDeletePerformance: boolean;
  public PerformanceFileName: boolean;
  public isSendMail: boolean;
  public sendSpark: boolean;
  public isPerformanceCheckBox: boolean = true;
  public isAttitudeChecked: boolean = true;
  public isMaintenanceChecked: boolean = true;

  private performanceField = ['performanceDocumentName', 'performanceDocumentContents', 'performanceCloudFilePath', 'isDeletePerformance', 'performanceFileName'];
  private attitudeField = ['attitudeDocumentName', 'attitudeDocumentContents', 'attitudeCloudFilePath', 'isDeleteAttitude', 'attitudeFileName'];
  private maintenancField = ['maintenanceDocumentName', 'maintenanceDocumentContents', 'maintenanceCloudFilePath', 'isDeleteMaintenance', 'maintenanceFileName'];
  private generalFiled = ['generalDocumentName', 'generalDocumentContents', 'generalCloudFilePath', 'isDeleteGeneral', 'generalFileName'];

  private userData: any;
  private remark: any
  private isDarkTheme: boolean;
  private themeEmitter: any;
  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;
  private componentOverlayRef: ComponentRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private globalEventsManager: GlobalEventsManager,
    private overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory,
    private matDialog: MatDialog,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private toasterService: ToasterService
  ) {
    this.publish = new EventEmitter();
    this.save = new EventEmitter();
    this.cancel = new EventEmitter();
    this.userData = this.globalResponseHandlerService.getUserData();
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }

  ngOnInit() {
    this.dynamicContent = this.sanitizer.bypassSecurityTrustHtml(this.data.dynamicContent);
    this.isSendMail = this.data.isSendMail ? true : false;
    this.remark = this.data.formValue;
    this.isPerformanceCheckBox = !!this.remark.isPerformanceCommentSend;
    this.isAttitudeChecked = !!this.remark.isAttitudeCommentSend;
    this.isMaintenanceChecked = !!this.remark.isMaintenanceCommentSend;
    this.sendSpark = this.remark.sendSpark;
    this.bindForm(this.remark);
  }

  public performanceChecked(): boolean {
    let flag: boolean = this.isPerformanceCheckBox;
    if (flag && !!!this.formGroup.get('performance').value) {
      flag = false;
      this.isPerformanceCheckBox = false;
    }
    return flag;
  }

  public attitudeChecked(): boolean {
    let flag: boolean = this.isAttitudeChecked;
    if (flag && !!!this.formGroup.get('attitude').value) {
      flag = false;
      this.isAttitudeChecked = false;
    }
    return flag;
  }

  public maintenanceChecked(): boolean {
    let flag: boolean = this.isMaintenanceChecked;
    if (flag && !!!this.formGroup.get('maintenance').value) {
      flag = false;
      this.isMaintenanceChecked = false;
    }
    return flag;
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 10-03-2022
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
      this.setAttchment(attachedObject, modelName);
      this.overlayRef.dispose();
      this.inputElement.nativeElement.focus();
    });
  }

  /**
   * Author : Anjali Tandel
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
        this.resetAttchment(modelName);
        this.remark[modelName].isFileDeletable = false;
        this.inputElement.nativeElement.focus();
      }
    });
  }

  /** Don't Send Mail button */
  public onClickCancel(): void {
    this.cancel.emit(true);
  }

  /** Publish save draft assessment */
  public onPublish(): void {
    if (this.checkValidation()) {
      const formValue = this.formGroup.getRawValue();
      formValue.isTriggerSent = 1;
      this.publish.emit(formValue);
    } else {
      this.toasterService.pop(Error_Type, Error_Title, 'General comment required.')
    }
  }

  public onSave(): void {
    if (this.checkValidation()) {
      const formValue = this.formGroup.getRawValue();
      formValue.isTriggerSent = 0;
      this.save.emit(formValue);
    } else {
      this.toasterService.pop(Error_Type, Error_Title, 'General comment required.')
    }
  }

  private checkValidation(): boolean {
    if (this.formGroup.get('general').value.trim() === '') {
      return false;
    } else {
      return true;
    }
  }

  private setAttchment(attachedObject: any, modelName: string) {
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

  private resetAttchment(modelName: string): void {
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

  private setFormControl(formFieldArray, fileName: any = '', cloudUrl: any = '', attachedObject: any = ''): void {
    const formGroup = this.formGroup;
    formGroup.get(formFieldArray[0]).setValue(fileName ? fileName : '');
    formGroup.get(formFieldArray[1]).setValue(attachedObject ? attachedObject.attachFileContent : attachedObject.attachFileContent ? attachedObject.attachFileContent : '');
    formGroup.get(formFieldArray[2]).setValue(attachedObject.CloudFilePath ? attachedObject.CloudFilePath : '');
    formGroup.get(formFieldArray[3]).setValue(fileName ? true : cloudUrl ? true : false);
    formGroup.get(formFieldArray[4]).setValue(fileName ? fileName : cloudUrl ? cloudUrl : '');
  }

  /** Create Form */
  private bindForm(remark: any): void {
    this.formGroup = this.formBuilder.group({
      assessmentId: [remark.assessmentId],
      assessmentBy: [remark.assessmentById],
      assessmentDate: [remark.assessmentDate],
      empId: [remark.empId ? remark.empId : remark.empid ? remark.empid : 0],
      createdBy: [this.userData.userId],
      isTriggerSent: [remark.isTriggerSent],
      requestId: [0],

      performanceRemarkId: [remark.performanceRemarkId],
      performance: [remark.performance],
      performanceDocumentName: [remark.performanceModel.documentName],
      performanceDocumentContents: [remark.performanceModel.documentContents],
      performanceCloudFilePath: [remark.performanceModel.cloudFilePath],
      isDeletePerformance: [remark.performanceModel.isFileDeletable],
      performanceFileName: [remark.performanceModel.fileName],
      isPerformanceCommentSend: [remark.isPerformanceCommentSend ? true : false],

      attitudeRemarkId: [remark.attitudeRemarkId],
      attitude: [remark.attitude],
      attitudeDocumentName: [remark.attitudeModel.documentName],
      attitudeDocumentContents: [remark.attitudeModel.documentContents],
      attitudeCloudFilePath: [remark.attitudeModel.cloudFilePath],
      isDeleteAttitude: [remark.attitudeModel.isFileDeletable],
      attitudeFileName: [remark.attitudeModel.fileName],
      isAttitudeCommentSend: [remark.isAttitudeCommentSend ? true : false],

      maintenanceRemarkId: [remark.maintenanceRemarkId],
      maintenance: [remark.maintenance],
      maintenanceDocumentName: [remark.maintenanceModel.documentName],
      maintenanceDocumentContents: [remark.maintenanceModel.documentContents],
      maintenanceCloudFilePath: [remark.maintenanceModel.cloudFilePath],
      isDeleteMaintenance: [remark.maintenanceModel.isFileDeletable],
      maintenanceFileName: [remark.maintenanceModel.fileName],
      isMaintenanceCommentSend: [remark.isMaintenanceCommentSend ? true : false],

      generalRemarkId: [remark.generalRemarkId],
      general: [remark.general],
      generalDocumentName: [remark.generalModel.documentName],
      generalDocumentContents: [remark.generalModel.documentContents],
      generalCloudFilePath: [remark.generalModel.cloudFilePath],
      isDeleteGeneral: [remark.generalModel.isFileDeletable],
      generalFileName: [remark.generalModel.fileName],
      isGeneralRemarkSend: [remark.isGeneralRemarkSend ? true : false],

      commentUpdDateTime: []
    });
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }

}
