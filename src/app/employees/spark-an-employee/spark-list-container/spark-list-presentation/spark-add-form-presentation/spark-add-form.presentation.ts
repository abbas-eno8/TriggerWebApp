import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { SparkAnEmployee, Category, AddAttachment, ClassificationsCategories, AccoladeCategoryId } from '../../../spark-an-employee-model';
import { SparkFormPresenter } from '../spark-form-presenter/spark-form-presenter';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToasterService } from 'angular2-toaster';
// -------------------------------------------- //
import { LoaderService } from '../../../../../core/loader/loader.service';
import { groupByArray } from '../../../../../core/utility/utility';
import { AttitudeId, Error_Title, Error_Type, GeneralId, MaintenanceId, PerformanceId, RecognitionWallId } from '../../../../../core/magic-string/common.model';
import { SparkAnEmployeeAdapter } from '../../../spark-an-employee-adapter/spark-an-employee-adapter';
import { GlobalEventsManager } from '../../../../../core/navbar/globalEventsManager';
import { GlobalResponseHandlerService } from '../../../../../core/global-response-handler/global-response-handler';

@Component({
  selector: 'trigger-spark-add-form',
  templateUrl: './spark-add-form.presentation.html',
  styleUrls: ['./spark-add-form.presentation.scss'],
  preserveWhitespaces: true
})

export class SparkAddFormPresentation implements OnInit {

  public _classifications: SparkAnEmployee[];
  public classificationsRespose: any;
  public _categories: Category[];
  public sparkAnForm: FormGroup;
  public spark: SparkAnEmployee;
  public fileName: string;
  public isDisabledSubmitBtn: boolean;
  public hideRadioButton: boolean;
  private destroy: Subject<void>;

  confirm = new EventEmitter();
  deleteFile = new EventEmitter();
  public sendSpark: boolean;

  constructor(
    private formPresenter: SparkFormPresenter,
    public changeDetection: ChangeDetectorRef,
    private globalEventsManager: GlobalEventsManager,
    private loaderService: LoaderService,
    private adapter: SparkAnEmployeeAdapter,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private toasterService: ToasterService
  ) {
    this._classifications = [];
    this.destroy = new Subject();
    this.isDisabledSubmitBtn = false;
    this.spark = new SparkAnEmployee();
    this.getClassificationsCategories();
    let premission = this.globalResponseHandlerService.getSparkAnEmployee();
    this.sendSpark = premission.sendSpark;
    this.sparkAnForm = this.formPresenter.bindControlValue(this.spark);
    this.globalEventsManager.resetForm.subscribe((isTrue) => {
      if (isTrue) {
        this.reset();
        this.loaderService.emitIsLoaderShown(false);
        this.isDisabledSubmitBtn = false;
      }
    })
  }

  ngOnInit() {
    this.formPresenter.deleteAttachment$.pipe(takeUntil(this.destroy)).subscribe((spark: SparkAnEmployee) => {
      this.fileName = '';
      this.changeDetection.detectChanges();
      this.deleteFile.emit(true);
    });

    this.formPresenter.deleteFile$.pipe(takeUntil(this.destroy)).subscribe((spark: boolean) => {
      this.fileName = '';
      this.spark.cloudFilePath = '';
      this.changeDetection.detectChanges();
    });

    this.formPresenter.addAttachment$.pipe(takeUntil(this.destroy)).subscribe((object: AddAttachment) => {
      this.fileName = object.fileName;
      this.changeDetection.detectChanges();
    });

    this.formPresenter.confirmEvent$.pipe(takeUntil(this.destroy)).subscribe((spark: SparkAnEmployee) => {
      let obj = this.adapter.toRequest(spark);
      this.confirm.emit(obj);
      this.isDisabledSubmitBtn = false;
    });

    this.formPresenter.failedApi$.pipe(takeUntil(this.destroy)).subscribe((isFailed: boolean) => {
      this.isDisabledSubmitBtn = false;
      this.changeDetection.detectChanges();
    });
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 18-11-2019
   * Description : Create function bind error-class on dorpdown field.
   */
  getClassificationsCategories() {
    const ClassificationsCategories: ClassificationsCategories = this.formPresenter.getClassificationsCategories();
    if (ClassificationsCategories) {
      this.classificationsRespose = groupByArray(ClassificationsCategories.classifications, 'categoryId');
      this._categories = ClassificationsCategories.categories;
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 11-06-2019
   * Description : Create function bind error-class on dorpdown field.
   */
  public isDropdownValid(field: string): string {
    return this.formPresenter.isDropdownValid(field, this.sparkAnForm);
  }

  public openCustomFileChooser(): void {
    this.formPresenter.openCustomFileChooser()
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 04-09-2019
   * Description : Delete locally previously uploaded attachment.
   */
  public deleteAttachment(): void {
    this.formPresenter.deleteModal();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 04-09-2019
   * Description : Clock event for Add/update spark.
   */
  public save(): void {
    this.isDisabledSubmitBtn = true;
    this.formPresenter.saveSpark(this.spark);
  }

  public reset(): void {
    this.fileName = '';
    this.spark = new SparkAnEmployee();
    this.sparkAnForm = this.formPresenter.bindControlValue(this.spark);
    this.formPresenter.resetFields();
    this.hideRadioButton = false;
    //this.changeDetection.detectChanges();
  }

  public focusOnClassification(event): void {
    const categoryControl = this.sparkAnForm.get('categoryId').value;
    if(!categoryControl) {
      this.toasterService.pop(Error_Type, Error_Title, 'Please select category.');
    }
  }

  public onChangeCategory(event): void {
    const categoryId = this.sparkAnForm.get('categoryId').value;
    if (parseInt(categoryId) === PerformanceId || parseInt(categoryId) === AttitudeId
      || parseInt(categoryId) === MaintenanceId || parseInt(categoryId) === GeneralId) {
      this._classifications = [...this.classificationsRespose[0], ...this.classificationsRespose[1]];
    } else if (parseInt(categoryId) === RecognitionWallId) {
      this._classifications = [...this.classificationsRespose[0], ...this.classificationsRespose[parseInt(categoryId)]];
    }
    this.sparkAnForm = this.formPresenter.onChangeCategory(event, this.sparkAnForm);
    this.hideRadioButton = parseInt(this.sparkAnForm.value.sparkPrivacy) === 1 ? true : false;
  }

  public isCheckedPublicRadioButton(id: number): boolean {
    return this.formPresenter.isCheckedPublicRadioButton(id, this.sparkAnForm);
  }

  private ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
