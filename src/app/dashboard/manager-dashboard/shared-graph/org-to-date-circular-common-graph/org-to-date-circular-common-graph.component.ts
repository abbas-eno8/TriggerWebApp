/**
@author : Sonal Patil
@class : OrgToDateCircularCommonGraphComponent
@description :OrgToDateCircularCommonGraphComponent is created for dashboard separation & shared graph data.
**/
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'trigger-org-to-date-circular-common-graph',
  templateUrl: './org-to-date-circular-common-graph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgToDateCircularCommonGraphComponent implements OnInit { 
  @Input() totalCountOfIP: any;
  @Input() totalCountOfA: any;
  @Input() totalCountOfB: any;
  @Input() totalCountOfC: any;
  @Input() totalCountOfRP: any;
  @Output() callonClickmyOrgToDate: EventEmitter<string> = new EventEmitter<string>();
  @Input() isShowIPGrade: boolean;
  constructor() { }

  ngOnInit() {
  }

  /**
     * Author : Sonal Patil
     * Modified-Date :  19-12-2018
     * Description : Emit value to dashboard component for redirect employeelist from dashboard, click on my-org-to-date graph.
  */
  onClickmyOrgToDate(value) {
    this.callonClickmyOrgToDate.emit(value);
  }
}
