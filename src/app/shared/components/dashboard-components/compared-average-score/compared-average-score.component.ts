/**
@author : Sonal Patil
@class : ComparedAverageScoreComponent
@description :ComparedAverageScoreComponent is created for employee dashboard separation.
**/
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AverageScoreCurrentCalandarYearToPastCalanadarYearHeader } from '../../../../shared/tooltip/tooltip-model';

@Component({
  selector: '[trigger-compared-average-score].col-xl-3 .col-md-6 .col-sm-12 .grid-item .px-2 .mb-3[id=compared-average-score]',
  templateUrl: './compared-average-score.component.html',
  styleUrls: ['./compared-average-score.component.scss']
})
export class ComparedAverageScoreComponent implements OnInit {
  @Input() currentYrAvgScoreRank: string;
  @Input() currentYrAvgScoreRankClass: string;
  @Input() lyrAvgScoreRank: string;
  @Input() lyrAvgScoreRankClass: string;
  public pageTitle: string;
  constructor() {
    this.pageTitle = AverageScoreCurrentCalandarYearToPastCalanadarYearHeader
  }

  ngOnInit() {
  }
}
