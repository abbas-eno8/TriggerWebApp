/**
@author : Sonal Patil
@class : AssessmentService
@description :AssessmentService is created for unit test cases.
**/
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AssessmentService } from './assessment.service';
import { EnvironmentConfigService } from '../core/environment-config/environment-config.service';
import { HttpClient } from '@angular/common/http';
import { Response } from '../core/common.response';
import { QUESTIONS, ASSESSMENT_OBJECT } from '../core/mock-data/mock-assessment';
import { ApiURL, Version2 } from '../core/magic-string/common.model';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { Encryption } from '../core/magic-string/common-validation-model';

describe('AssessmentService', () => {
    let environmentConfigService;
    let mockGlobalResponseHandlerService;
    let service: AssessmentService;
    let httpTestingController: HttpTestingController;
    let mockUserData: any;

    beforeEach(async(() => {
        environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
        mockGlobalResponseHandlerService = jasmine.createSpyObj(['encriptData']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AssessmentService,
                { provide: EnvironmentConfigService, useValue: environmentConfigService },
                { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService },
            ]
        })
            .compileComponents();
        httpTestingController = TestBed.get(HttpTestingController);
        environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
        service = TestBed.get(AssessmentService);
    }));

    it('should be created', inject([AssessmentService], (service: AssessmentService) => {
        expect(service).toBeTruthy();
    }));

    describe('getAllQuestions', () => {

        it('should be create Get Questions()', () => {
            expect(service.getAllQuestions).toBeTruthy();
        });

        it('should call getAllQuestions with correct URL', () => {
            // Act
            service.getAllQuestions().subscribe();

            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.QuestionList);

            req.flush(QUESTIONS);
            httpTestingController.verify();
        });

        it('should be GET method', () => {
            service.getAllQuestions().subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.QuestionList);
            expect(req.request.method).toBe("GET");
        });
        it(`should respond with fake QuestionList data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.get(service.baseUrl + ApiURL.QuestionList).subscribe((next: Response) => {
                    expect(next.data).toEqual(QUESTIONS.data);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.QuestionList,
                    method: 'GET'
                })[0].flush(QUESTIONS);
            })));
    });

    describe('Assesssment', () => {
        it('should be create Assesssment()', () => {
            expect(service.employeeAssessment).toBeTruthy();
        });
        it('should call Assesssment with correct URL', () => {
            // Act
            service.employeeAssessment(ASSESSMENT_OBJECT).subscribe();
            expect(mockGlobalResponseHandlerService.encriptData).toHaveBeenCalledWith(Version2.Version4, Encryption.Version, Encryption.VersionKey);
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Assesment);
            req.flush(ASSESSMENT_OBJECT);
            httpTestingController.verify();
        });

        it('should be GET method', () => {
            service.employeeAssessment(ASSESSMENT_OBJECT).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Assesment);
            expect(req.request.method).toBe("POST");
        });
        it(`should respond with fake QuestionList data`, async(inject([HttpClient, HttpTestingController],
            (http: HttpClient, backend: HttpTestingController) => {
                http.post(service.baseUrl + ApiURL.Assesment, ASSESSMENT_OBJECT).subscribe((next: Response) => {
                    expect(next.status).toEqual(200);
                    expect(next.data.length).toBe(1);
                });

                backend.match({
                    url: service.baseUrl + ApiURL.Assesment,
                    method: 'POST'
                })[0].flush({
                    "message": "Ok",
                    "status": 200,
                    "data": [
                        {
                            "empId": 1,
                            "companyId": 134,
                            "empName": "Pooja p patel",
                            "empScore": 17,
                            "empScoreRank": "C",
                            "ratingDate": "2019-01-10T17:21:34",
                            "assessmentPeriod": "Quarterly",
                            "assessmentById": 3309,
                            "assessmentBy": "Sonal Patil",
                            "generalScoreRank": "C-Player",
                            "scoreRemarks": "This is an average member (or less than average member) of your organization who fills a role but gives you no competitive advantage. They are merely filling a role until you can either help them improve to a B or A player or find a B or A player to replace them. This employee needs improvement and should be placed on a performance improvement plan to educate them on performance and behavioral expectations.",
                            "managerAction": "Educate.",
                            "scoreSummary": "Average Talent."
                        }
                    ]
                });
            })));
    });
});