/**
@author : Anjali Tandel
@class : MemberPresenter
@description : MemberPresenter is created for perform UI & bussiness logic of team-member-list module.
**/
import { Injectable, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ComponentPortal } from '@angular/cdk/portal';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ToasterService } from 'angular2-toaster';
import { Subject, Observable } from 'rxjs';
import * as _ from 'underscore';
// ----------------------------------------------------------------------- //
import { GlobalResponseHandlerService } from '../../../../../core/global-response-handler/global-response-handler';
import {
  Role, Actions, Relation, Route, Error_Type, Error_Title, Dimension, DepartmentType, MainDiv,
  TeamType, sparkDetailByRoute, SparkDetail
} from '../../../../../core/magic-string/common.model';
import { TeamMembers, Record, TeamMemberColumns, ColumnConfiguration, Department } from '../../../team-member-model';
import { UserModel } from '../../../../../core/model/user';
import { ActionPermissionService, canAdd, canView, canDelete, canEdit } from '../../../../../core/services/action-permission/action-permission.service';
import { NoRecordsFoundComponent } from '../../../../../shared/no-records-found/no-records-found.component';
import { SearchPipePipe } from '../../../../../shared/pipes/search-pipe.pipe';
import { UrlEncryptionDecryptionService } from '../../../../../core/url-encryption-decryption/url-encryption-decryption.service';
import { DeletePopupComponent } from '../../../../../shared/modal-popup/delete-popup/delete-popup.component';
import { LoaderService } from '../../../../../core/loader/loader.service';
import { Encryption, ErrorMessage, Session } from '../../../../../core/magic-string/common-validation-model';
import { AssessmentAlreadyDone, AssessmentInSaveAsDraft, AssessmentNotInitiated } from '../../../../../assessment/assessment-model';
import { CurrentSparkAnEmployee, DateFormate, EmployeeStatus } from '../../../../employee-model';
import { EditSalaryComponent } from '../../../../edit-salary/edit-salary.component';
import { SortByFieldService } from '../../../../../shared/services/sort-by-field/sort-by-field.service';
import { Sort } from '../../../../../shared/services/sort-by-field/sort';
import { GlobalEventsManager } from '../../../../../core/navbar/globalEventsManager';
import { TooltipId } from '../../../../../shared/tooltip/tooltip-model';
import { TeamMembersAdapter } from '../../../team-member-adapter/team-member-adapter';
import { EmployeeFilterListComponent, FilterObject } from '../employee-filter-list/employee-filter-list.component';
import { TeamMemberService } from '../../../team-member-service/team-member.service';
import { ExportExcelService } from '../../../../../core/services/export-excel.service';
import { deepCopy } from '../../../../../core/utility/utility';
@Injectable()
export class MemberPresenter {
  public user: UserModel;
  public userData: any;
  public sortModel: Sort<TeamMembers[]>;
  /** This property is used for create component dynamically based on members length. */
  private createView: Subject<[boolean, TeamMembers[]]> = new Subject();
  createView$: Observable<[boolean, TeamMembers[]]> = this.createView.asObservable();
  /** This property is used for bind filter team-members. */
  private bindRecords: Subject<TeamMembers[]> = new Subject();
  bindRecords$: Observable<TeamMembers[]> = this.bindRecords.asObservable();

  private columns: Subject<any> = new Subject();
  columns$: Observable<any> = this.columns.asObservable();

