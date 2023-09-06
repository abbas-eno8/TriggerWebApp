/**
@author : Sonal Patil
@class : AverageDirectReportTodayComponent
@description :AverageDirectReportTodayComponent is created for dashboard separation.
**/
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DashboardPassHeaderName } from '../manager-dashboard-model';
import { TooltioHeaderAverageDirectReportToday } from '../../../shared/tooltip/tooltip-model';
import { CompareString } from '../../../core/magic-string/common.model';

@Component({
  selector: '[trigger-average-direct-report-today].col-xl-3 .col-md-6 .col-sm-12 .grid-item .px-0[id=average-direct-report-today]',
  templateUrl: './average-direct-report-today.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AverageDirectReportTodayComponent implements OnInit {
  @Input() avgScoreOfTodayDirectReport: string;
  @Input() avgScoreOfTodayDirectReportClass: string;
  @Input() selectedYearBinding: any;
  @Input() role: any;
  @Output() removeTile = new EventEmitter<string>();
  public isToDate: any;
  public pageTitle: string;
  constructor() {
    this.pageTitle = TooltioHeaderAverageDirectReportToday;
    this.isToDate = CompareString.To_Date;
  }

  ngOnInit() { }

  /**
     * Author : Sonal Patil
     * ModifiedBy : Mihir Patel
     * Modified-Date :  6-3-2019
     * Description : Emit value to dashboard component for remove widget by id.
     */
  onclickremoveTile() {
    this.removeTile.emit(DashboardPassHeaderName.AverageDirectReportToday);
  }
}
