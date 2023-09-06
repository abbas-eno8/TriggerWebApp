/**
@author : Anjali Tandel
@class : DepartmentService
@description :DepartmentService is created for add, edit, delete, view department related operations.
**/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//  ................................................ //
import { environment } from '../../../environments/environment';
import { Response } from '../../core/common.response';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { ApiURL } from '../../core/magic-string/common.model';

@Injectable()
export class DepartmentService {
  private baseUrl : string
  public userData: any;
  public userId: any;

  constructor(
    private httpClient: HttpClient,
    private globalResponseHandlerService: GlobalResponseHandlerService
  ) {
    this.baseUrl =  environment.baseUrl;
    this.callGetUserData();
  }

  /**
  * Author : Sonal Patil
  * Modified-Date :  18-12-2018
  * Descriotion : Create method for get all Department.
  */
  callGetUserData() {
    this.userData = this.globalResponseHandlerService.getUserData();
    this.userId = this.userData.userId;
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  18-12-2018
  * Descriotion : Create method for get all Department.
  */
  getDepartment(clientId): Observable<Response> {
    const getDepartmentUrl = this.baseUrl + ApiURL.Department + clientId;
    return this.httpClient.get<Response>(getDepartmentUrl);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  18-12-2018
  * Descriotion : Create method for Add new Department.
  */
  addDepartment(departmentName: string, clientId: number): Observable<Response> {
    const addDeptUrl = this.baseUrl + ApiURL.Department;
    const body = {
      createdBy: this.userId,
      department: departmentName,
      companyId: clientId,
      sendTrigger: false,
      sendSpark: false,
    };
    return this.httpClient.post<Response>(addDeptUrl, body);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  18-12-2018
  * Descriotion : Create method for Update Department.
  */
  updateDepartment(department): Observable<Response> {
    const updateDeptUrl = this.baseUrl + ApiURL.Department;
    const body = {
      updatedBy: this.userId,
      departmentId: parseInt(department.departmentId),
      department: department.departmentName,
      companyId: department.clientId,
      sendTrigger: department.sendTrigger === true ? 1 : 0,
      sendSpark: department.sendSpark === true ? 1 : 0,
    };
    return this.httpClient.put<Response>(updateDeptUrl, body);
  }


  /**
  * Author : Anjali Tandel
  * Modified-Date :  18-12-2018
  * Descriotion : Create method for Delete Department.
  */
  deleteDepartment(departmentId: number, clientId: number): Observable<Response> {
    const getdeleteDeptUrl = this.baseUrl + ApiURL.Department + clientId + '/' + departmentId + '/' + this.userId;
    return this.httpClient.delete<Response>(getdeleteDeptUrl);
  }

}
