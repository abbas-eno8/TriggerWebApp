import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListPresenter } from '../../../shared/components/list-presentation/list-presenter/list.presenter';
import { CustomLoaderService } from '../../../core/custom-loader/custom-loader.service';
import { CommonDimensionType, GroupSparkAdditionalFilterType } from '../../spark.model';
// ---------------------------------------------- //
import { GroupSparkListPresenter } from '../group-spark-list-presenter/group-spark-list.presenter';
import { filter } from 'underscore';

@Component({
  selector: 'trigger-group-spark-list-presentation-ui',
  templateUrl: './group-spark-list-presentation.component.html',
  styleUrls: ['./group-spark-list-presentation.component.scss'],
  viewProviders: [GroupSparkListPresenter],
})
export class GroupSparkListPresentationComponent implements OnInit {
  /** This property is used for get data from container component */
  @Input() public set employeeList(value: any) {
    if (value) {
      this.showLoader = false;
      // this.groupSparkListPresenter.setFilterEmployeeData(value);
      this._teamMember = value;
    }
  }
  public get employeeList(): any {
    return this._teamMember;
  }

  /** sparkFilterData */
  @Input() public sparkFilterData: any;
  /** formData */
  @Input() public formData: any;
  @Input() public selectedDimension: GroupSparkAdditionalFilterType;

  @Input() public mainEmployeeList: any;
  /** Submit Group Spark */
  @Output() public saveSpark: EventEmitter<any>;
  /** Cancel Group Spark */
  @Output() public cancelSpark: EventEmitter<any>;
  @Output() public getTeamMember: EventEmitter<any>;
  @Output() public employeeCheckBoxCheckList: EventEmitter<any>
  public showLoader: boolean;
  public dimensionElement: CommonDimensionType[];
  public searchText: string = '';
  public isSelectedAll: boolean;
  public filterArray: any;
  // public mainEmployeeList: EmployeeList[];
  // public mainEmployeeList: any;
  private _teamMember: any;

  constructor(
    public listPresenter: ListPresenter,
    private groupSparkListPresenter: GroupSparkListPresenter,
    private customLoaderService: CustomLoaderService,
  ) {
    this.filterArray = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
      'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z'];
    // this.mainEmployeeList = [];
    this.saveSpark = new EventEmitter();
    this.cancelSpark = new EventEmitter();
    this.getTeamMember = new EventEmitter();
    this.employeeCheckBoxCheckList = new EventEmitter();
    this.showLoader = false;
    this.groupSparkListPresenter.getTeamMember$.subscribe((res) => {
      this.getTeamMember.emit(res);
    });
  }

  public ngOnInit() {
    // this.checkAndSetData();
  }

  // public changeDimension(selectedDimension): void {
  //   this.selectedDimension = parseInt(selectedDimension);
  //   this.dimensionElement = [];
  //   this.employeeList = [];
  //   this.isSelectedAll = null;
  //   this.dimensionElement = this.groupSparkListPresenter.getDimensionData(this.sparkFilterData,
  //     this.selectedDimension, this.formData, false);
  // }

  public onCheck(isChecked: boolean, index: number): void {
    this.isSelectedAll = null;
    this.sparkFilterData[index].isChecked = isChecked;
    this.employeeList = [];
    this.showLoader = true;
    this.isSelectedAll = null;
    // this.searchText = 'All';
    this.groupSparkListPresenter.getEmployeesList(this.selectedDimension.dimensionId, this.sparkFilterData[index].id, isChecked);

  }

  public onCheckEmployee(isChecked: boolean, ind: number, employee: any) {
    // this.employeeList[ind].isChecked = isChecked;
    this.isSelectedAll = null;
    this.employeeList.map((e: any) => {
      if (e.empId === employee.empId) {
        e.isChecked = isChecked;
      }
    });
    this.employeeCheckBoxCheckList.emit(this.groupSparkListPresenter.filterEmployeeData(employee, isChecked));
  }

  public save(): void {

    const newEmployeeList = this.groupSparkListPresenter.employeeList;
    this.saveSpark.emit(newEmployeeList);
  }

  public close(): void {
    this.cancelSpark.emit(true);
  }

  public changeRadioSelect(isChecked: string) {
    this.employeeCheckBoxCheckList.emit(this.groupSparkListPresenter.changeRadioSelect(isChecked, this.employeeList, this.searchText));
  }

  public onFilter(searchText) {
    this.searchText = searchText;
    this.isSelectedAll = null;
  }

  private checkAndSetData(): void {
    // this.selectedDimension = 2;
    this.dimensionElement = JSON.parse(JSON.stringify(this.sparkFilterData[0].dimensionElements));
  }
}
