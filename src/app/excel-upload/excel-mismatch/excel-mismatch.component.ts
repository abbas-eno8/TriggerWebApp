/**
 * description :ExcelMismatchComponent is a child component of ExcelUploadComponent is created for import mismatch records.
 * @author : Anjali Tandel
 * @class : ExcelMismatchComponent
 */
import { Component, OnInit, Input } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';
import { ImportExcelUpload } from '../excel-upload-model';
@Component({
  selector: 'trigger-excel-mismatch',
  templateUrl: './excel-mismatch.component.html',
  styleUrls: ['./excel-mismatch.component.scss']
})
export class ExcelMismatchComponent implements OnInit {
  @Input() excelDbData: ImportExcelUpload[];
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
   * Descriotion : Store selected data in array for updation on check-box.
   */
  public onCheck(isChecked: boolean, selectedRecord: ImportExcelUpload, rejectedRecord: ImportExcelUpload): void {
    if (isChecked) {
      selectedRecord.isChecked = isChecked;
      rejectedRecord.isChecked = !isChecked;
    }
  }
}
