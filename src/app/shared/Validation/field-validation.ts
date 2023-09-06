/**
@author : Anjali Tandel
@class : CustomValidation
@description :CustomValidation is created for custom field validation.
**/
import { OnInit } from '@angular/core';
import { Pipe } from '@angular/core';
import * as _ from 'underscore';
import { ToasterService } from 'angular2-toaster';
import { Error_Type, Error_Title, Error_Input_class, Validator } from '../../core/magic-string/common.model';
import { CustomValidation } from './custom.validation';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
@Pipe({
    name: 'CustomValidation',
})
export class CustomFieldValidation implements OnInit {
    public isFormValid: boolean;
    constructor(private toasterService: ToasterService,
        private customValidation: CustomValidation) { }
    ngOnInit() { }

    /**
     * Author : Anjali Tandel
     * Modified-Date : 11-06-2019
     * Description : Create function bind error-class on input field.
     */
    public isFieldValid(field: string, form: FormGroup): string {
        let ngClass: string = '';
        if ((form.get(field).touched || form.get(field).dirty) && form.get(field).invalid) {
            ngClass = Error_Input_class;
        }
        return ngClass;
    }

    /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Create function bind error-class on input field.
   */
    public isDropdownValid(field: string, form: FormGroup): string {
        let ngClass: string = '';
        if (form.get(field).touched && form.get(field).value && parseInt(form.get(field).value) === 0) {
            ngClass = Error_Input_class;
        }
        return ngClass;
    }

