import { Injectable, ComponentRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Option, Survey, fieldValidator, SurveyRequestModel } from '../../../survey.model';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { CustomFieldValidation } from '../../../../shared/Validation/field-validation';
import { ToasterService } from 'angular2-toaster';
import { CustomValidation } from '../../../../shared/Validation/custom.validation';
import { DatePipe } from '@angular/common';
import { OverlayConfig, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { CreateSurveyConfirmationComponent } from '../create-survey-confirmation/create-survey-confirmation.component';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { Route, CompareString } from '../../../../core/magic-string/common.model';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UrlEncryptionDecryptionService } from '../../../../core/url-encryption-decryption/url-encryption-decryption.service';
import * as moment from 'moment';
import { SelectDimensionComponent } from '../../select-dimension/select-dimension.component';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';

@Injectable({
  providedIn: 'root'
})
export class SurveyFormPresenter {
  public selectedOption = [];
  surveyForm: FormGroup;
  public userData: any;
  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;

  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;
  /** This property is used for emit when save-survey.  */
  private save: Subject<SurveyRequestModel> = new Subject();
  saveSurvey$: Observable<SurveyRequestModel> = this.save.asObservable();

  /** This property is used for emit when save-survey.  */
  private publish: Subject<any> = new Subject();
  publishNotification$: Observable<any> = this.publish.asObservable();
  /** This property is used for emit when failed-api.  */
  private failedApi: Subject<boolean> = new Subject();
  failedApi$: Observable<boolean> = this.failedApi.asObservable();
  public isDarkTheme: boolean;
  public themeEmitter: any;
  // public selectedArray: any;
  // public selectedEmployeeArray: any;
  constructor(private globalResponseHandlerService: GlobalResponseHandlerService,
    private customFieldValidation: CustomFieldValidation,
    private toasterService: ToasterService,
    private customValidation: CustomValidation,
    private datePipe: DatePipe,
    public overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory,
    private router: Router,
    private formBuilder: FormBuilder,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private globalEventsManager: GlobalEventsManager,
  ) {
    // this.selectedArray = [];
    this.userData = this.globalResponseHandlerService.getUser()
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }
  public createForm(): FormGroup {
    let surveyQuestions = new FormArray([]);
    this.surveyForm = new FormGroup({
      'surveyId': new FormControl(0),
      'surveyName': new FormControl('', [Validators.required]),
      'fromDate': new FormControl('', [Validators.required]),
      'toDate': new FormControl('', [Validators.required]),
      'surveyType': new FormControl('', Validators.required),
      'surveyTypeName': new FormControl(''),
      'surveySetOfUserConfiguration': new FormControl(''),
      'surveyTeamMembers': new FormControl(''),
      'isActive': new FormControl(false),
      'isSurveyAnonymous': new FormControl(false),
      'isSurveyMandatory': new FormControl(false),
      'createdBy': new FormControl(0),
      'updatedBy': new FormControl(0),
      'description': new FormControl(''),
      'surveyQuestions': surveyQuestions,
    });

    this.onAddQuestion();
    this.globalResponseHandlerService.displayLoader(false);
    return this.surveyForm;
  }

  public bindEndDate(): FormGroup {
    this.surveyForm.controls['toDate'].patchValue('');
    return this.surveyForm;
  }


  onAddQuestion() {
    const surveyQuestionItem = new FormGroup({
      'questionId': new FormControl(0),
      'surveyId': new FormControl(0),
      'categoryId': new FormControl(0),
      'question': new FormControl('', Validators.required),
      'questionType': new FormControl('', Validators.required),
      'orderNo': new FormControl(0),
      'isMandatory': new FormControl(false),
      'createdBy': new FormControl(0),
      'updatedBy': new FormControl(0),
      'result': new FormControl(0),
      'questionGroup': new FormGroup({
        'options': new FormArray([]),
        'isMandatory': new FormControl(false),
      })
    });

    (<FormArray>this.surveyForm.get('surveyQuestions')).push(surveyQuestionItem);

  }

