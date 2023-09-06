/**
@author : Sonal Patil
@class : DirectReportsToDateProgressiveCommonGraphComponent
@description :DirectReportsToDateProgressiveCommonGraphComponent is created for dashboard separation & shared graph data.
**/
import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'trigger-direct-reports-to-date-progressive-common-graph',
  templateUrl: './direct-reports-to-date-progressive-common-graph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectReportsToDateProgressiveCommonGraphComponent implements OnInit {
  @Output() callgoToEmployeeListPage: EventEmitter<string> = new EventEmitter<string>();
  @Input() pieStatckTotalCountOfIP: any;
  @Input() pieStatckTotalCountOfA: any;
  @Input() pieStatckTotalCountOfB: any;
  @Input() pieStatckTotalCountOfC: any;
  @Input() pieStatckTotalCountOfRP: any;
  @Input() isShowIPGrade: boolean;
  constructor() { }

  ngOnInit() {
  }

  /**
     * Author : Sonal Patil
     * Modified-Date :  19-12-2018
     * Description : Emit value to dashboard component for redirect employeelist from dashboard, click on Direct-report-to-date graph.
  */
  onClickgoToEmployeeListPage(value) {
    this.callgoToEmployeeListPage.emit(value);
  }

}
