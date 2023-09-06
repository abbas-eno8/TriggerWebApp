/**
@author : Sonal Patil
@class : AssessmentScoreComponent
@description :AssessmentScoreComponent is created for unit test cases.
**/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentScoreComponent } from './assessment-score.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { Route } from '../../core/magic-string/common.model';
import { Encryption } from '../../core/magic-string/common-validation-model';
import { Overlay } from '@angular/cdk/overlay';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayPositionBuilder } from '@angular/cdk/overlay';
import { LoaderService } from '../../core/loader/loader.service';

describe('AssessmentScoreComponent', () => {
  let component: AssessmentScoreComponent;
  let fixture: ComponentFixture<AssessmentScoreComponent>;
  let mockUrlEncryptionDecryptionService, mockGlobalResponseHandlerService;
  let mockTriggerData, mockTriggerScore, mockOverlay, mockFocusTrapFactory, mockLoaderService; // mockElementRef, mockOverlayPositionBuilder
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {
    mockTriggerData = {
      "empId": 26008,
      "companyId": 134,
      "empName": "A E",
      "empScore": 11,
      "empScoreRank": "C-",
      "ratingDate": "2019-02-08T11:12:05",
      "assessmentPeriod": "Quarterly",
      "assessmentById": 3309,
      "assessmentBy": "Sonal Patil",
      "generalScoreRank": "C-Player",
      "scoreRemarks": "This is an average member (or less than average member) of your organization who fills a role but gives you no competitive advantage. They are merely filling a role until you can either help them improve to a B or A player or find a B or A player to replace them. This employee needs improvement and should be placed on a performance improvement plan to educate them on performance and behavioral expectations.",
      "managerAction": "Educate.",
      "scoreSummary": "Average Talent."
    }
    mockTriggerScore = {
      'assessmentBy': "Manager One",
      'assessmentById': 120,
      'assessmentPeriod': null,
      'companyId': 3,
      'empId': 1033,
      'empName': "Dev One",
      'empScore': 18,
      'empScoreRank': "C",
      'generalScoreRank': "C-Player",
      'isDisabledBtnEmployeeDhashboard': false,
      'managerAction': "Educate.",
      'ratingDate': "2019-08-07T11:55:50",
      'scoreRemarks': "This is an average member (or less than average member) of your organization who fills a role but gives you no competitive advantage. They are merely filling a role until you can either help them improve to a B or A player or find a B or A player to replace them. This employee needs improvement and should be placed on a performance improvement plan to educate them on performance and behavioral expectations.",
      'scoreSummary': "Average Talent."
    }
    mockUrlEncryptionDecryptionService = jasmine.createSpyObj(['urlEncryption']);
    mockGlobalResponseHandlerService = jasmine.createSpyObj(['encriptData', 'getCurrentTriggerScore']);
    mockLoaderService = jasmine.createSpyObj(['emitIsLoaderShown']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [AssessmentScoreComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService },
        { provide: UrlEncryptionDecryptionService, useValue: mockUrlEncryptionDecryptionService },
        { provide: Overlay, useValue: mockOverlay },
        { provide: FocusTrapFactory, useValue: mockFocusTrapFactory },
        { provide: LoaderService, useValue: mockLoaderService },
        // { provide: OverlayPositionBuilder, useValue: mockOverlayPositionBuilder },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AssessmentScoreComponent);
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
      // mockGlobalResponseHandlerService.getCurrentTriggerScore.and.returnValue(mockTriggerScore);
      // component.ngOnInit();
      // expect(component.trggerScore).toBe(mockTriggerScore);
      // spyOn(component, 'getSessionData');
      //component.ngOnInit();
      // expect(component.getSessionData).toHaveBeenCalled();

      mockGlobalResponseHandlerService.getCurrentTriggerScore.and.returnValue(mockTriggerData);
      component.ngOnInit();
      expect(component.trggerScore).toBe(mockTriggerData);
    });
  });

  describe('goToAssessmentPage', () => {

    it('should be create goToAssessmentPage()', () => {
      expect(component.goToAssessmentPage).toBeTruthy();
    });

    // it('should be check goToAssessmentPage() work properly', () => {
    //   spyOn(component, 'redirectToPage');
    //   component.goToAssessmentPage();
    //   expect(component.redirectToPage).toHaveBeenCalledWith(0, Route.TriggerEmployee);
    // });
  });

  describe('goToMainDashboard', () => {

    it('should be create goToMainDashboard()', () => {
      expect(component.goToMainDashboard).toBeTruthy();
    });

    // it('should be check goToMainDashboard() work properly', () => {
    //   component.goToMainDashboard();
    //   expect(router.navigate).toHaveBeenCalledWith([Route.Dashboard]);
    // });
  });

  describe('goToEmployeeDashboard', () => {

    it('should be create goToEmployeeDashboard()', () => {
      expect(component.goToEmployeeDashboard).toBeTruthy();
    });

    it('should be check goToEmployeeDashboard() work properly', () => {
      // spyOn(component, 'redirectToPage');
      // component.goToEmployeeDashboard();
      // //component.trggerScore.empId = 1;
      // expect(component.redirectToPage).toHaveBeenCalledWith(0, Route.IndividualEmployee);

      // spyOn(component, 'redirectToPage');
      // component.goToAssessmentPage();
      // expect(component.redirectToPage).toHaveBeenCalledWith(0, Route.TriggerEmployee);
    });
  });

  describe('redirectToPage', () => {

    it('should be create redirectToPage()', () => {
      expect(component.redirectToPage).toBeTruthy();
    });

    it('should be check redirectToPage() work properly', () => {
      let id = 1, route = Route.Dashboard;
      component.redirectToPage(id, route);
      expect(mockGlobalResponseHandlerService.encriptData).toHaveBeenCalledWith('', Encryption.TriggerScoreMessage, Encryption.TriggerScoreKey);
      expect(mockUrlEncryptionDecryptionService.urlEncryption).toHaveBeenCalledWith(id.toString(), route);
    });
  });

  // describe('getSessionData', () => {

  //   it('should create getSessionData', () => {
  //     expect(component.getSessionData).toBeTruthy();
  //   });

  //   it('should be check getSessionData method work properly & return trigger score data', () => {
  //     mockGlobalResponseHandlerService.triggerScore.and.returnValue(mockTriggerData);
  //     component.getSessionData();
  //     expect(component.scoreData).toBe(mockTriggerData);
  //   });
  // });
});
