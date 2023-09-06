import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
// --------------------------------------------------------- //
import { UserModel } from '../../../../../core/model/user';
import { Encryption } from '../../../../../core/magic-string/common-validation-model';
import { GlobalResponseHandlerService } from '../../../../../core/global-response-handler/global-response-handler';
import { ActionPermissionService, canAdd } from '../../../../../core/services/action-permission/action-permission.service';
import { Actions, Role } from '../../../../../core/magic-string/common.model';
import { StatusList, trendingIconList } from '../../../../../shared/modals/shared-model';
import { DimensionList, DimensionElementList } from '../../../../employee-model';
import { GlobalEventsManager } from '../../../../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-employee-filter-list',
  templateUrl: './employee-filter-list.component.html',
  styleUrls: ['./employee-filter-list.component.scss']
})
export class EmployeeFilterListComponent implements OnInit,OnDestroy {

  @Input() dimensionData: DimensionList[];
  @Input() departmentData: any[];
  @Input() allDepartment: any[];
  @Input() managerActionList: any[];
  @Input() scoreTitleList: any[];

  @Input() public set trendingList(value: any) {
    if (value) {
      this._trendingList = value;
      this.updatedTrendingList = this.updatedTrendingLists();
    }
  }
  public get trendingList(): any {
    return this._trendingList;
  }

  // Output cancel emitter for cancel overlay popup
  @Output() cancel: EventEmitter<boolean>;
  // Output applyFiler emitter for update value overlay popup
  @Output() applyFilter: EventEmitter<object>;

  public updatedTrendingList: any[];
  public user: UserModel;
  public isTriggerAdmin: boolean;
  public isAdditionalFilter: boolean;
  public relationArray: DimensionElementList[];
  public departmentArray: DimensionElementList[];
  public teamsArray: DimensionElementList[];
  public selectedRelation: string = '';
  public selectedDepartment: string = '';
  public selectedTeam: string = '';
  public dimensionValueid: number;
  public dimensionId: number;
  public isCheckedAttribute: boolean = false;
  public selectedDept: string;
  public empStatus: string;
  public trendingStatus: string | number;
  public managerAction: string;
  public scoreTitle: string;
  public statusList: any[];
  public isTriggerAdminOrAdmin: boolean;

  private _trendingList: any;
  private filterObj: FilterObject;
  public themeEmitter: any;
  public isDarkTheme: boolean;

  constructor(
    public fb: FormBuilder,
    private actionPermissionService: ActionPermissionService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private globalEventsManager: GlobalEventsManager,
  ) {
    this.filterObj = {
      dimensionId: 0,
      dimensionValueid: 0,
      isFilter: false
    };
    this.user = this.globalResponseHandlerService.getUser();
    this.selectedDept = '0';
    this.empStatus = '1';
    this.trendingStatus = '0';
    this.managerAction = '';
    this.scoreTitle = '';
    this.statusList = StatusList;
    this.cancel = new EventEmitter();
    this.applyFilter = new EventEmitter();
    this.isTriggerAdmin = this.user.roleId === Role.TriggerAdmin ? true : false;
    this.isAdditionalFilter = this.user.roleId === Role.TriggerAdmin || this.user.roleId === Role.Admin ? true :
      this.actionPermissionService.isCheckCommonPermission(Actions.TriggerAnEmployee, canAdd) ? true : false;
    this.isTriggerAdminOrAdmin = (this.user.roleId === Role.TriggerAdmin || this.user.roleId === Role.Admin) ? true : false;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }

  ngOnInit() {
    this.initializeData();
  }

  filterForm = this.fb.group({
    relationSelect: [''],
    departmentSelect: [''],
    teamSelect: ['']
  })

  public changeFilter(elementId, dimensionId): void {
    this.selectDeselectDimension(dimensionId);
    let elemId = parseInt(elementId);
    this.dimensionData.forEach(attribute => {
      if (attribute.dimensionId === dimensionId) {
        attribute.dimensionElements.forEach(element => {
          if (element.elementId === elemId) {
            element.checked = true
          } else {
            element.checked = false
          }
        });
      } else {
        attribute.dimensionElements.forEach(attribute => {
          attribute.checked = false
        });
      }
    });
    this.setDimenssion();
  }


  onChangeDepartment(selectedDept) {
    this.selectedDept = selectedDept;
  }

  public onSelectStatus(empStatus): void {
    this.empStatus = empStatus;
  }

  public changeManagerAction(managerAction): void {
    this.managerAction = managerAction;
  }

