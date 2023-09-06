/**
 * description :AddClientRoutingModule is created add/edit clients.
 * @author :Anjali Tandel
 * @class : AddClientRoutingModule
 */
import { AddClientComponent } from './add-client.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// --------------------------------------- //
const ADDCLIENT_ROUTES: Routes = [
  {
    path: '',
    component: AddClientComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ADDCLIENT_ROUTES)
  ],
  exports: [RouterModule]
})
export class AddClientRoutingModule { }
