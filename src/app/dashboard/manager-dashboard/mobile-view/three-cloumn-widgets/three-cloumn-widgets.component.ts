import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { widgetType, RedirectionParam } from '../../manager-dashboard-model';
import { TeamDashboardAdapter } from '../../../dashboard-adapter/dashboard-adapter';

@Component({
  selector: 'trigger-three-cloumn-widgets',
  templateUrl: './three-cloumn-widgets.component.html',
  styleUrls: ['./three-cloumn-widgets.component.scss']
})
export class ThreeCloumnWidgetsComponent implements OnInit {
  @Input() noOfTodatDirectReport: string;
  @Input() avgScoreOfTodayDirectReport: string;
  @Input() avgScoreOfTodayDirectReportClass: string;
  @Input() noOfMyOrgToday: string;
  @Input() avgScoreOfOrgToday: string;
  @Input() avgScoreOfOrgTodayClass: string;
  
  @Output() redirectedToList = new EventEmitter<RedirectionParam>();
  public bgAvgScoreOfTodayDirectReportClass: string;
  public bgavgScoreOfOrgTodayClass: string;
  constructor(private adapter: TeamDashboardAdapter) {

  }

  ngOnInit() {
    if (!!this.avgScoreOfTodayDirectReport) {
      this.bgAvgScoreOfTodayDirectReportClass = 'bg' + this.avgScoreOfTodayDirectReportClass.split('text')[1];
    } else {
      this.avgScoreOfTodayDirectReport = '-'
      this.bgAvgScoreOfTodayDirectReportClass = 'bg-dark';
    }

    if (!!this.avgScoreOfOrgToday) {
      this.bgavgScoreOfOrgTodayClass = 'bg' + this.avgScoreOfOrgTodayClass.split('text')[1];
    } else {
      this.avgScoreOfOrgToday = '-'
      this.bgavgScoreOfOrgTodayClass = 'bg-dark'
    }
  }

  /**
   * Author : Sonal Patil
   * Modified by : Anjali Tandel
   * Modified-Date : 05/03/2020
   * Description : Emit value to dashboard component for redirect to employeelist from dashboard.
   */
  onclickgoToNumberOfDirectReport() {
    this.redirectedToList.emit(this.adapter.dashboardRedirectionParam(widgetType.directWidgetId));
  }

  /**
   * Author : Sonal Patil
   * Modified by : Anjali Tandel
   * Modified-Date : 05/03/2020
   * Description : Emit value to dashboard component for redirect to employeelist from dashboard.
   */
  onclickgoToNumberOfMyOrganization() {
    this.redirectedToList.emit(this.adapter.dashboardRedirectionParam(widgetType.organizationWidgetId));
  }

}
