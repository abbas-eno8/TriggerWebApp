import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';
// -------------------------------------------- //
import { groupByArray } from '../../../../../core/utility/utility';
import { AttitudeId, Error_Title, Error_Type, GeneralId, MaintenanceId, PerformanceId, RecognitionWallId } from '../../../../../core/magic-string/common.model';
import { SparkFormPresenter } from '../spark-form-presenter/spark-form-presenter';
import { GlobalResponseHandlerService } from '../../../../../core/global-response-handler/global-response-handler';
import { CurrentSparkAnEmployee } from '../../../../../employees/employee-model';
import { SparkAnEmployee, Category, AddAttachment, ClassificationsCategories, SparkAction, AccoladeCategoryId } from '../../../spark-an-employee-model';
//import { GlobalResponseHandlerService } from '../../../../../core/global-response-handler/global-response-handler';

@Component({
  selector: 'trigger-spark-an-employee-form-ui',
  templateUrl: './spark-edit-form.presentaton.html',
  styleUrls: ['./spark-edit-form.presentaton.scss'],
  viewProviders: [SparkFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SparkEditFormPresentaton implements OnInit {

  confirm = new EventEmitter();
  deleteFile = new EventEmitter();

  @ViewChild('focus', { static: false }) inputElement: ElementRef;

  public currentSparkAnEmployee: CurrentSparkAnEmployee;
  /** This property is used for get data from container component */
  public _classifications: SparkAnEmployee[];
  public classificationsRespose: any;
  public _categories: Category[];
  public sparkAnForm: FormGroup;
  private destroy: Subject<void>;
  public spark: SparkAnEmployee;
  /** isFileDeletable is created for show/hide delete icon locally on add attachment */
  public isFileDeletable: boolean;
  public isDisabledSubmitBtn: boolean;
  public fileName: string;
  public pageTitle: string;
  public sendSpark: boolean;
  public isShowCheckbox: boolean = false;
  public hideRadioButton: boolean;

  constructor(
    private formPresenter: SparkFormPresenter,
    @Inject(MAT_DIALOG_DATA) public data: SparkAnEmployee,
    public changeDetection: ChangeDetectorRef,
    public overlay: Overlay,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private toasterService: ToasterService,
  ) {
    this._classifications = [];
    this.isFileDeletable = false;
    this.isDisabledSubmitBtn = false;
    this.destroy = new Subject();
    this.currentSparkAnEmployee = this.globalResponseHandlerService.getSparkAnEmployee();
    this.sendSpark = this.currentSparkAnEmployee.sendSpark;
    this.initSparkObject(data);
    this.getClassificationsCategories();
  }

  ngOnInit() {
    this.formPresenter.deleteAttachment$.pipe(takeUntil(this.destroy)).subscribe((spark: SparkAnEmployee) => {
      this.deletedFile();
      this.spark.isPreviewFile = false;
      this.deleteFile.emit(true);
    });

    this.formPresenter.deleteFile$.pipe(takeUntil(this.destroy)).subscribe((spark: boolean) => {
      this.deletedFile();
    });

    this.formPresenter.addAttachment$.pipe(takeUntil(this.destroy)).subscribe((object: AddAttachment) => {
      this.fileName = object.fileName;
      if (!!object.fileName && (object.isCloudUrl || !object.isCloudUrl)) {
        this.isFileDeletable = true;
      }
      if (object.fileName === '' && object.isCloudUrl) {
        this.isFileDeletable = false;
      }
      this.changeDetection.detectChanges();
      this.inputElement.nativeElement.focus();
    });

    this.formPresenter.confirmEvent$.pipe(takeUntil(this.destroy)).subscribe((spark: SparkAnEmployee) => {
      this.confirm.emit(spark);
      this.inputElement.nativeElement.focus();
    });


    this.formPresenter.failedApi$.pipe(takeUntil(this.destroy)).subscribe((isFailed: boolean) => {
      this.isDisabledSubmitBtn = false;
    });
  }

  private initSparkObject(spark) {
    if (spark) {
      this.pageTitle = SparkAction.edit;
      this.spark = spark;
      this.hideRadioButton = this.spark.categoryId === AccoladeCategoryId ? true : false;
      this.fileName = this.formPresenter.getFileName(this.spark);
    } else {
      this.pageTitle = `${SparkAction.add} for ${this.currentSparkAnEmployee.firstName} ${this.currentSparkAnEmployee.lastName}`;
      this.isShowCheckbox = true;
      this.spark = new SparkAnEmployee();
    }
    this.sparkAnForm = this.formPresenter.bindControlValue(this.spark);
  }

  public getClassificationsCategories(): void {
    const ClassificationsCategories: ClassificationsCategories = this.formPresenter.getClassificationsCategories();
    if (ClassificationsCategories) {
      this.classificationsRespose = groupByArray(ClassificationsCategories.classifications, 'categoryId');
      this._categories = ClassificationsCategories.categories;
      this.getClassificationList();
    }
  }

  private deletedFile(): void {
    this.fileName = '';
    this.isFileDeletable = false;
    this.changeDetection.detectChanges();
    this.inputElement.nativeElement.focus();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Create function bind error-class on dorpdown field.
   */
  public isDropdownValid(field: string): string {
    return this.formPresenter.isDropdownValid(field, this.sparkAnForm);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 04-09-2019
   * Description : Create function file-preview.
   */
  public preview(): void {
    this.formPresenter.previewModel(this.spark);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 04-09-2019
   * Description : Delete locally previously uploaded attachment.
   */
  public deleteAttachment(): void {
    this.formPresenter.deleteModal();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 04-09-2019
   * Description : Clock event for Add/update spark.
   */
  public save(): void {
    this.isDisabledSubmitBtn = true;
    this.formPresenter.saveSpark(this.spark);
  }

  private ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  openCustomFileChooser() {
    this.formPresenter.openCustomFileChooser()
  }

  public focusOnClassification(event): void {
    const categoryControl = this.sparkAnForm.get('categoryId').value;
    if (!categoryControl) {
      this.toasterService.pop(Error_Type, Error_Title, 'Please select category.');
    }
  }

  public onChangeCategory(event): void {
    this._classifications = [];
    this.sparkAnForm.get('classificationId').patchValue(0);
    this.getClassificationList();
    this.sparkAnForm = this.formPresenter.onChangeCategory(event, this.sparkAnForm);
    this.hideRadioButton = parseInt(this.sparkAnForm.value.sparkPrivacy) === 1 ? true : false;
  }

  public isCheckedPublicRadioButton(id: number): boolean {
    return this.formPresenter.isCheckedPublicRadioButton(id, this.sparkAnForm);
  }

  private getClassificationList() {
    const categoryId = this.sparkAnForm.get('categoryId').value;
    if (parseInt(categoryId) === PerformanceId || parseInt(categoryId) === AttitudeId
      || parseInt(categoryId) === MaintenanceId || parseInt(categoryId) === GeneralId) {
      this._classifications = [...this.classificationsRespose[0], ...this.classificationsRespose[1]];
    } else if (parseInt(categoryId) === RecognitionWallId) {
      this._classifications = [...this.classificationsRespose[0], ...this.classificationsRespose[parseInt(categoryId)]];
    } else {
      this._classifications = [];
    }
  }
}
