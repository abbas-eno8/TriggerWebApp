/**
@author : Sonal Patil
@class : ManagerActionsComponent
@description :ManagerActionsComponent is created for employee dashboard separation.
**/
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ManagerCommentsHeader } from '../../../../shared/tooltip/tooltip-model';

@Component({
  selector: '[trigger-manager-actions].col-xl-12 .col-md-12 .col-sm-12 .px-2 .mb-3[id=manager-action]',
  // selector: 'trigger-manager-actions', 
  templateUrl: './manager-actions.component.html',
  styleUrls: ['./manager-actions.component.scss']
})
export class ManagerActionsComponent implements OnInit {
  
  @Input() public bulbTootlip: any;
  @Input() generalScoreRank: string;
  @Input() scoreSummary: string;
  @Input() managerAction: string;
  @Input() lastScoreRemarks: string;
  @Input() lastAssessedDate: any;

  public isSparkViewable: boolean;
  public pageTitle: string;
  
  constructor() {
    this.pageTitle = ManagerCommentsHeader;
  }

  ngOnInit() { }
}