  public changeScoreTitle(scoreTitle): void {
    this.scoreTitle = scoreTitle;
  }

  public onSelectTrending(trending): void {
    this.trendingStatus = trending;
  }

  public onApplyFilter(): void {
    sessionStorage.setItem(Encryption.SelectedDepartment, this.selectedDept);
    sessionStorage.setItem(Encryption.SelectedEmpStatus, this.empStatus);
    sessionStorage.setItem(Encryption.ManagerAction, this.managerAction);
    sessionStorage.setItem(Encryption.ScoreTitle, this.scoreTitle);
    sessionStorage.setItem(Encryption.SelectedTrending, `${this.trendingStatus}`);

    let filterObj = JSON.parse(sessionStorage.getItem(Encryption.SelectedDimensionFilter));
    filterObj = !!filterObj ? filterObj : this.filterObj;
    this.applyFilter.emit(filterObj);
  }

  public resetFilter(): void {
    this.dimensionData.forEach(attribute => {
      // this.selectDeselectDimension(attribute.dimensionId);
      attribute.dimensionElements.forEach(element => {
        element.checked = false;
      });
    });
    this.filterForm.controls['teamSelect'].setValue('', { onlySelf: true });
    this.filterForm.controls['relationSelect'].setValue('', { onlySelf: true });
    this.filterForm.controls['departmentSelect'].setValue('', { onlySelf: true });
    this.selectedDept = '0';
    sessionStorage.setItem(Encryption.SelectedDepartment, '0');
    this.empStatus = '1';
    sessionStorage.setItem(Encryption.SelectedEmpStatus, '1');
    this.managerAction = '';
    sessionStorage.setItem(Encryption.ManagerAction, '');
    this.scoreTitle = '';
    sessionStorage.setItem(Encryption.ScoreTitle, '');
    this.trendingStatus = '0';
    sessionStorage.setItem(Encryption.SelectedTrending, '0');
    this.departmentData = this.allDepartment;
    this.filterObj = {
      dimensionId: 0,
      dimensionValueid: 0,
      isFilter: false
    };
    sessionStorage.setItem(Encryption.SelectedDimensionFilter, JSON.stringify(this.filterObj));
    sessionStorage.setItem(Encryption.SelectedDimensionArray, '');
  }

  public cancelSelection(): void {
    let filterObj = JSON.parse(sessionStorage.getItem(Encryption.SelectedDimensionFilter));
    filterObj = !!filterObj ? filterObj : this.filterObj;
    this.applyFilter.emit(filterObj);
  }

  private initializeData() {
    this.relationArray = [];
    this.departmentArray = [];
    this.teamsArray = [];

    if (!this.isTriggerAdmin) {
      this.dimensionData.forEach(dimension => {
        if (dimension.dimensionId === 2) {
          this.relationArray = dimension.dimensionElements;
          this.relationArray.forEach(relation => {
            if (relation.checked) {
              this.filterForm.controls['relationSelect'].setValue(relation.elementId, { onlySelf: true });
            }
          });
        } else if (dimension.dimensionId === 3) {
          this.departmentArray = dimension.dimensionElements;
          this.departmentArray.forEach(department => {
            if (department.checked) {
              this.filterForm.controls['departmentSelect'].setValue(department.elementId, { onlySelf: true });
            }
          });
        } else if (dimension.dimensionId === 4) {
          this.teamsArray = dimension.dimensionElements;
          this.teamsArray.forEach(team => {
            if (team.checked) {
              this.filterForm.controls['teamSelect'].setValue(team.elementId, { onlySelf: true });
            }
          });
        }
      });
    }

    if (!!sessionStorage.getItem(Encryption.SelectedDepartment)) {
      this.selectedDept = sessionStorage.getItem(Encryption.SelectedDepartment);
    } else {
      this.selectedDept = '0';
    }
    if (!!sessionStorage.getItem(Encryption.SelectedEmpStatus)) {
      this.empStatus = sessionStorage.getItem(Encryption.SelectedEmpStatus);
    } else {
      this.empStatus = '1';
    }
    if (!!sessionStorage.getItem(Encryption.ManagerAction)) {
      this.managerAction = sessionStorage.getItem(Encryption.ManagerAction);
    } else {
      this.managerAction = '';
    }
    if (!!sessionStorage.getItem(Encryption.ScoreTitle)) {
      this.scoreTitle = sessionStorage.getItem(Encryption.ScoreTitle);
    } else {
      this.scoreTitle = '';
    }
    if (parseInt(sessionStorage.getItem(Encryption.SelectedTrending)) > 0) {
      this.trendingStatus = parseInt(sessionStorage.getItem(Encryption.SelectedTrending));
    } else {
      this.trendingStatus = '0';
    }
  }