    public isSelectDropdownValid(field: string, form: FormGroup): string {
        let ngClass: string = '';
        if (form.get(field).touched && (!form.get(field).value || parseInt(form.get(field).value.length) === 0)) {
            ngClass = Error_Input_class;
        }
        return ngClass;
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date : 11-06-2019
     * Description : Create function check validation for mandatory field.
     */
    enterFieldValidation(field, form, isDisplay: boolean): boolean {
        if (!isDisplay) {
            this.disaplyErrorMessage('Please Enter ' + field.name + '.');
            isDisplay = true;
        }
        form.get(field.key).markAsDirty();
        return isDisplay;
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date : 11-06-2019
     * Description : Create function check validation invalid field.
     */
    checkInvalidFieldValidation(field, form, isDisplay: boolean): boolean {
        if (field.value.length < field.minLength) {
            if (!isDisplay) {
                this.disaplyErrorMessage(field.name + ' should be minimum ' + field.minLength + ' characters require.');
                isDisplay = true;
            }
            if (field.isMandatory) { form.get(field.key).markAsDirty(); }
        } else if (field.value.length > field.maxLength) {
            if (!isDisplay) {
                this.disaplyErrorMessage(field.name + ' should be maximum ' + field.maxLength + ' characters long.');
                isDisplay = true;
            }
            if (field.isMandatory) { form.get(field.key).markAsDirty(); }
        } else if (!field.pattern.test(field.value)) {
            if (!isDisplay) {
                this.disaplyErrorMessage(field.name + ' is not valid.');
                isDisplay = true;
            }
            if (field.isMandatory) { form.get(field.key).markAsDirty(); }

        } else if (field.maxInput) {
            if (!isDisplay && parseInt(field.value) > field.maxInput) {
                this.disaplyErrorMessage(field.name + ' should Not Be More Than ' + field.maxInput + '.');
                isDisplay = true;
            }
            if (field.isMandatory) { form.get(field.key).markAsDirty(); }
        } else {
            return isDisplay;
        }
        return isDisplay;
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date : 11-06-2019
     * Description : Create function check validation mandatory drodown field.
     */
    checkDropdownFieldValidation(field, form, isDisplay: boolean): boolean {
        if (parseInt(field.value) === 0 || field.value === '') {
            if (!isDisplay) {
                this.disaplyErrorMessage('Please Select ' + field.name + '.');
                isDisplay = true;
            }
            if (field.isMandatory) { form.get(field.key).markAsTouched(); }
            return isDisplay;
        }
        return isDisplay;
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date : 11-06-2019
     * Description : Create function for disaply error-message.
     */
    disaplyErrorMessage(error: string): void {
        this.toasterService.pop(Error_Type, Error_Title, error);
    }

    checkValidation(form: FormGroup, model: any, fieldValidator: Validator[], isDisplayError: boolean) {
        Object.keys(form.controls).forEach(key => {
            const keyValue = form.value[key];
            let control = fieldValidator.filter(field => (field.key) === key).map(x => x)[0];
            if (control) {
                control.value = keyValue;
                if (control.isDropdown) {
                    isDisplayError = this.checkDropdownFieldValidation(control, form, isDisplayError);
                } else {
                    isDisplayError = this.checkInputFieldValidation(control, form, isDisplayError);
                }
                if (keyValue) {
                    if (isNaN(keyValue)) {
                        model[key] = keyValue.trim();
                    } else {
                        model[key] = keyValue;
                    }
                }
            }
        });
        return { isDisplayError, model };
    }

    checkInputFieldValidation(field: Validator, form: FormGroup, isDisplayError: boolean): boolean {
        if (field.value === '' && field.isMandatory) {
            isDisplayError = this.enterFieldValidation(field, form, isDisplayError);
        } else {
            if (field.value !== '' && field.value) {
                isDisplayError = this.checkInvalidFieldValidation(field, form, isDisplayError);
            }
        }
        return isDisplayError;
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date : 17-06-2019
     * Description : Keypress event for fields and heck validation, restrict invalid data.
     */
    public onInput(field: string, event: any, fieldValidator: Validator[]): void {
        if (event.keyCode === 32 && event.target.selectionStart === 0 && event.keyCode !== 9) {
            event.preventDefault();
        }
        let pattern: any = fieldValidator.filter(pattern => pattern.key === field)[0].pattern;
        let inputChar = event.target.value + event.key;
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date : 17-06-2019
     * Description : Get pattern by their key from defined model
     */
    public getPattern(key: string, fieldValidator: Validator[]) {
        return fieldValidator.filter(pattern => pattern.key === key)[0].pattern;
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date : 17-06-2019
     * Description : Paste event for fields and heck validation, restrict invalid data.
     */
    public onPaste(field: string, event: any, fieldValidator: Validator[]): void {
        let pattern: any = fieldValidator.filter(pattern => pattern.key === field)[0].pattern;
        let keyValue: string = event.clipboardData.getData('Text');
        if (!pattern.test(keyValue)) {
            event.preventDefault();
        }
    }
    /*********
    Created new function for validations
     *********/
    isFromValid(form: FormGroup, model: any, fieldValidator: Validator[]) {
        this.isFormValid = false;
        Object.keys(form.controls).forEach(key => {
            const keyValue = form.value[key];
            let control = fieldValidator.find(field => (field.key) === key);
            let isFieldDisabled = form.controls[key].status !== 'DISABLED' ? true : false;
            if (control) {
                control.value = keyValue;
                if (control.isDropdown) {
                    this.dropdownFieldValidation(control, form);
                } else if (control.isSelectDropdown) {
                    this.selectDropdownFieldValidation(control, form);
                } else if (control && control.isDate && isFieldDisabled) {
                    this.selectDateFieldValidation(control, form);
                } else {
                    this.inputFieldValidation(control, form);
                }
            }
        });
        return this.isFormValid;
    }

    dropdownFieldValidation(field: Validator, form: FormGroup): void {
        if (parseInt(field.value) === 0 || field.value === '' || field.value === null) {
            if (!this.isFormValid) {
                this.disaplyErrorMessage('Please Select ' + field.name + '.');
                this.isFormValid = true;
            }
            if (field.isMandatory) { form.get(field.key).markAsTouched(); }
        }
    }
    selectDropdownFieldValidation(field: Validator, form: FormGroup): void {
        if (!field.value || field.value.length === 0) {
            if (!this.isFormValid) {
                this.disaplyErrorMessage('Please Select ' + field.name + '.');
                this.isFormValid = true;
            }
            if (field.isMandatory) { form.get(field.key).markAsTouched(); }
        }
    }

    selectDateFieldValidation(field: Validator, form: FormGroup): void {
        if (!field.value || field.value.length === 0) {
            if (!this.isFormValid) {
                this.disaplyErrorMessage('Please Select ' + field.name + '.');
                this.isFormValid = true;
            }
            if (field.isMandatory) { form.get(field.key).markAsTouched(); }
        }
        let selectedDate = moment(field.value).format('YYYY-MM-DD');
        if (!moment(selectedDate, 'YYYY-MM-DD', true).isValid()) {
            if (!this.isFormValid) {
                this.disaplyErrorMessage(field.name + ' is not valid.');
                this.isFormValid = true;
            }
            if (field.isMandatory) { form.get(field.key).markAsTouched(); }
        }
        let currentDate = moment(new Date()).format('YYYY-MM-DD');
        if (selectedDate < currentDate) {
            if (!this.isFormValid) {
                this.disaplyErrorMessage(field.name + ' Should Not be Past Date.');
                this.isFormValid = true;
            }
            if (field.isMandatory) { form.get(field.key).markAsTouched(); }
        }
    }

    inputFieldValidation(field: Validator, form: FormGroup): void {
        if (field.value === '' && field.isMandatory) {
            this.emptyFieldValidation(field, form);
        } else {
            if (field.value !== '' && field.value) {
                this.invalidFieldValidation(field, form);
            }
        }
    }

    emptyFieldValidation(field: Validator, form: FormGroup): void {
        if (!this.isFormValid) {
            this.disaplyErrorMessage('Please Enter ' + field.name + '.');
            this.isFormValid = true;
        }
        form.get(field.key).markAsDirty();
    }

    invalidFieldValidation(field: Validator, form: FormGroup): void {
        if (field.value.length < field.minLength) {
            if (!this.isFormValid) {
                this.disaplyErrorMessage(field.name + ' should be minimum ' + field.minLength + ' characters require.');
                if (field.isMandatory) { form.get(field.key).markAsDirty(); }
                this.isFormValid = true;
            }
        } else if (field.value.length > field.maxLength) {
            if (!this.isFormValid) {
                this.disaplyErrorMessage(field.name + ' should be maximum ' + field.maxLength + ' characters long.');
                if (field.isMandatory) { form.get(field.key).markAsDirty(); }
                this.isFormValid = true;
            }

        } else if (field.pattern && !field.pattern.test(field.value)) {
            if (!this.isFormValid) {
                this.disaplyErrorMessage(field.name + ' is not valid.');
                if (field.isMandatory) { form.get(field.key).markAsDirty(); }
                this.isFormValid = true;
            }
        } else {
            //this.isFormValid = false;
        }
    }
}