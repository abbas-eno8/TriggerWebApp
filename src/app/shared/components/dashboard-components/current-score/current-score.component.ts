/**
@author : Sonal Patil
@class : CurrentScoreComponent
@description :CurrentScoreComponent is created for employee dashboard separation.
**/
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CurrentScoreHeader } from '../../../../shared/tooltip/tooltip-model';

@Component({
  selector: '[trigger-current-score].col-xl-3 .col-md-6 .col-sm-12 .grid-item .px-2 .mb-3[id=current-score]',
  templateUrl: './current-score.component.html'
})
export class CurrentScoreComponent implements OnInit {
  public lastScoreRank: string;
  public lastScoreRankClass: string;
  public lastAssessedDate: any;
  public pageTitle: string;
  constructor() {
    this.pageTitle = CurrentScoreHeader
  }

  ngOnInit() { }
}
