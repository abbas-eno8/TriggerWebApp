/**
 * @author Mihir Patel
 * @class  AssessmentRoutingModule
 * This module consists of all assessment routes. Note that RouterModule is configured using forChild().
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// --------------------------------------- //
import { IndividualEmployeeComponent } from './individual-employee.component';
import { LoadChildren } from '../../core/magic-string/common.model';

const INDIVIDUALEMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: IndividualEmployeeComponent,
    children:[
      {
        path:'', loadChildren:'../spark-an-employee/spark-an-employee.module#SparkAnEmployeeModule'
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(INDIVIDUALEMPLOYEE_ROUTES)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class IndividualEmployeeRoutingModule { }
