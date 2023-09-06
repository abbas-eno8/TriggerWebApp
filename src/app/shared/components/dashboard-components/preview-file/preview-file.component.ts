import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material';
// --------------------------------------- //
import { Spark, Remark } from '../../../../dashboard/dashboard-model';
import { OfficeAppLink } from '../../../modals/individual-employee-model';

@Component({
  selector: 'trigger-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.scss']
})
export class PreviewFileComponent implements OnInit {
  /** content created for store ecternal url which is used in HTML in iframe tag */
  public content: SafeResourceUrl;

  private remark: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sanitizer: DomSanitizer
  ) {
    this.remark = data;

    if (this.remark.isSpark) {
      this.previewSpark(this.remark.remark);
    } else {
      this.previewComment(this.remark.remark, this.remark.modelName)
    }

  }

  ngOnInit() {
  }

  private previewSpark(spark: Spark): void {
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

  public previewComment(remark: Remark, modelName: string): void {
    let url: string;
    let attachmentpath: string = remark[modelName].attachmentpath;
    const extension = attachmentpath.substring(attachmentpath.lastIndexOf('.') + 1);
    if (extension === 'xlsx' || extension === 'xls') {
      url = OfficeAppLink + attachmentpath;
    } else {
      url = "https://docs.google.com/viewer?url=" + attachmentpath + "&embedded=true";
    }
    this.content = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
