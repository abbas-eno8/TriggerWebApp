/**
@author : Anjali Tandel
@class : TeamMemberContainer
@description : TeamMemberContainer is parent presentation for team-member-list-module.
**/
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee-service/employee.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { UserModel } from '../../../core/model/user';
import { Role, CompareString, ApiResponse, False, True } from '../../../core/magic-string/common.model';
import { Session } from '../../../core/magic-string/common-validation-model';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
import { ActionPermissionService } from '../../../core/services/action-permission/action-permission.service';
import { TeamMemberService } from '../team-member-service/team-member.service';
import { Department, ColumnConfiguration, SendMail } from '../team-member-model';
import { LoaderService } from '../../../core/loader/loader.service';
import { MatDialog } from '@angular/material';
import { SortByFieldService } from '../../../shared/services/sort-by-field/sort-by-field.service';
import { SortByDepartment } from '../../../shared/modals/shared-model';
import { Permission } from '../../../core/magic-string/permission.model';
import { Observable } from 'rxjs';
import { CommonService } from '../../../core/services/common/common.service';
import { TeamMembersAdapter } from '../team-member-adapter/team-member-adapter';

@Component({
  selector: 'trigger-team-member-container',
  templateUrl: './team-member.container.html'
})
export class TeamMemberContainer implements OnInit {
  public user: UserModel;
  /** This is a variable which have departmentes to its presentation */
  public departments: Department[];
  /** This is a observable of calling sync API which passes the list of team-members to its presentation */
  public employees$: Observable<ApiResponse>;
  /** This is a observable of calling sync API which passes the list of columns to its presentation */
  public customColumn$: Observable<ApiResponse>;
  /** selectedYear variable have selected year when use redirected from Dashboard */
  public selectedYear: number;
  /** apiCalledSuccess variable is using in presentation where deleting or send mail to team-member */
  public apiCalledSuccess: boolean;
  constructor(
    private adapter: TeamMembersAdapter,
    private actionPermissionService: ActionPermissionService,
    private commonService: CommonService,
    private employeeService: EmployeeService,
    private globalEventsManager: GlobalEventsManager,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private matDialog: MatDialog,
    private loaderService: LoaderService,
    private teamMemberService: TeamMemberService,
    private sortByFieldService: SortByFieldService,
  ) {
    this.apiCalledSuccess = false;
    this.loaderService.emitIsLoaderShown(true);
  }

  ngOnInit() {
    this.getUser();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : This Method created for getting user-details.
   */
  private getUser(): void {
    this.user = this.globalResponseHandlerService.getUser();
    if (this.user.roleId > Role.Admin) {
      this.checkPermission();
    } else {
      this.getMembers();
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : This Method is invoke when user check permission from server.
   */
  private checkPermission(): void {
    let actionPermission: Permission[] = this.actionPermissionService.getActionPErmission();
    this.employeeService.checkPermission(actionPermission, this.user.empId).subscribe(
      (permissionResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(permissionResponse, false, false)) {
          this.getMembers();
        }
      });
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : This Method is invoke when user get team-members from server.
   */
  private getMembers(): void {
    this.customColumn$ = this.teamMemberService.getCustomColumn(this.user.clientId, this.user.roleId === Role.TriggerAdmin ? 0 : this.user.empId);
    let sessionQueryString = sessionStorage.getItem(Session.TeamMemberQueryString);
    if (!!sessionQueryString) {
      this.employees$ = this.teamMemberService.getDashboardTeamMembers(sessionQueryString);
    } else {
      this.getDepartments();
    }
    /** This event is for getting latest notifications */
    this.globalEventsManager.getNotification(true);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : This Method is invoke when user get departments from server.
   */
  private getDepartments(): void {
    this.teamMemberService.getDepartmentByClientId(this.user.clientId).subscribe(
      (responseOfDept) => {
        if (this.globalResponseHandlerService.getApiResponse(responseOfDept, false, false)) {
          this.departments = responseOfDept.data;
          this.departments = this.sortByFieldService.sortByField(this.departments, SortByDepartment);
          let selectedDepartmentIds = this.departments.map(x => x.id);
          this.getTeamMembersBasedOnDepartments(selectedDepartmentIds);
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : This Method created for get team-members based on departments.
   */
  private getTeamMembersBasedOnDepartments(selectedDepartmentIds: number[]) {
    let apiQueryString: string = '';
    if (this.user.roleId === Role.TriggerAdmin) {
      apiQueryString = '?CompanyId=' + this.user.clientId + '&DepartmentList=' + selectedDepartmentIds.join();
    } else {
      apiQueryString = '?CompanyId=' + this.user.clientId + '&ManagerId=' + this.user.empId * -1 + '&DepartmentList=' + selectedDepartmentIds.join();
    }
    this.employees$ = this.teamMemberService.getTeamMembers(apiQueryString);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : This Method is invoke when user delete team-members from server.
   */
  public deleteTeamMember(empId: number): void {
    this.apiCalledSuccess = false;
    this.commonService.deleteEmployeeById(this.user.clientId, empId, this.user.userId).subscribe(
      (deleteEmployeeByIdresponse) => {
        if (this.globalResponseHandlerService.getApiResponse(deleteEmployeeByIdresponse, true, false)) {
          this.matDialog.closeAll();
          this.apiCalledSuccess = true;
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : This Method is invoke when user send-mail to team-members from server.
   */
  public sendMail(ids: string): void {
    let sendMailObj: SendMail = this.adapter.sendMail(ids, this.user.clientId);
    this.apiCalledSuccess = false;
    this.teamMemberService.sendEmail(this.user.userId, sendMailObj).subscribe((sendEmailResponse) => {
      if (this.globalResponseHandlerService.getApiResponse(sendEmailResponse, true, true)) {
        this.apiCalledSuccess = true;
      }
    })
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : This Method is invoke when user configured columns for team-members from server.
   */
  public columnConfiguration(object: ColumnConfiguration[]): void {
    this.teamMemberService.customColumnConfiguration(object).subscribe(
      (columnConfigurationresponse) => {
        if (this.globalResponseHandlerService.getApiResponse(columnConfigurationresponse, true, true)) {
          this.customColumn$ = this.teamMemberService.getCustomColumn(this.user.clientId, this.user.roleId === Role.TriggerAdmin ? 0 : this.user.empId);
        }
      }
    );
  }

  ngOnDestroy() {
    sessionStorage.setItem(Session.TeamMemberQueryString, '');
  }
}
