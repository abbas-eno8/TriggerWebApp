/**
@author : Anjali Tandel
@class : DepartmentListComponent
@description :DepartmentListComponent is parent component of list view and used for add, edit, delete and view department.
**/
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
//  ................................................ //
import { DepartmentService } from '../../department/department.service/department.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { LoaderService } from '../../core/loader/loader.service';
import { Encryption } from '../../core/magic-string/common-validation-model';
import { DepartmentModel, Search_Fields, DepartmentList } from '../department.model';
import { AddEditDepartmentComponent } from '../../shared/modal-popup/add-edit-department/add-edit-department.component';
import { SearchViewComponent } from '../../shared/search-view/search-view.component';
import { Department, DepartmentTooltipHeaderForTruvelopAdmin } from '../../shared/tooltip/tooltip-model';
import { CustomValidation } from '../../shared/Validation/custom.validation';
import { DesktopWidth, Role } from '../../core/magic-string/common.model';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';
@Component({
  selector: 'trigger-department-list',
  templateUrl: './department-list.component.html'
})
export class DepartmentListComponent implements OnInit {
  @ViewChild(SearchViewComponent, { static: false }) searchViewComponent: SearchViewComponent;
  public departments: DepartmentList[];;
  public filteredDepartments: DepartmentList[];
  /** searchPlaceHolder stored static place-holder value for search input */
  public searchPlaceHolder: string;
  /** isDisplayRecordsNotFound boolean variable created for display NoRecordsFoundComponent while no departments found */
  public isDisplayRecordsNotFound: boolean;
  searchFields = Search_Fields;
  public pageTitle: string;
  public clientId: number;
  public isDepartmentArray: boolean;
  public isMethodCalled: boolean;
  public isAccordianTable: boolean;
  public isAccordion: boolean;
  public isApiCalled: boolean;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(
    private departmentService: DepartmentService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private matDialog: MatDialog,
    private customValidation: CustomValidation,
    public breakpointObserver: BreakpointObserver,
    private globalEventsManager: GlobalEventsManager
  ) {
    this.isApiCalled = false;
    this.isDisplayRecordsNotFound = true;
    this.isMethodCalled = false;
    this.loaderService.emitIsLoaderShown(true);
    this.pageTitle = Department
    this.searchPlaceHolder = DepartmentModel.SearchPlaceHolder;
    this.isDepartmentArray = false;

    // this.breakpointObserver
    //   .observe([DesktopWidth])
    //   .subscribe((state: BreakpointState) => {
    //     if (state.matches) {
    //       this.isAccordianTable = false;
    //       if (this.filteredDepartments && this.filteredDepartments.length > 0) {
    //         this.callNormalTable();
    //       }
    //     } else {
    //       this.isAccordianTable = true;
    //       if (this.filteredDepartments && this.filteredDepartments.length > 0) {
    //         this.callAccordionTable();
    //       }
    //     }
    //   });
    if (this.filteredDepartments && this.filteredDepartments.length > 0) {
      this.callNormalTable();
    }
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }

  ngOnInit() {
    this.getDepartment();
    if (this.globalResponseHandlerService.getUser().roleId === Role.TriggerAdmin) {
      this.pageTitle = DepartmentTooltipHeaderForTruvelopAdmin
    }
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  callNormalTable() {
    this.isAccordion = false;
    if (this.filteredDepartments.length > 0) {
      this.filteredDepartments = this.filteredDepartments;
    }
  }
  // For accordion table calling : 
  callAccordionTable() {
    this.isAccordion = true;
    if (this.filteredDepartments.length > 0) {
      this.filteredDepartments = this.filteredDepartments;
    }
  }
  /**
   * Author : Anjali Tandel
   * Modified-Date :  18-12-2018
   * Description : Create method for get all Department.
   */
  getDepartment(): void {
    this.filteredDepartments = [];
    this.departmentService.getDepartment(this.globalResponseHandlerService.getUser().clientId).subscribe(
      (getDepartmentresponse) => {
        if (this.globalResponseHandlerService.getApiResponse(getDepartmentresponse, false, false)) {
          if (getDepartmentresponse) {
            this.isApiCalled = true;
            this.isMethodCalled = true;
            this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(getDepartmentresponse.data, this.isDisplayRecordsNotFound);
            this.globalResponseHandlerService.encriptData(JSON.stringify(getDepartmentresponse.data.length), Encryption.TriggerDepartmentObjectMessage, Encryption.TriggerDepartmentObjectKey);
            this.isDepartmentArray = true;
            this.departments = getDepartmentresponse.data;
            this.departments.forEach(element => {
              element.departmentId = element.departmentId + '';
              element.config = this.getConfigName(element.sendTrigger, element.sendSpark)
              this.filteredDepartments.push(element);
            });
            this.filteredDepartments = getDepartmentresponse.data;
            this.filteredDepartments = _.sortBy(this.filteredDepartments, 'department');
          } else {
            this.isDisplayRecordsNotFound = true;
          }
          this.loaderService.emitIsLoaderShown(false);
        }
      }
    );
  }
  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Open modal popup for add, edit department.
   */
  openDepartmentModal(title: string, value: string, id: number, department?: string, sendTrigger?: boolean, sendSpark?: boolean): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(AddEditDepartmentComponent, {
      panelClass: modalBackground,
      data: {
        clientId: this.globalResponseHandlerService.getUser().clientId,
        buttonValue: value,
        modalTitle: title,
        departmentName: department,
        departmentId: id,
        sendTrigger: sendTrigger,
        sendSpark: sendSpark,
        config: this.getConfigName(sendTrigger, sendSpark)
      },
      width: '300px',
    });
    dialogRef.beforeClose().subscribe(department => {
      if (department) {
        this.getDepartment();
        this.searchViewComponent.searchText = '';
      }
    });
  }

  getConfigName(sendTrigger, sendSpark): string {
    let configValue: string;
    if (sendSpark && sendTrigger) {
      configValue = 'Evaluation, Spark'
    } else if (sendTrigger && !sendSpark) {
      configValue = 'Evaluation'
    } else if (!sendTrigger && sendSpark) {
      configValue = 'Spark'
    } else {
      configValue = ''
    }
    return configValue
  }
  /**
   * Author : Anjali Tandel
   * Modified-Date :  04-06-2019
   * Description : bind departments on search
   */
  bindRecords(departments): void {
    this.filteredDepartments = departments;
    this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(this.filteredDepartments, this.isDisplayRecordsNotFound);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-04-2019
   * Description : Refresh department data on operation which is emited by child component.
   */
  public refreshData(): void {
    this.searchViewComponent.searchText = '';
    this.getDepartment();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-04-2019
   * Description : Even emitter for open edit department modal.
   */
  public editDepartment(department: any): void {
    this.openDepartmentModal(DepartmentModel.EditDepartment, DepartmentModel.Update, department.departmentId, department.department, department.sendTrigger, department.sendSpark);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-04-2019
   * Description : Even emitter for open add department modal.
   */
  public addDepartment(departmentId: number): void {
    this.openDepartmentModal(DepartmentModel.AddDepartment, DepartmentModel.Add, departmentId);
  }
}