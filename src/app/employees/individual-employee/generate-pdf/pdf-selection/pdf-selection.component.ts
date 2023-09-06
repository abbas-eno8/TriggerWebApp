/**
@author : Mihir Patel
@class : PdfSelectionComponent
@description :PdfSelectionComponent is created for select spark/comment, enter comment and open preview modal popup
**/
import { Component, OnInit, ComponentRef, Output, EventEmitter, Input } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
// ---------------------------------------------------------------------------------------//
import { PdfViewComponent } from '../pdf-view/pdf-view.component';
import { GeneratePdfService } from '../generate-pdf-service/generate-pdf.service';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { yearList, AnnualReportDetail, EvaluationDetails, CommentDetails, SparkDetails, employeePermission, REVIEWYEAR, ByteArrayType } from '../generate-pdf.model';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ApiResponseStatus, Success_Title, Success_Type } from '../../../../core/magic-string/common.model';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { SignatureComponent } from '../../../../shared/components/signature/signature.component';
import { BlobToByteArrayService } from '../../../../shared/services/blob-to-byte-array/blob-to-byte-array.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'trigger-pdf-selection',
  templateUrl: './pdf-selection.component.html',
  styleUrls: ['./pdf-selection.component.scss']
})
export class PdfSelectionComponent implements OnInit {

  public signatureControl: FormControl;
  /** Preview Signature */
  public base64Signature: any;
  // userDetail is defined for store login user's detail
  public userDetail: any;
  // yearList is defined to bind year list
  public yearList: yearList[];
  // selectedYear defined to store selected year 
  public reportPeriod: string;
  // annualReportDetail defined for store details of annual report detail
  public annualReportDetail: AnnualReportDetail
  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;
  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;
  // Output cancel emitter for cancel overlay popup
  @Output() cancel: EventEmitter<boolean>;
  // Output update emitter for update value overlay popup
  @Output() update: EventEmitter<boolean>;
  // employeePermissionObj input with permission object
  @Input() employeePermissionObj: employeePermission;
  @Input() employeeObj: any;
  // isDetailApiCalled is defined for manage flag for api is called or not
  public isDetailApiCalled: boolean;
  // userRemark defined as ngModel for remark text area
  public userRemark: string;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  public isCheckAllSpark: boolean;
  public isCheckAllComment: boolean;

  public themeClass: string;
  public isSelectedDate: boolean;
  public minDate: Date;
  public maxDate: Date;

