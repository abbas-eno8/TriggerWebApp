/**
@author : Anjali Tandel
@class : ExcelUploadComponent
@description :ExcelUploadComponent is created for import newly or mismatch data.
**/
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
// ................................................ //
import * as XLSX from 'xlsx';
import { MultiStepWizardComponent } from './multi-step-wizard/multi-step-wizard.component';
import { ExcelImportReadDataComponent } from './excel-import-read-data/excel-import-read-data.component';
import { ExcelMismatchComponent } from './excel-mismatch/excel-mismatch.component';
import { ExcelImportNewEmployeeComponent } from './excel-import-new-employee/excel-import-new-employee.component';
import { LoaderService } from '../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { Route, Error_Type, Error_Title, PopupPanelClass } from '../core/magic-string/common.model';
import { ContentModalComponent } from '../shared/modal-popup/content-modal/content-modal.component';
import { MatDialog } from '@angular/material';
import { ModalContent } from '../shared/modal-popup/content-modal/conten-modal-model';
import { ExcelUploadService } from './excel-upload-service/excel-upload.service';
import { Value, Class, Message, Inactive, Active, Excel, DB, ImportExcelUpload, DuplicatePhoneNumber, DuplicateEmployeeId, InvalidRecordFile, InvalidFileFormat, MismatchData, ImportReadData, ReviewEmployees, Header, MultiStepWizard, DiscardDateFormat, FileType, DiscardTimeFormat } from './excel-upload-model';
import { BodyOutputType, Toast, ToasterService } from 'angular2-toaster';
import { ErrorMessage } from '../core/magic-string/common-validation-model';
import { ExcelUploadPresenter } from './excel-upload-presenter/excel-upload.presenter';
import { ExcelUploadAdapter } from './excel-adapter/excel-adapter';
import { saveAs } from 'file-saver';
import { ExcelReviewEmployeesComponent } from './excel-review-employees/excel-review-employees.component';
import { ExcelUploadHeaderComponent } from './excel-upload-header/excel-upload-header.component';
import * as moment from 'moment';
import { GlobalEventsManager } from '../core/navbar/globalEventsManager';
@Component({
  selector: 'trigger-excel-upload',
  templateUrl: './excel-upload.component.html'
})
export class ExcelUploadComponent implements OnInit {
  componentRef: any;
  @ViewChild(MultiStepWizard, { read: ViewContainerRef, static: true }) private multiStepWizardEntry: ViewContainerRef;

  headerComponentRef: any;
  @ViewChild(Header, { read: ViewContainerRef, static: true }) private headerEntry: ViewContainerRef;

  reviewEmployeesDataComponentRef: any;
  @ViewChild(ReviewEmployees, { read: ViewContainerRef, static: true }) private reviewEmployeesDataEntry: ViewContainerRef;

  importReadDataComponentRef: any;
  @ViewChild(ImportReadData, { read: ViewContainerRef, static: true }) private importReadDataEntry: ViewContainerRef;

  mismatchDataComponentRef: any;
  @ViewChild(MismatchData, { read: ViewContainerRef, static: true }) private mismatchDataEntry: ViewContainerRef;

