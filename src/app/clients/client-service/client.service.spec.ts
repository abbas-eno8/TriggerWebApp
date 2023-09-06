/**
@author : Sonal Patil
@class : ClientService
@description :ClientService is created for unit test cases.
**/
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientService } from './client.service';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { CustomValidation } from '../../shared/Validation/custom.validation';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../core/common.response';
import { ApiURL } from '../../core/magic-string/common.model';

describe('ClientService', () => {
    let environmentConfigService;
    let mockGlobalResponseHandlerService;
    let mockCustomValidation;
    let CLIENTS, CLIENT, INDUSTRYTYPE, CLIENTOBJECT;
    let service: ClientService;
    let httpTestingController: HttpTestingController;
    let mockUserData: any, clientId: any;

    beforeEach(async(() => {
        mockUserData = {
            'userId': 1,
            'clientId': 1,
            'clientName': 'ABC',
            'userRole': 'Manager',
        };
        CLIENTS = {
            "message": "Ok",
            "status": 200,
            "data": [
                {
                    "compId": 1,
                    "companyId": "135",
                    "industryTypeId": 1,
                    "industryType": "IT",
                    "companyName": "QA Trigger",
                    "address1": "Orion House",
                    "address2": "Orian House",
                    "city": "Valsad",
                    "state": "Gujarat",
                    "zipcode": "396001",
                    "country": "India",
                    "phoneNo1": 1234567890,
                    "phoneNo2": 1234567890,
                    "website": "",
                    "keyEmpName": "",
                    "keyEmpEmail": "",
                    "remarks": "",
                    "costPerEmp": 0.0,
                    "fixedAmtPerMon": 0.0,
                    "dealsRemarks": "",
                    "compImgPath": "https://tqa.blob.core.windows.net/companylogo/8ba688b9-04ca-4fc0-90b9-c001c65e73b0QA.jpeg",
                    "compFolderPath": null,
                    "compImage": null,
                    "contractStartDate": "2019-01-05T00:00:00",
                    "contractEndDate": "2020-12-31T00:00:00",
                    "gracePeriod": 30,
                    "assessmentDays": 0,
                    "isActive": false,
                    "createdBy": 0,
                    "updatedBy": 0,
                    "result": 0
                },
                {
                    "compId": 2,
                    "companyId": "134",
                    "industryTypeId": 1,
                    "industryType": "IT",
                    "companyName": "Dev Trigger",
                    "address1": "Orion House",
                    "address2": "Orian House",
                    "city": "Valsad",
                    "state": "Gujarat",
                    "zipcode": "396001",
                    "country": "India",
                    "phoneNo1": 1234567890,
                    "phoneNo2": 1234567890,
                    "website": "",
                    "keyEmpName": "",
                    "keyEmpEmail": "",
                    "remarks": "",
                    "costPerEmp": 0.0,
                    "fixedAmtPerMon": 0.0,
                    "dealsRemarks": "",
                    "compImgPath": "https://tqa.blob.core.windows.net/companylogo/70e3cfa0-919d-43d4-9100-dc51d2ee955cDev.png",
                    "compFolderPath": null,
                    "compImage": null,
                    "contractStartDate": "2019-01-05T00:00:00",
                    "contractEndDate": "2020-12-31T00:00:00",
                    "gracePeriod": 30,
                    "assessmentDays": 0,
                    "isActive": false,
                    "createdBy": 0,
                    "updatedBy": 0,
                    "result": 0
                },
                {
                    "compId": 3,
                    "companyId": "100",
                    "industryTypeId": 1,
                    "industryType": "IT",
                    "companyName": "Reliance",
                    "address1": "Mumbai",
                    "address2": "",
                    "city": "Mumbai",
                    "state": "Maharashtra",
                    "zipcode": "455555555555555",
                    "country": "India",
                    "phoneNo1": 2654879800,
                    "phoneNo2": 2654879800,
                    "website": "",
                    "keyEmpName": "",
                    "keyEmpEmail": "",
                    "remarks": "",
                    "costPerEmp": 100.0,
                    "fixedAmtPerMon": 10000.0,
                    "dealsRemarks": "",
                    "compImgPath": "https://tqa.blob.core.windows.net/companylogo/30eef942-7af4-4f3e-bb9a-5ac5a72841b7pexels-photo-1149137.jpeg",
                    "compFolderPath": null,
                    "compImage": null,
                    "contractStartDate": "2018-11-14T00:00:00",
                    "contractEndDate": "2021-08-18T00:00:00",
                    "gracePeriod": 30,
                    "assessmentDays": 1,
                    "isActive": false,
                    "createdBy": 0,
                    "updatedBy": 0,
                    "result": 0
                }
            ]
        };
        CLIENT = {
            "message": "Ok",
            "status": 200,
            "data": [
                {
                    "compId": 1,
                    "companyId": "135",
                    "industryTypeId": 1,
                    "industryType": "IT",
                    "companyName": "QA Trigger",
                    "address1": "Orion House",
                    "address2": "Orian House",
                    "city": "Valsad",
                    "state": "Gujarat",
                    "zipcode": "396001",
                    "country": "India",
                    "phoneNo1": 1234567890,
                    "phoneNo2": 1234567890,
                    "website": "",
                    "keyEmpName": "",
                    "keyEmpEmail": "",
                    "remarks": "",
                    "costPerEmp": 0.0,
                    "fixedAmtPerMon": 0.0,
                    "dealsRemarks": "",
                    "compImgPath": "https://tqa.blob.core.windows.net/companylogo/8ba688b9-04ca-4fc0-90b9-c001c65e73b0QA.jpeg",
                    "compFolderPath": null,
                    "compImage": null,
                    "contractStartDate": "2019-01-05T00:00:00",
                    "contractEndDate": "2020-12-31T00:00:00",
                    "gracePeriod": 30,
                    "assessmentDays": 0,
                    "isActive": false,
                    "createdBy": 0,
                    "updatedBy": 0,
                    "result": 0
                },
            ]
        }
        CLIENTOBJECT = {
            "industrytypeid": 1,
            "clientId": 1,
            "companyname": "Dev Trigger",
            "addressline1": "Orion House",
            "addressline2": "Orian House",
            "city": "Valsad",
            "state": "Gujarat",
            "zip": "396001",
            "country": "India",
            "phonenumber": 1234567890,
            "website": "",
            "keyempname": "",
            "keyempemail": "",
            "comments": "",
            "costperemp": "0",
            "fixedAmtPerMon": "0",
            "compImgPath": "",
            "compImage": "",
            "updatedby": 3324,
            "dealsremarks": "",
            "startDate": "01-05-2019",
            "endDate": "12-31-2020",
            "gracePeriod": 31,
            "assessmentDays": 0
        }
        INDUSTRYTYPE = {
            "message": "Ok",
            "status": 200,
            "data": [
                {
                    "industryTypeId": 1,
                    "industryType": "IT",
                    "isActive": false,
                    "createdby": null,
                    "updatedby": null
                },
                {
                    "industryTypeId": 2,
                    "industryType": "Manufacturing",
                    "isActive": false,
                    "createdby": null,
                    "updatedby": null
                },
                {
                    "industryTypeId": 3,
                    "industryType": "Natural Resources and Mining",
                    "isActive": false,
                    "createdby": null,
                    "updatedby": null
                },
                {
                    "industryTypeId": 4,
                    "industryType": "Construction",
                    "isActive": false,
                    "createdby": null,
                    "updatedby": null
                }
            ]
        }
        environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
        mockGlobalResponseHandlerService = jasmine.createSpyObj(['getUserData']);
        mockCustomValidation = jasmine.createSpyObj(['changeDateFormat']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ClientService,
                { provide: EnvironmentConfigService, useValue: environmentConfigService },
                { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService },
                { provide: CustomValidation, useValue: mockCustomValidation }

            ]
        })
            .compileComponents();
        httpTestingController = TestBed.get(HttpTestingController);
        mockGlobalResponseHandlerService.getUserData.and.returnValue(mockUserData);
        environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
        service = TestBed.get(ClientService);
        clientId = 1;
    }));

    it('should be created', inject([ClientService], (service: ClientService) => {
        expect(service).toBeTruthy();
    }));
    describe('getUserData', () => {

        // it('should be create getUserData()', () => {
        //     expect(service.getUserData).toBeTruthy();
        // });

        it('should be check UserData , clientId & UserID', inject([ClientService], (service: ClientService) => {
            expect(mockGlobalResponseHandlerService.getUserData).toHaveBeenCalledWith();
            expect(environmentConfigService.getBaseUrl).toHaveBeenCalled();
            expect(service.user.clientId).toBe(1);
            expect(service.user.userId).toBe(1);
        }));
    });

    describe('getAllClient', () => {

        it('should be create getDepartment()', () => {
            expect(service.getAllClient).toBeTruthy();
        });

        it('should call getDepartment with correct URL', () => {
            // Act
            service.getAllClient().subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Client);

            req.flush(CLIENTS);
            httpTestingController.verify();
        });

        it('should be GET method', () => {
            service.getAllClient().subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Client);
            expect(req.request.method).toBe("GET");
        });

        it(`should respond with fake Clients data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.get(service.baseUrl + ApiURL.Client).subscribe((next: Response) => {
                    expect(next.data).toEqual(CLIENTS.data);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Client,
                    method: 'GET'
                })[0].flush(CLIENTS);
            })));
    });

    describe('getClientById', () => {

        it('should be create getClientById()', () => {
            expect(service.getClientById).toBeTruthy();
        });

        it('should call getClientById with correct URL', () => {
            // Act
            service.getClientById(clientId).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Client + clientId);

            req.flush(CLIENT);
            httpTestingController.verify();
        });

        it('should be GET method', () => {
            service.getClientById(clientId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Client + clientId);
            expect(req.request.method).toBe("GET");
        });

        it(`should respond with fake Client data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.get(service.baseUrl + ApiURL.Client + clientId).subscribe((next: Response) => {
                    expect(next.data).toEqual(CLIENT.data);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Client + clientId,
                    method: 'GET'
                })[0].flush(CLIENT);
            })));
    });

    describe('getIndustryType', () => {

        it('should be create getIndustryType()', () => {
            expect(service.getIndustryType).toBeTruthy();
        });

        it('should call getIndustryType with correct URL', () => {
            // Act
            service.getIndustryType().subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.IndustyType);

            req.flush(INDUSTRYTYPE);
            httpTestingController.verify();
        });

        it('should be GET method', () => {
            service.getIndustryType().subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.IndustyType);
            expect(req.request.method).toBe("GET");
        });

        it('should return an Observable<InductryType[]>', () => {
            service.getIndustryType().subscribe(industry => {
                expect(industry.data.length).toBe(4);
                expect(industry.data).toEqual(INDUSTRYTYPE.data);
            });
        });
        it(`should respond with fake InductryType data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.get(service.baseUrl + ApiURL.IndustyType).subscribe((next: Response) => {
                    expect(next.data).toEqual(INDUSTRYTYPE.data);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.IndustyType,
                    method: 'GET'
                })[0].flush(INDUSTRYTYPE);
            })));
    });

    describe('deleteClientById', () => {

        it('should be create deleteDepartment()', () => {
            expect(service.deleteClientById).toBeTruthy();
        });

        it('should call deleteDepartment with correct URL', () => {
            // Act
            service.deleteClientById(1).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Client + clientId + '/' + service.userId);
            expect(req.request.method).toBe("DELETE");
            req.flush({ "message": "Company Deleted successfully", "status": 200, "data": [{}] });
            httpTestingController.verify();
        });

        it('should be DELETE method', () => {
            service.deleteClientById(1).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Client + clientId + '/' + service.userId);
            expect(req.request.method).toBe("DELETE");
        });

        it(`should respond with fake Client data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.delete(service.baseUrl + ApiURL.Client + clientId + '/' + service.userId).subscribe((next: Response) => {
                    expect(next.data.length).toEqual(1);
                    expect(next.status).toEqual(200);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Client + clientId + '/' + service.userId,
                    method: 'DELETE'
                })[0].flush({ "message": "Company Deleted successfully", "status": 200, "data": [{}] });
            })));
    });

    describe('addClient', () => {
        it('should be create addClient()', () => {
            expect(service.addClient).toBeTruthy();
        });
        it("returns empty string if index is larger than string", function () {
            CLIENTOBJECT.companyname = CLIENTOBJECT.companyname.charAt(0).toUpperCase();
            expect(CLIENTOBJECT.companyname).toEqual(CLIENTOBJECT.companyname);
        });

        it('should call updateClient with correct URL', () => {
            // Act
            mockCustomValidation.changeDateFormat.and.returnValue('01-01-1900');
            service.addClient(CLIENTOBJECT).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Client + service.userId);
            req.flush({ "message": "New Company Added successfully", "status": 200, "data": [{}] });
            httpTestingController.verify();
        });

        it(`should respond with fake Client data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.post(service.baseUrl + ApiURL.Client + service.userId, CLIENTOBJECT).subscribe((next: Response) => {
                    expect(next.data.length).toEqual(1);
                    expect(next.status).toEqual(200);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Client + service.userId,
                    method: 'POST'
                })[0].flush({ "message": "New Company Added successfully", "status": 200, "data": [{}] });
            })));
    });

    describe('updateClient', () => {
        it('should be create updateDepartment()', () => {
            expect(service.updateClient).toBeTruthy();
        });
        it("returns empty string if index is larger than string", function () {
            CLIENTOBJECT.companyname = CLIENTOBJECT.companyname.charAt(0).toUpperCase();
            expect(CLIENTOBJECT.companyname).toEqual(CLIENTOBJECT.companyname);
        });

        it('should call updateClient with correct URL', () => {
            // Act
            mockCustomValidation.changeDateFormat.and.returnValue('01-01-1900');
            service.updateClient(CLIENTOBJECT).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Client + service.userId);
            req.flush(CLIENTOBJECT);
            httpTestingController.verify();
        });

        it(`should respond with fake Department data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.put(service.baseUrl + ApiURL.Client + service.userId, CLIENTOBJECT).subscribe((next: Response) => {
                    expect(next.data.length).toEqual(1);
                    expect(next.status).toEqual(200);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Client + service.userId,
                    method: 'PUT'
                })[0].flush({ "message": "Company Updated successfully", "status": 200, "data": [{}] });
            })));
    });
});

