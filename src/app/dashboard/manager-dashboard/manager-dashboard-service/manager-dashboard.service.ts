import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// ------------------------------------- //
import { environment } from '../../../../environments/environment';
import { ApiURL } from '../../../core/magic-string/common.model';
import { Response } from '../../../../app/core/common.response';

@Injectable()
export class ManagerDashboardService {
  //  Get base url : 
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  /**
    * Author : Mihir Patel
    * Modified-Date :  19-12-2018
    * Description : For get manager dashboard data by selected department.
 */
  getManagerDashboardByDepartment(companyId, managerId, year, arrayOfId): Observable<Response> {
    const managerDashboardByDepartmentObj = {
      companyId,
      managerId,
      YearId: year,
      DepartmentList: arrayOfId
    }
    const getManagerDashboardByDepartmentUrl = this.baseUrl + ApiURL.Dashboard
    return this.httpClient.post<Response>(getManagerDashboardByDepartmentUrl, managerDashboardByDepartmentObj);
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  09-01-2019
   * Description : For get year.
*/
  getDepartmentByYear(companyId, year): Observable<Response> {
    const getDepartmentByYear = this.baseUrl + ApiURL.Department + companyId + '/' + year;
    return this.httpClient.get<Response>(getDepartmentByYear);
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  09-01-2019
   * Description : For get year.
*/
  getYear(companyId, loginEmpId): Observable<Response> {
    const getManagerDashboardByDepartmentUrl = this.baseUrl + ApiURL.AssessmentYear + companyId + '/' + loginEmpId;
    return this.httpClient.get<Response>(getManagerDashboardByDepartmentUrl);
  }

  /**
    * Author : Mihir Patel
    * Modified-Date :  19-12-2018
    * Description : Store static widget position into array for get default value, which is used to pass widget api when all widget unchecked from right bar.
 */
  getDefaultWidgetPosition(userId) {
    const widgetArray = [
      {
        "userId": userId,
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
        "userId": userId,
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
        "userId": userId,
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
        "userId": userId,
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
        "userId": userId,
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
        "userId": userId,
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
        "userId": userId,
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
        "userId": userId,
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
        "userId": userId,
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
        "userId": userId,
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
        "userId": userId,
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
        "userId": userId,
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
      },
      {
        "userId": userId,
        "widgetId": "26",
        "widgetName": "my-direct-work-location-history",
        "widgetActualName": "Work Location Information of My Direct Reports",
        "sequenceNumber": 13,
        "tileSequence": 13,
        "position": 0.0,
        "isActive": false,
        "isSelected": 0,
        "roleId": 0,
        "createdBy": 0,
        "result": 0
      }
    ]
    return widgetArray;
  }

}
