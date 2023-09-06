/**
@author : Anjali Tandel
@class : ActionPermissionService
@description : ActionPermissionService common service for created to validate permission (spark - view/add/edit/delete, comment - edit/delete).
**/
import { Injectable } from '@angular/core';
import { Permission, ActionsPermission } from '../../magic-string/permission.model';
//import { EmployeeList } from '../../../employees/employee-model';
import { GlobalResponseHandlerService } from '../../global-response-handler/global-response-handler';
import { Encryption } from '../../magic-string/common-validation-model';
import { Relation, Dimension, DepartmentType, Actions, TeamType, Role, ProtectionLevel } from '../../magic-string/common.model';
import { UserModel } from '../../model/user';
import { TeamMembers } from '../../../employees/team-member/team-member-model';

export const canAdd = 'canAdd';
export const canView = 'canView';
export const canEdit = 'canEdit';
export const canDelete = 'canDelete';
@Injectable()
export class ActionPermissionService {
  /** store actionpermissions which we get from login response */
  public actionPermission: Permission[];
  /** user-model created for store login information */
  public user: UserModel;
  /** employee-model created for store employee-relation,department-id */
  public employee: TeamMembers;

  constructor(
    private globalResponseHandlerService: GlobalResponseHandlerService
  ) {
    this.actionPermission = this.getActionPErmission();
    this.user = this.globalResponseHandlerService.getUser();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 30-08-2019
   * Descriotion : Get all actions-permissions which we configured & data are getting from login response.
   */
  public getActionPErmission(): Permission[] {
    let actionPermission: Permission[];
    if (!!this.globalResponseHandlerService.decriptData(Encryption.ActionPermissionMessage, Encryption.ActionPermissionKey)) {
      actionPermission = JSON.parse(this.globalResponseHandlerService.decriptData(Encryption.ActionPermissionMessage, Encryption.ActionPermissionKey));
    }
    return actionPermission;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 30-08-2019
   * Descriotion : Check action-permission role-configuration.
   */
  private isRoleConfigured(roleActionPermission: ActionsPermission[], permission: string): boolean {
    let role: ActionsPermission = roleActionPermission.find(a => a.dimensionId === Dimension.Role);
    if (role && role[permission]) {
      return true
    } else {
      return false
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 30-08-2019
   * Descriotion : Check action-permission relation-configuration.
   */
  private isRelationConfigured(relationConfiguration: ActionsPermission[], permission: string): boolean {
    let relation: ActionsPermission = relationConfiguration.find(a => a.dimensionId === Dimension.Relation && a.dimensionValueid === this.employee.empRelation);
    if (relation && relation[permission]) {
      return true
    } else {
      return false
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 30-08-2019
   * Descriotion : Check action-permission department-configuration.
   */
  private isDepartmentConfigured(departmentConfiguration: ActionsPermission[], permission: string): boolean {
    let department: ActionsPermission[] = departmentConfiguration.filter(a => a.dimensionId === Dimension.Department);
    let insideDepartment: ActionsPermission = department.find(a => a.dimensionValueid === DepartmentType.Inside);
    let outsideDepartment: ActionsPermission = department.find(a => a.dimensionValueid === DepartmentType.Outside);
    if (outsideDepartment && outsideDepartment[permission] && this.user.departmentId !== this.employee.departmentId) {
      return true;
    } else if (insideDepartment && insideDepartment[permission] && this.user.departmentId === this.employee.departmentId) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 27-09-2019
   * Descriotion : Check action-permission team-configuration.
   */
  private isTeamConfigured(teamConfiguration: ActionsPermission[], permission: string): boolean {
    let teams: ActionsPermission = teamConfiguration.find(a => a.dimensionId === Dimension.Team && a.dimensionValueid === this.employee.teamType);
    if (teams && teams[permission]) {
      return true
    } else {
      return false
    }
  }

  public checkSparkPermission(permission: string, employee) {
    if (employee.empStatus && employee.empId !== this.user.empId) {
      if (this.user.roleId === Role.TriggerAdmin || this.user.roleId === Role.Admin) {
        return true;
      } else if (this.user.roleId === Role.Admin && permission === canView) {
        return true;
      } else if (this.user.roleId === Role.Admin && employee.empRelation === Relation.Direct) {
        return true;
      } else if (this.commonCheckActionPermission(Actions.SparkAnEmployee, permission, employee)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 04-03-2020
   * Descriotion : Check action-permission based on configured protection-level/relation/department/teams.
   */
  public commonCheckActionPermission(actionId: number, permission: string, employee: any): boolean {
    this.employee = employee;
    let Permission: Permission = this.actionPermission.find(a => a.actionId === actionId);
    if (Permission) {
      let actionPermission: ActionsPermission[] = Permission.actionPermissions;
      if (this.isProtectionLevelConfigured(actionPermission, permission)) {
        if (this.isRelationConfigured(actionPermission, permission)) {
          return true;
        } else if (this.isDepartmentConfigured(actionPermission, permission)) {
          return true;
        } else if (this.isTeamConfigured(actionPermission, permission)) {
          return true;
        } else if (this.isRoleProtectionLevelConfigured(actionPermission) && this.setDefaultConfiguration(actionId)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private setDefaultConfiguration(actionId: number): boolean {
    if (actionId === Actions.TriggerAnEmployee) {
      if (this.employee.empRelation === Relation.Direct && (this.user.roleId === Role.Executive || this.user.roleId === Role.Manager || this.user.roleId > 5)) {
        return true;
      } else {
        return false;
      }
    } else if (actionId === Actions.SummaryReporting
      || actionId === Actions.DetailReporting
      || actionId === Actions.ContextualReporting
      || actionId === Actions.ScoreReporting) {
      if (this.user.roleId === Role.Executive ||
        ((this.user.roleId === Role.Manager || this.user.roleId > 5) && this.employee.empRelation === Relation.Direct)) {
        return true;
      } else {
        return false;
      }
    } else if (this.employee.empRelation === Relation.Direct) {
      return true;
    } else {
      return false;
    }
  }

  public checkRoleBasedPermission(actionId: number, permission: string): boolean {
    let Permission: Permission = this.actionPermission.find(a => a.actionId === actionId);
    if (Permission) {
      let actionPermission: ActionsPermission[] = Permission.actionPermissions;
      if (this.isRoleConfigured(actionPermission, permission)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isAddTriggerAnEmployee(actionId: number, permission: string, employee): boolean {
    if (employee.empStatus && employee.empId !== this.user.empId) {
      if (this.user.roleId === Role.Admin && employee.empRelation === Relation.Direct) {
        return true;
      } else if (this.commonCheckActionPermission(actionId, permission, employee)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isDisplyEmployeeDashboard(employee): boolean {
    if (this.isViewEmployeeDashboard(Actions.SummaryReporting, canView, employee)
      || this.isViewEmployeeDashboard(Actions.DetailReporting, canView, employee)
      || this.isViewEmployeeDashboard(Actions.ContextualReporting, canView, employee)
      || this.isViewEmployeeDashboard(Actions.ScoreReporting, canView, employee)) {
      return true;
    } else {
      return false;
    }
  }

  public isViewEmployeeDashboard(actionId: number, permission: string, employee): boolean {
    if (employee.empStatus && employee.empId !== this.user.empId) {
      if (this.user.roleId === Role.Admin) {
        return true;
      } else if (this.commonCheckActionPermission(actionId, permission, employee)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 01-06-2022
   * Descriotion : Check action-permission protection-level-configuration.
   */
  public isCheckCommonPermission(actionId, permission: string): boolean {
    let Permission: Permission = this.actionPermission.find(a => a.actionId === actionId);
    let actionPermission: ActionsPermission[]
    if (Permission) {
      actionPermission = Permission.actionPermissions;
      let protectionLevel: ActionsPermission = actionPermission.find(a => a.dimensionId === Dimension.ProtectionLevel);
      if (protectionLevel && protectionLevel[permission]) {
        return true;
      } else {
        return false;
      }
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 03-03-2020
   * Descriotion : Check action-permission protection-level-configuration.
   */
  private isProtectionLevelConfigured(protectionLevelConfiguration: ActionsPermission[], permission: string): boolean {
    let protectionLevel: ActionsPermission = protectionLevelConfiguration.find(a => a.dimensionId === Dimension.ProtectionLevel && a.dimensionValueid === this.employee.protectionLevel);
    if (protectionLevel && protectionLevel[permission]) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 03-03-2020
   * Descriotion : Check if action-permission of Relation/Teams/Departments configuration.
   */
  private isRoleProtectionLevelConfigured(relationConfiguration: ActionsPermission[]): boolean {
    let isConfigured: ActionsPermission = relationConfiguration.find(a => a.dimensionId === Dimension.Relation || a.dimensionId === Dimension.Department || a.dimensionId === Dimension.Team);
    if (!isConfigured) {
      return true;
    } else {
      return false;
    }
  }
}
