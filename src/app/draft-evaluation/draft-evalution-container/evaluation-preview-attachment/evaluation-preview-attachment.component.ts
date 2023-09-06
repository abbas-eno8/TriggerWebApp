/**
 * Author : Shahbaz Shaikh
 */
import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// ------------------------------------------------------------ //
import { DeletePopupComponent } from '../../../shared/modal-popup/delete-popup/delete-popup.component';
import { DraftEvaulationService } from '../../service/draft-evaulation.service';
import { LoaderService } from '../../../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
import { AssessmentDateTimeStamp, OfficeAppLink } from '../../draft-evaluation.model';


@Component({
  selector: 'trigger-evaluation-preview-attachment',
  templateUrl: './evaluation-preview-attachment.component.html',
  styleUrls: ['./evaluation-preview-attachment.component.scss']
})
export class EvaluationPreviewAttachmentComponent implements OnInit {

  /** confirm event emitted for update remark model while remark deleted */
  @Output() public confirm: EventEmitter<any>;

  /** Public variable */
  /** content created for store ecternal url which is used in HTML in iframe tag */
  public content: SafeResourceUrl;
  /** created remark object for store curremt selected remark */
  public remark: any;
  /** Store isDarkTheme value*/
  public isDarkTheme: boolean;
  /** Store themeEmitter value*/
  public themeEmitter: any;
  /** Store modelName value*/
  public modelName: string;

  /** Private variable */
  /** Store the user data */
  private userData: any;
  /** destroy  */
  private destroy: Subject<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sanitizer: DomSanitizer,
    private loaderService: LoaderService,
    private draftEvaulationService: DraftEvaulationService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private matDialog: MatDialog,
    private datePipe: DatePipe,
    private globalEventsManager: GlobalEventsManager
  ) {
    this.setProperty(data);
  }

  ngOnInit() {
    this.preview();
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Create google docs/Office links.
   */
  public preview(): void {
    let url: string = '';
    const extension = this.remark[this.modelName].attachmentpath.substring(this.remark[this.modelName].attachmentpath.lastIndexOf('.') + 1);
    if (extension === 'xlsx' || extension === 'xls') {
      url = OfficeAppLink + this.remark[this.modelName].attachmentpath;
    } else {
      url = 'https://docs.google.com/viewer?url=' + this.remark[this.modelName].attachmentpath + '&embedded=true';
    }
    this.content = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Open modal for Delete-attachment and handle click event for update current model.
   */
  public delete(): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: 'Attachment',
    });
    dialogRef.componentInstance.confirm.subscribe((data) => {
      if (data) {
        this.deleteAttachment();
        dialogRef.close(true);
      }
    });
  }

  /** Private Method */
  /** Initializes default properties for the component */
  private setProperty(data): void {
    this.destroy = new Subject();
    this.confirm = new EventEmitter();
    this.userData = this.globalResponseHandlerService.getUserData();
    this.remark = data.remark;
    this.modelName = data.modelName;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.pipe(takeUntil(this.destroy)).subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Call API for delete remark.
   */
  private deleteAttachment(): void {
    const deleteAttachment: any = {
      assessmentId: this.remark.assessmentId,
      updatedby: this.userData.userId,
      commentUpdDateTime: this.datePipe.transform(new Date(), AssessmentDateTimeStamp),
      isTriggerSent: this.remark.isTriggerSent,
      performanceRemarkId: this.modelName === 'performanceModel' ? this.remark.performanceRemarkId : -1,
      attitudeRemarkId: this.modelName === 'attitudeModel' ? this.remark.attitudeRemarkId : -1,
      maintenanceRemarkId: this.modelName === 'maintenanceModel' ? this.remark.maintenanceRemarkId : -1,
      generalRemarkId: this.modelName === 'generalModel' ? this.remark.generalRemarkId : -1,
    }
    this.loaderService.emitIsLoaderShown(true);
    this.draftEvaulationService.deleteAttachment(deleteAttachment).pipe(takeUntil(this.destroy)).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response)) {
          this.updateModel();
          this.remark.assessmentDate = new Date(response.data[0].assessmentDate).toString();
          this.confirm.emit(this.remark);
        }
      });
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Update model remarks-value which we updated locally.
   */
  private updateModel(): void {
    this.remark[this.modelName].commentUpdDateTime = this.datePipe.transform(new Date(), AssessmentDateTimeStamp);
    this.remark[this.modelName].documentContents = '';
    this.remark[this.modelName].documentName = '';
    // this.remark.attachmentpath = '';
    // this.remark.attachmentFileName = '';
    this.remark[this.modelName].isPreview = false;
    this.remark[this.modelName].isFileDeletable = false;
    this.remark[this.modelName].fileName = '';
    this.remark[this.modelName].url = '';
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    this.themeEmitter.unsubscribe();
  }
}
