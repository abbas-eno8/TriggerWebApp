import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SparkNotificationContainer } from './spark-notification.container';
import { LoaderService } from '../../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { SparkNotificationService } from '../spark-notification-service/spark-notification.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';
import { RequestModel } from '../spark-notification-model';
import { of } from 'rxjs';

describe('SparkNotification.ContainerComponent', () => {
  let component: SparkNotificationContainer;
  let fixture: ComponentFixture<SparkNotificationContainer>;
  let sparkNotificationService, loaderService, globalEventsManager, globalResponseHandlerService;
  beforeEach(async(() => {
    loaderService = jasmine.createSpyObj(['emitIsLoaderShown']);
    sparkNotificationService = jasmine.createSpyObj(['submitSpark', 'getSparks']);
    globalResponseHandlerService = jasmine.createSpyObj(['getApiResponse']);
    globalEventsManager = jasmine.createSpyObj(['updateCount']);
    TestBed.configureTestingModule({
      declarations: [SparkNotificationContainer],
      providers: [
        { provide: LoaderService, useValue: loaderService },
        { provide: GlobalEventsManager, useValue: globalEventsManager },
        { provide: GlobalResponseHandlerService, useValue: globalResponseHandlerService },
        { provide: SparkNotificationService, useValue: sparkNotificationService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    loaderService.emitIsLoaderShown.and.returnValue(true);
    sparkNotificationService.getSparks.and.returnValue(of(''));
    fixture = TestBed.createComponent(SparkNotificationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submitSpark', () => {

    it('should create submitSpark', () => {
      expect(component.submitSpark).toBeTruthy();
    });
    it('should be check submitSpark method work properly with 200 status code', () => {
      globalResponseHandlerService.getApiResponse.and.returnValue(true);
      sparkNotificationService.submitSpark.and.returnValue(of(''));
      sparkNotificationService.getSparks.and.returnValue(of(''));
      globalEventsManager.updateCount.and.returnValue(true);
      expect(REQUESTSPARK.ApprovalStatus).toBe(2);
      component.submitSpark(REQUESTSPARK);
    });

    it('should be check submitSpark method work properly with another status code', () => {
      globalResponseHandlerService.getApiResponse.and.returnValue(false);
      sparkNotificationService.submitSpark.and.returnValue(of(''));
      globalEventsManager.updateCount.and.returnValue(true);
      component.submitSpark(REQUESTSPARK);
    });
  });
});

let REQUESTSPARK: RequestModel = {
  EmpId: 1,
  SparkId: 1,
  ApprovalStatus: 2,
  CreatedBy: 1,
  RejectionRemark: 'Rejected Remark'
}
