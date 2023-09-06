import { TestBed, inject } from '@angular/core/testing';

import { ExcelUploadService } from './excel-upload.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { ExcelUploadAdapter } from '../excel-adapter/excel-adapter';
import { ApiURL } from '../../core/magic-string/common.model';
import { ReadExcelUpload, ImportExcelUpload } from '../excel-upload-model';

describe('ExcelUploadService', () => {
  let service, environmentConfigService, excelUploadAdapter;
  let httpTestingController: HttpTestingController;
  let clientId: number;
  beforeEach(() => {
    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    excelUploadAdapter = jasmine.createSpyObj(['read']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ExcelUploadService,
        { provide: EnvironmentConfigService, useValue: environmentConfigService },
        { provide: ExcelUploadAdapter, useValue: excelUploadAdapter },
      ]
    })
      .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
    service = TestBed.get(ExcelUploadService);
    clientId = 1;
  });

  it('should be created', inject([ExcelUploadService], (service: ExcelUploadService) => {
    expect(service).toBeTruthy();
  }));

  describe('getExcelTemplate', () => {

    it('should be create getExcelTemplate()', () => {
      expect(service.getExcelTemplate).toBeTruthy();
    });
    it('should call getExcelTemplate with correct URL', () => {
      // Act
      service.getExcelTemplate(clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ExcelUpload + clientId);
      req.flush(EXCELTEMPLATE);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getExcelTemplate(clientId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ExcelUpload + clientId);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('readExcelFile', () => {
    it('should be create readExcelFile()', () => {
      expect(service.readExcelFile).toBeTruthy();
    });

    it('should call readExcelFile with correct URL', () => {
      // Act
      service.readExcelFile(READOBJECT, clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ExcelUpload + clientId);
      excelUploadAdapter.read.and.returnValue(READEXCELUPLOAD);
      req.flush({ "message": "Ok", "status": 200, "data": [{ "companyId": null, "newlyInserted": 0, "mismatchRecord": 1, "lstNewCsvUpload": [], "lstMisMatchCsvUpload": [{ "empId": 1274, "companyId": "3", "firstName": "q", "middleName": "q", "lastName": "w", "suffix": "0", "email": "qw@yopmail.com", "jobTitle": "Dev", "joiningDate": "01-01-2001", "workCity": "NY", "workState": "Ny", "workZipcode": "98989", "departmentId": "9", "department": "Acc DEPT", "managerId": "1", "managerName": "", "managerLName": "", "empStatus": true, "roleId": "2", "dateOfBirth": "01-01-1900", "raceorethanicityId": "0", "gender": "", "jobCategory": "", "jobCode": "", "jobGroup": "", "lastPromodate": "01-01-1900", "currentSalary": 0.0, "lastIncDate": "01-01-1900", "empLocation": "", "countryId": "0", "regionId": "0", "empImgPath": "", "bactive": false, "createdBy": 0, "createddtstamp": null, "updatedBy": 0, "updateddtstamp": null, "employeeId": "1274-CSV", "CSVManagerId": "", "phonenumber": "" }, { "empId": 1274, "companyId": "3", "firstName": "q", "middleName": "q", "lastName": "w", "suffix": "0", "email": "qw@yopmail.com", "jobTitle": "Dev", "joiningDate": "01-01-2001", "workCity": "NY", "workState": "Ny", "workZipcode": "98989", "departmentId": "9", "department": "Acc DEPT", "managerId": "1", "managerName": "", "managerLName": "", "empStatus": true, "roleId": "2", "dateOfBirth": "01-01-1900", "raceorethanicityId": "0", "gender": "", "jobCategory": "", "jobCode": "", "jobGroup": "", "lastPromodate": "01-01-1900", "currentSalary": 0.0, "lastIncDate": "01-01-1900", "empLocation": "", "countryId": "0", "regionId": "0", "empImgPath": "", "bactive": false, "createdBy": 0, "createddtstamp": null, "updatedBy": 0, "updateddtstamp": null, "employeeId": "1274-DB", "CSVManagerId": "", "phonenumber": "" }], "lstExistPhoneCsvUpload": [], "lstExistEmployeeIdCsvUpload": [] }] });
      httpTestingController.verify();
    });
  });

  describe('import', () => {
    it('should be create import()', () => {
      expect(service.import).toBeTruthy();
    });

    it('should call import with correct URL', () => {
      // Act
      service.import(IMPORT, clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ImportExcelData + clientId);
      req.flush({ "message": "Data Imported Successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });
  });
});

let EXCELTEMPLATE = { "message": "Ok", "status": 200, "data": "https://devend.trigger123.com//ExcelTemplate\\ExcelTemplate_3.xlsx" };
let READOBJECT = [{ "EmployeeID": "", "FirstName": "q", "MiddleName": "q", "LastName": "w", "Prefix": "", "EmailAddress": "qw@yopmail.com", "CountryCallingCode": "", "PhoneNumber": "", "EmployeePosition": "Dev", "DateOfHire": "01-01-2001", "City": "NY", "State": "Ny", "Zip": "98989", "Department": "Acc DEPT", "EmployeeStatus": "Active", "Role": "Admin", "ManagersName": "1: Mihir Patel", "ExcelManagersEmployeeID": "", "Ethnicity": "", "Gender": "", "JobCategory": "", "JobCode": "", "JobGroup": "", "DateInPosition": "", "CurrentSalary": "", "DateOfLastSalaryIncrease": "", "DateOfBirth": "", "LocationName": "", "Country": "", "Region": "" }];
let READEXCELUPLOAD: ReadExcelUpload[] = [{ "employeeId": "", "companyId": 3, "firstName": "q", "middleName": "q", "lastName": "w", "suffix": "0", "email": "qw@yopmail.com", "phonenumber": "", "jobTitle": "Dev", "joiningDate": "01-01-2001", "workCity": "NY", "workState": "Ny", "workZipcode": "98989", "departmentId": "Acc DEPT", "managerId": "1: Mihir Patel", "protectionLevel": "1: Low", "empStatus": true, "roleId": "Admin", "dateOfBirth": "01-01-1900", "raceorethanicityId": "", "gender": "", "jobCategory": "", "jobCode": "", "jobGroup": "", "lastPromodate": "01-01-1900", "currentSalary": 0, "lastIncdate": "01-01-1900", "empLocation": "", "countryId": "", "regionId": "", "CSVManagerId": "", "createddtstamp": "01-01-1900", "updateddtstamp": "01-01-1900" }]
let IMPORT: ImportExcelUpload[] = [{
  'empId': 1274,
  'employeeId': "1274",
  'companyId': 3,
  'firstName': "q",
  'middleName': "q",
  'lastName': "w",
  'suffix': "0",
  'email': "qw@yopmail.com",
  'phonenumber': "",
  'jobTitle': "Dev",
  'joiningDate': "01-01-2001",
  'workCity': "NY",
  'workState': "Ny",
  'workZipcode': "98989",
  'departmentId': 9,
  'department': "Acc DEPT",
  'managerId': 1,
  'protectionLevelId': 1,
  'empStatus': true,
  'displayEmpStatus': "Active",
  'roleId': 2,
  'dateOfBirth': "01-01-1900",
  'raceorethanicityId': 0,
  'gender': "",
  'jobCategory': "",
  'jobCode': "",
  'jobGroup': "",
  'lastPromodate': "01-01-1900",
  'currentSalary': 0,
  'lastIncDate': "01-01-1900",
  'empLocation': "",
  'countryId': 0,
  'regionId': 0,
  'createdBy': 0,
  'updatedBy': 145,
  'CSVManagerId': "",
  'createddtstamp': "01-01-1900",
  'updateddtstamp': "01-01-1900",
  'isChecked': true,
  'recordType': "Excel",
  'isHideCheckbox': false
}]