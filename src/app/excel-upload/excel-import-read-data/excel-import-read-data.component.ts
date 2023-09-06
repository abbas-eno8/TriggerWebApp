/**
 * description :ExcelImportReadDataComponent is a child component of ExcelUploadComponent is created for read data from uploaded excel-file.
 * @author : Anjali Tandel
 * @class : ExcelImportReadDataComponent
 */
import { Component, OnInit, Output, EventEmitter, HostListener, Input } from '@angular/core';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { Message, FileSizeType, FileType } from '../excel-upload-model';
import { ExcelUploadService } from '../excel-upload-service/excel-upload.service';
import { ExcelUploadPresenter } from '../excel-upload-presenter/excel-upload.presenter';
@Component({
  selector: 'trigger-excel-import-read-data',
  templateUrl: './excel-import-read-data.component.html'
})
export class ExcelImportReadDataComponent implements OnInit {

  /** This will set the data */
  @Input() public set onclickReset(value: boolean) {
    if (value) {
      this.onClickReset();
    }
  }

  @Output() onclickFileImport = new EventEmitter();
  public fileName: string = '';
  public fileSize: any;
  public isVisibleExcelIcon: boolean = false;
  public fileReaded: any;
  public downloadExcelFileUrl: string;
  private user: any;

  constructor(
    private excelUploadService: ExcelUploadService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private presenter: ExcelUploadPresenter) {
  }

  ngOnInit() {
    this.presenter.resetFile$.pipe().subscribe((isReset: boolean) => {
      if (isReset) {
        this.onClickReset();
      }
    });
    this.user = this.globalResponseHandlerService.getUserData();
    if (this.user.departmentLength > 1) {
      this.getMasterData();
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  11-12-2018
  * Descriotion : Call API for getting excel file template
  */
  private getMasterData(): void {
    this.excelUploadService.getExcelTemplate(this.user.clientId).subscribe(
      (response: any) => {
        if (this.globalResponseHandlerService.getApiResponse(response)) {
          this.downloadExcelFileUrl = response.data;
        }
      }
    );
  }
  public onclickImportButton(): void {
    this.globalResponseHandlerService.displayLoader(true);
    this.onclickFileImport.emit(this.fileReaded);
  }
  /**
   * Author : Sonal Patil
   * Modified by : Anjali Tandel
   * Modified-Date : 03-12-2019
   * Description : For drag over & leave event
   */
  @HostListener('dragleave', ['$event'])
  @HostListener('dragover', ['$event']) public onDragLeave(evt) {
    this.onDragEvent(evt);
  }

  /**
   * Author : Sonal Patil
   * Modified by : Anjali Tandel
   * Modified-Date : 03-12-2019
   * Description : For drag leave event
   */
  @HostListener('drop', ['$event']) public onDrop(evt) {
    this.onDragEvent(evt);
    this.validateFile(evt.dataTransfer.files[0]);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 03-12-2019
   * Description : For drag leave event
   */
  private onDragEvent(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  11-12-2018
  * Descriotion : Read excel file
  */
  public onClickConvertFile(excel: any): void {
    this.validateFile(excel.target.files[0]);
  }

  private validateFile(file): void {
    if (file) {
      if (file.name.split('.')[1] === FileType.Xls || file.name.split('.')[1] === FileType.Xlsx) {
        this.getFile(file);
      } else {
        this.globalResponseHandlerService.toastergetApiResponse(Message.ExcelFileInvalid);
      }
    }
  }

  private getFile(file): void {
    this.isVisibleExcelIcon = true;
    this.fileReaded = file;
    this.fileName = this.fileReaded.name;
    this.fileSize = this.fileReaded.size;
    this.bytesToSize(this.fileSize);
  }
  /**
  * Author : Anjali Tandel
  * Modified-Date :  11-12-2018
  * Descriotion : Convert bytes to size
  */
  private bytesToSize(bytes): void {
    if (bytes < 1024) {
      this.fileSize = this.fileSize.toFixed(2) + FileSizeType.Bytes;
    } else if (bytes < 1048576) {
      this.fileSize = (this.fileSize / 1024.0).toFixed(2) + FileSizeType.KB;
    } else if (bytes < 1073741824) {
      this.fileSize = (this.fileSize / 1048576).toFixed(2) + FileSizeType.MB;
    } else {
      this.fileSize = (this.fileSize / 1073741824).toFixed(2) + FileSizeType.GB;
    }
    return this.fileSize;
  };

  /**
  * Author : Anjali Tandel
  * Modified-Date :  11-12-2018
  * Descriotion : Reset the fields
  */
  public onClickReset(): void {
    this.fileReaded = '';
    this.fileName = '';
    this.fileSize = '';
    this.isVisibleExcelIcon = false;
  }
}
