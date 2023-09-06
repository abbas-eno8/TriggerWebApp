
/**
@author : Mihir Patel
@class : PdfViewComponent
@description :PdfViewComponent is created for Preview PDF in modal popup and export and send mail to selected user.
**/
import { Component, ViewChild, ElementRef, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
// ---------------------------------------------------------------------------------------------------//
import { AnnualReportDetail, CommentDetails, SparkDetails, ByteArrayType, TruvelopFilePath, AnnualReport, DateFormat, Export, REVIEWYEAR } from '../generate-pdf.model';
import { LoaderService } from '../../../../core/loader/loader.service';
import { GeneratePdfService } from '../generate-pdf-service/generate-pdf.service';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { BlobToByteArrayService } from '../../../../shared/services/blob-to-byte-array/blob-to-byte-array.service';
import { ToasterService } from 'angular2-toaster';
import { Success_Type, Success_Title } from '../../../../core/magic-string/common.model';
import { Image } from '../../../../core/magic-string/common-validation-model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'trigger-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnInit {
  /** Get the signature */
  @Input() public base64Signature: any
  // Get the report Period
  @Input() reportPeriod: any;
  // annualReportDetail contatin detail of selected year
  @Input() annualReportDetail: any;
  @Input() userRemark: string;
  // Output cancel emitter for cancel overlay popup
  @Output() cancelPreview: EventEmitter<boolean>;
  //  pdfTable defined ElementRef
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  // isShowCommentSection is defined for manage flag for show/hide comment section
  public isShowCommentSection: boolean = false;
  // isShowSparkSection is defined for manage flag for show/hide spark section
  public isShowSparkSection: boolean = false;
  // companyLogoPathByteArray is defined for store value of byte array of company logo
  public companyLogoPathByteArray: any;
  // truvelopByteArray is defined for store value of byte array of company truvelop logo
  public truvelopByteArray: any;

  public rangeTitle: string;
  private reportDuration: string;

  constructor(
    private loaderService: LoaderService,
    private generatePdfService: GeneratePdfService,
    private datePipe: DatePipe,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private blobToByteArrayService: BlobToByteArrayService,
    public sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this.cancelPreview = new EventEmitter();
  }

  ngOnInit() {
    this.showHideSparkCommentSection(this.annualReportDetail);
    if (!!this.annualReportDetail.CompanyLogo) {
      this.blobToByteArrayService.getBase64ImageFromURL(this.annualReportDetail.CompanyLogo).subscribe(base64data => {
        let contentCompanyLogo = ByteArrayType + base64data;
        this.companyLogoPathByteArray = contentCompanyLogo;
      });
    } else {
      this.blobToByteArrayService.getBase64ImageFromURL(Image.ClientLogo).subscribe(base64data => {
        let contentCompanyLogo = ByteArrayType + base64data;
        this.companyLogoPathByteArray = contentCompanyLogo;
      });
    }
    this.getTruveopBtyeArray();
    if (this.reportPeriod === REVIEWYEAR.AllHistory || this.reportPeriod === REVIEWYEAR.SpecificDate) {
      const reportDate = this.reportDateFormat(this.annualReportDetail.YearId);
      this.rangeTitle = 'Annual Report From ' + reportDate.fromDate
        + ' To ' + reportDate.toDate;
      this.reportDuration = 'from <strong>' + reportDate.fromDate + '</strong> to <strong>' + reportDate.toDate + '</strong>';
    }
    else {
      this.rangeTitle = 'Annual Report For: ' + this.reportPeriod;
      this.reportDuration = 'for the <strong>' + this.reportPeriod + '</strong>';
    }
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 03-02-2020
   * Description : Create method for get Truvelop logo as Byte Array
   */
  getTruveopBtyeArray() {
    this.blobToByteArrayService.getBase64ImageFromURL(TruvelopFilePath).subscribe(base64data => {
      let content = ByteArrayType + base64data;
      this.truvelopByteArray = this.sanitizer.bypassSecurityTrustResourceUrl(content);
    });
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 03-02-2020
  * Description : Create method for Show/hide spark and comment section as per status of Check/Uncheck
  */
  private showHideSparkCommentSection(annualReportDetail) {
    if (!!annualReportDetail.commentDetails) {
      let commentArray: CommentDetails[];
      commentArray = annualReportDetail.commentDetails.find(a => a.checked === true) ? annualReportDetail.commentDetails.find(a => a.checked === true) : null;
      this.isShowCommentSection = !!commentArray ? true : false;
    } else {
      this.isShowCommentSection = false;
    }

    if (!!annualReportDetail.sparkDetails) {
      let sparkArray: SparkDetails[];
      sparkArray = annualReportDetail.sparkDetails.find(a => a.checked === true) ? annualReportDetail.sparkDetails.find(a => a.checked === true) : null;
      this.isShowSparkSection = !!sparkArray ? true : false;
    } else {
      this.isShowSparkSection = false;
    }

  }

  /**
  * Author : Mihir Patel
  * Created-Date : 03-02-2020
  * Description : Create method for Export PDF and send mail as PDF
  */
  exportSendMailPdf(type: string) {
    this.loaderService.emitIsLoaderShown(true);
    let sendMail: boolean;
    if (type === Export) {
      sendMail = false;
    } else {
      sendMail = true;
    }
    let commentList = []
    if (this.annualReportDetail.commentDetails && this.annualReportDetail.commentDetails.length > 0) {
      this.annualReportDetail.commentDetails.forEach(obj => {
        if (obj.checked) {
          obj.isTriggerSent = obj.isTriggerSent ? 1 : 0
          commentList.push(obj);
        }
      })
    }

    let sparkList = []
    if (this.annualReportDetail.sparkDetails && this.annualReportDetail.sparkDetails.length > 0) {
      this.annualReportDetail.sparkDetails.forEach(spark => {
        if (spark.checked) {
          spark.isSparkSent = spark.isSparkSent ? 1 : 0
          sparkList.push(spark);
        }
      })
    }
    let removeDataBase64 = this.base64Signature;
    if (this.base64Signature) {
      removeDataBase64 = this.blobToByteArrayService.removePrefixDataImage(removeDataBase64);
    }
    let docName = AnnualReport + this.annualReportDetail.employeeID + '_' + this.datePipe.transform(new Date(), DateFormat) + '.pdf';
    let pdfGeneratBody: AnnualReportDetail;
    pdfGeneratBody = {
      employeeID: this.annualReportDetail.employeeID,
      EmpId: this.annualReportDetail.EmpId,
      employeeFirstName: this.annualReportDetail.employeeFirstName,
      employeeLastName: this.annualReportDetail.employeeLastName,
      employeePosition: this.annualReportDetail.employeePosition,
      yearlyScoreRank: this.annualReportDetail.yearlyScoreRank,
      scoreSummary: this.annualReportDetail.scoreSummary,
      employeeRemarks: this.annualReportDetail.employeeRemarks,
      loggedInUserName: this.annualReportDetail.loggedInUserName,
      managerFirstName: this.annualReportDetail.managerFirstName,
      managerLastName: this.annualReportDetail.managerLastName,
      YearId: this.rangeTitle,
      evaluationDate: this.annualReportDetail.evaluationDate,
      CompanyLogo: this.annualReportDetail.CompanyLogo,
      UserId: this.annualReportDetail.UserId,
      summaryReportingView: this.annualReportDetail.summaryReportingView,
      sparkView: this.annualReportDetail.sparkView,
      contextualReportingView: this.annualReportDetail.contextualReportingView,
      evaluationDetails: this.annualReportDetail.evaluationDetails,
      commentDetails: commentList,
      sparkDetails: sparkList,
      sendMail: sendMail,
      Remark: this.userRemark,
      DocumentName: docName,
      department: this.annualReportDetail.department,
      signature: removeDataBase64,
      reportDuration: this.reportDuration
    }
    this.generatePdfService.sendMailWithPdf(pdfGeneratBody).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, true, true)) {
          if (type === Export) {
            if (window.navigator.msSaveOrOpenBlob) {
              this.http.get(response.data.documentName, { responseType: 'arraybuffer' })
                .subscribe((file: ArrayBuffer) => {
                  let pdfSrc = new Uint8Array(file);
                  // or directly passing ArrayBuffer
                  var blob = new Blob([pdfSrc], { type: "application/pdf" });
                  window.navigator.msSaveOrOpenBlob(blob, docName);
                  this.closePreview();
                });
            } else {
              let link = document.createElement('a');
              link.setAttribute('type', 'hidden');
              link.href = response.data.documentName;
              document.body.appendChild(link);
              link.click();
              link.remove();
              this.closePreview();
            }
          } else {
            this.closePreview();
          }

        }
      }
    );
  }

  closePreview() {
    this.cancelPreview.emit(true)
  }

  private reportDateFormat(reportPeriod): any {
    let fromDateParts = reportPeriod.fromDate.split('-');
    // Please pay attention to the month (fromDateParts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    const fromDate = new Date(fromDateParts[0], fromDateParts[1] - 1, fromDateParts[2]);

    let toDateParts = reportPeriod.toDate.split('-');
    // Please pay attention to the month (toDateParts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    const toDate = new Date(toDateParts[0], toDateParts[1] - 1, toDateParts[2]);

    return {
      fromDate: this.datePipe.transform(new Date(fromDate.toDateString()), 'MMM d, yyyy'),
      toDate: this.datePipe.transform(new Date(toDate.toDateString()), 'MMM d, yyyy'),
    }
  }

}
