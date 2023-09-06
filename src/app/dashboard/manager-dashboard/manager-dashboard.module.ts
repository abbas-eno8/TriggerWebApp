import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// ........................................//
import { ManagerDashboardService } from './manager-dashboard-service/manager-dashboard.service';
import { AverageDirectReportTodayComponent } from './average-direct-report-today/average-direct-report-today.component';
import { AverageOrgTodayComponent } from './average-org-today/average-org-today.component';
import { DirectReportsByAverageScoreComponent } from './direct-reports-by-average-score/direct-reports-by-average-score.component';
import { DirectReportsToDateComponent } from './direct-reports-to-date/direct-reports-to-date.component';
import { DirectReportsToDateProgressiveComponent } from './direct-reports-to-date-progressive/direct-reports-to-date-progressive.component';
import { DirectReportsToDateProgressivePieComponent } from './direct-reports-to-date-progressive-pie/direct-reports-to-date-progressive-pie.component';
import { OrgByAverageScoreComponent } from './org-by-average-score/org-by-average-score.component';
import { OrgToDateComponent } from './org-to-date/org-to-date.component';
import { OrgToDateCircularComponent } from './org-to-date-circular/org-to-date-circular.component';
import { OrgToDateCircularPieComponent } from './org-to-date-circular-pie/org-to-date-circular-pie.component';
import { TotalDirectReportTodayComponent } from './total-direct-report-today/total-direct-report-today.component';
import { TotalOrgTodayComponent } from './total-org-today/total-org-today.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './manager-dashboard-routing.module';
import { MyDirectWorkLocationHistoryComponent } from './my-direct-work-location-history/my-direct-work-location-history.component';


@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
  ],
  providers: [
    ManagerDashboardService
  ],
  exports: [
    RouterModule
  ],
  entryComponents:[
    AverageDirectReportTodayComponent,
    AverageOrgTodayComponent,
    DirectReportsByAverageScoreComponent,
    DirectReportsToDateComponent,
    DirectReportsToDateProgressiveComponent,
    DirectReportsToDateProgressivePieComponent,
    OrgByAverageScoreComponent,
    OrgToDateComponent,
    OrgToDateCircularComponent,
    OrgToDateCircularPieComponent,
    TotalDirectReportTodayComponent,
    TotalOrgTodayComponent,
    MyDirectWorkLocationHistoryComponent
  ]
})
export class ManagerDashboardModule { }
