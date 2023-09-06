/**
@author : Sonal Patil
@class : TotalOrgTodayComponent
@description :TotalOrgTodayComponent is created for dashboard separation.
**/
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { CompareString } from '../../../core/magic-string/common.model';
import { TooltioHeaderTotalOrgToday } from '../../../shared/tooltip/tooltip-model';
import { DashboardPassHeaderName, RedirectionParam, widgetType } from '../manager-dashboard-model';
import { TeamDashboardAdapter } from '../../dashboard-adapter/dashboard-adapter';

@Component({
  selector: '[trigger-total-org-today].col-xl-3 .col-md-6 .col-sm-12 .grid-item .px-0[id=total-org-today]',
  templateUrl: './total-org-today.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalOrgTodayComponent implements OnInit {
  @Input() noOfMyOrgToday: number;
  @Input() selectedYearBinding: any;
  @Input() role: any;
  @Output() removeTile: EventEmitter<string> = new EventEmitter<string>();
  @Output() redirectedToList = new EventEmitter<RedirectionParam>();
  public isToDate: any
  public pageTitle: string;
  constructor(private adapter: TeamDashboardAdapter) {
    this.pageTitle = TooltioHeaderTotalOrgToday;
    this.isToDate = CompareString.To_Date;
  }

  ngOnInit() { }

  /**
   * Author : Sonal Patil
   * Modified by :  Anjali Tandel
   * Modified-Date : 05/03/2020
   * Description : Emit value to dashboard component for redirect to employeelist from dashboard.
   */
  public onclickgoToNumberOfMyOrganization(): void {
    this.redirectedToList.emit(this.adapter.dashboardRedirectionParam(widgetType.organizationWidgetId));
  }

  /**
     * Author : Sonal Patil
     * ModifiedBy : Mihir Patel
     * Modified-Date :  6-3-2019
     * Description : Emit value to dashboard component for remove widget by id.
  */
  onclickremoveTile() {
    this.removeTile.emit(DashboardPassHeaderName.TotalOrgToday);
  }
}
