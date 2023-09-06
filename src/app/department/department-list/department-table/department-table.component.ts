/**
 * @author : Mihir Patel
 * @class : DepartmentTableComponent
 * description :DepartmentTableComponent is created for disaply department list for dekstop view.
 */
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
// ------------------------------------------------------- //
import { DepartmentService } from '../../department.service/department.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { LoaderService } from '../../../core/loader/loader.service';
import { DeletePopupComponent } from '../../../shared/modal-popup/delete-popup/delete-popup.component';
import { ApiResponseStatus, CommonCssClass, SortDirection, IconSortingUpClass, IconSortingDownClass, IconSortingUpDownClass, LangaugeType, MainDiv, CskOverlayPanel, RecordPerPage } from '../../../core/magic-string/common.model';
import { DepartmentModel, DepartmentNormalTableColumn, DepartmentList } from '../../department.model';
import { ScrollService } from '../../../core/services/scroll.service';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.scss']
})
export class DepartmentTableComponent implements OnInit {
  /** get departments from parent component */
  @Input() departments: DepartmentList[];;
  @Input() isDepartmentArray: boolean;
  /** editDepartment is used for emit event for editDepartment which is in parent component */
  @Output() editDepartment: EventEmitter<any> = new EventEmitter();
  /** refreshData is used for emit event for refreshData which is in parent component */
  @Output() refreshData: EventEmitter<any> = new EventEmitter();

  /** filteredDepartments is used for store departments which is used in searching functionality */
  public filteredDepartments: DepartmentList[];
  public clientId: number;
  // public isDisplayRecordsNotFound: boolean = false;
  displayedColumns = DepartmentNormalTableColumn;
  //  Declare MatTableDataSource
  dataSource: MatTableDataSource<any>;
  //  Define mat-sort
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  //  Define pagination
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  //  Define sortDirection for sorting
  public sortDirection: string;
  // Define sortProperty
  public sortProperty: string;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(
    private departmentService: DepartmentService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private matDialog: MatDialog,
    public scrollService: ScrollService,
    private globalEventsManager: GlobalEventsManager) {
    this.filteredDepartments = this.departments;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
        } else {
        this.isDarkTheme = false;
      }
    })
  }

  ngOnInit(): void {
    let userData = this.globalResponseHandlerService.getUserData();
    this.clientId = userData.clientId;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = RecordPerPage;
    }
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  /**
   * Author : Mihir Patel
   * Modified-Date : 11-06-2019
   * Description : Create method to detect cahnges of input which is passed from department component
   */
  public ngOnChanges(): void {
    if (this.isDepartmentArray) {
      if (this.departments) {
        this.initializTable(this.departments);
      }
    }
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 11-06-2019
   * Description : Create method to call pagination after view init
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
  * Author : Mihir Patel
  * Modified-Date : 11-06-2019
  * Description : Create method for table initialize
  */
  initializTable(departments) {
    this.dataSource = new MatTableDataSource(departments);
    this.sortingData();
    this.loaderService.emitIsLoaderShown(false);
  }

  /**
  * Author : Mihir Patel
  * Modified-Date : 11-06-2019
  * Description : Create method for call pagination and sorting
  */
  sortingData() {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = 0;
    }
    this.dataSource.sort = this.sort;
    this.scrollTop();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Open modal popup for delete department.
   */
  public openDeleteDepartmentModal(deptId: number): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: DepartmentModel.DepartmentHeader,
    });
    dialogRef.componentInstance.confirm.subscribe((data) => {
      if (data) {
        this.deleteDepartment(deptId, dialogRef);
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Create method for Call API delete department.
   */
  public deleteDepartment(deptId: number, dialogRef): void {
    this.loaderService.emitIsLoaderShown(true);
    this.departmentService.deleteDepartment(deptId, this.clientId).subscribe(
      (deleteDepartmentresponse) => {
        if (this.globalResponseHandlerService.getApiResponse(deleteDepartmentresponse, true)) {
          dialogRef.close();
          this.refreshDepartment();
        } else {
          if (deleteDepartmentresponse.status === ApiResponseStatus.AlreadyReported) {
            dialogRef.close();
          }
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-04-2019
   * Description : Create method for open edit department modal.
   */
  public openEditDepartmentModal(departmentId: number, department: string, sendTrigger: boolean, sendSpark: boolean): void {
    this.editDepartment.emit({ departmentId, department, sendTrigger, sendSpark });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-04-2019
   * Description : Refresh department data on delete operation.
   */
  public refreshDepartment(): void {
    this.refreshData.emit();
  }

  /**
  * Author : Mihir Patel
  * Modified-Date : 11-06-2019
  * Description : Create method for bind dynamic class to cdk-averlay-pane
  */
  // openPaginationDropdown() {
  //   var parentElement = document.getElementsByClassName(CskOverlayPanel)[0];
  //   parentElement.classList.add(CommonCssClass.PaginationDropdownPosition);
  // }
  public openPaginationDropdown(): void {
    let dropdownClassName = this.isDarkTheme ? 'material-pagination-dropdown-dark' : 'material-pagination-dropdown-white' 
    var parentElement = document.getElementsByClassName('mat-select-panel mat-primary')[0];
    if (parentElement) { parentElement.classList.add(dropdownClassName) };
  }

  /**
  * Author : Mihir Patel
  * Modified-Date : 11-06-2019
  * Description : Create method for scroll top, which is called on page chnage
  */
  scrollTop() {
    const mainDiv = document.getElementById(MainDiv);
    mainDiv.scrollTop = 0;
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 11-06-2019
   * Description : Mthod which is called on page change
   */
  pageChanged(pageEvent) {
    this.scrollTop()
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 11-06-2019
   * Description : Create method for custom sorting on all fields
   */
  public sortData(property: string, direction: string): void {
    if (this.sortProperty === property) {
      if (this.sortDirection === direction) {
        this.sortDirection = SortDirection.Decending;
      } else {
        this.sortDirection = SortDirection.Ascending;
      }
    } else {
      this.sortDirection = SortDirection.Ascending;
    }
    this.sortProperty = property;
    this.departments.sort(
      (a, b) => (direction === this.sortDirection)
        ? _sortAlphanumeric(a[property], b[property])
        : _sortAlphanumeric(b[property], a[property])
    );
    this.dataSource = new MatTableDataSource(this.departments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Create method which return class and the class is used in ngClass in html for highlight sorting icon : 
  isSortingDirecion(fieldName: string): string {
    let ngClass: string = '';
    if (fieldName === this.sortProperty && this.sortDirection === SortDirection.Ascending) {
      ngClass = IconSortingUpClass;
    } else if (fieldName === this.sortProperty && this.sortDirection === SortDirection.Decending) {
      ngClass = IconSortingDownClass;
    } else {
      ngClass = IconSortingUpDownClass;
    }
    return ngClass;
  }

}

/**
   * Author : Mihir Patel
   * Modified-Date : 11-06-2019
   * Description : function for sorting, which returns sorted value.
   */
function _sortAlphanumeric(a: string, b: string): number {
  return a.localeCompare(b, LangaugeType.English, { numeric: true });
}
