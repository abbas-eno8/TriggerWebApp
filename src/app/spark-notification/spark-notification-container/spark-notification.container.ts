/**
@author : Mihir Patel
@class : SparkNotificationContainer
@description : SparkNotificationContainer is reponsible for service call of spark notification module.
**/
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SparkNotificationService } from '../spark-notification-service/spark-notification.service';
import { ApiResponse, RequestModel } from '../spark-notification-model';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { LoaderService } from '../../core/loader/loader.service';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-spark-notification-container',
  templateUrl: './spark-notification.container.html'
})
export class SparkNotificationContainer implements OnInit {
  //  sparkList is observalbe and pass as input to presentation
  public sparkList$: Observable<ApiResponse> = this.sparkNotificationService.getSparks();
  //  isModalStatusClose defined for manage status of modalpopup is open or close.
  public isModalStatusClose: boolean = false;
  constructor(
    private sparkNotificationService: SparkNotificationService,
    private loaderService: LoaderService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private globalEventsManager: GlobalEventsManager) {
    this.loaderService.emitIsLoaderShown(true);
  }

  ngOnInit() { }

  /**
   * Author : Mihir Patel
   * Created-Date : 10-09-2019
   * Descriotion : Create method for update spark with status approved or reject, based on that if reject spark api called then close overlay popup.
   * After successfully server call updateCount subject call, which is subcribe in topbar for manage count.
   */
  public submitSpark(spark: RequestModel): void {
    this.isModalStatusClose = false;
    this.sparkNotificationService.submitSpark(spark).subscribe(
      (sparkList) => {
        if (this.globalResponseHandlerService.getApiResponse(sparkList, true, false)) {
          this.sparkList$ = this.sparkNotificationService.getSparks();
          if (spark.ApprovalStatus === 2) {
            this.isModalStatusClose = true;
          }
        }
      }
    );
  }

}
