/**
@author : Mihir Patel
@class : DepartmentAccordionTableComponent
@description :DepartmentAccordionTableComponent is created for show accordion view of department table for mobile view.
**/
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, Sort, PageEvent } from '@angular/material';
// ----------------------------------------------------------- //
import { CommonCssClass, LangaugeType, IconSortingUpDownClass, IconSortingDownClass, SortDirection, IconSortingUpClass, Records, CdkOverlayPane, ApiResponseStatus, MainDiv } from '../../../core/magic-string/common.model';
import { ScrollService } from '../../../core/services/scroll.service';
import { SearchPipePipe } from '../../../shared/pipes/search-pipe.pipe';
import { LoaderService } from '../../../core/loader/loader.service';
import { sortRows, fromMatSort, fromMatPaginator, paginateRows } from '../../../employees/employee-list/employee-accordion-table/datasource-utils';
import { AccordionSearchItemArray } from '../../../clients/client-model';
import { DeletePopupComponent } from '../../../shared/modal-popup/delete-popup/delete-popup.component';
import { DepartmentService } from '../../department.service/department.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { DepartmentModel, DepartmentAccordionTableColumn, DepartmentList } from '../../department.model';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-department-accordion-table',
  templateUrl: './department-accordion-table.component.html',
  styleUrls: ['./department-accordion-table.component.scss']
})
export class DepartmentAccordionTableComponent implements OnInit {
  /** get departments from parent component */
  @Input() departments: DepartmentList[];
  @Input() isDepartmentArray: boolean;
  /** editDepartment is used for emit event for editDepartment which is in parent component */
  @Output() editDepartment: EventEmitter<any> = new EventEmitter();
  /** refreshData is used for emit event for refreshData which is in parent component */
  @Output() refreshData: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns = DepartmentAccordionTableColumn;
  public sortDirection: string;
  public sortProperty: string;
  //  Material pagiation and sorting 

  public searchText: string;
  public currentPageData: any;

  dataSource: MatTableDataSource<any>;
  displayedRows$: Observable<any[]>;
  totalRows$: Observable<number>;
  public isExpand: boolean = true;
  public clientId: number;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(
    public matDialog: MatDialog,
    private searchPipePipe: SearchPipePipe,
    private loaderService: LoaderService,
    private departmentService: DepartmentService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    public scrollService: ScrollService,
    private globalEventsManager: GlobalEventsManager) {
      this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
        if (status) {
          this.isDarkTheme = true;
          } else {
          this.isDarkTheme = false;
        }
      })
     }

  ngOnInit() {
    let userData = this.globalResponseHandlerService.getUserData();
    this.clientId = userData.clientId;
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  /**
  * Author : Mihir Patel
  * Created-Date : 18-09-2019
  * Description : Create method for bind dynamic class to cdk-averlay-pane
  */
  // openPaginationDropdown() {
  //   var parentElement = document.getElementsByClassName(CdkOverlayPane)[0];
  //   parentElement.classList.add(CommonCssClass.PaginationDropdownPosition);
  // }
  public openPaginationDropdown(): void {
    let dropdownClassName = this.isDarkTheme ? 'material-pagination-dropdown-dark' : 'material-pagination-dropdown-white' 
    var parentElement = document.getElementsByClassName('mat-select-panel mat-primary')[0];
    if (parentElement) { parentElement.classList.add(dropdownClassName) };
  }

  /**
  * Author : Mihir Patel
  * Created-Date :  18-09-2019
  * Description : OnChnage check lenth of input and if found length then create table using data
  */
  public ngOnChanges(): void {
    this.bindDataSource();
  }

  /**
  * Author : Mihir Patel
  * Created-Date :  18-09-2019
  * Description : After view init pagination and sorting define and call metho for get current page data from list
  */
  ngAfterViewInit() {
    this.bindDataSource();
  }

  private bindDataSource(): void {
    if (this.isDepartmentArray) {
      if (this.departments.length > 0) {
        if (!!this.searchText && this.searchText != '') {
          this.departments = this.searchPipePipe.transform(this.departments, this.searchText, AccordionSearchItemArray)
        }
        this.dataSource = new MatTableDataSource(this.departments);
        this.callTable(this.departments);
        this.loaderService.emitIsLoaderShown(false);
      }
    }
  }

  // For expand/collapse accordion : 
  expansionPanel(isExpand) {
    this.isExpand = isExpand;
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
  * Description : Create method for scroll top, which is called on page chnage
  */
  scrollTop() {
    const mainDiv = document.getElementById(MainDiv);
    mainDiv.scrollTop = 0;
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
   * Description : Refresh department data on delete operation.
   */
  public refreshDepartment(): void {
    this.refreshData.emit();
  }

  /**
  * Author : Mihir Patel
  * Created-Date :  18-09-2019
  * Description : Method for define sorting property and page index
  */
//  Comment code because not using
  // sortingData() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.paginator.pageIndex = 0;
  //   this.dataSource.sort = this.sort;
  //   this.getCurrentPageData();
  // }


  callTable(filteredEmployeeList) {
    const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
    const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
    const rows$ = of(filteredEmployeeList);
    this.totalRows$ = rows$.pipe(map(rows => rows.length));
    this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
    this.dataSource = new MatTableDataSource(filteredEmployeeList);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = Records;
    this.dataSource.paginator.pageIndex = 0;
    this.dataSource.sort = this.sort;
    this.getCurrentPageData();
  }

  getCurrentPageData() {
    this.dataSource.connect().subscribe(currentData => {
      this.currentPageData = currentData;
    });
  }
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
    this.callTable(this.departments);
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

function _sortAlphanumeric(a: string, b: string): number {
  return a.localeCompare(b, LangaugeType.English, { numeric: true });
}