/**
@author : Anjali Tandel
@class : TeamsFormPresenter
@description : TeamsFormPresenter is created for perform UI & bussiness logic of teams-form module.
**/
import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { fieldValidator, TeamManager, TeamEmployee, TeamsResponseModel, RequestModel, TeamsRequestModel } from '../../teams-model';
import { CustomFieldValidation } from '../../../shared/Validation/field-validation';
import { NumericPattern, IgnoreSpaceInitial, AlphabaticNumeric } from '../../../core/magic-string/Regex-pattern';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { CustomValidation } from '../../../shared/Validation/custom.validation';
import { True, Route, CompareString, Actions, Role } from '../../../core/magic-string/common.model';
import { Subject, Observable } from 'rxjs';
import { TeamsFormAdapter } from '../../teams-adapter/teams-adapter';
import { ErrorMessage } from '../../../core/magic-string/common-validation-model';
import { Router } from '@angular/router';
import { DatexPipe } from '../../../shared/pipes/date-pipe/date-pipe';
import * as moment from 'moment';
import { ActionPermissionService, canDelete } from '../../../core/services/action-permission/action-permission.service';

@Injectable()
export class TeamsFormPresenter {
  /** This property is used for creating team-form.  */
  public teamsForm: FormGroup;
  /** This property is used for store team details based on team id on edit-team.  */
  public getTeamById: TeamsResponseModel;
  /** This property is used for store selected-team-members based on team id on edit-team.  */
  protected selectedTeamMembers: TeamEmployee[];
  /** This property is used for store selected-team-managers based on team id on edit-team.  */
  protected selectedTeamManagers: TeamManager[];
  /** This property is used for emit when failed-api.  */
  private failedApi: Subject<boolean> = new Subject();
  failedApi$: Observable<boolean> = this.failedApi.asObservable();
  /** This property is used for emit when save-team.  */
  private save: Subject<TeamsRequestModel> = new Subject();
  saveTeam$: Observable<TeamsRequestModel> = this.save.asObservable();
  private isStartDateDisabled: boolean;
  constructor(
    private actionPermissionService: ActionPermissionService,
    private adapter: TeamsFormAdapter,
    private customFieldValidation: CustomFieldValidation,
    private customValidation: CustomValidation,
    private formBuilder: FormBuilder,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private router: Router,
    public datexPipe: DatexPipe,
  ) { }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Gllobal check response handler Y throw Error/Success message.
   */
  public checkResponse(response: any): any[] {
    if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
      return response.data;
    } else {
      return [];
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Created method for bind teams managers & employees based on their getting ids.
   */
  public bindSelectedValues(): FormGroup {
    let managerIds: number[] = this.selectedTeamManagers.map(({ managerId }) => managerId)
    this.teamsForm.controls['selectedTeamManagers'].patchValue(managerIds.length > 0 ? managerIds : 0);

    let employeeIds: number[] = this.selectedTeamMembers.map(({ empId }) => empId)
    this.teamsForm.controls['selectedTeamEmployees'].patchValue(employeeIds.length > 0 ? employeeIds : 0);
    return this.teamsForm;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Create teams-form.
   */
  public createForm(): FormGroup {
    this.teamsForm = this.formBuilder.group({
      teamId: [0],
      name: ['', Validators.compose([Validators.required, Validators.pattern(AlphabaticNumeric)])],
      triggerActivityDays: ['', Validators.compose([Validators.required, Validators.pattern(NumericPattern)])],
      startDate: [new Date(), Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      teamEmployees: [0, Validators.compose([Validators.required])],
      teamManagers: [0, Validators.compose([Validators.required])],
      selectedTeamEmployees: [[], Validators.compose([Validators.required])],
      selectedTeamManagers: [[], Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required, Validators.pattern(IgnoreSpaceInitial)])],
      status: [True, [Validators.required]],
      createdBy: [0],
      updatedBy: [0],
    });
    return this.teamsForm;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Created method for bind teams managers & employees based on their getting ids and return form.
   */
  public bindControlValue(team: any): FormGroup {
    if (team) {
      this.getTeamById = team;
      this.selectedTeamMembers = team.teamEmployees;
      this.selectedTeamManagers = team.teamManagers;
      let startDate: string = this.customValidation.changeDateFormat(team.startDate);
      let currentDate: string = this.datexPipe.transform((new Date()), CompareString.Valid_Date_Format);
      if (team.startDate < team.endDate) {
        this.teamsForm.controls['startDate'].disable();
        this.isStartDateDisabled = true;
      }
      this.teamsForm.patchValue(team);
    }
    return this.teamsForm;
  }

  public checkTeamsPermission(): boolean {
    if (this.globalResponseHandlerService.getUser().roleId === Role.Admin ||
      this.globalResponseHandlerService.getUser().roleId === Role.TriggerAdmin) {
      return true;
    } else {
      return this.actionPermissionService.checkRoleBasedPermission(Actions.TeamConfiguraton, canDelete);
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Created function for redirect to teams page on click cancel button.
   */
  public redirectToTeams(): void {
    this.router.navigate([Route.Team]);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Emit event for server call if succeed & catch event if failed.
   */
  public saveTeam(teamsForm: FormGroup): void {
    let teamsResponseModel: TeamsResponseModel = teamsForm.getRawValue();
    if (!this.checkValidationOnSubmit(teamsForm, teamsResponseModel)) {
      if (this.dateValidation(teamsResponseModel) && teamsForm.valid) {
        this.globalResponseHandlerService.displayLoader(true);
        let teamModel: TeamsRequestModel = this.adapter.toRequest(teamsResponseModel);
        this.save.next(teamModel);
        this.failedApi.next(true);
      } else {
        this.failedApi.next(false);
      }
    } else {
      this.failedApi.next(true)
      this.globalResponseHandlerService.displayLoader(false);
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Check validation for teams field.
   */
  private checkValidationOnSubmit(sparkAnFormForm: FormGroup, spark: TeamsResponseModel): boolean {
    let returnData = this.customFieldValidation.isFromValid(sparkAnFormForm, spark, fieldValidator)
    return returnData
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Custom date validation for start-date & end-date.
   */
  private dateValidation(spark: TeamsResponseModel): boolean {
    let startDate = moment(spark.startDate).format('YYYY-MM-DD');
    let endDate = moment(spark.endDate).format('YYYY-MM-DD');
    let currentDate = moment(new Date()).format('YYYY-MM-DD');

    if ((currentDate > startDate && !this.isStartDateDisabled) || currentDate > endDate) {
      this.globalResponseHandlerService.disaplyErrorMessage(ErrorMessage.DateNotBePast);
      return false;
    }
    if (spark.startDate >= spark.endDate) {
      this.globalResponseHandlerService.disaplyErrorMessage(ErrorMessage.TeamEndDateInvalid);
      return false;
    }
    return true;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Create function bind error-class on dropdown field.
   */
  public isDropdownValid(field: string): string {
    return this.customFieldValidation.isDropdownValid(field, this.teamsForm);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Create function bind error-class on select-dropdown field.
   */
  public isSelectDropdownValid(field: string): string {
    return this.customFieldValidation.isSelectDropdownValid(field, this.teamsForm);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Create function bind error-class on input field.
   */
  public isInputValid(field: string): string {
    return this.customFieldValidation.isFieldValid(field, this.teamsForm);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Create function get current field-pattern.
   */
  public getPattern(field: string): string {
    return fieldValidator.find(v => v.key === field).pattern;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Create event for input-date validation.
   */
  public inputDateValidation(event: any): void {
    if (event != null) {
      this.customValidation.inputDateValidation(event);
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Initialize end-date.
   */
  public bindEndDate(): FormGroup {
    this.teamsForm.controls['endDate'].patchValue('');
    return this.teamsForm;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Bind-selected-members based on thier empIds.
   */
  public bindMembers(members: TeamEmployee[]): FormGroup {
    if (this.selectedTeamMembers) {
      members.forEach(m => m.id = (
        (this.selectedTeamMembers.find(e => e.empId === m.empId)) ?
          (this.selectedTeamMembers.find(e => e.empId === m.empId).id) : 0))
    }
    this.teamsForm.controls['teamEmployees'].patchValue(members.length > 0 ? members : 0);
    return this.teamsForm;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Bind-selected-managers based on thier managerIds.
   */
  public bindManagers(managers: TeamManager[]): FormGroup {
    if (this.selectedTeamManagers) {
      managers.forEach(m => m.id = (
        (this.selectedTeamManagers.find(e => e.managerId === m.managerId)) ?
          (this.selectedTeamManagers.find(e => e.managerId === m.managerId).id) : 0))
    }
    this.teamsForm.controls['teamManagers'].patchValue(managers.length > 0 ? managers : 0);
    return this.teamsForm;
  }
}
