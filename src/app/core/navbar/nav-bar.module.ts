/**
@author : Mihir Patel
@class : NavBarModule
@description :NavBarModule is contained with SideBarComponent and TopBarComponent.
**/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// ........................................//
import { SideBarComponent } from './sidebar/sidebar.component';
import { TopBarComponent } from './topbar/topbar.component';
import { GlobalEventsManager } from './globalEventsManager';
import { SharedModule } from '../../shared/shared.module';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service/notification.service';
import { CommonRedirectionServiceService } from '../services/common-redirection-service/common-redirection-service.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    SideBarComponent,
    TopBarComponent,
    NotificationComponent
  ],
  providers: [
    NotificationService,
    CommonRedirectionServiceService,
    GlobalEventsManager
  ],
  exports: [
    RouterModule,
    SideBarComponent,
    TopBarComponent
  ]
})
export class NavBarModule { }