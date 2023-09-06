/**
@author : Mihir Patel
@class : IndividualEmployeeComponent
@description :IndividualEmployeeComponent is created for check record of individual employee.
**/
import { Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, ChangeDetectionStrategy, ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../core/loader/loader.service';
import { ToasterService } from 'angular2-toaster';
import { SearchPipePipe } from '../../shared/pipes/search-pipe.pipe';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { Error_Title, Error_Type, Role, Actions, dashboardClass, sparkDetailByRoute, SparkDetail, DashboardTypeId } from '../../core/magic-string/common.model';
import { Remarks, Employee, canEdit, canDelete, SummaryReportingcontainerRef, ContextualReportingcontainerRef, DetailedReportingcontainerRef, SparkcontainerRef, ResizeMinLength, EmployeeDashboardSearchFields, ManagerActioncontainerRef, ReportsContainerRef } from '../../shared/modals/individual-employee-model';
import { EmployeeDashboardHeader } from '../../shared/tooltip/tooltip-model';
import { AssessmentNotInitiated } from '../../assessment/assessment-model';
import { Encryption } from '../../core/magic-string/common-validation-model';
import * as CryptoJS from 'crypto-js';
import { EmployeeService } from '../../core/services/employee-service/employee.service';
import { UserModel } from '../../core/model/user';
import { ActionPermissionService, canView, canAdd } from '../../core/services/action-permission/action-permission.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { TriggerCommentComponent } from './individual-employee-widget/trigger-comment/trigger-comment.component';
import { ThreeColumnMobileViewComponent } from '../../shared/components/dashboard-components/mobile-view/three-column-mobile-view/three-column-mobile-view.component';
import { SparkWidgetComponent } from '../../shared/components/dashboard-components/spark-widget/spark-widget.component';
import { CurrentSparkAnEmployee } from '../employee-model';
import { EmployeeAdapter } from '../employee-adapter/employee-adapter';
import { CurrentScoreComponent } from '../../shared/components/dashboard-components/current-score/current-score.component';
import { CurrentYearAverageScoreComponent } from '../../shared/components/dashboard-components/current-year-average-score/current-year-average-score.component';
import { ActualRatingCompletedComponent } from '../../shared/components/dashboard-components/actual-rating-completed/actual-rating-completed.component';
import { ComparedAverageScoreComponent } from '../../shared/components/dashboard-components/compared-average-score/compared-average-score.component';
import { LineGraphComponent } from '../../shared/components/dashboard-components/line-graph/line-graph.component';
import { MonthlyLineGraphComponent } from '../../shared/components/dashboard-components/monthly-line-graph/monthly-line-graph.component';
import { YearlyLineGraphComponent } from '../../shared/components/dashboard-components/yearly-line-graph/yearly-line-graph.component';
import { EvaluationStatusComponent } from '../../shared/components/dashboard-components/evaluation-status/evaluation-status.component';
import { EvaluationStatusWidget, ReportView, TrendStatusWidget } from '../../shared/modals/shared-model';
import { SharedFunctionService } from '../../shared/services/shared-function/shared-function.service';
import { OverlayConfig, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { ComponentPortal } from '@angular/cdk/portal';
import { PdfSelectionComponent } from './generate-pdf/pdf-selection/pdf-selection.component';
import { employeePermission } from './generate-pdf/generate-pdf.model';
import { ManagerActionsComponent } from './individual-employee-widget/manager-actions/manager-actions.component';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';
import { ReportsViewComponent } from '../../shared/components/dashboard-components/reports-view/reports-view.component';
@Component({
    selector: 'trigger-individual-employee',
    templateUrl: './individual-employee.component.html',
    styleUrls: ['./individual-employee.component.scss']
})

export class IndividualEmployeeComponent implements OnInit, OnDestroy {
    @ViewChild(ReportsContainerRef, { read: ViewContainerRef, static: false }) private reportsContainerRef: ViewContainerRef;
    @ViewChild(SummaryReportingcontainerRef, { read: ViewContainerRef, static: false }) private summaryReportingcontainerRef: ViewContainerRef;
    @ViewChild(DetailedReportingcontainerRef, { read: ViewContainerRef, static: false }) private detailedReportingcontainerRef: ViewContainerRef;
    @ViewChild(ContextualReportingcontainerRef, { read: ViewContainerRef, static: false }) private contextualReportingcontainerRef: ViewContainerRef;
    @ViewChild(ManagerActioncontainerRef, { read: ViewContainerRef, static: false }) managerActioncontainerRef: ViewContainerRef;
    @ViewChild(SparkcontainerRef, { read: ViewContainerRef, static: false }) private sparkcontainerRef: ViewContainerRef;

    public isDisplayScoreReportingView: boolean;
    public isDisplaySummaryReportingView: boolean;
    public isDisplayDetailedReportingView: boolean;
    public isDisplayContextualReportingView: boolean;

    public managerbotsuggetion: string;
    public sparkAnEmployee: CurrentSparkAnEmployee;
    public employeeId: string;
    public lastScoreRank: string;
    public lastScoreRankClass: string;
    public managerAction: string;
    public generalScoreRank: string;
    public scoreSummary: string;
    public actualRating: string;
    public currentYrAvgScoreRank: string;
    public currentYrAvgScoreRankClass: string;
    public lyrAvgScoreRank: string;
    public lyrAvgScoreRankClass: string;
    public lastScoreRemarks: string;
    public employeeName: string;
    /** remarks created for store remarks details which we bind on trigger-comment-section */
    public remarks: any[];
    public employeeList: Employee[];
    public evaluationStatusWidgetModels: any;
    public filterEmployee: any;
    public _searchEmployee: string;
    public empData: any;
    public lastAssessedDate: any;
    public user: UserModel;
    public lastYearActualRating: any;
    public graphCategories: any;
    public pageTitle: string;
    public selectedEmployee: Employee;
    public isMobileView: boolean = false;
    public currentScoreRef: any;
    public evaluationStatus: any;
    public currentYearAverageScoreRef: any;
    public actualRatingCompletedRef: any;
    public comparedAverageScoreRef: any;
    public mobileViewCompletedRef: any;
    public triggerCommentRef: any;
    public managerActionsRef: any;
    public trendStatusWidgetRef: any;
    public evaluationWidgetRef: any;
    // overlayRef is defined for overlay modal popup.
    private overlayRef: OverlayRef;
    // componentOverlayRef is defined defined and used when create dynamic component.
    private componentOverlayRef: ComponentRef<any>;
    public isEnableGeneratePDFButton: boolean;
    public empId: number;
    public isDarkTheme: boolean;
    public themeEmitter: any;

    public selectedEmployeeObj: any;
    private employeeDatewiseEvaluation: any[];
    private contextualReportData: ReportView[];

    constructor(
        private employeeService: EmployeeService,
        private loaderService: LoaderService,
        private toasterService: ToasterService,
        private activatedRoute: ActivatedRoute,
        private searchPipePipe: SearchPipePipe,
        private globalResponseHandlerService: GlobalResponseHandlerService,
        private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
        private actionPermissionService: ActionPermissionService,
        public breakpointObserver: BreakpointObserver,
        private resolver: ComponentFactoryResolver,
        public changeDetection: ChangeDetectorRef,
        private adapter: EmployeeAdapter,
        private sharedFunctionService: SharedFunctionService,
        private focusTrapFactory: FocusTrapFactory,
        public overlay: Overlay,
        private globalEventsManager: GlobalEventsManager
    ) {
        this.createComponentBasedonWindoResize();
        this.pageTitle = EmployeeDashboardHeader
        this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
            if (status) {
                this.isDarkTheme = true;
            } else {
                this.isDarkTheme = false;
            }
        })

        // this.sparkAnEmployee = this.globalResponseHandlerService.getSparkAnEmployee();
        // console.log('sparkAnEmployee : ' , this.sparkAnEmployee);

    }

    /**
     * Author : Sonal Patil
     * Modified-Date : 20-12-2018
     * Description : For Search employee from all employees
     */
    get searchEmployee() {
        return this._searchEmployee;
    }

    set searchEmployee(search: string) {
        this._searchEmployee = search;
        this.employeeList = this.searchEmployee ? this.searchPipePipe.transform(this.filterEmployee, this.searchEmployee, EmployeeDashboardSearchFields) : this.filterEmployee;
    }

    ngOnInit() {
        this.loaderService.emitIsLoaderShown(true);
        let sessionId = JSON.parse(this.globalResponseHandlerService.decriptData(Encryption.TriggerSelectedId, Encryption.SelectedId));
        if (!!sessionId) {
            this.employeeId = sessionId;
        } else {
            this.employeeId = this.urlEncryptionDecryptionService.urlDecryption(this.activatedRoute.snapshot.queryParams['id']);
        }
        this.user = this.globalResponseHandlerService.getUser();
        this.getEmployees(this.user.clientId, this.user.empId);
    }

    /**
     * Author : Mihir Patel
     * Modified by : Anjali Tandel
     * Modified-Date : 18-12-2019
     * Description : Create method for Change employee and dashboard data
     */
    public changeEmployee(empId, ratingCompleted, employee: Employee): void {
        if (empId !== this.employeeId) {
            if ((!!ratingCompleted && ratingCompleted > 0) || employee.isTriggerSent === 2) {
                this._searchEmployee = '';
                this.employeeId = empId;
                this.globalResponseHandlerService.encriptData(JSON.stringify(empId), Encryption.TriggerSelectedId, Encryption.SelectedId);
                this.getSelectedEmployeeDashboard(empId);
            } else {
                this.toasterService.pop(Error_Type, Error_Title, AssessmentNotInitiated);
            }
        } else {
            this.searchEmployee = employee.firstName + ' ' + employee.lastName;
        }
    }

    public openPFDSelectionModalPopup(): void {
        let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
        let config = new OverlayConfig({
            panelClass: modalBackground,
            hasBackdrop: true,
            backdropClass: '',
            positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
        });

        this.overlayRef = this.overlay.create(config);
        this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(PdfSelectionComponent));
        this.focusTrapFactory.create(this.overlayRef.overlayElement);
        let employeePermissionObj: employeePermission = {
            empId: this.empId,
            summaryReportingView: this.isDisplaySummaryReportingView,
            sparkView: this.sparkAnEmployee.isSparkViewable,
            contextualReportingView: this.isDisplayContextualReportingView
        }
        this.componentOverlayRef.instance.employeePermissionObj = employeePermissionObj;
        this.componentOverlayRef.instance.employeeObj = this.selectedEmployee;
        this.componentOverlayRef.instance.cancel.subscribe(status => {
            this.overlayRef.dispose();
        });

        this.componentOverlayRef.instance.update.subscribe(status => {
            this.overlayRef.dispose();
        });
    }

    public createSparkWidget() {
        sessionStorage.setItem(Encryption.EmpDashboardRoute, Encryption.EmpDashboard)
        this.setSparkDetailByRoute();
        if (this.sparkAnEmployee.isSparkViewable || this.sparkAnEmployee.isSparkAddable) {
            if (this.sparkcontainerRef) {
                this.sparkcontainerRef.clear();
            }
            this.createComponent(SparkWidgetComponent, this.sparkcontainerRef);
        } else {
            this.loaderService.emitIsLoaderShown(false);
        }
    }

    // Calling media matcher method for get screen resolution, with help of this widget show for dekstop and mobile :
    private createComponentBasedonWindoResize(): void {
        this.breakpointObserver
            .observe([ResizeMinLength])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.isMobileView = false;
                } else {
                    this.isMobileView = true;
                }
                if (this.isDisplayScoreReportingView) {
                    this.loadScoreReportingView();
                }
            });
    }

    /**
     * Author : Mihir Patel
     * Modified by : Anjali Tandel
     * Modified-Date : 18-12-2019
     * Description : Create method for get all Employee and save list on session, 
     * and when come again on this component check session first and if data available then use session data, Either call Api for get all employee list*/
    private getEmployees(companyId, managerId): void {
        if (this.user.roleId === Role.Executive || this.user.roleId === Role.Admin) {
            managerId = 0;
        }
        this.employeeService.getDashboardEmployee(companyId, managerId).subscribe(
            (response) => {
                if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
                    let empList: Employee[] = this.adapter.bindEmployees(response.data);
                    this.employeeList = empList;
                    this.filterEmployee = empList.filter((e: Employee) => (!!e.ratingCompleted && (Number(e.ratingCompleted) > 0)) || e.isTriggerSent === 2);
                    this.getSelectedEmployeeDashboard(this.employeeId);
                }
            });
    }

    /**
     * Author : Mihir Patel
     * Modified by : Anjali Tandel
     * Modified-Date : 18-12-2019
     * Description : Create method for get Employee dashboard data by employee id
     */
    private getSelectedEmployeeDashboard(employeeId): void {
        this.loaderService.emitIsLoaderShown(true);

        this.employeeService.getEmployeeDashboardData(this.user.clientId, employeeId, this.user.userId).subscribe(
            (response) => {
                if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
                    this.empId = response.data[0].empId
                    this.employeeName = response.data[0].empName;
                    this.lastScoreRank = response.data[0].lastScoreRank;
                    this.lastScoreRankClass = this.getClassByGrade(response.data[0].lastScoreRank);
                    this.managerAction = response.data[0].lastManagerAction;
                    this.generalScoreRank = response.data[0].lastGeneralScoreRank;
                    this.scoreSummary = response.data[0].lastScoreSummary;
                    this.actualRating = response.data[0].noOfRatings;
                    this.lastYearActualRating = response.data[0].lyrNoOfRatings;
                    this.currentYrAvgScoreRank = response.data[0].currentYrAvgScoreRank;
                    this.currentYrAvgScoreRankClass = this.getClassByGrade(response.data[0].currentYrAvgScoreRank);
                    this.lyrAvgScoreRank = response.data[0].lyrAvgScoreRank;
                    this.lyrAvgScoreRankClass = this.getClassByGrade(response.data[0].lyrAvgScoreRank);
                    this.lastScoreRemarks = response.data[0].lastScoreRemarks;
                    this.empData = response.data[0].remarks;
                    this.lastAssessedDate = response.data[0].lastAssessedDate;
                    this.graphCategories = response.data[0].graphCategories[0];
                    this.managerbotsuggetion = response.data[0].managerBOTSuggestion;
                    this.evaluationStatusWidgetModels = response.data[0].evaluationStatusWidgetModels;
                    this.remarks = [];
                    this.setSparkData(employeeId);
                    // Bind remarks on model
                    if (response.data[0].remarks.length > 0) {
                        this.bindRemarks(response.data[0].remarks, response.data[0].sendSpark);
                    }
                    this.getAccordianViewPermission(employeeId);
                }
            }
        );
        const toAndFromDate = this.sharedFunctionService.getFormatedDate(new Date());
        this.employeeService.getEmployeeDatewiseEvaluation(this.employeeId, toAndFromDate, DashboardTypeId.TeamMemberDashboard).subscribe((response) => {
            if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
                this.employeeDatewiseEvaluation = response.data;
                this.createDetailedReportingWidgets();
            }
        });
        this.employeeService.getContextualReports(+employeeId, this.user.userId).subscribe((response) => {
            if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
                this.contextualReportData = response.data;
                this.createContexualReportingWidgets();
            }
            this.createContexualReportingWidgets();
        });
        // this.employeeService.getEmployeeDashboardData(this.user.clientId, employeeId, this.user.userId).subscribe(
        //     (response) => {
        //         if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
        //             this.empId = response.data[0].empId
        //             this.employeeName = response.data[0].empName;
        //             this.lastScoreRank = response.data[0].lastScoreRank;
        //             this.lastScoreRankClass = this.getClassByGrade(response.data[0].lastScoreRank);
        //             this.managerAction = response.data[0].lastManagerAction;
        //             this.generalScoreRank = response.data[0].lastGeneralScoreRank;
        //             this.scoreSummary = response.data[0].lastScoreSummary;
        //             this.actualRating = response.data[0].noOfRatings;
        //             this.lastYearActualRating = response.data[0].lyrNoOfRatings;
        //             this.currentYrAvgScoreRank = response.data[0].currentYrAvgScoreRank;
        //             this.currentYrAvgScoreRankClass = this.getClassByGrade(response.data[0].currentYrAvgScoreRank);
        //             this.lyrAvgScoreRank = response.data[0].lyrAvgScoreRank;
        //             this.lyrAvgScoreRankClass = this.getClassByGrade(response.data[0].lyrAvgScoreRank);
        //             this.lastScoreRemarks = response.data[0].lastScoreRemarks;
        //             this.empData = response.data[0].remarks;
        //             this.lastAssessedDate = response.data[0].lastAssessedDate;
        //             this.graphCategories = response.data[0].graphCategories[0];
        //             this.managerbotsuggetion = response.data[0].managerBOTSuggestion;
        //             this.evaluationStatusWidgetModels = response.data[0].evaluationStatusWidgetModels;
        //             this.remarks = [];
        //             this.setSparkData(employeeId);
        //             // Bind remarks on model
        //             if (response.data[0].remarks.length > 0) {
        //                 this.bindRemarks(response.data[0].remarks, response.data[0].sendSpark);
        //             }
        //             this.getAccordianViewPermission(employeeId);
        //         }
        //     }
        // );
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 10-09-2019
     * Description : Get class by grade.
     */
    private getClassByGrade(grade: string): string {
        if (grade !== '') {
            return dashboardClass.find(c => grade.includes(c.grade)).bindClass;
        } else {
            return '';
        }
    }

    // ------------------------------------ Spark widget Code -----------------------------------------------------//
    /**
     * Author : Mihir Patel
     * Created-Date : 19-11-2019
     * Description : Set spark object by selected user permission
     */
    private setSparkData(employeeId): void {
        this.selectedEmployee = this.employeeList.find(e => e.empId === parseInt(employeeId));
        this.sparkAnEmployee = new CurrentSparkAnEmployee();
        this.sparkAnEmployee = new CurrentSparkAnEmployee(
            this.user.userId,
            this.selectedEmployee.empId,
            this.selectedEmployee.firstName,
            this.selectedEmployee.lastName,
            this.actionPermissionService.checkSparkPermission(canView, this.selectedEmployee),
            this.actionPermissionService.checkSparkPermission(canAdd, this.selectedEmployee),
            this.actionPermissionService.checkSparkPermission(canEdit, this.selectedEmployee),
            this.actionPermissionService.checkSparkPermission(canDelete, this.selectedEmployee),
            this.selectedEmployee.sendSpark
        );
        this.globalResponseHandlerService.setSparkAnEmployee(this.sparkAnEmployee);
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 26-07-2019
     * Description : Bind remarks to model.
     */
    private bindRemarks(remarks, sendSpark): void {
        remarks.map(item => {
            let isDelete: boolean = false;
            const isDeletable = item.isTriggerSent === 2 ? true : this.checkPermission(item.assessmentById, canDelete);
            if (isDeletable) {
                if (item.performance === '' && item.attitude === '' && item.maintenance === '') {
                    isDelete = true;
                } else {
                    isDelete = false;
                }
            } else {
                isDelete = true;
            }

            this.remarks.push({
                name: item.firstName + ' ' + item.lastName,
                profileName: item.firstName.charAt(0).toUpperCase() + item.lastName.charAt(0).toUpperCase(),
                assessmentById: item.assessmentById,
                assessmentDate: item.assessmentDate,
                assessmentByImgPath: item.assessmentByImgPath,
                assessmentId: item.assessmentId,
                empid: item.empid,
                isTriggerSent: item.isTriggerSent,
                scoreSummary: item.scoreSummary,
                sendSpark: sendSpark,

                isPerformanceCommentSend: item.isPerformanceCommentSend,
                isAttitudeCommentSend: item.isAttitudeCommentSend,
                isMaintenanceCommentSend: item.isMaintenanceCommentSend,
                isGeneralRemarkSend: item.isGeneralRemarkSend,

                performanceRemarkId: item.performanceRemarkId,
                performance: item.performance,
                performanceCategory: item.performanceCategory,
                // performanceDocumentName: item.performanceDocumentName,
                // performanceCloudFilePath: item.performanceCloudFilePath,
                // performanceAttachmentpath: item.performanceDocumentName,
                // isPreviewPerformance: (item.performanceDocumentName !== '' ? true : false) || (item.performanceDocumentName !== '' ? true : false),
                performanceModel: {
                    empId: item.empid,
                    assessmentId: item.assessmentId,
                    remarkId: item.performanceRemarkId,
                    remarks: item.performance,
                    documentName: item.performanceDocumentName ? item.performanceDocumentName.substring(item.performanceDocumentName.lastIndexOf('/') + 1, item.performanceDocumentName.length) : '',
                    documentContents: '',
                    updatedby: this.user.userId,
                    cloudFilePath: item.performanceCloudFilePath,
                    attachmentpath: item.performanceDocumentName,
                    isPreview: (item.performanceDocumentName !== '' ? true : false) || (item.performanceCloudFilePath !== '' ? true : false),
                    fileName: item.performanceDocumentName ? item.performanceDocumentName.substring(item.performanceDocumentName.indexOf('$') + 1) : item.performanceCloudFilePath ? item.performanceCloudFilePath : '',
                    isCsvFile: (item.performanceDocumentName !== '' && item.performanceDocumentName.substring(item.performanceDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
                    isDeletableAttachment: item.performanceDocumentName !== '' ? true : false,
                    isFileDeletable: item.performanceDocumentName ? true : false,
                    url: ''
                },

                attitudeRemarkId: item.attitudeRemarkId,

                attitude: item.attitude,
                attitudeCategory: item.attitudeCategory,
                // attitudeDocumentName: item.attitudeDocumentName,
                // attitudeCloudFilePath: item.attitudeCloudFilePath,
                // attitudeAttachmentpath: item.attitudeDocumentName,
                // isPreviewAttitude: (item.attitudeDocumentName !== '' ? true : false) || (item.attitudeCloudFilePath !== '' ? true : false),
                attitudeModel: {
                    empId: item.empid,
                    assessmentId: item.assessmentId,
                    remarkId: item.attitudeRemarkId,
                    remarks: item.attitude,
                    documentName: item.attitudeDocumentName ? item.attitudeDocumentName.substring(item.attitudeDocumentName.lastIndexOf('/') + 1, item.attitudeDocumentName.length) : '',
                    documentContents: '',
                    updatedby: this.user.userId,
                    cloudFilePath: item.attitudeCloudFilePath,
                    attachmentpath: item.attitudeDocumentName,
                    isPreview: (item.attitudeDocumentName !== '' ? true : false) || (item.attitudeCloudFilePath !== '' ? true : false),
                    fileName: item.attitudeDocumentName ? item.attitudeDocumentName.substring(item.attitudeDocumentName.indexOf('$') + 1) : item.attitudeCloudFilePath ? item.attitudeCloudFilePath : '',
                    isCsvFile: (item.attitudeDocumentName !== '' && item.attitudeDocumentName.substring(item.attitudeDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
                    isDeletableAttachment: item.attitudeDocumentName !== '' ? true : false,
                    isFileDeletable: item.attitudeDocumentName ? true : false,
                    url: ''
                },

                maintenanceRemarkId: item.maintenanceRemarkId,
                maintenance: item.maintenance,
                maintenanceCategory: item.maintenanceCategory,
                // maintenanceDocumentName: item.maintenanceDocumentName,
                // maintenanceCloudFilePath: item.maintenanceCloudFilePath,
                // maintenanceAttachmentpath: item.maintenanceDocumentName,
                // isPreviewMaintenance: (item.maintenanceDocumentName !== '' ? true : false) || (item.maintenanceCloudFilePath !== '' ? true : false),
                maintenanceModel: {
                    empId: item.empid,
                    assessmentId: item.assessmentId,
                    remarkId: item.maintenanceRemarkId,
                    remarks: item.maintenance,
                    documentName: item.maintenanceDocumentName ? item.maintenanceDocumentName.substring(item.maintenanceDocumentName.lastIndexOf('/') + 1, item.maintenanceDocumentName.length) : '',
                    documentContents: '',
                    updatedby: this.user.userId,
                    cloudFilePath: item.maintenanceCloudFilePath,
                    attachmentpath: item.maintenanceDocumentName,
                    isPreview: (item.maintenanceDocumentName !== '' ? true : false) || (item.maintenanceCloudFilePath !== '' ? true : false),
                    fileName: item.maintenanceDocumentName ? item.maintenanceDocumentName.substring(item.maintenanceDocumentName.indexOf('$') + 1) : item.maintenanceCloudFilePath ? item.maintenanceCloudFilePath : '',
                    isCsvFile: (item.maintenanceDocumentName !== '' && item.maintenanceDocumentName.substring(item.maintenanceDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
                    isDeletableAttachment: item.maintenanceDocumentName !== '' ? true : false,
                    isFileDeletable: item.maintenanceDocumentName ? true : false,
                    url: ''
                },

                generalRemarkId: item.generalRemarkId,
                general: item.general,
                generalCategory: item.generalCategory,
                // generalDocumentName: item.generalDocumentName,
                // generalCloudFilePath: item.generalCloudFilePath,
                // generalAttachmentpath: item.generalDocumentName,
                // isPreviewGeneral: (item.generalDocumentName !== '' ? true : false) || (item.generalCloudFilePath !== '' ? true : false),
                generalModel: {
                    empId: item.empid,
                    assessmentId: item.assessmentId,
                    remarkId: item.generalRemarkId,
                    remarks: item.general,
                    documentName: item.generalDocumentName ? item.generalDocumentName.substring(item.generalDocumentName.lastIndexOf('/') + 1, item.generalDocumentName.length) : '',
                    documentContents: '',
                    updatedby: this.user.userId,
                    cloudFilePath: item.generalCloudFilePath,
                    attachmentpath: item.generalDocumentName,
                    isPreview: (item.generalDocumentName !== '' ? true : false) || (item.generalCloudFilePath !== '' ? true : false),
                    fileName: item.generalDocumentName ? item.generalDocumentName.substring(item.generalDocumentName.indexOf('$') + 1) : item.generalCloudFilePath ? item.generalCloudFilePath : '',
                    isCsvFile: (item.generalDocumentName !== '' && item.generalDocumentName.substring(item.generalDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
                    isDeletableAttachment: item.generalDocumentName !== '' ? true : false,
                    isFileDeletable: item.generalDocumentName ? true : false,
                    url: ''
                },
                // category: 'category',
                // remark: 'remark',
                // attachmentpath: item.documentName,
                // attachmentFileName: item.documentName ? item.documentName.substring(item.documentName.lastIndexOf('/') + 1, item.documentName.length) : '',
                // isPreview: (item.documentName !== '' ? true : false) || (item.cloudFilePath !== '' ? true : false),
                isEditable: item.isTriggerSent === 2 ? true : this.checkPermission(item.assessmentById, canEdit),
                isDeletable: item.isTriggerSent === 2 ? true : this.checkPermission(item.assessmentById, canDelete),
                isDelete: isDelete,
                // isDeletableAttachment: item.documentName !== '' ? true : false,
                itemUpdDateTime: new Date(),
                // serverCloudUrl: item.cloudFilePath,
                // cloudFilePath: item.cloudFilePath,
            });
        });
        this.empData = this.remarks;
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 18-12-2019
     * Description : Create method for check & get permission (Summary-Reporting, Detailed-Reporting & Contexual-Reporting).
     */
    private getAccordianViewPermission(employeeId): void {
        this.isDisplayScoreReportingView = this.actionPermissionService.isViewEmployeeDashboard(Actions.ScoreReporting, canView, this.selectedEmployee);
        this.isDisplaySummaryReportingView = this.actionPermissionService.isViewEmployeeDashboard(Actions.SummaryReporting, canView, this.selectedEmployee);
        this.isDisplayDetailedReportingView = this.actionPermissionService.isViewEmployeeDashboard(Actions.DetailReporting, canView, this.selectedEmployee);
        this.isDisplayContextualReportingView = this.actionPermissionService.isViewEmployeeDashboard(Actions.ContextualReporting, canView, this.selectedEmployee);
        this.changeDetection.detectChanges();
        this.createViewBasedonPermission();
        this.checkPermissionForGeneratePDF(employeeId);
    }

    /**
     * Author : Mihir Patel
     * Created-Date : 24-01-2020
     * Description : Create method for check & get permission for generate PDF for only direct reporting employee.
     */
    private checkPermissionForGeneratePDF(employeeId) {
        let selectedEmployee = this.employeeList.find(e => e.empId === parseInt(employeeId));
        this.selectedEmployeeObj = selectedEmployee;
        this.isEnableGeneratePDFButton = (selectedEmployee.managerId === this.user.empId) && (this.isDisplaySummaryReportingView || this.isDisplayContextualReportingView) ? true : false;
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 26-07-2019
     * Description : Check permission for comment edit/delete.
     */
    private checkPermission(assessmentById, action): boolean {
        if (this.user.userId === assessmentById && this.user.roleId === Role.Admin) {
            return true;
        } else if (this.user.userId === assessmentById && this.actionPermissionService.commonCheckActionPermission(Actions.Comment, action, this.selectedEmployee)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 18-12-2019
     * Description : load component based on permission (Summary-Reporting, Detailed-Reporting & Contexual-Reporting).
     */
    private createViewBasedonPermission(): void {
        if (this.isDisplayScoreReportingView) {
            this.loadScoreReportingView();
        }
        if (this.isDisplaySummaryReportingView) {
            this.createSummaryReportingView();
        }
        if (this.isDisplayDetailedReportingView) {
            this.createDetailedReportingWidgets();
        }
        if (this.isDisplayContextualReportingView && (this.sparkAnEmployee.isSparkViewable ||
            this.sparkAnEmployee.isSparkAddable)) {
            this.createContexualReportingWidgets();
        } else if (this.isDisplayContextualReportingView) {
            this.createContexualReportingCommentWidgets();
        }
    }

    /**
     * Author : Shahbaz Shaikh
     * Created-Date : 02-07-2021
     * Description : Create method for load Summary-Reporting view based on window size (Mobile/Desktop).
     */
    private loadScoreReportingView(): void {
        if (this.isMobileView) {
            this.createScoreMobileView();
        } else {
            this.createScoreDesktopView();
        }
    }

    /**
     * Author : Shahbaz Shaikh
     * Created-Date : 18-12-2019
     * Description : Create method for load Score-Reporting mobile view.
     */
    private createScoreMobileView(): void {
        this.summaryReportingcontainerRef.clear();
        this.mobileViewCompletedRef = this.createComponent(ThreeColumnMobileViewComponent, this.summaryReportingcontainerRef);
        this.bindScoreReportingData();
    }

    /**
     * Author : Shahbaz Shaikh
     * Created-Date : 18-12-2019
     * Description : Create method for load Score-Reporting desktop view.
     */
    private createScoreDesktopView(): void {
        this.summaryReportingcontainerRef.clear();
        this.currentScoreRef = this.createComponent(CurrentScoreComponent, this.summaryReportingcontainerRef);
        this.currentYearAverageScoreRef = this.createComponent(CurrentYearAverageScoreComponent, this.summaryReportingcontainerRef);
        this.actualRatingCompletedRef = this.createComponent(ActualRatingCompletedComponent, this.summaryReportingcontainerRef);
        this.comparedAverageScoreRef = this.createComponent(ComparedAverageScoreComponent, this.summaryReportingcontainerRef);
        this.bindScoreReportingData();
    }

    /**
     * Author : Shahbaz Shaikh
     * Created-Date : 02-07-2021
     * Description : Create method for bind Score-Reporting data on desktop/mobile view.
     */
    private bindScoreReportingData() {
        if (this.isMobileView) {
            this.mobileViewCompletedRef.instance.lastScoreRank = this.lastScoreRank ? this.lastScoreRank : '-';
            this.mobileViewCompletedRef.instance.lastScoreRankClass = this.lastScoreRankClass;
            this.mobileViewCompletedRef.instance.lastAssessedDate = this.lastAssessedDate;
            this.mobileViewCompletedRef.instance.currentYrAvgScoreRank = this.currentYrAvgScoreRank ? this.currentYrAvgScoreRank : '-';
            this.mobileViewCompletedRef.instance.currentYrAvgScoreRankClass = this.currentYrAvgScoreRankClass;
            this.mobileViewCompletedRef.instance.actualRating = this.actualRating;
            this.mobileViewCompletedRef.instance.lastYearActualRating = this.lastYearActualRating;
            this.mobileViewCompletedRef.instance.lyrAvgScoreRank = this.lyrAvgScoreRank ? this.lyrAvgScoreRank : '-';
            this.mobileViewCompletedRef.instance.lyrAvgScoreRankClass = this.lyrAvgScoreRankClass;
        } else {
            this.currentScoreRef.instance.lastScoreRank = this.lastScoreRank ? this.lastScoreRank : '-';
            this.currentScoreRef.instance.lastScoreRankClass = this.lastScoreRankClass;
            this.currentScoreRef.instance.lastAssessedDate = this.lastAssessedDate;

            this.currentYearAverageScoreRef.instance.currentYrAvgScoreRank = this.currentYrAvgScoreRank ? this.currentYrAvgScoreRank : '-';
            this.currentYearAverageScoreRef.instance.currentYrAvgScoreRankClass = this.currentYrAvgScoreRankClass;

            this.actualRatingCompletedRef.instance.actualRating = this.actualRating;
            this.actualRatingCompletedRef.instance.lastYearActualRating = this.lastYearActualRating;

            this.comparedAverageScoreRef.instance.currentYrAvgScoreRank = this.currentYrAvgScoreRank ? this.currentYrAvgScoreRank : '-';
            this.comparedAverageScoreRef.instance.currentYrAvgScoreRankClass = this.currentYrAvgScoreRankClass;
            this.comparedAverageScoreRef.instance.lyrAvgScoreRank = this.lyrAvgScoreRank ? this.lyrAvgScoreRank : '-';
            this.comparedAverageScoreRef.instance.lyrAvgScoreRankClass = this.lyrAvgScoreRankClass;
        }
        if (!this.isDisplaySummaryReportingView && !this.isDisplayContextualReportingView && !this.isDisplayDetailedReportingView) {
            this.loaderService.emitIsLoaderShown(false);
        }
        // this.createSummaryReportingView();
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 18-12-2019
     * Description : Create method for load Summary-Reporting view based on window size (Mobile/Desktop).
     */
    private createSummaryReportingView(): void {
        if (this.isMobileView) {
            this.createSummaryMobileView();
        } else {
            this.createSummaryDesktopView();
        }
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 18-12-2019
     * Description : Create method for load Summary-Reporting mobile view.
     */
    private createSummaryMobileView(): void {
        this.managerActionsRef = this.createComponent(ManagerActionsComponent, this.managerActioncontainerRef);
        this.managerActionsRef.instance.generalScoreRank = this.generalScoreRank;
        this.managerActionsRef.instance.scoreSummary = this.scoreSummary;
        this.managerActionsRef.instance.managerAction = this.managerAction;
        this.managerActionsRef.instance.lastScoreRemarks = this.lastScoreRemarks;
        this.managerActionsRef.instance.lastAssessedDate = this.lastAssessedDate;
        this.managerActionsRef.instance.isSparkViewable = this.sparkAnEmployee.isSparkViewable || this.sparkAnEmployee.isSparkAddable ? true : false;
        this.evaluationWidgetRef = this.createComponent(EvaluationStatusComponent, this.managerActioncontainerRef);
        this.trendStatusWidgetRef = this.createComponent(EvaluationStatusComponent, this.managerActioncontainerRef);
        this.bindSummaryReportingData();
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 18-12-2019
     * Description : Create method for load Summary-Reporting desktop view.
     */
    private createSummaryDesktopView(): void {
        this.managerActioncontainerRef.clear();
        // Load manager action in detail view : 
        this.managerActionsRef = this.createComponent(ManagerActionsComponent, this.managerActioncontainerRef);
        this.managerActionsRef.instance.generalScoreRank = this.generalScoreRank;
        this.managerActionsRef.instance.scoreSummary = this.scoreSummary;
        this.managerActionsRef.instance.managerAction = this.managerAction;
        this.managerActionsRef.instance.lastScoreRemarks = this.lastScoreRemarks;
        this.managerActionsRef.instance.lastAssessedDate = this.lastAssessedDate;
        this.managerActionsRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: this.managerbotsuggetion };
        this.managerActionsRef.instance.isSparkViewable = this.sparkAnEmployee.isSparkViewable || this.sparkAnEmployee.isSparkAddable ? true : false;
        this.evaluationWidgetRef = this.createComponent(EvaluationStatusComponent, this.managerActioncontainerRef);
        this.trendStatusWidgetRef = this.createComponent(EvaluationStatusComponent, this.managerActioncontainerRef);
        this.bindSummaryReportingData();
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 18-12-2019
     * Description : Create method for bind Summary-Reporting data on desktop/mobile view.
     */
    private bindSummaryReportingData(): void {
        this.evaluationWidgetRef.instance.pageTitle = EvaluationStatusWidget;
        this.evaluationWidgetRef.instance.tooltipId = 60;
        this.trendStatusWidgetRef.instance.pageTitle = TrendStatusWidget;
        this.trendStatusWidgetRef.instance.tooltipId = 61;
        this.bindEvaluationStatus();
        if (!this.isDisplayContextualReportingView && !this.isDisplayDetailedReportingView) {
            this.loaderService.emitIsLoaderShown(false);
        }
    }

    private bindEvaluationStatus(): void {
        let isEvaluationStatusWidget = this.evaluationStatusWidgetModels.find(x => x.xAxis === 1);
        const insightManagerContextualhelp = isEvaluationStatusWidget ? isEvaluationStatusWidget.managerContextualHelp : '';
        this.evaluationWidgetRef.instance.qualityDescription = isEvaluationStatusWidget ? isEvaluationStatusWidget.qualDesc : '';
        this.evaluationWidgetRef.instance.status = isEvaluationStatusWidget ? isEvaluationStatusWidget.status : '';
        this.evaluationWidgetRef.instance.date = isEvaluationStatusWidget ? isEvaluationStatusWidget.statusDate : '';
        this.evaluationWidgetRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: insightManagerContextualhelp };

        let isTrendStatusWidget = this.evaluationStatusWidgetModels.find(y => y.xAxis === 0);
        const trendManagerContextualhelp = isTrendStatusWidget ? isTrendStatusWidget.managerContextualHelp : '';
        this.trendStatusWidgetRef.instance.qualityDescription = isTrendStatusWidget ? isTrendStatusWidget.qualDesc : '';
        this.trendStatusWidgetRef.instance.status = isTrendStatusWidget ? isTrendStatusWidget.status : '';
        this.trendStatusWidgetRef.instance.date = isTrendStatusWidget ? isTrendStatusWidget.statusDate : '';
        this.trendStatusWidgetRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: trendManagerContextualhelp };
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 18-12-2019
     * Description : Create method for load Deatiled-Reporting view.
     */
    private createDetailedReportingWidgets(): void {
        this.detailedReportingcontainerRef.clear();
        let lineGraphRef: any = this.createComponent(LineGraphComponent, this.detailedReportingcontainerRef);
        lineGraphRef.instance.graphArray = this.graphCategories;
        let yearlyLineGraphRef: any = this.createComponent(YearlyLineGraphComponent, this.detailedReportingcontainerRef);
        yearlyLineGraphRef.instance.graphArray = this.graphCategories;
        let monthlyLineGraphRef: any = this.createComponent(MonthlyLineGraphComponent, this.detailedReportingcontainerRef);
        monthlyLineGraphRef.instance.evaluationArray = this.employeeDatewiseEvaluation;
        monthlyLineGraphRef.instance.nextMonthButton.subscribe((res) => {
            this.employeeService.getEmployeeDatewiseEvaluation(this.employeeId, res, DashboardTypeId.TeamMemberDashboard).subscribe((response) => {
                if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
                    monthlyLineGraphRef.instance.evaluationArray = response.data;
                }
            });
        });
        monthlyLineGraphRef.instance.prevMonthButton.subscribe((res) => {
            this.employeeService.getEmployeeDatewiseEvaluation(this.employeeId, res, DashboardTypeId.TeamMemberDashboard).subscribe((response) => {
                if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
                    monthlyLineGraphRef.instance.evaluationArray = response.data;
                }
            });
        });
        if (!this.isDisplayContextualReportingView) {
            this.loaderService.emitIsLoaderShown(false);
        }
    }


    private createContexualReportingWidgets(): void {
        this.reportsContainerRef.clear();
        let triggerReportsRef = this.createComponent(ReportsViewComponent, this.reportsContainerRef);
        triggerReportsRef.instance.reportsData = this.contextualReportData;
        this.createContexualReportingCommentWidgets();
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 18-12-2019
     * Description : Create method for load Contexual-Reporting view.
     */
    private createContexualReportingCommentWidgets(): void {
        this.contextualReportingcontainerRef.clear();
        this.triggerCommentRef = this.createComponent(TriggerCommentComponent, this.contextualReportingcontainerRef);
        this.triggerCommentRef.instance.remarks = this.remarks;
        this.triggerCommentRef.instance.empData = this.empData;
        this.triggerCommentRef.instance.employeeName = this.employeeName;
        this.triggerCommentRef.instance.updateRemark.subscribe((remark) => {
            // this.updateRemark(remark);
        });
        this.triggerCommentRef.instance.deleteRemark.subscribe((remark) => {
            this.deleteRemark(remark);
        });
        this.loaderService.emitIsLoaderShown(false);
        this.createSparkWidget();
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 18-12-2019
     * Description : Create shared method for create component & return refernece.
     */
    private createComponent(componentName, componentFactory): any {
        const dashboardComponentFactory: ComponentFactory<any> = this.resolver.resolveComponentFactory(componentName);
        let componentRef = componentFactory.createComponent(dashboardComponentFactory);
        return componentRef;
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 26-07-2019
     * Description : Operations occurs in trigger-comment section then remarks updated locally to model.
     */
    public updateRemark(remark: Remarks): void {
        const index = this.remarks.indexOf(remark);
        if (remark.model.remarks === '' && remark.model.documentName === '' && remark.model.cloudFilePath === '') {
            this.deleteRemark(remark);
        } else {
            this.remarks[index] = remark;
            this.remarks.sort((a, b) => {
                return <any>new Date(b.assessmentDate) - <any>new Date(a.assessmentDate);
            });
            this.empData = this.remarks;
        }
    }

    /**
     * Author : Anjali Tandel
     * Created-Date : 26-07-2019
     * Description : Delete Operations occurs in trigger-comment section then remarks deleted locally to model.
     */
    public deleteRemark(remark: any): void {
        // const index = this.remarks.indexOf(remark, 0);
        // if (index > -1) {
        //     this.remarks.splice(index, 1);
        // }
        this.resetDeleteCommet(remark);
        this.empData = this.remarks;
    }

    private setSparkDetailByRoute() {
        let sparkDetail: sparkDetailByRoute;
        sparkDetail = {
            widgetHeader: 'Sparks',
            tooltipId: 68,
            routeType: 'empDashboard',
            empId: this.selectedEmployee.empId,
            dashboardTypeId: 1,
            isRedirectFromNotification: false
        }
        sessionStorage.setItem(SparkDetail, JSON.stringify(sparkDetail))
    }

    private resetDeleteCommet(remark): void {
        //Find index of specific object using findIndex method. 
        let objIndex = this.remarks.findIndex(((obj) => obj.assessmentId === remark.assessmentId));

        this.remarks[objIndex].name = remark.name;
        this.remarks[objIndex].profileName = remark.profileName;
        this.remarks[objIndex].assessmentById = remark.assessmentById;
        this.remarks[objIndex].assessmentDate = remark.assessmentDate;
        this.remarks[objIndex].assessmentByImgPath = remark.assessmentByImgPath;
        this.remarks[objIndex].assessmentId = remark.assessmentId;
        this.remarks[objIndex].empid = remark.empid;
        this.remarks[objIndex].isTriggerSent = remark.isTriggerSent;
        this.remarks[objIndex].scoreSummary = remark.scoreSummary;

        this.remarks[objIndex].performanceRemarkId = 0;
        this.remarks[objIndex].performance = '';
        this.remarks[objIndex].performanceCategory = '';
        this.remarks[objIndex].performanceModel = {
            empId: 0,
            assessmentId: remark.assessmentId,
            remarkId: 0,
            remarks: '',
            documentName: '',
            documentContents: '',
            updatedby: this.user.userId,
            cloudFilePath: '',
            attachmentpath: '',
            fileName: '',
            isPreview: false,
            isCsvFile: false,
            isFileDeletable: false,
            url: ''
        };

        this.remarks[objIndex].attitudeRemarkId = 0;
        this.remarks[objIndex].attitude = '';
        this.remarks[objIndex].attitudeCategory = '';
        this.remarks[objIndex].attitudeModel = {
            empId: 0,
            assessmentId: remark.assessmentId,
            remarkId: 0,
            remarks: '',
            documentName: '',
            documentContents: '',
            updatedby: this.user.userId,
            cloudFilePath: '',
            attachmentpath: '',
            fileName: '',
            isPreview: false,
            isCsvFile: false,
            isFileDeletable: false,
            url: ''
        };

        this.remarks[objIndex].maintenanceRemarkId = 0;
        this.remarks[objIndex].maintenance = '';
        this.remarks[objIndex].maintenanceCategory = '';
        this.remarks[objIndex].maintenanceModel = {
            empId: 0,
            assessmentId: remark.assessmentId,
            remarkId: 0,
            remarks: '',
            documentName: '',
            documentContents: '',
            updatedby: this.user.userId,
            cloudFilePath: '',
            attachmentpath: '',
            fileName: '',
            isPreview: false,
            isCsvFile: false,
            isFileDeletable: false,
            url: ''
        };

        this.remarks[objIndex].generalRemarkId = remark.generalRemarkId;
        this.remarks[objIndex].general = remark.general;
        this.remarks[objIndex].generalCategory = remark.generalCategory;
        this.remarks[objIndex].generalModel = {
            empId: remark.empid,
            assessmentId: remark.assessmentId,
            remarkId: remark.generalRemarkId,
            remarks: remark.general,
            documentName: remark.generalDocumentName ? remark.generalDocumentName.substring(remark.generalDocumentName.lastIndexOf('/') + 1, remark.generalDocumentName.length) : '',
            documentContents: '',
            updatedby: this.user.userId,
            cloudFilePath: remark.generalCloudFilePath,
            attachmentpath: remark.generalDocumentName,
            isPreview: (remark.generalDocumentName !== '' ? true : false) || (remark.generalDocumentName !== '' ? true : false),
            fileName: remark.generalDocumentName ? remark.generalDocumentName.substring(remark.generalDocumentName.indexOf('$') + 1) : remark.generalDocumentName ? remark.generalCloudFilePath : '',
            isCsvFile: (remark.generalDocumentName !== '' && remark.generalDocumentName.substring(remark.generalDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
            isDeletableAttachment: remark.generalDocumentName !== '' ? true : false,
            isFileDeletable: false,
            url: ''
        };
        this.remarks[objIndex].isEditable = this.checkPermission(remark.assessmentById, canEdit);
        this.remarks[objIndex].isDeletable = this.checkPermission(remark.assessmentById, canDelete);
        this.remarks[objIndex].itemUpdDateTime = new Date();
    }

    /**
     * Author : Mihir Patel
     * Modified by : Anjali Tandel
     * Modified-Date : 18-12-2019
     * Description : ngOnDestroy method used to save widget data at change employee dashboard route.
     */
    ngOnDestroy() {
        this.globalResponseHandlerService.encriptData('null', Encryption.TriggerSelectedId, Encryption.SelectedId);
        sessionStorage.setItem(Encryption.EmpDashboardRoute, null);
        // sessionStorage.setItem(SparkDetail,null)
        this.themeEmitter.unsubscribe();
    }
}
