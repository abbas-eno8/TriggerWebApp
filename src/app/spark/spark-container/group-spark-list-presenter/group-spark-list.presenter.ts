import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// ---------------------------------------------------------- //
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { UserModel } from '../../../core/model/user';
import { DimensionElemet } from '../../../survey/survey.model';

@Injectable()
export class GroupSparkListPresenter {

  /** This property is used for emit when save-survey.  */
  public selectedDimension$: Observable<DimensionElemet>;
  private selectedDimension: Subject<DimensionElemet>;
  /** This property is used for emit employee list.  */


  public getTeamMemberList$: Observable<any>;
  public employeeList: any;
  public getTeamMemberList: Subject<any>;
  public getTeamMember$: Observable<any>;
  public getTeamMember: Subject<any>;
  private userData: UserModel;
  private dimensionValues: any;

  constructor(
    private globalResponseHandlerService: GlobalResponseHandlerService,
  ) {
    this.userData = this.globalResponseHandlerService.getUser();
    this.selectedDimension = new Subject();
    this.selectedDimension$ = this.selectedDimension.asObservable();
    this.getTeamMemberList = new Subject();
    this.getTeamMemberList$ = this.getTeamMemberList.asObservable();
    this.getTeamMember = new Subject();
    this.getTeamMember$ = this.getTeamMember.asObservable();
    this.dimensionValues = [];
    this.employeeList = [];
  }

  getDimensionData(sparkFilterData, selectedDimension, formData, isLoadFirstTime) {
    let dimensionArray = [];
    if (selectedDimension === 2) {
      dimensionArray = JSON.parse(JSON.stringify(sparkFilterData[0].dimensionElements)); // [...this.surveyMasterData.roleList];
    } else if (selectedDimension === 3) {
      dimensionArray = JSON.parse(JSON.stringify(sparkFilterData[1].dimensionElements)); //[...this.surveyMasterData.departmentList];
    } else {
      dimensionArray = JSON.parse(JSON.stringify(sparkFilterData[2].dimensionElements)); //[...this.surveyMasterData.teamList];
    }

    return dimensionArray;
  }

  public getEmployeesList(selectedDimension: any, dimensionElement: any, isChecked: boolean) {
    let dimensionObj: DimensionElemet;
    dimensionObj = {
      dimensionId: selectedDimension,
      dimensionElementString: dimensionElement
    }
    if (isChecked) {
      this.dimensionValues.push(dimensionElement)
    }
    else {
      const index: number = this.dimensionValues.indexOf(dimensionElement);
      if (index !== -1) {
        this.dimensionValues.splice(index, 1);
      }
    }
    this.getEmployee(selectedDimension, this.dimensionValues.join(','));
    // this.selectedDimension.next(dimensionObj);
  }

  public filterEmployeeData(employee: any, isChecked: boolean): void {
    const isEmployee: boolean = this.employeeList.find((e) => e.empId === employee.empId) ? false : true;
    if (isEmployee) {
      this.employeeList.push(employee);
    }

    // else {
    //   this.employeeList.forEach((element: any, index: number) => {
    //     if (element.empId === employee.empId && !employee.isChecked) {
    //       delete this.employeeList[index];
    //     }
    //   });
    // }
    return this.employeeList;
  }

  public removeFromArray(dimensionElementId, mainEmployeeList) {
    const empList: number[] = mainEmployeeList.filter((e: any) => e.dimensionElementId !== dimensionElementId);
    return empList;
  }

  public setFilterEmployeeData(employeeList): any {
    const newEmployee = [...this.employeeList, ...employeeList];
    const employeeCheckList = newEmployee.filter((e: any) => e.isChecked === true);

    this.employeeList = newEmployee.filter(o1 => !employeeCheckList.some(o2 => o1.empId === o2.empId))
    // this.employeeList = newEmployee.filter((e: any) => e.isChecked === true);
  }

  public changeRadioSelect(isChecked: string, employeeList, searchText: string) {
    /**  */
    if (searchText !== '') {
      employeeList = employeeList.filter((e) => searchText.toLowerCase() === e.firstName
        .charAt(0).toLowerCase());
    }
    /** */
    employeeList.map((e: any) => {
      e.isChecked = isChecked === 'true' ? true : false;
    });

    const ids = employeeList.map(o => o.employeeId)
    /** check duplicates  */
    const filtered = employeeList.filter(({ employeeId }, index) => !ids.includes(employeeId, index + 1))

    return this.employeeList = filtered;
  }

  private getEmployee(dimensionId: number, dimensionValues: number): void {
    const obj: any = {
      clientId: this.userData.clientId,
      empId: this.userData.empId, dimensionId, dimensionValues
    };
    this.getTeamMember.next(obj);
    // this.getTeamMemberList.next(obj);
  }
}
