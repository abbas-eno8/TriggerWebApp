/**
@author : Anjali Tandel
@class : DeletePopupComponent
@description :DeletePopupComponent is created for open delete modal popup for department, add-employee, add-admin & add-client.
**/
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'trigger-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {
  confirm = new EventEmitter();
  /** created deleteContent for store content for display in model-popup */
  public deleteContent: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data) { 
    this.deleteContent = 'Are you sure you want to delete this ' + data + '?';
  }

  ngOnInit() { }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Create method for on click yes button 
   */
  onClickYes(): void {
    this.confirm.emit(true);
  }
}
