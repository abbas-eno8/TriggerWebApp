import { Component, OnInit, Input, ViewContainerRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { BreakpointState } from '@angular/cdk/layout';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// --------------------------------------------------------------- //
import { LoaderService } from '../../../../core/loader/loader.service';
import { Actions, DesktopWidth, Role } from '../../../../core/magic-string/common.model';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { ActionPermissionService, canAdd } from '../../../../core/services/action-permission/action-permission.service';
import { MemberPresenter } from './member-presenter/member.presenter';
import { TeamMembers, Department, TeamMemberColumns, ColumnConfiguration } from '../../team-member-model';
import { MemberDesktopPresentation } from './member-desktop/member-desktop.presentation';
import { MemberAccordianPresentation } from './member-accordian/member-accordian.presentation';
import { PaginationPresentation } from './pagination-presentation/pagination.presentation';
import { EmployeeStatus } from '../../../../employees/employee-model';

@Component({
  selector: 'trigger-member-ui',
  templateUrl: './member-presentation.html',
  styleUrls: ['./member-presentation.scss'],
})
export class MemberPresentation implements OnInit {

  @Input() public set customColumn(customColumn: any) {
    if (customColumn) {
      this.columns = this.presenter.checkResponse(customColumn);
      const cloneData = JSON.parse(JSON.stringify(this.columns));
      this.customColumns = cloneData;
      this.hiddenCustomColumns = this.customColumns.filter(f => f.hidden);
      this.selectedColumnId = this.customColumns.filter(f => f.hidden).map(c => c.columnId);
    }
  }
  public get customColumn(): any {
    return this.customColumns;
  }

  /** This property is used for store sparks */
  protected columns: TeamMemberColumns[];
  public customColumns: TeamMemberColumns[];
  protected hiddenCustomColumns: TeamMemberColumns[];

  public isDisabledAdvancedFilter: boolean;

  /** This property is used for get sparks response from container component */
  @Input() public set departments(departments: Department[]) {
    if (departments) {
      this._departments = departments;
      this.filterdepartments = departments;
    }
  }
  public get departments(): Department[] {
    return this._departments;
  }
  /** This property is used for store sparks */
  protected _departments: Department[];
  public filterdepartments: Department[];
  /** This property is used for get sparks response from container component */
  @Input() public set employees(value: TeamMembers[]) {
    if (value) {
      this._teamMembers = this.presenter.checkResponse(value);
      this._teamMembers = this._teamMembers.length > 0 ? this.presenter.filterMembers(this._teamMembers) : [];
      this.presenter.getActiveTeamMembers();
      this.filterTeamMembers = this._teamMembers;
    }
  }
  public get employees(): TeamMembers[] {
    return this._teamMembers;
  }
  /** This property is used for store sparks */
  protected _teamMembers: TeamMembers[];
  protected filterTeamMembers: TeamMembers[];

  // get input from container and if value get true then close overlay modal popup
  @Input() public set apiCalledSuccess(isCalled: boolean) {
    if (isCalled) {
      this.filterTeamMembers = this.sentmailIds.length > 0 ? this.presenter.getLatestMembers(this.sentmailIds) : this.filterTeamMembers;
      this.filterTeamMembers = this.empId > 0 ? this.presenter.removeDeletedMembers(this.empId) : this.filterTeamMembers;
      this.empId = 0;
      this.sentmailIds = [];
      this.searchKeywords = '';
      this.selectedDept = '0';

    }

  }

  /** EventEmitter for delete-team-member-api which we called in container page */
  @Output() delete: EventEmitter<number> = new EventEmitter();
  /** EventEmitter for column-configuration-api which we called in container page */
  @Output() columnConfiguration: EventEmitter<ColumnConfiguration[]> = new EventEmitter();
  /** EventEmitter for column-configuration-api which we called in container page */
  @Output() sendMail: EventEmitter<string> = new EventEmitter();

  @ViewChild('viewListRef', { read: ViewContainerRef, static: false }) viewListRef: ViewContainerRef;
  @ViewChild('viewPaginationRef', { read: ViewContainerRef, static: false }) viewPaginationRef: ViewContainerRef;

  public isTriggerAdminOrAdmin: boolean;
  public userData: any;
  public searchKeywords: string;
  public selectedDept: string;
  public isListViewCreated: boolean;
  public pageTitle: number;
  public idDisabledSendMailButton: boolean;
  public sentmailIds: number[];
  public empId: number;
  public idDisplayBtn: boolean;
  public isTriggerAdmin: boolean;
  public isTriggerAnEmployee: boolean;
  public selectedColumnId: number[];
  viewSparkcomponentRef: any;
  viewPaginationcomponentRef: any;
  private destroy: Subject<void> = new Subject();

  constructor(
    public breakpointObserver: BreakpointObserver,
    public presenter: MemberPresenter,
    private loaderService: LoaderService,
    private actionPermissionService: ActionPermissionService,
    private globalResponseHandlerService: GlobalResponseHandlerService
  ) {
    this.destroy = new Subject();
    this.selectedDept = '0';
    this.sentmailIds = [];
    this.empId = 0;
    this.idDisabledSendMailButton = true;
    this.pageTitle = this.presenter.setPageTitle();
    this.presenter.redirectedFromDashboard();
    this.isDisabledAdvancedFilter = this.presenter.isRedirectedFromDashboard ? true : null;
    this.idDisplayBtn = this.presenter.isDisplayButton();
    this.isTriggerAdmin = this.presenter.isTriggerAdmin();
    this.isTriggerAdminOrAdmin = this.presenter.isTriggerAdminOrAdmin();
    this.isTriggerAnEmployee = this.globalResponseHandlerService.getUser().roleId === Role.Admin ? true :
      this.actionPermissionService.isCheckCommonPermission(Actions.TriggerAnEmployee, canAdd) ? true : false;
  }


  ngOnInit() {
    this.presenter.createView$.pipe(takeUntil(this.destroy)).subscribe(([isAdvancedFilter, member]) => {
      this.filterTeamMembers = member;
      if ((this.filterTeamMembers.length === 0 && this.isListViewCreated) || (this.filterTeamMembers.length > 0 && !this.isListViewCreated)) {
        this.createView();
      }
    });

    this.presenter.delete$.pipe(takeUntil(this.destroy)).subscribe((empId: number) => {
      this.empId = empId;
      this.delete.next(empId);
    });

    this.presenter.sendMailIdsList$.pipe(takeUntil(this.destroy)).subscribe((ids: number[]) => {
      this.sentmailIds = ids;
      this.idDisabledSendMailButton = ids.length > 0 ? null : true;
    });

    this.presenter.columns$.pipe(takeUntil(this.destroy)).subscribe((columns: TeamMemberColumns[]) => {
      this.hiddenCustomColumns = columns.filter(f => f.hidden);
      this.selectedColumnId = this.hiddenCustomColumns.filter(f => f.hidden).map(c => c.columnId)
      this.viewSparkcomponentRef.instance.columns = columns.filter(f => f.hidden);
    });

    this.presenter.columnConfig$.pipe(takeUntil(this.destroy)).subscribe((isChange: boolean) => {
      let configuredColumns: number[] = this.hiddenCustomColumns.filter(f => f.hidden).map(c => c.columnId);
      if (configuredColumns !== this.selectedColumnId) {
        let obj = this.presenter.columnConfigurationCheck(this.hiddenCustomColumns, isChange);
        if (isChange && obj.length > 0) {
          this.columnConfiguration.next(obj);
        } else {
          const cloneData = JSON.parse(JSON.stringify(this.columns));
          this.customColumns = cloneData;
          this.hiddenCustomColumns = this.columns.filter(f => f.hidden);
          this.viewSparkcomponentRef.instance.columns = this.hiddenCustomColumns;
        }
      }
    });
  }

  ngOnChanges() {
    if (this.columns && this._teamMembers && (this.departments || this.isDisabledAdvancedFilter)) {
      this.createView();
      this.loaderService.emitIsLoaderShown(false);
    }
    // if (this.viewPaginationcomponentRef) {
    //   this.viewPaginationcomponentRef.instance.paginationEvent.subscribe((index) => {
    //     this.presenter.teamMemberChunks(index[0], index[1]);
    //   });
    // }
  }

  private createView(): void {
    this.breakpointObserver
      .observe([DesktopWidth])
      .subscribe((state: BreakpointState) => {
        this.createListViewComponent(state.matches);
      });
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : Method for create componennt dynamically (accordian/desktop/page-not-found/pagination).
   */
  private createListViewComponent(isDesktopView: boolean): void {
    this.viewListRef.clear();
    this.viewPaginationRef.clear();

    if (this.filterTeamMembers && this.filterTeamMembers.length > 0) {
      this.isListViewCreated = true;
      this.viewPaginationcomponentRef = this.presenter.createPaginationView(this.viewPaginationcomponentRef, this.viewPaginationRef, PaginationPresentation);
      if (isDesktopView) {
        this.viewSparkcomponentRef = this.presenter.createListViewPage(this.viewSparkcomponentRef, this.viewListRef, MemberDesktopPresentation, this.hiddenCustomColumns);
      } else {
        this.viewSparkcomponentRef = this.presenter.createListViewPage(this.viewSparkcomponentRef, this.viewListRef, MemberAccordianPresentation, this.hiddenCustomColumns);
      }
    } else {
      this.isListViewCreated = false;
      this.viewSparkcomponentRef = this.presenter.createNoRecordsFoundPage(this.viewSparkcomponentRef, this.viewListRef);
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : Keyup event for filtering team-members by search-text.
   */
  public searchByText(searchKeywords: string): void {
    let searchparameters = this.customColumns.map(x => x.property);
    this.filterTeamMembers = this.presenter.filterMembersBySearchText(this._teamMembers, searchKeywords, searchparameters, parseInt(this.selectedDept));
    this.presenter.createDynamicView(this.filterTeamMembers, this.isListViewCreated);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : Filtering team-members by selecting department on change department event.
   */
  public onChangeDepartment(deptId: string): void {
    this.searchKeywords = '';
    this.filterTeamMembers = this.presenter.filterMembersByDepartment(this._teamMembers, parseInt(deptId));
    this.presenter.createDynamicView(this.filterTeamMembers, this.isListViewCreated);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : Click event on check chechbox for send mail.
   */
  public onClickSendMail(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.sendMail.next(this.sentmailIds.join());
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 17-02-2020
   * Description : Click event on click advanced filter.
   */
  public onClickOpenCustonFilterModal(): void {
    this.searchKeywords = '';
    this.selectedDept = '0';
    this.filterTeamMembers = this._teamMembers;
    this.presenter.openModalForAdvanceFilter(this.filterdepartments, this._departments);
  }

  public addClassByTheme() {
    this.presenter.addClssBySelectedTheme()
  }

  public exportAsXLSX(): void {
    this.presenter.exportAsXLSX(this.hiddenCustomColumns);
  }
}