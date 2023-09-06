/**
 * @author Shahbaz Shaikh
 * @description SparkPresentationComponent
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';
// ---------------------------------------------------------- //
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
import {
  AttitudeId, Error_Title, Error_Type,
  GeneralId, MaintenanceId, PerformanceId, RecognitionWallId
} from '../../../core/magic-string/common.model';
import { TeamMembers } from '../../../employees/team-member/team-member-model';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { LoaderService } from '../../../core/loader/loader.service';
import { groupByArray } from '../../../core/utility/utility';
import { AddAttachment, BaseResponse, Category, Classification, GroupSparkAdditionalFilter, GroupSparkAdditionalFilterType, SparkAnEmployee } from '../../spark.model';
import { SparkPresenter } from '../spark-presenter/spark-presenter';

@Component({
  selector: 'trigger-spark-presentation-ui',
  templateUrl: './spark-presentation.component.html',
  viewProviders: [SparkPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SparkPresentationComponent implements OnInit, OnDestroy {

  /** This property is used for get data from container component */
  @Input() public set baseResponse(value: BaseResponse) {
    if (value) {
      this._baseResponse = value;
      // this.teamMember = this.getTeamMember(this._baseResponse.teamMember);
      this.categories = this._baseResponse.categories;
      this.classificationsResponse = groupByArray(this._baseResponse.classifications, 'categoryId');
    }
  }
  public get baseResponse(): BaseResponse {
    return this._baseResponse;
  }

  /** This property is used for get data from container component */
  @Input() public set emailContent(value: string) {
    if (value) {
      this.sparkPresenter.employeeIdList = [];
      this.sparkPresenter.oldEmployee = [];
      this._emailContent = value;
      this.openMailBox();
    }
  }
  public get emailContent(): string {
    return this._emailContent;
  }

  /** This property is used for get data from container component */
  @Input() public set sparkFilterData(value: any) {
    if (value) {
      this._sparkFilterData = value;

    }
  }
  public get sparkFilterData(): any {
    return this._sparkFilterData;
  }

  /** This property is used for get data from container component */
  @Input() public set teamMember(value: any) {
    if (value) {
      this.sparkPresenter.teamMemberList.next(value)
      this._teamMember = value;
    }
  }
  public get teamMember(): any {
    return this._teamMember;
  }


  @Input() public set teamMemberList(value: any) {
    if (value) {
      this._allTeamMemberList = value;
      this.allTeamMemberList = this.sparkPresenter.getCustomTeamMember(value);
    }
  }
  public get teamMemberList(): any {
    return this._allTeamMemberList;
  }
  /** */


  /**  Event emitter is used for emit data to container component */
  @Output() public saveSpark: EventEmitter<SparkAnEmployee>;
  /**  Event emitter is used for emit data to container component */
  @Output() public sendMail: EventEmitter<boolean>;
  @Output() public getTeamMemberList: EventEmitter<any>;

  /** Public Property */
  /** Store the team-members list */
  // public teamMember: TeamMembers[];
  /** Store the categories */
  public categories: Category[];
  /** store the classifications group response */
  public classificationsResponse: any;
  /** Store the classification */
  public classifications: Classification[];
  /** Store the spark form */
  public sparkAnForm: FormGroup;
  /** Store the spark object */
  public sparkObj: SparkAnEmployee;
  /** Store the attchement file name */
  public fileName: string;
  /** Wether radio button show or not */
  public hideRadioButton: boolean;
  /** Wether check submit button disable or not */
  public isDisabledSubmitBtn: boolean;
  /** Wether sendSpark button show or not */
  public sendSpark: boolean;
  public newTeamMember: any;
  public sparkAdditionalFilterType: GroupSparkAdditionalFilterType[];
  public isDarkTheme: boolean;
  public themeEmitter: any;
  public allTeamMemberList: any;
  /** Private property */
  /** Store the destroy subject */
  private destroy: Subject<boolean>;
  /** Store the spark details */
  private _emailContent: string;
  /** Wether check open or not */
  private isOpen: boolean;
  /** Store the base response */
  private _baseResponse: BaseResponse;
  /** sparkFilterData */
  private _sparkFilterData: any;
  private _teamMember: any
  private _allTeamMemberList: any
  constructor(
    private sparkPresenter: SparkPresenter,
    private cdr: ChangeDetectorRef,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private globalEventsManager: GlobalEventsManager,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
  ) {
    this.initProp();
  }

  public ngOnInit() {
    this.afterInitProp();
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 21-09-2012
   * Description : Create function bind error-class on select-dorpdown field.
   * @param field Get the field
   */
  public isSelectDropdownValid(field: string): string {
    return this.sparkPresenter.isSelectDropdownValid(field);
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 14-09-2021
   * Description : Create function bind error-class on dorpdown field.
   * @param field Get the field
   */
  public isDropdownValid(field: string): string {
    return this.sparkPresenter.isDropdownValid(field, this.sparkAnForm);
  }

  /**
   * Author : Shahbaz Shaikh
   * Description: Open file choose popup
   */
  public openCustomFileChooser(): void {
    this.sparkPresenter.openCustomFileChooser();
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 15-09-2021
   * Description : Delete locally previously uploaded attachment.
   */
  public deleteAttachment(): void {
    this.sparkPresenter.deleteModal();
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Share spark public or not
   * @param id Get the id
   * @returns 
   */
  public isCheckedPublicRadioButton(id: number): boolean {
    return this.sparkPresenter.isCheckedPublicRadioButton(id, this.sparkAnForm);
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : When change the category as per category showing the classification list
   * @param event 
   */
  public onChangeCategory(event): void {
    const categoryId = this.sparkAnForm.get('categoryId').value;
    this.sparkAnForm.get('classificationId').patchValue(0);
    if (parseInt(categoryId) === PerformanceId || parseInt(categoryId) === AttitudeId
      || parseInt(categoryId) === MaintenanceId || parseInt(categoryId) === GeneralId) {
      this.classifications = [...this.classificationsResponse[0], ...this.classificationsResponse[1]];
    } else if (parseInt(categoryId) === RecognitionWallId) {
      this.classifications = [...this.classificationsResponse[0], ...this.classificationsResponse[parseInt(categoryId)]];
    } else {
      this.classifications = [];
    }
    this.sparkAnForm = this.sparkPresenter.onChangeCategory(parseInt(event.target.value), this.sparkAnForm);
    this.hideRadioButton = parseInt(this.sparkAnForm.value.sparkPrivacy) === 1 ? true : false;
  }

  /**
   * Author: Shahbaz Shaikh
   * Description: Check the select category validation 
   * @param event 
   */
  public focusOnClassification(event): void {
    const categoryControl = this.sparkAnForm.get('categoryId').value;
    if (!categoryControl) {
      this.toasterService.pop(Error_Type, Error_Title, 'Please select category.');
    }
  }


  public openGroupSpark(dimensionId: any): void {
    if (dimensionId !== 0) {
      const selectedFilter = this.sparkAdditionalFilterType.find((data) => data.dimensionId === dimensionId)
      this.sparkPresenter.openGroupSparkModal(this.sparkPresenter.getDimensionData(this.sparkFilterData, selectedFilter.dimensionValues), selectedFilter);
    }
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 23-09-2021
   * Description : Create function for custom searching on teams managers/members.
   */
  public customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.fullName.split(' ')[0].toLowerCase().includes(term) || item.fullName.toLowerCase().includes(term);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 04-09-2019
   * Description : Clock event for Add/update spark.
   */
  public save(): void {
    this.isDisabledSubmitBtn = true;
    this.sparkPresenter.saveSpark(this.sparkObj);
  }

  /**
   * Reset Form
   */
  public reset(): void {
    this.resetForm();
  }

  /**
   * Get the team-memer list and set the fullname
   * @param teamMemberList Get the Team Member list
   * @returns 
   */
  public getTeamMember(teamMemberList): TeamMembers[] {
    let teamMember = !!teamMemberList && teamMemberList.map((item) => {
      item.fullName = item.firstName + ' ' + item.lastName;
      item.selectAll = 'SELECT ALL';
      item.checked = false;
      return item;
    });
    return teamMember;
  }

  public removeEmployeeList(employeeId: number) {
    this.newTeamMember = this.sparkPresenter.removeEmployee(employeeId);
  }

  /** Open Mail Box */
  private openMailBox(): void {
    if (this._emailContent !== '' && this.isOpen) {
      this.isOpen = false;
      this.sparkPresenter.openMailConfiramtion(this._emailContent);
    } else {
      this.resetForm();
    }
  }


  /**
   * Reset the form
   */
  private resetForm(): void {
    this.sparkObj.empIds = [];
    this.fileName = '';
    this.sparkObj.cloudFilePath = '';
    this.newTeamMember = [];
    this.sparkPresenter.resetFields();
    this.sparkAnForm = this.sparkPresenter.onChangeCategory(this.sparkObj.categoryId, this.sparkAnForm);
    this.hideRadioButton = parseInt(this.sparkAnForm.value.sparkPrivacy) === 1 ? true : false;
    this.sparkObj.sendSpark = this.sendSpark;
    this.sparkObj.categoryId = 0;
    this.sparkObj.classificationId = 0;
    this.sparkObj.dimensionId = 0;
    this.sparkAnForm.reset();
    this.sparkAnForm = this.sparkPresenter.bindControlValue(this.sparkObj);
  }

  /** After initialization job */
  private initProp(): void {
    this.classifications = [];
    this.destroy = new Subject();
    this.saveSpark = new EventEmitter<SparkAnEmployee>();
    this.sendMail = new EventEmitter<boolean>();
    this.getTeamMemberList = new EventEmitter<any>();
    this.sparkObj = new SparkAnEmployee();
    this.sparkObj.sparkBy = this.globalResponseHandlerService.getUser().empId;
    this.sparkAnForm = this.sparkPresenter.createForm();
    this.sparkAnForm = this.sparkPresenter.bindControlValue(this.sparkObj);
    this.sparkPresenter.getTeamMember$.subscribe((res: any) => {
      this.getTeamMemberList.emit(res)
    }
    );
    this.sparkAdditionalFilterType = GroupSparkAdditionalFilter;
    this.newTeamMember = [];
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }

  /** After initialization job */
  private afterInitProp(): void {
    this.globalEventsManager.closeCdkModalPopup.subscribe((isTrue) => {
      if (isTrue && this.sparkPresenter.overlayRef) {
        this.sparkPresenter.overlayRef.dispose();
        this.loaderService.emitIsLoaderShown(false);
        this.resetForm();
        this.cdr.detectChanges();
      }
    });

    this.sparkPresenter.addAttachment$.pipe(takeUntil(this.destroy)).subscribe((object: AddAttachment) => {
      this.fileName = object.fileName;
      this.cdr.detectChanges();
    });

    this.sparkPresenter.deleteFile$.pipe(takeUntil(this.destroy)).subscribe((spark: boolean) => {
      this.fileName = '';
      this.sparkObj.cloudFilePath = '';
      this.cdr.detectChanges();
    });

    this.sparkPresenter.save$.pipe(takeUntil(this.destroy)).subscribe((spark: SparkAnEmployee) => {
      this.isOpen = spark.sendSpark ? true : false;
      this.saveSpark.emit(spark);
      this.isDisabledSubmitBtn = false;
    });

    this.sparkPresenter.cancel$.pipe(takeUntil(this.destroy)).subscribe((isFailed: boolean) => {
      this.isDisabledSubmitBtn = false;
      this.cdr.detectChanges();
    });

    this.sparkPresenter.sendMail$.pipe(takeUntil(this.destroy)).subscribe((sendMail: boolean) => {
      this.sendMail.emit(sendMail);
    });

    this.sparkPresenter.cancelMail$.pipe(takeUntil(this.destroy)).subscribe((sendMail: boolean) => {
      this.resetForm();
      this.cdr.detectChanges();
    });

    this.sparkPresenter.newEmployeeList$.pipe(takeUntil(this.destroy)).subscribe((res: any) => {
      this.newTeamMember = res;
      this.cdr.detectChanges();
    });
  }

  /** destroy */
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    this.themeEmitter.unsubscribe();
  }

}
