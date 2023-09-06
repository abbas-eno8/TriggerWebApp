/**
 * description :AddAdminModule is created for add/edit operation for client.
 * @author : Anjali Tandel
 * @class : AddClientModule
 */
import { NgModule } from '@angular/core';
// ........................................ //
import { AddClientRoutingModule } from './add-client.routing.module';
import { AddClientComponent } from './add-client.component';
import { SharedModule } from '../../shared/shared.module';
import { WorkLocationContainer } from './work-location-list-container/work-location.container';
import { WorkLocationPresentation } from './work-location-list-container/work-location-presentation/work-location.presentation';
import { AddClientService } from './add-client-service/add-client.service';
import { WorkLocationPopupComponent } from './work-location-list-container/work-location-presentation/work-location-popup/work-location-popup.component';

@NgModule({
  imports: [
    AddClientRoutingModule,
    SharedModule,
  ],
  declarations: [
    AddClientComponent,
    WorkLocationPopupComponent,
    WorkLocationContainer,
    WorkLocationPresentation
  ],
  providers:[
    AddClientService
  ],
  entryComponents: [
    WorkLocationPopupComponent,
    WorkLocationPresentation
  ]
})
export class AddClientModule { }