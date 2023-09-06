/**
@author : Mihir Patel
@editedBy : Anjali Tandel
@class : EmployeeService
@description :EmployeeService is created for user Employee related operations.
**/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//  ................................................ //
import { environment } from '../../../../environments/environment';
import { Response } from '../../common.response';
import { GlobalResponseHandlerService } from '../../global-response-handler/global-response-handler';
import { CustomValidation } from '../../../shared/Validation/custom.validation';
import { ApiURL, Version, Version2, Dimension } from '../../magic-string/common.model';
import { ContactNumber, CountryCallinCodeModel } from '../../../employees/employee-model';
import { Encryption } from '../../magic-string/common-validation-model';
@Injectable()
export class EmployeeService {

  private baseUrl: string;
  public auth: any;
  public userData: any;
  public userId: any;
  public callingCode: any;
  constructor(
    private httpClient: HttpClient,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private customValidation: CustomValidation
  ) {
    this.baseUrl = environment.baseUrl;
    this.getUserData();
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  02-01-2018
  * Description : Create method for get user data.
  */
  getUserData() {
    this.userData = this.globalResponseHandlerService.getUserData();
    this.userId = this.userData.userId;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 04/07/2019
   * Description : For get all employee list in invidiual-employee :
   */
  getDashboardEmployee(companyId, managerId): Observable<Response> {
    this.globalResponseHandlerService.encriptData(Version2.Version3, Encryption.Version, Encryption.VersionKey)
    const employeeListUrl = this.baseUrl + ApiURL.DashboardEmployee + companyId + '/' + managerId;
    return this.httpClient.get<Response>(employeeListUrl);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : For get all employee list at assessment page and invidiual-employee :
  */
  getTriggerEmployees(companyId, managerId): Observable<Response> {
    this.globalResponseHandlerService.encriptData(Version2.Version3, Encryption.Version, Encryption.VersionKey)
    const employeeListUrl = this.baseUrl + ApiURL.TriggerEmployee + companyId + '/' + managerId;
    return this.httpClient.get<Response>(employeeListUrl);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : API for get all Admin employees
  */
  getAllAdmins(companyId, managerId, clientId): Observable<Response> {
    const employeeListUrl = this.baseUrl + ApiURL.Employees + companyId + '/' + managerId + '/' + clientId;
    return this.httpClient.get<Response>(employeeListUrl);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : API for get all manager on add-edit employee
  */
  getAllManager(clientId): Observable<Response> {
    const managerListUrl = this.baseUrl + ApiURL.Allemployee + clientId;
    return this.httpClient.get<Response>(managerListUrl);
  }

  /**
  * Author : Mihir Patel
  * Modified-Date :  22-07-2019
  * Description : API for get latest parmission
  */
  checkPermission(permissionObject, employeeId) {
    this.globalResponseHandlerService.encriptData(Version2.Version3, Encryption.Version, Encryption.VersionKey)
    return this.httpClient.post<any>(this.baseUrl + ApiURL.CheckActionPermission + '/' + employeeId, permissionObject);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : API for get employee sashboard Data 
  */
  getEmployeeDashboardData(companyId, employeeId, userId): Observable<Response> {
    this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey)
    const employeeDashboardUrl = this.baseUrl + ApiURL.Dashboard + companyId + '/' + employeeId + '/' + userId;
    return this.httpClient.get<Response>(employeeDashboardUrl)
  }

  getContextualReports(empId, userID): Observable<any> {
    this.globalResponseHandlerService.encriptData(Version.Version1, Encryption.Version, Encryption.VersionKey);
    const contextualReportsUrl = `${this.baseUrl}AnnualReviewReport/history?Empid=${empId}&UserId=${userID}`;
    return this.httpClient.get<any>(contextualReportsUrl);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : API for get employee trigger-role
  */
  getTriggerRole(clientId: number): Observable<Response> {
    const getTriggerRoleUrl = this.baseUrl + ApiURL.Role + clientId;
    return this.httpClient.get<Response>(getTriggerRoleUrl);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : API for get employee ethinicity
  */
  getEthnicity(): Observable<Response> {
    const getEthnicityUrl = this.baseUrl + ApiURL.Ethnicity;
    return this.httpClient.get<Response>(getEthnicityUrl);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : API for get country
  */
  getCountry(): Observable<Response> {
    const getCountryNameUrl = this.baseUrl + ApiURL.Country;
    return this.httpClient.get<Response>(getCountryNameUrl);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : API for get region
  */
  getRegion(): Observable<Response> {
    const getRegionUrl = this.baseUrl + ApiURL.Region;
    return this.httpClient.get<Response>(getRegionUrl);
  }

  removeSpace(object) {
    if (!!object.firstName) {
      object.firstName = object.firstName.trim();
    }
    if (!!object.middleName) {
      object.middleName = object.middleName.trim();
    }
    if (!!object.lastName) {
      object.lastName = object.lastName.trim();
    }
    if (!!object.emailAddress) {
      object.emailAddress = object.emailAddress.trim();
    }
    if (!!object.position) {
      object.position = object.position.trim();
    }

    if (!!object.city) {
      object.city = object.city.trim();
    }
    if (!!object.state) {
      object.state = object.state.trim();
    }
    if (!!object.locationName) {
      object.locationName = object.locationName.trim();
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : Api for add new employee
  */
  addEmployee(object, employeeId) {
    this.removeSpace(object);
    const addClientUrl = this.baseUrl + ApiURL.Employee + this.userId;
    let currentSalary = object.currentSalary + '';
    currentSalary = currentSalary.replace(/[^0-9.]/g, '');
    const body = {
      'employeeId': object.employeeId || '',
      'firstname': object.firstName.charAt(0).toUpperCase() + object.firstName.slice(1),
      'middlename': object.middleName || '',
      'lastname': object.lastName.charAt(0).toUpperCase() + object.lastName.slice(1),
      'suffix': object.suffix || 0,
      'companyid': parseInt(object.client),
      'email': object.emailAddress || '',
      'jobtitle': object.position,
      'joiningdate': this.customValidation.changeDateFormat(object.dateOfHire),
      'workCity': object.city,
      'workState': object.state,
      'workZipcode': object.zip,
      'departmentId': parseInt(object.departmentName) || 5,
      'managerid': parseInt(object.manager) || 0,
      'managerFName': '',
      'managerLName': '',
      'empstatus': parseInt(object.employeeStatus),
      'roleid': parseInt(object.triggerRole),
      'dateOfBirth': this.customValidation.changeDateFormat(object.dateOfBirth) || '01-01-1900 12:00:00',
      'raceorethanicityid': parseInt(object.ethnicity) || 0,
      'jobGroup': object.jobGroup || '',
      'gender': object.gender || '',
      'jobcategoryid': 0,
      'jobcategory': object.jobCategory || '',
      'empLocation': object.locationName || '',
      'jobcodeid': 0,
      'jobcode': object.jobCode || '',
      'lastPromodate': this.customValidation.changeDateFormat(object.dateInPosition) || '01-01-1900 12:00:00',
      'currentSalary': parseInt(currentSalary) || 0,
      'lastincdate': this.customValidation.changeDateFormat(object.dateOfLastSalaryIncrease) || '01-01-1900 12:00:00',
      'countryid': parseInt(object.countryName) || 0,
      'regionid': parseInt(object.region) || 0,
      'empimgpath': '',
      'createdby': this.userId,
      'empImage': '',
      'isMailSent': false,
      "phonenumber": object.phoneNo1.length > 6 ? (object.callingCode + ' ' + object.phoneNo1.trim()) : '',
      'protectionLevel': parseInt(object.protectionLevel),
      'inTIme': object.inTime,
      'outTime': object.outTime
    };
    return this.httpClient.post<Response>(addClientUrl, body);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : Api for update employee data
  */
  updateEmployee(object, empId, isMailSent) {
    this.removeSpace(object);
    const updateClientUrl = this.baseUrl + ApiURL.Employee + this.userId;
    let currentSalary = object.currentSalary + '';
    currentSalary = currentSalary.replace(/[^0-9.]/g, '');
    const body = {
      'empId': parseInt(empId),
      'employeeId': object.employeeId,
      'firstname': object.firstName.charAt(0).toUpperCase() + object.firstName.slice(1),
      'middlename': object.middleName || '',
      'lastname': object.lastName.charAt(0).toUpperCase() + object.lastName.slice(1),
      'suffix': object.suffix || 0,
      'companyid': parseInt(object.client),
      'email': object.emailAddress || '',
      'jobtitle': object.position,
      'joiningdate': this.customValidation.changeDateFormat(object.dateOfHire),
      'workCity': object.city,
      'workState': object.state,
      'workZipcode': object.zip,
      'departmentId': parseInt(object.departmentName) || 5,
      'managerid': object.manager || 0,
      'managerFName': '',
      'managerLName': '',
      'empstatus': parseInt(object.employeeStatus),
      'roleid': parseInt(object.triggerRole),
      'dateOfBirth': this.customValidation.changeDateFormat(object.dateOfBirth) || '01-01-1900 12:00:00',
      'raceorethanicityid': parseInt(object.ethnicity) || 0,
      'jobGroup': object.jobGroup || '',
      'gender': object.gender || '',
      'empLocation': object.locationName || '',
      'jobcategoryid': 0,
      'jobcategory': object.jobCategory || '',
      'jobcodeid': 0,
      'jobcode': object.jobCode || '',
      'lastPromodate': this.customValidation.changeDateFormat(object.dateInPosition) || '01-01-1900 12:00:00',
      'currentSalary': currentSalary || 0,
      'lastincdate': this.customValidation.changeDateFormat(object.dateOfLastSalaryIncrease) || '01-01-1900 12:00:00',
      'countryid': parseInt(object.countryName) || 0,
      'regionid': parseInt(object.region) || 0,
      'empimgpath': '',
      'updatedBy': this.userId,
      'empImage': '',
      'isMailSent': isMailSent,
      "phonenumber": object.phoneNo1.length > 6 ? (object.callingCode + ' ' + object.phoneNo1.trim()) : '',
      'protectionLevel': parseInt(object.protectionLevel),
      'inTIme': object.inTime,
      'outTime': object.outTime
    };
    return this.httpClient.put<Response>(updateClientUrl, body);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : Api for get employee data by employee id for normal case Admin, Manager, Executive : 
  */
  getEmployeeById(employeeId): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.Employee + employeeId);
  }

  /**
 * Author : Mihir Patel
 * Created-Date :  22-2-2019
 * Description : Api for get employee data by Company id and Employee id for Trigger admin case : 
 */
  getTriggerEmployeeById(companyId, employeeId): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.Employees + companyId + '/' + employeeId);
  }

  /**
 * Author : Anjali Tandel
 * modified-by: Mihir Patel
 * Modified-Date :  22-2-2019
 * Description : Api for get Admin data by Admin id
 */
  getAdminById(clientId, adminId): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.Admin + clientId + '/' + adminId);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : Api for get department by client id
  */
  getDepartmentByClientId(clientId): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.Department + clientId);
  }

  /**
  * Author : Mihir Patel
  * Created-Date :  22-04-2019
  * Description : Api for update salary
  */
  updateSalary(companyId: number, empId: number, newSalary: number, userId: number): Observable<Response> {
    const updateSalaryUrl = this.baseUrl + ApiURL.ChangeEmpSalary + userId;
    const slaryObj = {
      'companyid': companyId,
      'empId': empId,
      'currentsalary': newSalary,
      'updatedBy': userId
    }
    return this.httpClient.put<Response>(updateSalaryUrl, slaryObj);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 16-05-2019
   * Description : Created method for split Calling-code and phone-number which we are getting form API response
   */
  public splitContactNumber(number: string): ContactNumber {
    let contactNumber = new ContactNumber();
    if (number) {
      let getPhonenumber = number.split(' ')
      contactNumber.callingCode = getPhonenumber[0];
      contactNumber.phoneNumber = getPhonenumber[1];
    }
    return contactNumber
  }

  public getCallingcode(): Observable<CountryCallinCodeModel> {
    const callingCode = 'https://restcountries.eu/rest/v2/all';
    return this.httpClient.get<CountryCallinCodeModel>(callingCode);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 26-02-2020
   * Description : Api for get protection-levels by client id
   */
  public getProtectionLevel(clientId: number): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.DimensionElements + clientId + '/' + ApiURL.Dimension + '/' + Dimension.ProtectionLevel);
  }


  public getEmployeeDatewiseEvaluation(empId, evaluationDate, dashboardTypeId): Observable<any> {
    this.globalResponseHandlerService.encriptData(Version.Version2, Encryption.Version, Encryption.VersionKey);
    const url = `EmployeeDatewiseEvaluation/${empId}/?fromDate=${evaluationDate.fromDate}&toDate=${evaluationDate.toDate}&dashboardId=${dashboardTypeId}`;
    return this.httpClient.get<any>(this.baseUrl + url);
  }
}
