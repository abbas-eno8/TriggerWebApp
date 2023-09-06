/**
@author : Sonal Patil
@class : AssessmentComponent
@description :AssessmentComponent is created for unit test cases.
**/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentComponent } from './assessment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';
import { AssessmentService } from './assessment.service';
import { ToasterService } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { mockUserData } from '../core/mock-data/mock-userdata';
import { UrlEncryptionDecryptionService } from '../core/url-encryption-decryption/url-encryption-decryption.service';
import { EmployeeService } from '../core/services/employee-service/employee.service';
import { MatDialog } from '@angular/material';
import { AuthService } from '../core/auth/auth.service';
import { CustomValidation } from '../shared/Validation/custom.validation';
import { FormBuilder } from '@angular/forms';
import { ActionPermissionService } from '../core/services/action-permission/action-permission.service';
import { Overlay } from '@angular/cdk/overlay';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { GlobalEventsManager } from '../core/navbar/globalEventsManager';
import { CommonService } from '../core/services/common/common.service';
import { of } from 'rxjs';
import { LoaderService } from '../core/loader/loader.service';
describe('AssessmentComponent', () => {
  let component: AssessmentComponent;
  let fixture: ComponentFixture<AssessmentComponent>;
  let mockGlobalResponseHandlerService,
    mockUrlEncryptionDecryptionService,
    mockassessmentService,
    mocktoaster,
    mockemployeeService,
    mockdatePipe,
    mockActivatedRoute,
    mockelRef,
    mockglobalDataService,
    matDialog,
    mockAuthService,
    mockCustomValidation,
    mockFormBuilder,
    mockActionPermissionService,
    mockOverlay,
    mockFocusTrapFactory,
    globalEventsManager,
    mockCommonService,
    loaderService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    mockActivatedRoute = {
      snapshot: { queryParams: { 'id': '0' } }
    };
    mockdatePipe = jasmine.createSpyObj([DatePipe.prototype, 'transform']);
    mockUrlEncryptionDecryptionService = jasmine.createSpyObj(['urlDecryption', 'urlEncryption']);
    mockGlobalResponseHandlerService = jasmine.createSpyObj(['getUserData', 'displayLoader', 'getApiResponse', 'encriptData']);
    mockemployeeService = jasmine.createSpyObj(['getAllEmployees']);
    mockassessmentService = jasmine.createSpyObj(['getAllQuestions', 'employeeAssessment']);
    mocktoaster = jasmine.createSpyObj(['pop']);
    mockActionPermissionService = jasmine.createSpyObj(['isViewEmployeeDashboard']);
    globalEventsManager = jasmine.createSpyObj(['getNotification', 'closeCdkModalPopup']);
    loaderService = jasmine.createSpyObj(['emitIsLoaderShown']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AssessmentComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService },
        { provide: UrlEncryptionDecryptionService, useValue: mockUrlEncryptionDecryptionService },
        { provide: AssessmentService, useValue: mockassessmentService },
        { provide: ToasterService, useValue: mocktoaster },
        { provide: EmployeeService, useValue: mockemployeeService },
        { provide: DatePipe, useValue: mockdatePipe },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ElementRef, useValue: mockelRef },
        { provide: GlobalEventsManager, useValue: globalEventsManager },
        { provide: MatDialog, useValue: matDialog },
        { provide: AuthService, useValue: mockAuthService },
        { provide: CustomValidation, useValue: mockCustomValidation },
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: ActionPermissionService, useValue: mockActionPermissionService  },
        { provide: Overlay, useValue: mockOverlay  },
        { provide: FocusTrapFactory, useValue: mockFocusTrapFactory  },
        { provide: CommonService, useValue: mockCommonService  },
        { provide: LoaderService, useValue: loaderService  },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AssessmentComponent);
    globalEventsManager.getNotification.and.returnValue(of(true));
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should be create ngOnInit()', () => {
      expect(component.ngOnInit).toBeTruthy();
    });

    it('should be check ngOnInit() work properly', () => {
      component.userData = mockUserData;
      //spyOn(component, 'setInitialData');
      //spyOn(component, 'checkEmployee');
      spyOn(component, 'setCurrentDate');
      spyOn(component, 'getUserData');
      spyOn(component, 'getAllEmployeeList');
      component.ngOnInit();
      //expect(component.setInitialData).toHaveBeenCalled();
      //expect(component.checkEmployee).toHaveBeenCalled();
      expect(component.setCurrentDate).toHaveBeenCalled();
      expect(component.getUserData).toHaveBeenCalled();
      expect(component.getAllEmployeeList).toHaveBeenCalledWith(component.userData.clientId, component.userData.loginEmpId);
    });
  });

  describe('checkEmployee', () => {

    it('should be create checkEmployee()', () => {
      expect(component.checkEmployee).toBeTruthy();
    });

    it('should be check checkEmployee() work properly', () => {
      // mockUrlEncryptionDecryptionService.urlDecryption.and.returnValue('0');
      // component.checkEmployee();
      // expect(mockUrlEncryptionDecryptionService.urlDecryption).toHaveBeenCalledWith(component.employeeId);
      // expect(component.employeeId).toBe('0');
      // expect(component.selectedValue).toBe('');
      // expect(component.isDisabled).not.toBe(1);
      // spyOn(component, 'getCurrenSelectedUser');
      // expect(component.setCurrentDate).toHaveBeenCalledWith(2);
      // spyOn<any>(component, 'isAllowToDisplayEmployeeDashboard').and.returnValue(Observable.of([]));
    });
  });

  // describe('callGetUserData', () => {

  //   it('should be create callGetUserData()', () => {
  //     expect(component.callGetUserData).toBeTruthy();
  //   });

  //   it('should be check callGetUserData() work properly', () => {
  //     mockGlobalResponseHandlerService.getUserData.and.returnValue(mockUserData);
  //     component.callGetUserData();
  //     expect(component.userData).toBe(mockUserData);
  //     expect(parseInt(component.userId)).toBe(mockUserData.userId);
  //   });
  // });

  // describe('openModal', () => {

  //   it('should be create openModal()', () => {
  //     expect(component.openModal).toBeTruthy();
  //   });

  //   it('should be check openModal() work properly when call with Performance as parameter', () => {
  //     component.openModal(AssessmentModel.TooltipHeaderPerformance);
  //     expect(component.tooltipDescription).toBe(AssessmentModel.TooltipDescriptionPerformance);
  //   });
  //   it('should be check openModal() work properly when call with Maintenance as parameter', () => {
  //     component.openModal(AssessmentModel.TooltipHeaderMaintenance);
  //     expect(component.tooltipDescription).toBe(AssessmentModel.TooltipDescriptionMaintenance);
  //   });
  //   it('should be check openModal() work properly when call with Trigger Employee: as parameter', () => {
  //     component.openModal(AssessmentModel.TooltipHeaderTriggerEmployee);
  //     expect(component.tooltipHeader).toBe(AssessmentModel.TooltipHeaderTriggerEmployee);
  //     expect(component.tooltipDescription).toBe(AssessmentModel.TooltipDescriptionTriggerEmployee);
  //   });

  // });

  describe('setCurrentDate', () => {

    it('should be create setCurrentDate()', () => {
      expect(component.setCurrentDate).toBeTruthy();
    });

    it('should be check setCurrentDate() work properly', () => {
      // mockdatePipe.transform.and.returnValue('10-11-2019 13:05:47');
      // let mockDate = new Date();
      // component.setCurrentDate();
      // expect(component.currentDate).toEqual(mockDate);
      // expect(component.date).toBe('10-11-2019 13:05:47');
      //expect(component.showTextarea).toBe(false);
    });

  });

  describe('showHideTextArea', () => {

    it('should be create showHideTextArea()', () => {
      expect(component.showHideTextArea).toBeTruthy();
    });

    // it('should be check setCurrentDate() work properly when call with true', () => {
    //   component.showHideTextArea('true');
    //   expect(component.showTextarea).toBe(true);
    // });

    // it('should be check setCurrentDate() work properly when call with false', () => {
    //   component.showHideTextArea('false');
    //   expect(component.showTextarea).toBe(false);
    // });

  });

  describe('getAllEmployeeList', () => {

    it('should be create getAllEmployeeList()', () => {
      expect(component.getAllEmployeeList).toBeTruthy();
    });

    // it('should be check getAllEmployeeList method work properly', () => {
    //   spyOn(component, 'getAllQuestionListAtOnInit');
    //   mockGlobalResponseHandlerService.displayLoader.and.returnValue(true);
    //   mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
    //   mockemployeeService.getAllEmployees.and.returnValue(of(EMPLOYEES));
    //   let filterData: any = _.sortBy(EMPLOYEES.data, 'firstName');
    //   component.userData = mockUserData;
    //   component.getAllEmployeeList(1, 1);
    //   expect(component.employeeList).toEqual(filterData);
    //   expect(component.getAllQuestionListAtOnInit).toHaveBeenCalled();
    // });
  });

  describe('getAllQuestionListAtOnInit', () => {

    it('should be create getAllQuestionListAtOnInit()', () => {
      expect(component.getAllQuestionListAtOnInit).toBeTruthy();
    });

    // it('should be check getAllEmployeeList method work properly and return questions data', () => {
    //   mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
    //   mockassessmentService.getAllQuestions.and.returnValue(of(QUESTIONS));
    //   component.getAllQuestionListAtOnInit();
    //   expect(component.questionAnswerResponse).toBe(QUESTIONS.data);
    //   spyOn(component, 'bindCategories')
    //   expect(component.bindCategories).toHaveBeenCalledWith(QUESTIONS.data);
    // });
  });

  // describe('getSelectedAnswer', () => {

  //   it('should be create getSelectedAnswer()', () => {
  //     expect(component.getSelectedAnswer).toBeTruthy();
  //   });

  //   it('should be check getAllEmployeeList method work properly for 1st question', () => {
  //     let answerData = QUESTIONS.data[0].lstQuestionneries[0].answers;
  //     component.getSelectedAnswer(answerData);
  //     expect(component.finalArray.length).toBe(1);
  //   })
  //   it('should be check getAllEmployeeList method work properlyb for other questions', () => {
  //     component.finalArray.push(Object.assign({}, QUESTIONS.data[0].lstQuestionneries[0].answers));
  //     let answerData = QUESTIONS.data[0].lstQuestionneries[1].answers;
  //     component.getSelectedAnswer(answerData);
  //     expect(component.finalArray.length).toBe(1);
  //   })

  // });

  // describe('assesmentObject', () => {

  //   it('should be create assesmentObject()', () => {
  //     expect(component.assesmentObject).toBeTruthy();
  //   });

  // });

  describe('checkValidation', () => {

    it('should be create checkValidation()', () => {
      expect(component.checkValidation).toBeTruthy();
    });

  });

  describe('assesmentEmployee', () => {

    it('should be create assesmentEmployee()', () => {
      expect(component.assesmentEmployee).toBeTruthy();
    });

    // it('should be check assesmentEmployee method work properly', () => {
    //   mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
    //   mockGlobalResponseHandlerService.displayLoader.and.returnValue(true);
    //   mockassessmentService.employeeAssessment.and.returnValue(of(ASSESSMENT));
    //   //spyOn(component, 'assesmentObject');
    //   //spyOn(component, 'checkValidation').and.returnValue(true);
    //   //spyOn(component, 'setInitialData');
    //   //component.assesmentEmployee(1, 'questionComment', 'lastComment');
    //   //expect(component.assesmentObject).toHaveBeenCalledWith(1, 'questionComment', 'lastComment');
    //   expect(component.checkValidation).toHaveBeenCalledWith(1);
    //   //expect(component.assesmentObject).toHaveBeenCalled();
    //   expect(mockUrlEncryptionDecryptionService.urlEncryption).toHaveBeenCalledWith(ASSESSMENT.data[0].empId + ASSESSMENT.data[0].assessmentById, Route.TriggerScore)
    //   expect(mockGlobalResponseHandlerService.encriptData).toHaveBeenCalledWith(JSON.stringify(ASSESSMENT.data[0]), 'trigger-triggerScore', 'triggerScore')

    // });

  });

  describe('changeEmployee', () => {

    it('should be create changeEmployee()', () => {
      expect(component.changeEmployee).toBeTruthy();
    });
    // it('should be check changeEmployee() method work properly if assessment not done today', () => {
    //   //spyOn(component, 'setInitialData');
    //   spyOn(component, 'getAllQuestionListAtOnInit');
    //   component.employeeList = EMPLOYEES.data;
    //   mockdatePipe.transform.and.returnValue('02-08-2019');
    //   component.changeEmployee('1');
    //   expect(component.isDisabled).toBe(1);
    //   //expect(component.setInitialData).toHaveBeenCalled();
    //   expect(component.getAllQuestionListAtOnInit).toHaveBeenCalled();
    // });

    // it('should be check changeEmployee() method work properly if assessment done today', () => {
    //   //spyOn(component, 'setInitialData');
    //   spyOn(component, 'getAllQuestionListAtOnInit');
    //   component.employeeList = EMPLOYEES.data;
    //   mockdatePipe.transform.and.returnValue('02-08-2019');
    //   component.changeEmployee('2');
    //   expect(component.isDisabled).toBe(0);
    //   //expect(component.setInitialData).not.toHaveBeenCalled();
    //   expect(component.getAllQuestionListAtOnInit).not.toHaveBeenCalled();
    //   expect(mocktoaster.pop).toHaveBeenCalledWith(Error_Type, Error_Title, AssessmentAlreadyDone);
    // });

  });

  // describe('setInitialData', () => {

  //   it('should be create setInitialData()', () => {
  //     expect(component.setInitialData).toBeTruthy();
  //   });

  //   it('should be check changeEmployee() method work properly ', () => {
  //     component.setInitialData();
  //     expect(component.isLikeKpi).toBe(0);
  //     expect(component.isGeneralLike).toBe(0);
  //     expect(component.isMailSent).toBe(0);
  //     expect(component.isMailSentKPI).toBe(0);
  //     expect(component.isMailSentGeneral).toBe(0);
  //     expect(component.isDisabled).toBe(0);
  //     expect(component.finalArray.length).toBe(0);
  //   });

  // });

  // describe('getKpiStatus', () => {

  //   it('should be create getKpiStatus()', () => {
  //     expect(component.getKpiStatus).toBeTruthy();
  //   });

  //   it('should be check getKpiStatus() method work properly if status is 0 or 2 ', () => {
  //     component.isLikeKpi = 0;
  //     component.getKpiStatus(1);
  //     expect(component.isLikeKpi).toBe(1);
  //   });

  //   it('should be check getKpiStatus() method work properly if status is 1 or 0 ', () => {
  //     component.isLikeKpi = 0;
  //     component.getKpiStatus(2);
  //     expect(component.isLikeKpi).toBe(2);
  //   });

  //   it('should be check getKpiStatus() method work properly if status is not 0 , 1 or 2 ', () => {
  //     component.getKpiStatus(3);
  //     expect(component.isLikeKpi).toBe(0);
  //   });

  // });

  // describe('getGeneralStatus', () => {

  //   it('should be create getGeneralStatus()', () => {
  //     expect(component.getGeneralStatus).toBeTruthy();
  //   });

  //   it('should be check getGeneralStatus() method work properly if status is 0 or 2 ', () => {
  //     component.isGeneralLike = 0;
  //     component.getGeneralStatus(1);
  //     expect(component.isGeneralLike).toBe(1);
  //   });

  //   it('should be check getGeneralStatus() method work properly if status is 1 or 0 ', () => {
  //     component.isGeneralLike = 0;
  //     component.getGeneralStatus(2);
  //     expect(component.isGeneralLike).toBe(2);
  //   });

  //   it('should be check getGeneralStatus() method work properly if status is not 0 , 1 or 2 ', () => {
  //     component.getGeneralStatus(3);
  //     expect(component.isGeneralLike).toBe(0);
  //   });

  // });

  // describe('kpiMailSent', () => {

  //   it('should be create kpiMailSent()', () => {
  //     expect(component.kpiMailSent).toBeTruthy();
  //   });

  //   it('should be check kpiMailSent() method work properly  ', () => {
  //     component.kpiMailSent();
  //     expect(component.isMailSent).toBe(1);
  //     expect(component.isMailSentKPI).toBe(1);
  //   });

  // });

  // describe('generalMailSent', () => {

  //   it('should be create generalMailSent()', () => {
  //     expect(component.generalMailSent).toBeTruthy();
  //   });

  //   it('should be check generalMailSent() method work properly if isMailSent satus 0 ', () => {
  //     component.isMailSent = 0;
  //     component.generalMailSent();
  //     expect(component.isMailSent).toBe(2);
  //     expect(component.isMailSentGeneral).toBe(2);
  //   });

  //   it('should be check generalMailSent() method work properly if isMailSent satus not 0 ', () => {
  //     component.isMailSent = 1;
  //     component.generalMailSent();
  //     expect(component.isMailSent).toBe(3);
  //     expect(component.isMailSentGeneral).toBe(3);
  //   });

  // });
});
