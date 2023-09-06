import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MyRequest, MyRequestAccordionTableColumn } from '../../../../dashboard-model';
import { CommonCssClass, Records, MainDiv, SortDirection, IconSortingUpClass, IconSortingDownClass, IconSortingUpDownClass, LangaugeType, CdkOverlayPane } from '../../../../../core/magic-string/common.model';
import { MatSort, MatPaginator, MatTableDataSource, Sort, PageEvent } from '@angular/material';
import { Observable, Subject ,  of } from 'rxjs';
import { fromMatPaginator, paginateRows } from '../../../../../employees/employee-list/employee-accordion-table/datasource-utils';
import { map, takeUntil } from 'rxjs/operators';
import { MyDashboardService } from '../../../my-dashboard-service/my-dashboard.service';
import { DateTimeConverterService } from '../../../../../shared/services/date-time-converter/date-time-converter.service';
import * as moment from 'moment';
import { ScrollService } from '../../../../../core/services/scroll.service';

@Component({
  selector: 'trigger-my-request-accordion-table',
  templateUrl: './my-request-accordion-table.component.html',
  styleUrls: ['./my-request-accordion-table.component.scss']
})
export class MyRequestAccordionTableComponent implements OnInit {
  @Input() myRequestList: MyRequest[];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  displayedColumns = MyRequestAccordionTableColumn;
  dataSource: MatTableDataSource<any>;
  displayedRows$: Observable<any[]>;
  totalRows$: Observable<number>;
  public isExpand: boolean = true;
  public currentPageData: any;
  public sortDirection: string;
  public sortProperty: string;
  private destroy: Subject<void> = new Subject();
  constructor(private myDashboardService: MyDashboardService,
    private dateTimeConverterService: DateTimeConverterService,
    public scrollService: ScrollService) {
    this.destroy = new Subject();
  }

  ngOnInit() {
    this.myDashboardService.bindRecords$.pipe(takeUntil(this.destroy)).subscribe((myRequestList: MyRequest[]) => {
      this.myRequestList = myRequestList;
      this.bindDataSource();
    });
  }

  ngAfterViewInit() {
    this.bindDataSource();
  }

  public ngOnChanges(): void {
    if (!!this.myRequestList) {
      this.bindDataSource();
    }
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
    this.myRequestList.sort(
      (a, b) => (direction === this.sortDirection)
        ? _sortAlphanumeric(a[property], b[property])
        : _sortAlphanumeric(b[property], a[property])
    );
    this.dataSource = new MatTableDataSource(this.myRequestList);
    this.dataSource.paginator = this.paginator;
    this.bindDataSource();
  }

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

  // For expand/collapse accordion : 
  expansionPanel(isExpand) {
    this.isExpand = isExpand;
  }

  pageChanged(pageEvent) {
    this.myDashboardService.scrollTop();
  }

  public onClickPaginationPanel(): void {
    this.myDashboardService.onClickPaginationPanel();
  }

  private bindDataSource(): void {
    const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
    const rows$ = of(this.myRequestList);
    this.totalRows$ = rows$.pipe(map(rows => rows.length));
    this.displayedRows$ = rows$.pipe(paginateRows(pageEvents$));
    new MatTableDataSource(this.myRequestList);
    this.myDashboardService.scrollTop();
    this.paginator._intl.itemsPerPageLabel = Records;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  redirectToActionPage() {

  }

  clickOnAction(data) {
    this.myDashboardService.checkActionAndRedirectOnPage(data)
    
  }
  isDisabledIcon(myRequestList){
    if(myRequestList.status === 'Completed'){
      return true
    } else {
      return false
    }
  }
}

function _sortAlphanumeric(a: string, b: string): number {
  return a.localeCompare(b, LangaugeType.English, { numeric: true });
}