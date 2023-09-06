import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[trigger-current-score].col-xl-6 .col-sm-12 .px-2 .mb-3[id=current-score]',
  templateUrl: './evaluation-status.component.html',
  styleUrls: ['./evaluation-status.component.scss']
})
export class EvaluationStatusComponent implements OnInit {
  
  //public xAxis: number;
  @Input() bulbTootlip: any;
  public tooltipId: number;
  public pageTitle: string;
  //public contentView: string
  public qualityDescription: string
  public status: string
  public date: string
 
  constructor() {
  }

  ngOnInit() {
  }

}
