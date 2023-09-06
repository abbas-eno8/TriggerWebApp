import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListComponent } from './client-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { MatDialog } from '@angular/material';
import { CLIENTS } from '../../core/mock-data/mock-clients';
import * as _ from 'underscore';
import { Route } from '../../core/magic-string/common.model';
import { DeletePopupComponent } from '../../shared/modal-popup/delete-popup/delete-popup.component';
import { ScrollService } from '../../core/services/scroll.service';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  let mockGlobalResponseHandlerService, mockMatDialog, scrollService;
  beforeEach(async(() => {
    mockGlobalResponseHandlerService = jasmine.createSpyObj(['setPartialClientResponse']);
    mockMatDialog = jasmine.createSpyObj(['open']);
    scrollService = jasmine.createSpyObj(['onScroll']);
    TestBed.configureTestingModule({
      declarations: [ClientListComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ScrollService, useValue: scrollService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // describe('ngOnInit', () => {

  //   it('should be create ngOnInit()', () => {
  //     expect(component.ngOnInit).toBeTruthy();
  //   });
  // });

  // describe("should test output emitter with subscriber", () => {

  //   it('should test the goToEditClient emitter with a simple subscribe', async(() => {
  //     component.goToEditClient.subscribe(event => {
  //       expect(event)
  //     });
  //   }));

  //   it('should test the deleteClientEvent emitter with a simple subscribe', async(() => {
  //     component.deleteClientEvent.subscribe(event => {
  //       expect(event)
  //     });
  //   }));
  // })

  // describe('sort', () => {

  //   it('should create sort', () => {
  //     expect(component.sort).toBeTruthy();
  //   });
  //   it('should be check sort method work properly for ascending order', () => {
  //     component.clients = CLIENTS.data;
  //     component.direction = 0;
  //     let clients: any = _.sortBy(component.clients, 'companyName');
  //     component.sort('companyName');
  //     expect(component.clients.length).toEqual(clients.length);
  //   });

  //   it('should be check sort method work properly for descending order', () => {
  //     component.clients = CLIENTS.data;
  //     component.direction = 1;
  //     let clients: any = _.sortBy(component.clients, 'companyName');
  //     clients = clients.reverse();
  //     component.sort('companyName');
  //     expect(component.clients.length).toEqual(clients.length);
  //   });
  // });

  // describe("redirectToAddClient()", () => {
  //   it('should be create redirecToEditClient()', () => {
  //     expect(component.redirecToEditClient).toBeTruthy();
  //   });

  //   it('should be check redirecToEditClient() work properly', async(() => {
  //     spyOn(component.goToEditClient, 'emit');
  //     component.redirecToEditClient(1);
  //     expect(component.goToEditClient.emit).toHaveBeenCalledWith(1);
  //   }));
  // })

  // describe("openModal()", () => {
  //   it('should be create openModal()', () => {
  //     expect(component.openModal).toBeTruthy();
  //   });

  //   it('should be check openModal() work properly', async(() => {
  //     // component.openModal(1);
  //     // expect(component.goToEditClient.emit).toHaveBeenCalledWith(1);
  //     // expect(mockMatDialog.open).toHaveBeenCalledWith(DeletePopupComponent);
  //   }));
  // })

  // describe('goToCompanyDashboard', () => {

  //   it('should create goToCompanyDashboard', () => {
  //     expect(component.goToCompanyDashboard).toBeTruthy();
  //   });
  //   it('should be check goToCompanyDashboard method work properly', () => {
  //     component.goToCompanyDashboard(1, 'sonal', 'iconUrl');
  //     expect(mockGlobalResponseHandlerService.setPartialClientResponse).toHaveBeenCalledWith(1, 'sonal', true, 'iconUrl');
  //     expect(router.navigate).toHaveBeenCalledWith([Route.Dashboard]);
  //   });
  // });
});
