import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { DimensionElemet, EmployeeList } from '../../survey.model';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CustomLoaderService } from '../../../core/custom-loader/custom-loader.service';
import { ToasterService } from 'angular2-toaster';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class SelectDimensionPresenter {
  /** This property is used for emit when save-survey.  */
  private getEmployees: Subject<DimensionElemet> = new Subject();
  getEmployeeList$: Observable<DimensionElemet> = this.getEmployees.asObservable()

  public employeeResponse: BehaviorSubject<EmployeeList[]> = new BehaviorSubject<EmployeeList[]>(null);
  public empResponse: Observable<EmployeeList[]> = this.employeeResponse.asObservable();

  public selectedIdArray: any;
  constructor(private customLoaderService: CustomLoaderService,
    private toasterService: ToasterService,
    private globalResponseHandlerService: GlobalResponseHandlerService) {

  }

  getEmployeesData(selectedDimension: number, dimensionElement) {
    this.customLoaderService.setLoaderStatus(true);
    let dimensionObj: DimensionElemet;
    // let dimensionId = dimensionElement;
    dimensionObj = {
      dimensionId: selectedDimension,
      dimensionElementString: dimensionElement
    }
    this.getEmployees.next(dimensionObj);
  }

  removeFromArray(dimensionElementId, mainEmployeeList) {
    let empList = mainEmployeeList.filter(e => e.dimensionElementId !== dimensionElementId);
    return empList;
  }

  checkAndMergeArray(mainEmployeeList, employeeList) {
    this.customLoaderService.setLoaderStatus(false);
    if (JSON.stringify(employeeList) !== JSON.stringify(mainEmployeeList)) {
      mainEmployeeList = mainEmployeeList.concat(employeeList);
      mainEmployeeList = _.uniq(mainEmployeeList, _.property('empId'));
      
    }
    return mainEmployeeList;
  }

  setEmpListBasedOnFormData(mainEmployeeList, employeeList, formData) {
    this.customLoaderService.setLoaderStatus(false);
    let empList = [];
    let existingSelection = formData.surveyTeamMembers;
   
    empList = _.uniq(employeeList, _.property('empId'));

    empList.forEach(element => {
      element.isChecked = false;
    });

    empList.forEach(emp => {
      let isExistObject = existingSelection.filter(c => (c.empId === emp.empId));
      if (isExistObject.length === 1) {
        emp.isChecked = true;
      }
    });
    return empList;
  }

  close() {
    this.employeeResponse.next(null);
  }

  saveObject(dimensionElement, mainEmployeeList, selectedDimension) {
    let selectionObj: any;
    this.selectedIdArray = [];
    dimensionElement.forEach(element => {
      if (element.isChecked) {
        let slectedObj = {
          dimensionId: selectedDimension,
          dimensionElementId: element.id,
          // createdby: this.globalResponseHandlerService.getUser().userId
        }
        this.selectedIdArray.push(slectedObj)
      }
    });
    let selectedEmpArray = []
    mainEmployeeList.forEach(element => {
      if (element.isChecked) {
        let obj = {
          empId: element.empId
        }
        selectedEmpArray.push(obj)
      }
    });

    if (this.selectedIdArray.length > 0) {
      if (selectedEmpArray.length > 0) {
        this.employeeResponse.next(null);
        selectionObj = {
          selectedDimensionElementArray: this.selectedIdArray,
          empArray: selectedEmpArray
        }
        return selectionObj;
      } else {
        this.toasterService.pop('error', 'Error', 'Please select atleast one Team Member.');
      }
    } else {
      this.toasterService.pop('error', 'Error', 'Please select atleast one dimension element.');
    }

  }

  getDimensionData(surveyMasterData, selectedDimension, formData, isLoadFirstTime) {
    let dimensionArray = [];
    if (selectedDimension === 1) {
      dimensionArray = JSON.parse(JSON.stringify(surveyMasterData.roleList)); // [...this.surveyMasterData.roleList];
    } else if (selectedDimension === 3) {
      dimensionArray = JSON.parse(JSON.stringify(surveyMasterData.departmentList)); //[...this.surveyMasterData.departmentList];
    } else {
      dimensionArray = JSON.parse(JSON.stringify(surveyMasterData.teamList)); //[...this.surveyMasterData.teamList];
    }
    if (isLoadFirstTime) {
      dimensionArray.forEach(element => {
        let isExistObject = formData.surveySetOfUserConfiguration.filter(c => (c.dimensionElementId === element.id))
        if (isExistObject.length === 1) {
          element.isChecked = true;
        }
      });
    }

    return dimensionArray;
  }

  getDimensionElementById(formData) {
    let ArrayOfSelectedId = [];
    formData.surveySetOfUserConfiguration.forEach(element => {
      ArrayOfSelectedId.push(element.dimensionElementId);
    });

    let stringOfArray = ArrayOfSelectedId.join();
    this.getEmployeesData(formData.surveySetOfUserConfiguration[0].dimensionId, stringOfArray)

  }
}
