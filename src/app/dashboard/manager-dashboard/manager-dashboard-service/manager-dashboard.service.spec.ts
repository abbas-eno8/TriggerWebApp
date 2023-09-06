/**
@author : Sonal Patil
@class : ManagerDashboardService
@description :ManagerDashboardService is created for unit test cases.
**/
import { TestBed, inject, async } from '@angular/core/testing';
import { ManagerDashboardService } from './manager-dashboard.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentConfigService } from '../../../core/environment-config/environment-config.service';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../../core/common.response';
import { ApiURL } from '../../../core/magic-string/common.model';

describe('ManagerDashboardService', () => {
  let environmentConfigService;
  let DASHBOARD, widgetArray, DepartmentByYear, GetYear;
  let service: ManagerDashboardService;
  let httpTestingController: HttpTestingController;
  let arrayOfId: any, companyId: any, managerId: any, year: any, loginEmpId: any;
  beforeEach(async(() => {
    DASHBOARD = {
      "message": "Ok",
      "status": 200,
      "data": [
        {
          "directRptCnt": 3,
          "directRptAvgScore": 29,
          "directRptAvgScoreRank": "B",
          "orgRptCnt": 14,
          "orgRptAvgScore": 21,
          "orgRptAvgScoreRank": "B-",
          "lstGraphDirectRptPct": [
            {
              "directMonYrId": 201901,
              "directMonYr": "Jan",
              "directRptEmpCnt": 2,
              "directScoreRank": "B",
              "directRptEmpPct": 100
            }
          ],
          "lstGraphDirectRptRank": [
            {
              "directAvgMonYrId": 201901,
              "directAvgMonYr": "Jan",
              "directRptAvgScore": 27,
              "directAvgScoreRank": "B"
            }
          ],
          "lstGraphOrgRptPct": [
            {
              "orgMonYrId": 201901,
              "orgMonYr": "Jan",
              "orgRptEmpCnt": 1,
              "orgScoreRank": "RP",
              "orgRptEmpPct": 33
            },
            {
              "orgMonYrId": 201901,
              "orgMonYr": "Jan",
              "orgRptEmpCnt": 2,
              "orgScoreRank": "B",
              "orgRptEmpPct": 66
            }
          ],
          "lstGraphOrgRptRank": [
            {
              "orgAvgMonYrId": 201901,
              "orgAvgMonYr": "Jan",
              "orgRptAvgScore": 23,
              "orgAvgScoreRank": "B-"
            }
          ],
          "lstGraphTodayDirectRpt": [
            {
              "TodayDirectRptCnt": 1,
              "TodayRptEmpList": "",
              "TodayDirectRptRank": "A"
            },
            {
              "TodayDirectRptCnt": 1,
              "TodayRptEmpList": "",
              "TodayDirectRptRank": "C"
            }
          ],
          "lstGraphTodayOrgRpt": [
            {
              "TodayOrgRptCnt": 1,
              "TodayOrgEmpList": "",
              "TodayOrgRptRank": "A"
            },
            {
              "TodayOrgRptCnt": 1,
              "TodayOrgEmpList": "",
              "TodayOrgRptRank": "C"
            },
            {
              "TodayOrgRptCnt": 1,
              "TodayOrgEmpList": "",
              "TodayOrgRptRank": "RP"
            }
          ]
        }
      ]
    };
    widgetArray = [
      {
        "widgetId": "8",
        "widgetName": "total-direct-report-today",
        "widgetActualName": "Total Number of Direct Reports Today",
        "sequenceNumber": 1,
        "tileSequence": 1,
        "position": 0.0,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
      {
        "widgetId": "9",
        "widgetName": "average-direct-report-today",
        "widgetActualName": "Average Score of my Direct Reports Today",
        "sequenceNumber": 2,
        "tileSequence": 2,
        "position": 0.25,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
      {
        "widgetId": "10",
        "widgetName": "total-org-today",
        "widgetActualName": "Total Number of my Organization Today",
        "sequenceNumber": 3,
        "tileSequence": 3,
        "position": 0.5,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
      {
        "widgetId": "11",
        "widgetName": "average-org-today",
        "widgetActualName": "Average Score of my Organization Today",
        "sequenceNumber": 4,
        "tileSequence": 4,
        "position": 0.75,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
      {
        "widgetId": "12",
        "widgetName": "direct-reports-to-date",
        "widgetActualName": "My Direct Reports To Date Column Graph\r\n",
        "sequenceNumber": 5,
        "tileSequence": 5,
        "position": 0.0,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
      {
        "widgetId": "13",
        "widgetName": "direct-reports-by-average-score",
        "widgetActualName": "My Direct Reports By Average Score Line Graph\r\n",
        "sequenceNumber": 6,
        "tileSequence": 6,
        "position": 0.5,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
      {
        "widgetId": "14",
        "widgetName": "org-to-date",
        "widgetActualName": "My Organization To Date Column Graph\r\n",
        "sequenceNumber": 7,
        "tileSequence": 7,
        "position": 0.0,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
      {
        "widgetId": "15",
        "widgetName": "org-by-average-score",
        "widgetActualName": "My Organization By Average Score Line Graph\r\n",
        "sequenceNumber": 8,
        "tileSequence": 8,
        "position": 0.5,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
      {
        "widgetId": "16",
        "widgetName": "direct-reports-to-date-progressive",
        "widgetActualName": "My Direct Reports To Date Progressive Graph",
        "sequenceNumber": 9,
        "tileSequence": 9,
        "position": 0.0,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
      {
        "widgetId": "17",
        "widgetName": "org-to-date-circular",
        "widgetActualName": "My Organization To Date Circular Graph",
        "sequenceNumber": 10,
        "tileSequence": 10,
        "position": 0.5,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
      {
        "widgetId": "18",
        "widgetName": "direct-reports-to-date-progressive-pie",
        "widgetActualName": "My Direct Reports To Date Progressive Pie Graph",
        "sequenceNumber": 11,
        "tileSequence": 11,
        "position": 0.0,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      },
      {
        "widgetId": "19",
        "widgetName": "org-to-date-circular-pie",
        "widgetActualName": "My Organization To Date Circular Pie Graph",
        "sequenceNumber": 12,
        "tileSequence": 12,
        "position": 0.5,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      }
    ]
    DepartmentByYear = {
      "message": "Ok",
      "status": 200,
      "data": [
        {
          "companyId": 145,
          "departmentId": 6,
          "mstDepartmentId": 6,
          "isSelected": 1,
          "department": "Angular",
          "createdBy": 0,
          "updatedBy": null,
          "yearID": "2019"
        },
        {
          "companyId": 145,
          "departmentId": 7,
          "mstDepartmentId": 7,
          "isSelected": 1,
          "department": "API Services",
          "createdBy": 0,
          "updatedBy": null,
          "yearID": "2019"
        },
        {
          "companyId": 145,
          "departmentId": 5,
          "mstDepartmentId": 5,
          "isSelected": 1,
          "department": "Human Resources",
          "createdBy": 0,
          "updatedBy": null,
          "yearID": "2019"
        },
        {
          "companyId": 145,
          "departmentId": 8,
          "mstDepartmentId": 8,
          "isSelected": 1,
          "department": "Mobile Apps",
          "createdBy": 0,
          "updatedBy": null,
          "yearID": "2019"
        },
        {
          "companyId": 145,
          "departmentId": 9,
          "mstDepartmentId": 9,
          "isSelected": 1,
          "department": "UI",
          "createdBy": 0,
          "updatedBy": null,
          "yearID": "2019"
        }
      ]
    }
    GetYear = {
      "message": "Ok",
      "status": 200,
      "data":
        [
          {
            "AssessedYear": "2019"
          },
          {
            "AssessedYear": "Last 12 Months"
          }]
    }
    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    service = jasmine.createSpyObj(['getDefaultWidgetPosition']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ManagerDashboardService,
        { provide: EnvironmentConfigService, useValue: environmentConfigService }]
    })
      .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200');
    service = TestBed.get(ManagerDashboardService);
    arrayOfId = [1, 2, 3];
    companyId = 1;
    managerId = 1;
    year = 2019;
  }));

  it('should be created', inject([ManagerDashboardService], (service: ManagerDashboardService) => {
    expect(service).toBeTruthy();
  }));

  describe('getManagerDashboardByDepartment', () => {

    it('should be create getManagerDashboardByDepartment()', () => {
      expect(service.getManagerDashboardByDepartment).toBeTruthy();
    });

    it('should call getManagerDashboardByDepartment with correct URL', () => {
      // Act
      service.getManagerDashboardByDepartment(companyId, managerId, year, arrayOfId).subscribe();

      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Dashboard + companyId + '/' + managerId + '/' + year + '/' + arrayOfId);

      req.flush(DASHBOARD);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getManagerDashboardByDepartment(companyId, managerId, year, arrayOfId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Dashboard + companyId + '/' + managerId + '/' + year + '/' + arrayOfId);
      expect(req.request.method).toBe("GET");
    });

    it(`should respond with fake dashboard data`, async(inject([HttpClient, HttpTestingController],
      (http: HttpClient, backend: HttpTestingController) => {
        http.get(service.baseUrl + ApiURL.Dashboard + companyId + '/' + managerId + '/' + year + '/' + arrayOfId).subscribe((next: Response) => {
          expect(next.data).toEqual(DASHBOARD.data);
        });

        backend.match({
          url: service.baseUrl + ApiURL.Dashboard + companyId + '/' + managerId + '/' + year + '/' + arrayOfId,
          method: 'GET'
        })[0].flush(DASHBOARD);
      })));

  });

  describe('getDepartmentByYear', () => {

    it('should be create getDepartmentByYear()', () => {
      expect(service.getDepartmentByYear).toBeTruthy();
    });

    it('should call getDepartmentByYear with correct URL', () => {
      // Act
      service.getDepartmentByYear(companyId, year).subscribe();

      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Department + companyId + '/' + year);

      req.flush(DepartmentByYear);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getDepartmentByYear(companyId, year).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Department + companyId + '/' + year);
      expect(req.request.method).toBe("GET");
    });

    it(`should respond with fake DepartmentByYear data`, async(inject([HttpClient, HttpTestingController],
      (http: HttpClient, backend: HttpTestingController) => {
        http.get(service.baseUrl + ApiURL.Department + companyId + '/' + year).subscribe((next: Response) => {
          expect(next.data).toEqual(DepartmentByYear.data);
        });

        backend.match({
          url: service.baseUrl + ApiURL.Department + companyId + '/' + year,
          method: 'GET'
        })[0].flush(DepartmentByYear);
      })));
  });

  describe('getYear', () => {

    it('should be create getYear()', () => {
      expect(service.getYear).toBeTruthy();
    });

    it('should call getYear with correct URL', () => {
      // Act
      service.getYear(companyId, loginEmpId).subscribe();

      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.AssessmentYear + companyId + '/' + loginEmpId);

      req.flush(GetYear);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getYear(companyId, loginEmpId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.AssessmentYear + companyId + '/' + loginEmpId);
      expect(req.request.method).toBe("GET");
    });

    it(`should respond with fake Year data`, async(inject([HttpClient, HttpTestingController],
      (http: HttpClient, backend: HttpTestingController) => {
        http.get(service.baseUrl + + ApiURL.AssessmentYear + companyId + '/' + loginEmpId).subscribe((next: Response) => {
          expect(next.data).toEqual(GetYear.data);
        });

        backend.match({
          url: service.baseUrl + + ApiURL.AssessmentYear + companyId + '/' + loginEmpId,
          method: 'GET'
        })[0].flush(GetYear);
      })));

  });

  describe('getDefaultWidgetPosition', () => {

    it('should be create getDefaultWidgetPosition()', () => {
      expect(service.getDefaultWidgetPosition).toBeTruthy();
    });
    it('should be return data or not', () => {
      let widgetData = service.getDefaultWidgetPosition(1);
      expect(widgetData.length).toBe(widgetArray.length);
    });

  });

});