  onAddQuestionOnButtonClick() {
    let isEmptyOption: boolean = false;
    let questions = this.surveyForm.get('surveyQuestions')['controls'];
    let lastQuestion = questions[questions.length - 1]
    lastQuestion.get('question').markAsDirty();
    lastQuestion.get('questionType').markAsDirty();

    if (lastQuestion.get('questionType').valid) {
      if (lastQuestion.get('questionType').value !== 3) {
        let options = lastQuestion.get('questionGroup')['controls'].options['controls']
        options.forEach(element => {
          if (!element.valid) {
            isEmptyOption = true;
          }
          element.controls.answers.markAsDirty()
        });
      }
    }

    if (!lastQuestion.get('question').valid || !lastQuestion.get('questionType').valid || isEmptyOption) {
      this.toasterService.pop('error', 'Error', 'Please fill all details');
    } else {
      const surveyQuestionItem = new FormGroup({
        'questionId': new FormControl(0),
        'surveyId': new FormControl(0),
        'categoryId': new FormControl(0),
        'question': new FormControl('', Validators.required),
        'questionType': new FormControl('', Validators.required),
        'orderNo': new FormControl(0),
        'isMandatory': new FormControl(false),
        'createdBy': new FormControl(0),
        'updatedBy': new FormControl(0),
        'result': new FormControl(0),
        'questionGroup': new FormGroup({
          'options': new FormArray([]),
          'isMandatory': new FormControl(false),
        })
      });
      (<FormArray>this.surveyForm.get('surveyQuestions')).push(surveyQuestionItem);
    }
  }

  onSeletQuestionType(questionType, index) {
    if (questionType === 1 || questionType === 2) {
      this.addOptionControls(questionType, index)
    } else {
      this.removeControl(questionType, index)
    }
  }

  removeControl(questionType, index) {
    this.clearFormArray((<FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options));
  }

  addOptionControls(questionType, index) {
    this.clearFormArray((<FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options));

    this.addOption(index, this.surveyForm);
    this.addOption(index, this.surveyForm);
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }


  addOption(index, surveyForm) {
    this.surveyForm = surveyForm
    const optionGroup = this.formBuilder.group({
      'answers': new FormControl('', Validators.required),
      'answerId': new FormControl(0),
      'questionId': new FormControl(0),
      'orderNo': new FormControl(0),
      'createdBy': new FormControl(0),
      'updatedBy': new FormControl(0),
      'result': new FormControl(0),
    });
    (<FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options).push(optionGroup);
  }

  onRemoveQuestion(index) {
    this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup = new FormGroup({});
    this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionType = new FormControl({});

    (<FormArray>this.surveyForm.get('surveyQuestions')).removeAt(index);
    this.selectedOption.splice(index, 1);
  }

  removeOption(questionIndex, itemIndex) {
    (<FormArray>this.surveyForm.controls.surveyQuestions['controls'][questionIndex].controls.questionGroup.controls.options).removeAt(itemIndex);
  }

  isSelectMandatory(event, index) {
    // this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.isMandatory.patchValue(event.target.checked)
    this.surveyForm.controls.surveyQuestions['controls'][index].controls.isMandatory.patchValue(event.target.checked)
  }

  isSelectAnonymousSurvey(event) {
    // this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.isMandatory.patchValue(event.target.checked)
    this.surveyForm.controls.isSurveyAnonymous.patchValue(event.target.checked)
  }

  isSelectMandatorySurvey(event) {
    // this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.isMandatory.patchValue(event.target.checked)
    this.surveyForm.controls.isSurveyMandatory.patchValue(event.target.checked)
  }

  public isInputValid(field: string): string {
    return this.customFieldValidation.isFieldValid(field, this.surveyForm);
  }

  public getPattern(field: string): string {
    return fieldValidator.find(v => v.key === field).pattern;
  }

