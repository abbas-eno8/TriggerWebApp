import { Validator } from "../core/magic-string/common.model";
import { NumericPattern, IgnoreSpaceInitial, AlphabaticNumeric } from "../core/magic-string/Regex-pattern";

/**
@author : Anjali Tandel
@class : Teams-model 
@description : Create model for request-response model & contast values.
**/
/** Create model for teams-list-response-model */
export class ResponseModel {
    public teamId: number = 0
    public team: string = ''
    public startDate: string = ''
    public endDate: string = ''
    public activityDays: string = ''
    public createdBy: string = ''
    public createdByLastName: string = ''
    public status: string = ''
    public isActive: boolean = false
    public managers: string = ''
    public managerIds: string = ''
    public isEditable: boolean = false
    public isDeletable: boolean = false
    constructor(
        teamId: number = 0,
        name: string = '',
        startDate: string = '',
        endDate: string = '',
        triggerActivityDays: number = 0,
        createdByFName: string = '',
        createdByLName: string = '',
        status: boolean = true,
        managers: string = '',
        managerIds: string = '') {
        this.teamId = teamId;
        this.team = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.activityDays = triggerActivityDays + '';
        this.createdBy = createdByFName ? createdByFName + ' ' + createdByLName : 'Truvelop Admin';
        this.createdByLastName = createdByLName;
        this.status = status ? 'Active' : 'Inactive';
        this.isActive = status;
        this.managers = managers;
        this.managerIds = managerIds;
    }
}
/** Create model for teams-list-request-model */
export class RequestModel {
    public teamId: number = 0
    public name: string = ''
    public description: string = ''
    public startDate: Date
    public endDate: Date
    public activityDays: number = 0
    public status: boolean = true
    public createdBy: number = 0
    public updatedBy: number = 0
    public teamManagers: TeamManager[]
    public teamEmployees: TeamEmployee[]
    constructor(
        teamId: number = 0,
        team: string = '',
        description: string = '',
        startDate: Date,
        endDate: Date,
        triggerActivityDays: number = 0,
        status: boolean = true,
        createdBy: number = 0,
        updatedBy: number = 0,
        teamManagers: TeamManager[],
        teamEmployees: TeamEmployee[]) {
        this.teamId = teamId;
        this.name = team;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.activityDays = triggerActivityDays;
        this.status = status;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.teamManagers = teamManagers;
        this.teamEmployees = teamEmployees;
    }
}
/** Create model for teams-form-response-model */
export class TeamsResponseModel {
    public teamId: number = 0
    public name: string = ''
    public description: string = ''
    public startDate: Date
    public endDate: Date
    public triggerActivityDays: number = 0
    public status: string = ''
    public createdBy: number = 0
    public updatedBy: number = 0
    public teamManagers: TeamManager[]
    public teamEmployees: TeamEmployee[]
    constructor(
        teamId: number = 0,
        name: string = '',
        description: string = '',
        startDate: string = '',
        endDate: string = '',
        triggerActivityDays: number = 0,
        status: boolean = false,
        teamManagers: TeamManager[],
        teamEmployees: TeamEmployee[]) {
        this.teamId = teamId;
        this.name = name;
        this.description = description;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.triggerActivityDays = triggerActivityDays;
        this.status = status + '';
        this.teamManagers = teamManagers;
        this.teamEmployees = teamEmployees;
    }
}
/** Create model for teams-form-request-model */
export class TeamsRequestModel {
    public teamId: number = 0
    public name: string = ''
    public description: string = ''
    public startDate: string = ''
    public endDate: string = ''
    public triggerActivityDays: number = 0
    public status: boolean = true
    public createdBy: number = 0
    public updatedBy: number = 0
    public teamManagers: TeamManager[]
    public teamEmployees: TeamEmployee[]
    constructor(
        teamId: number = 0,
        name: string = '',
        description: string = '',
        startDate: string = '',
        endDate: string = '',
        triggerActivityDays: string = '',
        status: string = '',
        createdBy: number = 0,
        updatedBy: number = 0,
        teamManagers: TeamManager[],
        teamEmployees: TeamEmployee[]) {
        this.teamId = teamId;
        this.name = name.trim();
        this.description = description.trim();
        this.startDate = startDate;
        this.endDate = endDate;
        this.triggerActivityDays = parseInt(triggerActivityDays);
        this.status = status === 'true' ? true : false;
        this.teamManagers = teamManagers;
        this.teamEmployees = teamEmployees;
    }
}
/** Create model for TeamManager*/
export class TeamManager {
    public id: number = 0
    public managerId: number = 0
    public name: string = ''
    public createdBy: number = 0
    public updatedBy: number = 0
    public isDisabled?: boolean
    constructor(
        id: number = 0,
        empId: number = 0,
        firstName: string = '',
        lastName: string = '',
        createdBy: number = 0,
        updatedBy: number = 0) {
        this.id = id;
        this.managerId = empId;
        this.name = firstName + ' ' + lastName;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.isDisabled = false;
    }
}
/** Create model for TeamEmployee*/
export class TeamEmployee {
    public id: number = 0
    public empId: number = 0
    public name: string = ''
    public createdBy: number = 0
    public updatedBy: number = 0
    public isDisabled?: boolean
    constructor(
        id: number = 0,
        empId: number = 0,
        firstName: string = '',
        lastName: string = '',
        createdBy: number = 0,
        updatedBy: number = 0) {
        this.id = id
        this.empId = empId,
            this.name = firstName + ' ' + lastName
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.isDisabled = false;
    }
}
/** Create fieldValidator for team-form-validation  */
export const fieldValidator: Validator[] = [
    { id: 1, key: 'name', value: '', name: 'Team Name', isMandatory: true, minLength: 1, maxLength: 50, pattern: AlphabaticNumeric },
    { id: 1, key: 'triggerActivityDays', value: '', name: 'Evaluation Activity', isMandatory: true, minLength: 1, maxLength: 5, pattern: NumericPattern, },
    { id: 2, key: 'startDate', value: '', name: 'Start Date', isMandatory: true, isDate: true },
    { id: 2, key: 'endDate', value: '', name: 'End Date', isMandatory: true, isDate: true },
    { id: 2, key: 'selectedTeamEmployees', value: '', name: 'Members', isMandatory: true, isSelectDropdown: true },
    { id: 2, key: 'selectedTeamManagers', value: '', name: 'Managers', isMandatory: true, isSelectDropdown: true },
    { id: 2, key: 'description', value: '', name: 'Description', isMandatory: true, minLength: 1, maxLength: 150, pattern: IgnoreSpaceInitial },
];
/** Create constant for Search-field of Desktop & accrodian view */
export const TeamsSearchFieldDesktopView = ['team', 'startDate', 'endDate', 'createdBy', 'managers', 'activityDays', 'status', 'action'];
export const TeamsSearchFieldAccrodianView = ['team', 'managers'];
/** Create constant for team */
export const Team = 'Team';
/** Create constant for add team */
export const AddTeam = 'Add Team';
/** Create constant for edit team */
export const EditTeam = 'Edit Team';
/** Create constant for team */
export const TeamsManagersPlaceHolder = 'Add Manager/Executive';
/** Create constant for team */
export const TeamsMembersPlaceHolder = 'Add Members';