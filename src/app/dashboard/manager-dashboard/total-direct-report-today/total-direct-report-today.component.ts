/**
@author : Sonal Patil
@class : TotalDirectReportTodayComponent
@description :TotalDirectReportTodayComponent is created for dashboard separation.
**/
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CompareString } from '../../../core/magic-string/common.model';
import { TooltioHeaderTotalDirectReportToday } from '../../../shared/tooltip/tooltip-model';
import { DashboardPassHeaderName, RedirectionParam, widgetType } from '../manager-dashboard-model';
import { TeamDashboardAdapter } from '../../dashboard-adapter/dashboard-adapter';

@Component({
  selector: '[trigger-total-direct-report-today].col-xl-3 .col-md-6 .col-sm-12 .grid-item .px-0[id=total-direct-report-today]',
  templateUrl: './total-direct-report-today.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalDirectReportTodayComponent implements OnInit {
  @Input() noOfTodatDirectReport: string;
  @Input() selectedYearBinding: any;
  @Input() role: any;
  @Output() removeTile = new EventEmitter<string>();
  @Output() redirectedToList = new EventEmitter<RedirectionParam>();
  
  public isToDate: any;
  public pageTitle: string;
  
  constructor(
    private adapter: TeamDashboardAdapter
    ) {
    this.pageTitle = TooltioHeaderTotalDirectReportToday;
    this.isToDate = CompareString.To_Date;
  }

  ngOnInit() {
  }

  /**
   * Author : Sonal Patil
   * Modified by :  Anjali Tandel
   * Modified-Date : 05/03/2020
   * Description : Emit value to dashboard component for redirect to employeelist from dashboard.
   */
  public onclickgoToNumberOfDirectReport(): void {
    this.redirectedToList.emit(this.adapter.dashboardRedirectionParam(widgetType.directWidgetId));
  }

  /**
     * Author : Sonal Patil
     * Modified-Date :  19-12-2018
     * Description : Emit value to dashboard component for remove widget by id.
  */
  onclickremoveTile() {
    this.removeTile.emit(DashboardPassHeaderName.TotalDirectReportToday);
  }
}
