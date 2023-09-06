/**
@author : Sonal Patil
@class : EmployeeGuidanceComponent
@description : EmployeeGuidanceComponent is created for Employee-guidance widget.
**/
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: '[trigger-employee-guidance].col-xl-12 .col-md-12 .col-sm-12 .px-2 .mb-3[id=employee-guidence]',
  templateUrl: './employee-guidance.component.html',
  styleUrls: ['./employee-guidance.component.scss']
})
export class EmployeeGuidanceComponent implements OnInit {
  
  @Input() bulbTootlip: any;
  @Input() scoreSummary: string;
  @Input() employeeRemarks: string;
  @Input() lastAssessedDate: any;

  public isSparkViewable: boolean;

  constructor() { }

  ngOnInit() {
  }
}
