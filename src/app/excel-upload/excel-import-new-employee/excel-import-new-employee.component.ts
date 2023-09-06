/**
 * description :ExcelImportNewEmployeeComponent is a child component of ExcelUploadComponent is created for import new data.
 * @author : Anjali Tandel
 * @class : ExcelImportNewEmployeeComponent
 */
import { Component, OnInit, Input } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';
import { ImportExcelUpload } from '../excel-upload-model';
@Component({
  selector: 'trigger-excel-import-new-employee',
  templateUrl: './excel-import-new-employee.component.html',
  styleUrls: ['./excel-import-new-employee.component.scss']
})
export class ExcelImportNewEmployeeComponent implements OnInit {
  @Input() listOfNewInsertedData: ImportExcelUpload[];
  @Input() isClickOnNext: boolean;
  /** checkedMaster boolean variable is used for check/uncheck master-checkbox on click single-checkbox */
  public checkedMaster: boolean;
  constructor(private scrollService: ScrollService) { }

  ngOnInit() { }

  /**
   * Author : Aayushi Patel
   * Modified-Date :  03-04-2019
   * Description : For table scroll
   */
  public onScroll(event: Event): void {
    this.scrollService.onScroll(event);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 05-15-2019
   * Descriotion : Store selected data in array for insertion on check-box.
   */
  public onCheck(isChecked: boolean, data: ImportExcelUpload): void {
    data.isChecked = isChecked;
    this.isCheckMaster();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 05-15-2019
   * Descriotion : Function is created for check/uncheck master-checkbox.
   */
  private isCheckMaster(): void {
    let checkedlength = this.listOfNewInsertedData.filter(item => item.isChecked).length;
    this.checkedMaster = checkedlength === this.listOfNewInsertedData.length ? true : false;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 05-15-2019
   * Descriotion : Store all selected data in array for insertion on check master-checkbox.
   */
  public onCheckMaster(isChecked: boolean): void {
    this.listOfNewInsertedData.forEach(item => item.isChecked = isChecked);
  }
}