  private columnConfig: Subject<boolean> = new Subject();
  columnConfig$: Observable<boolean> = this.columnConfig.asObservable();
  /** This property is used for emit when delete-user. */
  private delete: Subject<number> = new Subject();
  delete$: Observable<number> = this.delete.asObservable();
  /** This property is used for emit when send-user-mail-event. */
  private sendMailIdsList: Subject<number[]> = new Subject();
  sendMailIdsList$: Observable<number[]> = this.sendMailIdsList.asObservable();
  /** This property is used for store all team-members (In case for remove session for advanced filter then we want all records). */
  public members: TeamMembers[];
  /** This property is used for store all team-members and use for filtering records. */
  public teamMembers: TeamMembers[];
  /** This property is used for displaying purpose. */
  private filterTeamMembers: TeamMembers[];
  /** This property is used for store current page records. */
  private currentPageTeamMembers: TeamMembers[];
  /** This property is used for store filter department based on advanced filter. */
  private filterDepartments: Department[];
  /** This property is storing value for if user is redirecting from Dashboard. */
  public isRedirectedFromDashboard: boolean;
  /** This property is storing first page-index which we are using for getting current page records. */
  public firstPageIndex: number;
  /** This property is storing last page-index which we are using for getting current page records. */
  public lastPageIndex: number;
  public isAdvancedFilterApply: boolean;
  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;
  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(
    private actionPermissionService: ActionPermissionService,
    private datePipe: DatePipe,
    private globalEventsManager: GlobalEventsManager,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private matDialog: MatDialog,
    private loaderService: LoaderService,
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private searchPipePipe: SearchPipePipe,
    private adapter: TeamMembersAdapter,
    private toasterService: ToasterService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private sortByFieldService: SortByFieldService,
    private overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory,
    private teamMemberService: TeamMemberService,
    private exportExcelService: ExportExcelService
  ) {
    this.user = this.globalResponseHandlerService.getUser();
    this.userData = this.globalResponseHandlerService.getUserData();
    this.firstPageIndex = 0;
    this.lastPageIndex = 50;
    this.isAdvancedFilterApply = false;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : Created method for display button based on Role.
   */
  public isDisplayButton(): boolean {
    return (this.user.roleId === Role.Admin || this.user.roleId === Role.TriggerAdmin) ? true : false;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : Created method for check if Role is Trigger-admin.
   */
  public isTriggerAdmin(): boolean {
    return (this.user.roleId === Role.TriggerAdmin) ? false : true;
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 04-07-2022
   * Description : Created method for check if Role is Trigger-admin or Admin.
   */
  public isTriggerAdminOrAdmin(): boolean {
    return (this.user.roleId === Role.TriggerAdmin || this.user.roleId === Role.Admin) ? true : false;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : Created method for check response and return records to presentation.
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
   * Created-Date : 25-02-2020
   * Description : Created method for check if user is redirectinfg from Dashboard.
   */
  public redirectedFromDashboard(): void {
    let sessionQueryString = sessionStorage.getItem(Session.TeamMemberQueryString);
    this.isRedirectedFromDashboard = !!sessionQueryString ? true : false;
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : Created method for filter team-members.
   */
  public filterMembers(members: TeamMembers[]): TeamMembers[] {
    // if (this.user.roleId === Role.Manager || this.user.roleId > 5) {
    //   members = members.filter(e => e.empStatus && e.roleId !== Role.Executive && e.roleId !== Role.Admin && e.empId !== this.user.empId)
    // }
    if (this.user.roleId === Role.Manager || this.user.roleId > 5) {
      members = members.filter(e => e.empStatus !== EmployeeStatus.Separated && e.empId !== this.user.empId
        && ((((e.roleId === Role.Executive || e.roleId === Role.Admin) && (e.teamType === TeamType.Connected || e.teamType === TeamType.Oversight))
        ) || e.roleId === Role.Manager || e.roleId > 5 || e.roleId === Role.Employee)
      )
    }
    if (this.isRedirectedFromDashboard) {
      members = members.filter(e => e.empId !== this.user.empId);
    }

    members.forEach((e) => {
      e.isDeletable = (this.user.roleId === Role.TriggerAdmin || (this.user.roleId === Role.Admin && e.empId !== this.user.empId)) ? true : false;
      e.isEditable = this.user.roleId === Role.TriggerAdmin || this.user.roleId === Role.Admin ? true : false;
      e.isEditableSalary = e.empStatus !== EmployeeStatus.Separated && e.empId !== this.user.empId &&
        (this.user.roleId === Role.Executive ||
          (this.user.roleId === Role.Manager && (e.empRelation === Relation.Direct || e.empRelation === Relation.Hierarchal))) ? true : false;
      e.isTriggerEmployee = this.actionPermissionService.isAddTriggerAnEmployee(Actions.TriggerAnEmployee, canAdd, e);
      e.isDisplayEmployeeDashboard = this.actionPermissionService.isDisplyEmployeeDashboard(e);
      e.isSparkViewable = this.actionPermissionService.checkSparkPermission(canView, e);
      e.noOfSpark = e.isSparkViewable || this.user.roleId === Role.TriggerAdmin ? e.noOfSpark : '';
      e.lastSparkDate = e.isSparkViewable || this.user.roleId === Role.TriggerAdmin ? e.lastSparkDate : '';
      e.isSparkAddable = this.actionPermissionService.checkSparkPermission(canAdd, e);
      e.isSparkEditable = this.actionPermissionService.checkSparkPermission(canEdit, e);
      e.isSparkDeletable = this.actionPermissionService.checkSparkPermission(canDelete, e);
      e.isDisaplyTriggerScore = e.isDisplayEmployeeDashboard || this.user.roleId === Role.Admin || this.user.roleId === Role.TriggerAdmin ? true : false;
      e.lastEvaluationDate = e.isDisaplyTriggerScore ? e.lastEvaluationDate : '';
      e.ratingCompleted = e.isDisaplyTriggerScore ? e.ratingCompleted : '';
      e.averageScore = e.isDisaplyTriggerScore ? e.averageScore : '';
      e.lastEvaluation = e.isDisaplyTriggerScore ? e.lastEvaluation : '';
      e.ratingCompletedCurrentYear = e.isDisaplyTriggerScore ? e.ratingCompletedCurrentYear : '';
      e.managerAction = e.isDisaplyTriggerScore ? e.managerAction : '';
      e.scoreSummary = e.isDisaplyTriggerScore ? e.scoreSummary : '';
      e.isDisabledAction = !e.isDeletable && !e.isEditable && !e.isTriggerEmployee && !e.isDisplayEmployeeDashboard && !e.isSparkViewable && !e.isSparkAddable ? true : false
      e.isMailSent = this.isDisplayCheckboxSendMail(e);
      e.trending = e.isDisaplyTriggerScore ? e.trending : 0;
      //e.isPasswordGenerated = this.isRedirectedFromDashboard ? true : false;
    });
    if (this.isRedirectedFromDashboard) {
      members.forEach(e => e.isPasswordGenerated = true);
    }
    this.sortModel = new Sort<TeamMembers[]>(1, '', '', []);

    this.members = members;

    if (!this.isTriggerAdminOrAdmin()) {
      this.members = members.filter((member) => member.empStatus !== EmployeeStatus.Separated && member.empStatus !== EmployeeStatus.OnLeave);
    }
    // Please do not remove below code
    // this.filterTeamMembers = this.getSessionTeamMember().length > 0 ? this.getSessionTeamMember() : members;
    // this.filterDepartments = this.isAdvancedFilterApply ? _.uniq(this.adapter.bindDepartments(this.filterTeamMembers), SortByDepartment) : [];
    // this.filterTeamMembers = this.getMembersBySessionDepartment().length > 0 ? this.getMembersBySessionDepartment() : this.filterTeamMembers;
    // this.filterTeamMembers = this.getMembersBySessionEmpStatus().length > 0 ? this.getMembersBySessionEmpStatus() : this.filterTeamMembers;
    // this.filterTeamMembers = this.getMembersBySessionManagerAction().length > 0 ? this.getMembersBySessionManagerAction() : this.filterTeamMembers;
    // this.filterTeamMembers = this.getMembersBySessionScore().length > 0 ? this.getMembersBySessionScore() : this.filterTeamMembers;

    const filterObj = {
      dimensionId: 0,
      dimensionValueid: 0,
      isFilter: false
    };

    // if (this.isTriggerAdminOrAdmin) {
    //   members = members.filter((e) => e.empStatus === EmployeeStatus.Active);
    // }

    sessionStorage.setItem(Encryption.SelectedDimensionArray, '');
    sessionStorage.setItem(Encryption.SelectedDimensionFilter, JSON.stringify(filterObj));
    sessionStorage.setItem(Encryption.SelectedEmpStatus, '1');
    sessionStorage.setItem(Encryption.SelectedDepartment, '0');
    sessionStorage.setItem(Encryption.ManagerAction, '');
    sessionStorage.setItem(Encryption.ScoreTitle, '');
    sessionStorage.setItem(Encryption.SelectedTrending, '0');

    this.filterTeamMembers = this.members;
    this.teamMembers = this.filterTeamMembers;

    // this.filterTeamMembers = members;
    // this.teamMembers = this.members;

    return members;
  }

  /**
   * Get Active Team Members
   */
  public getActiveTeamMembers(): void {
    if (this.isTriggerAdminOrAdmin) {
      this.filterTeamMembers = this.filterTeamMembers ? this.filterTeamMembers.filter(item => item.empStatus === EmployeeStatus.Active) : [];
      this.teamMembers = this.filterTeamMembers;
      this.teamMemberChunks(0, 50);
      this.globalEventsManager.pagination(this.filterTeamMembers);
      this.createView.next([this.isAdvancedFilterApply, this.filterTeamMembers]);
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : Created method for filter team-members.
   */
  private isDisplayCheckboxSendMail(member: TeamMembers): boolean {
    if (!this.isRedirectedFromDashboard && member.empStatus !== EmployeeStatus.Separated && !member.isMailSent) {
      if (this.user.roleId === Role.Admin && member.empId !== this.user.empId) {
        return false;
      } else if (this.user.roleId === Role.TriggerAdmin) {
        if (!!this.userData.contractStartDate && !!this.userData.contractEndDate && this.userData.gracePeriod >= 0) {
          let startDate = new Date(this.userData.contractStartDate);
          let endDate = new Date(this.userData.contractEndDate);
          //  Add grace period into end date
          endDate.setDate(endDate.getDate() + this.userData.gracePeriod);
          //  Convert date with formated date
          let contractStartDate: string = this.datePipe.transform(startDate, DateFormate);
          let contractEndDate: string = this.datePipe.transform(endDate, DateFormate);
          let currentDate = this.datePipe.transform(Date.now(), DateFormate);
          if (contractStartDate <= currentDate && contractEndDate >= currentDate) {
            return false;
          } else {
            return true;
          }
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  public setPageTitle(): number {
    // if (this.user.roleId === Role.Executive) {
    //   return TooltipId.EmployeeInExecutive;
    // } else
    if (this.user.roleId === Role.TriggerAdmin) {
      return TooltipId.EmployeeInTriggerAdmin;
    } else if (this.user.roleId === Role.Admin) {
      return TooltipId.EmployeeInAdmin;
    } else {
      // return TooltipId.EmployeeInManager;
      return TooltipId.EmployeeInExecutive;
    }
  }

  private scrollTop(): void {
    const mainDiv = document.getElementById(MainDiv);
    if (mainDiv) {
      mainDiv.scrollTop = 0;
    }
  }

  public teamMemberChunks(firstIndex: number, lastIndex: number): void {
    this.currentPageTeamMembers = this.filterTeamMembers.slice(firstIndex, lastIndex)
    this.firstPageIndex = firstIndex;
    this.lastPageIndex = lastIndex > this.currentPageTeamMembers.length ? lastIndex : this.currentPageTeamMembers.length;
    this.bindRecords.next(this.currentPageTeamMembers);
    this.scrollTop();
  }

  public createListViewPage(componentRef, entry, component, columns): any {
    this.teamMemberChunks(this.firstPageIndex, this.lastPageIndex);
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.instance.filterTeamMembers = this.currentPageTeamMembers;
    componentRef.instance.columns = columns;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  public createPaginationView(componentRef, entry, component): any {
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.instance.items = this.filterTeamMembers;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  public createNoRecordsFoundPage(componentRef, entry: ViewContainerRef): any {
    let factory = this.resolver.resolveComponentFactory(NoRecordsFoundComponent);
    componentRef = entry.createComponent(factory);
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  public createDynamicView(members: TeamMembers[], isListViewCreated: boolean): void {
    if ((members.length === 0 && isListViewCreated) || (members.length > 0 && !isListViewCreated)) {
      this.createView.next([this.isAdvancedFilterApply, members]);
    }
  }

  public filterMembersBySearchText(teamMembers: TeamMembers[], searchText: string, searchparameters, deptId): TeamMembers[] {
    let membersByDepId: TeamMembers[] = deptId === 0 ? this.teamMembers : this.teamMembers.filter(x => x.departmentId === deptId);
    let members: TeamMembers[] = searchText === '' ? membersByDepId : this.searchPipePipe.transform(membersByDepId, searchText, searchparameters);
    this.filterTeamMembers = members;
    this.teamMemberChunks(this.firstPageIndex, this.lastPageIndex);
    this.globalEventsManager.pagination(members);
    return members;
  }

  public filterMembersByDepartment(teamMembers: TeamMembers[], deptId: number): TeamMembers[] {
    let members: TeamMembers[] = deptId === 0 ? this.teamMembers : this.teamMembers.filter(x => x.departmentId === deptId);
    this.teamMemberChunks(0, 50);
    this.filterTeamMembers = members;
    this.globalEventsManager.pagination(members);
    return members;
  }

  public redirectedToExcelUpload(): void {
    this.router.navigate([Route.ExcelUpload]);
  }

  public redirectedToEditMember(empId: number): void {
    this.urlEncryptionDecryptionService.urlEncryption(empId.toString(), Route.AddEmployee);
  }

  public openModalForDeleteTeamMember(empId: number): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: Record,
    });
    dialogRef.componentInstance.confirm.subscribe(
      data => {
        if (data) {
          this.loaderService.emitIsLoaderShown(true);
          this.delete.next(empId);
        }
      }
    );
  }

  public redirectedToEvaluateTeamMember(empId: number, lastAssessedDate: string, isTriggerSent): void {
    if (isTriggerSent === 2) {
      this.toasterService.pop(Error_Type, Error_Title, AssessmentInSaveAsDraft);
    } else {
      let date = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
      if (lastAssessedDate !== date) {
        sessionStorage.setItem(Encryption.RequestId, '0');
        this.urlEncryptionDecryptionService.urlEncryption(empId.toString(), Route.TriggerEmployee);
      } else {
        this.toasterService.pop(Error_Type, Error_Title, AssessmentAlreadyDone);
      }
    }
  }

  public redirectedToEmployeeDashboard(empId: number, ratingCompleted, isTriggerSent): void {
    if (+ratingCompleted > 0 || isTriggerSent === 2) {
      sessionStorage.setItem(Encryption.RequestId, '0');
      this.urlEncryptionDecryptionService.urlEncryption(empId.toString(), Route.IndividualEmployee);
    } else {
      this.toasterService.pop(Error_Type, Error_Title, AssessmentNotInitiated);
    }
  }

  public redirectedToSparkAnEmployee(member: TeamMembers): void {
    this.setSparkDetailByRoute(member.empId);
    const sparkAnEmployee: CurrentSparkAnEmployee = new CurrentSparkAnEmployee(
      this.user.userId,
      member.empId,
      member.teamMemberFirstName,
      member.teamMemberLastName,
      member.isSparkViewable,
      member.isSparkAddable,
      member.isSparkEditable,
      member.isSparkDeletable,
      member.sendSpark
    );
    this.globalResponseHandlerService.setSparkAnEmployee(sparkAnEmployee);
    sessionStorage.setItem(Encryption.RequestId, '0');
    this.urlEncryptionDecryptionService.urlEncryption(member.empId.toString(), Route.SparkAnEmployee);
  }

  public openModalForEditSalary(member: TeamMembers): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    const dialogRef = this.matDialog.open(EditSalaryComponent, {
      data: {
        companyId: this.user.clientId,
        userId: this.user.userId,
        empId: member.empId,
        currentSalary: member.currentSalary
      },
      panelClass: ['md-dialog-container', modalBackground],
      // panelClass: 'md-dialog-container',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      }
    });
    dialogRef.beforeClose().subscribe(updatedSalary => {
      if (updatedSalary) {
        //this.getEmployees();
      }
    });
  }

  public sort(sortedPropety: string): TeamMembers[] {
    this.sortModel.sortedPropety = sortedPropety;
    this.sortModel.list = this.filterTeamMembers;
    this.sortModel = this.sortByFieldService.sort(this.sortModel);
    this.filterTeamMembers = this.sortModel.list;
    this.teamMemberChunks(this.firstPageIndex, this.lastPageIndex);
    return this.sortModel.list;
  }

  public getDirecionIcon(property: string): string {
    return this.sortByFieldService.getDirecionIcon(property, this.sortModel);
  }

  public bindColumns(columns: any[]): void {
    this.columns.next(columns);
  }

  public columnConfiguration(isChange: boolean): void {
    this.columnConfig.next(isChange);
  }

  public getLatestMembers(ids: number[]): TeamMembers[] {
    ids.forEach((c, index) => {
      this.currentPageTeamMembers.find(e => e.empId === c).isMailSent = true;
      this.teamMembers.find(e => e.empId === c).isMailSent = true;
    });
    this.filterTeamMembers = this.teamMembers;
    this.teamMemberChunks(0, 50);
    this.globalEventsManager.pagination(this.teamMembers);
    return this.teamMembers;
  }

  public removeDeletedMembers(id: number): TeamMembers[] {
    var index = this.currentPageTeamMembers.indexOf(this.currentPageTeamMembers.find(e => e.empId === id));
    var indexTeam = this.teamMembers.indexOf(this.teamMembers.find(e => e.empId === id));
    if (index != -1) {
      this.currentPageTeamMembers.splice(index, 1);
    }
    if (indexTeam != -1) {
      this.teamMembers.splice(indexTeam, 1);
    }
    this.filterTeamMembers = this.teamMembers;
    this.teamMemberChunks(0, 50);
    this.globalEventsManager.pagination(this.teamMembers);
    return this.teamMembers;
  }

  public onCheckMasterCheckbox(icChecked: boolean): void {
    this.currentPageTeamMembers['isChecked'] = icChecked;
    this.currentPageTeamMembers.forEach((c, index) => {
      this.currentPageTeamMembers[index].isChecked = icChecked;
    });
    this.getCheckedIds();
  }

  public onCheck(icChecked: boolean, index: number, empId): void {
    let employeeObj = this.teamMembers.find((e) => e.empId === empId);
    if (employeeObj) {
      employeeObj.isChecked = icChecked;
    }
    // this.teamMembers[index].isChecked = icChecked;
    this.currentPageTeamMembers[index].isChecked = icChecked;
    this.getCheckedIds();
  }

  private getCheckedIds(): void {
    let sentmailIds = [];
    sentmailIds = this.teamMembers.filter(c => c.isChecked && !c.isMailSent).map(x => x.empId);
    this.sendMailIdsList.next(sentmailIds);
    this.bindRecords.next(this.currentPageTeamMembers);
  }

  public isDisplayMasterCheckbox(members: TeamMembers[]): boolean {
    return members.filter(c => !c.isMailSent).length > 0 ? true : false;
  }

  public isCheckedMasterCheckbox(members: TeamMembers[]): boolean {
    return members.filter(c => !c.isMailSent).length === members.filter(c => c.isChecked && !c.isMailSent).length ? true : false;
  }

  public openModalForAdvanceFilter(filterdepartments, allDepartment): void {
    this.filterDepartments = this.isAdvancedFilterApply ? this.filterDepartments : filterdepartments;
    if (!!sessionStorage.getItem(Encryption.SelectedDimensionArray)) {
      let selectedDimensionArray = JSON.parse(sessionStorage.getItem(Encryption.SelectedDimensionArray));
      let filterElementData = JSON.parse(sessionStorage.getItem(Encryption.FilterElementDataKey));
      this.openFilterModal(selectedDimensionArray, allDepartment, filterElementData);
    } else {
      if (JSON.parse(sessionStorage.getItem(Encryption.DimensionElementKey))) {
        let dimensionSessionData = JSON.parse(sessionStorage.getItem(Encryption.DimensionElementKey));
        let filterElementData = JSON.parse(sessionStorage.getItem(Encryption.FilterElementDataKey));
        this.openFilterModal(dimensionSessionData, allDepartment, filterElementData);
      } else {
        this.getDimensionData(allDepartment);
      }
    }
  }

  openFilterModal(dimensionData, allDepartment, filterElementData) {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(EmployeeFilterListComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.componentOverlayRef.instance.dimensionData = dimensionData;
    this.componentOverlayRef.instance.departmentData = this.filterDepartments;
    this.componentOverlayRef.instance.allDepartment = allDepartment;
    this.componentOverlayRef.instance.managerActionList = filterElementData.managerAction;
    this.componentOverlayRef.instance.scoreTitleList = filterElementData.scoreSummary;
    this.componentOverlayRef.instance.trendingList = filterElementData.trending;

    this.componentOverlayRef.instance.cancel.subscribe(status => {
      this.overlayRef.dispose();
    });

    this.componentOverlayRef.instance.applyFilter.subscribe((filterObj) => {
      this.isAdvancedFilterApply = filterObj.isFilter;
      this.filterTeamMembers = filterObj.isFilter ? this.getFilterEmployeesByDimension(filterObj) : this.members;
      // this.filterDepartments = _.uniq(this.adapter.bindDepartments(this.filterTeamMembers), SortByDepartment);
      let selectedDepartment = sessionStorage.getItem(Encryption.SelectedDepartment);
      let selectEmpStatus = sessionStorage.getItem(Encryption.SelectedEmpStatus);
      let managerAction = sessionStorage.getItem(Encryption.ManagerAction);
      let scoreTitle = sessionStorage.getItem(Encryption.ScoreTitle);
      let selectTrending = sessionStorage.getItem(Encryption.SelectedTrending);
      if (parseInt(selectedDepartment) > 0) {
        this.filterTeamMembers = this.filterTeamMembers.filter(item => item.departmentId === parseInt(selectedDepartment));
      }
      if (parseInt(selectEmpStatus) > 0) {
        this.filterTeamMembers = this.filterTeamMembers.filter(item => item.empStatus === parseInt(selectEmpStatus));
      }
      if (managerAction !== '') {
        this.filterTeamMembers = this.filterTeamMembers.filter(item => item.managerAction === managerAction);
      }
      if (scoreTitle !== '') {
        this.filterTeamMembers = this.filterTeamMembers.filter(item => item.scoreSummary === scoreTitle);
      }
      if (parseInt(selectTrending) > 0) {
        this.filterTeamMembers = this.filterTeamMembers.filter(item => item.trending === parseInt(selectTrending));
      }
      this.teamMembers = this.filterTeamMembers;
      this.teamMemberChunks(0, 50);
      this.globalEventsManager.pagination(this.filterTeamMembers);
      this.createView.next([this.isAdvancedFilterApply, this.filterTeamMembers]);
      this.overlayRef.dispose();
    });
  }

  getDimensionData(allDepartment): void {
    this.loaderService.emitIsLoaderShown(true);
    // let filterDimensionArray;
    // this.teamMemberService.getFilterElement().subscribe((dimension) => {
    //   if (this.globalResponseHandlerService.getApiResponse(dimension, false, false)) {
    //     filterDimensionArray = dimension.data;
    //     sessionStorage.setItem(Encryption.DimensionElementKey, JSON.stringify(filterDimensionArray));
    //   }
    // })
    this.teamMemberService.getFilterElementData().subscribe((response) => {
      if (this.globalResponseHandlerService.getApiResponse(response, false)) {
        let filterDimensionArray = response.data['dimensionElementsModels'];
        sessionStorage.setItem(Encryption.DimensionElementKey, JSON.stringify(filterDimensionArray));
        sessionStorage.setItem(Encryption.FilterElementDataKey, JSON.stringify(response.data));
        this.openFilterModal(filterDimensionArray, allDepartment, response.data);
      }
    });
  }

  getFilterEmployeesByDimension(filterObj) {
    let filteredTeamMember: TeamMembers[]
    if (!filterObj.isFilter) {
      filteredTeamMember = this.members;
    } else {
      if (filterObj.dimensionId === Dimension.Department) {
        if (filterObj.dimensionValueid === DepartmentType.Inside) {
          filteredTeamMember = this.members.filter(item => item.departmentId === this.userData.employee.departmentId);
        } else {
          filteredTeamMember = this.members.filter(item => item.departmentId !== this.userData.employee.departmentId);
        }
      } else if (filterObj.dimensionId === Dimension.Relation) {
        let members: TeamMembers[] = this.members.filter(item => item.empRelation === filterObj.dimensionValueid);
        filteredTeamMember = members;
      } else {
        let members: TeamMembers[] = this.members.filter(item => item.teamType === filterObj.dimensionValueid);
        filteredTeamMember = members;
      }
    }
    return filteredTeamMember;
  }

  public getFilterObj(dimensionData) {
    let filterObj: FilterObject;
    dimensionData.forEach(attribute => {
      attribute.dimensionElements.forEach(element => {
        if (element.checked) {
          let dimensionId = attribute.dimensionId;
          let dimensionValueid = element.elementId;
          let isCheckedAttribute = true;
          filterObj = {
            dimensionId: dimensionId,
            dimensionValueid: dimensionValueid,
            isFilter: isCheckedAttribute
          }
        }
      })
    });
    return filterObj;
  }

  public columnConfigurationCheck(columns: TeamMemberColumns[], isChange): ColumnConfiguration[] {
    if (columns.length > 0) {
      return this.adapter.columnConfigurationToResponse(columns, this.user.userId);
    }
    if (columns.length === 0 && isChange) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.SelectColumnConfiguration);
      return [];
    }
  }

  getSessionTeamMember() {
    let sessionTeamMember = []
    if (!this.isRedirectedFromDashboard && !!sessionStorage.getItem(Encryption.SelectedDimensionArray)) {
      let dimensionData = JSON.parse(sessionStorage.getItem(Encryption.SelectedDimensionArray));
      let filterObj = this.getFilterObj(dimensionData);
      sessionTeamMember = this.getFilterEmployeesByDimension(filterObj);
      this.isAdvancedFilterApply = true;
    }
    return sessionTeamMember;
  }

  getMembersBySessionDepartment() {
    let sessionTeamMember = []
    if (!!sessionStorage.getItem(Encryption.SelectedDepartment)) {
      let selectedDepartment = sessionStorage.getItem(Encryption.SelectedDepartment)
      sessionTeamMember = this.filterTeamMembers.filter(item => item.departmentId === parseInt(selectedDepartment));;
    }
    return sessionTeamMember;
  }

  getMembersBySessionEmpStatus() {
    let sessionTeamMember = []
    if (!!sessionStorage.getItem(Encryption.SelectedEmpStatus)) {
      let selectedEmpStatus = sessionStorage.getItem(Encryption.SelectedEmpStatus)
      sessionTeamMember = this.filterTeamMembers.filter(item => item.empStatus === parseInt(selectedEmpStatus));;
    }
    return sessionTeamMember;
  }

  getMembersBySessionManagerAction() {
    let sessionTeamMember = []
    if (sessionStorage.getItem(Encryption.ManagerAction) !== '') {
      let selectedManagerAction = sessionStorage.getItem(Encryption.ManagerAction)
      sessionTeamMember = this.filterTeamMembers = this.filterTeamMembers.filter(item => item.managerAction === selectedManagerAction);
    }
    return sessionTeamMember;
  }

  getMembersBySessionScore() {
    let sessionTeamMember = []
    if (sessionStorage.getItem(Encryption.ScoreTitle) !== '') {
      let selectedScoreTitle = sessionStorage.getItem(Encryption.ScoreTitle)
      sessionTeamMember = this.filterTeamMembers = this.filterTeamMembers.filter(item => item.scoreSummary === selectedScoreTitle);
    }
    return sessionTeamMember;
  }

  addClssBySelectedTheme() {
    if (!this.isDarkTheme) {
      var parentElement = document.getElementsByClassName('mat-menu-content')[0];
      if (parentElement) {
        parentElement.classList.remove('dark-theme-mat-select')
        parentElement.classList.add('light-theme-mat-select')
      };
      let parentElementOne = document.getElementsByClassName('list-group')[0];
      if (parentElementOne) {
        parentElementOne.classList.remove('dark-theme-mat-select')
        parentElementOne.classList.add('light-theme-mat-select')
      };
    }
    else {
      var parentElement = document.getElementsByClassName('mat-menu-content')[0];
      if (parentElement) {
        parentElement.classList.remove('light-theme-mat-select')
        parentElement.classList.add('dark-theme-mat-select')
      };
      let parentElementOne = document.getElementsByClassName('list-group')[0];
      if (parentElementOne) {
        parentElementOne.classList.remove('light-theme-mat-select')
        parentElementOne.classList.add('dark-theme-mat-select')
      };
    }
  }

  public exportAsXLSX(customColumns): void {
    const filterBasedArrayList = this.getFilterBasedArrayList(customColumns);
    const columnNameList = this.getTableHeading(filterBasedArrayList);
    this.exportExcelService.exportAsExcelFile(filterBasedArrayList, columnNameList, 'team-member');
  }

  private getTableHeading(arrayList): any {
    let columnNameList = [];
    !!arrayList && Object.keys(arrayList[0]).forEach((columnName) => {
      const result: string = columnName.replace(/([A-Z])/g, " $1");
      const finalResult: string = result.toUpperCase();
      columnNameList.push(finalResult)
    });
    return columnNameList;
  }

  private getFilterBasedArrayList(customColumns) {
    const propertyArray: string[] = customColumns.map(c => c.property);
    const exportArray = deepCopy(this.filterTeamMembers);
    exportArray && exportArray.forEach((res) => {
      res.trending = this.getTrendingStatus(res.trending);
      Object.keys(res).forEach(k => {
        if (propertyArray.indexOf(k) === -1) {
          delete res[k];
        }
      });
      return false;
    });
    return exportArray;
  }

  private setSparkDetailByRoute(empId) {
    let sparkDetail: sparkDetailByRoute;
    sparkDetail = {
      widgetHeader: 'Sparks for',
      tooltipId: 0,
      routeType: 'sparkList',
      empId: empId,
      dashboardTypeId: 3,
      isRedirectFromNotification: false
    }
    sessionStorage.setItem(SparkDetail, JSON.stringify(sparkDetail))
  }

  private getTrendingStatus(trending: number): any {
    let trendingStatus: string = '';

    if (trending === 1) {
      trendingStatus = 'Increased Performance';
    } else if (trending === 2) {
      trendingStatus = 'Decreased Performance';
    } else if (trending === 3) {
      trendingStatus = 'Steady Performance';
    }
    return trendingStatus;
  }
}
