/**
@author : Sonal Patil
@class : AuthenticationService
@description :AuthenticationService is created for unit test cases.
**/
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { EnvironmentConfigService } from './environment-config/environment-config.service';
import { HttpClient } from '@angular/common/http';
import { Response } from './common.response';
import { ApiURL } from './magic-string/common.model';

describe('AuthenticationService', () => {
    let environmentConfigService;
    let LOGIN_OBJECT, LOGIN, CHANGE_PASSWORD, userId;
    let service: AuthenticationService;
    let httpTestingController: HttpTestingController;

    beforeEach(async(() => {
        LOGIN_OBJECT = {
            "profile": [
                {
                    "email": "sonal.patil@1rivet.com",
                }
            ]
        };
        LOGIN = {
            "message": "User logged in successfully!",
            "status": 200,
            "data": [
                {
                    "userId": 1,
                    "empId": 1,
                    "roleId": 2,
                    "companyid": 1,
                    "userName": "sonal.patil@1rivet.com",
                    "companyname": "Dev Trigger",
                    "role": "Admin",
                    "empEmailId": "sonal.patil@1rivet.com",
                    "Message": null,
                    "dbConnection": "",
                    "employee": {
                        "empId": 1,
                        "employeeId": "25676",
                        "companyid": 134,
                        "companyName": null,
                        "firstName": "Sonal",
                        "middleName": "",
                        "lastName": "Patil",
                        "suffix": "Ms.",
                        "email": "sonal.patil@1rivet.com",
                        "jobTitle": "Admin",
                        "joiningDate": "2019-01-01T00:00:00",
                        "workCity": "Valsad",
                        "workState": "Gujarat",
                        "workZipcode": "396001",
                        "departmentId": 5,
                        "department": "",
                        "managerId": 25698,
                        "managerFName": "",
                        "managerLName": "",
                        "empStatus": true,
                        "roleId": 2,
                        "role": "Admin",
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
                        "bactive": false,
                        "createdBy": 0,
                        "updatedBy": 0,
                        "empImage": null,
                        "lastAssessedDate": null,
                        "lastAssessmentDate": null,
                        "avgTriggerScore": 0,
                        "avgScoreRank": null,
                        "lastScoreRank": null,
                        "ratingCompleted": null,
                        "companyLogoPath": "https://triggerqa.blob.core.windows.net/companylogo/6040d3b0-d684-4c2a-a33c-6ca0acc2aec2Kitchens-Logo-250x100.png",
                        "resultId": 0,
                        "result": 0,
                        "password": null,
                        "totalRowCount": 0
                    },
                    "key": null,
                    "result": null
                }
            ]
        };
        CHANGE_PASSWORD =
            {
                "currentPassword": "Admin@1234",
                "newPassword": "Admin@12345",
                "confirmNewPassword": "Admin@12345"

            };

        environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthenticationService,
                { provide: EnvironmentConfigService, useValue: environmentConfigService },
            ]
        })
            .compileComponents();
        httpTestingController = TestBed.get(HttpTestingController);
        environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200');
        service = TestBed.get(AuthenticationService);
        userId = 1;
    }));

    it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
        expect(service).toBeTruthy();
    }));
    
    describe('login', () => {

        it('should be create login()', () => {
            expect(service.login).toBeTruthy();
        });
        it('should call login with correct URL', () => {
            // Act
            service.login(LOGIN_OBJECT).subscribe();

            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Login);
            req.flush(LOGIN);
            httpTestingController.verify();
        });

        it('should be POST method', () => {
            service.login(LOGIN_OBJECT).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Login);
            expect(req.request.method).toBe("POST");
        });

        it(`should respond with fake Login data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                const body = {
                    'username': LOGIN_OBJECT.profile.email,
                };
                http.post(service.baseUrl + ApiURL.Login, body).subscribe((next: Response) => {
                    expect(next.data.length).toEqual(1);
                    expect(next.status).toEqual(200);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Login,
                    method: 'POST'
                })[0].flush(LOGIN);
            })));
    });

    describe('changePassword', () => {

        it('should be create changePassword()', () => {
            expect(service.changePassword).toBeTruthy();
        });

        it('should call changePassword with correct URL', () => {
            // Act
            service.changePassword(CHANGE_PASSWORD, userId).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ChangePassword);
            req.flush({
                "message": "Your Password has been changed successfully!",
                "status": 200,
                "data": [
                    {}
                ]
            });
            httpTestingController.verify();
        });

        it('should be POST method', () => {
            service.changePassword(CHANGE_PASSWORD, userId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ChangePassword);
            expect(req.request.method).toBe("POST");
        });

        it(`should respond with fake Change Password data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                const body = {
                    "userid": userId,
                    "oldpassword": CHANGE_PASSWORD.currentPassword,
                    "newpassword": CHANGE_PASSWORD.newPassword
                };
                http.post(service.baseUrl + ApiURL.ChangePassword, body).subscribe((next: Response) => {
                    expect(next.data.length).toEqual(1);
                    expect(next.status).toEqual(200);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.ChangePassword,
                    method: 'POST'
                })[0].flush({
                    "message": "Your Password has been changed successfully!",
                    "status": 200,
                    "data": [
                        {}
                    ]
                });
            })));

    });

});