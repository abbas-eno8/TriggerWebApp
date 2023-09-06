/**
@author : Anjali Tandel
@class : CustomValidation
@description :CustomValidation is created for custom validation.
**/
import { OnInit } from '@angular/core';
import { Pipe } from '@angular/core';
import * as _ from 'underscore';
import { CompareString, Success_Title, Success_Type, Error_Type, Error_Title } from '../../core/magic-string/common.model';
import { DatexPipe } from '../pipes/date-pipe/date-pipe';
import { ErrorMessage } from '../../core/magic-string/common-validation-model';
import { ToasterService } from 'angular2-toaster';
@Pipe({
  name: 'CustomValidation',
})
export class CustomValidation implements OnInit {
  constructor(
    public datexPipe: DatexPipe,
    private toasterService: ToasterService) { }
  ngOnInit() { }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : paste the numeric value
  */
  public pasteOnlyNumericEvent($event: any) {
    if (isNaN(($event.clipboardData.getData('Text')))) {
      event.preventDefault();
    }
    if ($event.clipboardData.getData('Text').indexOf(".") !== -1 || $event.clipboardData.getData('Text').indexOf(" ") !== -1) {
      event.preventDefault();
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : paste the decimal value
  */
  public pasteOnlyDecimalEvent($event: any) {
    if (isNaN(($event.clipboardData.getData('Text')))) {
      event.preventDefault();
    }
    if ($event.keyCode === 32 && $event.target.selectionStart === 0 && $event.keyCode !== 9) {
      event.preventDefault();
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : paste the alphabatic value
  */
  public pasteOnlyAlphabaticEvent($event: any) {
    if (!isNaN(($event.clipboardData.getData('Text')))) {
      event.preventDefault();
    }
    if ($event.keyCode === 32 && $event.target.selectionStart === 0 && $event.keyCode !== 9) {
      event.preventDefault();
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : Ignore space when pasting the code
  */
  public IgnoreSpace(event: any) {
    if (event.keyCode === 32 || event.code === 'Space') {
      event.preventDefault();
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : Accept only numeric value
  */
  numberOnly(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar) && event.keyCode !== 9) {
      event.preventDefault();
    }
    this.avoidBlankSpace(event);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : Accept only numeric value
  */
  phoneNumberOnly(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (event.target.selectionStart === 0 && event.keyCode === 48) {
      event.preventDefault();
    }
    if (event.keyCode !== 8 && !pattern.test(inputChar) && event.keyCode !== 9 && event.keyCode !== 13) {
      event.preventDefault();
    }
    this.avoidBlankSpace(event);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : Validation for zip code
  */
  zipcodeValidation(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode !== 8 && !pattern.test(inputChar) && event.keyCode !== 9 && event.keyCode !== 13) {
      event.preventDefault();
    }
    this.avoidBlankSpace(event);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : Validation for employee id
  */
  empIdValidation(event: any) {
    const pattern = /^$|^[A-Za-z0-9]+/;
    let inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode !== 8 && !pattern.test(inputChar) && event.keyCode !== 9) {
      event.preventDefault();
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : Accept only decimal value
  */
  decimalOnly(event: any) {
    const pattern = /^[.\d]+$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode !== 8 && !pattern.test(inputChar) && event.keyCode !== 9) {
      event.preventDefault();
    }
    this.avoidBlankSpace(event);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : Accept only alphabatic value 
  */
  AlphabaticharOnly(event: any) {
    const pattern = /^[a-zA-Z\s]+$/
    let inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode !== 8 && !pattern.test(inputChar) && event.keyCode !== 9) {
      event.preventDefault();
    }
    this.avoidBlankSpace(event);
  }

  nameValidation(event: any) {
    const pattern = /^[a-zA-Z\'-\s]+$/i
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar) || event.code === 'Space' || event.charCode === 32) {
      event.preventDefault();
    }
  }

  EmployeeNameValidation(event: any) {
    const pattern = /^[a-zA-Z\'\s]+$/i
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar) || event.code === 'Space' || event.charCode === 32) {
      event.preventDefault();
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : Ignore white space
  */
  avoidBlankSpace(event: any) {
    if (event.keyCode === 32 && event.target.selectionStart === 0 && event.keyCode !== 9) {
      event.preventDefault();
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : Ignore first white space
  */
  avoidFirstBlankSpace(event: any) {
    if (event.keyCode === 32 && event.keyCode !== 9) {
      event.preventDefault();
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : Change any date in to MM-DD-YYYY format
  */
  changeDateFormat(date: string) {
    let formatedDate = '';
    if (this.datexPipe.transform(date, CompareString.Invalid_Date) !== CompareString.Invalid_Date) {
      formatedDate = this.datexPipe.transform(date, CompareString.Invalid_Date)
    }
    return formatedDate;
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : Date validation
  */
  inputDateValidation(event: any) {
    if (event !== null) {
      const pattern = /[0-9\-/]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar) && event.keyCode !== 8 && event.keyCode !== 9 && event.keyCode !== 13) {
        event.preventDefault();
      }
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  27-12-2018
  * Description : Validation for password
  */
  validatePassword(event: any) {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W).{8,15}$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode === 32 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  04-02-2018
  * Description : Address validation
  */
  addressValidation(event: any) {
    if (event !== null) {
      const pattern = /^$|^[A-Za-z0-9\'\s]+/;
      let inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar) && event.keyCode !== 8 && event.keyCode !== 9) {
        event.preventDefault();
      }
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  09-04-2019
   * Description : Create method for display NoRecordsFound page when records are not found.
   */
  public isDisplayRecordsNotFoundPage(data: any, isDisplayRecordsNotFound: boolean): boolean {
    if (data && data.length > 0) {
      isDisplayRecordsNotFound = false;
    } else {
      isDisplayRecordsNotFound = true;
      //this.toasterService.pop(Success_Type, Success_Title, ErrorMessage.NoRecordsFound);
    }
    return isDisplayRecordsNotFound;
  }

  public _sortAlphanumeric(a: string, b: string): number {
    return a.localeCompare(b, 'en', { numeric: true });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 15/07/2019
   * Description : Added validation for add attachment, validate extension type and file size.
   */
  validateExtension(files: FileList, types): boolean {
    let file = files.item(0)//comment.documentName.substring(comment.documentName.lastIndexOf('.') + 1)
    // let getType: string = file.name.split('.')[1].toLowerCase();
    let getType: string = file.name.substring(file.name.lastIndexOf('.') + 1)
    if (types.includes(getType)) {
      return true;
    } else {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.FileInvalid);
      return false;
    }
  }

  validateSize(files: FileList, FileMaxSize: number): boolean {
    let file = files.item(0)
    let size: number = parseFloat((file.size / 1048576).toFixed(4));
    if (size <= FileMaxSize) {
      return true;
    } else {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.SizeInvalid);
      return false;
    }
  }
}
