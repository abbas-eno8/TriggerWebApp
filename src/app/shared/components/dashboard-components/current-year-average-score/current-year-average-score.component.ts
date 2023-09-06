/**
@author : Sonal Patil
@class : CurrentYearAverageScoreComponent
@description :CurrentYearAverageScoreComponent is created for employee dashboard separation.
**/
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AverageScoreHeader } from '../../../../shared/tooltip/tooltip-model';

@Component({
  selector: '[trigger-current-year-average-score].col-xl-3 .col-md-6 .col-sm-12 .grid-item .px-2 .mb-3[id=current-year-average-score]',
  templateUrl: './current-year-average-score.component.html'
})
export class CurrentYearAverageScoreComponent implements OnInit {
  @Input() currentYrAvgScoreRank: string;
  @Input() currentYrAvgScoreRankClass: string;
  public pageTitle: string;
  constructor() {
    this.pageTitle = AverageScoreHeader
  }

  ngOnInit() { }
}
