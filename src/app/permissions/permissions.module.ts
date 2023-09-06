import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { PermissionsService } from './permission-service/permissions.service';

@NgModule({
  imports: [
    PermissionsRoutingModule,
    SharedModule
  ],
  declarations: [
    PermissionsComponent
  ],
  providers: [PermissionsService],
})
export class PermissionsModule { }
