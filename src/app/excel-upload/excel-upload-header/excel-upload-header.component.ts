/**
 * description :ExcelUploadHeaderComponent is a child component of ExcelUploadComponent is created for header view and tooltip.
 * @author : Anjali Tandel
 * @class : ExcelUploadHeaderComponent
 */
import { Component, OnInit, Input } from '@angular/core';
import { tooltipData } from '../excel-upload-model';

@Component({
  selector: 'trigger-excel-upload-header',
  templateUrl: './excel-upload-header.component.html'
})
export class ExcelUploadHeaderComponent implements OnInit {
  /** stepNumber is getting from parent component */
  @Input() stepNumber: number;
  /** tooltipHeader created for store header of tooltip which we used in html */
  public tooltipHeader: string;
  /** tooltipDescription created for store description of tooltip which we used in html */
  public tooltipDescription: string;
  constructor() { }

  ngOnInit(): void { }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 30-04-2019
   * Descriotion : Mouse event on hover icon and set toolip Header-Description.
   */
  public setTooltip(): void {
    let step = this.stepNumber;
    let tooltip = tooltipData.find(t => t.id === step);
    if (tooltip) {
      this.tooltipHeader = tooltip.header;
      this.tooltipDescription = tooltip.description;
    }
  }
}
