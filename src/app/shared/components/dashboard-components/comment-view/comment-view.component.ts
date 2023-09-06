import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { saveAs } from 'file-saver';
// --------------------------------------------- //
import { Remark } from '../../../../dashboard/dashboard-model';
import { SearchPipePipe } from '../../../pipes/search-pipe.pipe';
import { PreviewFileComponent } from '../preview-file/preview-file.component';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { TeamMemberAssessment } from '../../../../shared/modals/shared-model';

@Component({
  selector: 'trigger-comment-view',
  templateUrl: './comment-view.component.html'
})
export class CommentViewComponent implements OnInit {
  @Input() public set comments(value: Remark[]) {
    if (value) {
      this._comments = value;
      this.commentList = this.comments;
    }
  }
  public get comments(): Remark[] {
    return this._comments;
  }

  public teamMemberAssessment: any;
  public isSrcValid: boolean;
  public _searchText: string;
  public commentList: Remark[];
  public isDarkTheme: boolean;
  public themeEmitter: any;

  private _comments: Remark[];
  constructor(
    private searchPipePipe: SearchPipePipe,
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private globalEventsManager: GlobalEventsManager
  ) {
    this.teamMemberAssessment = TeamMemberAssessment;
    this.isSrcValid = false;
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

  public ngOnDestroy(): void {
    this.themeEmitter.unsubscribe();
  }

  searchFields = ['name', 'profileName', 'attitude', 'general', 'maintenance', 'performance'];
  get searchText() {
    return this._searchText;
  }
  set searchText(search: string) {
    this._searchText = search;
    this.commentList = this.searchText ? this.searchPipePipe.transform(this.comments, this.searchText, this.searchFields) : this.comments;
  }

  public onError(): void {
    this.isSrcValid = true;
  }

  public preview(remark: Remark, modelName: string): void {
    const extension = remark[modelName].attachmentpath.substring(remark[modelName].attachmentpath.lastIndexOf('.') + 1);
    if (!!remark[modelName].cloudFilePath) {
      let cloudUrl = remark[modelName].cloudFilePath;
      window.open(cloudUrl, "_blank");
    } else {
      if (extension === 'csv') {
        this.httpClient.get(remark[modelName].attachmentpath, { responseType: 'text' }).subscribe(data => {
          let blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, remark[modelName].documentName.substring(remark[modelName].documentName.indexOf('$') + 1));
        });
      } else {
        this.previewAttachment(remark, modelName)
      }
    }

  }

  public previewAttachment(remark: Remark, modelName: string): void {
    const remarkObj: any = { remark, modelName, isSpark: false };
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    this.matDialog.open(PreviewFileComponent, {
      data: remarkObj,
      panelClass: ['xl-dialog-container', modalBackground],
      // panelClass: 'xl-dialog-container',
      position: {
        top: '', bottom: '', left: '', right: ''
      }
    });
  }
}
