/**
@author : Anjali Tandel
@class : DateTimeStampComponent
@description : DateTimeStampComponent is created for get current-date-time which we are using in assessment/employee-dashboard page.
**/
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'DateTimeStamp',
  template: `<div class="counter-parent">
        <span>{{ currentDateTime | date: 'MM/dd/yyyy h:mm:ss aaa'}}</span>
    </div>`,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimeStamp {
  /** currentDateTime created for store current date & time */
  public currentDateTime: Date;
  constructor(private changeDetector: ChangeDetectorRef) {
    this.currentDateTime = new Date();
    this.getCurrentDateTime();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-08-2019
   * Description : Create function for start Countdown timer.
   */
  public getCurrentDateTime(): void {
    setInterval(() => {
      this.currentDateTime = new Date()
      this.changeDetector.detectChanges();
    }, 1000);
  }
}
