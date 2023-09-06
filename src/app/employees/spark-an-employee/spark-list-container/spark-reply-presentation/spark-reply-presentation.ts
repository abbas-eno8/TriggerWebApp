import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { sparkDetailByRoute, SparkDetail, CurrentSparkAnEmployee, RoleEnum } from '../../../../core/magic-string/common.model';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { SearchPlaceHolder, SearchFieldDesktopView, SparkAnEmployeeForWidget, SparkReplyObject, SparkAnEmployee, Spark, AddAttachment, bindSparkReplyForWidget } from '../../spark-an-employee-model';
import { SparkListPresenter } from '../spark-list-presenter/spark-list-presenter';
import { SearchPipePipe } from '../../../../shared/pipes/search-pipe.pipe';
import { LoaderService } from '../../../../core/loader/loader.service';
import { DatePipe } from '@angular/common';
import { UserModel } from '../../../../core/model/user';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'trigger-spark-reply-presentation',
  templateUrl: './spark-reply-presentation.html',
  styleUrls: ['./spark-reply-presentation.scss']
})
export class SparkReplyPresentation implements OnInit {

  @Input() updateSpark: any;
  @Input() filterSparks: any
  @Input() isGetResponse: boolean;

  public sparkList: any;
  public sparkDetailBySelectedRoute: sparkDetailByRoute;
  public isImageValid: boolean;
  public userData: UserModel;
  // public searchPlaceHolder: string;
  public searchFields: string[];
  public _searchText: string;
  public isSingleClick: boolean;
  public currentSparkAnEmployee: CurrentSparkAnEmployee;
  public isSparkAddable: boolean = false;
  public isSparkViewable: boolean = false;
  public isShowSearch: boolean;
  public isAutoFocus: boolean;
  public isAdminOrSuperAdmin: boolean;
  public fileName: string;

  private destroy: Subject<void>;

  constructor(
    private listPresenter: SparkListPresenter,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private searchPipePipe: SearchPipePipe,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {
    this.destroy = new Subject();
    this.isImageValid = true;
    this.userData = this.globalResponseHandlerService.getUser();
    this.isAdminOrSuperAdmin = (this.userData.role === RoleEnum.TriggerAdmin || this.userData.role === RoleEnum.Admin) ? true : false;
    // this.searchPlaceHolder = SearchPlaceHolder;
    this.searchFields = SearchFieldDesktopView;
    this.isSingleClick = false;
    this.currentSparkAnEmployee = this.listPresenter.getSparkAnEmployee();
    this.isSparkAddable = this.currentSparkAnEmployee.isSparkAddable;
    this.isSparkViewable = this.currentSparkAnEmployee.isSparkViewable;
    this.isShowSearch = false;
    this.isAutoFocus = true;
  }

  ngOnInit() {
    this.sparkDetailBySelectedRoute = JSON.parse(sessionStorage.getItem(SparkDetail));

    this.listPresenter.addAttachment$.pipe(takeUntil(this.destroy)).subscribe((attachmentObj: any) => {
      let spark = this.filterSparks && this.filterSparks.find((item) => item.sparkId === attachmentObj.sparkId);
      if (!!spark) {
        if (attachmentObj.isCloudUrl) {
          spark.sparkReplyDocumentName = '';
          spark.sparkReplyDocumentContents = '';
          spark.sparkReplyCloudFilePath = attachmentObj.fileName;
          spark.sparkReplyFileName = attachmentObj.fileName;
        } else {
          spark.sparkReplyDocumentName = attachmentObj.fileName;
          spark.sparkReplyDocumentContents = attachmentObj.filePath;
          spark.sparkReplyCloudFilePath = '';
          spark.sparkReplyFileName = attachmentObj.fileName;
        }
      }
      this.cdr.detectChanges();
    });

    this.listPresenter.deleteFile$.pipe(takeUntil(this.destroy)).subscribe((sparkId: any) => {
      // this.fileName = '';
      // this.sparkObj.cloudFilePath = '';
      let spark = this.filterSparks && this.filterSparks.find((item) => item.sparkId === sparkId);
      if (!!spark) {
        spark.sparkReplyDocumentName = '';
        spark.sparkReplyDocumentContents = '';
        spark.sparkReplyCloudFilePath = '';
        spark.sparkReplyFileName = '';
      }
      this.cdr.detectChanges();
    });
  }

  ngOnChanges() {
    if (this.updateSpark) {
      let spark = this.filterSparks.find(spark => spark.sparkId === this.updateSpark.sparkId);
      if (spark) {
        spark = this.listPresenter.updateReplyOnAdd(spark, this.updateSpark);
        this.loaderService.emitIsLoaderShown(false);
        this.isSingleClick = false;
      }
      this.updateSpark = null;
    }
    this.isShowSearch = false;
    if (this.filterSparks && this.filterSparks.length > 0) {
      this.isShowSearch = true;
      this.sparkList = this.filterSparks;
    }
    // if ((this.filterSparks || this.isHideLoader || !this.isSparkViewable) && !this.isOpenModal) {
    //   this.loaderService.emitIsLoaderShown(false);
    // }
  }

  get searchText() {
    return this._searchText;
  }
  set searchText(search: string) {
    this._searchText = search;
    this.isAutoFocus = this._searchText.length > 0 ? false : true;
    this.filterSparks = this.searchText ? this.searchPipePipe.transform(this.sparkList, this.searchText, this.searchFields) : this.sparkList;
  }

  public onError(): void {
    this.isImageValid = false;
  }

  public onEnterReply(event, sparkId: number, spark: any): void {
    event.preventDefault();
    if (!this.isSingleClick) {
      this.loaderService.emitIsLoaderShown(true);
      this.isSingleClick = this.listPresenter.onEnterReply(event, sparkId, spark);
    }
  }

  /**
  * Author : Shahbaz Shaikh
  * Created-Date : 10-05-2022
  * Description : Delete locally previously uploaded attachment.
  */
  public openCustomFileChooser(sparkId: number): void {
    this.listPresenter.openCustomFileChooser(sparkId);
  }

  /**
  * Author : Shahbaz Shaikh
  * Created-Date : 10-05-2022
  * Description : Delete locally previously uploaded attachment.
  */
  public deleteAttachment(sparkId: number): void {
    this.listPresenter.deleteAttachedFiles(sparkId);
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 18-11-2019
   * Description : Open add spark modal on click of addModal.
   */
  // public addModal(): void {
  //   this.listPresenter.addModal()
  // }

  /**
   * Author : Mihir Patel
   * Created-Date : 18-11-2019
   * Description : For open edit spark modal.
   */
  public editModal(spark: SparkAnEmployee): void {
    this.listPresenter.editModal(spark);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Open delete-popup modal.
   */
  public deleteModal(spark: SparkAnEmployee): void {
    this.listPresenter.deleteModal(Spark, spark);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Open preview-popup modal.
   */
  public preview(spark: SparkAnEmployee): void {
    this.listPresenter.previewModal(spark);
  }

  public previewAttachment(reply: bindSparkReplyForWidget): void {
    this.listPresenter.previewAttachment(reply);
  }

  public onClickReplyCount(spark): void {
    let getSpark = this.filterSparks.find(c => c.sparkId === spark.sparkId);
    getSpark.isDisplayCommentSection = !getSpark.isDisplayCommentSection;
  }
}