  constructor(
    private focusTrapFactory: FocusTrapFactory,
    public overlay: Overlay,
    private generatePdfService: GeneratePdfService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private datePipe: DatePipe,
    private globalEventsManager: GlobalEventsManager,
    private blobToByteArrayService: BlobToByteArrayService
  ) {
    this.signatureControl = new FormControl(null, [Validators.required])
    this.maxDate = new Date();
    this.isSelectedDate = false;
    // Get login user's detail and store in user detail object
    this.userDetail = this.globalResponseHandlerService.getUserData();
    this.cancel = new EventEmitter();
    this.update = new EventEmitter();
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
        this.themeClass = 'theme-dark'
      } else {
        this.isDarkTheme = false;
        this.themeClass = 'theme-default'
      }
    })
  }

  ngOnInit() {
    this.getYearList();
  }

  ngOnDestroy(): void {
    this.themeEmitter.unsubscribe();
  }

  public openSignatureModel(): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(SignatureComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);

    this.componentOverlayRef.instance.saveSignature.subscribe((signature) => {
      if (signature) {
        this.overlayRef.dispose();
        this.base64Signature = signature;
        this.signatureControl.patchValue(signature);
      }
    });

    this.componentOverlayRef.instance.cancelSignature.subscribe((status) => {
      this.overlayRef.dispose();
    });

  }

  public onSignatureUpload(event): void {
    this.blobToByteArrayService.convertFileToBase64(event.target.files[0]).subscribe((base64data) => {
      this.base64Signature = base64data;
      this.signatureControl.patchValue(base64data);
    });
  }

  public onSelectDate(reportDate): void {
    this.isCheckAllSpark = false;
    this.isCheckAllComment = false;
    const datePeriod = this.getSelectedDate(reportDate);
    this.getDetailByYear(datePeriod);
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 03-02-2020
   * Description : Create method for get year list.
   */
  getYearList(): void {
    this.isDetailApiCalled = false;
    this.loaderService.emitIsLoaderShown(true);
    this.generatePdfService.getYearList(this.employeePermissionObj.empId, this.userDetail.userId).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          this.yearList = response.data;
          const currentYearFirstAndLastDate = this.getCurrentYearFirstAndLastDate(new Date().getFullYear());
          this.getDetailByYear(currentYearFirstAndLastDate);
          this.reportPeriod = this.yearList[0].reviewYear;
        } else if (response.status = ApiResponseStatus.NotFound) {
          this.toasterService.pop(Success_Type, '', response.message);
          this.loaderService.emitIsLoaderShown(false);
          this.cancel.emit(true)
        } else {
          this.toasterService.pop(Success_Type, Success_Title, 'No action initiated for this team member.');
          this.loaderService.emitIsLoaderShown(false);
          this.cancel.emit(true)
        }
      })
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 03-02-2020
  * Description : Create method for chnage year and by selectng year get detail
  */
  annualReportChange(selectedYear) {
    this.isCheckAllSpark = false;
    this.isCheckAllComment = false;
    this.userRemark = null;
    this.base64Signature = null;
    this.signatureControl.setValue(null);
    this.reportPeriod = selectedYear;
    if (selectedYear === REVIEWYEAR.LastTwelveMonth) {
      this.isSelectedDate = false;
      const datePeriod = this.lastTwelveMonth();
      this.getDetailByYear(datePeriod);
    } else if (selectedYear === REVIEWYEAR.AllHistory) {
      this.isSelectedDate = false;
      const datePeriod = this.allHistory();
      this.getDetailByYear(datePeriod);
    } else if (selectedYear === REVIEWYEAR.SpecificDate) {
      this.isSelectedDate = true;
      this.minDate = new Date(this.employeeObj.joiningDate);
      this.annualReportDetail.commentDetails.forEach((item) => { item.checked = false });
      this.annualReportDetail.sparkDetails.forEach((item) => { item.checked = false });
    } else {
      this.isSelectedDate = false;
      const datePeriod = this.getCurrentYearFirstAndLastDate(+selectedYear);
      this.getDetailByYear(datePeriod);
    }
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 03-02-2020
   * Description : Create method for get detail by selected year
   */
  getDetailByYear(selectedYear) {
    this.loaderService.emitIsLoaderShown(true);
    this.generatePdfService.getAnnualReportDetail(selectedYear, this.employeePermissionObj.empId, this.userDetail.userId).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, true)) {
          let reportDetail = response.data;
          this.annualReportDetail = {
            employeeID: reportDetail.employeeID,
            EmpId: this.employeePermissionObj.empId,
            employeeFirstName: reportDetail.employeeFirstName,
            employeeLastName: reportDetail.employeeLastName,
            employeePosition: reportDetail.employeePosition,
            yearlyScoreRank: reportDetail.yearlyScoreRank,
            scoreSummary: reportDetail.scoreSummary ? reportDetail.scoreSummary : '',
            employeeRemarks: reportDetail.employeeRemarks ? reportDetail.employeeRemarks : '',
            loggedInUserName: this.userDetail.employee.firstName + ' ' + this.userDetail.employee.lastName,
            managerFirstName: this.userDetail.employee.firstName,
            managerLastName: this.userDetail.employee.lastName,
            YearId: selectedYear,
            evaluationDate: this.datePipe.transform(new Date(), 'MMM d, y'),
            CompanyLogo: this.userDetail.iconUrl,
            UserId: this.userDetail.userId,
            summaryReportingView: this.employeePermissionObj.summaryReportingView,
            sparkView: this.employeePermissionObj.sparkView,
            contextualReportingView: this.employeePermissionObj.contextualReportingView,
            evaluationDetails: reportDetail.evaluationDetails.length > 0 ? this.bindEvaluationDetails(reportDetail.evaluationDetails) : [],
            commentDetails: reportDetail.commentDetails.length > 0 ? this.bindCommentDetails(reportDetail.commentDetails) : null,
            sparkDetails: reportDetail.sparkDetails.length > 0 ? this.bindSparkDetails(reportDetail.sparkDetails) : null,
            sendMail: false,
            Remark: '',
            DocumentName: '',
            department: reportDetail.department,
            signature: this.base64Signature
          }
          this.isDetailApiCalled = true;
        }
      })
  }

  bindEvaluationDetails(evaluationData) {
    let evaluationDetails: EvaluationDetails[];
    evaluationDetails = evaluationData.map((values, index) => ({
      evaluationDate: this.datePipe.transform(values.evaluationDate, 'MM/dd/yyyy'),
      scoreRank: values.scoreRank,
      scoreSummary: values.scoreSummary,
      evaluator: values.evaluator
    }));
    return evaluationDetails;
  }

  bindCommentDetails(commentData) {
    let commentDetails: CommentDetails[];
    commentDetails = commentData.map((comment, index) => ({
      commentDateForView: comment.commentDate,
      // commentDate: this.datePipe.transform(comment.commentDate, 'MM/dd/yyyy'),
      commentDate:comment.commentDate,
      performance: comment.performance ? comment.performance : '',
      attitude: comment.attitude ? comment.attitude : '',
      maintenance: comment.maintenance ? comment.maintenance : '',
      generalRemarks: comment.generalRemarks,
      checked: false,
      isTriggerSent: comment.isTriggerSent === 1 ? true : false,
      commentBy: comment.commentBy,
      scoreSummary: comment.scoreSummary,
      isPerformanceCommentSend: comment.isPerformanceCommentSend,
      isAttitudeCommentSend: comment.isAttitudeCommentSend,
      isMaintenanceCommentSend: comment.isMaintenanceCommentSend,
      isGeneralRemarkSend: comment.isGeneralRemarkSend,
    }));
    return commentDetails;
  }

  bindSparkDetails(sparkData) {
    let sparkDetails: SparkDetails[];
    sparkDetails = sparkData.map((spark, index) => ({
      sparkDateForView: spark.sparkDate,
      sparkDate: this.datePipe.transform(spark.sparkDate, 'MM/dd/yyyy'),
      category: spark.category,
      classification: spark.classification,
      sparkRemarks: spark.sparkRemarks,
      checked: false,
      isSparkSent: spark.isSparkSent === 1 ? true : false,
      sparkBy: spark.sparkBy
    }));
    return sparkDetails;
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 03-02-2020
   * Description : Create method for check/uncheck comment from list
   */
  commentSelectionChange(item, index: number) {
    if (item.checked) {
      this.annualReportDetail.commentDetails[index].checked = true;
      this.isCheckAllComment = this.annualReportDetail.commentDetails.every((item) => item.checked);
    } else {
      this.annualReportDetail.commentDetails[index].checked = false;
      this.isCheckAllComment = false;
    }
  }

  /**
   * Author: Shahbaz Shaikh
   * Description : Check all the comment 
   * @param isAllComment 
   */
  allCommentSelection(isAllComment) {
    (isAllComment.checked) ?
      this.annualReportDetail.commentDetails.forEach((item) => { item.checked = true, this.isCheckAllComment = true })
      : this.annualReportDetail.commentDetails.forEach((item) => { item.checked = false, this.isCheckAllComment = false })
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 03-02-2020
  * Description : Create method for check/uncheck spark from list
  */
  sparkSelectionChange(item, index: number) {
    if (item.checked) {
      this.annualReportDetail.sparkDetails[index].checked = true;
      this.isCheckAllSpark = this.annualReportDetail.sparkDetails.every((item) => item.checked);
    } else {
      this.annualReportDetail.sparkDetails[index].checked = false;
      this.isCheckAllSpark = false;
    }
  }

  /**
   * Author: Shahbaz Shaikh
   * Description : Check all the spark 
   * @param isAllSpark 
   */
  allSparkSelection(isAllSpark) {
    (isAllSpark.checked) ?
      this.annualReportDetail.sparkDetails.forEach((item) => { this.isCheckAllSpark = true, item.checked = true })
      : this.annualReportDetail.sparkDetails.forEach((item) => { this.isCheckAllSpark = false, item.checked = false });
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 03-02-2020
   * Description : Create method for Open preview PDF modal popup
   */
  public openPDFView(): void {
    if (!!this.signatureControl.value) {
      let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
      let config = new OverlayConfig({
        panelClass: modalBackground,
        hasBackdrop: true,
        backdropClass: '',
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
      });

      this.overlayRef = this.overlay.create(config);
      this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(PdfViewComponent));
      this.focusTrapFactory.create(this.overlayRef.overlayElement);
      this.componentOverlayRef.instance.annualReportDetail = this.annualReportDetail;
      this.componentOverlayRef.instance.reportPeriod = this.reportPeriod;
      this.componentOverlayRef.instance.userRemark = !!this.userRemark ? this.userRemark.trim() : '';
      this.componentOverlayRef.instance.base64Signature = this.base64Signature;

      this.componentOverlayRef.instance.cancelPreview.subscribe(status => {
        this.overlayRef.dispose();
      });
    } else {
      this.globalResponseHandlerService.disaplyErrorMessage('Please sign the form');
    }
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 24-01-2020
  * Descriotion : Create method for emit value for close overlay modal popup.
  */
  cancelSelection(): void {
    this.cancel.emit(true)
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 24-01-2020
  * Descriotion : Create method for emit value for update value.
  */
  submitSelection(): void {
    this.update.emit(true)
  }

  private getCurrentYearFirstAndLastDate(getYear: any): any {
    let fromDate = this.datePipe.transform(new Date(getYear, 0, 1), 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(new Date(getYear, 11, 31), 'yyyy-MM-dd')
    return {
      fromDate,
      toDate
    }
  }

  private lastTwelveMonth(): any {
    let fromDate = this.datePipe.transform(new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1), 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), 'yyyy-MM-dd');
    return {
      fromDate,
      toDate
    }
  }

  private allHistory(): any {
    let fromDate = this.datePipe.transform(new Date(this.employeeObj.joiningDate), 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return {
      fromDate,
      toDate
    }
  }

  private getSelectedDate(reportDate): any {
    let fromDate = this.datePipe.transform(new Date(reportDate[0]), 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(new Date(reportDate[1]), 'yyyy-MM-dd');
    return {
      fromDate,
      toDate
    }
  }
}
function convertFileToBase64(arg0: any) {
  throw new Error('Function not implemented.');
}

function getBase64ImageFromURL() {
  throw new Error('Function not implemented.');
}

