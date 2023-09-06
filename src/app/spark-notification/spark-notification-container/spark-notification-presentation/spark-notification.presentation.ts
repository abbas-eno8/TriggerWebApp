/**
@author : Mihir Patel
@class : SparkNotificationPresentation
@description : SparkNotificationPresentation is contain manage click of this presentation and manage input/output.
**/
import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef, Output, EventEmitter } from '@angular/core';

import { UnApprovedSpark } from '../../spark-notification-model';
import { SparkNotificationPresenter } from '../spark-notification-presenter/spark-notification.presenter';
import { NoRecordsFoundComponent } from '../../../shared/no-records-found/no-records-found.component';
import { LoaderService } from '../../../core/loader/loader.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DesktopWidth, ListViewClass, NoRecordFoundViewClass } from '../../../employees/spark-an-employee/spark-an-employee-model';
import { BreakpointState } from '@angular/cdk/layout';
import { SparkNorificationListPresentation } from './spark-norification-list-presentation/spark-norification-list.presentation';
import { AccordianPresentation } from './accordian-presentation/accordian.presentation';

@Component({
  selector: 'trigger-spark-notification-presentation',
  templateUrl: './spark-notification.presentation.html',
  styleUrls: ['./spark-notification.presentation.scss'],
  viewProviders: [SparkNotificationPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SparkNotificationPresentation implements OnInit {
  /** containerClass stored class dynamically */
  public containerClass: string;

  //  componentRef for store reference of dynamic created component
  componentRef: any;

  // ViewChild for defined container in which create dynamic component
  @ViewChild('container', { read: ViewContainerRef, static: false }) entry: ViewContainerRef;

  // sparkList input set and get list data.
  @Input() public set sparkList(sparkList: UnApprovedSpark[]) {
    if (!!sparkList) {
      this._sparkList = this.listPresenter.checkResponse(sparkList);
      // this.desktopView();
      this.changeDetection.detectChanges();
    }
  }
  public get sparkList(): UnApprovedSpark[] {
    return this._sparkList;
  }

  // get input from container and if value get true then close overlay modal popup
  @Input() public set isModalStatusClose(isModalStatusClose: boolean) {
    if (isModalStatusClose) {
      this.listPresenter.closeModal();
    }
  }
  /** EventEmitter for delete-spark-api which we called in container page */
  @Output() update: EventEmitter<UnApprovedSpark> = new EventEmitter();

  // _sparkList is defined for store list of un-approved spark. 
  public _sparkList: UnApprovedSpark[];
  constructor(
    private listPresenter: SparkNotificationPresenter,
    public changeDetection: ChangeDetectorRef,
    private loaderService: LoaderService,
    public breakpointObserver: BreakpointObserver, ) {
      this.containerClass = NoRecordFoundViewClass;
  }

  ngOnInit() {
    this.listPresenter.update$.subscribe((spark: UnApprovedSpark) => {
      this.update.next(spark)
    });
  }

  ngOnChanges() {
    if (this._sparkList) {
      this.desktopView();
      this.loaderService.emitIsLoaderShown(false);
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Create component desktop or accrodian based on minimum width.
   */
  private desktopView(): void {
    this.breakpointObserver
      .observe([DesktopWidth])
      .subscribe((state: BreakpointState) => {
        this.createComponent(state.matches);
      });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Create component (desktop/accrodian/no-records-found page) dynamically based on spakrs get.
   */
  private createComponent(isDesktopView: boolean): void {
    this.entry.clear();
    if (isDesktopView && this._sparkList && this._sparkList.length > 0) {
      this.containerClass = ListViewClass;
      this.componentRef = this.listPresenter.createListViewPage(this._sparkList, this.componentRef, this.entry, SparkNorificationListPresentation);
    } else if (!isDesktopView && this._sparkList && this._sparkList.length > 0) {
      this.containerClass = ListViewClass;
      this.componentRef = this.listPresenter.createListViewPage(this._sparkList, this.componentRef, this.entry, AccordianPresentation);
    } else {
      this.containerClass = NoRecordFoundViewClass;
      this.componentRef = this.listPresenter.createNoRecordsFoundPage(this.componentRef, this.entry, NoRecordsFoundComponent);
    }
  }

}
