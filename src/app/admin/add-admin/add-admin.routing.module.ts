/**
 * @author Anjali Tandel
 * @class  AddEmployeeRoutingModule
 * This module consists of add/edit admin route.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// --------------------------------------- //
import { AddAdminComponent } from './add-admin.component';

const ADDADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AddAdminComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ADDADMIN_ROUTES)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AddAdminRoutingModule { }
