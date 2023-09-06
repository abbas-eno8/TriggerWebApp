/**
 * @author Mihir Patel
 * @class  AddEmployeeRoutingModule
 * This module consists of add/edit employee route.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// --------------------------------------- //
import { AddEmployeeComponent } from './add-employee.component';

const ADDEMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: AddEmployeeComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ADDEMPLOYEE_ROUTES)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AddEmployeeRoutingModule { }
