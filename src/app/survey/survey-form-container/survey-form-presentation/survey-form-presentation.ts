import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { EditSurvey, AddSurvey, QuestionTypeArray, QuestionType, Survey, SurveyRequestModel, SurveyTypeMaster, DimensionElemet, EmployeeList } from '../../survey.model';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { SurveyFormPresenter } from './survey-form-presenter/survey-form-presenter';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
import { LoaderService } from '../../../core/loader/loader.service';
import { SelectDimensionPresenter } from '../select-dimension-presenter/select-dimension-presenter';

@Component({
  selector: 'trigger-survey-form-presentation',
  templateUrl: './survey-form-presentation.html',
  styleUrls: ['./survey-form-presentation.scss']
})
export class SurveyFormPresentation implements OnInit {
  /** This property is used for store survey-details by survey id */
  public _getSurveyById: any[];
  /** This property is used for get survey-datails based on survey id response from container component */
  @Input() public set getSurveyById(getSurveyById: any[]) {
    if (getSurveyById) {
      this._getSurveyById = this.formPresenter.checkResponse(getSurveyById);
      this.isEditForm = true;
      this.surveyForm = this.formPresenter.bindControlValue(this._getSurveyById);
      this.setSelectedOption(this.surveyForm.value);
      this.isCheckAndSetPublishButton(this.surveyForm.value, this.surveyForm.value.surveyType);
    }
  }
  public get getSurveyById(): any[] {
    return this._getSurveyById;
  }

  @Input() public set surveyMaster(surveyMaster: any[]) {
    if (surveyMaster) {
      this.surveyMasterData = this.formPresenter.checkResponse(surveyMaster);
      this.isLoadData = true;

    }
  }
  public get surveyMaster(): any[] {
    return this.surveyMasterData;
  }

  @Input() public set getEmployeesByDimension(employees: any) {
    if (!!employees) {
      employees.status = 200
      this.employeeData = this.formPresenter.checkResponse(employees);
      this.selectDimensionPresenter.employeeResponse.next(this.employeeData);
    }
  }
  public get getEmployeesByDimension(): any {
    return this.employeeData;
  }

  @Input() surveyId: number;
  @Input() copySurvey: any;
  @Input() isAddSurvey: boolean;
  @Input() surveyIdAfterAddSurvey: number;

  public tooltipId: number;
  public pageTitle: string;
  public questionType: QuestionType[];
  public surveyForm: FormGroup;
  public selectedOption = [];
  minDate: Date;
  minStartDate: Date;
  minEndDate: Date;
  private destroy: Subject<void> = new Subject();
  @Output() add: EventEmitter<SurveyRequestModel> = new EventEmitter();
  /** EventEmitter for update-survey-api which we called in container page */
  @Output() update: EventEmitter<SurveyRequestModel> = new EventEmitter();
  @Output() publish: EventEmitter<any> = new EventEmitter();
  @Output() getEmployees: EventEmitter<DimensionElemet> = new EventEmitter();
  public themeEmitter: any;
  public themeClass: string;
  public surveyMasterData: any;
  public employeeData: EmployeeList[];
  public isLoadData: boolean;
  public isEditForm: boolean;
  public isEnablePublish: boolean;
  public isShowPublishButon: boolean;

