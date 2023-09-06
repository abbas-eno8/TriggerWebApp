import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
// -------------------------------------------------- //
import { ScrollService } from '../../../../core/services/scroll.service';
import { BlobToByteArrayService } from '../../../../shared/services/blob-to-byte-array/blob-to-byte-array.service';
import { downloadFileBlobURL } from '../../../../core/utility/utility';
import { ReportView } from '../../../../shared/modals/shared-model';

@Component({
  selector: 'trigger-reports-view',
  templateUrl: './reports-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsViewComponent implements OnInit {

  @Input() public set reportsData(value: ReportView[]) {
    if (value) {
      this._reportsData = value;
      this.noRecordFound = false;
      this.sortByDate();
    } else {
      this.noRecordFound = true;
    }
  }

  public get reportsData(): ReportView[] {
    return this._reportsData;
  }

  public noRecordFound: boolean;

  private _reportsData: ReportView[];

  constructor(
    public scrollService: ScrollService,
    private httpClient: HttpClient,
    private blobToByteArrayService: BlobToByteArrayService
  ) {
    this.noRecordFound = false;
  }

  ngOnInit() {
  }


  public exportReport(item: ReportView): void {
    let fileName: string = item.reportTitle + '.pdf';
    this.httpClient.get(item.documentFullPath, { responseType: 'blob' }).subscribe(data => {
      let blob = new Blob([data], { type: 'application/pdf;charset=utf-8;' });
      saveAs(blob, fileName);
      // downloadFileBlobURL(item.documentFullPath, 'application/pdf;charset=utf-8;', fileName);
    });
  }

  private sortByDate() {
    this.reportsData.sort((a: ReportView, b: ReportView) => {
      return this.getTime(new Date(b.createdDateTime)) - this.getTime(new Date(a.createdDateTime))
    });
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }
}
