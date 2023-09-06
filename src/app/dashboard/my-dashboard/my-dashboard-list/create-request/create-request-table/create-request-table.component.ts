import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CreateRequest, CreateRequestNormalTableColumn } from '../../../../dashboard-model';
import { MyDashboardService } from '../../../my-dashboard-service/my-dashboard.service';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RecordPerPage, CommonCssClass, SortDirection, IconSortingUpDownClass, IconSortingDownClass, IconSortingUpClass, LangaugeType } from '../../../../../core/magic-string/common.model';
import { takeUntil } from 'rxjs/operators';
import { ScrollService } from '../../../../../core/services/scroll.service';

@Component({
  selector: 'trigger-create-request-table',
  templateUrl: './create-request-table.component.html',
  styleUrls: ['./create-request-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRequestTableComponent implements OnInit {
  @Input() createRequestList: CreateRequest[];

  /** This variables created for store display column for desktop view */
  public desktopViewColumn = CreateRequestNormalTableColumn;
  private destroy: Subject<void> = new Subject();
  /** dataSource created for bind data-source in HTML */
  public dataSource: MatTableDataSource<any>;
  /** MatPaginator is using for Pagination which provided by Angular-material */
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  //  Define pagination
  //  Define sortDirection for sorting
  public sortDirection: string;
  // Define sortProperty
  public sortProperty: string;
  constructor(private myDashboardService: MyDashboardService,
    public scrollService: ScrollService) {
    this.destroy = new Subject();
  }

  ngOnInit() {
    this.myDashboardService.bindRecords$.pipe(takeUntil(this.destroy)).subscribe((createRequestList: any[]) => {
      this.createRequestList = createRequestList;
      this.bindDataSource();
    });
  }

  ngAfterViewInit() {
    this.bindDataSource();
  }

  public ngOnChanges(): void {
    if(!!this.createRequestList){
      this.bindDataSource();
    }    
  }
  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Bind data-source on page-changed.
   */
  public pageChanged(pageEvent): void {
    this.bindDataSource();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Bind data-source.
   */
  public onClickPaginationPanel(): void {
    this.myDashboardService.onClickPaginationPanel();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Bind data-source.
   */
  private bindDataSource(): void {
    this.dataSource = new MatTableDataSource(this.createRequestList);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = RecordPerPage;
    this.myDashboardService.scrollTop();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  /**
  * Author : Mihir Patel
  * Modified-Date : 11-06-2019
  * Description : Create method for call pagination and sorting
  */
  sortingData() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageIndex = 0;
    this.dataSource.sort = this.sort;
    this.myDashboardService.scrollTop();;
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
    this.createRequestList.sort(
      (a, b) => (direction === this.sortDirection)
        ? _sortAlphanumeric(a[property], b[property])
        : _sortAlphanumeric(b[property], a[property])
    );
    this.dataSource = new MatTableDataSource(this.createRequestList);
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