  public inputDateValidation(event: any): void {
    if (event != null) {
      this.customValidation.inputDateValidation(event);
    }
  }
  checkValidation(formData) {
    if (formData.surveyName === '') {
      this.toasterService.pop('error', 'Error', 'Please enter Survey Name');
    } else if (formData.fromDate === '') {
      this.toasterService.pop('error', 'Error', 'Please enter From Date');
    } else if (formData.toDate === '') {
      this.toasterService.pop('error', 'Error', 'Please enter To Date');
    } else if (!formData.surveyType) {
      this.toasterService.pop('error', 'Error', 'Please select Survey Type');
    } else if (formData.surveyId === 0 && parseInt(formData.surveyType) === 3 && formData.surveySetOfUserConfiguration.length === 0) {
      this.toasterService.pop('error', 'Error', 'Please select set of user from modal popup');
      return false;
    } else {
      let questions = this.surveyForm.get('surveyQuestions')['controls'];
      questions.forEach(element => {
        if (element.controls.question.value === '') {
          this.toasterService.pop('error', 'Error', 'Please enter Question Title');
        } else if (!element.controls.questionType.value) {
          this.toasterService.pop('error', 'Error', 'Please select Answer Type');
        }
        if (element.controls.questionType.value !== 3) {
          element.controls.questionGroup.controls.options.controls.forEach(data => {
            if (data.controls.answers.value === '') {
              this.toasterService.pop('error', 'Error', 'Please enter option detail');
            }
          });
        }

      });
    }
    this.setMarkAsDirty()
    if (!this.surveyForm.valid) {
      // this.toasterService.pop('error', 'Error', 'Please fill all the fields of form');
      return false;
    } else {
      return true;
    }
  }

  setMarkAsDirty() {
    this.surveyForm.get('surveyName').markAsDirty()
    this.surveyForm.get('fromDate').markAsDirty()
    this.surveyForm.get('toDate').markAsDirty()
    this.surveyForm.get('surveyType').markAsDirty()
    let questions = this.surveyForm.get('surveyQuestions')['controls'];
    questions.forEach(element => {
      element.get('question').markAsDirty();
      element.get('questionType').markAsDirty();
      element.controls.questionGroup.controls.options.controls.forEach(data => {
        data.controls.answers.markAsDirty()
      });
    });
  }

  checkDate(formData) {
    let returnDateValue: boolean = false;
    let allSuveyList = sessionStorage.getItem('SurveyList');
    if (!!allSuveyList) {
      let allSuveyList = JSON.parse(sessionStorage.getItem('SurveyList'));
      let surveyList = allSuveyList.filter(item => item.surveyType === parseInt(formData.surveyType));
      var currentFromDate = this.datePipe.transform(formData.fromDate, 'MM-dd-yyyy');
      var currentToDate = this.datePipe.transform(formData.toDate, 'MM-dd-yyyy');
      var keepGoing = true;
      surveyList.forEach(element => {
        if (keepGoing) {
          var listFromDate = this.datePipe.transform(element.fromDate, 'MM-dd-yyyy');
          var listToDate = this.datePipe.transform(element.toDate, 'MM-dd-yyyy');
          var from = Date.parse(listFromDate);
          var to = Date.parse(listToDate);
          var startDateCheck = Date.parse(currentFromDate);
          var endDateCheck = Date.parse(currentToDate);
          if (startDateCheck <= to && startDateCheck >= from) {

            if (element.id !== formData.surveyId) {
              keepGoing = false;
              returnDateValue = true;
              // this.openConfirmationPopup();
            }

          } else if (endDateCheck <= to && endDateCheck >= from) {
            if (element.id !== formData.surveyId) {
              keepGoing = false;
              returnDateValue = true;
              // this.openConfirmationPopup();
            }
          }
        }
      });
    }
    if (!returnDateValue) {
      this.addSurvey(this.surveyForm.value)
    } else {
      this.toasterService.pop('error', 'Error', 'Survey dates are conflicting. Please choose another date range.');
    }
    // return returnDateValue;
  }

  // openConfirmationPopup(): boolean {
  //   let returnValue: boolean = true;
  //   let config = new OverlayConfig({
  //     hasBackdrop: true,
  //     backdropClass: '',
  //     positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
  //   });

