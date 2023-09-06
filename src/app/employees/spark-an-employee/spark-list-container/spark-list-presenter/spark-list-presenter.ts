import {
  Injectable, ComponentFactoryResolver, ViewChild,
  ViewContainerRef, Output, EventEmitter, ComponentRef
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { OverlayRef } from '@angular/cdk/overlay';
import { OverlayConfig } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject, Observable } from 'rxjs';
import { ToasterService } from 'angular2-toaster';
import { saveAs } from 'file-saver';
// ----------------------------------------------------------- //
import {
  CommonCssClass, DateTimeFormate, UTCTimeFormate, Success_Type, Success_Title
} from '../../../../core/magic-string/common.model';
import { SortByFieldService } from '../../../../shared/services/sort-by-field/sort-by-field.service';
import {
  PopupModal, PopupPanelClass, SparkAction, SparkAnEmployee, RequestModel, Category, Spark,
  CskOverlayPanel, ClassificationsCategories, SparkAddedSuccessfully, SparkReplyObject,
  bindSparkReplyForWidget, AddAttachment
} from '../../spark-an-employee-model';
import { DeletePopupComponent } from '../../../../shared/modal-popup/delete-popup/delete-popup.component';
import { SparkAnEmployeeAdapter } from '../../spark-an-employee-adapter/spark-an-employee-adapter';
import { CurrentSparkAnEmployee, MainDiv } from '../../../employee-model';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { Sort } from '../../../../shared/services/sort-by-field/sort';
import { SparkPreviewPresentation } from '../spark-list-presentation/spark-preview-presentation/spark-preview-presentation';
import { LoaderService } from '../../../../core/loader/loader.service';
import { DateTimeConverterService } from '../../../../shared/services/date-time-converter/date-time-converter.service';
import { SparkEditFormPresentaton } from '../spark-list-presentation/spark-edit-presentaton/spark-edit-form.presentaton';
import { NoRecordsFoundComponent } from '../../../../shared/no-records-found/no-records-found.component';
import { Encryption } from '../../../../core/magic-string/common-validation-model';
import { MailContentComponent } from '../../../../shared/modal-popup/mail-content/mail-content.component';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { AttachFileUrlComponent } from '../../../../shared/modal-popup/attach-file-url/attach-file-url.component';
import { PreviewFileComponent } from '../../../../shared/components/dashboard-components/preview-file/preview-file.component';

@Injectable()
export class SparkListPresenter {
  public sortModel: Sort<SparkAnEmployee[]>;
  public popupModel: PopupModal;
  private componentOverlayRef: ComponentRef<any>;
  public dialogRef: any;
  public overlayRef: OverlayRef;
  public fileName: string;
  public filePath: string;
  public cloudUrl: string;
  public isAttachmentDeleted: boolean;
  public isCloudUrl: boolean = false;
  public addAttachment$: Observable<AddAttachment>;
  public deleteFile$: Observable<number>;

  private addAttachment: Subject<AddAttachment>;
  private deleteFile: Subject<number>;

  private delete: Subject<SparkAnEmployee> = new Subject();
  delete$: Observable<SparkAnEmployee> = this.delete.asObservable();

  private add: Subject<RequestModel> = new Subject();
  add$: Observable<RequestModel> = this.add.asObservable();

  private deleteAttachment: Subject<RequestModel> = new Subject();
  deleteAttachment$: Observable<RequestModel> = this.deleteAttachment.asObservable();

  private bindRecords: Subject<SparkAnEmployee[]> = new Subject();
  bindRecords$: Observable<SparkAnEmployee[]> = this.bindRecords.asObservable();

  private createView: Subject<boolean> = new Subject();
  createView$: Observable<boolean> = this.createView.asObservable();

  private sendMail: Subject<boolean> = new Subject();
  sendMail$: Observable<boolean> = this.sendMail.asObservable();

  private loadSpark: Subject<boolean> = new Subject();
  loadSpark$: Observable<boolean> = this.loadSpark.asObservable();

  // For add reply : 
  private addReply: Subject<SparkReplyObject> = new Subject();
  addReply$: Observable<SparkReplyObject> = this.addReply.asObservable();

  public isDarkTheme: boolean;
  public themeEmitter: any;
  public isEmployeeDashboardRoute: boolean;
  public userData: any;

