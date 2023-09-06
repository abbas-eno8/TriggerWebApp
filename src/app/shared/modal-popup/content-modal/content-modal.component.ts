/**
 * @author Anjali Tandel
 * @class  ContentModalComponent
 * @description Create ContentModalComponent for open modal by their dynamic content.
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ModalContent } from './conten-modal-model';
import { Router } from '@angular/router';
import { Route } from '../../../core/magic-string/common.model';

@Component({
  selector: 'trigger-content-modal',
  templateUrl: './content-modal.component.html',
  styleUrls: ['./content-modal.component.scss']
})
export class ContentModalComponent implements OnInit {
  public content: string;
  public subContent: string;
  public client: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router) {
    this.client = data.client;
    this.setContent(data.value);
  }

  ngOnInit() { }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 16-03-2019
   * Description : Set content dynamic using value contentValue which is passed from parent component
   */
  setContent(contentValue: string): void {
    if (contentValue === ModalContent.ExcelUploadNoDepartmentFoundContent) {
      this.content = ModalContent.ExcelUploadNoDepartmentFound;
    } else if (contentValue === ModalContent.NoAccessContent) {
      this.content = ModalContent.NoAccess;
      let splitContent = this.content.split('{{ client }}');
      this.content = splitContent[0];
      this.subContent = splitContent[1]
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 15-03-2019
   * Description : Create method for close modal popup & redirect to employee list on click cancel button 
   */
  onClickOk(): void {
    this.router.navigate([Route.Employee]);
  }
}
