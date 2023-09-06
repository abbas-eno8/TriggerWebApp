/**
@author : Anjali Tandel
@class : TeamsFormPresentation
@description : TeamsFormPresentation is created for teams add-edit operation.
**/
import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TeamsFormPresenter } from '../teams-form-presenter/teams-form.presenter';
import { TeamManager, TeamEmployee, TeamsResponseModel, TeamsManagersPlaceHolder, TeamsMembersPlaceHolder, TeamsRequestModel, AddTeam, EditTeam } from '../../teams-model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { CustomValidation } from '../../../shared/Validation/custom.validation';
import * as moment from 'moment';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-teams-form-ui',
  templateUrl: './teams-form.presentation.html',
  styleUrls: ['./teams-form.presentation.scss'],
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsFormPresentation implements OnInit {
  /** This property is used for get team-members response from container component */
  @Input() public set teamMembers(teamMembers: TeamEmployee[]) {
    if (teamMembers) {
      this._teamMembers = this.formPresenter.checkResponse(teamMembers);
    }
  }
  public get teamMembers(): TeamEmployee[] {
    return this._teamMembers;
  }
  /** This property is used for store team-members */
  public _teamMembers: TeamEmployee[];

  /** This property is used for get team-managers response from container component */
  @Input() public set teamManagers(teamManagers: TeamManager[]) {
    if (teamManagers) {
      this._teamManagers = this.formPresenter.checkResponse(teamManagers);
    }
  }
  public get teamManagers(): TeamManager[] {
    return this._teamManagers;
  }
  /** This property is used for store team-managers */
  public _teamManagers: TeamManager[];

  /** This property is used for get team-datails based on team id response from container component */
  @Input() public set getTeamById(getTeamById: any) {
    if (getTeamById) {
      this._getTeamById = this.formPresenter.checkResponse(getTeamById);
      this.teamsForm = this.formPresenter.bindControlValue(this._getTeamById);
      this.isInactiveDisabled = this.formPresenter.checkTeamsPermission();
    }
  }
  public get getTeamById(): any {
    return this._getTeamById;
  }
  /** This property is used for store team-details by team id */
  protected _getTeamById: any[];
  /** This property is used for creating team-form.  */
  public teamsForm: FormGroup;
  /** This property is used for get minimum start-date which we are binding to restrict to select past-date.  */
  minStartDate: Date;
  /** This property is used for get minimum end-date which we are binding to restrict to select past-date.  */
  minEndDate: Date;
  /** This property is used for placeholder of teams-manager.  */
  public teamsManagersPlaceHolder: string;
  /** This property is used for placeholder of teams-members.  */
  public teamsMembersPlaceHolder: string;
  /** This property is used for page-title.  */
  public pageTitle: string;
  // tooltipId declare for set tooltip id based on Add or Edit form
  public tooltipId: number;
  public isDisabledSubmitBtn: boolean;
  public isInactiveDisabled: boolean;
  private destroy: Subject<void> = new Subject();
  /** EventEmitter for add-team-api which we called in container page */
  @Output() add: EventEmitter<TeamsRequestModel> = new EventEmitter();
  /** EventEmitter for update-team-api which we called in container page */
  @Output() update: EventEmitter<TeamsRequestModel> = new EventEmitter();
  public empId: number[];
  public managerId: number[];
  public themeEmitter: any;
  public themeClass: string;
  public minDate: Date;

  constructor(
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private formPresenter: TeamsFormPresenter,
    private customValidation: CustomValidation,
    private globalEventsManager: GlobalEventsManager
  ) {
    this.isDisabledSubmitBtn = false;
    this.teamsManagersPlaceHolder = TeamsManagersPlaceHolder;
    this.teamsMembersPlaceHolder = TeamsMembersPlaceHolder;
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    //this.minEndDate.setDate(this.minStartDate.getDate() + 1);
    this.minDate = new Date('01-01-1900');
    this.minDate.setDate(this.minDate.getDate());
    this.destroy = new Subject();
    this.tooltipId = 0;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.themeClass = 'theme-dark'
      } else {
        this.themeClass = 'theme-default'
      }
    })
  }

  ngOnInit() {
    /** Create teams-form. */
    this.teamsForm = this.formPresenter.createForm();
    /** Emit event for add/update server call. */
    this.formPresenter.saveTeam$.pipe(takeUntil(this.destroy)).subscribe((team: TeamsRequestModel) => {
      team.startDate = this.customValidation.changeDateFormat(team.startDate);
      team.endDate = this.customValidation.changeDateFormat(team.endDate);
      if (team.teamId === 0) {
        team.createdBy = this.globalResponseHandlerService.getUser().userId;
        team.teamEmployees.forEach(e => e.createdBy = team.createdBy)
        team.teamManagers.forEach(e => e.createdBy = team.createdBy)
        this.add.next(team)
      } else {
        team.updatedBy = this.globalResponseHandlerService.getUser().userId;
        team.teamEmployees.forEach(e => e.updatedBy = team.updatedBy)
        team.teamManagers.forEach(e => e.updatedBy = team.updatedBy)
        this.update.next(team)
      }
    });

    this.formPresenter.failedApi$.pipe(takeUntil(this.destroy)).subscribe((isConfirn: boolean) => {
      this.isDisabledSubmitBtn = false;
    })
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Close loader while component reference created and get the spark categories and classificactions which we are using in form popup modal.
   */
  ngOnChanges() {
    if (this._teamManagers && this._teamMembers) {
      if (this.getTeamById) {
        this.pageTitle = EditTeam;
        this.tooltipId = 54;
        this.teamsForm = this.formPresenter.bindSelectedValues();
        this.empId = this.getTeamById.teamEmployees.map(i => i.empId);
        this.managerId = this.getTeamById.teamManagers.map(i => i.managerId);
        this.disabledSelectedManagers();
        this.disabledSelectedMembers();
      } else {
        this.pageTitle = AddTeam;
        this.isInactiveDisabled = false;
        this.tooltipId = 53;
      }
      this.globalResponseHandlerService.displayLoader(false);
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Create function bind error-class on dorpdown field.
   */
  public isInputValid(field: string): string {
    return this.formPresenter.isInputValid(field);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-06-2019
   * Description : Create function bind error-class on dorpdown field.
   */
  public isDropdownValid(field: string): string {
    return this.formPresenter.isDropdownValid(field);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 23-09-2019
   * Description : Create function bind error-class on select-dorpdown field.
   */
  public isSelectDropdownValid(field: string): string {
    return this.formPresenter.isSelectDropdownValid(field);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 23-09-2019
   * Description : Create event-function on change start-date.
   */
  public onChangeStartDate(event: any): void {
    // if (event && this.teamsForm.controls.startDate.status !== 'DISABLED') {
    //   //this.minEndDate = new Date();
    //   this.minEndDate = this.getdate(event);
    // } else {
    //   this.minEndDate.setDate(this.minStartDate.getDate());
    // }
    if (event && (this.teamsForm.value.endDate < event || this.teamsForm.value.endDate.getDate() < event.getDate())) {
      this.teamsForm = this.formPresenter.bindEndDate();
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 11-10-2019
   * Description : Create function for get date + 1 days.
   */
  // private getdate(event: Date): Date {
  //   var currentDate = event;
  //   var date = new Date(currentDate);
  //   var newdate = new Date(date);
  //   newdate.setDate(newdate.getDate() + 1);

  //   var dd = newdate.getDate();
  //   var mm = newdate.getMonth() + 1;
  //   var y = newdate.getFullYear();

  //   var someFormattedDate = mm + '/' + dd + '/' + y;
  //   return new Date(someFormattedDate)
  // }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 23-09-2019
   * Description : Create function bind error-class on input-dorpdown field.
   */
  public inputDateValidation(event: Event): void {
    return this.formPresenter.inputDateValidation(event);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 23-09-2019
   * Description : Create function for custom searching on teams managers/members.
   */
  public customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.name.split(' ')[0].toLowerCase().includes(term) || item.name.toLowerCase().includes(term);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Create function get current field-pattern.
   */
  public getPattern(field: string): string {
    return this.formPresenter.getPattern(field);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Create event function for selected manager's id & get managers and bind on form.
   */
  public getManagers(): void {
    let selectedManager = this.teamsForm.getRawValue().selectedTeamManagers ? this._teamManagers.filter(item => this.teamsForm.getRawValue().selectedTeamManagers.find(i => i === item.managerId)) : [];
    this.teamsForm = this.formPresenter.bindManagers(selectedManager);
    this.disabledSelectedMembers();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Create event function for selected members's id & get managers and bind on form.
   */
  public getMembers(): void {
    let selectedMembers = this.teamsForm.getRawValue().selectedTeamEmployees ? this._teamMembers.filter(item => this.teamsForm.getRawValue().selectedTeamEmployees.find(i => i === item.empId)) : [];
    this.teamsForm = this.formPresenter.bindMembers(selectedMembers);
    this.disabledSelectedManagers()
  }

  public disabledSelectedManagers(): void {
    let selectedMembers = []; //= this._teamManagers.filter(item => this.empId ? this.empId.find(i => i === item.managerId) : []);
    if (this.empId) {
      selectedMembers = this._teamManagers.filter(item => this.empId.find(i => i === item.managerId));
      this._teamManagers.forEach(m => m.isDisabled = false);
      selectedMembers.forEach(m => m.isDisabled = true);
    }

  }

  public disabledSelectedMembers(): void {
    let selectedManagers = [];// = this._teamMembers.filter(item => this.managerId ? this.managerId.find(i => i === item.empId) : []);
    if (this.managerId) {
      selectedManagers = this._teamMembers.filter(item => this.managerId ? this.managerId.find(i => i === item.empId) : []);
      this._teamMembers.forEach(m => m.isDisabled = false);
      selectedManagers.forEach(m => m.isDisabled = true);
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Click event on click cancel button.
   */
  public cancel(): void {
    this.formPresenter.redirectToTeams();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 23-06-2019
   * Description : Click event on click submit button.
   */
  public saveTeam(): void {
    this.isDisabledSubmitBtn = true;
    this.formPresenter.saveTeam(this.teamsForm);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.themeEmitter.unsubscribe();
  }
}
