/**
@author : Anjali Tandel
@class : SparkPreviewPresentation
@description : SparkPreviewPresentation is created for preview attachment file.
**/
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { LoaderService } from '../../../../../core/loader/loader.service';
import { OfficeAppLink } from '../../../../../shared/modals/individual-employee-model';
import { takeUntil } from 'rxjs/operators';
import { SparkAnEmployee, Attachment } from '../../../spark-an-employee-model';
import { DeletePopupComponent } from '../../../../../shared/modal-popup/delete-popup/delete-popup.component';
import { GlobalEventsManager } from '../../../../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-spark-preview-presentation',
  templateUrl: './spark-preview-presentation.html',
  styleUrls: ['./spark-preview-presentation.scss'],
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SparkPreviewPresentation implements OnInit {
  /** destroy-subject */
  private destroy: Subject<void>;
  /** event emitted while user clicks on delete-attachment */
  confirm = new EventEmitter();
  /** content created for store ecternal url which is used in HTML in iframe tag */
  public content: SafeResourceUrl;
  /** created spark object for store current selected spark */
  public spark: SparkAnEmployee;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SparkAnEmployee,
    public sanitizer: DomSanitizer,
    private loaderService: LoaderService,
    private matDialog: MatDialog,
    private globalEventsManager: GlobalEventsManager
    ) {
    this.destroy = new Subject();
    this.spark = data;
    this.preview(this.spark);
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
        } else {
        this.isDarkTheme = false;
      }
    })
  }

  ngOnInit() {
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Create google docs/Office links.
   */
  private preview(spark: SparkAnEmployee): void {
    let url: string;
    let path: string = spark.path;
    const extension = path.substring(path.lastIndexOf('.') + 1);
    if (extension === 'xlsx' || extension === 'xls') {
      url = OfficeAppLink + path;
    } else {
      url = "https://docs.google.com/viewer?url=" + path + "&embedded=true";
    }
    this.content = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Open modal for Delete-attachment and handle click event for update current model.
   */
  public delete(): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
       data: Attachment 
      });
    dialogRef.componentInstance.confirm.subscribe((isConfirm) => {
      if (isConfirm) {
        this.loaderService.emitIsLoaderShown(true);
        this.confirm.emit(true);
        dialogRef.close();
      }
    });
  }
  
  private ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.themeEmitter.unsubscribe();
  }
}
