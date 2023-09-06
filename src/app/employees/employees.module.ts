/**
@author : Mihir Patel
@class : EmployeesModule
@description :EmployeesModule is created for employee module, which used for define employee component and modules.
**/

import { NgModule } from '@angular/core';
// ..................................... //
import { EmployeesComponent } from './employees.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { DepartmentService } from '../department/department.service/department.service';
import { EditSalaryComponent } from './edit-salary/edit-salary.component';
import { OverlayContainer, FullscreenOverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { SparkAnEmployeeService } from './spark-an-employee/spark-an-employee-service/spark-an-employee.service';
import { SparkAnEmployeeAdapter } from './spark-an-employee/spark-an-employee-adapter/spark-an-employee-adapter';
import { SparkListPresenter } from './spark-an-employee/spark-list-container/spark-list-presenter/spark-list-presenter';
import { SparkEditFormPresentaton } from './spark-an-employee/spark-list-container/spark-list-presentation/spark-edit-presentaton/spark-edit-form.presentaton';
// import { SparkPreviewPresentation } from './spark-an-employee/spark-list-container/spark-list-presentation/spark-preview-presentation/spark-preview-presentation';
import { EmployeeAdapter } from './employee-adapter/employee-adapter';
import { TeamMemberContainer } from './team-member/team-member-container/team-member.container';
import { TeamMemberService } from './team-member/team-member-service/team-member.service';
import { TeamMembersAdapter } from './team-member/team-member-adapter/team-member-adapter';
import { MemberDesktopPresentation } from './team-member/team-member-container/members-presentation/member-desktop/member-desktop.presentation';
import { MemberAccordianPresentation } from './team-member/team-member-container/members-presentation/member-accordian/member-accordian.presentation';
import { MemberPresentation } from './team-member/team-member-container/members-presentation/member-presentation';
import { MemberPresenter } from './team-member/team-member-container/members-presentation/member-presenter/member.presenter';
import { ColumnSorterPesentation } from './team-member/team-member-container/members-presentation/column-sorter-pesentation/column-sorter.pesentation';
import { DndModule} from 'ng2-dnd';
import { MatCardModule, MatMenuModule } from '@angular/material';
import { PaginationPresentation } from './team-member/team-member-container/members-presentation/pagination-presentation/pagination.presentation';
import { EmployeeFilterListComponent } from './team-member/team-member-container/members-presentation/employee-filter-list/employee-filter-list.component';
import { CommonService } from '../core/services/common/common.service';
@NgModule({
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    OverlayModule,
    DndModule.forRoot(),
    MatCardModule,
    MatMenuModule
  ],
  declarations: [
    EmployeesComponent,
    EditSalaryComponent,
    SparkEditFormPresentaton,
    // SparkPreviewPresentation,
    TeamMemberContainer,
    MemberDesktopPresentation,
    MemberAccordianPresentation,
    MemberPresentation,
    ColumnSorterPesentation,
    PaginationPresentation,
    EmployeeFilterListComponent
  ],
  providers: [
    DepartmentService,
    TeamMemberService,
    TeamMembersAdapter,
    SparkAnEmployeeAdapter,
    SparkAnEmployeeService,
    SparkListPresenter,
    EmployeeAdapter,
    MemberPresenter,
  ],
  exports: [],
  entryComponents: [
    EditSalaryComponent,
    SparkEditFormPresentaton,
    // SparkPreviewPresentation,
    MemberDesktopPresentation,
    MemberAccordianPresentation,
    PaginationPresentation,
    EmployeeFilterListComponent
  ]
})
export class EmployeesModule { }