/**
@author : Sonal Patil
@class : AverageOrgTodayComponent
@description :AverageOrgTodayComponent is created for dashboard separation.
**/
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { DashboardPassHeaderName } from '../manager-dashboard-model';
import { TooltioHeaderAverageOrgToday } from '../../../shared/tooltip/tooltip-model';
import { CompareString } from '../../../core/magic-string/common.model';

@Component({
  selector: '[trigger-average-org-today].col-xl-3 .col-md-6 .col-sm-12 .grid-item .px-0[id=average-org-today]',
  templateUrl: './average-org-today.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AverageOrgTodayComponent implements OnInit {
  @Input() avgScoreOfOrgToday: string;
  @Input() avgScoreOfOrgTodayClass: string;
  @Input() selectedYearBinding: any;
  @Input() role: any;
  @Output() removeTile: EventEmitter<string> = new EventEmitter<string>();
  public isToDate: string;
  public pageTitle: string;
  constructor() {
    this.pageTitle = TooltioHeaderAverageOrgToday;
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
    this.removeTile.emit(DashboardPassHeaderName.AverageOrgToday);
  }
}
