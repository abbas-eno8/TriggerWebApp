/**
@author : Mihir Patel
@class : AdminModule
@description :AdminModule is created for Admin operations.
**/
import { NgModule } from '@angular/core';
// ........................................//
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminTableComponent } from './admin-list/admin-table/admin-table.component';
import { AdminAccordionTableComponent } from './admin-list/admin-accordion-table/admin-accordion-table.component';
@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    AdminListComponent,
    AdminTableComponent,
    AdminAccordionTableComponent
  ],
  providers: [],
  exports: []
})
export class AdminModule { }