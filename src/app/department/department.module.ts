/**
@author : Anjali Tandel
@class : DepartmentModule
@description :DepartmentModule is created for dashboard page.
**/
import { NgModule } from '@angular/core';
// ........................................//
import { DepartmentComponent } from './department.component';
import { DepartmentService } from '../department/department.service/department.service';
import { DepartmentRoutingModule } from './department-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentTableComponent } from './department-list/department-table/department-table.component';
import { DepartmentAccordionTableComponent } from './department-list/department-accordion-table/department-accordion-table.component';

@NgModule({
  imports: [
    DepartmentRoutingModule,
    SharedModule
  ],
  declarations: [
    DepartmentComponent,
    DepartmentListComponent,
    DepartmentTableComponent,
    DepartmentAccordionTableComponent
  ],
  providers: [
    DepartmentService
  ]
})
export class DepartmentModule { }