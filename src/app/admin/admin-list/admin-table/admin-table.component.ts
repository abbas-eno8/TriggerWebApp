/**
 * description :AdminListComponent is created for disaply admin list.
 * @author : Anjali Tandel
 * @class : AdminListComponent
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as _ from 'underscore';
import { MatDialog } from '@angular/material/dialog';
import { ScrollService } from '../../../core/services/scroll.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { UrlEncryptionDecryptionService } from '../../../core/url-encryption-decryption/url-encryption-decryption.service';
import { DeletePopupComponent } from '../../../shared/modal-popup/delete-popup/delete-popup.component';
import { SearchPipePipe } from '../../../shared/pipes/search-pipe.pipe';
import { MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
import { CustomValidation } from '../../../shared/Validation/custom.validation';
import { LoaderService } from '../../../core/loader/loader.service';
import { SortDirection, IconSortingUpClass, IconSortingDownClass, IconSortingUpDownClass, LangaugeType, CommonCssClass } from '../../../core/magic-string/common.model';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit {
  /** get admin list from parent component */
  @Input() admins: any;
  @Input() isArrayValue: any;
  @Input() clientData: any;
  public direction: number = 0;
  @Output() deleteAdminEvent: EventEmitter<any> = new EventEmitter();
  @Output() clientDropdownFilter = new EventEmitter<number>();
  @Input() selectedClient: number;
  public isDisplayRecordsNotFound: boolean;
  displayedColumns = ['employeeId', 'lastName', 'companyName', 'email', 'action'];
  public sortDirection: string;
  public sortProperty: string;
  //  Material pagiation and sorting 
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public searchText: string;
  public currentPageData: any;
  public employeeArray: any = [];
  public filteredItems: any = [];
  @Output() goToEditEmployee = new EventEmitter<object>();
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

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  /**
   * Author : Aayushi Patel
   * Modified-Date :  03-04-2019
   * Description : For table scroll
   */
  public onScroll(event: Event) {
    this.scrollService.onScroll(event);
  }

  public goToEditEmployeePage(employeeId: number, clientId: number): void {
    let object = {
      employeeId: employeeId,
      clientId: clientId
    }
    this.goToEditEmployee.emit(object);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  16-03-2019
   * Description : Open modal popup for delete admin
   */
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

  public ngOnChanges(): void {
    this.isDisplayRecordsNotFound = false;
    if (this.isArrayValue) {
      if (this.admins.length > 0) {
        if (this.searchText != '') {
          this.admins = this.searchPipePipe.transform(this.admins, this.searchText, ['employeeId', 'firstName', 'lastName', 'companyName', 'email'])
        }
        this.employeeArray = this.admins;
        this.dataSource = new MatTableDataSource(this.admins);
        this.sortingData();
        this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(this.admins, this.isDisplayRecordsNotFound);
        this.loaderService.emitIsLoaderShown(false);
      } else {
        // this.employeeArray = this.admins;
        this.dataSource = new MatTableDataSource(this.admins);
        this.sortingData();
        this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(this.admins, this.isDisplayRecordsNotFound);
        this.loaderService.emitIsLoaderShown(false);
      }
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Records per page :';
    this.dataSource.sort = this.sort;
    this.getCurrentPageData();
  }

  sortingData() {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = 0;
    }
    this.dataSource.sort = this.sort;
    this.getCurrentPageData();
  }

  getCurrentPageData() {
    this.dataSource.connect().subscribe(currentData => {
      this.currentPageData = currentData;
      this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(this.currentPageData, this.isDisplayRecordsNotFound);
    });
  }

  searchAdmins(value) {
    if (!value) {
      this.admins = this.employeeArray;
      this.callTable(this.admins);
    } else {
      this.filteredItems = this.employeeArray;
      this.filteredItems = this.searchPipePipe.transform(this.filteredItems, value, ['employeeId', 'firstName', 'lastName', 'companyName', 'email'])
      this.admins = this.filteredItems;
      this.dataSource = new MatTableDataSource(this.admins);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.pageIndex = 0;
      this.dataSource.sort = this.sort;
      this.getCurrentPageData();
    }
  }

  callTable(filteredEmployeeList) {
    this.dataSource = new MatTableDataSource(filteredEmployeeList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getCurrentPageData();
    this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(filteredEmployeeList, this.isDisplayRecordsNotFound);
  }

  /**
  * Author : Mihir Patel
  * Modified-Date : 12-06-2019
  * Description : Create method for bind dynamic class to cdk-averlay-pane
  */
  // openPaginationDropdown() {
  //   var parentElement = document.getElementsByClassName("cdk-overlay-pane")[0];
  //   parentElement.classList.add(CommonCssClass.PaginationDropdownPosition);
  // }

  public openPaginationDropdown(): void {
    let dropdownClassName = this.isDarkTheme ? 'material-pagination-dropdown-dark' : 'material-pagination-dropdown-white' 
    var parentElement = document.getElementsByClassName('mat-select-panel mat-primary')[0];
    if (parentElement) { parentElement.classList.add(dropdownClassName) };
  }
  /**
  * Author : Mihir Patel
  * Modified-Date : 12-06-2019
  * Description : Create method for scroll top, which is called on page chnage
  */
  scrollTop() {
    const mainDiv = document.getElementById('mainDIV');
    mainDiv.scrollTop = 0;
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 12-06-2019
   * Description : Mthod which is called on page change
   */
  pageChanged(pageEvent) {
    this.scrollTop()
  }

  onChangeClient(clientId: number) {
    this.searchText = '';
    this.clientDropdownFilter.emit(clientId);
  }

  public sortData(property: string, direction: string): void {
    if (this.sortProperty === property) {
      if (this.sortDirection === direction) {
        this.sortDirection = 'desc';
      } else {
        this.sortDirection = 'asc';
      }
    } else {
      this.sortDirection = 'asc';
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
