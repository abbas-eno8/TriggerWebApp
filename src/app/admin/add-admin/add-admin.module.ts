/**
@author : Anjali Tandel
@class : AddAdminModule
@description :AddAdminModule is created for add/edit operation for admin.
**/
import { NgModule } from '@angular/core';
// ........................................ //
import { SharedModule } from '../../shared/shared.module';
import { AddAdminComponent } from './add-admin.component';
import { AddAdminRoutingModule } from './add-admin.routing.module';


@NgModule({
  imports: [
    AddAdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AddAdminComponent
  ],
  providers: [
  ],
  exports: []
})
export class AddAdminModule { }