  constructor(
    private formPresenter: SurveyFormPresenter,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private formBuilder: FormBuilder,
    private globalEventsManager: GlobalEventsManager,
    private loaderService: LoaderService,
    private selectDimensionPresenter: SelectDimensionPresenter) {
    this.isLoadData = false;
    this.isEditForm = false;
    this.isEnablePublish = false;
    this.isShowPublishButon = false;
    this.surveyForm = this.formPresenter.createForm();
    this.tooltipId = 0;
    this.questionType = QuestionTypeArray;
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.minDate = new Date('01-01-1900');
    this.minDate.setDate(this.minDate.getDate());
    this.destroy = new Subject();
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.themeClass = 'theme-dark'
      } else {
        this.themeClass = 'theme-default'
      }
    })
  }

  ngOnInit() {
    if (!!this.copySurvey) {
      this.copySurvey.fromDate = new Date(this.copySurvey.fromDate)
      if (this.copySurvey.fromDate < new Date()) {
        this.copySurvey.fromDate = new Date()
      }
      if (this.copySurvey.toDate < new Date()) {
        this.copySurvey.toDate = new Date()
      }
      this.copySurvey.toDate = new Date(this.copySurvey.toDate)
      this.surveyForm = this.formPresenter.bindControlValue(this.copySurvey);
      this.setSelectedOption(this.surveyForm.value)
      this.isCheckAndSetPublishButton(this.surveyForm.value, this.surveyForm.value.surveyType);
    }
    this.formPresenter.saveSurvey$.pipe(takeUntil(this.destroy)).subscribe((survey: SurveyRequestModel) => {
      if (survey.surveyId === 0) {
        this.add.next(survey)
      } else {
        this.update.next(survey)
      }
    });

    this.formPresenter.publishNotification$.pipe(takeUntil(this.destroy)).subscribe((publishObject: any) => {
      this.publish.next(publishObject);
    });

    this.selectDimensionPresenter.getEmployeeList$.pipe(takeUntil(this.destroy)).subscribe((dimensionObj: DimensionElemet) => {
      this.getEmployees.next(dimensionObj);
    });

    this.formPresenter.failedApi$.pipe(takeUntil(this.destroy)).subscribe((isConfirn: boolean) => {
    })
  }

  ngOnChanges() {
    if (this.surveyId > 0) {
      this.pageTitle = EditSurvey;
      this.tooltipId = 66;
    } else {
      this.pageTitle = AddSurvey;
      this.tooltipId = 65;
    }
    if (!!this.surveyMasterData || !!this._getSurveyById) {
      this.loaderService.emitIsLoaderShown(false);
    }

    if (this.isAddSurvey) {
      this.isEnablePublish = true;
    }
  }

  isCheckAndSetPublishButton(surveyForm, surveyType) {
    this.isShowPublishButon = surveyType !== 1 ? true : false;
    this.isEnablePublish = this.formPresenter.isCheckAndSetPublishButton(surveyForm);

  }
  onAddQuestion() {
    this.formPresenter.onAddQuestionOnButtonClick();
  }

  selectQuestionType(questionType, index) {
    this.formPresenter.onSeletQuestionType(questionType, index);
  }

  removeQuestion(index) {
    this.formPresenter.onRemoveQuestion(index);
    this.selectedOption.splice(index, 1);
  }

  addOption(index) {
    this.formPresenter.addOption(index, this.surveyForm);
  }

  removeOption(questionIndex, itemIndex) {
    this.formPresenter.removeOption(questionIndex, itemIndex);
  }

  isSelectMandatory(event, index) {
    this.formPresenter.isSelectMandatory(event, index);
  }

  isSelectAnonymousSurvey(event) {
    this.formPresenter.isSelectAnonymousSurvey(event);
  }

  isSelectMandatorySurvey(event) {
    this.formPresenter.isSelectMandatorySurvey(event);
  }

  public isInputValid(field: string): string {
    return this.formPresenter.isInputValid(field);
  }
  public getPattern(field: string): string {
    return this.formPresenter.getPattern(field);
  }

  public inputDateValidation(event: Event): void {
    return this.formPresenter.inputDateValidation(event);
  }

  public onChangeStartDate(event: any): void {
    // if (event && !!this.getSurveyById) {
    if (event) {
      this.minEndDate = this.getdate(event);
    } else {
      this.minEndDate.setDate(this.minStartDate.getDate());
    }
    // if (event && (this.surveyForm.value.toDate < event || this.surveyForm.value.toDate.getDate() < event.getDate())) {
    //   this.surveyForm = this.formPresenter.bindEndDate();
    // }
    if (event && (this.surveyForm.value.toDate < event)) {
      this.surveyForm = this.formPresenter.bindEndDate();
    }
  }

  private getdate(event: Date): Date {
    var currentDate = event;
    var date = new Date(currentDate);
    var newdate = new Date(date);
    newdate.setDate(newdate.getDate() + 1);

    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var y = newdate.getFullYear();

    var someFormattedDate = mm + '/' + dd + '/' + y;
    return new Date(someFormattedDate)
  }

  onSubmit() {
    this.formPresenter.submitSurvey(this.surveyForm)
  }

  drop(event: CdkDragDrop<string[]>, type, index) {
    this.surveyForm = this.formPresenter.drop(event, type, index)
    this.setSelectedOption(this.surveyForm.value)
  }

  setSelectedOption(surveyForm) {
    this.selectedOption = [];
    surveyForm.surveyQuestions.forEach(element => {
      this.selectedOption.push(element.questionType)
    });
  }

  goToListPage() {
    this.formPresenter.goToSurveyListPage()
  }

  redirectToPreviewSurvey() {
    this.formPresenter.goToSurveyPreviewPage()
  }

  selectSurveyType() {
    this.formPresenter.checkSurveyType(this.surveyForm, this.surveyMasterData)
    this.isCheckAndSetPublishButton(this.surveyForm.value, parseInt(this.surveyForm.value.surveyType))
  }

  publishNotification() {
    this.formPresenter.publishNotification(this.surveyForm.value, this.surveyIdAfterAddSurvey)
  }

  openDimensinSelectForEdit() {
    this.formPresenter.checkSurveyType(this.surveyForm, this.surveyMasterData)
  }

  ngOnDestroy(): void {
    sessionStorage.setItem('CopySurvey', '');
    this.themeEmitter.unsubscribe();
  }
}