  //   this.overlayRef = this.overlay.create(config);
  //   this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(CreateSurveyConfirmationComponent));
  //   this.focusTrapFactory.create(this.overlayRef.overlayElement);
  //   this.componentOverlayRef.instance.cancel.subscribe(status => {
  //     returnValue = false;
  //     this.overlayRef.dispose();
  //   });
  //   this.componentOverlayRef.instance.update.subscribe(status => {
  //     returnValue = true;
  //     this.addSurvey(this.surveyForm.value)
  //     this.overlayRef.dispose();
  //   });
  //   return returnValue;
  // }

  submitSurvey(surveyForm) {
    this.surveyForm = surveyForm;
    let formData = this.surveyForm.value;

    if (this.checkValidation(formData)) {
      if (this.dateValidation(formData)) {
        // this.checkDate(formData);
        this.addSurvey(this.surveyForm.value);
      }
    } else {
      this.failedApi.next(true)
      this.globalResponseHandlerService.displayLoader(false);
    }
  }

  addSurvey(formData) {
    let isActive = false;
    let Questions = [];
    let surveyQuestions = formData.surveyQuestions;
    let survey: SurveyRequestModel
    survey = new SurveyRequestModel(
      formData.surveyId,
      formData.surveyName,
      this.datePipe.transform(formData.fromDate, 'yyyy/MM/dd'),
      this.datePipe.transform(formData.toDate, 'yyyy/MM/dd'),
      parseInt(formData.surveyType),
      parseInt(formData.surveyType) === 3 ? formData.surveySetOfUserConfiguration : [],
      parseInt(formData.surveyType) === 3 ? formData.surveyTeamMembers : [],
      formData.isActive,
      formData.isSurveyAnonymous,
      formData.isSurveyMandatory,
      formData.description,
      this.userData.userId,
      this.userData.userId,
      Questions
    );

    surveyQuestions.forEach((question, index, array) => {
      let questionItem = {
        questionId: question.questionId,
        surveyId: formData.surveyId,
        categoryId: 0,
        question: question.question,
        answerSelectionTypeId: question.questionType,
        orderNo: index + 1,
        isMandatory: question.isMandatory,
        createdBy: this.userData.userId,
        // updatedBy: this.userData.userId,
        surveyWiseQuestionAnswers: []
      }

      if (question.questionGroup.hasOwnProperty('options')) {
        if (question.questionGroup.options.length > 0) {
          question.questionGroup.options.forEach((option, index) => {
            if (formData.surveyId > 0) {
              let optionItem = {
                answerId: option.answerId,
                questionId: question.questionId,
                answers: option.answers,
                weightage: 0,
                orderNo: index + 1,
                // updatedBy: this.userData.userId,
                createdBy: this.userData.userId,
              }
              questionItem.surveyWiseQuestionAnswers.push(optionItem)
            } else {
              let optionItem = {
                answerId: option.answerId,
                questionId: question.questionId,
                answers: option.answers,
                weightage: 0,
                orderNo: index + 1,
                // updatedBy: this.userData.userId,
                createdBy: this.userData.userId,
              }
              questionItem.surveyWiseQuestionAnswers.push(optionItem)
            }
          });
        } else {
          if (formData.surveyId > 0) {
            let optionItem: any = {
              answerId: question.questionGroup.options.length > 0 ? question.questionGroup.options[0].answerId : 0,
              questionId: question.questionId,
              answers: '',
              weightage: 0,
              orderNo: 0,
              // updatedBy: this.userData.userId,
              createdBy: this.userData.userId,
            }
            questionItem.surveyWiseQuestionAnswers.push(optionItem)
          } else {
            let optionItem: any = {
              answerId: 0,
              questionId: question.questionId,
              answers: '',
              weightage: 0,
              orderNo: 0,
              // updatedBy: this.userData.userId,
              createdBy: this.userData.userId,
            }
            questionItem.surveyWiseQuestionAnswers.push(optionItem)
          }

        }
      }
      survey.surveyWiseQuestions.push(questionItem)
    });

    this.globalResponseHandlerService.displayLoader(true);
    this.save.next(survey);
    this.failedApi.next(true);
  }