  constructor(
    private loaderService: LoaderService,
    public breakpointObserver: BreakpointObserver,
    private globalEventsManager: GlobalEventsManager,
    private resolver: ComponentFactoryResolver,
    private matDialog: MatDialog,
    public sortByFieldService: SortByFieldService,
    private adapter: SparkAnEmployeeAdapter,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private dateTimeConverterService: DateTimeConverterService,
    private datePipe: DatePipe,
    private overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory,
    private toasterService: ToasterService,
    private httpClient: HttpClient,
  ) {
    this.addAttachment = new Subject();
    this.deleteFile = new Subject();
    this.addAttachment$ = this.addAttachment.asObservable();
    this.deleteFile$ = this.deleteFile.asObservable();
    this.checkRoute();
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
    this.userData = this.globalResponseHandlerService.getUser();

  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Gllobal check response handler & throw Error/Success message.
   */
  public checkResponse(response: any): any[] {
    this.sortModel = new Sort<SparkAnEmployee[]>(1, '', '', []);
    if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
      return response.data;
    } else {
      return [];
    }
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  private checkRoute(): void {
    let currentRoute = sessionStorage.getItem(Encryption.EmpDashboardRoute)
    this.isEmployeeDashboardRoute = currentRoute === Encryption.EmpDashboard ? true : false;
  }
  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Check actions based on permission and userId.
   */
  public checkActions(sparks: SparkAnEmployee[]): SparkAnEmployee[] {
    let currentSparkAnEmployee: CurrentSparkAnEmployee = this.globalResponseHandlerService.getSparkAnEmployee();
    let userId: number = this.globalResponseHandlerService.getUser().userId;
    // This Condition remove the public spark so remove this
    // if (this.isEmployeeDashboardRoute) {
    //   //sparks = sparks.filter((s) => s.sparkPrivacy !== 1);
    //   sparks = sparks.filter((s) => (s.sparkPrivacy === 2 && !s.isSparkSent) || s.sparkPrivacy !== 1);
    // }
    sparks.forEach((spark) => {
      spark.isEnabledAction = (userId === spark.sparkBy && (currentSparkAnEmployee.isSparkEditable || currentSparkAnEmployee.isSparkDeletable))
        || spark.isPreviewFile ? true : false;
      spark.isEditable = userId === spark.sparkBy && currentSparkAnEmployee.isSparkEditable ? true : false;
      spark.isDeletable = userId === spark.sparkBy && currentSparkAnEmployee.isSparkDeletable ? true : false;
      //------ Code start for convert UTC time to Local time : ------//   
      spark.sparkDate = (this.dateTimeConverterService.getLocalDateTimeFromUtcDateTime(new Date(spark.sparkDate))).toString();
    });
    return sparks;
  }

  public checkClassficationsCategories(): boolean {
    if (!!this.globalResponseHandlerService.decriptData(Encryption.SparkClassficationsCategories, Encryption.SparkClassficationsCategoriesKey)) {
      const ClassificationsCategories: ClassificationsCategories = JSON.parse(this.globalResponseHandlerService.decriptData(Encryption.SparkClassficationsCategories, Encryption.SparkClassficationsCategoriesKey));
      if (ClassificationsCategories) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Get current spark-an-employee information.
   */
  public getSparkAnEmployee(): CurrentSparkAnEmployee {
    return this.globalResponseHandlerService.getSparkAnEmployee();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Created event for scroll top automatically.
   */
  public scrollTop(): void {
    const mainDiv = document.getElementById(MainDiv);
    if (mainDiv) { mainDiv.scrollTop = 0; }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Create list view dynmically (Desktop-view/Accrordian).
   */
  public createListViewPage(list, componentRef, entry, component): any {
    //------- Code End for convert UTC time to Local time : -------//
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.instance.sparks = list;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  public createComponent(componentRef, entry, component): any {
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.instance.confirm.subscribe(spark => {
      this.add.next(spark);
    });
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Create No-records found view dynmically.
   */
  public createNoRecordsFoundPage(componentRef, entry: ViewContainerRef): any {
    let factory = this.resolver.resolveComponentFactory(NoRecordsFoundComponent);
    componentRef = entry.createComponent(factory);
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Open add-modal-popup window.
   */
  public addModal(): void {
    let addModel: PopupModal = new PopupModal(SparkEditFormPresentaton,
      PopupPanelClass.lgContainer, null, SparkAction.add);
    this.dialogRef = this.sparkWindow(addModel);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Open edit-modal-popup window.
   */
  public editModal(spark: SparkAnEmployee): void {
    let editModel: PopupModal = new PopupModal(SparkEditFormPresentaton,
      PopupPanelClass.lgContainer, spark, SparkAction.edit);
    this.dialogRef = this.sparkWindow(editModel, spark);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Open spark-form-modal-popup window.
   */
  sparkWindow(popupModel: PopupModal, spark?: SparkAnEmployee): any {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    this.dialogRef = this.matDialog.open(popupModel.component, {
      panelClass: [popupModel.panelClass, modalBackground],
      // panelClass: popupModel.panelClass,
      data: popupModel.object ? popupModel.object : '',
      position: { top: '', bottom: '', left: '', right: '' }
    });
    this.dialogRef.componentInstance.confirm.subscribe((object) => {
      let obj = this.adapter.toRequest(object);
      this.add.next(obj);
    });

    this.dialogRef.componentInstance.deleteFile.subscribe((confirm) => {
      if (confirm) {
        let obj = this.adapter.toRequest(spark);
        obj.updatedBy = this.globalResponseHandlerService.getUser().userId;
        this.deleteAttachment.next(obj)
      }
    });
    return this.dialogRef;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Open delete-modal-popup window.
   */
  public deleteModal(attribute: string, spark: SparkAnEmployee): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: attribute
    });
    dialogRef.componentInstance.confirm.subscribe((isConfirm) => {
      if (isConfirm) {
        this.loaderService.emitIsLoaderShown(true);
        this.delete.next(spark);
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Open preview-attachment-modal-popup window.
   */
  public previewModal(spark: SparkAnEmployee): void {
    if (!!spark.cloudFilePath) {
      window.open(spark.cloudFilePath, "_blank");
    } else {
      let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
      this.dialogRef = this.matDialog.open(SparkPreviewPresentation, {
        data: spark,
        panelClass: [PopupPanelClass.extraLargeContainer, modalBackground],
        // panelClass: PopupPanelClass.extraLargeContainer,
        position: {
          top: '', bottom: '', left: '', right: ''
        }
      });
      this.dialogRef.componentInstance.confirm.subscribe((isdelteAttachment) => {
        if (isdelteAttachment) {
          let obj = this.adapter.toRequest(spark);
          let UtcDate = this.dateTimeConverterService.getUtcDateTime();
          let formateDate = this.datePipe.transform(UtcDate, DateTimeFormate, UTCTimeFormate);
          obj.sparkDate = formateDate;
          obj.updatedBy = this.globalResponseHandlerService.getUser().userId;
          this.deleteAttachment.next(obj)
          this.dialogRef.close();
        }
      });
    }

  }
  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Bind data-source.
   */
  public onClickPaginationPanel(): void {
    var parentElement = document.getElementsByClassName(CskOverlayPanel)[0];
    if (parentElement) { parentElement.classList.add(CommonCssClass.PaginationDropdownPosition); }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Sort lists based on passing list & sorted-field & return sorted list.
   */
  public sort(property: string, sparks: SparkAnEmployee[]): SparkAnEmployee[] {
    this.sortModel.sortedPropety = property;
    this.sortModel.list = sparks;
    this.sortModel = this.sortByFieldService.sort(this.sortModel);
    return this.sortModel.list;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Get sorted direction icon.
   */
  public getDirecionIcon(property: string): string {
    return this.sortByFieldService.getDirecionIcon(property, this.sortModel);
  }

  public filterRecords(sparks: SparkAnEmployee[]): void {
    this.bindRecords.next(sparks);
  }

  public createDynamicView(sparks: SparkAnEmployee[], isViewCreated: boolean): boolean {
    if (isViewCreated && sparks.length > 0) {
      return false;
    } else if (!isViewCreated && sparks.length === 0) {
      return false;
    } else {
      this.createView.next(true);
    }
  }

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
    this.componentOverlayRef.instance.sendMail.subscribe(isSendMail => {
      this.sendMail.next(true);
      // this.loadSpark.next(true)
    });
    this.componentOverlayRef.instance.cancel.subscribe(isCancel => {
      this.loadSpark.next(true)
      //this.overlayRef.dispose();
      this.globalEventsManager.closeModal(true);
      this.toasterService.pop(Success_Type, Success_Title, SparkAddedSuccessfully);
    });
    this.loaderService.emitIsLoaderShown(false);
    this.globalEventsManager.getEmailTemplate('');
  }

  public onEnterReply(event: any, sparkId: number, spark: any): boolean {
    if (((event && event.target.value) || spark.reply !== '')|| spark.sparkReplyDocumentName || spark.sparkReplyCloudFilePath) {
      let replyObject: SparkReplyObject;
      let todayDate = this.datePipe.transform(new Date(), 'MM-dd-yyyy hh:mm:ss a');
      replyObject = {
        replyBy: this.userData.empId,
        sparkId: sparkId,
        reply: !!spark.reply ? spark.reply.trim() : '',
        replyDate: todayDate,
        createdBy: this.userData.userId,
        documentName: spark.sparkReplyDocumentName,
        documentContents: spark.sparkReplyDocumentContents,
        cloudFilePath: spark.sparkReplyCloudFilePath
      }
      this.addReply.next(replyObject);
      return true;
    } else {
      this.loaderService.emitIsLoaderShown(false);
      //this.toasterService.pop(Error_Type, Error_Title, 'Please Enter text.');
      return false;
    }
  }

  updateReplyOnAdd(spark, reply) {
    this.isCloudUrl = false;
    let addReplyObj = this.adapter.bindSparkPeply(reply);
    // let addObject = new bindSparkReplyForWidget(
    //   reply.id,
    //   reply.replyBy,
    //   reply.sparkId,
    //   reply.reply,
    //   reply.replyDate,
    //   reply.replyByFirstName,
    //   reply.replyByLastName,
    //   reply.replyByImgPath,
    //   reply.documentName,
    //   reply.documentContents,
    //   reply.cloudFilePath,
    //   );

    spark.sparkReplys.push(addReplyObj);
    spark.reply = '';
    spark.sparkReplyDocumentName = '';
    spark.sparkReplyDocumentContents = '';
    spark.sparkReplyCloudFilePath = '';
    spark.sparkReplyFileName = '';
    spark.replyCount += 1;

    return spark;
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 15-09-2021
   * Description : Create method for open attach file or enter cloud url modal popup.
   */
  public openCustomFileChooser(sparkId: number): void {
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
    this.componentOverlayRef.instance.cancel.subscribe((status) => {
      this.overlayRef.dispose();
    });
    this.componentOverlayRef.instance.update.subscribe((attachedObject) => {
      this.setAttachedFiles(attachedObject, sparkId);
      this.overlayRef.dispose();
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 10-05-2022
   * Description : Create method for set property as per attachment added from modal popup
   */
  private setAttachedFiles(attachedObject, sparkId) {
    this.fileName = attachedObject.attachFileName ? attachedObject.attachFileName : '';
    this.filePath = attachedObject.attachFileContent ? attachedObject.attachFileContent : '';
    this.cloudUrl = attachedObject.CloudFilePath ? attachedObject.CloudFilePath : '';
    let isCloudUrl = attachedObject.isCloudUrl;
    if (!!this.cloudUrl) {
      this.isCloudUrl = true;
    }
    let object = {
      sparkId: sparkId,
      fileName: this.fileName ? this.fileName : this.cloudUrl,
      filePath: this.filePath,
      isCloudUrl: isCloudUrl
    }
    this.addAttachment.next(object);
  };

  /**
    * Author : Shahbaz Shaikh
    * Modified-Date : 10-05-2022
    * Description : Open delete popup modal & catch conifrm event if user clicks on Yes button.
    */
  public deleteAttachedFiles(sparkId: number): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: 'attachment'
    });
    dialogRef.componentInstance.confirm.subscribe((isConfirm) => {
      if (isConfirm) {
        this.resetFields();
        dialogRef.close();
        this.deleteFile.next(sparkId);
        dialogRef.close();
      }
    });
  }

  private resetFields(): void {
    this.fileName = '';
    this.filePath = '';
    this.cloudUrl = '';
  }

  public previewAttachment(reply: bindSparkReplyForWidget): void {
    const extension = reply.path.substring(reply.path.lastIndexOf('.') + 1);
    if (!!reply.cloudFilePath) {
      let cloudUrl = reply.cloudFilePath;
      window.open(cloudUrl, "_blank");
    } else {
      if (extension === 'csv') {
        this.httpClient.get(reply.path, { responseType: 'text' }).subscribe(data => {
          let blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, reply.documentName.substring(reply.documentName.indexOf('$') + 1));
        });
      } else {
        this.previewAttachments(reply)
      }
    }
  }

  private previewAttachments(reply): void {
    const replyObj: any = { remark: reply, isSpark: true };
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    this.matDialog.open(PreviewFileComponent, {
      data: replyObj,
      panelClass: ['xl-dialog-container', modalBackground],
      // panelClass: 'xl-dialog-container',
      position: {
        top: '', bottom: '', left: '', right: ''
      }
    });
  }
}