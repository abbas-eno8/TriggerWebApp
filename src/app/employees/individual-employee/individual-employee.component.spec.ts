import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualEmployeeComponent } from './individual-employee.component';
import { EmployeeService } from '../../core/services/employee-service/employee.service';
import { LoaderService } from '../../core/loader/loader.service';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';
import { SearchPipePipe } from '../../shared/pipes/search-pipe.pipe';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { ActionPermissionService } from '../../core/services/action-permission/action-permission.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EmployeeAdapter } from '../employee-adapter/employee-adapter';
import { ChangeDetectorRef, ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';

describe('IndividualEmployeeComponent', () => {
  let component: IndividualEmployeeComponent;
  let fixture: ComponentFixture<IndividualEmployeeComponent>;
  let employeeService, loaderService, toasterService, activatedRoute, searchPipe, globalResponseHandlerService, urlEncryptionDecryptionService, actionPermissionService, breakpointObserver, componentFactoryResolver, changeDetectorRef, employeeAdapter;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualEmployeeComponent],
      providers: [
        { provide: EmployeeService, useValue: employeeService },
        { provide: LoaderService, useValue: loaderService },
        { provide: ToasterService, useValue: toasterService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: SearchPipePipe, useValue: searchPipe },
        { provide: GlobalResponseHandlerService, useValue: globalResponseHandlerService },
        { provide: UrlEncryptionDecryptionService, useValue: urlEncryptionDecryptionService },
        { provide: ActionPermissionService, useValue: actionPermissionService },
        { provide: BreakpointObserver, useValue: breakpointObserver },
        { provide: ComponentFactoryResolver, useValue: componentFactoryResolver },
        { provide: ChangeDetectorRef, useValue: changeDetectorRef },
        { provide: EmployeeAdapter, useValue: employeeAdapter },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualEmployeeComponent);
    component = fixture.componentInstance;
    //component['createComponentBasedonWindoResize']();
    fixture.detectChanges();
  });

  // describe('createComponentBasedonWindoResize', () => {

  //   it('should be create createComponentBasedonWindoResize()', () => {
  //     spyOn<any>(component, 'createComponentBasedonWindoResize').and.returnValue(Observable.of([]));
  //   });
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

});
