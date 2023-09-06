/**
@author : Mihir Patel
@class : AddEmployeeModule
@description :AddEmployeeModule is created for add/edit operation for employee.
**/
import { NgModule } from '@angular/core';
// ........................................ //
import { SharedModule } from '../../shared/shared.module';
import { AddEmployeeRoutingModule } from './add-employee.routing.module';
import { AddEmployeeComponent } from './add-employee.component';
//import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
//import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
@NgModule({
  imports: [
    AddEmployeeRoutingModule,
    SharedModule,
    //NgxMaterialTimepickerModule,
    // OwlDateTimeModule, 
    // OwlNativeDateTimeModule,
  ],
  declarations: [
    AddEmployeeComponent
  ]
})
export class AddEmployeeModule { }