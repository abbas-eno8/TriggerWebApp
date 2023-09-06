/**
@author : Anjali Tandel
@class : SparkDesktopPresentation
@description : SparkDesktopPresentation is created for bind sparks list in desktop view.
**/
import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SparkAnEmployee, desktopViewColumn, Spark, CskOverlayPanel } from '../../../spark-an-employee-model';
import { SparkListPresenter } from '../../spark-list-presenter/spark-list-presenter';
import { CommonCssClass } from '../../../../../core/magic-string/common.model';
import { RecordPerPage } from '../../../../employee-model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ScrollService } from '../../../../../core/services/scroll.service';

@Component({
  selector: '[trigger-spark-an-employee-desktop-ui] .d-flex .flex-column .spark-table-container',
  templateUrl: './spark-desktop.presentation.html',
  styleUrls: ['./spark-desktop.presentation.scss'],
  preserveWhitespaces: true,
})
export class SparkDesktopPresentation implements OnInit {
  /** This variables created for store display column for desktop view */
  public desktopViewColumn = desktopViewColumn;
  /** dataSource created for bind data-source in HTML */
  public dataSource: MatTableDataSource<any>;
  /** MatPaginator is using for Pagination which provided by Angular-material */
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  /** sparks input() store data of spark-list. we are gettingh from parent presentation where we dynamic created this component */
  @Input() sparks: SparkAnEmployee[];
  private destroy: Subject<void> = new Subject();
  constructor(private listPresenter: SparkListPresenter,
    public scrollService: ScrollService) {
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
  public pageChanged(pageEvent): void {
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
    this.dataSource = new MatTableDataSource(this.sparks);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = RecordPerPage;
    this.listPresenter.scrollTop();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}

