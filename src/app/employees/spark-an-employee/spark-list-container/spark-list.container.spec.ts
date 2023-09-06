import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SparkListContainer } from './spark-list.container';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonService } from '../../../core/services/common/common.service';
import { SparkAnEmployeeService } from '../spark-an-employee-service/spark-an-employee.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
import { LoaderService } from '../../../core/loader/loader.service';
import { SparkListPresenter } from './spark-list-presenter/spark-list-presenter';
import { MatDialog } from '@angular/material';
import { SparkAnEmployeeAdapter } from '../spark-an-employee-adapter/spark-an-employee-adapter';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SparkListContainer', () => {
  let component: SparkListContainer;
  let fixture: ComponentFixture<SparkListContainer>;
  let commonService, loaderService, globalEventsManager, globalResponseHandlerService, urlEncryptionDecryptionService, matDialog, sparkAnEmployeeService, sparkListPresenter, sparkAnEmployeeAdapter;
  beforeEach(async(() => {
    loaderService = jasmine.createSpyObj(['emitIsLoaderShown']);
    globalEventsManager = jasmine.createSpyObj(['getNotification']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SparkListContainer],
      providers: [
        { provide: CommonService, useValue: commonService },
        { provide: SparkAnEmployeeService, useValue: sparkAnEmployeeService },
        { provide: GlobalResponseHandlerService, useValue: globalResponseHandlerService },
        { provide: GlobalEventsManager, useValue: globalEventsManager },
        { provide: LoaderService, useValue: loaderService },
        { provide: MatDialog, useValue: matDialog },
        { provide: SparkListPresenter, useValue: sparkListPresenter },
        { provide: SparkAnEmployeeAdapter, useValue: sparkAnEmployeeAdapter },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    loaderService.emitIsLoaderShown.and.returnValue(true);
    globalEventsManager.getNotification.and.returnValue(true);
    fixture = TestBed.createComponent(SparkListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // describe('ngOnInit', () => {

  //   it('should be create ngOnInit()', () => {
  //     expect(component.ngOnInit).toBeTruthy();
  //   });

  //   it('should be check ngOnInit() work properly', () => {
  //     spyOn<any>(component, 'getSparkPermission').and.returnValue(Observable.of([]));
  //     component.ngOnInit();
  //   });
  // });
});
