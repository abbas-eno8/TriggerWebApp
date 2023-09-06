/**
@author : Mihir Patel
@class : SparkNotificationRoutingModule
@description : SparkNotificationRoutingModule creatd for manage spark notification routes.
**/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SparkNotificationContainer } from './spark-notification-container/spark-notification.container';

const SPARKNOTIFICATION_ROUTS: Routes = [
  {
    path: '',
    component: SparkNotificationContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(SPARKNOTIFICATION_ROUTS)],
  exports: [RouterModule]
})
export class SparkNotificationRoutingModule { }
