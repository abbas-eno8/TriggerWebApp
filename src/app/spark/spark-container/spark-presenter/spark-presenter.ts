/**
 * @author Shahbaz Shaikh
 * @description SparkPresenter file
 */
import { ComponentRef, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { ToasterService } from 'angular2-toaster';
// ------------------------------------------------------ //
import { CustomFieldValidation } from '../../../shared/Validation/field-validation';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
import { AttachFileUrlComponent } from '../../../shared/modal-popup/attach-file-url/attach-file-url.component';
import { AccoladeCategoryId, AddAttachment, fieldValidator, GroupSparkAdditionalFilterType, SparkAnEmployee } from '../../spark.model';
import { DeletePopupComponent } from '../../../shared/modal-popup/delete-popup/delete-popup.component';
import { LoaderService } from '../../../core/loader/loader.service';
import { DateTimeConverterService } from '../../../shared/services/date-time-converter/date-time-converter.service';
import { MailContentComponent } from '../../../shared/modal-popup/mail-content/mail-content.component';
import { GroupSparkListPresentationComponent } from '../group-spark-list-presentation/group-spark-list-presentation.component';

import { TeamMembers } from '../../../employees/team-member/team-member-model'


@Injectable()
export class SparkPresenter {

  /** Public property */
  /** Store the attchment file name */
  public fileName: string;
  /** Store the attchment file path */
  public filePath: string;
  /** Store the cloud url */
  public cloudUrl: string;
  /** Wether check attchamet deleted or not */
  public isAttachmentDeleted: boolean;
  /** Wether check isCloudUrl or not */
  public isCloudUrl: boolean = false;
  /** Store observable for add attachment */
  public addAttachment$: Observable<AddAttachment>;
  /** Store observable for delete file */
  public deleteFile$: Observable<boolean>;
  /** Store observable for add spark */
  public save$: Observable<SparkAnEmployee>;
  /** Store observable for cancel */
  public cancel$: Observable<boolean>;
  /** Store observable for send mail */
  public sendMail$: Observable<boolean>;
  /** Store observable for don't sent mail */
  public cancelMail$: Observable<boolean>;
  /** Store property of theme emitter */
  public themeEmitter: any;
  public employeeIdList: any[];
  public newEmployeeList$: Observable<any>;
  public getTeamMember$: Observable<any>;
  private getTeamMember: Subject<any>;

  private newEmployeeList: Subject<any>;

  public teamMemberList$: Observable<any>;
  public teamMemberList: Subject<any>;
  public oldEmployee: any[];
  /** Private Property */
  /** Store the spark form group */
  private sparkForm: FormGroup;
  /** Check wether theme is dark mode or not */
  private isDarkTheme: boolean;
  /**  overlayRef is defined for overlay modal popup. */
  public overlayRef: OverlayRef;
  public employeeList: any[];
  /** componentOverlayRef is defined defined and used when create dynamic component. */
  private componentOverlayRef: ComponentRef<any>;
  /** Store the subject for add attachemtnt */
  private addAttachment: Subject<AddAttachment>;
  /** Store the subject for delete file */
  private deleteFile: Subject<boolean>;
  /** Store the subject for add spark */
  private save: Subject<SparkAnEmployee>;
  /** Store the subject for cancel */
  private cancel: Subject<boolean>;
  /** Store the subject for send mail*/
  private sendMail: Subject<boolean>;
  /** Store the subject for don't send mail*/
  private cancelMail: Subject<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private customFieldValidation: CustomFieldValidation,
    private globalEventsManager: GlobalEventsManager,
    private overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory,
    private matDialog: MatDialog,
    private loaderService: LoaderService,
    private dateTimeConverterService: DateTimeConverterService,
    private toasterService: ToasterService,
  ) {
    this.initProp();
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 14-09-2021
   * Description : Create form for spark
   */
  public createForm(): FormGroup {
    return this.formBuilder.group({
      empIds: [[], Validators.compose([Validators.required])],
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
      sendSpark: [true],
      sparkPrivacy: [0],
      dimensionId: [0],
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 15-09-2021
   * Description : Bind control value based on getting model value.
   * @param spark Get the spark details
   */
  public bindControlValue(spark: SparkAnEmployee): FormGroup {
    this.sparkForm = this.createForm();
    if (spark) {
      this.sparkForm.patchValue(spark);
    }
    return this.sparkForm;
  }

  /**
   * Author : Shahbaz Shaikh 
   * Created-Date : 21-09-2021
   * Description : Create function bind error-class on select-dropdown field.
   * @param field Get the field
   */
  public isSelectDropdownValid(field: string): string {
    return this.customFieldValidation.isSelectDropdownValid(field, this.sparkForm);
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 14-09-2021
   * Description : Create function for bind error-class on dorpdown field.
   * @param field Get the field
   * @param sparkAnFormForm Get the form group
   */
  public isDropdownValid(field: string, sparkAnFormForm: FormGroup): string {
    return this.customFieldValidation.isDropdownValid(field, sparkAnFormForm);
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Set the spark privacy as per select category
   * @param categoryId Get category id
   * @param sparkAnForm Get spark form
   * @returns 
   */
  public onChangeCategory(categoryId, sparkAnForm: FormGroup): FormGroup {
    if (categoryId === AccoladeCategoryId) {
      sparkAnForm.get('sparkPrivacy').setValue('1');
    } else {
      sparkAnForm.get('sparkPrivacy').setValue('0');
    }
    return sparkAnForm
  }


  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 15-09-2021
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
   * Author : Shahbaz Shaikh
   * Created-Date : 15-09-2021
   * Description : Create method for set property as per attachment added from modal popup
   * @param attachedObject Get the attachement
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
    this.addAttachment.next(object);
  };

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 11-06-2019
   * Description : Open delete popup modal & catch conifrm event if user clicks on Yes button.
   */
  public deleteModal(): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: 'attachment'
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

  /**
   * Author : Shahbaz Shaikh
   * Description: Rest the attachment value
   */
  public resetFields(): void {
    this.fileName = '';
    this.filePath = '';
    this.cloudUrl = '';
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Return is public spark or not
   * @param categoryId Get category id
   * @param sparkAnForm Get spark form
   * @returns 
   */
  public isCheckedPublicRadioButton(id: number, sparkAnForm: FormGroup): boolean {
    if (id === parseInt(sparkAnForm.value.sparkPrivacy)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Author :Shahbaz Shaikh
   * Description : Create function bind error-class on input field.
   */
  public saveSpark(spark: SparkAnEmployee): void {
    this.loaderService.emitIsLoaderShown(true);
    if (!this.checkValidationOnSubmit(this.sparkForm, spark) && this.sparkForm.valid) {
      let sparkModel = this.sparkForm.getRawValue();
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
      this.save.next(sparkModel);
    } else {
      this.loaderService.emitIsLoaderShown(false);
      this.cancel.next(true)
    }
  }

  public openGroupSparkModal(sparkFilterData: any, selectedDimension: GroupSparkAdditionalFilterType) {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
    // this.selectedArray = [];
    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(GroupSparkListPresentationComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    sparkFilterData = sparkFilterData.map((e) => {
      e.isChecked = false;
      return e
    });
    this.componentOverlayRef.instance.sparkFilterData = sparkFilterData;
    this.componentOverlayRef.instance.selectedDimension = selectedDimension;

    this.componentOverlayRef.instance.saveSpark.subscribe((res: any) => {
      const removeEmployee = res.filter((e: any) => e.isChecked === false);
      const selectEmployeeList = res.filter((e: any) => e.isChecked === true);
      if (this.oldEmployee.length) {
        this.oldEmployee = this.oldEmployee.concat(selectEmployeeList.filter(o1 => !this.sparkForm.get('empIds').value.some(o2 => o1.empId === o2)));
      } else {
        this.oldEmployee = this.oldEmployee.concat(res);
      }
      if (removeEmployee.length) {
        const newPatchValue = this.sparkForm.value.empIds.filter((o1) => !removeEmployee.some((o2) => o1 == o2.empId));
        this.oldEmployee = this.oldEmployee.filter((o1) => !removeEmployee.some((o2) => o1.empId == o2.empId));

        this.sparkForm.get('empIds').patchValue(newPatchValue);

      }
      const employeeIds: number[] = this.oldEmployee.map((e) => {
        return e.empId;
      });
      this.sparkForm.get('empIds').patchValue(employeeIds);
      // }
      this.employeeIdList = this.oldEmployee;
      this.newEmployeeList.next(this.oldEmployee);
      this.overlayRef.detach();
    });
    this.componentOverlayRef.instance.cancelSpark.subscribe(() => {
      const saveEmp = this.sparkForm.get('empIds').value;
      let result = this.employeeIdList.filter(o1 => saveEmp.some(o2 => o1.empId === o2));
      this.employeeIdList = result;
      this.overlayRef.detach();
    });
    this.componentOverlayRef.instance.getTeamMember.subscribe((res) => {
      this.getTeamMember.next(res);
    });
    this.componentOverlayRef.instance.employeeCheckBoxCheckList.subscribe((res) => {
      // this.employeeIdList = res;
      this.employeeIdList = this.employeeIdList.concat(res);

    });
  }

  /**
   * Author :Shahbaz Shaikh
   * Description: Open Mail Confirmation Modal box
   * @param content Get the email preview content
   */
  public openMailConfiramtion(content: string): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(MailContentComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.componentOverlayRef.instance.data = {
      dynamicContent: content
    };
    this.componentOverlayRef.instance.sendMail.subscribe((isSendMail) => {
      this.sendMail.next(true);
    });
    this.componentOverlayRef.instance.cancel.subscribe((isCancel) => {
      this.cancelMail.next(true);
      this.overlayRef.dispose();
      this.toasterService.pop('success', 'Success', 'Team Member sparked successfully.');
    });
    this.loaderService.emitIsLoaderShown(false);
  }

  public removeEmployee(employeeId) {
    const employeeObj = this.oldEmployee.filter((e) => e.employeeId !== employeeId);
    this.oldEmployee = employeeObj;
    this.employeeIdList = employeeObj;
    return employeeObj
  }

  public getDimensionData(sparkFilterData, selectedDimension) {
    let dimensionArray = [];
    // const selectedDimensionValue=selectedDimension.toLowerCase()
    dimensionArray = sparkFilterData[selectedDimension.toLowerCase()]; //[...this.surveyMasterData.teamList];


    return dimensionArray;
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Check validation on click submit and throw error.
   * @param sparkAnFormForm  Get the form group
   * @param spark Get the spark details
   */
  private checkValidationOnSubmit(sparkAnFormForm: FormGroup, spark): boolean {
    let returnData = this.customFieldValidation.isFromValid(sparkAnFormForm, spark, fieldValidator);
    return returnData;
  }

  /**
   * Get the team-memer list and set the fullname
   * @param teamMemberList Get the Team Member list
   * @returns 
   */
  public getCustomTeamMember(teamMemberList): TeamMembers[] {
    let teamMember = !!teamMemberList && teamMemberList.map((item) => {
      item.fullName = item.firstName + ' ' + item.lastName;
      item.selectAll = 'SELECT ALL';
      item.isChecked = false;
      this.employeeIdList.forEach(element => {
        if (element.empId === item.empId) {
          item.isChecked = element.isChecked;
        }
      });
      return item;
    });
    return teamMember;
  }

  /** Init prop */
  private initProp(): void {

    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    });
    this.addAttachment = new Subject();
    this.deleteFile = new Subject();
    this.save = new Subject();
    this.cancel = new Subject();
    this.sendMail = new Subject();
    this.cancelMail = new Subject();
    this.newEmployeeList = new Subject();
    this.getTeamMember = new Subject();
    this.teamMemberList = new Subject();
    this.employeeIdList = [];
    this.oldEmployee = [];
    this.addAttachment$ = this.addAttachment.asObservable();
    this.deleteFile$ = this.deleteFile.asObservable();
    this.save$ = this.save.asObservable();
    this.cancel$ = this.cancel.asObservable();
    this.sendMail$ = this.sendMail.asObservable();
    this.cancelMail$ = this.cancelMail.asObservable();
    this.newEmployeeList$ = this.newEmployeeList.asObservable();
    this.getTeamMember$ = this.getTeamMember.asObservable();
    this.teamMemberList$ = this.teamMemberList.asObservable();
    this.teamMemberList$.subscribe((res) => {
      res = Object.keys(res).length === 0 ? [] : res;
      const empIds = this.sparkForm.get('empIds').value;
      this.employeeIdList = empIds.map((element: any) => {
        return { ...element, empId: element, isChecked: true }
      });
      this.oldEmployee = empIds.length ? this.employeeIdList : []
      this.componentOverlayRef.instance.employeeList = this.getCustomTeamMember(res);
    });
  }
}
