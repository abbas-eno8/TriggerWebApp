/**
 * description :ExcelReviewEmployeesComponent is a child component of ExcelUploadComponent is created for review count of newly inserted & mismatch records.
 * @author : Anjali Tandel
 * @class : ExcelReviewEmployeesComponent
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'trigger-excel-review-employees',
  templateUrl: './excel-review-employees.component.html'
})
export class ExcelReviewEmployeesComponent implements OnInit {
  @Input() newEmpCount: number;
  @Input() newEmpValue: string;
  @Input() newEmpClass: string;
  @Input() mismatchCount: number;
  @Input() mismatchValue: string;
  @Input() mismatchClass: string;
  @Output() reviewMismatchData = new EventEmitter();
  @Output() reviewNewEmployees = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  11-12-2018
  * Descriotion : Click event for skip the 3rd step
  */
  public onClickReviewMismatchData(): void {
    this.reviewMismatchData.emit();
  }
  /**
    * Author : Anjali Tandel
    * Modified-Date :  11-12-2018
    * Descriotion : Click event for Import the selected newly inserted data
    */
  public onClickReviewNewEmployees(): void {
    this.reviewNewEmployees.emit();
  }
}
