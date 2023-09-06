/**
@author : Mihir Patel
@class : AssessmentComponent
@description :AssessmentComponent is created for assessment page, which is show after login.
**/
import { Component, OnInit, ElementRef, ComponentRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import * as _ from 'underscore';
//  ................................................ //
import { AssessmentService } from './assessment.service';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { Encryption, ErrorMessage } from '../core/magic-string/common-validation-model';
import { Route, Error_Type, Error_Title, Base64SplitString, dashboardClass, Actions, SendMail, ActionType, PopupPanelClass, RouteUrl, Success_Type, Success_Title, DashboardStatus, ManagerDashboard, MyDashboard, Role } from '../core/magic-string/common.model';
import { UrlEncryptionDecryptionService } from '../core/url-encryption-decryption/url-encryption-decryption.service';
import { TriggerEmployee } from '../shared/tooltip/tooltip-model';
import {
  ClassRedText, AssessmentSelectEmployee, AssssmentSelectOption, AssessmentAlreadyDone, TriggerScore, Category,
  Question, Answer, questionAnswer, CategoryAttachment, GeneralAttachment, AssessmentDateFormate,
  AssessmentDateTimeStamp, StrikeOutStyleClass, QuarterlyString, AttachmentString, SurveyConfirmation, AssessmentInSaveAsDraft
} from './assessment-model';
import { AuthService } from '../core/auth/auth.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import { EmployeeService } from '../core/services/employee-service/employee.service';
import { DeletePopupComponent } from '../shared/modal-popup/delete-popup/delete-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { canView, ActionPermissionService, canAdd } from '../core/services/action-permission/action-permission.service';
import { OverlayRef, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AttachFileUrlComponent } from '../shared/modal-popup/attach-file-url/attach-file-url.component';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { GlobalEventsManager } from '../core/navbar/globalEventsManager';
import { MailContentComponent } from '../shared/modal-popup/mail-content/mail-content.component';
import { CommonService } from '../core/services/common/common.service';
import { SurveyConfirmationComponent } from './survey-confirmation/survey-confirmation.component';
import { LoaderService } from '../core/loader/loader.service';
import { SurveyFormComponent } from '../shared/components/survey-form/survey-form.component';
import { AssessmentAdapter } from '../shared/adapter/assessment-adapter/assessment-adapter';
import { OpenOverlayService } from '../shared/services/open-cdk-overlay/open-overlay.service';
import { OverlayRefModel, AddSurveyForm, ScrollType } from '../shared/modals/survey-form-model';
import { TeamMemberAssessment } from '../shared/modals/shared-model';
@Component({
  selector: 'trigger-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  public userData: any;
  public categories: Category[];
  public employeeList: Array<any>;
  public finalArray = [];
  public date: string;
  public userId: string;
  public currentDate: Date;
  public selectedValue: string = '0';
  public employeeId: string;
  public isDisabled: number;
  public isButtonDisabled: boolean;
  public allQuestions: any;
  public unSelectedAnswer: any;
  public pageTitle: string;
  public isDisplayEmployeeDassborad: boolean;
  public assessmentForm: FormGroup
  public answerId: string;
  public assessmentRequestBody: any;
  public generalAttachmentName: string = '';
  public questionAnswerResponse: Array<any>;
  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;
  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;
  public sendTrigger: boolean;
  public isCommentSend: boolean;
  public triggerScore: TriggerScore;
  public sendMailObject: SendMail;
  public isSurveyActive: boolean;
  public isSurveyMandatory: boolean;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  private assessmentId: number;
  public isDraftEvaluationPermission: boolean;

  constructor(
    private assessmentService: AssessmentService,
    private toasterService: ToasterService,
    private employeeService: EmployeeService,
    private loaderService: LoaderService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private elRef: ElementRef,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private authService: AuthService,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private actionPermissionService: ActionPermissionService,
    public overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory,
    private globalEventsManager: GlobalEventsManager,
    private commonService: CommonService,
    private assessmentAdapter: AssessmentAdapter,
    private openOverlayService: OpenOverlayService,
    private router: Router
  ) {
    this.isButtonDisabled = false;
    this.pageTitle = TriggerEmployee;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }

  ngOnInit() {
    this.globalEventsManager.getNotification(true);
    this.isDisabled = 0;
    this.setCurrentDate();
    this.getUserData();
    this.getAllEmployeeList(this.userData.clientId, this.userData.loginEmpId);
    this.isDraftEvaluationPermission = this.userData.roleId === Role.Admin ? true : 
                      this.actionPermissionService.isCheckCommonPermission(Actions.EvaluationsInDrafts, canAdd);
  }

  /**
 * Author : Sonal Patil
 * Modified-Date :  21-12-2018
 * Description : For initialize current date and filter date.
 */
  setCurrentDate(): void {
    this.currentDate = new Date();
    this.date = this.datePipe.transform(new Date(), AssessmentDateTimeStamp);
  }
  /**
     * Author : Sonal Patil
     * Modified-Date :  18-12-2018
     * Description : For session data  & initialize variables for tooltip
     */
  getUserData(): void {
    this.userData = this.globalResponseHandlerService.getUserData();
    this.userId = this.userData.userId;
  }

  /**
 * Author : Mihir Patel
 * Modified-Date :  21-12-2018
 * Description : For get all employee list:
 */
  getAllEmployeeList(companyId, managerId): void {
    this.globalResponseHandlerService.displayLoader(true);
    this.employeeService.getTriggerEmployees(companyId, managerId).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          this.employeeList = _.sortBy(response.data, 'firstName');
          this.checkEmployee();
          this.getAllQuestionListAtOnInit();
        } else {
          this.getAllQuestionListAtOnInit();
        }
      });
  }

  /**
  * Author : Sonal Patil
  * Modified-Date :  18-12-2018
  * Description :For checking employee already available or not
  */
  checkEmployee(): void {
    this.employeeId = this.activatedRoute.snapshot.queryParams['id'];
    this.employeeId = this.urlEncryptionDecryptionService.urlDecryption(this.employeeId);
    this.getCurrenSelectedUser(this.employeeId)
    if (parseInt(this.employeeId) > 0) {
      this.selectedValue = this.employeeId;
      this.isDisabled = 1;
      this.isAllowToDisplayEmployeeDashboard(parseInt(this.selectedValue));
    }
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  08-01-2019
   * Description : For get all questionlist on init (this method is create because of loader issue.)
   */
  getAllQuestionListAtOnInit(): void {
    this.assessmentService.getAllQuestions().subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, true)) {
          this.questionAnswerResponse = response.data;
          this.bindCategories(this.questionAnswerResponse);
        }
      });
  }

  bindCategories(questionAnswerResponse) {
    this.allQuestions = [];
    questionAnswerResponse.forEach((object) => {
      if (!!object.lstQuestionneries) {
        object.lstQuestionneries.forEach((data) => {
          this.allQuestions.push(data.id);
        })
      }
    })
    this.categories = questionAnswerResponse.map((category) => ({
      categoryid: category.categoryid,
      category: category.category,
      questions: this.bindQuestions(category.lstQuestionneries),
      isCommentShareText: `Share ${category.category.toLowerCase()} comments with team member when sharing evaluation summary.`
    }));
    this.createForm();
  }

  bindQuestions(data: Question[]): Question[] {
    let questions: Question[];
    questions = data.map((question) => ({
      id: question.id,
      categoryid: question.categoryid,
      category: question.category,
      questions: question.questions,
      isActive: question.isActive,
      isShowTooltip: (question.id === 1 ? true : false) || (question.id === 13 ? true : false),
      isComment: (question.id === 5 ? true : false) || (question.id === 10 ? true : false) || (question.id === 13 ? true : false) || (question.id === 15 ? true : false),
      isCommentSectionShow: false,
      attachedFile: '',
      answers: this.bindAnswers(question.answers),
      isCommentSend: false
    }));
    return questions
  }

  bindAnswers(data: Answer[]): Answer[] {
    let answers: Answer[];
    answers = data.map((answer) => ({
      id: answer.id,
      questionId: answer.questionId,
      answers: answer.answers,
      weightage: answer.weightage,
      isActive: answer.isActive,
      createdby: answer.createdby,
      updatedby: answer.updatedby,
    }));
    return answers
  }


  createForm() {
    this.generalAttachmentName = '';
    this.assessmentForm = this.fb.group({
      remarks: ['', Validators.required],
      generalAttachment: [''],
      documentName: [''],
      documentContents: [''],
      CloudFilePath: [''],
      sendTrigger: [this.sendTrigger],
      isGeneralRemarkSend: [false],
    });
    // add category form array
    let empassessmentdetFormArray = new FormArray([]);
    this.categories.forEach(ct => {
      let categoryFormArray = new FormArray([]);
      ct.questions.forEach(question => {
        let questionFormGroup = new FormGroup({});
        let questionControl = new FormControl();
        questionFormGroup.addControl(question.id.toString(), questionControl);

        let questionIdControl = new FormControl();
        questionIdControl.patchValue(question.id.toString())
        questionFormGroup.addControl('questionId', questionIdControl);

        let questionRemarkControl = new FormControl();
        questionFormGroup.addControl('remarks', questionRemarkControl);

        let questionAttachmentControl = new FormControl();
        questionFormGroup.addControl('documentName', questionAttachmentControl);

        let questionAttachmentContentControl = new FormControl();
        questionFormGroup.addControl('documentContents', questionAttachmentContentControl);

        let questionCloudUrlControl = new FormControl();
        questionFormGroup.addControl('CloudFilePath', questionCloudUrlControl);

        if (question.id === 5 || question.id === 10 || question.id === 13) {
          let isCommentSend = new FormControl(false);
          questionFormGroup.addControl('isCommentSend', isCommentSend);
        }
        categoryFormArray.controls.push(questionFormGroup);
      });
      empassessmentdetFormArray.controls.push(categoryFormArray);
    });
    this.assessmentForm.addControl('empassessmentdet', empassessmentdetFormArray);
  }

  /**
 * Author : Mihir Patel
 * Modified-Date :  08-01-2019
 * Description : For assessment validation
 */
  checkValidation(selectedEmployee) {
    this.unSelectedAnswer = [];
    this.finalArray.forEach((selectedQuestion) => {
      $(StrikeOutStyleClass + selectedQuestion.questionId).removeClass(ClassRedText);
      if (selectedQuestion.questionId) {
        this.unSelectedAnswer.push(parseInt(selectedQuestion.questionId))
      }
    });
    if (!selectedEmployee) {
      this.toasterService.pop(Error_Type, Error_Title, AssessmentSelectEmployee);
      return;
    } else if (this.finalArray.length < 15) {
      this.toasterService.pop(Error_Type, Error_Title, AssssmentSelectOption);
      let missingQuestions = this.allQuestions.filter(item => this.unSelectedAnswer.indexOf(item) < 0);
      missingQuestions.forEach((elemId) => {
        $(StrikeOutStyleClass + elemId).addClass(ClassRedText);
      })
      // Method call for scroll to unchecked answer of question : 
      this.scrollToQuestion(StrikeOutStyleClass + missingQuestions[0]);
      return;
    } else {
      return true;
    }
  }

  /**
  * Author : Mihir Patel
  * Modified-Date :  05-08-2019
  * Description : For manage tab-index on radio button use click method and patch value in form for selected index.
  */
  checkRadioButton(categoryIndex: number, questionIndex: number, questionId: number, answerId: number) {
    let empassessmentdetArray = this.assessmentForm.get('empassessmentdet') as FormArray;
    let categoryArray = empassessmentdetArray.controls[categoryIndex] as FormArray;
    let question = categoryArray.controls[questionIndex] as FormArray;
    question.controls[questionId].patchValue(answerId);
  }

  /**
  * Author : Mihir Patel
  * Modified-Date :  21-12-2018
  * Description : For show-hide text area at first question:
  */
  public showHideTextArea(questionObj): void {
    questionObj.isCommentSectionShow = !questionObj.isCommentSectionShow;
  }
  /**
    * Author : Mihir Patel
    * Created-Date :  08-01-2019
    * Description : For scroll top at seleceted id 
    */
  private scrollToQuestion(element): void {
    this.elRef.nativeElement.querySelector(element).scrollIntoView({ behavior: ScrollType });
  }

  getAnswerObject(selectedEmployee): void {
    let myArray: questionAnswer[] = []
    this.finalArray = [];
    let formData = this.assessmentForm.getRawValue();
    formData.empassessmentdet.forEach(categoryGroup => {
      categoryGroup.forEach(element => {
        let idx = 0;
        let key = Object.keys(element)[idx];
        let value = element[key]
        let questionObject = {
          questionId: parseInt(element.questionId),
          answerId: value,
          remarks: element.remarks,
          createdby: parseInt(this.userId),
          documentName: element.documentName,
          documentContents: element.documentContents,
          CloudFilePath: element.CloudFilePath,
          isCommentSend: element.isCommentSend && !!element.remarks ? 1 : 0
        }
        myArray.push(questionObject);
      });
    });
    this.assessmentRequestBody = {
      empid: parseInt(selectedEmployee),
      assessmentDate: this.date,
      assessmentBy: parseInt(this.userId),
      assessmentPeriod: QuarterlyString,
      remarks: formData.remarks,
      documentName: formData.documentName,
      documentContents: formData.documentContents,
      CloudFilePath: formData.CloudFilePath,
      createdby: parseInt(this.userId),
      empassessmentdet: myArray,
      sendTrigger: formData.sendTrigger,
      requestId: parseInt(sessionStorage.getItem(Encryption.RequestId)),
      isGeneralRemarkSend: formData.isGeneralRemarkSend ? 1 : 0,
      //RequestId: sessionStorage.getItem('requestId') ? parseInt(sessionStorage.getItem('requestId')) : 0
    }
    myArray.forEach(elem => {
      if (!!elem.answerId) {
        this.finalArray.push(elem)
      }
    });
  }

  public saveEmployeeAssessment(selectedEmployee, evulationStatus): void {
    if (this.assessmentForm.get('remarks').value.trim() === '') {
      this.toasterService.pop(Error_Type, Error_Title, 'General comment required.')
      return;
    }
    let teamMemberEvulation: number;
    if (!!evulationStatus) {
      teamMemberEvulation = TeamMemberAssessment.SaveAsDraft;
    } else {
      const sendTrigger = this.assessmentForm.get('sendTrigger').value;
      teamMemberEvulation = sendTrigger ? TeamMemberAssessment.SendAndShare : TeamMemberAssessment.SendAndNotShare;
    }
    this.employeeAssesment(selectedEmployee, teamMemberEvulation);
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  23-07-2019
   * Description : For hit api of employee assessmnet and save response in session for view on next page(Assessment score page)
   */
  private employeeAssesment(selectedEmployee, teamMemberEvulation: number): void {
    this.getAnswerObject(selectedEmployee);
    if (this.checkValidation(selectedEmployee)) {
      this.globalResponseHandlerService.displayLoader(true);
      this.sendTrigger = this.assessmentRequestBody.sendTrigger;
      this.assessmentRequestBody.sendTrigger = this.getSendTrigger(teamMemberEvulation);
      this.isButtonDisabled = true;
      this.isDisabled = 0;
      this.assessmentService.employeeAssessment(this.assessmentRequestBody).subscribe(
        (response) => {
          if (this.globalResponseHandlerService.getApiResponse(response, false)) {
            this.triggerScore = response.data[0];
            this.isSurveyActive = response.data[0].isSurveyActive;
            this.isSurveyMandatory = response.data[0].isSurveyMandatory;
            this.assessmentId = response.data[0].assessmentId;
            if (teamMemberEvulation === TeamMemberAssessment.SendAndNotShare) {
              //this.redirectToTruvelopScore();
              this.openSurveyConfirmaion();
            } else if (teamMemberEvulation === TeamMemberAssessment.SendAndShare) {
              this.sendMailObject = new SendMail(response.data[0].assessmentId, ActionType.TriggerAnEmployee, response.data[0].employeeEmail, response.data[0].emailContent);
              this.openMailConfiramtionModal(response.data[0].emailContent);
            } else if (teamMemberEvulation === TeamMemberAssessment.SaveAsDraft) {
              this.toasterService.pop(Success_Type, Success_Title, response.message);
              this.goToDashboard(parseInt(selectedEmployee));
            }
          }
        });
    }
  }

  /**
     * Author : Anjali Tandel
     * Created-Date : 10-09-2019
     * Description : Get class by grade.
     */
  getClassByGrade(grade: string): string {
    if (grade !== '') {
      return dashboardClass.find(c => grade.includes(c.grade)).bindClass;
    } else {
      return '';
    }
  }

  /**
  * Author : Mihir Patel
  * Modified-Date :  23-07-2019
  * Description : For get selected employee:
  */
  public changeEmployee(selectedEmployee: string): void {
    if (parseInt(selectedEmployee) !== 0) {
      sessionStorage.setItem(Encryption.RequestId, '0');
      this.getCurrenSelectedUser(selectedEmployee);
      this.isAllowToDisplayEmployeeDashboard(parseInt(selectedEmployee));
      let lastAssessedDate = '';
      let date = this.datePipe.transform(new Date(), AssessmentDateFormate);
      let selcetedEmp: any = this.employeeList && this.employeeList.find((item) => item.empId === parseInt(selectedEmployee));
      this.employeeList.forEach(obj => {
        if (obj.empId === parseInt(selectedEmployee)) {
          //lastAssessedDate = obj.lastAssessedDate;
          lastAssessedDate = obj.managerLastAssessedDate;
        }
      })
      if (selcetedEmp.isTriggerSent === 2) {
        this.isDisabled = 0;
        this.toasterService.pop(Error_Type, Error_Title, AssessmentInSaveAsDraft);
      } else {
        if (lastAssessedDate !== date) {
          if (!!selectedEmployee) {
            this.isDisabled = 1;
            this.isButtonDisabled = false;
            this.elRef.nativeElement.querySelector('#formId').scrollIntoView({ behavior: ScrollType });
            this.bindCategories(this.questionAnswerResponse);
          }
        } else {
          this.isDisabled = 0;
          this.toasterService.pop(Error_Type, Error_Title, AssessmentAlreadyDone);
        }
      }
    } else {
      this.isDisabled = 0;
      this.bindCategories(this.questionAnswerResponse);
    }
  }

  getCurrenSelectedUser(selectedEmployeeId: string) {
    if (!!selectedEmployeeId) {
      let selectedEmployee = this.employeeList.find(e => e.empId === parseInt(selectedEmployeeId));
      if (selectedEmployee) {
        this.sendTrigger = selectedEmployee.sendTrigger;
        this.isCommentSend = selectedEmployee.sendTrigger;
      }
    }
  }
  /**
    * Author : Anjali Tandel
    * Modified-Date : 15/07/2019
    * Description : Check that selceted employee has permission for view employee dashboard or not.
    */
  private isAllowToDisplayEmployeeDashboard(id: number): void {
    let currentEmployee = this.employeeList.find(e => e.empId === id);
    if (currentEmployee) {
      this.isDisplayEmployeeDassborad = this.actionPermissionService.isDisplyEmployeeDashboard(currentEmployee);
    } else {
      this.globalResponseHandlerService.disaplySuccessMessage(ErrorMessage.PermissionChanged);
      this.authService.redirectToLogin();
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 15/07/2019
  * Description : Delete attachment for previously-uploaded attachment file.
  */
  public deleteAttachment(attachmentType, questionObj?, categoryIndex?: number, questionIndex?: number): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: AttachmentString,
    });
    dialogRef.componentInstance.confirm.subscribe((data) => {
      if (data) {
        if (attachmentType === CategoryAttachment) {
          if (!!questionObj.attachedFile) {
            questionObj.attachedFile = null;
            let empassessmentdetArray = this.assessmentForm.get('empassessmentdet') as FormArray;
            let categoryArray = empassessmentdetArray.controls[categoryIndex] as FormArray;
            let question = categoryArray.controls[questionIndex] as FormArray;
            question.controls['documentName'].patchValue('')
            question.controls['documentContents'].patchValue('')
            question.controls['CloudFilePath'].patchValue('')
            dialogRef.close();
          }
        } else {
          this.generalAttachmentName = '';
          this.assessmentForm.controls['documentName'].patchValue('');
          this.assessmentForm.controls['documentContents'].patchValue('');
          this.assessmentForm.controls['CloudFilePath'].patchValue('');
          dialogRef.close();
        }
      }
    });
  }

  /**
    * Author : Mihir Patel
    * Created-Date : 23-09-2019
    * Description : Create method for open attach file or enter cloud url modal popup.
    */
  public openCustomFileChooser(attachmentType, questionObj?: Question, categoryIndex?: number, questionIndex?: number): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(AttachFileUrlComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.componentOverlayRef.instance.data = {
      cloudUrl: '',
      isEditMode: false
    };
    this.componentOverlayRef.instance.cancel.subscribe(status => {
      this.overlayRef.dispose();
    });
    this.componentOverlayRef.instance.update.subscribe(attachedObject => {
      this.setAttachedFiles(attachmentType, attachedObject, questionObj, categoryIndex, questionIndex);
      this.overlayRef.dispose();
    });
  }

  /**
    * Author : Mihir Patel
    * Created-Date : 23-09-2019
    * Description : Create method for patch value in form as per get value from modal popup.
    */
  setAttachedFiles(attachmentType, attachedObject, questionObj?: Question, categoryIndex?: number, questionIndex?: number): void {
    if (attachmentType === CategoryAttachment) {
      let empassessmentdetArray = this.assessmentForm.get('empassessmentdet') as FormArray;
      let categoryArray = empassessmentdetArray.controls[categoryIndex] as FormArray;
      let question = categoryArray.controls[questionIndex] as FormArray;
      if (attachedObject.isCloudUrl) {
        question.controls['CloudFilePath'].patchValue(attachedObject.CloudFilePath)
        question.controls['documentName'].patchValue('')
        question.controls['documentContents'].patchValue('')
        questionObj.attachedFile = attachedObject.CloudFilePath;
      } else {
        question.controls['documentName'].patchValue(attachedObject.attachFileName)
        question.controls['documentContents'].patchValue(attachedObject.attachFileContent)
        question.controls['CloudFilePath'].patchValue('')
        questionObj.attachedFile = attachedObject.attachFileName;
      }
    } else if (attachmentType === GeneralAttachment) {
      if (attachedObject.isCloudUrl) {
        this.assessmentForm.controls['CloudFilePath'].patchValue(attachedObject.CloudFilePath);
        this.assessmentForm.controls['documentName'].patchValue('');
        this.assessmentForm.controls['documentContents'].patchValue('');
        this.generalAttachmentName = attachedObject.CloudFilePath;
      } else {
        this.assessmentForm.controls['documentName'].patchValue(attachedObject.attachFileName);
        this.assessmentForm.controls['documentContents'].patchValue(attachedObject.attachFileContent);
        this.assessmentForm.controls['CloudFilePath'].patchValue('');
        this.generalAttachmentName = attachedObject.attachFileName;
      }
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 27-01-2020
   * Description : Open email-confiramtion modal popup.
   */
  public openMailConfiramtionModal(content: string): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(MailContentComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.componentOverlayRef.instance.data = {
      dynamicContent: content,
      isShowDropDown: true
    };

    this.componentOverlayRef.instance.submit.subscribe((submitType) => {
      if (TeamMemberAssessment.SendAndNotShare === parseInt(submitType)) {
        this.loaderService.emitIsLoaderShown(true);
        this.overlayRef.dispose();
        //this.redirectToTruvelopScore();
        this.openSurveyConfirmaion();
      } else if (TeamMemberAssessment.SendAndShare === parseInt(submitType)) {
        this.sendMail();
      } else if (TeamMemberAssessment.SaveAsDraft === parseInt(submitType)) {
        this.assessmentRequestBody.sendTrigger = TeamMemberAssessment.SaveAsDraft;
        this.saveAsDraftEvaluation();
      }
    });
    // this.componentOverlayRef.instance.sendMail.subscribe(isSendMail => {
    //   this.sendMail();
    // });
    // this.componentOverlayRef.instance.cancel.subscribe(isCancel => {
    //   this.loaderService.emitIsLoaderShown(true);
    //   this.overlayRef.dispose();
    //   //this.redirectToTruvelopScore();
    //   this.openSurveyConfirmaion();
    // });
  }

  private saveAsDraftEvaluation(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.assessmentService.saveAsDraftEvaluation(this.assessmentId, this.assessmentRequestBody).subscribe((response) => {
      if (this.globalResponseHandlerService.getApiResponse(response, true)) {
        this.overlayRef.dispose();
        this.goToDashboard();
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 27-01-2020
   * Description : Call send-email api for assessment.
   */
  public sendMail() {
    this.loaderService.emitIsLoaderShown(true);
    this.commonService.sendMail(this.sendMailObject).subscribe(
      (sendMail) => {
        if (this.globalResponseHandlerService.getApiResponse(sendMail, true, false)) {
          this.overlayRef.dispose();
          //this.redirectToTruvelopScore();
          this.openSurveyConfirmaion();
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 27-01-2020
   * Description : Created method for redirected to Trigger-score page.
   */
  public openSurveyConfirmaion(): void {
    if (this.isSurveyActive) {
      if (!this.isSurveyMandatory) {
        let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
        const dialogRef = this.matDialog.open(SurveyConfirmationComponent, {
          panelClass: modalBackground,
          data: SurveyConfirmation
        });
        dialogRef.componentInstance.confirm.subscribe((isConfirm) => {
          if (isConfirm) {
            this.loaderService.emitIsLoaderShown(true);
            this.getAcivatedSurvey();
          } else {
            this.redirectToTruvelopScore();
          }
        });
      } else {
        this.getAcivatedSurvey();
      }
    } else {
      this.redirectToTruvelopScore();
    }
  }

  private getAcivatedSurvey(): void {
    this.assessmentService.getAcivatedSurvey().subscribe(
      (surveyResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(surveyResponse, false, true)) {
          this.loaderService.emitIsLoaderShown(false);
          let surveyFormResponse = this.assessmentAdapter.toResponse(surveyResponse);
          this.openSurveyForm(surveyFormResponse.data);
        }
      });
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 27-01-2020
   * Description : Created method for redirected to Trigger-score page.
   */
  public openSurveyForm(survey): void {
    let object: OverlayRefModel = this.openOverlayService.openSurveyForm(SurveyFormComponent)
    // let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    // let config = new OverlayConfig({
    //   panelClass: [PopupPanelClass.extraLargeContainer, modalBackground],
    //   // panelClass: PopupPanelClass.extraLargeContainer,
    //   hasBackdrop: true,
    //   backdropClass: '',
    //   positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    // });

    // this.overlayRef = this.overlay.create(config);
    // this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(SurveyFormComponent));
    // this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.overlayRef = object.overLay;
    this.componentOverlayRef = object.component;
    this.componentOverlayRef.instance.surveyForm = survey;
    this.componentOverlayRef.instance.isDisabledCancelButton = this.isSurveyMandatory;
    this.componentOverlayRef.instance.cancel.subscribe(status => {
      this.matDialog.closeAll();
      this.overlayRef.dispose();
      this.redirectToTruvelopScore();
    });
    this.componentOverlayRef.instance.onSubmitSurvey.subscribe(addSurvey => {
      this.addSurvey(addSurvey);
    });
  }

  private addSurvey(addSurey: AddSurveyForm): void {
    this.commonService.submitSurveyForm(addSurey).subscribe(
      (surveyResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(surveyResponse, true, true)) {
          this.matDialog.closeAll();
          this.overlayRef.dispose();
          this.redirectToTruvelopScore();
        }
      });
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 27-01-2020
   * Description : Created method for redirected to Trigger-score page.
   */
  public redirectToTruvelopScore(): void {
    this.triggerScore.gradeClass = this.getClassByGrade(this.triggerScore.empScoreRank);
    this.triggerScore.isDisabledBtnEmployeeDhashboard = !this.isDisplayEmployeeDassborad;
    this.triggerScore.isDisabledBtnTruvelopDashboard = !this.globalResponseHandlerService.getUserData().isManagerAccess;
    this.globalResponseHandlerService.encriptData(JSON.stringify(this.triggerScore), Encryption.TriggerScoreMessage, Encryption.TriggerScoreKey);
    this.urlEncryptionDecryptionService.urlEncryption(this.triggerScore.empId.toString(), Route.TriggerScore);
  }

  private getSendTrigger(teamMemberEvulation): number {
    if (teamMemberEvulation === TeamMemberAssessment.SendAndNotShare || teamMemberEvulation === TeamMemberAssessment.SendAndShare) {
      return TeamMemberAssessment.SendAndNotShare
    } else if (teamMemberEvulation === TeamMemberAssessment.SaveAsDraft) {
      return TeamMemberAssessment.SaveAsDraft;
    }
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date :  15-03-2022
   * Description : TO-DO when employee dashboard created then paste url for navigation:
   **/
  private goToDashboard(empId?: number): void {
    if (this.globalResponseHandlerService.getUserData().isManagerAccess) {
      let dashboardButtonsStatus = {
        isManagerDashboard: true,
        isTeamDashoard: false,
        isMyDashboard: false,
        isMyWall: false
      }
      sessionStorage.setItem(DashboardStatus, JSON.stringify(dashboardButtonsStatus))
      this.globalEventsManager.changeDashboard(ManagerDashboard);
    } else {
      let dashboardButtonsStatus = {
        isManagerDashboard: false,
        isTeamDashoard: false,
        isMyDashboard: true,
        isMyWall: false
      }
      sessionStorage.setItem(DashboardStatus, JSON.stringify(dashboardButtonsStatus))
      this.globalEventsManager.changeDashboard(MyDashboard);
    }
    this.router.navigate([Route.Dashboard]);
  }

  ngOnDestroy(): void {
    sessionStorage.setItem(Encryption.RequestId, '0');
    this.themeEmitter.unsubscribe();
  }
}
