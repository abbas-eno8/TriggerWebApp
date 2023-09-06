import { Component, OnInit, HostListener, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, Sort, PageEvent } from '@angular/material';
import { ScrollService } from '../../../core/services/scroll.service';
import { SearchPipePipe } from '../../../shared/pipes/search-pipe.pipe';
import { CustomValidation } from '../../../shared/Validation/custom.validation';
import { LoaderService } from '../../../core/loader/loader.service';
import { Observable, of } from 'rxjs';
import { fromMatSort, fromMatPaginator, paginateRows, sortRows } from '../../../employees/employee-list/employee-accordion-table/datasource-utils';
import { OverlayRef } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';
import { DeletePopupComponent } from '../../../shared/modal-popup/delete-popup/delete-popup.component';
import { SortDirection, IconSortingUpClass, IconSortingDownClass, IconSortingUpDownClass, LangaugeType, CommonCssClass } from '../../../core/magic-string/common.model';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-admin-accordion-table',
  templateUrl: './admin-accordion-table.component.html',
  styleUrls: ['./admin-accordion-table.component.scss']
})
export class AdminAccordionTableComponent implements OnInit {
  /** get admin list from parent component */
  @Input() admins: any;
  @Input() isArrayValue: any;
  @Input() clientData: any;
  /** direction variable is created for sorting order */
  public direction: number = 0;
  /** editDepartment is used for emit event for editDepartment which is in parent component */
  @Output() deleteAdminEvent: EventEmitter<any> = new EventEmitter();
  @Output() clientDropdownFilter = new EventEmitter<number>();
  @Input() selectedClient: number;
  public isDisplayRecordsNotFound: boolean;
  displayedColumns = ['employeeId', 'lastName', 'action'];
  public sortDirection: string;
  public sortProperty: string;
  //  Material pagiation and sorting 
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public searchText: string;
  public currentPageData: any;
  public employeeArray: any = [];
  public filteredItems: any = [];
  public departmentId: number;
  public mainArray: any;
  fusilliOverlayRef: OverlayRef;
  @Input() isAccordion: boolean;
  @Input() isDepartmentFilter: boolean;
  @Output() goToEditEmployee = new EventEmitter<object>();

  displayedRows$: Observable<any[]>;
  totalRows$: Observable<number>;
  public isExpand: boolean = true;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(public scrollService: ScrollService,
    public matDialog: MatDialog,
    private searchPipePipe: SearchPipePipe,
    private customValidation: CustomValidation,
    private loaderService: LoaderService,
    private globalEventsManager: GlobalEventsManager,) {
      this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
        if (status) {
          this.isDarkTheme = true;
          } else {
          this.isDarkTheme = false;
        }
      })
     }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  goToEditEmployeePage(employeeId, clientId) {
    let object = {
      employeeId: employeeId,
      clientId: clientId
    }
    this.goToEditEmployee.emit(object)
  }

  // openRotiniPanel() {
  //   var parentElement = document.getElementsByClassName("cdk-overlay-pane")[0];
  //   parentElement.classList.add(CommonCssClass.PaginationDropdownPosition);
  // }

  public openPaginationDropdown(): void {
    let dropdownClassName = this.isDarkTheme ? 'material-pagination-dropdown-dark' : 'material-pagination-dropdown-white' 
    var parentElement = document.getElementsByClassName('mat-select-panel mat-primary')[0];
    if (parentElement) { parentElement.classList.add(dropdownClassName) };
  }
  public ngOnChanges(): void {
    this.bindDataSource();
  }
  ngAfterViewInit() {
    this.bindDataSource();
  }

  private bindDataSource(): void {
    if (this.isArrayValue) {
      if (this.admins.length > 0) {
        this.mainArray = [];
        if (!!this.searchText && this.searchText != '') {
          this.admins = this.searchPipePipe.transform(this.admins, this.searchText, ['employeeId', 'firstName', 'lastName'])
        }
        this.admins.forEach(element => {
          element.lastName = element.lastName.charAt(0).toUpperCase() + element.lastName.slice(1);
          this.mainArray.push(element)
        });
        this.dataSource = new MatTableDataSource(this.mainArray);
        this.callTable(this.mainArray);
        this.employeeArray = this.mainArray;
        this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(this.mainArray, this.isDisplayRecordsNotFound);
        this.loaderService.emitIsLoaderShown(false);
      } else {
        this.employeeArray = this.admins;
        this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(this.admins, this.isDisplayRecordsNotFound);
        this.loaderService.emitIsLoaderShown(false);
      }
    }
  }

  sortingData() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageIndex = 0;
    this.dataSource.sort = this.sort;
    this.getCurrentPageData();
  }
  getCurrentPageData() {
    this.dataSource.connect().subscribe(currentData => {
      this.currentPageData = currentData;
      this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(this.currentPageData, this.isDisplayRecordsNotFound);
    });
  }
  scrollTop() {
    const mainDiv = document.getElementById('mainDIV');
    mainDiv.scrollTop = 0;
  }

  pageChanged(event) {
    this.getCurrentPageData();
    this.scrollTop()
  }

  expansionPanel(isExpand) {
    this.isExpand = isExpand;
  }
  openDeleteAdminModal(empId: number, clientId: number) {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: 'Record',
    });
    dialogRef.componentInstance.confirm.subscribe(
      isConfirmed => {
        if (isConfirmed) {
          this.searchText = '';
          this.scrollTop();
          this.deleteAdminEvent.emit({ empId, clientId, dialogRef });
        }
      }
    );
  }

  searchAdmins(value) {
    if (!value) {
      this.admins = this.employeeArray;
      this.callTable(this.admins);
    } else {
      this.filteredItems = this.employeeArray;
      this.filteredItems = this.searchPipePipe.transform(this.filteredItems, value, ['employeeId', 'firstName', 'lastName'])
      this.admins = this.filteredItems;
      this.dataSource = new MatTableDataSource(this.admins);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.pageIndex = 0;
      this.dataSource.sort = this.sort;
      this.getCurrentPageData();
      this.callTable(this.admins);

    }
  }
  onChangeClient(clientId: number) {
    this.searchText = '';
    this.clientDropdownFilter.emit(clientId);
  }

  callTable(filteredEmployeeList) {
    const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
    const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
    const rows$ = of(filteredEmployeeList);
    this.totalRows$ = rows$.pipe(map(rows => rows.length));
    this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
    this.dataSource = new MatTableDataSource(filteredEmployeeList);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Records:';
    this.dataSource.paginator.pageIndex = 0;
    this.dataSource.sort = this.sort;
    this.getCurrentPageData();
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
    this.admins.sort(
      (a, b) => (direction === this.sortDirection)
        ? _sortAlphanumeric(a[property], b[property])
        : _sortAlphanumeric(b[property], a[property])
    );
    this.dataSource = new MatTableDataSource(this.admins);
    this.dataSource.paginator = this.paginator;
    this.callTable(this.admins);
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
