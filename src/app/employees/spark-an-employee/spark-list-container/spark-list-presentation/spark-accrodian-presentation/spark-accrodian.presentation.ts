/**
@author : Anjali Tandel
@class : SparkAccrodianPresentation
@description : SparkAccrodianPresentation is created for bind sparks list in accordian view.
**/
import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort, PageEvent } from '@angular/material';
import { Observable ,  of ,  Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { sortRows, fromMatSort, fromMatPaginator, paginateRows } from '../../../../employee-list/employee-accordion-table/datasource-utils';
import { SparkAnEmployee, Spark } from '../../../spark-an-employee-model';
import { CommonCssClass } from '../../../../../core/magic-string/common.model';
import { SparkListPresenter } from '../../spark-list-presenter/spark-list-presenter';
import { Records } from '../../../../employee-model';
import { ScrollService } from '../../../../../core/services/scroll.service';

@Component({
  selector: '[trigger-spark-an-employee-accrodian-ui] .d-flex .flex-column .spark-table-container',
  templateUrl: './spark-accrodian.presentation.html',
  styleUrls: ['./spark-accrodian.presentation.scss']
})
export class SparkAccrodianPresentation implements OnInit {
  /** displayedRows$ is using for bind rows which provided by Angular-material */
  displayedRows$: Observable<any[]>;
  /** totalRows$ is using for bind totalRows which provided by Angular-material */
  totalRows$: Observable<number>;
  /** MatPaginator is using for Pagination which provided by Angular-material */
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  /** sparks input() store data of spark-list. we are gettingh from parent presentation where we dynamic created this component */
  @Input() sparks: SparkAnEmployee[];
  /** isExpand boolean variable is created for collapse/expand panel */
  public isExpand: boolean;
  private destroy: Subject<void> = new Subject();
  constructor(private listPresenter: SparkListPresenter,
    public scrollService: ScrollService) {
    this.isExpand = true;
    this.destroy = new Subject();
  }

  ngOnInit() {
    this.listPresenter.bindRecords$.pipe(takeUntil(this.destroy)).subscribe((sparks: SparkAnEmployee[]) => {
      this.sparks = sparks;
      this.bindDataSource();
    });
  }

  ngAfterViewInit() {
    this.bindDataSource();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Expand/collapse panel .
   */
  public expansionPanel(isExpand): void {
    this.isExpand = isExpand;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Soring spark based on property-name & bind-data-sources.
   */
  public sort(property: string): void {
    this.sparks = this.listPresenter.sort(property, this.sparks);
    this.bindDataSource();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Change direction-icon based on sorting-order.
   */
  public getDirecionIcon(property: string): string {
    return this.listPresenter.getDirecionIcon(property);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Open edit-popup modal.
   */
  public editModal(spark: SparkAnEmployee): void {
    this.listPresenter.editModal(spark);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Open delete-popup modal.
   */
  public deleteModal(spark: SparkAnEmployee): void {
    this.listPresenter.deleteModal(Spark, spark);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Open preview-popup modal.
   */
  public previewModal(spark: SparkAnEmployee): void {
    this.listPresenter.previewModal(spark);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Bind data-source on page-changed.
   */
  public pageChanged(event): void {
    this.bindDataSource();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Bind data-source.
   */
  public onClickPaginationPanel(): void {
    this.listPresenter.onClickPaginationPanel();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Bind data-source.
   */
  private bindDataSource(): void {
    const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
    const rows$ = of(this.sparks);
    this.totalRows$ = rows$.pipe(map(rows => rows.length));
    this.displayedRows$ = rows$.pipe(paginateRows(pageEvents$));
    new MatTableDataSource(this.sparks);
    this.listPresenter.scrollTop();
    this.paginator._intl.itemsPerPageLabel = Records;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
