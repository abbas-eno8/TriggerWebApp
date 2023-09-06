import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CommonCssClass, RecordPerPage } from '../../../../core/magic-string/common.model';
import { UnApprovedSpark, unApprovedSparkColumns } from '../../../spark-notification-model';
import { SparkNotificationPresenter } from '../../spark-notification-presenter/spark-notification.presenter';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ScrollService } from '../../../../core/services/scroll.service';

@Component({
  selector: 'trigger-spark-norification-list-presentation',
  templateUrl: './spark-norification-list.presentation.html',
  styleUrls: ['./spark-norification-list.presentation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SparkNorificationListPresentation implements OnInit {
  @Input() sparks: UnApprovedSpark[];
  /** This variables created for store display column for desktop view */
  public desktopViewColumn = unApprovedSparkColumns;
  /** dataSource created for bind data-source in HTML */
  public dataSource: MatTableDataSource<any>;
  /** MatPaginator is using for Pagination which provided by Angular-material */
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private sparkNotificationPresenter: SparkNotificationPresenter,
    public changeDetection: ChangeDetectorRef,
    private loaderService: LoaderService,
    public scrollService: ScrollService) { }

  ngOnInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = RecordPerPage;
    }
  }

  /**
 * Author : Mihir Patel
 * Created-Date : 10-09-2019
 * Descriotion : After view init bindDataSource methid called for bind data to table
 */
  ngAfterViewInit() {
    if (!!this.sparks) {
      this.bindDataSource();
      this.loaderService.emitIsLoaderShown(false);
    }
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 10-09-2019
   * Descriotion : On page change bind data source for bind table
   */
  public pageChanged(): void {
    this.bindDataSource();
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 10-09-2019
   * Description : Soring spark based on property-name & bind-data-sources.
   */
  public sort(property: string): void {
    this.sparks = this.sparkNotificationPresenter.sort(property, this.sparks);
    this.bindDataSource();
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 10-09-2019
   * Descriotion : Bind data to material table
   */
  private bindDataSource(): void {
    this.dataSource = new MatTableDataSource(this.sparks);
    this.dataSource.paginator = this.paginator;
    this.sparkNotificationPresenter.scrollTop();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-09-2019
   * Description : Change direction-icon based on sorting-order.
   */
  public getDirecionIcon(property: string): string {
    return this.sparkNotificationPresenter.getDirecionIcon(property);
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 10-09-2019
   * Descriotion : onClickPaginationPanel method called from presenter when click on pagination deopdown 
   */
  public onClickPaginationDropdown() {
    this.sparkNotificationPresenter.onClickPaginationPanel();
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 10-09-2019
   * Descriotion : approvedSpark metod created which called approvedSpark method which is in presenter
   */
  public approvedSpark(spark: UnApprovedSpark): void {
    this.loaderService.emitIsLoaderShown(true);
    this.sparkNotificationPresenter.approvedSpark(spark);
  }


  /**
   * Author : Mihir Patel
   * Created-Date : 10-09-2019
   * Descriotion : rejectSpark metod created which called openRejectSparkModel method which is in presenter(For open reject overlay modal popup)
   */
  public rejectSpark(spark: UnApprovedSpark): void {
    this.sparkNotificationPresenter.openRejectSparkModel(spark);
  }
}
