/**
@author : Anjali Tandel
@class : SurveyFormComponent
@description : SurveyFormComponent is using for creating dynamic survey form which will be use in Assessment survey-form & notification Global assessment.
**/
import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { LoaderService } from '../../../core/loader/loader.service';
import { Error_Type, Error_Title } from '../../../core/magic-string/common.model';
import { SurveyFormResponse, AddSurveyForm, SurveyFormRequest, SurveyFormAnswer, ClassRedText, StrikeOutStyleClass, AssessmentDateTimeStamp, SubmitSurvey, TextDark, ScrollType } from '../../modals/survey-form-model';

@Component({
  selector: 'trigger-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  @Output() cancel = new EventEmitter<boolean>();
  @Output() onSubmitSurvey = new EventEmitter<AddSurveyForm>();

  public surveyForm: SurveyFormResponse;
  public isDisabledCancelButton: boolean;
  public isDisabledSubmitBtn: boolean;

  private surveyFormRequest: SurveyFormRequest[];
  private createdBy: number;
  private isAddScrollService: boolean;

  constructor(
    private datePipe: DatePipe,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private elementRef: ElementRef,
    private toasterService: ToasterService
    ) {
    this.createdBy = this.globalResponseHandlerService.getUser().userId;
    this.surveyFormRequest = [];
    this.loaderService.emitIsLoaderShown(false);
    this.isDisabledSubmitBtn = false;
  }

  ngOnInit() {
    if (this.surveyForm.answers.length > 0) {
      this.surveyFormRequest = this.surveyForm.answers;
      this.isDisabledSubmitBtn = true;
    }
  }

  public onChangeRadioButton(answer: SurveyFormAnswer): void {
    let exist = this.surveyFormRequest.find(r => r.questionId === answer.questionId);
    if (exist) {
      this.removeRequest(exist.answerId, exist.questionId);
    }
    this.addRequest(answer.id, answer.questionId, '');
    this.validationForCurrentQuestion(answer.questionId);
  }


  public onChangeCheckbox(isChecked: boolean, answerId: number, questionId: number): void {
    if (this.surveyFormRequest.find(r => r.questionId === questionId && r.answerId === answerId)) {
      this.removeRequest(answerId, questionId);
    } else {
      this.addRequest(answerId, questionId, '');
    }
    this.validationForCurrentQuestion(questionId);
  }

  public getTextValue(questionId: number): string {
    let object = this.surveyFormRequest.find(r => r.questionId === questionId);
    if (object) {
      return object.remarks;
    }
    return '';
  }

  public onChangeTextArea(event, questionId: number): void {
    if (event && event.target.value && event.target.value.trim() !== '') {
      let remarks = event.target.value != '' ? event.target.value.trim() : '';
      this.addRequest(0, questionId, remarks);
    } else {
      this.removeRequest(0, questionId);
    }
    this.validationForCurrentQuestion(questionId);
  }

  private addRequest(answerId: number, questionId: number, remarks: string): void {
    let isExistRecord = this.surveyFormRequest.find(s => s.answerId === answerId && s.questionId === questionId);
    if (!isExistRecord) {
      let request = new SurveyFormRequest(answerId, questionId, this.createdBy, remarks);
      this.surveyFormRequest.push(request);
    }
    if (isExistRecord && answerId === 0) {
      isExistRecord.remarks = remarks;
    }
  }

  private removeRequest(answerId: number, questionId): void {
    let removeObj = this.surveyFormRequest.find(s => s.answerId === answerId && s.questionId === questionId);
    const index = this.surveyFormRequest.indexOf(removeObj, 0);
    if (index > -1) {
      this.surveyFormRequest.splice(index, 1);
    }
  }

  public onClickSubmit(): void {
    this.surveyFormValidations();
    if (!this.isAddScrollService) {
      if (this.surveyFormRequest.length > 0) {
        this.loaderService.emitIsLoaderShown(true);
        let curretDate = this.datePipe.transform(new Date(), AssessmentDateTimeStamp);
        let request = new AddSurveyForm(this.globalResponseHandlerService.getUser().empId, this.surveyForm.id, this.createdBy, curretDate, this.surveyFormRequest);
        this.onSubmitSurvey.emit(request);
      } else {
        this.toasterService.pop(Error_Type, Error_Title, SubmitSurvey);
      }
    }
  }

  private validationForCurrentQuestion(questionId: number): void {
    let existRecord = this.surveyFormRequest.find(r => r.questionId === questionId);
    let findRecord = this.surveyForm.question.find(r => r.id === questionId);

    existRecord || !findRecord.isMandatory ? findRecord.dynamicClass = TextDark :
      findRecord.dynamicClass = ClassRedText;
  }

  private surveyFormValidations(): void {
    this.isAddScrollService = false;
    this.surveyForm.question.forEach(c =>
      this.surveyFormRequest.find(r => r.questionId === c.id) || !c.isMandatory ?
        c.dynamicClass = TextDark :
        (c.dynamicClass = ClassRedText) && this.scrollToQuestion(c.id)
    )
  }

  public isChecked(answerId, questionId): boolean {
    if (this.surveyFormRequest.find(r => r.questionId === questionId && r.answerId === answerId)) {
      return true
    } else {
      return false
    }
  }

  public onClickCancel(): void {
    this.cancel.emit(true);
  }

  private scrollToQuestion(questionId: number): boolean {
    if (!this.isAddScrollService) {
      this.elementRef.nativeElement.querySelector(StrikeOutStyleClass + questionId).scrollIntoView({ behavior: ScrollType });
    }
    this.isAddScrollService = true;
    return true;
  }

}
