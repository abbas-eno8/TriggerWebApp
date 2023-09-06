/**
@author : Mihir Patel
@class : UserProfileModule
@description :UserProfileModule is created for user operations.
**/
import { NgModule } from '@angular/core';
// ........................................//
import { SharedModule } from '../shared/shared.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { ProfileUploadComponent } from './profile-upload/profile-upload.component';
import { UserProfileService } from './user-profile-service/user-profile.service';
import { SmsConfirmationService } from './sms-confirmation/sms-confirmation-service/sms-confirmation.service';
@NgModule({
  imports: [
    UserProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    UserProfileComponent,
    ProfileUploadComponent
  ],
  providers: [
    UserProfileService,
    SmsConfirmationService
  ],
  entryComponents: [ProfileUploadComponent]
})
export class UserProfileModule { }