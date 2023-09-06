import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../core/loader/loader.service';
import { CustomValidation } from '../shared/Validation/custom.validation';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { SearchPipePipe } from '../shared/pipes/search-pipe.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientsComponent } from './clients.component';
import { mockUserData } from '../core/mock-data/mock-userdata';
import { CLIENTS } from '../core/mock-data/mock-clients';
import { UrlEncryptionDecryptionService } from '../core/url-encryption-decryption/url-encryption-decryption.service';
import { Route } from '../core/magic-string/common.model';
import { MatDialog } from '@angular/material';
import { ClientService } from './client-service/client.service';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  let mockBsModalRef, mockClientService, mockLoaderService, mockSearchPipePipe, mockCustomValidation, mockGlobalResponseHandlerService, mockUrlEncryptionDecryptionService, mockMatDialog;
  beforeEach(async(() => {
    mockGlobalResponseHandlerService = jasmine.createSpyObj(['getUserData', 'getApiResponse', 'setPartialClientResponse']);
    mockLoaderService = jasmine.createSpyObj(['emitIsLoaderShown']);
    mockClientService = jasmine.createSpyObj(['getAllClient', 'deleteClientById']);
    mockUrlEncryptionDecryptionService = jasmine.createSpyObj(['urlEncryption']);
    mockCustomValidation = jasmine.createSpyObj(['isDisplayRecordsNotFoundPage']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ClientsComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: LoaderService, useValue: mockLoaderService },
        { provide: CustomValidation, useValue: mockCustomValidation },
        { provide: ClientService, useValue: mockClientService },
        { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService },
        { provide: UrlEncryptionDecryptionService, useValue: mockUrlEncryptionDecryptionService },
        //{ provide: SearchPipePipe, useValue: mockSearchPipePipe },
        { provide: MatDialog, useValue: mockMatDialog }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
    mockLoaderService.emitIsLoaderShown.and.returnValue(true);
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    // it('should be create ngOnInit()', () => {
    //   expect(component.ngOnInit).toBeTruthy();
    // });

    // it('should be check ngOnInit() work properly', () => {
    //   mockGlobalResponseHandlerService.getUserData.and.returnValue(mockUserData);
    //   spyOn(component, 'getAllClient');
    //   component.ngOnInit();
    //   expect(component.getAllClient).toHaveBeenCalled();
    //   expect(component.user).toBe(mockUserData);
    // });
  });

  // describe('getAllClient', () => {

  //   it('should create getAllClient', () => {
  //     expect(component.getAllClient).toBeTruthy();
  //   });
  //   it('should be check getAllClient method work properly', () => {
  //     mockClientService.getAllClient.and.returnValue(of(CLIENTS));
  //     component.user = mockUserData;
  //     let clientdata: any = _.sortBy(CLIENTS.data, 'companyName');
  //     component.getAllClient();
  //     expect(component.filteredClients).toEqual(clientdata);
  //   });
  // });

  // describe('deleteClient', () => {

  //   it('should create deleteClient', () => {
  //     expect(component.deleteClient).toBeTruthy();
  //   });
  //   it('should be check deleteClient method work properly', () => {
  //     // mockClientService.getAllClient.and.returnValue(of(CLIENTS));
  //     // component.user = mockUserData;
  //     // let clientdata: any = _.sortBy(CLIENTS.data, 'companyName');
  //     // component.deleteClient();
  //     // expect(component.filteredClients).toEqual(clientdata);
  //   });

  // });

  // describe('goToEditClient', () => {

  //   it('should create goToEditClient', () => {
  //     expect(component.goToEditClient).toBeTruthy();
  //   });
  //   it('should be check goToEditClient method work properly', () => {
  //     spyOn(component, 'redirectToAddClient');
  //     component.user = mockUserData;
  //     component.goToEditClient(1);
  //     expect(component.user.clientId).toBe(1);
  //     expect(component.redirectToAddClient).toHaveBeenCalledWith(1);
  //   });

  // });

  // describe('trackByIndex', () => {

  //   it('should create trackByIndex', () => {
  //     expect(component.goToEditClient).toBeTruthy();
  //   });
  //   it('should be check trackByIndex method work properly', () => {
  //     component.trackByIndex(1);
  //   });
  // });

  // describe('redirectToAddClient', () => {

  //   it('should create redirectToAddClient', () => {
  //     expect(component.redirectToAddClient).toBeTruthy();
  //   });
  //   it('should be check redirectToAddClient method work properly', () => {
  //     component.redirectToAddClient(1);
  //     expect(mockUrlEncryptionDecryptionService.urlEncryption).toHaveBeenCalledWith('1', Route.EditClient);
  //     expect(mockGlobalResponseHandlerService.setPartialClientResponse).toHaveBeenCalledWith(1, '', false, '');
  //   });

  // });

  // describe('deleteClientEvent', () => {

  //   it('should create deleteClientEvent', () => {
  //     expect(component.deleteClientEvent).toBeTruthy();
  //   });
  //   it('should be check deleteClientEvent method work properly', () => {
  //     // spyOn(component, 'deleteClient');
  //     // component.deleteClientEvent(CLIENTS.data[0]);
  //     // // component.deleteClientEvent(CLIENTS.data);
  //     // expect(component.deleteClientEvent).toHaveBeenCalledWith(1,dialogRef);
  //   });
  // });


  // describe('bindRecords', () => {

  //   it('should create bindRecords', () => {
  //     expect(component.bindRecords).toBeTruthy();
  //   });

  //   // it('should be check bindRecords method work properly', () => {
  //   //   let clients = CLIENTS.data;
  //   //   component.bindRecords(clients);
  //   //   let filteredClients: any = clients;
  //   //   expect(filteredClients).toEqual(clients);
  //   //   let isDisplayRecordsNotFound: any = expect(mockCustomValidation.isDisplayRecordsNotFoundPage).toHaveBeenCalledWith(CLIENTS.data, this.component.isDisplayRecordsNotFoundPage);
  //   //   expect(component.isDisplayRecordsNotFound).toEqual(isDisplayRecordsNotFound);
  //   // });
  // });

  // describe('deleteClient', () => {

  //   it('should create deleteClient', () => {
  //     expect(component.deleteClient).toBeTruthy();
  //   });
  //   it('should be check deleteClient method work properly', () => {
  //     component.user = mockUserData;
  //     mockClientService.deleteClientById.and.returnValue(of(CLIENT_DELETE));
  //     spyOn(component, 'getAllClient');
  //     //spyOn(component, 'decline');
  //     //component.deleteClient();
  //     expect(mockClientService.deleteClientById).toHaveBeenCalledWith(component.user.clientId);
  //     expect(component.getAllClient).toHaveBeenCalled();
  //     //expect(component.decline).toHaveBeenCalled();
  //   });

  // });

  // describe('sort', () => {

  //   it('should create sort', () => {
  //     expect(component.sort).toBeTruthy();
  //   });
  //   it('should be check sort method work properly for ascending order', () => {
  //     component.filteredClients = CLIENTS.data[0];
  //     let filteredClients: any = _.sortBy(component.filteredClients, 'companyName');
  //     component.sort('companyName');
  //     expect(component.filteredClients.length).toEqual(filteredClients.length);
  //   });

  //   it('should be check sort method work properly for descending order', () => {
  //     component.filteredClients = CLIENTS.data[0];
  //     component.direction = 1;
  //     let filteredClients: any = _.sortBy(component.filteredClients, 'companyName');
  //     filteredClients = filteredClients.reverse();
  //     component.sort('companyName');
  //     expect(component.filteredClients.length).toEqual(filteredClients.length);

  //   });

  // });

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

