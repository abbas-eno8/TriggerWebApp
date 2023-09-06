import { Injectable } from "@angular/core";
// -------------------------------------------------------- //
import { GlobalResponseHandlerService } from "../../../core/global-response-handler/global-response-handler";
import { ActionPermissionService, canAdd } from "../../../core/services/action-permission/action-permission.service";
import { Adapter } from "../../../core/adapter/adpater";
import { Actions, ApiResponse, Role } from "../../../core/magic-string/common.model";
import {
    TeamMembers, Department, TeamMemberColumns, CustomColumn, ColumnConfiguration, DimensionList,
    DimensionElementList, SendMail
} from "../team-member-model";
/**
 * @author Anjali Tandel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

@Injectable()
export class TeamMembersAdapter implements Adapter<ApiResponse, TeamMembers, TeamMembers> {

    private isPermission: boolean;

    constructor(
        private actionPermissionService: ActionPermissionService,
        private globalResponseHandlerService: GlobalResponseHandlerService
    ) {
        this.isPermission = this.globalResponseHandlerService.getUser().roleId === Role.TriggerAdmin || this.globalResponseHandlerService.getUser().roleId === Role.Admin ? true :
            this.actionPermissionService.isCheckCommonPermission(Actions.TriggerAnEmployee, canAdd) ? true : false;
    }

    public toResponse(response: any): ApiResponse {
        const teamMembers: ApiResponse = new ApiResponse(
            response.data = response.data.length > 0 ? this.bindTeamMembers(response.data) : [],
            response.status,
            response.message,
        );
        return teamMembers;
    }

    public bindTeamMembers(data: any): TeamMembers[] {
        let team: TeamMembers[];
        team = data.map(e => (
            this.bindTeamMember(e)
        ));
        return team;
    }

    public bindTeamMember(member: any): TeamMembers {
        const members: TeamMembers = new TeamMembers(
            member.isPasswordGenerated,
            member.empId,
            member.employeeId,
            member.firstName,
            member.lastName,
            member.email,
            member.managerFName,
            member.managerLName,
            member.jobTitle,
            member.department,
            member.lastAssessedDate,
            member.managerLastAssessedDate,
            member.ratingCompleted,
            member.ratingCompletedCurrentYear,
            member.avgScoreRank,
            member.lastScoreRank,
            member.currentSalary,
            member.departmentId,
            member.roleId,
            member.managerId,
            member.empRelation,
            member.teamType,
            member.protectionLevel,
            member.empStatus,
            member.isMailSent,
            member.sendSpark,
            member.sendTrigger,
            member.noOfSpark,
            member.lastSparkDate,
            member.isTriggerSent,
            member.managerAction,
            member.scoreSummary,
            member.trending
        );
        return members;
    }

    public departmentResponse(response: any): ApiResponse {
        const departments: ApiResponse = new ApiResponse(
            response.data = response.data.length > 0 ? this.bindDepartments(response.data) : [],
            response.status,
            response.message,
        );
        return departments;
    }

    public bindDepartments(departments: any): Department[] {
        let department: Department[];
        department = departments.map(e => (
            this.bindDepartment(e)
        ));
        return department;
    }

    public bindDepartment(department: any): Department {
        const dept: Department = new Department(
            department.departmentId,
            department.department
        );
        return dept;
    }

    public customColumnResponse(response: any): ApiResponse {
        const departments: ApiResponse = new ApiResponse(
            response.data = response.data.length > 0 ? this.bindCustomColumns(response.data) : [],
            response.status,
            response.message,
        );
        return departments;
    }

    public bindCustomColumns(customColumns: any): TeamMemberColumns[] {
        let columns: TeamMemberColumns[];

        if (this.isPermission) {
            columns = customColumns.map(e => (
                this.bindCustomColumn(e)
            ));
        } else {
            customColumns = customColumns.filter((e) => e.columnId === 1 || e.columnId === 2 ||
                e.columnId === 3 || e.columnId === 4 || e.columnId === 5);

            columns = customColumns.map(e => (
                this.bindCustomColumn(e)
            ));
        }

        return columns;
    }

    public bindCustomColumn(customColumn: any): TeamMemberColumns {
        let getProperty = CustomColumn.find(c => c.id === customColumn.columnId);
        const column: TeamMemberColumns = new TeamMemberColumns(
            customColumn.empId,
            customColumn.columnId,
            getProperty.property,
            customColumn.displayColumn,
            customColumn.columnSequence,
            this.isPermission ? customColumn.isSelected : true,
            getProperty.widthClass
        );
        return column;
    }

    public columnConfigurationToResponse(customColumns: TeamMemberColumns[], createdBy: number): ColumnConfiguration[] {
        let columns: ColumnConfiguration[];
        columns = customColumns.map((e, index) => (
            new ColumnConfiguration(
                e.empId,
                e.columnId,
                index + 1,
                createdBy,
            )
        ));
        return columns;
    }

    public toElementResponse(response: any): ApiResponse {
        const teamMembers: ApiResponse = new ApiResponse(
            response.data = response.data.length > 0 ? this.bindDimensions(response.data) : [],
            response.status,
            response.message,
        );
        return teamMembers;
    }

    public bindDimensions(data: any): DimensionList[] {
        let team: DimensionList[];
        team = data.map(e => (
            this.bindDimension(e)
        ));
        return team;
    }

    public bindDimension(dimension: any): DimensionList {
        const dimensionElement: DimensionList = new DimensionList(
            dimension.dimensionId,
            dimension.dimensionName,
            this.bindDimensionsElements(dimension.dimensionElements)
        );
        return dimensionElement;
    }

    public bindDimensionsElements(elements: any): DimensionElementList[] {
        let team: DimensionElementList[];
        team = elements.map(e => (
            this.bindDimensionsElement(e)
        ));
        return team;
    }

    public bindDimensionsElement(dimension: any): DimensionElementList {
        const dimensionElement: DimensionElementList = new DimensionElementList(
            dimension.elementName,
            dimension.elementId,
            false
        );
        return dimensionElement;
    }

    public sendMail(ids: string, clientId: number): SendMail {
        const dimensionElement: SendMail = new SendMail(
            ids,
            clientId
        );
        return dimensionElement;
    }

}
