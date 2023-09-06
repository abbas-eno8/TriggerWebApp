/**
@author : Anjali Tandel
@class : ContactUsModule
@description :ContactUsModule is created for contact-us operation.
**/
import { NgModule } from '@angular/core';
// ........................................//
import { SharedModule } from '../shared/shared.module';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsService } from './contact-us-service/contact-us.service';
@NgModule({
  imports: [
    ContactUsRoutingModule,
    SharedModule
  ],
  declarations: [
    ContactUsComponent
  ],
  providers: [
    ContactUsService
  ]
})
export class ContactUsModule { }