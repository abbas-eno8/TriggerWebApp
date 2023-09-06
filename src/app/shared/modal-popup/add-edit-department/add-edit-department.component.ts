/**
@author : Anjali Tandel
@class : AddEditDepartmentComponent
@description :AddEditDepartmentComponent is created for add, edit department.
**/
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { CustomValidation } from '../../Validation/custom.validation';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { LoaderService } from '../../../core/loader/loader.service';
import { DepartmentService } from '../../../department/department.service/department.service';
import { Error_Type, Error_Title } from '../../../core/magic-string/common.model';
import { ErrorMessage } from '../../../core/magic-string/common-validation-model';

@Component({
  selector: 'trigger-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.scss']
})
export class AddEditDepartmentComponent implements OnInit {
  public department: Department;
  constructor(public dialogRef: MatDialogRef<AddEditDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department,
    private toasterService: ToasterService,
    private customValidation: CustomValidation,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private departmentService: DepartmentService,
    private loaderService: LoaderService) {
    this.department = data;
  }

  ngOnInit() { }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Create method for add/edit new department on click add button 
   */
  onClickAdd(): void {
    if (this.departmentValidation(this.department.departmentName)) {
      this.department.departmentName = this.department.departmentName.trim();
      if (this.department.departmentId === 0) {
        this.addDepartment()
      } else {
        this.UpdateDepartment()
      }
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Create method for department name validation
   */
  departmentValidation(department: string): boolean {
    var alphabaticFormat = /^[a-zA-Z\-&\s]+$/i;
    if (department === '' || department === undefined) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.Department);
      return false;
    } else if (!alphabaticFormat.test(department) || department.trim() === '') {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DepartmentInvalid);
      return false;
    } else if (department.length > 50) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DepartmentInvalidLength)
      return false;
    } else {
      return true;
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : validation method for accept only alphabatic value 
   */
  public AlphabaticharOnly(event: any) {
    this.customValidation.AlphabaticharOnly(event);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : validation method for paste only alphabatic and ignore space.
   */
  public pasteOnlyAlphabaticEvent($event: any) {
    this.customValidation.pasteOnlyAlphabaticEvent(event);
    this.customValidation.IgnoreSpace(event);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Call API for add new department.
   */
  public addDepartment(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.departmentService.addDepartment(this.department.departmentName, this.department.clientId).subscribe(
      (addDepartmentresponse) => {
        if (this.globalResponseHandlerService.getApiResponse(addDepartmentresponse, true, false)) {
          this.dialogRef.close('Add department');
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Call API for update department.
   */
  UpdateDepartment(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.departmentService.updateDepartment(this.department).subscribe(
      (updateDepartmentresponse) => {
        if (this.globalResponseHandlerService.getApiResponse(updateDepartmentresponse, true, false)) {
          this.dialogRef.close('Update department');
        }
      }
    );
  }
}

/**
 * Author : Anjali Tandel
 * Modified-Date : 12-03-2019
 * Description : Create department interface for pass data between modal-popup and department component.
 */
export interface Department {
  clientId: number
  buttonValue: string;
  modalTitle: string;
  departmentName: string;
  departmentId: number,
  sendTrigger: boolean,
  sendSpark: boolean
}

