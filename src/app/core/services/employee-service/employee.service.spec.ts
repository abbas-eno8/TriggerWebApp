/**
@author : Sonal Patil
@class : EmployeeService
@description :EmployeeService is created for unit test cases.
**/
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { EnvironmentConfigService } from '../../environment-config/environment-config.service';
import { GlobalResponseHandlerService } from '../../global-response-handler/global-response-handler';
import { CustomValidation } from '../../../shared/Validation/custom.validation';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../common.response';
import { ApiURL, Version, Version2 } from '../../magic-string/common.model';
import { Encryption } from '../../magic-string/common-validation-model';

describe('EmployeeService', () => {
    let environmentConfigService;
    let mockGlobalResponseHandlerService, mockCustomValidation;
    let EMPLOYEES, WIDGETS, WIDGET_OBJECT, EMPLOYEE_DASHBOARD, ETHNICITY, ROLE, COUNTRY, REGION, EMPLOYEE_OBJECT;
    let service: EmployeeService;
    let httpTestingController: HttpTestingController;
    let mockUserData: any, companyId: any, managerId: any, yearId: any;
    let pageno, pagesize, searchtext, departmentId, widgetType, grade, month, employeeId, empId, clientId;
    beforeEach(async(() => {
        EMPLOYEE_OBJECT =
            {
                "employeeId": "",
                "firstName": "Nik",
                "middleName": "",
                "lastName": "Shah",
                "suffix": "Capt.",
                "client": 134,
                "emailAddress": "nik.shah@mailinator.com",
                "position": "Non Manager",
                "dateOfHire": "01-09-2019",
                "city": "Valsad",
                "state": "Gujarat",
                "zip": "396001",
                "departmentName": 8,
                "manager": 25676,
                "managerFName": "",
                "managerLName": "",
                "employeeStatus": "true",
                "triggerRole": 5,
                "dateOfBirth": "01-01-1900 12:00:00",
                "ethnicity": 0,
                "jobGroup": "",
                "gender": "Male",
                "jobcategoryid": 0,
                "jobCategory": "",
                "locationName": "",
                "jobcodeid": 0,
                "jobCode": "",
                "dateInPosition": "01-01-1900 12:00:00",
                "currentSalary": 0,
                "dateOfLastSalaryIncrease": "01-01-1900 12:00:00",
                "countryName": 0,
                "region": 0,
                "empimgpath": "",
                "createdby": 3309,
                "empImage": ""
            };
        mockUserData = {
            'userId': 1,
            'clientId': 1,
            'clientName': 'ABC',
            'userRole': 'Manager',
        };
        EMPLOYEES = {
            "message": "Ok",
            "status": 200,
            "data": [
                {
                    "empId": 1,
                    "employeeId": "25737",
                    "companyid": 134,
                    "companyName": "",
                    "firstName": "Netri",
                    "middleName": "",
                    "lastName": "shelat",
                    "suffix": "Capt.",
                    "email": "Netri.shelat@mailinator.com",
                    "jobTitle": "Manager",
                    "joiningDate": "2019-01-01T00:00:00",
                    "workCity": "Valsad",
                    "workState": "Gujarat",
                    "workZipcode": "396001",
                    "departmentId": 1,
                    "department": "Human Resources",
                    "managerId": 25676,
                    "managerFName": "",
                    "managerLName": "",
                    "empStatus": true,
                    "roleId": 3,
                    "role": "Manager",
                    "dateOfBirth": "1900-01-01T00:00:00",
                    "raceorethanicityId": 0,
                    "raceorethanicity": "",
                    "gender": "Male",
                    "jobCategoryId": 0,
                    "jobCategory": "",
                    "empLocation": "",
                    "jobCodeId": 0,
                    "jobCode": "",
                    "jobGroupId": 0,
                    "jobGroup": "",
                    "lastPromodate": "1900-01-01T00:00:00",
                    "currentSalary": 0.0,
                    "lastIncDate": "1900-01-01T00:00:00",
                    "country": "",
                    "countryId": 0,
                    "regionId": 0,
                    "region": null,
                    "empImgPath": "",
                    "empFolderPath": null,
                    "bactive": true,
                    "createdBy": 0,
                    "updatedBy": 0,
                    "empImage": null,
                    "lastAssessedDate": "",
                    "lastAssessmentDate": null,
                    "avgTriggerScore": 0,
                    "avgScoreRank": "",
                    "lastScoreRank": "",
                    "ratingCompleted": "0",
                    "companyLogoPath": null,
                    "resultId": 0,
                    "result": 0,
                    "password": null,
                    "totalRowCount": 0
                },
                {
                    "empId": 2,
                    "employeeId": "25680",
                    "companyid": 134,
                    "companyName": "",
                    "firstName": "Pooja",
                    "middleName": "p",
                    "lastName": "patel",
                    "suffix": "Capt.",
                    "email": "poojaPatel@mailinator.com",
                    "jobTitle": "Non Manager",
                    "joiningDate": "2018-01-02T00:00:00",
                    "workCity": "NY",
                    "workState": "NY",
                    "workZipcode": "34234",
                    "departmentId": 2,
                    "department": "Mobile Apps",
                    "managerId": 25676,
                    "managerFName": "",
                    "managerLName": "",
                    "empStatus": true,
                    "roleId": 5,
                    "role": "Non-Manager",
                    "dateOfBirth": "1900-01-01T00:00:00",
                    "raceorethanicityId": 0,
                    "raceorethanicity": "",
                    "gender": "",
                    "jobCategoryId": 0,
                    "jobCategory": "",
                    "empLocation": "",
                    "jobCodeId": 0,
                    "jobCode": "",
                    "jobGroupId": 0,
                    "jobGroup": "",
                    "lastPromodate": "1900-01-01T00:00:00",
                    "currentSalary": 0.0,
                    "lastIncDate": "1900-01-01T00:00:00",
                    "country": "",
                    "countryId": 0,
                    "regionId": 0,
                    "region": null,
                    "empImgPath": "",
                    "empFolderPath": null,
                    "bactive": true,
                    "createdBy": 0,
                    "updatedBy": 0,
                    "empImage": null,
                    "lastAssessedDate": "01/07/2019",
                    "lastAssessmentDate": null,
                    "avgTriggerScore": 0,
                    "avgScoreRank": "B+",
                    "lastScoreRank": "A+",
                    "ratingCompleted": "2",
                    "companyLogoPath": null,
                    "resultId": 0,
                    "result": 0,
                    "password": null,
                    "totalRowCount": 0
                }
            ]
        }
        WIDGETS = {
            "message": "Ok",
            "status": 200,
            "data": [
                {
                    "userId": 3309,
                    "widgetId": 8,
                    "widgetName": "total-direct-report-today",
                    "widgetActualName": "Total Number of Direct Reports Today",
                    "sequenceNumber": 1,
                    "tileSequence": 1,
                    "position": 0.0,
                    "isActive": true,
                    "isSelected": 0,
                    "roleId": 0,
                    "createdBy": 0,
                    "result": 0
                },
                {
                    "userId": 3309,
                    "widgetId": 9,
                    "widgetName": "average-direct-report-today",
                    "widgetActualName": "Average Score of my Direct Reports Today",
                    "sequenceNumber": 2,
                    "tileSequence": 2,
                    "position": 0.25,
                    "isActive": true,
                    "isSelected": 0,
                    "roleId": 0,
                    "createdBy": 0,
                    "result": 0
                }
            ]
        }
        WIDGET_OBJECT = [
            {
                "userId": 3309,
                "widgetId": "8",
                "widgetName": "total-direct-report-today",
                "sequenceNumber": 1,
                "tileSequence": 1,
                "position": 0,
                "isActive": false
            },
            {
                "userId": 3309,
                "widgetId": "9",
                "widgetName": "average-direct-report-today",
                "sequenceNumber": 2,
                "tileSequence": 2,
                "position": 0.25,
                "isActive": true
            },
            {
                "userId": 3309,
                "widgetId": "10",
                "widgetName": "total-org-today",
                "sequenceNumber": 3,
                "tileSequence": 3,
                "position": 0.5,
                "isActive": true
            },
            {
                "userId": 3309,
                "widgetId": "11",
                "widgetName": "average-org-today",
                "sequenceNumber": 4,
                "tileSequence": 4,
                "position": 0.75,
                "isActive": true
            }
        ];
        EMPLOYEE_DASHBOARD = {
            "message": "Ok",
            "status": 200,
            "data": [
                {
                    "empId": 25681,
                    "empName": "Test test Test",
                    "noOfRatings": 2,
                    "lastScoreRank": "C-",
                    "lastScore": 12,
                    "currentYrAvgScoreRank": "B-",
                    "currentYrAvgScore": 23,
                    "lyrAvgScoreRank": "",
                    "lastAssessedDate": "01/08/2019",
                    "lyrAvgScore": 0,
                    "lastScoreRemarks": "This is an average member (or less than average member) of your organization who fills a role but gives you no competitive advantage. They are merely filling a role until you can either help them improve to a B or A player or find a B or A player to replace them. This employee needs improvement and should be placed on a performance improvement plan to educate them on performance and behavioral expectations.",
                    "lastManagerAction": "Educate.",
                    "lastScoreSummary": "Average Talent.",
                    "lastGeneralScoreRank": "C-Player",
                    "graphCategories": [
                        {
                            "lstWeekly": [
                                {
                                    "empid": 25681,
                                    "weekNo": "Week1",
                                    "weekScore": 34,
                                    "weekScoreRank": "B+"
                                },
                                {
                                    "empid": 25681,
                                    "weekNo": "Week2",
                                    "weekScore": 12,
                                    "weekScoreRank": "C-"
                                }
                            ],
                            "lstMonthly": [
                                {
                                    "empid": 25681,
                                    "monthNo": "Jan-2019",
                                    "monthScore": 23,
                                    "monthScoreRank": "B-"
                                }
                            ],
                            "lstYearly": [
                                {
                                    "empid": 25681,
                                    "yearNo": "Year: 2019",
                                    "yearScore": 23,
                                    "yearScoreRank": "B-"
                                }
                            ]
                        }
                    ],
                    "remarks": []
                }
            ]
        }
        ETHNICITY = {
            "message": "Ok",
            "status": 200,
            "data": [
                {
                    "id": 1,
                    "raceOrEthnicity": "American Indian or Alaska Native"
                },
                {
                    "id": 2,
                    "raceOrEthnicity": "Asian"
                }
            ]
        }
        ROLE = {
            "message": "Ok",
            "status": 200,
            "data": [
                {
                    "roleId": 2,
                    "role": "Admin"
                },
                {
                    "roleId": 3,
                    "role": "Manager"
                }
            ]
        }
        COUNTRY = {
            "message": "Ok",
            "status": 200,
            "data": [
                {
                    "countryId": 1,
                    "country": "Afghanistan"
                },
                {
                    "countryId": 2,
                    "country": "Albania"
                }]
        }
        REGION = {
            "message": "Ok",
            "status": 200,
            "data": [
                {
                    "countryId": 1,
                    "country": "Afghanistan",
                    "regionId": 1,
                    "region": "ASIA (EX. NEAR EAST)"
                },
                {
                    "countryId": 17,
                    "country": "Bangladesh",
                    "regionId": 17,
                    "region": "ASIA (EX. NEAR EAST)"
                }
            ]
        }
        mockCustomValidation = jasmine.createSpyObj(['changeDateFormat']);
        environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
        mockGlobalResponseHandlerService = jasmine.createSpyObj(['getUserData', 'encriptData']);
        service = jasmine.createSpyObj(['getAllEmployees']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                EmployeeService,
                { provide: EnvironmentConfigService, useValue: environmentConfigService },
                { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService },
                { provide: CustomValidation, useValue: mockCustomValidation }
            ]
        })
            .compileComponents();
        httpTestingController = TestBed.get(HttpTestingController);
        mockGlobalResponseHandlerService.getUserData.and.returnValue(mockUserData);
        environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200');
        service = TestBed.get(EmployeeService);
        mockCustomValidation.changeDateFormat.and.returnValue('01-01-1900');
        companyId = 1;
        managerId = 1;
        pageno = 1;
        pagesize = 50;
        searchtext = "ABC";
        departmentId = 1;
        widgetType = 1;
        grade = 'A';
        month = 'Jan';
        employeeId = 1;
        empId = 1;
        yearId = 2019;
        clientId = 1
    }));

    it('should be created', inject([EmployeeService], (service: EmployeeService) => {
        expect(service).toBeTruthy();
    }));

    describe('Get User Data', () => {
        it('should be create callGetUserData()', () => {
            expect(service.getUserData).toBeTruthy();
        });
        it('should be check UserData , clientId & UserID', inject([EmployeeService], (service: EmployeeService) => {
            expect(mockGlobalResponseHandlerService.getUserData).toHaveBeenCalledWith();
            expect(environmentConfigService.getBaseUrl).toHaveBeenCalled();
            expect(service.userData.clientId).toBe(1);
            expect(service.userData.userId).toBe(1);
        }));
    });

    describe('getAllAdmins', () => {

        it('should be create getAllAdmins()', () => {
            expect(service.getAllAdmins).toBeTruthy();
        });
        it('should call getAllAdmins with correct URL', () => {
            // Act
            service.getAllAdmins(companyId, managerId, clientId).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employees + companyId + '/' + managerId + '/' + clientId);
            req.flush(EMPLOYEES);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getAllAdmins(companyId, managerId, clientId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employees + companyId + '/' + managerId + '/' + clientId);
            expect(req.request.method).toBe("GET");
        });

        it(`should respond with fake Admins data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.get(service.baseUrl + ApiURL.Employees + companyId + '/' + managerId + '/' + clientId).subscribe((next: Response) => {
                    expect(next.data).toEqual(EMPLOYEES.data);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Employees + companyId + '/' + managerId + '/' + clientId,
                    method: 'GET'
                })[0].flush(EMPLOYEES);
            })));

    });
    describe('getDashboardEmployee', () => {
        it('should be create getDashboardEmployee()', () => {
            expect(service.getDashboardEmployee).toBeTruthy();
        });
        it('should call getDashboardEmployee with correct URL', () => {
            // Act
            service.getDashboardEmployee(companyId, managerId).subscribe();
            expect(mockGlobalResponseHandlerService.encriptData).toHaveBeenCalledWith(Version2.Version3, Encryption.Version, Encryption.VersionKey);
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.DashboardEmployee + companyId + '/' + managerId);
            req.flush(EMPLOYEES);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });
        it('should be GET method', () => {
            service.getDashboardEmployee(companyId, managerId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.DashboardEmployee + companyId + '/' + managerId);
            expect(req.request.method).toBe("GET");
        });

        it(`should respond with fake employees data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.get(service.baseUrl + ApiURL.DashboardEmployee + companyId + '/' + managerId).subscribe((next: Response) => {
                    expect(next.data).toEqual(EMPLOYEES.data);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.DashboardEmployee + companyId + '/' + managerId,
                    method: 'GET'
                })[0].flush(EMPLOYEES);
            })));

    });

    describe('getAllManager', () => {
        it('should be create getAllManager()', () => {
            expect(service.getAllManager).toBeTruthy();
        });

        it('should call getAllManager with correct URL', () => {
            // Act
            service.getAllManager(companyId).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Allemployee + companyId);
            req.flush(EMPLOYEES);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getAllManager(companyId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Allemployee + companyId);
            expect(req.request.method).toBe("GET");
        });

        it(`should respond with fake Managers data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.get(service.baseUrl + ApiURL.Allemployee + companyId).subscribe((next: Response) => {
                    expect(next.data).toEqual(EMPLOYEES.data);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Allemployee + companyId,
                    method: 'GET'
                })[0].flush(EMPLOYEES);
            })));

    });

    describe('getEmployeeDashboardData', () => {
        it('should be create getEmployeeDashboardData()', () => {
            expect(service.getEmployeeDashboardData).toBeTruthy();
        });

        it('should call getEmployeeDashboardData with correct URL', () => {
            // Act
            service.getEmployeeDashboardData(employeeId).subscribe();
            expect(mockGlobalResponseHandlerService.encriptData).toHaveBeenCalledWith(Version2.Version4, Encryption.Version, Encryption.VersionKey);
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Dashboard + employeeId);
            req.flush(EMPLOYEE_DASHBOARD);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getEmployeeDashboardData(employeeId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Dashboard + employeeId);
            expect(req.request.method).toBe("GET");
        });

        it(`should respond with fake Employee data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.get(service.baseUrl + ApiURL.Dashboard + employeeId).subscribe((next: Response) => {
                    expect(next.data).toEqual(EMPLOYEE_DASHBOARD.data);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Dashboard + employeeId,
                    method: 'GET'
                })[0].flush(EMPLOYEE_DASHBOARD);
            })));
    });

    describe('getTriggerRole', () => {
        it('should be create getTriggerRole()', () => {
            expect(service.getTriggerRole).toBeTruthy();
        });

        it('should call getEmployeeDashboardData with correct URL', () => {
            // Act
            service.getTriggerRole(clientId).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Role + clientId);
            req.flush(ROLE);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getTriggerRole(clientId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Role + clientId);
            expect(req.request.method).toBe("GET");
        });

        it(`should respond with fake Role data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.get(service.baseUrl + ApiURL.Role + clientId).subscribe((next: Response) => {
                    expect(next.data).toEqual(ROLE.data);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Role + clientId,
                    method: 'GET'
                })[0].flush(ROLE);
            })));
    });

    describe('getEthnicity', () => {
        it('should be create getEthnicity()', () => {
            expect(service.getEthnicity).toBeTruthy();
        });

        it('should call getEthnicity with correct URL', () => {
            // Act
            service.getEthnicity().subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Ethnicity);
            req.flush(ETHNICITY);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getEthnicity().subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Ethnicity);
            expect(req.request.method).toBe("GET");
        });

        it(`should respond with fake Ethnicity data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.get(service.baseUrl + ApiURL.Ethnicity).subscribe((next: Response) => {
                    expect(next.data).toEqual(ETHNICITY.data);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Ethnicity,
                    method: 'GET'
                })[0].flush(ETHNICITY);
            })));
    });

    describe('getCountry', () => {
        it('should be create getCountry()', () => {
            expect(service.getCountry).toBeTruthy();
        });

        it('should call getCountry with correct URL', () => {
            // Act
            service.getCountry().subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Country);
            req.flush(COUNTRY);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getCountry().subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Country);
            expect(req.request.method).toBe("GET");
        });

        it(`should respond with fake Ethnicity data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.get(service.baseUrl + ApiURL.Country).subscribe((next: Response) => {
                    expect(next.data).toEqual(COUNTRY.data);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Country,
                    method: 'GET'
                })[0].flush(COUNTRY);
            })));
    });

    describe('getRegion', () => {
        it('should be create getRegion()', () => {
            expect(service.getRegion).toBeTruthy();
        });

        it('should call getRegion with correct URL', () => {
            // Act
            service.getRegion().subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Region);
            req.flush(REGION);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getRegion().subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Region);
            expect(req.request.method).toBe("GET");
        });

        it(`should respond with fake Region data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.get(service.baseUrl + ApiURL.Region).subscribe((next: Response) => {
                    expect(next.data).toEqual(REGION.data);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Region,
                    method: 'GET'
                })[0].flush(REGION);
            })));
    });

    describe('addEmployee', () => {
        it('should be create addEmployee()', () => {
            expect(service.addEmployee).toBeTruthy();
        });
        it('should call addEmployee with correct URL', () => {
            // Act
            service.addEmployee(EMPLOYEE_OBJECT, empId).subscribe();

            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employee + service.userId);
            req.flush({ "message": "New Empoyee Added successfully", "status": 200, "data": [{}] });
            httpTestingController.verify();
        });

        it('should be POST method', () => {
            service.addEmployee(EMPLOYEE_OBJECT, empId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employee + service.userId);
            expect(req.request.method).toBe("POST");
        });

        it(`should respond with fake Employee data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.post(service.baseUrl + ApiURL.Employee + service.userId, EMPLOYEE_OBJECT).subscribe((next: Response) => {
                    expect(next.data.length).toEqual(1);
                    expect(next.status).toEqual(200);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Employee + service.userId,
                    method: 'POST'
                })[0].flush({ "message": "New Empoyee Added successfully", "status": 200, "data": [{}] });
            })));

    });

    describe('updateEmployee', () => {
        it('should be create updateEmployee()', () => {
            expect(service.updateEmployee).toBeTruthy();
        });

        it('should call updateEmployee with correct URL', () => {
            // Act
            service.updateEmployee(EMPLOYEE_OBJECT, empId, false).subscribe();

            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employee + service.userId);
            req.flush({ "message": "Employee Updated successfully", "status": 200, "data": [{}] });
            httpTestingController.verify();
        });

        it('should be PUT method', () => {
            service.updateEmployee(EMPLOYEE_OBJECT, empId, false).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employee + service.userId);
            expect(req.request.method).toBe("PUT");
        });

        it(`should respond with fake Employee data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.put(service.baseUrl + ApiURL.Employee + service.userId, EMPLOYEE_OBJECT).subscribe((next: Response) => {
                    expect(next.data.length).toEqual(1);
                    expect(next.status).toEqual(200);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Employee + service.userId,
                    method: 'PUT'
                })[0].flush({ "message": "Employee Updated successfully", "status": 200, "data": [{}] });
            })));
    });

});