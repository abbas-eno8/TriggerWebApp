/**
@author : Mihir Patel
@class : SelectScoreComponent
@description :SelectScoreComponent is created for overlay modal popup for selcet new grade
**/
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TriggerGrade, AssessmentScore, fieldValidator } from '../assessment-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { AssessmentService } from '../assessment.service';
import { CustomFieldValidation } from '../../shared/Validation/field-validation';
import { CustomValidation } from '../../shared/Validation/custom.validation';

@Component({
  selector: 'trigger-select-score',
  templateUrl: './select-score.component.html',
  styleUrls: ['./select-score.component.scss']
})
export class SelectScoreComponent implements OnInit {
  // scoreList input for bind in dropdown
  @Input() scoreList: TriggerGrade[];
  // Output cancel emitter for cancel overlay popup
  @Output() cancel: EventEmitter<boolean>;
  // Output submitSelectedGrade emitter for update value overlay popup
  @Output() submit: EventEmitter<boolean>;
  public feedbackForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private assessmentService: AssessmentService,
    private customFieldValidation: CustomFieldValidation,
    private customValidation: CustomValidation) {
    this.cancel = new EventEmitter();
    this.submit = new EventEmitter();
  }

  ngOnInit() {
    // Create feedback form
    this.feedbackForm = this.createForm();
  }

  public createForm(): FormGroup {
    return this.formBuilder.group({
      scoreId: [0, Validators.required],
      remark: ['']
    });
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 16-10-2019
   * Description : Create method for submit selcted score
   */
  submitScore() {
    let teamsResponseModel = this.feedbackForm.getRawValue();
    if (!this.checkValidationOnSubmit(this.feedbackForm, teamsResponseModel)) {
      this.globalResponseHandlerService.displayLoader(true);
      let feedbackObj: AssessmentScore = {
        AssessmentId: this.globalResponseHandlerService.getCurrentTriggerScore().assessmentId,
        ScoreFeedback: false,
        ExpectedScoreId: parseInt(this.feedbackForm.controls.scoreId.value),
        FeedbackRemark: this.feedbackForm.controls.remark.value.trim()
      }
      this.assessmentService.submitFeedback(feedbackObj).subscribe(
        (response) => {
          if (this.globalResponseHandlerService.getApiResponse(response, true)) {
            this.submit.emit(true)
          }
        });
    }
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 16-10-2019
   * Description : Create method for emit value on click of cancel button
   */
  cancelSelecteion() {
    this.cancel.emit(true)
  }

  /**
    * Author : Mihir Patel
    * Created-Date : 16-10-2019
    * Description : Create method for validate dropdown on tab key
    */
  public isDropdownValid(field: string): string {
    return this.customFieldValidation.isDropdownValid(field, this.feedbackForm);
  }

   /**
    * Author : Mihir Patel
    * Created-Date : 16-10-2019
    * Description : Create method for validate dropdown on submit button
    */
  private checkValidationOnSubmit(feedbackForm: FormGroup, spark): boolean {
    let returnData = this.customFieldValidation.isFromValid(feedbackForm, spark, fieldValidator)
    return returnData
  }

  public avoidBlankSpace(event: any): void {
    this.customValidation.avoidBlankSpace(event);
  }
}
