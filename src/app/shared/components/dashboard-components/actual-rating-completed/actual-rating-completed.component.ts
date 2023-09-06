/**
@author : Sonal Patil
@class : ActualRatingCompletedComponent
@description :ActualRatingCompletedComponent is created for employee dashboard separation.
**/
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NumberOfActualRatingCompletedHeader } from '../../../../shared/tooltip/tooltip-model';

@Component({
  selector: '[trigger-actual-rating-completed].col-xl-3 .col-md-6 .col-sm-12 .grid-item .px-2 .mb-3[id=actual-rating-completed]',
  templateUrl: './actual-rating-completed.component.html'
})
export class ActualRatingCompletedComponent implements OnInit {
  public pageTitle: string;
  @Input() actualRating: string;
  @Input() lastYearActualRating: string;
  constructor() {
    this.pageTitle = NumberOfActualRatingCompletedHeader
  }

  ngOnInit() { }
}
