/**
@author : Anjali Tandel
@class : SparkAnEmployeeModule
@description : SparkAnEmployeeModule is created for spark module, which used for define spark list, add, eidt, delete component and modules.
**/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SparkAnEmployeeRoutingModule } from './spark-an-employee-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SparkAnEmployeeService } from './spark-an-employee-service/spark-an-employee.service';
import { SparkAnEmployeeAdapter } from './spark-an-employee-adapter/spark-an-employee-adapter';
import { SparkListContainer } from './spark-list-container/spark-list.container';
import { SparkListPresentation } from './spark-list-container/spark-list-presentation/spark-list.presentation';
import { SparkDesktopPresentation } from './spark-list-container/spark-list-presentation/spark-desktop-presentation/spark-desktop.presentation';
import { SparkAccrodianPresentation } from './spark-list-container/spark-list-presentation/spark-accrodian-presentation/spark-accrodian.presentation';
import { SparkFormPresenter } from './spark-list-container/spark-list-presentation/spark-form-presenter/spark-form-presenter';
import { SparkAddFormPresentation } from './spark-list-container/spark-list-presentation/spark-add-form-presentation/spark-add-form.presentation';
import { SparkWidgetPresentation } from './spark-list-container/spark-widget-presentation/spark-widget.presentation';
import { SparkListPresenter } from './spark-list-container/spark-list-presenter/spark-list-presenter';
import { SparkReplyPresentation } from './spark-list-container/spark-reply-presentation/spark-reply-presentation';
import { SparkPreviewPresentation } from './spark-list-container/spark-list-presentation/spark-preview-presentation/spark-preview-presentation';
@NgModule({
  imports: [
    SharedModule,
    SparkAnEmployeeRoutingModule
  ],
  declarations: [
    SparkListContainer,
    SparkListPresentation,
    SparkDesktopPresentation,
    SparkAccrodianPresentation,
    SparkAddFormPresentation,
    SparkWidgetPresentation,
    SparkReplyPresentation,
    SparkPreviewPresentation
  ],
  providers: [
    SparkAnEmployeeService,
    SparkAnEmployeeAdapter,
    SparkFormPresenter,
    SparkListPresenter
  ],
  entryComponents: [
    SparkDesktopPresentation,
    SparkAccrodianPresentation,
    SparkAddFormPresentation,
    SparkPreviewPresentation
  ]
})
export class SparkAnEmployeeModule { }
