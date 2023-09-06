/**
@author : Mihir Patel
@class : SparkWidgetPresentation
@description :SparkWidgetComponent is created for load spark widget view in spark module and this presenter load based on condition.
**/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SparkAnEmployee, Category, RequestModel, Spark, SearchFieldDesktopView, SearchPlaceHolder, SparkAddedSuccessfully, SparkAnEmployeeForWidget, SparkReplyObject } from '../../spark-an-employee-model';
import { CurrentSparkAnEmployee } from '../../../employee-model';
import { SparkListPresenter } from '../spark-list-presenter/spark-list-presenter';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoaderService } from '../../../../core/loader/loader.service';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { Success_Type, Success_Title, sparkDetailByRoute } from '../../../../core/magic-string/common.model';
import { ToasterService } from 'angular2-toaster';
import { Encryption } from '../../../../core/magic-string/common-validation-model';

@Component({
  selector: 'trigger-spark-widget-ui',
  templateUrl: './spark-widget.presentation.html',
  styleUrls: ['./spark-widget.presentation.scss'],
  preserveWhitespaces: true
})
export class SparkWidgetPresentation implements OnInit {
  @Input() updateSpark: any;
  /** This property is used for get sparks response from container component */
  @Input() public set baseResponse(baseResponse: SparkAnEmployeeForWidget[]) {
    if (baseResponse) {
      this._baseResponse = this.listPresenter.checkResponse(baseResponse);
      this.filterSparks = this._baseResponse ? this.listPresenter.checkActions(this._baseResponse) : this._baseResponse;
      this._baseResponse = this.filterSparks;
      this.isHideLoader = this._baseResponse ? false : true;
      this.isGetResponse = true;
    }
  }
  public get baseResponse(): SparkAnEmployeeForWidget[] {
    return this._baseResponse;
  }
  /** This property is used for store sparks */
  protected _baseResponse: SparkAnEmployeeForWidget[];
  public filterSparks: any[];

  /** This property is used for get spark-classifications from container component */
  @Input() public set classifications(classifications: SparkAnEmployee[]) {
    if (classifications) {
      this._classifications = classifications;
    }
  }
  /** This property is used for store classifications */
  private _classifications: SparkAnEmployee[];

  /** This property is used for get spark-categories from container component */
  @Input() public set categories(categories: Category[]) {
    if (categories) {
      this._categories = categories;
    }
  }
  @Input() sparkDetailBySelectedRoute: sparkDetailByRoute;
  
  /** This property is used for store categories */
  private _categories: Category[];
  /** This property is used for store current-spark-employee which we are getting from employee-list page*/
  public currentSparkAnEmployee: CurrentSparkAnEmployee;
  /** EventEmitter for add-spark-api which we called in container page */
  @Output() add: EventEmitter<RequestModel> = new EventEmitter();
  /** EventEmitter for update-spark-api which we called in container page */
  @Output() update: EventEmitter<RequestModel> = new EventEmitter();
  /** EventEmitter for delete-spark-api which we called in container page */
  @Output() delete: EventEmitter<SparkAnEmployee> = new EventEmitter();
  /** EventEmitter for delete-attachent-api which we called in container page */
  @Output() deleteAttachment: EventEmitter<RequestModel> = new EventEmitter();
  /** EventEmitter for send-mail-api which we called in container page */
  @Output() sendMail: EventEmitter<boolean> = new EventEmitter();
  @Output() loadSpark: EventEmitter<boolean> = new EventEmitter();
  @Output() loadSparkByTab: EventEmitter<number> = new EventEmitter();

