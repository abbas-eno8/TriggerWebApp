/**
@author : Anjali Tandel
@class : MasterModule
@description :MasterModule is created for Master dimension crud operation.
**/
import { NgModule } from '@angular/core';
// ........................................//
import { SharedModule } from '../shared/shared.module';
import { MastersRoutingModule } from './masters-routing.module';
import { MastersComponent } from './masters.component';
import { DimensionService } from './dimension-services/dimension.service';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
@NgModule({
  imports: [
    MastersRoutingModule,
    SharedModule
  ],
  providers: [DimensionService],
  declarations: [
    MastersComponent,
    AddAttributeComponent
  ],
  entryComponents: [AddAttributeComponent]
})
export class MasterModule { }