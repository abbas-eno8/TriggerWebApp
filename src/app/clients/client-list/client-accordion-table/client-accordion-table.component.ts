/**
 * @author : Mihir Patel
 * @class : ClientTableComponent
 * @description :ClientAccordionTableComponent Represent Accordion view with specific field show which are defined.
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, Sort, PageEvent } from '@angular/material';
import { SearchPipePipe } from '../../../shared/pipes/search-pipe.pipe';
import { CustomValidation } from '../../../shared/Validation/custom.validation';
import { LoaderService } from '../../../core/loader/loader.service';
import { Observable, of } from 'rxjs';
import { fromMatSort, fromMatPaginator, paginateRows, sortRows } from '../../../employees/employee-list/employee-accordion-table/datasource-utils';
import { map } from 'rxjs/operators';
import { DeletePopupComponent } from '../../../shared/modal-popup/delete-popup/delete-popup.component';
import { CommonCssClass, SortDirection, IconSortingUpClass, IconSortingDownClass, IconSortingUpDownClass, LangaugeType, Records, CdkOverlayPane, MainDiv } from '../../../core/magic-string/common.model';
import { AccordionTableColumnArray, Clients, AccordionSearchItemArray, ClientModel } from '../../client-model';
import { ScrollService } from '../../../core/services/scroll.service';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';


@Component({
  selector: 'trigger-client-accordion-table',
  templateUrl: './client-accordion-table.component.html',
  styleUrls: ['./client-accordion-table.component.scss']
})
export class ClientAccordionTableComponent implements OnInit {
  /** get Client list from parent component */
  @Input() clients: ClientModel[];
  @Input() isArrayValue: boolean;

  /** Output pass to parent component for redirect to edit client and company dashbiard and for delete client*/
  @Output() deleteClientEvent: EventEmitter<object> = new EventEmitter();
  @Output() goToEditClient = new EventEmitter<number>();
  @Output() goToDashboard = new EventEmitter<object>();

  // Define material table column
  displayedColumns = AccordionTableColumnArray;

  //  Material pagiation and sorting 
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public searchText: string;
  public employeeArray: ClientModel[] = [];
  public sortDirection: string;
  public sortProperty: string;
  /** direction variable is created for sorting order */
  public direction: number = 0;
  public isDisplayRecordsNotFound: boolean;
  displayedRows$: Observable<any[]>;
  totalRows$: Observable<number>;
  public isExpand: boolean = true;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(
    public matDialog: MatDialog,
    private searchPipePipe: SearchPipePipe,
    private customValidation: CustomValidation,
    private loaderService: LoaderService,
    public scrollService: ScrollService,
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
  /**
   * Author : Mihir Patel
   * Created-Date :  18-09-2019
   * Description :Create method which Emit value to client list component for redirect to edit client page
   */
  public goToEditClientPage(clientId: number): void {
    this.goToEditClient.emit(clientId);
  }

  /**
  * Author : Mihir Patel
  * Created-Date :  18-09-2019
  * Description : Open modal popup for delete Client
  */
  openDeleteClientModal(clientId) {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: Clients,
    });
    dialogRef.componentInstance.confirm.subscribe(
      isConfirmed => {
        if (isConfirmed) {
          this.searchText = '';
          this.scrollTop();
          this.deleteClientEvent.emit({ clientId, dialogRef });
        }
      }
    );
  }

  /**
  * Author : Mihir Patel
  * Created-Date :  18-09-2019
  * Description : Create method which Emit value to client list component for redirect to Company dashboard
  */
  public goToCompanyDashboard(clientId: number, clientName: string, iconUrl: string, contractStartDate: string, contractEndDate: string, gracePeriod: number): void {
    this.goToDashboard.emit({ clientId, clientName, iconUrl, contractStartDate, contractEndDate, gracePeriod });
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
    // if (this.isArrayValue) {
    //   if (this.clients.length > 0) {
    //     if (!!this.searchText && this.searchText != '') {
    //       this.clients = this.searchPipePipe.transform(this.clients, this.searchText, AccordionSearchItemArray)
    //     }
    //     this.dataSource = new MatTableDataSource(this.clients);
    //     this.callTable(this.clients);
    //     this.employeeArray = this.clients;
    //     this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(this.clients, this.isDisplayRecordsNotFound);
    //     this.loaderService.emitIsLoaderShown(false);
    //   } else {
    //     this.employeeArray = this.clients;
    //     this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(this.clients, this.isDisplayRecordsNotFound);
    //     this.loaderService.emitIsLoaderShown(false);
    //   }
    // }
  }

  /**
  * Author : Mihir Patel
  * Created-Date :  18-09-2019
  * Description : After view init pagination and sorting define and call metho for get current page data from list
  */
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.getCurrentPageData();
    if (this.isArrayValue) {
      if (this.clients.length > 0) {
        if (!!this.searchText && this.searchText != '') {
          this.clients = this.searchPipePipe.transform(this.clients, this.searchText, AccordionSearchItemArray)
        }
        this.dataSource = new MatTableDataSource(this.clients);
        this.callTable(this.clients);
        this.employeeArray = this.clients;
        this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(this.clients, this.isDisplayRecordsNotFound);
        this.loaderService.emitIsLoaderShown(false);
      } else {
        this.employeeArray = this.clients;
        this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(this.clients, this.isDisplayRecordsNotFound);
        this.loaderService.emitIsLoaderShown(false);
      }
    }
  }

  /**
 * Author : Mihir Patel
 * Created-Date :  18-09-2019
 * Description : Method for define sorting property and page index
 */
  sortingData() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageIndex = 0;
    this.dataSource.sort = this.sort;
    this.getCurrentPageData();
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 18-09-2019
  * Description : Method for Get current page data from list
  */
  getCurrentPageData() {
    this.dataSource.connect().subscribe(currentData => {
      this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(currentData, this.isDisplayRecordsNotFound);
    });
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 18-09-2019
  * Description : Create method for scroll top, which is called on page chnage
  */
  scrollTop() {
    const mainDiv = document.getElementById(MainDiv);
    mainDiv.scrollTop = 0;
  }


  /**
   * Author : Mihir Patel
   * Created-Date : 18-09-2019
   * Description : Mthod which is called on page change
   */
  pageChanged(event) {
    this.getCurrentPageData();
    this.scrollTop()
  }

  // For expand/collapse accordion : 
  expansionPanel(isExpand) {
    this.isExpand = isExpand;
  }

  /**
 * Author : Mihir Patel
 * Created-Date : 18-09-2019
 * Description : Method for search client from list by serch value
 */
  searchClients(value) {
    if (!value) {
      this.clients = this.employeeArray;
      this.callTable(this.clients);
    } else {
      let filteredItems = this.employeeArray;
      filteredItems = this.searchPipePipe.transform(filteredItems, value, AccordionSearchItemArray)
      this.clients = filteredItems;
      this.dataSource = new MatTableDataSource(this.clients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.pageIndex = 0;
      this.dataSource.sort = this.sort;
      this.getCurrentPageData();
      this.callTable(this.clients);

    }
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 18-09-2019
  * Description : Method which contain common code for call material table
  */
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

  /**
   * Author : Mihir Patel
   * Created-Date : 18-09-2019
   * Description : Mthod for sorting data as per property and sorting direction
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
    this.clients.sort(
      (a, b) => (direction === this.sortDirection)
        ? _sortAlphanumeric(a[property], b[property])
        : _sortAlphanumeric(b[property], a[property])
    );
    this.dataSource = new MatTableDataSource(this.clients);
    this.dataSource.paginator = this.paginator;
    this.callTable(this.clients);
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