  private user: any;
  public isDisabledScreen: boolean = false;
  public isClickOnNext: boolean;
  public stepNumber: number = 1;
  public totalImportCount: number;
  public employeeDataFromExcelFile: any;
  public listOfNewInsertedData: ImportExcelUpload[];
  public listOfMismatchData: ImportExcelUpload[];
  public excelDbData: any;
  public mismatchCount: number;
  public newEmpCount: number;
  public rejectedCount: number;
  public invalidRecordString: string;
  public noRecordFound: string;
  public isHideImportAndReadComponent: boolean;
  public isImportedFile: boolean;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(
    private router: Router,
    private excelUploadService: ExcelUploadService,
    private loaderService: LoaderService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private presenter: ExcelUploadPresenter,
    private adapter: ExcelUploadAdapter,
    private globalEventsManager: GlobalEventsManager,
  ) {
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }
  ngOnInit() {
    this.user = this.globalResponseHandlerService.getUserData();
    if (this.user.departmentLength < 2) {
      this.isDisabledScreen = true;
      this.openDialog()
    } else {
      this.loaderService.emitIsLoaderShown(true);
      this.isDisabledScreen = false;
      this.clearData();
    }
    this.createHeaderComponent();
    this.createWizardComponent();
    this.createImportAndReadDataComponent();
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 09/12/2019
   * Descriotion : Create method for creating header component dynamically.
   */
  private createHeaderComponent(): void {
    this.headerEntry.clear();
    this.headerComponentRef = this.presenter.createComponent(ExcelUploadHeaderComponent, this.headerComponentRef, this.headerEntry);
    this.headerComponentRef.instance.stepNumber = this.stepNumber;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 09/12/2019
   * Descriotion : Create method for creating Wizard component dynamically.
   */
  private createWizardComponent(): void {
    this.multiStepWizardEntry.clear();
    this.componentRef = this.presenter.createComponent(MultiStepWizardComponent, this.componentRef, this.multiStepWizardEntry);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 09/12/2019
   * Descriotion : Create method for creating import & read data component dynamically.
   */
  private createImportAndReadDataComponent(): void {
    this.isHideImportAndReadComponent = false;
    this.importReadDataEntry.clear();
    this.importReadDataComponentRef = this.presenter.createComponent(ExcelImportReadDataComponent, this.importReadDataComponentRef, this.importReadDataEntry);
    this.importReadDataComponentRef.instance.onclickFileImport.subscribe(data => {
      this.onclickFileImport(data);
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 09/12/2019
   * Descriotion : Create method for creating review employees data component dynamically.
   */
  private createReviewEmployeesDataComponent(): void {
    this.reviewEmployeesDataEntry.clear();
    this.reviewEmployeesDataComponentRef = this.presenter.createComponent(ExcelReviewEmployeesComponent, this.reviewEmployeesDataComponentRef, this.reviewEmployeesDataEntry);
    this.reviewEmployeesDataComponentRef.instance.reviewMismatchData.subscribe(data => {
      this.reviewMismatchData();
    });
    this.reviewEmployeesDataComponentRef.instance.reviewNewEmployees.subscribe(step => {
      this.reviewNewEmployees();
    });
    this.reviewEmployeesDataComponentRef.instance.newEmpCount = this.newEmpCount;
    this.reviewEmployeesDataComponentRef.instance.newEmpValue = Value.ExcelReview;
    this.reviewEmployeesDataComponentRef.instance.newEmpClass = Class.ExcelIconStar;
    this.reviewEmployeesDataComponentRef.instance.mismatchCount = this.mismatchCount;
    this.reviewEmployeesDataComponentRef.instance.mismatchValue = Value.ExcelReview;
    this.reviewEmployeesDataComponentRef.instance.mismatchClass = Class.ExcelIconStar;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 09/12/2019
   * Descriotion : Create method for creating mismtach record screen component dynamically.
   */
  private createMismatchRecordScreen(component): void {
    this.mismatchDataEntry.clear();
    if (this.mismatchCount > 0) {
      this.mismatchDataComponentRef = this.presenter.createComponent(component, this.mismatchDataComponentRef, this.mismatchDataEntry);
      this.mismatchDataComponentRef.instance.excelDbData = this.excelDbData;
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 09/12/2019
   * Descriotion : Create method for creating new-record screen component dynamically.
   */
  private createNewRecordScreen(component): void {
    if (this.newEmpCount > 0) {
      this.mismatchDataEntry.clear();
      this.mismatchDataComponentRef = this.presenter.createComponent(component, this.mismatchDataComponentRef, this.mismatchDataEntry);
      this.mismatchDataComponentRef.instance.listOfNewInsertedData = this.listOfNewInsertedData;
      this.mismatchDataComponentRef.instance.isClickOnNext = this.isClickOnNext;
      this.mismatchDataComponentRef.instance.checkedMaster = false;
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : Reser all fields.
   */
  private clearData(): void {
    this.isImportedFile = true;
    this.invalidRecordString = '';
    this.rejectedCount = 0;
    this.totalImportCount = 0;
    this.newEmpCount = 0;
    this.mismatchCount = 0;
    this.listOfNewInsertedData = [];
    this.listOfMismatchData = [];
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 04-12-2019
   * Descriotion : Click event for read the data on import excel file.
   */
  private onclickFileImport(data): void {
    this.clearData();
    this.readExcelData(data);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : Function for read excel data.
   */
  private readExcelData(evt: any): void {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: FileType.Buffer, cellDates: true, cellStyles: true });
      let arrayBuffer = reader.result;
      var data = new Uint8Array(<ArrayBuffer>arrayBuffer);
      //let arr = new Array(); arr[i]
      for (var i = 0; i != data.length; ++i) new Array()[i] = String.fromCharCode(data[i]);
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.employeeDataFromExcelFile = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      let array = this.employeeDataFromExcelFile;
      let objArray = [];
      let templateClientId = array[1][33];
      if (parseInt(templateClientId) !== this.user.clientId) {
        this.globalResponseHandlerService.toastergetApiResponse(Message.ExcelInvalidData);
        this.loaderService.emitIsLoaderShown(false);
      } else {
        for (var row = 1; row < array.length; row++) {
          objArray[row - 1] = {};
          for (var keyValue = 0; array[row] && keyValue < 32; keyValue++) {
            let key = array[0][keyValue];
            if (key.includes(DiscardDateFormat)) {
              key = key.split(DiscardDateFormat)[0];
            }

            if (key.includes(DiscardTimeFormat)) {
              key = key.split(DiscardTimeFormat)[0];
            }
            if (array[row][keyValue]) {
              objArray[row - 1][key] = array[row][keyValue].trim();
            } else {
              objArray[row - 1][key] = '';
            }
          }
        }
        this.employeeDataFromExcelFile = [];
        objArray.forEach((obj, index) => {
          //let result = !Object.values(obj).every(o => o === '');
          //if (result) {
          let returnVaue = this.presenter.checkMandatoryFieldValidation(obj);
          if (returnVaue[0]) {
            this.employeeDataFromExcelFile.push(obj);
          } else {
            this.invalidRecordString += returnVaue[1];
            this.rejectedCount += 1;
          }
          //}
        });
        this.readExcelFile(this.employeeDataFromExcelFile);
      }
    }
    reader.readAsArrayBuffer(evt);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : Function for change wizard-step.
   */
  private changeStep(step: number): void {
    this.stepNumber = this.presenter.getWizardStep(step);
    this.headerComponentRef.instance.stepNumber = step;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : Review the newly and mismatch records and count.
   */
  public reviewNewEmployees(): void {
    if (this.stepNumber === 3) {
      this.clickOnStartImport();
    } else {
      this.reviewEmployeesDataComponentRef.instance.newEmpClass = Class.ExcelIconImport
      this.reviewEmployeesDataComponentRef.instance.mismatchClass = Class.ExcelIconResolved
      this.reviewEmployeesDataComponentRef.instance.newEmpValue = Value.ExcelStartImport;
      this.reviewEmployeesDataComponentRef.instance.mismatchValue = Value.ExcelResolve;
      this.loaderService.emitIsLoaderShown(false);
    }
    this.changeStep(3);
    this.createNewRecordScreen(ExcelImportNewEmployeeComponent);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : Skip the 3rd step.
   */
  public reviewMismatchData(): void {
    if (this.stepNumber === 4) {
      this.clickOnImportReplace();
    } else {
      this.loadMismatchRecordScreen();
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : Function for load mismatch records screen.
   */
  private loadMismatchRecordScreen(): void {
    this.reviewEmployeesDataComponentRef.instance.mismatchValue = Value.ExcelImportReplace;
    this.reviewEmployeesDataComponentRef.instance.mismatchClass = Class.ExcelIconImportReplace
    this.changeStep(4);
    this.createMismatchRecordScreen(ExcelMismatchComponent);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : Click to update data, event on 4th step.
   */
  private clickOnImportReplace(): void {
    let updateData = this.listOfMismatchData.filter(item => item.isChecked);
    if (this.presenter.checkImportDataLength(updateData)) {
      let updateExcelData = updateData.filter(x => x.recordType === Excel).map(x => x)
      if (updateExcelData.length > 0) {
        this.insert(updateExcelData, 5);
      } else {
        this.clickOnSkipReplace();
      }
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : Skip the 4th step.
   */
  private clickOnSkipReplace(): void {
    if (this.stepNumber === 3) {
      this.reviewMismatchData();
    } else {
      this.loaderService.emitIsLoaderShown(false);
      this.presenter.resetFileData(true);
      this.isHideImportAndReadComponent = false;
      this.changeStep(5);
      this.reviewEmployeesDataEntry.clear();
      this.mismatchDataEntry.clear();
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : Click to insert data, event on 3rd step.
   */
  private clickOnStartImport(): void {
    let insertData: ImportExcelUpload[] = this.listOfNewInsertedData.filter(item => item.isChecked);
    if (this.presenter.checkImportDataLength(insertData)) {
      this.insert(insertData, 4);
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : Redirect to step 4.
   */
  private nextToStep4(): void {
    this.isClickOnNext = true;
    this.mismatchDataComponentRef.instance.isClickOnNext = this.isClickOnNext;
    this.reviewEmployeesDataComponentRef.instance.newEmpValue = Value.ExcelDone;
    this.reviewEmployeesDataComponentRef.instance.mismatchValue = Value.ExcelResolve;
    this.reviewEmployeesDataComponentRef.instance.newEmpClass = Class.ExcelIconDone;
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 11-12-2018
  * Descriotion : Go to employee list.
  */
  private backToEmployee(): void {
    this.router.navigate([Route.Employee]);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : Call API for read data from Excel file.
   */
  private readExcelFile(object): void {
    this.loaderService.emitIsLoaderShown(true);
    let uniqRecords = this.presenter.getUniqueRecords(object, this.invalidRecordString);
    if (object.length > 0) {
      this.rejectedCount += uniqRecords.rejectedCount;
      this.invalidRecordString = uniqRecords.invalid;
    }
    if (uniqRecords.returnRecord.length > 0) {
      this.excelUploadService.readExcelFile(uniqRecords.returnRecord, this.user.clientId).subscribe(
        (response) => {
          if (this.globalResponseHandlerService.getApiResponse(response)) {
            if (response.data[0].lstExistPhoneCsvUpload && response.data[0].lstExistPhoneCsvUpload.length > 0) {
              this.rejectedCount += response.data[0].lstExistPhoneCsvUpload.length;
              this.invalidRecordString = this.presenter.bindInvalidRecords(this.invalidRecordString, object, response.data[0].lstExistPhoneCsvUpload, DuplicatePhoneNumber)
            }
            if (response.data[0].lstExistEmployeeIdCsvUpload && response.data[0].lstExistEmployeeIdCsvUpload.length > 0) {
              this.rejectedCount += response.data[0].lstExistEmployeeIdCsvUpload.length;
              this.invalidRecordString = this.presenter.bindInvalidRecords(this.invalidRecordString, object, response.data[0].lstExistEmployeeIdCsvUpload, DuplicateEmployeeId)
            }
            this.newEmpCount = response.data[0].newlyInserted;
            this.mismatchCount = response.data[0].mismatchRecord;
            if (response.data[0].lstNewCsvUpload.length > 0) {
              this.listOfNewInsertedData = this.adapter.importRecords(response.data[0].lstNewCsvUpload, this.user.userId, 0);
            }
            if (response.data[0].lstMisMatchCsvUpload.length > 0) {
              this.listOfMismatchData = this.adapter.importRecords(response.data[0].lstMisMatchCsvUpload, 0, this.user.userId);
              this.separateData(this.listOfMismatchData);
            }
            if (this.newEmpCount > 0 || this.mismatchCount > 0) {
              this.isHideImportAndReadComponent = true;
              this.isClickOnNext = false;
              this.changeStep(2);
              this.createReviewEmployeesDataComponent();
              this.isImportedFile = false;
            } else {
              this.downloadFile();
            }
          }
          else if (response.status === 404) {
            const toast: Toast = {
              type: Error_Type,
              title: Error_Title,
              body: ErrorMessage.InternalServerError,
              bodyOutputType: BodyOutputType.TrustedHtml,
            };
            this.toasterService.pop(toast)
          }
        }
      );
    } else {
      this.downloadFile();
      this.globalResponseHandlerService.toastergetApiResponse(Message.ExcelInvalidData);
      this.importReadDataComponentRef.instance.onclickReset = true;
      this.loaderService.emitIsLoaderShown(false);
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : Function for separating mismtach data (CSV-DB record).
   */
  private separateData(object): void {
    this.excelDbData = [];
    let dbRecords = object.filter(item => item.recordType === DB);
    let excelRecords = object.filter(item => item.recordType === Excel);
    for (var i = 0; i < dbRecords.length; i++) {
      let excelDb = [];
      excelDb = [excelRecords[i], dbRecords[i]];
      if (
        ((!excelRecords[i].empStatus && !dbRecords[i].empStatus)
          && ((excelRecords[i].roleId !== dbRecords[i].roleId || excelRecords[i].email !== dbRecords[i].email)
            || excelRecords[i].employeeId === ''))) {
        excelRecords[i].isHideCheckbox = true;
        dbRecords[i].isHideCheckbox = true;
      } else {
        excelRecords[i].isHideCheckbox = false;
        dbRecords[i].isHideCheckbox = false;
      }
      this.excelDbData.push(excelDb);
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-12-2018
   * Descriotion : API Method for insert and update selected data.
   */
  private insert(object, step): void {
    this.excelUploadService.import(object, this.user.clientId).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false)) {
          this.totalImportCount += object.length;
          if (step === 4) {
            this.nextToStep4();
            this.mismatchDataComponentRef.instance.listOfNewInsertedData = object;
          } else {
            this.clickOnSkipReplace();
          }
        }
      },
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 18-03-2019
   * Descriotion : Open static modal-popup when no department is found.
   */
  private openDialog(): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    this.matDialog.open(ContentModalComponent, {
      panelClass: [PopupPanelClass.lgContainer, modalBackground],
      // panelClass: PopupPanelClass.lgContainer,
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      },
      data: {
        value: ModalContent.ExcelUploadNoDepartmentFoundContent
      },
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 18-03-2019
   * Descriotion : Create method for download invalid file.
   */
  public downloadFile(): void {
    if (this.invalidRecordString != '') {
      saveAs(new Blob([this.invalidRecordString], { type: FileType.Text }), InvalidRecordFile + moment(new Date().toString(), InvalidFileFormat).format(InvalidFileFormat));
    }
  }
}
