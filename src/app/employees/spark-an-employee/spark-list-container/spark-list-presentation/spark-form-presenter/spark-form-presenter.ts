import { Injectable, ComponentRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { SparkAnEmployee, fieldValidator, PopupPanelClass, Attachment, AddAttachment, ClassificationsCategories, AccoladeCategoryId } from '../../../spark-an-employee-model';
import { CustomFieldValidation } from '../../../../../shared/Validation/field-validation';
import { DeletePopupComponent } from '../../../../../shared/modal-popup/delete-popup/delete-popup.component';
import { LoaderService } from '../../../../../core/loader/loader.service';
import { SparkPreviewPresentation } from '../spark-preview-presentation/spark-preview-presentation';
import { DateTimeConverterService } from '../../../../../shared/services/date-time-converter/date-time-converter.service';
import { DateTimeFormate, UTCTimeFormate } from '../../../../../core/magic-string/common.model';
import { OverlayRef, OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AttachFileUrlComponent } from '../../../../../shared/modal-popup/attach-file-url/attach-file-url.component';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { Encryption } from '../../../../../core/magic-string/common-validation-model';
import { GlobalResponseHandlerService } from '../../../../../core/global-response-handler/global-response-handler';
import * as moment from 'moment';
import { CurrentSparkAnEmployee } from '../../../../employee-model';
import { GlobalEventsManager } from '../../../../../core/navbar/globalEventsManager';
@Injectable()
export class SparkFormPresenter {
  private destroy: Subject<void>;
  public sparkAnForm: FormGroup;
  public fileName: string;
  public filePath: string;
  public cloudUrl: string;
  public isAttachmentDeleted: boolean;
  public isCloudUrl: boolean = false;

  private deleteAttachment: Subject<SparkAnEmployee> = new Subject();
  deleteAttachment$: Observable<SparkAnEmployee> = this.deleteAttachment.asObservable();

  private deleteFile: Subject<boolean> = new Subject();
  deleteFile$: Observable<boolean> = this.deleteFile.asObservable();

  private addAttachmentEvent: Subject<AddAttachment> = new Subject();
  addAttachment$: Observable<AddAttachment> = this.addAttachmentEvent.asObservable();

  private confirmEvent: Subject<SparkAnEmployee> = new Subject();
  confirmEvent$: Observable<SparkAnEmployee> = this.confirmEvent.asObservable();

  private failedApi: Subject<boolean> = new Subject();
  failedApi$: Observable<boolean> = this.failedApi.asObservable();

  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;
  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private datePipe: DatePipe,
    private customFieldValidation: CustomFieldValidation,
    private dateTimeConverterService: DateTimeConverterService,
    private overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory,
    private globalEventsManager: GlobalEventsManager
  ) {
    this.destroy = new Subject();
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
        } else {
        this.isDarkTheme = false;
      }
    })
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Create recative form.
   */
  public createForm(): FormGroup {
    //let permission = this.globalResponseHandlerService.getSparkAnEmployee();
    return this.formBuilder.group({
      empId: [0],
      sparkId: [0],
      categoryId: [0, Validators.compose([Validators.required])],
      classificationId: [0, Validators.compose([Validators.required])],
      sparkBy: [0],
      sparkDate: [''],
      attachmentName: [''],
      attachmentPath: [''],
      cloudFilePath: [''],
      classification: [''],
      spark: [''],
      createdBy: [0],
      updatedBy: [0],
      sendSpark: {},
      sparkPrivacy: [0]
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Bind control value based on getting model value.
   */
  public bindControlValue(spark: SparkAnEmployee): FormGroup {
    this.sparkAnForm = this.createForm();
    spark.sendSpark = this.globalResponseHandlerService.getSparkAnEmployee().sendSpark;
    if (spark) {
      this.sparkAnForm.patchValue(spark);
    }
    return this.sparkAnForm;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Create function for bind error-class on dorpdown field.
   */
  public isDropdownValid(field: string, sparkAnFormForm: FormGroup): string {
    return this.customFieldValidation.isDropdownValid(field, this.sparkAnForm);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Create function bind error-class on input field.
   */
  //public saveSpark(spark: SparkAnEmployee, sparkAnFormForm: FormGroup): void {
  public saveSpark(spark: SparkAnEmployee): void {
    this.loaderService.emitIsLoaderShown(true);
    if (!this.checkValidationOnSubmit(this.sparkAnForm, spark) && this.sparkAnForm.valid) {
      let sparkModel = this.sparkAnForm.getRawValue();
      //  FOr Get UTC date
      let UtcDate = this.dateTimeConverterService.getUtcDateTime();
      //  datePipe.transform not working in Edge and IE browser, for that reason moment used
      let formateDate = moment(UtcDate).utc().format("MM-DD-YYYY HH:mm:ss")
      sparkModel.sparkDate = formateDate;
      // Commented code by Anjali - 12/11/2019
      if ((this.fileName && this.filePath) || this.isAttachmentDeleted) {
        sparkModel.attachmentName = this.fileName;
        sparkModel.attachmentPath = this.filePath;
        sparkModel.cloudFilePath = '';
      }
      if (this.cloudUrl && this.fileName === '' && this.filePath === '') {
        sparkModel.cloudFilePath = this.cloudUrl;
        sparkModel.attachmentName = '';
        sparkModel.attachmentPath = '';
      }
      if (this.cloudUrl === '' && this.fileName === '' && this.filePath === '') {
        sparkModel.cloudFilePath = '';
        sparkModel.attachmentName = '';
        sparkModel.attachmentPath = '';
      }
      this.confirmEvent.next(sparkModel);
    } else {
      this.loaderService.emitIsLoaderShown(false);
      this.failedApi.next(true)
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Check validation on click submit and throw error.
   */
  private checkValidationOnSubmit(sparkAnFormForm: FormGroup, spark): boolean {
    let returnData = this.customFieldValidation.checkValidation(sparkAnFormForm, spark, fieldValidator, false)
    return returnData.isDisplayError;
  }

  public getClassificationsCategories(): ClassificationsCategories {
    if (!!this.globalResponseHandlerService.decriptData(Encryption.SparkClassficationsCategories, Encryption.SparkClassficationsCategoriesKey)) {
      const ClassificationsCategories: ClassificationsCategories = JSON.parse(this.globalResponseHandlerService.decriptData(Encryption.SparkClassficationsCategories, Encryption.SparkClassficationsCategoriesKey));
      return ClassificationsCategories;
    }
  }


  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Open delete popup modal & catch conifrm event if user clicks on Yes button.
   */
  public deleteModal(): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
       data: Attachment 
      });
    dialogRef.componentInstance.confirm.subscribe((isConfirm) => {
      if (isConfirm) {
        this.resetFields();
        dialogRef.close();
        this.deleteFile.next(isConfirm);
        dialogRef.close();
      }
    });
  }

  public resetFields() {
    this.fileName = '';
    this.filePath = '';
    this.cloudUrl = '';
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Open preview-attachent popup modal & catch conifrm event if user deleted the opened attachment.
   */
  public previewModel(spark: SparkAnEmployee): void {
    if (!!spark.cloudFilePath) {
      window.open(spark.cloudFilePath, "_blank");
    } else {
      let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
      const dialogRef = this.matDialog.open(SparkPreviewPresentation, {
        data: spark,
        panelClass: [PopupPanelClass.extraLargeContainer, modalBackground],
        // panelClass: PopupPanelClass.extraLargeContainer,
        position: {
          top: '', bottom: '', left: '', right: ''
        }
      });
      dialogRef.componentInstance.confirm.subscribe((isdelteAttachment) => {
        if (isdelteAttachment) {
          this.isAttachmentDeleted = true;
          this.resetFields();
          let UtcDate = this.dateTimeConverterService.getUtcDateTime();
          let formateDate = this.datePipe.transform(UtcDate, DateTimeFormate, UTCTimeFormate);
          spark.sparkDate = formateDate;
          this.deleteAttachment.next(spark);
        }
        dialogRef.close();
      });
    }
  }

  private ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.themeEmitter.unsubscribe();
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 27-09-2019
   * Description : Create method for open attach file or enter cloud url modal popup.
   */
  public openCustomFileChooser(): void {
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
    if (this.isCloudUrl) {
      this.componentOverlayRef.instance.data = {
        cloudUrl: this.cloudUrl,
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
    });
    this.componentOverlayRef.instance.update.subscribe(attachedObject => {
      this.setAttachedFiles(attachedObject);
      this.overlayRef.dispose();
    });
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 30-09-2019
  * Description : Create method for set property as per attachment added from modal popup
  */
  setAttachedFiles(attachedObject) {
    this.fileName = attachedObject.attachFileName ? attachedObject.attachFileName : '';
    this.filePath = attachedObject.attachFileContent ? attachedObject.attachFileContent : '';
    this.cloudUrl = attachedObject.CloudFilePath ? attachedObject.CloudFilePath : '';
    let isCloudUrl = attachedObject.isCloudUrl;
    if (!!this.cloudUrl) {
      this.isCloudUrl = true;
    }
    let object = {
      fileName: this.fileName ? this.fileName : this.cloudUrl,
      filePath: this.filePath,
      isCloudUrl: isCloudUrl
    }
    this.addAttachmentEvent.next(object);
  };

  /**
    * Author : Mihir Patel
    * Created-Date : 30-09-2019
    * Description : Create method which returns file name and used to show filename.
    */
  getFileName(spark): string {
    let fileName: string = '';
    if (!!spark.attachmentName) {
      fileName = spark.attachmentName.substring(spark.attachmentName.indexOf('$') + 1);
    } else if (!!spark.cloudFilePath) {
      fileName = spark.cloudFilePath;
      this.isCloudUrl = true;
      this.cloudUrl = spark.cloudFilePath;
    } else {
      fileName = ''
    }
    return fileName;
  }

  public onChangeCategory(event, sparkAnForm: FormGroup): FormGroup {
    if (parseInt(event.target.value) === AccoladeCategoryId) {
      sparkAnForm.get('sparkPrivacy').setValue('1');
    } else {
      sparkAnForm.get('sparkPrivacy').setValue('0');
    }
    return sparkAnForm
  }

  public isCheckedPublicRadioButton(id: number, sparkAnForm: FormGroup): boolean {
    if (id === parseInt(sparkAnForm.value.sparkPrivacy)) {
      return true;
    } else {
      return false;
    }
  }

}