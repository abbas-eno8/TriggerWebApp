import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { SurveyTypeMaster, CommonDimensionType, DimensionElemet, EmployeeList } from '../../survey.model';
import { CustomLoaderService } from '../../../core/custom-loader/custom-loader.service';
import { SelectDimensionPresenter } from '../select-dimension-presenter/select-dimension-presenter';

@Component({
  selector: 'trigger-select-dimension',
  templateUrl: './select-dimension.component.html',
  styleUrls: ['./select-dimension.component.scss']
})
export class SelectDimensionComponent implements OnInit {
  @Input() surveyMasterData: SurveyTypeMaster;
  @Input() formData: any;
  @Output() saveSelection: EventEmitter<object>;
  @Output() cancel: EventEmitter<boolean>;
  public employeeList: EmployeeList[];
  public selectedDimension: number;
  public dimensionElement: CommonDimensionType[];
  public roleList: CommonDimensionType[];
  public showLoader: boolean;
  public mainEmployeeList: EmployeeList[];
  public isEditAndLoadFirst: boolean;
  constructor(
    private customLoaderService: CustomLoaderService,
    private changeDetector: ChangeDetectorRef,
    private selectDimensionPresenter: SelectDimensionPresenter
  ) {
    this.saveSelection = new EventEmitter();
    this.cancel = new EventEmitter();
    this.mainEmployeeList = [];
    this.employeeList = [];

    this.getCustomLoaderStatus()
    this.selectDimensionPresenter.empResponse.subscribe((empList) => {
      this.employeeList = empList;
      if(this.isEditAndLoadFirst){
        this.setEmpListBasedOnFormData();
      } else {
        this.checkAndAddListInArray()
      }
    })
  }

  ngOnInit() {
    this.checkAndSetData();
  }

  checkAndSetData() {
    if (!!this.formData.surveySetOfUserConfiguration && this.formData.surveySetOfUserConfiguration.length > 0) {
      this.isEditAndLoadFirst = true;
      this.selectedDimension = this.formData.surveySetOfUserConfiguration[0].dimensionId;
      this.selectDimensionPresenter.getDimensionElementById(this.formData)
      this.dimensionElement = this.selectDimensionPresenter.getDimensionData(this.surveyMasterData, this.selectedDimension,this.formData,true)
    } else {
      this.selectedDimension = 1;
      this.dimensionElement = JSON.parse(JSON.stringify(this.surveyMasterData.roleList));
    }

  }

  setEmpListBasedOnFormData(){
    this.isEditAndLoadFirst = false;
    if (this.employeeList) {
      this.mainEmployeeList = this.selectDimensionPresenter.setEmpListBasedOnFormData(this.mainEmployeeList, this.employeeList,this.formData)
    }
  }

  checkAndAddListInArray() {
    if (this.employeeList) {
      this.mainEmployeeList = this.selectDimensionPresenter.checkAndMergeArray(this.mainEmployeeList, this.employeeList)
    }
  }

  getCustomLoaderStatus() {
    this.showLoader = false;
    this.customLoaderService.isCustomLoaderShow.subscribe(
      (isShown) => {
        this.showLoader = isShown;
        this.changeDetector.detectChanges(); // If not added causes change in value error.
      });
  }

  save() {
    let selectionObj = this.selectDimensionPresenter.saveObject(this.dimensionElement, this.mainEmployeeList, this.selectedDimension);
    if (!!selectionObj) {
      this.saveSelection.emit({ selectionObj })
    }

  }

  closeModal(): void {
    this.selectDimensionPresenter.close();
    this.cancel.emit(true)
  }

  changeDimension(selectedDimension) {
    this.selectedDimension = parseInt(selectedDimension);
    this.selectDimensionPresenter.employeeResponse.next(null);
    this.mainEmployeeList = [];
    this.dimensionElement = [];
    this.dimensionElement = this.selectDimensionPresenter.getDimensionData(this.surveyMasterData, this.selectedDimension,this.formData,false)

  }

  public onCheck(isChecked: boolean, index: number): void {
    this.dimensionElement[index].isChecked = isChecked;
    if (isChecked) {
      this.selectDimensionPresenter.getEmployeesData(this.selectedDimension, this.dimensionElement[index].id)
    } else {
      this.mainEmployeeList = this.selectDimensionPresenter.removeFromArray(this.dimensionElement[index].id, this.mainEmployeeList)
    }
  }

  public onCheckEmployee(isChecked: boolean, index: number): void {
    this.mainEmployeeList[index].isChecked = isChecked;
  }

}
