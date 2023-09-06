/**
@author : Mihir Patel
@class : ChangePasswordModule
@description :ChangePasswordModule is created for change-password operation.
**/
import { NgModule } from '@angular/core';
// ........................................//
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
@NgModule({
  imports: [
    ChangePasswordRoutingModule,
    SharedModule
  ],
  declarations: [
    ChangePasswordComponent
  ],
  providers: [],
  exports: []
})
export class ChangePasswordModule { }