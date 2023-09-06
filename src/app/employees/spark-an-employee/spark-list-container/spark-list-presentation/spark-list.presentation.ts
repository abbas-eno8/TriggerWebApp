/**
@author : Anjali Tandel
@class : SparkListPresentation
@description : SparkListPresentation is parent presentation for spark-module.
**/
import { Component, OnInit, ViewChild, ViewContainerRef, Input, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BreakpointState } from '@angular/cdk/layout';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurrentSparkAnEmployee } from '../../../employee-model';
import { LoaderService } from '../../../../core/loader/loader.service';
import { SparkAnEmployee, RequestModel, SearchFieldDesktopView, SearchFieldAccrodianView, Category, SearchPlaceHolder, DesktopWidth, ListViewClass, NoRecordFoundViewClass, SparkAddedSuccessfully, SparkAnEmployeeForWidget, SparkReplyObject, SparkAction } from '../../spark-an-employee-model';
import { SparkAccrodianPresentation } from './spark-accrodian-presentation/spark-accrodian.presentation';
import { SparkDesktopPresentation } from './spark-desktop-presentation/spark-desktop.presentation';
import { SparkListPresenter } from '../spark-list-presenter/spark-list-presenter';
import { SparkAnEmployeeAdapter } from '../../spark-an-employee-adapter/spark-an-employee-adapter';
import { SparkAddFormPresentation } from './spark-add-form-presentation/spark-add-form.presentation';
import { SparkFormPresenter } from './spark-form-presenter/spark-form-presenter';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { Success_Type, Success_Title, sparkDetailByRoute } from '../../../../core/magic-string/common.model';
import { Encryption } from '../../../../core/magic-string/common-validation-model';
@Component({
  selector: 'trigger-spark-list-ui',
  templateUrl: './spark-list.presentation.html',
  styleUrls: ['./spark-list.presentation.scss'],
  preserveWhitespaces: true,
  viewProviders: [SparkListPresenter, SparkFormPresenter]
})
export class SparkListPresentation implements OnInit {
  
  @Input() updateSpark: any;
  @Input() isDataSaveInSession: boolean;
  @Input() sparkDetailBySelectedRoute: sparkDetailByRoute;
  @Input() baseResponse: SparkAnEmployeeForWidget[];
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

  /** Add Spark Label */
  public addSparkLabel: string;
  /** This property is used for store categories */
  private _categories: Category[];
  /** This property is used for store current-spark-employee which we are getting from employee-list page*/
  public currentSparkAnEmployee: CurrentSparkAnEmployee;
  /** searchPlaceHolder stored static place-holder value for search input */
  // public searchPlaceHolder: string;
  /** searchPlaceHolder stored search-fields based on desktop-view or accrodian */
  // public searchFields: string[];
  // public isListViewCreated: boolean;
  public isSparkAddable: boolean;
  public isSparkViewable: boolean;
  public isSparkAdd: boolean;
  public isOpenModal: boolean;
  // viewSparkcomponentRef: any;
  addSparkcomponentRef: any;
  // @ViewChild('viewSparkRef', { read: ViewContainerRef, static: false }) viewSparkRef: ViewContainerRef;
  @ViewChild('addSparkRef', { read: ViewContainerRef, static: true }) addSparkRef: ViewContainerRef;
  private destroy: Subject<void> = new Subject();
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
  @Output() loadSparkBySelectedTab: EventEmitter<number> = new EventEmitter();
  @Output() addReplyOnEnter: EventEmitter<SparkReplyObject> = new EventEmitter();

  public spark: SparkAnEmployee;
  constructor(
    public breakpointObserver: BreakpointObserver,
    private listPresenter: SparkListPresenter,
    // private formPresenter: SparkFormPresenter,
    private loaderService: LoaderService,
    private globalEventsManager: GlobalEventsManager
  ) {
    this.globalEventsManager.resetForm.subscribe((content) => {
      if (content) {
        this.isSparkAdd = true;
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
        this.isSparkAdd = false;
      }
    })
    this.isSparkAdd = false;
    this.isOpenModal = false;
    // this.searchPlaceHolder = SearchPlaceHolder;
    this.destroy = new Subject();
    this.currentSparkAnEmployee = this.listPresenter.getSparkAnEmployee();
    this.addSparkLabel = `${SparkAction.add} for ${this.currentSparkAnEmployee.firstName} ${this.currentSparkAnEmployee.lastName}`;
    this.isSparkAddable = this.currentSparkAnEmployee.isSparkAddable;
    this.isSparkViewable = this.currentSparkAnEmployee.isSparkViewable;
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
        this.add.next(spark);
      }
    });
    this.listPresenter.deleteAttachment$.pipe(takeUntil(this.destroy)).subscribe((spark: RequestModel) => {
      this.deleteAttachment.next(spark)
    });
    // this.listPresenter.createView$.pipe(takeUntil(this.destroy)).subscribe((isCretaedView: boolean) => {
    //   this.desktopView();
    // });
    this.listPresenter.sendMail$.pipe(takeUntil(this.destroy)).subscribe((isSend: boolean) => {
      this.sendMail.next(isSend);
      this.isOpenModal = false;
    });
    this.listPresenter.loadSpark$.pipe(takeUntil(this.destroy)).subscribe((isLoad: boolean) => {
      this.loadSpark.next(isLoad)
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Create add-view component dynamically based on spakrs get.
   */
  private createAddViewComponent(): void {
    this.addSparkRef.clear();
    this.addSparkcomponentRef = this.listPresenter.createComponent(this.addSparkcomponentRef, this.addSparkRef, SparkAddFormPresentation);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Close loader while component reference created and get the spark categories and classificactions which we are using in form popup modal.
   */
  ngOnChanges() {
    if (this.isDataSaveInSession && this.isSparkAddable && (this.listPresenter.checkClassficationsCategories() || (this._classifications && this._categories))) {
      if (this.addSparkRef) {
        this.createAddViewComponent()
      }
    }
  }

  loadSparkByTab(tabType: number) {
    this.loadSparkBySelectedTab.next(tabType);
  }

  addReply(object) {
    this.addReplyOnEnter.next(object);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    sessionStorage.setItem(Encryption.RequestId, '0');
  }
}
