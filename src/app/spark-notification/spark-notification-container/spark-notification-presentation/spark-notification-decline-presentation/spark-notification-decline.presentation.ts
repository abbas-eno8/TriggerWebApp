/**
@author : Mihir Patel
@class : SparkNotificationDeclinePresentation
@description : SparkNotificationDeclinePresentation is contain manage click of this presentation and manage input/output.
**/
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { LoaderService } from '../../../../core/loader/loader.service';
import { CustomFieldValidation } from '../../../../shared/Validation/field-validation';
import { CustomValidation } from '../../../../shared/Validation/custom.validation';
import { Error_Type, Error_Title } from '../../../../core/magic-string/common.model';
import { ErrorMessage } from '../../../../core/magic-string/common-validation-model';

@Component({
  selector: 'trigger-spark-notification-decline-presentation',
  templateUrl: './spark-notification-decline.presentation.html',
  styleUrls: ['./spark-notification-decline.presentation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SparkNotificationDeclinePresentation implements OnInit {
  // Output cancel emitter for cancel overlay popup
  @Output() cancel: EventEmitter<boolean>;

  //  Output cancel emitter for update 
  @Output() update: EventEmitter<string>;

  // isInvalidField defined for manage remark field status valid or not.
  public isInvalidField: boolean = false;

  constructor(private fb: FormBuilder,
    private toaster: ToasterService,
    private loaderService: LoaderService,
    private customFieldValidation: CustomFieldValidation,
    private customValidation: CustomValidation) {
    this.cancel = new EventEmitter();
    this.update = new EventEmitter();
  }

  //  Create form
  rejectionForm = this.fb.group({
    remark: ['', Validators.required],
  });

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.rejectionForm.controls.remark.valid) {
      this.isInvalidField = false;
    }
  }
  /**
 * Author : Mihir Patel
 * Created-Date : 10-09-2019
 * Descriotion : Create method for check validation and emit value to presentation for rejection submittion
 */
  submitRejection(): void {
    if (!this.rejectionForm.controls.remark.valid) {
      this.isInvalidField = true
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.EmptyRemark);
    } else {
      let remark = this.rejectionForm.controls.remark.value.trim();
      this.loaderService.emitIsLoaderShown(true);
      this.update.emit(remark);
    }
  }

  /**
* Author : Mihir Patel
* Created-Date : 20-09-2019
* Descriotion : Create method for avoid blank spacce in starting of input type.
*/
  public avoidBlankSpace(event: any): void {
    this.customValidation.avoidBlankSpace(event);
  }

  /**
 * Author : Mihir Patel
 * Created-Date : 10-09-2019
 * Descriotion : Create method for emit value for close overlay modal popup.
 */
  cancelRejection(): void {
    this.cancel.emit(true)
  }

  public isInputValid(): string {
    return this.customFieldValidation.isFieldValid('remark', this.rejectionForm)
  }
}
