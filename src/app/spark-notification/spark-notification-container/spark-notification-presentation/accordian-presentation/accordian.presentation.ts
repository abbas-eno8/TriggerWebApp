/**
@author : Anjali Tandel
@class : AccordianPresentation
@description : AccordianPresentation is created for bind unapproved-sparks in accordian view.
**/
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { MatPaginator, PageEvent, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { CommonCssClass, Records } from '../../../../core/magic-string/common.model';
import { UnApprovedSpark } from '../../../spark-notification-model';
import { SparkNotificationPresenter } from '../../spark-notification-presenter/spark-notification.presenter';
import { LoaderService } from '../../../../core/loader/loader.service';
import { fromMatPaginator, paginateRows } from '../../../../employees/employee-list/employee-accordion-table/datasource-utils';
import { ScrollService } from '../../../../core/services/scroll.service';

@Component({
  selector: 'trigger-accordian-presentation',
  templateUrl: './accordian.presentation.html',
  styleUrls: ['./accordian.presentation.scss']
})
export class AccordianPresentation implements OnInit {
  /** displayedRows$ is using for bind rows which provided by Angular-material */
  displayedRows$: Observable<any[]>;
  /** totalRows$ is using for bind totalRows which provided by Angular-material */
  totalRows$: Observable<number>;
  /** MatPaginator is using for Pagination which provided by Angular-material */
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  /** sparks input() store data of spark-list. we are gettingh from parent presentation where we dynamic created this component */
  @Input() sparks: UnApprovedSpark[];
  /** isExpand boolean variable is created for collapse/expand panel */
  public isExpand: boolean;
  constructor(
    private listPresenter: SparkNotificationPresenter,
    private loaderService: LoaderService,
    public scrollService: ScrollService) { }

  ngOnInit() {
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

  pageChanged(event) {
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

  public approvedSpark(spark: UnApprovedSpark): void {
    this.loaderService.emitIsLoaderShown(true);
    this.listPresenter.approvedSpark(spark);
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 10-09-2019
   * Descriotion : rejectSpark metod created which called openRejectSparkModel method which is in presenter(For open reject overlay modal popup)
   */
  public rejectSpark(spark: UnApprovedSpark): void {
    this.listPresenter.openRejectSparkModel(spark);
  }
}
