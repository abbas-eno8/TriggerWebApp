/**
@author : Anjali Tandel
@class : AddAttributeComponent
@description :AddAttributeComponent modal popup is created for add, edit dimension.
**/
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DimensionAttributeModel, fieldValidator, AttributeModel, Alphabatic } from '../masters.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DimensionService } from '../dimension-services/dimension.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { LoaderService } from '../../core/loader/loader.service';
import { CustomFieldValidation } from '../../shared/Validation/field-validation';
import { Router } from '@angular/router';
import { DashboardStatus } from '../../core/magic-string/common.model';

@Component({
  selector: 'trigger-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.scss']
})
export class AddAttributeComponent implements OnInit {
  /** user created for store login user's detail */
  public user: any;
  /** created model for add-attribute */
  public model: DimensionAttributeModel;
  /** created model for attribute */
  public attributeModel: AttributeModel;
  /** created field form */
  addAttributeForm: FormGroup;
  /** isDisplayError boolean vaiable is used for display error-message */
  public isDisplayError: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public attribute: DimensionAttributeModel,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddAttributeComponent>,
    private dimensionService: DimensionService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private customFieldValidation: CustomFieldValidation,
    private router: Router
  ) {
    this.model = attribute
    this.attributeModel = new AttributeModel();
    this.attributeModel.id = this.model.AttributeModel.id;
    this.attributeModel.dimensionId = this.model.AttributeModel.dimensionId;
    this.attributeModel.isManagerAccess = this.model.AttributeModel.isManagerAccess;
    this.user = this.globalResponseHandlerService.getUserData();
  }

  ngOnInit() { this.createForm(this.model.AttributeModel); }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Create form and bind value in HTML.
   */
  public createForm(model): void {
    this.addAttributeForm = this.formBuilder.group({
      dimensionId: [{ value: model.dimensionId, disabled: model.dimensionId > 0 ? true : false }, Validators.required],
      dimensionValues: [model.dimensionValues, [Validators.required, Validators.pattern(this.customFieldValidation.getPattern('dimensionValues', fieldValidator))]],
    })
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 17-06-2019
   * Description : On click submit button for add/update attribute.
   */
  onClickBtn() {
    if (!this.checkValidationOnSubmit()) {
      if (this.attributeModel.id > 0) {
        this.attributeModel.updatedBy = this.user.userId;
        this.update();
      } else {
        this.attributeModel.createdBy = this.user.userId;
        this.add();
      }
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Event for check field-validation and bind data on model.
   */
  public checkValidationOnSubmit(): boolean {
    this.isDisplayError = false;
    let returnData = this.customFieldValidation.checkValidation(this.addAttributeForm, this.attributeModel, fieldValidator, this.isDisplayError)
    this.isDisplayError = returnData.isDisplayError;
    this.attributeModel = returnData.model;
    return this.isDisplayError;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Create function for call API of add-attribute.
   */
  public add(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.dimensionService.addAttribute(this.attributeModel, this.user.clientId).subscribe(
      (response) => {
        this.getSuccessResponse(response);
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Create function for call API of update-attribute.
   */
  public update(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.dimensionService.updateAttribute(this.attributeModel, this.user.clientId).subscribe(
      (response) => {
        this.getSuccessResponse(response);
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 18-06-2019
   * Description : Create shared function for add/update attribute API.
   */
  getSuccessResponse(response) {
    if (this.globalResponseHandlerService.getApiResponse(response, true, false)) {
      this.addAttributeForm.reset();
      this.dialogRef.close(this.attributeModel.dimensionId);
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 17-06-2019
   * Description : Keypress event for fields and heck validation, restrict invalid data.
   */
  public onInput(field: string, event: any): void {
    this.customFieldValidation.onInput(field, event, fieldValidator)
    if (event.keyCode === 13) {
      this.onClickBtn();
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Create event for check validation on paste.
   */
  public onPaste(field: string, event: any): void {
    this.customFieldValidation.onPaste(field, event, fieldValidator)
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Create function bind error-class on dorpdown field.
   */
  public isDropdownValid(field: string): string {
    return this.customFieldValidation.isDropdownValid(field, this.addAttributeForm);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Create function bind error-class on input field.
   */
  public isInputValid(field: string): string {
    return this.customFieldValidation.isFieldValid(field, this.addAttributeForm);
  }
}

