/**
@author : Mihir Patel
@class : DashboardModule
@description :DashboardModule is created for dashboard page, which contain DashboardComponent.
**/
import { NgModule } from '@angular/core';
// ........................................//
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardPresenter } from './dashboard-presenter/dashboard.presenter';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { DashboardService } from './dashboard-service/dashboard.service';
import { TeamDashboardAdapter } from './dashboard-adapter/dashboard-adapter';
import { TeamWidgetComponent } from './team-dashboard/team-widget/team-widget.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { AverageDirectReportTodayComponent } from './manager-dashboard/average-direct-report-today/average-direct-report-today.component';
import { AverageOrgTodayComponent } from './manager-dashboard/average-org-today/average-org-today.component';
import { DirectReportsByAverageScoreComponent } from './manager-dashboard/direct-reports-by-average-score/direct-reports-by-average-score.component';
import { DirectReportsToDateComponent } from './manager-dashboard/direct-reports-to-date/direct-reports-to-date.component';
import { DirectReportsToDateProgressiveComponent } from './manager-dashboard/direct-reports-to-date-progressive/direct-reports-to-date-progressive.component';
import { DirectReportsToDateProgressivePieComponent } from './manager-dashboard/direct-reports-to-date-progressive-pie/direct-reports-to-date-progressive-pie.component';
import { OrgByAverageScoreComponent } from './manager-dashboard/org-by-average-score/org-by-average-score.component';
import { OrgToDateComponent } from './manager-dashboard/org-to-date/org-to-date.component';
import { OrgToDateCircularComponent } from './manager-dashboard/org-to-date-circular/org-to-date-circular.component';
import { OrgToDateCircularPieComponent } from './manager-dashboard/org-to-date-circular-pie/org-to-date-circular-pie.component';
import { TotalDirectReportTodayComponent } from './manager-dashboard/total-direct-report-today/total-direct-report-today.component';
import { TotalOrgTodayComponent } from './manager-dashboard/total-org-today/total-org-today.component';
import { DirectReportsToDateProgressiveCommonGraphComponent } from './manager-dashboard/shared-graph/direct-reports-to-date-progressive-common-graph/direct-reports-to-date-progressive-common-graph.component';
import { OrgToDateCircularCommonGraphComponent } from './manager-dashboard/shared-graph/org-to-date-circular-common-graph/org-to-date-circular-common-graph.component';
import { SelectDepartmentComponent } from './manager-dashboard/select-department/select-department.component';
import { ManagerDashboardService } from './manager-dashboard/manager-dashboard-service/manager-dashboard.service';
import { ThreeCloumnWidgetsComponent } from './manager-dashboard/mobile-view/three-cloumn-widgets/three-cloumn-widgets.component';
import { RequestForSparkTriggerComponent } from './request-for-spark-trigger/request-for-spark-trigger.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MyDashboardWidgetComponent } from './my-dashboard/my-dashboard-widget/my-dashboard-widget.component';
import { MyDashboardListComponent } from './my-dashboard/my-dashboard-list/my-dashboard-list.component';
import { CreateRequestAccordionTableComponent } from './my-dashboard/my-dashboard-list/create-request/create-request-accordion-table/create-request-accordion-table.component';
import { CreateRequestTableComponent } from './my-dashboard/my-dashboard-list/create-request/create-request-table/create-request-table.component';
import { MyRequestAccordionTableComponent } from './my-dashboard/my-dashboard-list/my-request/my-request-accordion-table/my-request-accordion-table.component';
import { MyRequestTableComponent } from './my-dashboard/my-dashboard-list/my-request/my-request-table/my-request-table.component';
import { MyDashboardService } from './my-dashboard/my-dashboard-service/my-dashboard.service';
import { EmployeeGuidanceComponent } from './my-dashboard/my-dashboard-widget/employee-guidance/employee-guidance.component';
// import { MyWallContainer } from '../my-wall/my-wall-container/my-wall.container';
// import { MyWallPresentation } from '../my-wall/my-wall-container/my-wall-presentation/my-wall.presentation';
// import { LikePresentation } from '../my-wall/my-wall-container/my-wall-presentation/like-presentation/like.presentation';
// import { ReactionTooltip } from '../my-wall/my-wall-container/my-wall-presentation/reaction-tooltip/reaction-tooltip';
// import { MyWallAdapter } from '../my-wall/my-wall-adapter/my-wall-adapter';
// import { MyWallPresenter } from '../my-wall/my-wall-container/my-wall-presentation/my-wall-presenter/my-wall.presenter';
// import { MyWallService } from '../my-wall/my-wall-service/my-wall.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TeamsMobileWidgetComponent } from './team-dashboard/mobile-view/teams-mobile-widget/teams-mobile-widget.component';
import { MyDirectWorkLocationHistoryComponent } from './manager-dashboard/my-direct-work-location-history/my-direct-work-location-history.component';
@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule,
    //InfiniteScrollModule
  ],
  declarations: [
    DashboardComponent,
    ManagerDashboardComponent,
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
    DirectReportsToDateProgressiveCommonGraphComponent,
    OrgToDateCircularCommonGraphComponent,
    SelectDepartmentComponent,
    TeamDashboardComponent,
    TeamWidgetComponent,
    TeamsMobileWidgetComponent,
    ThreeCloumnWidgetsComponent,
    RequestForSparkTriggerComponent,
    MyDashboardComponent,
    MyDashboardWidgetComponent,
    MyDashboardListComponent,
    CreateRequestAccordionTableComponent,
    CreateRequestTableComponent,
    MyRequestAccordionTableComponent,
    MyRequestTableComponent,
    EmployeeGuidanceComponent,
    // MyWallContainer,
    // MyWallPresentation,
    // LikePresentation,
    // ReactionTooltip,
    MyDirectWorkLocationHistoryComponent
  ],
  providers: [
    DashboardService,
    DashboardPresenter,
    ManagerDashboardService,
    TeamDashboardAdapter,
    MyDashboardService,
    // MyWallAdapter,
    // MyWallPresenter,
    // MyWallService
  ],
  entryComponents: [
    ManagerDashboardComponent,
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
    DirectReportsToDateProgressiveCommonGraphComponent,
    OrgToDateCircularCommonGraphComponent,
    SelectDepartmentComponent,
    TeamDashboardComponent,
    TeamWidgetComponent,
    TeamsMobileWidgetComponent,
    ThreeCloumnWidgetsComponent,
    RequestForSparkTriggerComponent,
    MyDashboardComponent,
    CreateRequestAccordionTableComponent,
    CreateRequestTableComponent,
    MyRequestAccordionTableComponent,
    MyRequestTableComponent,
    MyDashboardListComponent,
    MyDashboardWidgetComponent,
    EmployeeGuidanceComponent,
    // MyWallContainer,
    // LikePresentation,
    MyDirectWorkLocationHistoryComponent
  ]
})
export class DashboardModule { }