  private selectDeselectDimension(dimensionId): void {
    if (dimensionId === 2) {
      this.filterForm.controls['departmentSelect'].setValue('', { onlySelf: true });
      this.filterForm.controls['teamSelect'].setValue('', { onlySelf: true });
    } else if (dimensionId === 3) {
      this.filterForm.controls['relationSelect'].setValue('', { onlySelf: true });
      this.filterForm.controls['teamSelect'].setValue('', { onlySelf: true });
    } else if (dimensionId === 4) {
      this.filterForm.controls['relationSelect'].setValue('', { onlySelf: true });
      this.filterForm.controls['departmentSelect'].setValue('', { onlySelf: true });
    }
  }

  private setDimenssion(): void {
    this.isCheckedAttribute = false;
    this.dimensionId = 0;
    this.dimensionValueid = 0;
    this.dimensionData.forEach(attribute => {
      attribute.dimensionElements.forEach(element => {
        if (element.checked) {
          this.dimensionId = attribute.dimensionId;
          this.dimensionValueid = element.elementId;
          this.isCheckedAttribute = true;
        }
      })
    });
    this.filterObj = {
      dimensionId: this.dimensionId,
      dimensionValueid: this.dimensionValueid,
      isFilter: this.isCheckedAttribute
    }
    if (this.filterObj.isFilter) {
      sessionStorage.setItem(Encryption.SelectedDimensionArray, JSON.stringify(this.dimensionData));
    } else {
      sessionStorage.setItem(Encryption.SelectedDimensionArray, '');
    }

    if (this.filterObj.isFilter) {
      sessionStorage.setItem(Encryption.SelectedDimensionFilter, JSON.stringify(this.filterObj));
    }
  }

  private updatedTrendingLists(): any[] {
    const trendingList = this._trendingList.map((trending) => {
      trending.iconName = this.getIcon(trending.id)
      return trending;
    });
    return trendingList;
  }

  private getIcon(id: number) {
    const icon = trendingIconList.find((icon) => icon.id === id);
    return icon ? icon.icon : '';
  }

  // submitFilter(submitType) {
  //   // this.isCheckedAttribute = false;
  //   // this.dimensionId = 0;
  //   // this.dimensionValueid = 0;
  //   // this.dimensionData.forEach(attribute => {
  //   //   attribute.dimensionElements.forEach(element => {
  //   //     if (element.checked) {
  //   //       this.dimensionId = attribute.dimensionId;
  //   //       this.dimensionValueid = element.elementId;
  //   //       this.isCheckedAttribute = true;
  //   //     }
  //   //   })
  //   // });
  //   // this.filterObj = {
  //   //   dimensionId: this.dimensionId,
  //   //   dimensionValueid: this.dimensionValueid,
  //   //   isFilter: this.isCheckedAttribute
  //   // }
  //   // if (this.filterObj.isFilter) {
  //   //   sessionStorage.setItem(Encryption.SelectedDimensionArray, JSON.stringify(this.dimensionData));
  //   // } else {
  //   //   sessionStorage.setItem(Encryption.SelectedDimensionArray, '');
  //   // }

  //   // if (submitType === 1) {
  //   //   sessionStorage.setItem(Encryption.SelectedDepartment, '0');
  //   // } else {
  //   //   sessionStorage.setItem(Encryption.SelectedDepartment, this.selectedDept);
  //   // }
  //   // if (submitType === 1) {
  //   //   sessionStorage.setItem(Encryption.SelectedEmpStatus, '0');
  //   // } else {
  //   //   sessionStorage.setItem(Encryption.SelectedEmpStatus, this.empStatus);
  //   // }
  //   // if (submitType === 1) {
  //   //   sessionStorage.setItem(Encryption.ManagerAction, '');
  //   // } else {
  //   //   sessionStorage.setItem(Encryption.ManagerAction, this.managerAction);
  //   // }
  //   // if (submitType === 1) {
  //   //   sessionStorage.setItem(Encryption.ScoreTitle, '');
  //   // } else {
  //   //   sessionStorage.setItem(Encryption.ScoreTitle, this.scoreTitle);
  //   // }
  //   // this.applyFilter.emit(filterObj);
  // }
  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
}

export interface FilterObject {
  dimensionId: number
  dimensionValueid: number
  isFilter: boolean
}