  @Output() addReply: EventEmitter<SparkReplyObject> = new EventEmitter();
  public isSparkAddable: boolean;
  public isSparkViewable: boolean;
  private destroy: Subject<void> = new Subject();
  public isHideLoader: boolean;
  public isOpenModal: boolean;
  public isGetResponse: boolean;
  public currentSelectedTab: number;
  constructor(private listPresenter: SparkListPresenter,
    private loaderService: LoaderService,
    private globalEventsManager: GlobalEventsManager,
    private toasterService: ToasterService) {
    this.destroy = new Subject();
    this.currentSparkAnEmployee = this.listPresenter.getSparkAnEmployee();
    this.isSparkAddable = this.currentSparkAnEmployee.isSparkAddable;
    this.isSparkViewable = this.currentSparkAnEmployee.isSparkViewable;
    this.isGetResponse = false;
    this.currentSelectedTab = 1;
    this.isOpenModal = false;
    this.globalEventsManager.resetForm.subscribe((content) => {
      if (content !== '') {
        if (this.isOpenModal) {
          this.listPresenter.openMailConfiramtion(content);
        } else {
          this.loadSpark.next(true)
        }
      }
    })
    this.globalEventsManager.closeCdkModalPopup.subscribe((isTrue) => {
      if (isTrue && this.listPresenter.overlayRef) {
        this.listPresenter.overlayRef.dispose();
        this.loaderService.emitIsLoaderShown(false);
        this.globalEventsManager.closeModal(false);
      }
    })
  }

  ngOnInit() {
    this.listPresenter.delete$.pipe(takeUntil(this.destroy)).subscribe((spark: SparkAnEmployee) => {
      this.delete.next(spark)
    });
    this.listPresenter.add$.pipe(takeUntil(this.destroy)).subscribe((spark: RequestModel) => {
      spark.empId = this.currentSparkAnEmployee.empId;
      spark.sparkBy = this.currentSparkAnEmployee.userId;
      if (spark.sparkId > 0) {
        spark.updatedBy = spark.sparkBy;
        this.update.next(spark)
      } else {
        spark.createdBy = spark.sparkBy;
        this.isOpenModal = spark.sendSpark;
        spark.sendSpark = false;

        this.add.next(spark)
      }
    });
    
    this.listPresenter.deleteAttachment$.pipe(takeUntil(this.destroy)).subscribe((spark: RequestModel) => {
      this.deleteAttachment.next(spark)
    });

    this.listPresenter.sendMail$.pipe(takeUntil(this.destroy)).subscribe((isSend: boolean) => {
      this.sendMail.next(isSend);
      this.isOpenModal = false;
    });

    this.listPresenter.loadSpark$.pipe(takeUntil(this.destroy)).subscribe((isLoad: boolean) => {
      this.loadSpark.next(isLoad)
    });

    this.listPresenter.addReply$.pipe(takeUntil(this.destroy)).subscribe((object: SparkReplyObject) => {
      this.addReply.emit(object);
    });
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 18-11-2019
  * Description : Check conditin in ngOnChange and based on that false loader.
  */
  ngOnChanges() {
    if (((this.filterSparks && this.filterSparks.length > 0) || this.isGetResponse || this.isHideLoader || !this.isSparkViewable) && !this.isOpenModal) {
      this.loaderService.emitIsLoaderShown(false);
    }
  }

  // /**
  //  * Author : Mihir Patel
  //  * Created-Date : 18-11-2019
  //  * Description : Open add spark modal on click of addModal.
  //  */
  public addModal(): void {
    this.listPresenter.addModal()
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 06-09-2019
   * Description : For bind record in search view component.
   */
  public bindRecords(spark: SparkAnEmployeeForWidget[]): void {
    this.filterSparks = spark;
  }

  public selectTab(tabType: number): void {
    this.updateSpark = null;
    this.currentSelectedTab = tabType;
    this.loaderService.emitIsLoaderShown(true);
    this.filterSparks = []
    this.isGetResponse = false;
    this.isHideLoader = false;
    this.loadSparkByTab.next(tabType);
  }

  ngOnDestroy(): void {
    //sessionStorage.setItem(Encryption.RequestId, '0');
  }

}
