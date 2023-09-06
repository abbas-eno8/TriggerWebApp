/**
@author : Mihir Patel
@class : SparkNotificationModule
@description : SparkNotificationModule creatd for declare component and provide services.
**/
import { NgModule } from '@angular/core';
import { SparkNotificationRoutingModule } from './spark-notification-routing.module';
import { SparkNotificationContainer } from './spark-notification-container/spark-notification.container';
import { SparkNotificationPresentation } from './spark-notification-container/spark-notification-presentation/spark-notification.presentation';
import { SparkNotificationService } from './spark-notification-service/spark-notification.service';
import { SharedModule } from '../shared/shared.module';
import { SparkNotificationAdapter } from './spark-notification-adapter/spark-notification.adapter';
import { SparkNotificationDeclinePresentation } from './spark-notification-container/spark-notification-presentation/spark-notification-decline-presentation/spark-notification-decline.presentation';
import { SparkNorificationListPresentation } from './spark-notification-container/spark-notification-presentation/spark-norification-list-presentation/spark-norification-list.presentation';
import { AccordianPresentation } from './spark-notification-container/spark-notification-presentation/accordian-presentation/accordian.presentation';

@NgModule({
  imports: [
    SharedModule,
    SparkNotificationRoutingModule
  ],
  declarations: [
    SparkNotificationContainer,
    SparkNotificationPresentation,
    SparkNotificationDeclinePresentation,
    SparkNorificationListPresentation,
    AccordianPresentation
  ],
  providers:[
    SparkNotificationService,
    SparkNotificationAdapter
  ],
  entryComponents: [
    SparkNorificationListPresentation,
    SparkNotificationDeclinePresentation,
    AccordianPresentation
  ]
})
export class SparkNotificationModule { }
