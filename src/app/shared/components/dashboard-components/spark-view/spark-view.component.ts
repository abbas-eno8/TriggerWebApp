import { Component, OnInit, Input } from '@angular/core';
import { Spark } from '../../../../dashboard/dashboard-model';
import { SearchPipePipe } from '../../../pipes/search-pipe.pipe';
import { MatDialog } from '@angular/material';
import { PreviewFileComponent } from '../preview-file/preview-file.component';
import { PopupPanelClass } from '../../../../core/magic-string/common.model';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-spark-view',
  templateUrl: './spark-view.component.html'
})
export class SparkViewComponent implements OnInit {
  @Input() sparks: Spark[];
  public sparkList: Spark[];
  public _searchText: string;
  public isSrcValid: boolean;
  public dialogRef: any;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(private searchPipePipe: SearchPipePipe,
    private matDialog: MatDialog,
    private globalEventsManager: GlobalEventsManager) {
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
    this.sparkList = this.sparks;
  }

  public ngOnDestroy(): void {
    this.themeEmitter.unsubscribe();
  }

  searchFields = ['remarks', 'category', 'classification', 'givenBy', 'profileName'];
  get searchText() {
    return this._searchText;
  }
  set searchText(search: string) {
    this._searchText = search;
    this.sparkList = this.searchText ? this.searchPipePipe.transform(this.sparks, this.searchText, this.searchFields) : this.sparks;
  }

  public onError(): void {
    this.isSrcValid = true;
  }

  public previewModal(spark: Spark): void {
    const sparkObj: any = { spark, modelame: '', isSpark: true  };
    if (!!spark.cloudFilePath) {
      window.open(spark.cloudFilePath, "_blank");
    } else {
      let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
      this.dialogRef = this.matDialog.open(PreviewFileComponent, {
        data: sparkObj,
        panelClass: [PopupPanelClass.extraLargeContainer, modalBackground],
        // panelClass: PopupPanelClass.extraLargeContainer,
        position: {
          top: '', bottom: '', left: '', right: ''
        }
      });
    }
  }

}
