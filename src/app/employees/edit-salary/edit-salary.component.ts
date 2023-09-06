/**
@author : Mihir Patel
@class : EditSalaryComponent
@description :EditSalaryComponent is created for edit salary.
**/
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { CustomValidation } from '../../shared/Validation/custom.validation';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { LoaderService } from '../../core/loader/loader.service';
import { Error_Type, Error_Title } from '../../core/magic-string/common.model';
import { ErrorMessage } from '../../core/magic-string/common-validation-model';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { EmployeeModel } from '../employee-model';
import { EmployeeService } from '../../core/services/employee-service/employee.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'trigger-edit-salary',
  templateUrl: './edit-salary.component.html',
  styleUrls: ['./edit-salary.component.scss']
})

export class EditSalaryComponent implements OnInit {
  // editSalary created for store interface data which is passed from employee list
  public editSalary: EditSlary;
  // currentSalary created for store current salary value
  public currentSalary: number;
  mask: any[] = ['$', ' ', /[1-9]/, ',', /\d/, /\d/, /\d/, '.', /\d/, /\d/]; 
  numberMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    allowNegative: false,
    allowLeadingZeroes: false,
    integerLimit: 7,
  })
  constructor(public dialogRef: MatDialogRef<EditSalaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditSlary,
    private toasterService: ToasterService,
    private customValidation: CustomValidation,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private employeeService: EmployeeService,
  ) {
    //  Store interface data in editSalary
    this.editSalary = data;
    this.currentSalary = data.currentSalary;
  }
  // Create new object for salary matcher which used for validate salary
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
  }
  // Create form control for salary 
  newSalaryFormControl = new FormControl('', [
    Validators.required
  ]);

/**
 * Author : Mihir Patel
 * Created-Date : 22-04-2019
 * Description : Server call for update salary
 */
  public updateSalary(): void {
    if (this.salaryValidation()) {
      this.loaderService.emitIsLoaderShown(true);
      this.employeeService.updateSalary(this.editSalary.companyId, this.editSalary.empId, this.newSalaryFormControl.value, this.editSalary.userId).subscribe(
        (updateSalaryResponse) => {
          if (this.globalResponseHandlerService.getApiResponse(updateSalaryResponse, true, false)) {
            this.dialogRef.close(EmployeeModel.UpdateSalary);
          }
        }
      );
    }
  }

/**
 * Author : Mihir Patel
 * Created-Date : 22-04-2019
 * Description : Validation method for salary validation.
 */
  salaryValidation(): boolean {
    if (this.newSalaryFormControl.value === '' || this.newSalaryFormControl.value === undefined) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.PleaseEnterSalary);
      return false;
    } else {
      return true;
    }
  }
  // Accept number only
  numberOnly(event: any) {
    this.customValidation.numberOnly(event);
    this.avoidBlankSpace(event);
  }
  // Ignore first white space
  avoidBlankSpace(event: any) {
    this.customValidation.avoidBlankSpace(event);
  }
  // paste the numeric value
  public pasteOnlyNumericEvent($event: any) {
    this.customValidation.pasteOnlyNumericEvent(event);
  }
}
/**
 * Author : Mihir Patel
 * Created-Date : 22-04-2019
 * Description : Create Edit salary interface for pass data between modal-popup and employee list component.
 */
export interface EditSlary {
  companyId: number;
  userId: number;
  empId: number;
  currentSalary: number;
}