  goToSurveyListPage() {
    this.router.navigate([Route.Survey]);
  }

  goToSurveyPreviewPage() {
    // if (this.checkValidation(this.surveyForm.value)) {
    sessionStorage.setItem('SurveyDetail', JSON.stringify(this.surveyForm.value));
    this.urlEncryptionDecryptionService.urlEncryption('0', Route.PreviewSurvey);
    // } 
    // else {
    //   this.toasterService.pop('error', 'Error', 'Submit all the deatis of the form for preview');
    // }

  }

  public checkResponse(response: any): any[] {
    if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
      return response.data;
    } else {
      return [];
    }
  }

  //  For drag and drop event : 
  drop(event: CdkDragDrop<string[]>, type, index) {
    if (type === 'Question') {
      moveItemInArray(this.surveyForm.get('surveyQuestions')['controls'], event.previousIndex, event.currentIndex);
      moveItemInArray(this.surveyForm.get('surveyQuestions').value, event.previousIndex, event.currentIndex);
      this.setSelectedOption(this.surveyForm.value)
    } else {
      moveItemInArray(this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options['controls'], event.previousIndex, event.currentIndex);
      moveItemInArray(this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options.value, event.previousIndex, event.currentIndex);
    }
    return this.surveyForm;
  }

  ///////////////////////////////////------------------------////////////////////////
  bindControlValue(survey) {
    if (survey) {
      this.surveyForm = this.formBuilder.group({
        surveyId: [survey.surveyId],
        surveyName: [survey.surveyName, [Validators.required]],
        fromDate: [survey.fromDate, [Validators.required]],
        toDate: [survey.toDate, [Validators.required]],
        surveyType: [survey.surveyType, [Validators.required]],
        surveyTypeName: [survey.surveyTypeName],
        description: [survey.description],
        surveySetOfUserConfiguration: [survey.surveySetOfUserConfiguration],
        surveyTeamMembers: [survey.surveyTeamMembers],
        isActive: [survey.isActive],
        isSurveyAnonymous: [survey.isSurveyAnonymous],
        isSurveyMandatory: [survey.isSurveyMandatory],
        createdBy: [survey.createdBy],
        updatedBy: [survey.updatedBy],
        surveyQuestions: new FormArray([]),
      });
      this.bindQuestionList(survey.surveyWiseQuestions)
      return this.surveyForm;
    }
  }

  bindQuestionList(surveyWiseQuestions) {
    surveyWiseQuestions.forEach((element, index) => {
      const surveyQuestionItem = this.formBuilder.group({
        'questionId': new FormControl(element.questionId),
        'surveyId': new FormControl(element.surveyId),
        'categoryId': new FormControl(element.categoryId),
        'question': new FormControl(element.question, Validators.required),
        'questionType': new FormControl(element.answerSelectionTypeId, Validators.required),
        'orderNo': new FormControl(element.orderNo),
        'isMandatory': new FormControl(element.isMandatory),
        'createdBy': new FormControl(element.createdBy),
        'updatedBy': new FormControl(element.updatedBy),
        'questionGroup': new FormGroup({
          'options': new FormArray([]),
          'isMandatory': new FormControl(false),
        })
      });
      const questionArray = <FormArray>this.surveyForm.get('surveyQuestions');
      questionArray.push(surveyQuestionItem)
    });
    // this.setSelectedOption(this.surveyForm.value)
    this.bindOption(surveyWiseQuestions)
  }

  bindOption(surveyWiseQuestions) {
    surveyWiseQuestions.forEach((element, index) => {
      element.surveyWiseQuestionAnswers.forEach((data, i) => {
        if (element.answerSelectionTypeId !== 3) {
          const ansGroup = this.formBuilder.group({
            'answerId': new FormControl(data.answerId),
            'answers': new FormControl(data.answers, Validators.required),
            'weightage': new FormControl(data.weightage),
            'orderNo': new FormControl(data.orderNo),
            'createdBy': new FormControl(data.createdBy),
          });
          const answerArray = <FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options;
          answerArray.push(ansGroup)
        } else {
          const ansGroup = this.formBuilder.group({
            'answerId': new FormControl(data.answerId),
            'answers': new FormControl(data.answers),
            'weightage': new FormControl(data.weightage),
            'orderNo': new FormControl(data.orderNo),
            'createdBy': new FormControl(data.createdBy),
          });
          const answerArray = <FormArray>this.surveyForm.controls.surveyQuestions['controls'][index].controls.questionGroup.controls.options;
          answerArray.push(ansGroup)
        }


      });

    })

  }
  setSelectedOption(surveyForm) {
    this.selectedOption = [];
    surveyForm.surveyQuestions.forEach(element => {
      this.selectedOption.push(element.questionType)
    });
  }

  private dateValidation(survey): boolean {
    let fromDate = moment(survey.fromDate).format('YYYY-MM-DD');
    let toDate = moment(survey.toDate).format('YYYY-MM-DD');
    let currentDate = moment(new Date()).format('YYYY-MM-DD');
    if ((currentDate > fromDate && survey.surveyId === 0)) {
      this.globalResponseHandlerService.disaplyErrorMessage('From Date should not be past date.');
      return false;
    }
    if (fromDate >= toDate) {
      this.globalResponseHandlerService.disaplyErrorMessage('To Date should not be less than or equal to From Date.');
      return false;
    }
    return true;
  }

  public checkSurveyType(surveyForm, surveyMasterData) {
    if (surveyForm.value.surveyType === '3' || surveyForm.value.surveyType === 3) {
      this.openDimensionSelectionModal(surveyMasterData, surveyForm.value);
      this.surveyForm.controls.surveyTypeName.patchValue(surveyMasterData.surveyType[2].name)
    } else if (surveyForm.value.surveyType === '2' || surveyForm.value.surveyType === 2) {
      this.surveyForm.controls.surveyTypeName.patchValue(surveyMasterData.surveyType[1].name)
    }
  }

  private openDimensionSelectionModal(surveyMasterData, formData) {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
    // this.selectedArray = [];
    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(SelectDimensionComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.componentOverlayRef.instance.surveyMasterData = surveyMasterData;
    this.componentOverlayRef.instance.formData = formData;
    this.componentOverlayRef.instance.cancel.subscribe(status => {
      this.overlayRef.dispose();
    });
    this.componentOverlayRef.instance.saveSelection.subscribe(selectedData => {
      this.surveyForm.controls['surveySetOfUserConfiguration'].patchValue(selectedData.selectionObj.selectedDimensionElementArray);
      this.surveyForm.controls['surveyTeamMembers'].patchValue(selectedData.selectionObj.empArray);
      // this.selectedArray = selectedData.selectionObj.selectedDimensionElementArray;
      // this.selectedEmployeeArray = selectedData.selectionObj.empArray;
      this.overlayRef.dispose();
    });
  }

  isCheckAndSetPublishButton(surveyForm): boolean {
    let isEnablePublish: boolean;
    // comment code for future reference : 
    // let toDate = moment(surveyForm.toDate).format('YYYY-MM-DD');
    // let currentDate = moment(new Date()).format('YYYY-MM-DD');
    if (surveyForm.isActive) {
      isEnablePublish = true;
      // if (toDate >= currentDate) {
      //   isEnablePublish = true;
      // } else {
      //   isEnablePublish = false;
      // }
    } else {
      isEnablePublish = false;
    }
    return isEnablePublish
  }

  publishNotification(surveyForm, surveyIdAfterAddSurvey) {
    this.globalResponseHandlerService.displayLoader(true);
    let publishObj = {
      surveyId: surveyForm.surveyId > 0 ? surveyForm.surveyId : surveyIdAfterAddSurvey,
      createdBy: this.userData.userId,
      empId: this.userData.empId
    }
    this.publish.next(publishObj);
  }
}
