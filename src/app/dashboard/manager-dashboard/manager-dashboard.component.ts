/**
@author : Mihir Patel
@class : DashboardComponent
@description :DashboardComponent is created for dashboard page, which is show after login 
**/
import { Component, OnInit, ViewChild, HostListener, OnDestroy, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
// require('highcharts/highcharts-more')(Highcharts);
// require('highcharts/modules/solid-gauge')(Highcharts);
// import {  FormBuilder, FormGroup } from '@angular/forms';
import { ManagerDashboardService } from './manager-dashboard-service/manager-dashboard.service';
import { element } from 'protractor';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { DirectReportsToDateComponent } from './direct-reports-to-date/direct-reports-to-date.component';
import { DirectReportsByAverageScoreComponent } from './direct-reports-by-average-score/direct-reports-by-average-score.component';
import { OrgToDateComponent } from './org-to-date/org-to-date.component';
import { OrgToDateCircularPieComponent } from './org-to-date-circular-pie/org-to-date-circular-pie.component';
import { DirectReportsToDateProgressiveComponent } from './direct-reports-to-date-progressive/direct-reports-to-date-progressive.component';
import { OrgByAverageScoreComponent } from './org-by-average-score/org-by-average-score.component';
import { OrgToDateCircularComponent } from './org-to-date-circular/org-to-date-circular.component';
import { DirectReportsToDateProgressivePieComponent } from './direct-reports-to-date-progressive-pie/direct-reports-to-date-progressive-pie.component';
import { DashboardGraphModifiedName, DashboardPassHeaderName, RefrshComponent, CurrentRouteUrl, dashboardYear, departmentList, dashboardData, directReportsToDate, directReportsByAverageScore, orgToDateModel, orgByAverageScore, averageDirectReportsToday, orgToDateCircular, widgetData, DataItemID, DragItemPositioned, widgetDetail, Dashboard_, IN, Today, NameConstant, NullConstatnt, OpenSelectDropdownClass, ThreeColumnDivContaierRef, SixColumnDivContaierRef, IDConstatnt, TrueAsString, Year2020, RedirectionParam, MyDirectWorkLocationHistoryContainerRef } from './manager-dashboard-model';
import { SelectDepartmentComponent } from './select-department/select-department.component';
import * as CryptoJS from 'crypto-js';
import { TotalDirectReportTodayComponent } from './total-direct-report-today/total-direct-report-today.component';
import { TotalOrgTodayComponent } from './total-org-today/total-org-today.component';
import { AverageDirectReportTodayComponent } from './average-direct-report-today/average-direct-report-today.component';
import { AverageOrgTodayComponent } from './average-org-today/average-org-today.component';
import { LoaderService } from '../../core/loader/loader.service';
import { EmployeeService } from '../../core/services/employee-service/employee.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { Encryption, Session } from '../../core/magic-string/common-validation-model';
import { CompareString, ApiResponseStatus, CdkOverlayPane, IconDragDropClass, GridItemClass, GridSizerClass, GridClass, Role, dashboardClass, Route } from '../../core/magic-string/common.model';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';
import { TooltioHeaderDashboard, TooltioHeaderClientDashboard } from '../../shared/tooltip/tooltip-model';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { ThreeCloumnWidgetsComponent } from './mobile-view/three-cloumn-widgets/three-cloumn-widgets.component';
import { CommonService } from '../../core/services/common/common.service';
import { GraphGrade, dashboardButtonsStatus } from '../dashboard-model';
import { TeamDashboardStatus, DashboardStatus } from '../dashboard-model';
import { MyDirectWorkLocationHistoryComponent } from './my-direct-work-location-history/my-direct-work-location-history.component';
declare var $: any;
declare var Packery: any;
declare var Draggabilly: any;
@Component({
    selector: 'trigger-dashboard',
    templateUrl: './manager-dashboard.component.html',
    styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit, OnDestroy {
    componentRef: any;
    @ViewChild(MyDirectWorkLocationHistoryContainerRef, { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
    public departments: Array<any> = [];
    [x: string]: any;
    //  For three column widgets : 
    @ViewChild(ThreeColumnDivContaierRef, { read: ViewContainerRef, static: false }) private threeColumncontainerRef: ViewContainerRef;
    //  For six column widgets : 
    @ViewChild(SixColumnDivContaierRef, { read: ViewContainerRef, static: false }) private sixColumnContainerRef: ViewContainerRef;
    //  For select department dropdown component :
    @ViewChild(SelectDepartmentComponent, { static: false }) selectDepartmentComponent: SelectDepartmentComponent;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.lastTouchStartEvent === 0) {
            this.lastTouchStartEvent = Date.now();
        }
        this.checkTimeMethod();
    }
    public pageTitle: string;
    public companyId: number;
    public managerId: string;
    public noOfTodatDirectReport: string;
    public avgScoreOfTodayDirectReport: string;
    public avgScoreOfTodayDirectReportClass: string;
    public noOfMyOrgToday: number;
    public avgScoreOfOrgToday: string;
    public avgScoreOfOrgTodayClass: string;
    public directReportPerGrapgArray: directReportsToDate[];
    public directReportRankGraphArray: directReportsByAverageScore[];
    public orgReportPerGrapgArray: orgToDateModel[];
    public orgReportRankGraphArray: orgByAverageScore[];
    public todayDirectReport: averageDirectReportsToday[];
    public todayOrgtReport: orgToDateCircular[];
    public selectedYearBinding: string;
    public truvelopTips: string;
    //  For packery : 
    public grid: any;
    public packeryArray: widgetData[];
    public sequence: widgetDetail[];
    public tileNotEnabled: widgetDetail[];
    public windowWidth: any;
    public noTiles: any;
    public userId: number;
    public roleId: number;
    public lastSequenceNumber: number;
    public localStorageManagerPackeryArray: widgetData[];
    public tilesArray: widgetData[];
    public widgetType: number;
    public managerCheckedWidgetArray: widgetData[];
    public isUncheckedCount: number;
    public yearList: dashboardYear[];
    public selectedYear: any;
    // selectYearForm: FormGroup;
    public selectedYearForLast12Months: any;
    public getSelectedYear: number;
    private lastTouchStartEvent: number;
    private ignoreEventTime: number;
    public selectedDepartment: any; // this needs to check
    public dashboardData: dashboardData;
    public role: string;
    public isTeamDashboradEnabled: boolean;
    public isMobileView: boolean = false;
    public isComponentRender: boolean = false;
    // public myDashboardStatus: boolean;
    public breakPointvalue: any;
    public isShowIPGrade: boolean;
    public dashboardButtonsStatus: dashboardButtonsStatus;
    constructor(
        private commonService: CommonService,
        private loaderService: LoaderService,
        private managerDashboardService: ManagerDashboardService,
        private router: Router,
        private employeeService: EmployeeService,
        private globalResponseHandlerService: GlobalResponseHandlerService,
        private resolver: ComponentFactoryResolver,
        private globalEventsManager: GlobalEventsManager,
        public breakpointObserver: BreakpointObserver) {
        this.loaderService.emitIsLoaderShown(true);
        this.ignoreEventTime = 300;
        this.lastTouchStartEvent = 0;
        // Calling media matcher method for get screen resolution, with help of this widget show for dekstop and mobile :
        this.breakPointvalue = this.breakpointObserver
            .observe(['(min-width: 768px)'])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.isMobileView = false;
                    this.destroyAndRecallPackery();
                } else {
                    this.isMobileView = true;
                    this.destroyAndRecallPackery();
                }
            });
        this.dashboardButtonsStatus = {
            isTeamDashoard: false,
            isManagerDashboard: true,
            isMyDashboard: false,
            isMyWall: false
        }
        sessionStorage.setItem(DashboardStatus, JSON.stringify(this.dashboardButtonsStatus))
    }

    ngOnInit() {
        this.initDefaultVariable();
    }

    public createWorkLocationHistoryView(): any {
        let factory = this.resolver.resolveComponentFactory(MyDirectWorkLocationHistoryComponent);
        this.componentRef = this.entry.createComponent(factory);
    }

    /**
   * Author : Mihir Patel
   * Modified-Date :  05-03-2019
   * Description : Create a method for check time gap and based on that call destroyAndRecallPackery method.
   */
    checkTimeMethod() {
        if (Date.now() > this.lastTouchStartEvent + this.ignoreEventTime) {
            this.destroyAndRecallPackery();
            this.lastTouchStartEvent = 0;
        }
    }

    destroyAndRecallPackery() {
        if (this.grid) {
            this.grid.destroy();
            setTimeout(() => {
                // this.getPackery();
                this.loadChildComponent(this.packeryArray);
            }, 500);
        }
    }

    openSelectDropdown() {
        var parentElement = document.getElementsByClassName(CdkOverlayPane)[0];
        if (parentElement) { parentElement.classList.add(OpenSelectDropdownClass) };
    }
    /**
    * Author : Mihir Patel
    * Modified-Date :  19-12-2018
    * Description : define all default varible and store value from session.
    */
    initDefaultVariable() {
        this.pageTitle = TooltioHeaderDashboard;
        sessionStorage.setItem(Session.TeamMemberQueryString, '');
        let userData = this.globalResponseHandlerService.getUserData();
        this.localStorageManagerPackeryArray = [];
        let isRedirectToDashboard: boolean;
        this.companyId = userData.clientId;
        this.managerId = userData.loginEmpId;
        this.userId = userData.userId;
        this.roleId = userData.roleId;
        this.role = userData.userRole;
        isRedirectToDashboard = userData.isRedirectToDashboard;
        this.widgetType = 2;
        if (isRedirectToDashboard) {
            this.managerId = '0';
            this.pageTitle = TooltioHeaderClientDashboard;
        }
        // this.myDashboardStatus = this.isDisabledMyDashboard()
        // sessionStorage.setItem(MyDashboardStatus, JSON.stringify(this.myDashboardStatus))
        // Get year list by companyId : 
        this.getYear();
    }

    /**
    * Author : Mihir Patel
    * Modified-Date :  09-01-2019
    * Description : For Get year
    */
    getYear() {
        if (!!this.globalResponseHandlerService.decriptData(Encryption.TriggerSelectYearMessage, Encryption.TriggerSelectYearKey)) {
            this.selectedYear = this.globalResponseHandlerService.decriptData(Encryption.TriggerSelectYearMessage, Encryption.TriggerSelectYearKey);
        } else {
            this.selectedYear = new Date().getFullYear();
        }
        this.getGradeBasedOnYear(parseInt(this.selectedYear));
        // this.selectedYearForm();
        if (JSON.parse(this.globalResponseHandlerService.decriptData(Encryption.ManagerDashboardYearListMessage, Encryption.ManagerDashboardYearListKey))) {
            this.yearList = JSON.parse(this.globalResponseHandlerService.decriptData(Encryption.ManagerDashboardYearListMessage, Encryption.ManagerDashboardYearListKey))
            this.getDepartment(this.selectedYear);
        } else {
            this.getYearServiceCall()
        }
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date : 08-01-2020
     * Description : Get grades based on year selection
     */
    getGradeBasedOnYear(year: number): void {
        if (year === Year2020 || year > Year2020) {
            this.isShowIPGrade = false;
        } else {
            this.isShowIPGrade = true;
        }
    }

    //  Create mehod for service call to get year list : 
    getYearServiceCall(): void {
        this.managerDashboardService.getYear(this.companyId, this.managerId).subscribe(
            (response) => {
                if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
                    this.yearList = response.data;
                    this.getDepartment(this.selectedYear);
                    var encryptedYearList = CryptoJS.AES.encrypt(JSON.stringify(this.yearList), Encryption.ManagerDashboardYearListMessage);
                    sessionStorage.setItem(Encryption.ManagerDashboardYearListKey, encryptedYearList.toString());
                }
            })
    }

    changeYear(year) {
        this.loaderService.emitIsLoaderShown(true);
        this.selectedYear = year;
        this.getGradeBasedOnYear(parseInt(this.selectedYear));
        //  session null for department when change year : 
        this.globalResponseHandlerService.encriptData(NullConstatnt, Encryption.TriggerSelectDepartmentMessage, Encryption.TriggerSelectDepartmentKey);
        // save selected year in session when it will change : 
        this.globalResponseHandlerService.encriptData(this.selectedYear.toString(), Encryption.TriggerSelectYearMessage, Encryption.TriggerSelectYearKey);
        // get department by selected year : 
        this.getDepartment(this.selectedYear);
    }

    /**
   * Author : Mihir Patel
   * Modified-Date :  10-1-2018
   * Description : For Get Department by client Id , By year
   */
    getDepartment(year) {
        // this.loaderService.emitIsLoaderShown(true);
        this.globalResponseHandlerService.encriptData(year.toString(), Encryption.TriggerSelectYearMessage, Encryption.TriggerSelectYearKey);
        let allDepartment: departmentList[] = [];
        this.selectedDepartment = [];
        //  Get selcted year and use this when call api of manager dashboard by year and department as well as get department list by selcted year : 
        if (year === CompareString.Last_12Months) {
            this.getSelectedYear = 0;
        } else {
            this.getSelectedYear = year;
        }
        this.managerDashboardService.getDepartmentByYear(this.companyId, this.getSelectedYear).subscribe(
            (departmentResponse) => {
                if (this.globalResponseHandlerService.getApiResponse(departmentResponse, false, false)) {
                    allDepartment = departmentResponse.data.map((departmentObj) => ({
                        name: departmentObj.department,
                        id: departmentObj.mstDepartmentId,
                    }));
                    this.globalResponseHandlerService.encriptData(JSON.stringify(allDepartment.length), Encryption.TriggerDepartmentObjectMessage, Encryption.TriggerDepartmentObjectKey);
                    let selectedDepartmentEncrypt = JSON.parse(this.globalResponseHandlerService.decriptData(Encryption.TriggerSelectDepartmentMessage, Encryption.TriggerSelectDepartmentKey));
                    if (!!selectedDepartmentEncrypt && selectedDepartmentEncrypt.length > 0) {
                        this.selectedDepartment = selectedDepartmentEncrypt;
                        this.selectedDepartment.forEach(elem => {
                            let isExistObject = allDepartment.filter(c => (c.id === elem.id))
                            if (isExistObject.length === 0) {
                                this.selectedDepartment.pop(elem);
                            }
                        });

                    } else {
                        this.selectedDepartment = [...allDepartment];
                    }
                    allDepartment = _.sortBy(allDepartment, NameConstant);
                    //  get manager dashboard by department which are selcetd
                    this.gerManagerDashboardByDepartment(this.selectedDepartment);
                    // Pass all department list to select department component : 
                    this.selectDepartmentComponent.getDepartments(allDepartment);
                }
            }
        );
    }

    /**
        * Author : Mihir Patel
        * Modified-Date : 04-02-2019
        * Description : get manger dashboard data by department wise.
    */
    gerManagerDashboardByDepartment(selectedItemArray) {
        this.getSelecterYearBindingValue();
        let arrayString = this.getArrayString(selectedItemArray);
        this.managerDashboardService.getManagerDashboardByDepartment(this.companyId, Number(this.managerId), Number(this.getSelectedYear), arrayString).subscribe((response) => {

            if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
                let dashboardObj = response.data[0];
                if (dashboardObj) {
                    this.isTeamDashboradEnabled = this.isDisabledTeam(dashboardObj.teamListCount);
                    sessionStorage.setItem(TeamDashboardStatus, JSON.stringify(this.isTeamDashboradEnabled))
                    this.globalEventsManager.updateManagerDashboardStatus(true);
                }

                this.dashboardData = {
                    directRptAvgScore: dashboardObj.directRptAvgScore,
                    directRptAvgScoreRank: dashboardObj.directRptAvgScoreRank,
                    directRptCnt: dashboardObj.directRptCnt,
                    lstGraphDirectRptPct: dashboardObj.lstGraphDirectRptPct,
                    lstGraphDirectRptRank: dashboardObj.lstGraphDirectRptRank,
                    lstGraphOrgRptPct: dashboardObj.lstGraphOrgRptPct,
                    lstGraphOrgRptRank: dashboardObj.lstGraphOrgRptRank,
                    lstGraphTodayDirectRpt: dashboardObj.lstGraphTodayDirectRpt,
                    lstGraphTodayOrgRpt: dashboardObj.lstGraphTodayOrgRpt,
                    orgRptAvgScore: dashboardObj.orgRptAvgScore,
                    orgRptAvgScoreRank: dashboardObj.orgRptAvgScoreRank,
                    orgRptCnt: dashboardObj.orgRptCnt,
                    truvelopTips: dashboardObj.truvelopTips
                }
                this.assignValueToInput(this.dashboardData)
            } else {
                this.isTeamDashboradEnabled = true;
                sessionStorage.setItem(TeamDashboardStatus, JSON.stringify(this.isTeamDashboradEnabled))
                this.globalEventsManager.updateManagerDashboardStatus(true);
                if (response.status === ApiResponseStatus.NotFound) {
                    this.bindBlankDataToInput();
                }
            }
        }
        );
    }

    private isDisabledTeam(teamListCount: number): boolean {
        if (teamListCount > 0) {
            return false;
        } else {
            return true;
        }
    }

    // private isDisabledMyDashboard(): boolean {
    //     if (this.roleId === Role.TriggerAdmin) {
    //         return true;
    //     } else if (this.globalResponseHandlerService.getUserData().myDashboardEnabled) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    getSelecterYearBindingValue(): void {
        if (new Date().getFullYear() > parseInt(this.selectedYear)) {
            this.selectedYearBinding = IN + this.selectedYear;
        } else if (new Date().getFullYear() === parseInt(this.selectedYear)) {
            this.selectedYearBinding = Today;
        } else if (this.selectedYear === CompareString.Last_12Months) {
            this.selectedYearBinding = CompareString.Over_The_Last_12Months;
        }
    }
    //  For get department string using array.join method
    getArrayString(selectedItemArray): string {
        let arrayOfId = [];
        selectedItemArray.forEach(elem => {
            arrayOfId.push(elem.id);
        })
        let arrayString = arrayOfId.join();
        return arrayString;
    }

    assignValueToInput(dashboardData) {
        this.noOfTodatDirectReport = dashboardData.directRptCnt;
        this.avgScoreOfTodayDirectReport = dashboardData.directRptAvgScoreRank;
        this.avgScoreOfTodayDirectReportClass = this.getClassByGrade(dashboardData.directRptAvgScoreRank);
        this.noOfMyOrgToday = dashboardData.orgRptCnt;
        this.avgScoreOfOrgToday = dashboardData.orgRptAvgScoreRank;
        this.avgScoreOfOrgTodayClass = this.getClassByGrade(dashboardData.orgRptAvgScoreRank);
        this.directReportPerGrapgArray = dashboardData.lstGraphDirectRptPct;
        this.directReportRankGraphArray = dashboardData.lstGraphDirectRptRank;
        this.orgReportPerGrapgArray = dashboardData.lstGraphOrgRptPct;
        this.orgReportRankGraphArray = dashboardData.lstGraphOrgRptRank;
        this.todayDirectReport = dashboardData.lstGraphTodayDirectRpt;
        this.todayOrgtReport = dashboardData.lstGraphTodayOrgRpt;
        this.truvelopTips = dashboardData.truvelopTips;
        this.getManagerPackeryData(this.userId, this.widgetType);
    }


    /**
         * Author : Anjali Tandel
         * Created-Date : 10-09-2019
         * Description : Get class by grade.
         */
    getClassByGrade(grade: string): string {
        if (grade !== '') {
            return dashboardClass.find(c => grade.includes(c.grade)).bindClass;
        } else {
            return '';
        }
    }
    bindBlankDataToInput() {
        this.noOfTodatDirectReport = '';
        this.avgScoreOfTodayDirectReport = '';
        this.noOfMyOrgToday = 0;
        this.avgScoreOfOrgToday = '';
        this.directReportPerGrapgArray = [];
        this.directReportRankGraphArray = [];
        this.orgReportPerGrapgArray = [];
        this.orgReportRankGraphArray = [];
        this.todayDirectReport = [];
        this.todayOrgtReport = [];
        this.truvelopTips = '';
        this.getManagerPackeryData(this.userId, this.widgetType);
    }

    // Output emit from select department component 
    public dashboardFromDepartment(selectedDepartment) {
        this.loaderService.emitIsLoaderShown(true);
        this.selectedDepartment = selectedDepartment;
        this.gerManagerDashboardByDepartment(this.selectedDepartment);
    }

    /**
       * Author : Mihir Patel
       * Modified-Date : 19-12-2018
       * Description : getManagerPackeryData method created for calling api and get widget data
   */
    getManagerPackeryData(userId, widgetType) {
        this.packeryArray = [];
        this.commonService.getWidgetData(userId, widgetType).subscribe(
            (widgetResponse) => {
                if (this.globalResponseHandlerService.getApiResponse(widgetResponse, false, false)) {
                    let responseArray = widgetResponse.data;
                    responseArray.forEach(element => {
                        if (element.position === null) {
                            element.position = '';
                        }
                        if (element.widgetId === 8) {
                            element.widgetActualName = DashboardGraphModifiedName.TotalNumberOfDirectReports;
                        } else if (element.widgetId === 9) {
                            element.widgetActualName = DashboardGraphModifiedName.AverageScoreOfMyDirectReports;
                        } else if (element.widgetId === 10) {
                            element.widgetActualName = DashboardGraphModifiedName.TotalNumberOfMyOrganiztion;
                        } else if (element.widgetId === 11) {
                            element.widgetActualName = DashboardGraphModifiedName.AverageScoreOfMyOrganization;
                        } else if (element.widgetId === 12) {
                            element.widgetActualName = DashboardGraphModifiedName.MyDirectReportsColumnGraph;
                        } else if (element.widgetId === 14) {
                            element.widgetActualName = DashboardGraphModifiedName.MyorganizationColumnGraph;
                        } else if (element.widgetId === 16) {
                            element.widgetActualName = DashboardGraphModifiedName.MyDirectReportsProgressiveGraph;
                        } else if (element.widgetId === 17) {
                            element.widgetActualName = DashboardGraphModifiedName.MyOrganizationCircularGraph;
                        } else if (element.widgetId === 18) {
                            element.widgetActualName = DashboardGraphModifiedName.MyDirectReportsProgressivePieGraph;
                        } else if (element.widgetId === 19) {
                            element.widgetActualName = DashboardGraphModifiedName.MyOrganizationCircularPieGraph;
                        } else if (element.widgetId === 26) {
                            element.widgetActualName = DashboardGraphModifiedName.MyDirectWorkLocationHistory;
                        }
                    })
                    this.packeryArray = responseArray.map((widget) => ({
                        userId: widget.userId,
                        id: widget.widgetId,
                        widgetId: Dashboard_ + widget.widgetId,
                        tileSelector: widget.widgetName,
                        isActive: widget.isActive,
                        sequenceNumber: widget.sequenceNumber,
                        tileSequence: widget.tileSequence,
                        position: widget.position,
                        widgetActualName: widget.widgetActualName
                    }));
                    this.managerCheckedWidgetArray = this.packeryArray;
                    this.loadChildComponent(this.packeryArray);
                }

            }
        );
    }

    createComponent(componentName, containerrefType) {
        const dashboardComponentFactory: ComponentFactory<any> = this.resolver.resolveComponentFactory(componentName);
        if (containerrefType === 1) {
            let componentRef = this.threeColumncontainerRef.createComponent(dashboardComponentFactory);
            this.passCommonInput(componentRef)
            return componentRef;
        } else {
            let componentRef = this.sixColumnContainerRef.createComponent(dashboardComponentFactory);
            this.passCommonInput(componentRef)
            return componentRef;
        }
    }

    public loadChildComponent(widgetArray) {
        this.windowWidth = $(window).width()
        this.clearContainer();
        this.isComponentRender = false;
        if (widgetArray.length > 0) {
            widgetArray.forEach(widget => {
                if (widget.isActive) {
                    if (this.isMobileView) {
                        if (!this.isComponentRender) {
                            let componentRef = this.createComponent(ThreeCloumnWidgetsComponent, 1);
                            componentRef.instance.noOfTodatDirectReport = this.noOfTodatDirectReport;
                            componentRef.instance.avgScoreOfTodayDirectReport = this.avgScoreOfTodayDirectReport;
                            componentRef.instance.avgScoreOfTodayDirectReportClass = this.avgScoreOfTodayDirectReportClass;
                            componentRef.instance.noOfMyOrgToday = this.noOfMyOrgToday;
                            componentRef.instance.avgScoreOfOrgToday = this.avgScoreOfOrgToday;
                            componentRef.instance.avgScoreOfOrgTodayClass = this.avgScoreOfOrgTodayClass;
                            this.isComponentRender = true;
                            componentRef = this.redirectToListEvent(componentRef);
                        }

                    } else {
                        if (widget.id === 8) {
                            let componentRef = this.createComponent(TotalDirectReportTodayComponent, 1);
                            componentRef.instance.noOfTodatDirectReport = this.noOfTodatDirectReport;
                            this.commonOutputMethod(componentRef);
                        } else if (widget.id === 9) {
                            let componentRef = this.createComponent(AverageDirectReportTodayComponent, 1);
                            componentRef.instance.avgScoreOfTodayDirectReport = this.avgScoreOfTodayDirectReport;
                            componentRef.instance.avgScoreOfTodayDirectReportClass = this.avgScoreOfTodayDirectReportClass;
                            this.removeWidgetEvent(componentRef);
                        } else if (widget.id === 10) {
                            let componentRef = this.createComponent(TotalOrgTodayComponent, 1);
                            componentRef.instance.noOfMyOrgToday = this.noOfMyOrgToday;
                            this.commonOutputMethod(componentRef);
                        } else if (widget.id === 11) {
                            let componentRef = this.createComponent(AverageOrgTodayComponent, 1);
                            componentRef.instance.avgScoreOfOrgToday = this.avgScoreOfOrgToday;
                            componentRef.instance.avgScoreOfOrgTodayClass = this.avgScoreOfOrgTodayClass;
                            this.removeWidgetEvent(componentRef);
                        }
                    }
                    // load component by ID
                    if (widget.id === 12) {
                        let componentRef = this.createComponent(DirectReportsToDateComponent, 0);
                        componentRef.instance.directReportPerGrapgArray = this.directReportPerGrapgArray;
                        componentRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: this.truvelopTips };
                        componentRef.instance.isMobileView = this.isMobileView;
                        componentRef.instance.isIpGrade = this.isShowIPGrade;
                        this.commonOutputMethod(componentRef);
                    } else if (widget.id === 13) {
                        let componentRef = this.createComponent(DirectReportsByAverageScoreComponent, 0);
                        componentRef.instance.directReportRankGraphArray = this.directReportRankGraphArray;
                        componentRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: this.truvelopTips };
                        componentRef.instance.isIpGrade = this.isShowIPGrade;
                        this.removeWidgetEvent(componentRef);
                    } else if (widget.id === 14) {
                        let componentRef = this.createComponent(OrgToDateComponent, 0);
                        componentRef.instance.orgReportPerGrapgArray = this.orgReportPerGrapgArray;
                        componentRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: this.truvelopTips };
                        componentRef.instance.isMobileView = this.isMobileView;
                        componentRef.instance.isIpGrade = this.isShowIPGrade;
                        this.commonOutputMethod(componentRef);
                    } else if (widget.id === 15) {
                        let componentRef = this.createComponent(OrgByAverageScoreComponent, 0);
                        componentRef.instance.orgReportRankGraphArray = this.orgReportRankGraphArray;
                        componentRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: this.truvelopTips };
                        componentRef.instance.isIpGrade = this.isShowIPGrade;
                        this.removeWidgetEvent(componentRef);
                    } else if (widget.id === 16) {
                        let componentRef = this.createComponent(DirectReportsToDateProgressiveComponent, 0);
                        componentRef.instance.todayDirectReport = this.todayDirectReport;
                        componentRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: this.truvelopTips };
                        componentRef.instance.isShowIPGrade = this.isShowIPGrade;
                        this.commonOutputMethod(componentRef);
                    } else if (widget.id === 17) {
                        let componentRef = this.createComponent(OrgToDateCircularComponent, 0);
                        componentRef.instance.todayOrgtReport = this.todayOrgtReport;
                        componentRef.instance.noOfMyOrgToday = this.noOfMyOrgToday;
                        componentRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: this.truvelopTips };
                        componentRef.instance.isShowIPGrade = this.isShowIPGrade;
                        this.commonOutputMethod(componentRef);
                    } else if (widget.id === 18) {
                        let componentRef = this.createComponent(DirectReportsToDateProgressivePieComponent, 0);
                        componentRef.instance.todayDirectReport = this.todayDirectReport;
                        componentRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: this.truvelopTips };
                        componentRef.instance.isShowIPGrade = this.isShowIPGrade;
                        this.commonOutputMethod(componentRef);
                    } else if (widget.id === 19) {
                        let componentRef = this.createComponent(OrgToDateCircularPieComponent, 0);
                        componentRef.instance.todayOrgtReport = this.todayOrgtReport;
                        componentRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: this.truvelopTips };
                        componentRef.instance.isShowIPGrade = this.isShowIPGrade;
                        this.commonOutputMethod(componentRef);
                    } else if (widget.id === 26 && this.roleId !== Role.TriggerAdmin) {
                        this.createWorkLocationHistoryView();
                        this.removeWidgetEvent(this.componentRef);
                    }
                }
            });
            if (!this.isMobileView) {
                this.getPackery();
            } else {
                this.loaderService.emitIsLoaderShown(false);
            }
        }
    }
    // Crete common method which pass input to all child component : 
    passCommonInput(componentRef) {
        componentRef.instance.selectedYearBinding = this.selectedYearBinding;
        componentRef.instance.role = this.role;
    }

    clearContainer() {
        this.sixColumnContainerRef.clear();
        this.threeColumncontainerRef.clear();
        this.entry.clear();
    }

    /**
       * Author : Mihir Patel
       * Modified-Date : 19-12-2018
       * Description : getPackery method created for packery operations
   */
    getPackery() {
        let positionNull = false;
        if (this.localStorageManagerPackeryArray.length > 0) {
            this.tilesArray = this.localStorageManagerPackeryArray;
        } else {
            this.tilesArray = this.packeryArray;
        }
        setTimeout(() => {
            this.sequence = [];
            this.tileNotEnabled = [];
            var tilePosition;
            this.tilesArray.forEach(tile => {
                var element = document.getElementById("" + tile.tileSelector + "");
                if (element !== null)
                    element.setAttribute(DataItemID, "" + tile.sequenceNumber + "");

                if (tile.position === '' && tile.isActive === true) {
                    positionNull = true;
                }
                this.tilesArray.forEach(tab => {
                    if (tile.tileSequence == tab.sequenceNumber) {
                        if (tab.isActive) {
                            if (this.windowWidth >= 768 && this.windowWidth <= 1199) {
                                tilePosition = 0;
                            } else {
                                tilePosition = tab.position;
                            }
                            this.sequence.push({
                                tabindex: tile.tileSequence.toString(),
                                position: tilePosition,
                                selector: tab.tileSelector
                            });
                        } else {
                            this.tileNotEnabled.push({
                                tabindex: tile.tileSequence.toString(),
                                position: tab.position,
                                selector: tab.tileSelector
                            });
                        }
                    }
                });
            });
            this.noTiles = this.tilesArray.every(this.checkIsEnabled);
            //  For packery : 
            Packery.prototype.getShiftPositions = function (attrName) {
                attrName = attrName || IDConstatnt;
                const _thiss = this;
                return this.items.map(function (item) {
                    return {
                        attr: item.element.getAttribute(attrName),
                        x: item.rect.x / _thiss.packer.width
                    }
                });
            };
            var grids = document.querySelector(GridClass);
            // init Packery
            this.grid = new Packery(grids, {
                itemSelector: GridItemClass,
                columnWidth: GridSizerClass,
                gutter: 20,
                // originLeft: true,
                // percentPosition: true,
                // isInitLayout: false 
                // disable initial layout
            });
            // Set column width for responsive
            var itemElems = grids.querySelectorAll(GridItemClass);
            for (var i = 0; i < itemElems.length; i++) {
                var itemElem = itemElems[i];
                var draggie = new Draggabilly(itemElem, {
                    handle: IconDragDropClass
                });
                this.grid.bindDraggabillyEvents(draggie);
            }
            //  For set position :
            if (this.tileNotEnabled.length > 0) {
                this.tileNotEnabled.forEach(item => {
                    this.grid.remove(document.getElementById("" + item.selector + ""));
                });
            }
            if (this.sequence && !positionNull) {
                this.grid._resetLayout();
                this.grid.items = this.sequence.map((itemPosition) => {
                    var itemElem = grids.querySelector('[data-item-id="' + itemPosition.tabindex + '"]');
                    var item = this.grid.getItem(itemElem);
                    if (item.rect) {
                        item.rect.x = parseFloat(itemPosition.position) * this.grid.packer.width;
                    }
                    return item;
                });
                this.grid.shiftLayout();
            } else {
                this.grid.layout();
            }
            this.grid.on(DragItemPositioned, (event, draggedItem) => {
                var positions = this.getItemsShiftPositions(this.grid.packer.width);
                var itemElems = this.grid.getItemElements();
                var sortOrder = [];
                for (var j = 0; j < itemElems.length; j++) {
                    itemElems[j].setAttribute(DataItemID, j + 1);
                    this.lastSequenceNumber = j + 1;
                }
                for (var k = 0; k < itemElems.length; k++) {
                    sortOrder[k] = {
                        'tabindex': itemElems[k].getAttribute(DataItemID),
                        'selector': itemElems[k].getAttribute(IDConstatnt)
                    };
                }
                positions.forEach(position => {
                    sortOrder.forEach(order => {
                        if (position.selector == order.selector) {
                            position.tabindex = order.tabindex;
                        }
                    });
                });
                if (this.tileNotEnabled.length > 0) {
                    this.tilesArray.forEach(tile => {
                        this.tileNotEnabled.forEach(item => {
                            if (tile.tileSelector == item.selector) {
                                tile.sequenceNumber = this.lastSequenceNumber + 1;
                                this.lastSequenceNumber = this.lastSequenceNumber + 1
                            }
                        });
                    });
                }
                if (this.sequence.length == 0) {
                    this.lastSequenceNumber = 0;
                }
                this.tilesArray.forEach(tile => {
                    positions.forEach(preference => {
                        if (tile.tileSelector == preference.selector) {
                            tile.sequenceNumber = parseInt(preference.tabindex);
                            if (this.windowWidth > 991) {
                                tile.position = preference.position;
                            }
                        }
                    });
                });
                this.localStorageManagerPackeryArray = this.tilesArray
            });

        }, 50);
        this.loaderService.emitIsLoaderShown(false);
    }

    /**
       * Author : Mihir Patel
       * Modified-Date : 19-12-2018
       * Description : getItemsShiftPositions and checkIsEnabled methods created for packery operations
   */
    getItemsShiftPositions(packeryWidth) {
        return this.grid.items.map(function (item) {
            return {
                selector: item.element.getAttribute(IDConstatnt),
                position: item.rect.x / packeryWidth
            }
        });
    }
    checkIsEnabled(tile) {
        return tile.isActive == false;
    }

    /**
      * Author : Mihir Patel
      * Modified-Date : 19-12-2018
      * Description : Using removeTile method widget close on click of cross icon
  */
    removeTile(tileSelector) {
        this.tilesArray.forEach(tile => {
            if (tile.tileSelector == tileSelector) {
                tile.isActive = false;
            }
        });
        for (var l = 0; l < this.sequence.length; l++) {
            if (this.sequence[l].selector == tileSelector) {
                this.tileNotEnabled.push({
                    tabindex: this.sequence[l].tabindex,
                    position: this.sequence[l].position,
                    selector: this.sequence[l].selector
                });
                this.sequence.splice(l, 1);
            }
        }
        this.noTiles = this.tilesArray.every(this.checkIsEnabled);
        setTimeout(() => {
            this.grid.remove(document.getElementById("" + tileSelector + ""));
            this.grid.layout();
            var positions = this.getItemsShiftPositions(this.grid.packer.width);
            var itemElems = this.grid.getItemElements();
            var sortOrder = [];
            for (var j = 0; j < itemElems.length; j++) {
                this.lastSequenceNumber = j + 1;
            }
            for (var k = 0; k < itemElems.length; k++) {
                sortOrder[k] = { 'tabindex': itemElems[k].getAttribute(DataItemID), 'selector': itemElems[k].getAttribute(IDConstatnt) };
            }
            positions.forEach(positionData => {
                sortOrder.forEach(orderData => {
                    if (positionData.selector == orderData.selector) {
                        positionData.tabindex = orderData.tabindex;
                    }
                });
            });
            if (this.sequence.length == 0) {
                this.lastSequenceNumber = 0;
            }
            this.tilesArray.forEach(tileData => {
                positions.forEach(preferenceData => {
                    if (tileData.tileSelector == preferenceData.selector) {
                        tileData.sequenceNumber = parseInt(preferenceData.tabindex);
                        if (this.windowWidth > 991) {
                            tileData.position = preferenceData.position;
                        }
                    }
                });
            });
            this.localStorageManagerPackeryArray = this.tilesArray
        }, 100);
    };

    /**
    * Author : Mihir Patel
    * Modified-Date : 19-12-2018
    * Description : Mthod which used to get checked unchecked values from right bar
    */
    checkValue(widget: string, isChecked: boolean) {
        for (let i = 0; i < this.managerCheckedWidgetArray.length; i++) {
            let element = this.managerCheckedWidgetArray[i];
            if (element.tileSelector === widget && isChecked === true) {
                this.managerCheckedWidgetArray[i].isActive = true;
            } else if (element.tileSelector === widget && isChecked === false) {
                this.managerCheckedWidgetArray[i].isActive = false;
                this.removeTile(widget);
            }
        }
    }
    /**
     * Author : Mihir Patel
     * Modified-Date : 19-12-2018
     * Description : submitCheckValue Mthod used for save checked unchecked value from right bar
     */
    submitCheckValue() {
        this.clearContainer();
        this.submitWidgetData(1);
    }

    /**
      * Author : Mihir Patel
      * Modified-Date : 19-12-2018
      * Description : ngOnDestroy method used to save widget data at change dashboard route.
    */
    ngOnDestroy() {
        this.submitWidgetData(2);
        this.breakPointvalue.unsubscribe();
    }

    submitWidgetData(submitType) {
        this.isUncheckedCount = 0;
        let copyArray = []
        let widgetArray = [];
        if (submitType === 1) {
            copyArray = this.managerCheckedWidgetArray;
        } else {
            copyArray = this.localStorageManagerPackeryArray;
        }
        if (copyArray.length > 0) {
            copyArray.forEach(dataObj => {
                if (dataObj.isActive === false) {
                    this.isUncheckedCount = this.isUncheckedCount + 1;
                }
            })
            if (this.isUncheckedCount === 13) {
                widgetArray = this.managerDashboardService.getDefaultWidgetPosition(this.userId);
            } else {
                copyArray.forEach(object => {
                    if (object.position === '') {
                        object.position = 0;
                    }
                    let stringToSplit = object.widgetId;
                    let id = stringToSplit.split("_");
                    let widgetId = id[1];
                    object.widgetId = widgetId;
                });
                widgetArray = copyArray;
            }
            this.commonService.setWidgetData(widgetArray).subscribe(
                (response) => {
                    if (this.globalResponseHandlerService.getApiResponse(response, false)) {
                        localStorage.clear();
                        this.localStorageManagerPackeryArray = [];
                        if (submitType === 1) {
                            this.reloadCurrentComponent();
                        } else {
                            this.grid.destroy();
                        }
                    }
                }
            );
        }
    }

    reloadCurrentComponent(): void {
        this.router.navigateByUrl(RefrshComponent, { skipLocationChange: true }).then(() =>
            this.router.navigate([CurrentRouteUrl]));
    }

    /**
     * Created by : Anjali Tandel
     * Created-date : 06-03-2020
     * Description : Create method for common output event for child component
     */
    private commonOutputMethod(componentRef: any): any {
        componentRef = this.redirectToListEvent(componentRef);
        componentRef = this.removeWidgetEvent(componentRef);
        return componentRef;
    }

    /**
     * Created by :Anjali Tandel
     * Created-date : 06-03-2020
     * Description : Create method for redirected to list output event for child component
     */
    private redirectToListEvent(componentRef: any): any {
        componentRef.instance.redirectedToList.subscribe(object => {
            this.redirectToMemberList(object)
        });
        return componentRef;
    }

    /**
     * Created by : Anjali Tandel
     * Created-date : 06-03-2020
     * Description : Create method for remove widget output event for child component
     */
    private removeWidgetEvent(componentRef: any): any {
        componentRef.instance.removeTile.subscribe(widget => {
            this.removeTile(widget);
        });
        return componentRef;
    }

    /**
     * Created by : Anjali Tandel
     * Created-date : 06-03-2020
     * Description : Create method for redirected to team-members based on Role.
     */
    private redirectToMemberList(param: RedirectionParam): void {
        if (this.globalResponseHandlerService.getUser().roleId !== Role.TriggerAdmin) {
            this.createQueryString(param);
        }
    }

    /**
     * Created by : Anjali Tandel
     * Created-date : 06-03-2020
     * Description : Create method for create query-string and passing to session & redirected to team-member list.
     */
    private createQueryString(param: RedirectionParam): void {
        let apiQueryString: string = '';
        let year = this.selectedYear === CompareString.Last_12Months ? '0' : this.selectedYear;
        if (param.grade && param.month) {
            apiQueryString = '?yearid=' + year + '&managerid=' + this.globalResponseHandlerService.getUser().empId + '&DepartmentList=' +
                this.selectedDepartment.map(x => x.id).join() + '&CompanyId=' + this.globalResponseHandlerService.getUser().clientId + '&WidgetType=' + param.widgetId + '&month=' + param.month + '&grade=' + param.grade;
        } else if (param.grade) {
            apiQueryString = '?yearid=' + year + '&managerid=' + this.globalResponseHandlerService.getUser().empId + '&DepartmentList=' +
                this.selectedDepartment.map(x => x.id).join() + '&CompanyId=' + this.globalResponseHandlerService.getUser().clientId + '&WidgetType=' + param.widgetId + '&grade=' + param.grade;
        } else {
            apiQueryString = '?yearid=' + year + '&managerid=' + this.globalResponseHandlerService.getUser().empId + '&DepartmentList=' +
                this.selectedDepartment.map(x => x.id).join() + '&CompanyId=' + this.globalResponseHandlerService.getUser().clientId + '&WidgetType=' + param.widgetId;
        }
        sessionStorage.setItem(Session.TeamMemberQueryString, apiQueryString);
        this.router.navigate([Route.Employee]);
    }
}

