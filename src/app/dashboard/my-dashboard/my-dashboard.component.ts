/**
@author : Mihir Patel
@class : MyDashboardComponent
@description :MyDashboardComponent is created for manage functionality of my dashboard 
**/
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { dashboardClass, sparkDetailByRoute, SparkDetail, DashboardTypeId } from '../../core/magic-string/common.model';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { SummaryReportingcontainerRef, DetailedReportingcontainerRef, ContextualReportingcontainerRef, ManagerActioncontainerRef, SparkcontainerRef, ResizeMinLength, RequestListContainerRef, RequestForSpakTriggerWidget, ReportsContainerRef } from '../../shared/modals/individual-employee-model';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { ThreeColumnMobileViewComponent } from '../../shared/components/dashboard-components/mobile-view/three-column-mobile-view/three-column-mobile-view.component';
import { CurrentScoreComponent } from '../../shared/components/dashboard-components/current-score/current-score.component';
import { CurrentYearAverageScoreComponent } from '../../shared/components/dashboard-components/current-year-average-score/current-year-average-score.component';
import { ActualRatingCompletedComponent } from '../../shared/components/dashboard-components/actual-rating-completed/actual-rating-completed.component';
import { ComparedAverageScoreComponent } from '../../shared/components/dashboard-components/compared-average-score/compared-average-score.component';
import { LoaderService } from '../../core/loader/loader.service';
import { YearlyLineGraphComponent } from '../../shared/components/dashboard-components/yearly-line-graph/yearly-line-graph.component';
import { LineGraphComponent } from '../../shared/components/dashboard-components/line-graph/line-graph.component';
import { MonthlyLineGraphComponent } from '../../shared/components/dashboard-components/monthly-line-graph/monthly-line-graph.component';
import { CommentViewComponent } from '../../shared/components/dashboard-components/comment-view/comment-view.component';
// import { SparkViewComponent } from '../../shared/components/dashboard-components/spark-view/spark-view.component';
import { MyDashboardListComponent } from './my-dashboard-list/my-dashboard-list.component';
import { MyDashboardWidgetComponent } from './my-dashboard-widget/my-dashboard-widget.component';
import { DashboardService } from '../dashboard-service/dashboard.service';
import { MyDashboardDetail, Remark, Spark, MyDashboardPermission } from '../dashboard-model';
import { EvaluationStatusComponent } from '../../shared/components/dashboard-components/evaluation-status/evaluation-status.component';
import { SharedFunctionService } from '../../shared/services/shared-function/shared-function.service';
import { EvaluationStatusWidget, TrendStatusWidget } from '../../shared/modals/shared-model';
import { EmployeeGuidanceComponent } from './my-dashboard-widget/employee-guidance/employee-guidance.component';
import { SparkWidgetComponent } from '../../shared/components/dashboard-components/spark-widget/spark-widget.component';
import { Encryption } from '../../core/magic-string/common-validation-model';
import { CurrentSparkAnEmployee } from '../../employees/employee-model';

@Component({
  selector: 'trigger-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit {

  @ViewChild(SummaryReportingcontainerRef, { read: ViewContainerRef, static: false }) private summaryReportingcontainerRef: ViewContainerRef;
  @ViewChild(DetailedReportingcontainerRef, { read: ViewContainerRef, static: false }) private detailedReportingcontainerRef: ViewContainerRef;
  @ViewChild(ContextualReportingcontainerRef, { read: ViewContainerRef, static: false }) private contextualReportingcontainerRef: ViewContainerRef;
  @ViewChild(ManagerActioncontainerRef, { read: ViewContainerRef, static: false }) managerActioncontainerRef: ViewContainerRef;
  @ViewChild(SparkcontainerRef, { read: ViewContainerRef, static: false }) private sparkcontainerRef: ViewContainerRef;
  @ViewChild(RequestForSpakTriggerWidget, { read: ViewContainerRef, static: false }) requestForSpakTriggerWidget: ViewContainerRef;
  @ViewChild(RequestListContainerRef, { read: ViewContainerRef, static: false }) requestListContainerRef: ViewContainerRef;

  public isMobileView: boolean = false;

  public currentScoreRef: any;
  public currentYearAverageScoreRef: any;
  public actualRatingCompletedRef: any;
  public comparedAverageScoreRef: any;
  public trendStatusWidgetRef: any;
  public evaluationWidgetRef: any;
  public mobileViewCompletedRef: any;
  public triggerCommentRef: any;
  public managerActionsRef: any;
  public sparkRef: any;
  public requestForSparkTriggerRef: any;
  public requestListRef: any;
  public isMyDashboardApiCalled: boolean;
  public userData: any;
  public myDashboardPermission: MyDashboardPermission;
  public myDashboardDetail: MyDashboardDetail;
  public employeeDatewiseEvaluation: any;

  constructor(
    private globalResponseHandlerService: GlobalResponseHandlerService,
    public breakpointObserver: BreakpointObserver,
    private loaderService: LoaderService,
    private resolver: ComponentFactoryResolver,
    public changeDetection: ChangeDetectorRef,
    private dashboardService: DashboardService,
    private sharedFunctionService: SharedFunctionService,
  ) {
    this.userData = this.globalResponseHandlerService.getUserData();

    this.breakpointObserver
      .observe([ResizeMinLength])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobileView = false;
        } else {
          this.isMobileView = true;
        }
        if (this.isMyDashboardApiCalled && this.myDashboardPermission.canViewScore) {
          this.loadScoreReportingView();
        }
      });
  }

  ngOnInit() {
    // this.sharedFunctionService.getEvaluationDate().subscribe((evaluationDate) => {
    //   this.dashboardService.getEmployeeDatewiseEvaluation(this.userData.employee.empId, evaluationDate).subscribe((response) => {
    //     if (this.globalResponseHandlerService.getApiResponse(response, false)) {
    //       this.employeeDatewiseEvaluation = response.data;
    //       this.createDetailedReportingWidgets();
    //     }
    //   });
    // });
    this.getAccordianViewPermission();
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 30-12-2019
  * Description : Create method for Get my dashbord data and bind in modal, After that based on configuration permission show/hide accordions
  */
  private getAccordianViewPermission(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.isMyDashboardApiCalled = false;
    const toAndFromDate = this.sharedFunctionService.getFormatedDate(new Date());
    this.dashboardService.getMyDashboard().subscribe((myDashboardResponse) => {
      if (this.globalResponseHandlerService.getApiResponse(myDashboardResponse, false)) {
        let myDashboardData = myDashboardResponse.data;
        this.myDashboardPermission = {
          canViewScore: myDashboardData.defaultUserPermission.canViewScore,
          canViewSummary: myDashboardData.defaultUserPermission.canViewSummary,
          canViewDetail: myDashboardData.defaultUserPermission.canViewDetail,
          canViewContextual: myDashboardData.defaultUserPermission.canViewContextual,
          requestForSpark: myDashboardData.defaultUserPermission.requestForSpark,
          requestForTrigger: myDashboardData.defaultUserPermission.requestForTrigger,
        }
        this.isMyDashboardApiCalled = true;
        this.myDashboardDetail = {
          empId: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.empId : 0,
          empName: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.empName : '',
          actualRating: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.noOfRatings : 0,
          lastYearActualRating: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.lyrNoOfRatings : 0,
          lastScoreRank: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.lastScoreRank : '',
          lastScoreRankClass: myDashboardData.employeeDashboardModel ? this.getClassByGrade(myDashboardData.employeeDashboardModel.lastScoreRank) : '',
          lastScore: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.lastScore : 0,
          currentYrAvgScoreRank: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.currentYrAvgScoreRank : '',
          currentYrAvgScoreRankClass: myDashboardData.employeeDashboardModel ? this.getClassByGrade(myDashboardData.employeeDashboardModel.currentYrAvgScoreRank) : '',
          currentYrAvgScore: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.currentYrAvgScore : 0,
          lyrAvgScoreRank: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.lyrAvgScoreRank : '',
          lyrAvgScoreRankClass: myDashboardData.employeeDashboardModel ? this.getClassByGrade(myDashboardData.employeeDashboardModel.lyrAvgScoreRank) : '',
          lastAssessedDate: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.lastAssessedDate : '',
          lyrAvgScore: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.lyrAvgScore : 0,
          lastScoreRemarks: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.lastScoreRemarks : '',
          lastEmployeeRemarks: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.lastEmployeeRemarks : '',
          lastManagerAction: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.lastManagerAction : '',
          lastScoreSummary: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.lastScoreSummary : '-',
          lastGeneralScoreRank: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.lastGeneralScoreRank : '',
          graphCategories: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.graphCategories : null,
          empBOTSuggestion: myDashboardData.employeeDashboardModel ? myDashboardData.employeeDashboardModel.empBOTSuggestion : null,
          remarks: myDashboardData.employeeDashboardModel ? this.bindRemark(myDashboardData.employeeDashboardModel.remarks) : null,
          spark: null,
          evaluationStatus: myDashboardData.evaluationStatusWidgetModels
        }
        if (!!myDashboardData.employeeSparkModels && myDashboardData.employeeSparkModels.length > 0) {
          this.myDashboardDetail.spark = this.bindSpark(myDashboardData.employeeSparkModels);
        }
      }
      this.dashboardService.getEmployeeDatewiseEvaluation(this.userData.employee.empId, toAndFromDate, DashboardTypeId.MyDashboard).subscribe((response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false)) {
          this.employeeDatewiseEvaluation = response.data;
          if (this.myDashboardPermission.canViewDetail) {
            this.createDetailedReportingWidgets();
          }
        }
      });
      this.changeDetection.detectChanges();
      this.createViewBasedonPermission();
    });
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 30-12-2019
   * Description : Create method which returns class name from grade value
   */
  private getClassByGrade(grade: string): string {
    if (grade !== '' && !!grade) {
      return dashboardClass.find(c => grade.includes(c.grade)).bindClass;
    } else {
      return '';
    }
  }

  private bindRemark(remarks): Remark[] {
    if (remarks) {
      let remarkList = remarks.map((item) => ({
        name: item.firstName + ' ' + item.lastName,
        profileName: item.firstName.charAt(0).toUpperCase() + item.lastName.charAt(0).toUpperCase(),
        assessmentById: item.assessmentById,
        assessmentDate: item.assessmentDate,
        assessmentByImgPath: item.assessmentByImgPath,
        assessmentId: item.assessmentId,
        empid: item.empid,
        isTriggerSent: item.isTriggerSent,
        scoreSummary: item.scoreSummary,

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
        // isDeletableperformanceAttachment: item.performanceDocumentName !== '' ? true : false,
        performanceModel: {
          empId: item.empid,
          assessmentId: item.assessmentId,
          remarkId: item.performanceRemarkId,
          remarks: item.performance,
          documentName: item.performanceDocumentName ? item.performanceDocumentName.substring(item.performanceDocumentName.lastIndexOf('/') + 1, item.performanceDocumentName.length) : '',
          documentContents: '',
          updatedby: this.userData.userId,
          cloudFilePath: item.performanceCloudFilePath,
          attachmentpath: item.performanceDocumentName,
          isPreview: (item.performanceDocumentName !== '' ? true : false) || (item.performanceCloudFilePath !== '' ? true : false),
          fileName: item.performanceDocumentName ? item.performanceDocumentName.substring(item.performanceDocumentName.indexOf('$') + 1) : item.performanceCloudFilePath ? item.performanceCloudFilePath : '',
          // isCsvFile: (item.performanceDocumentName !== '' && item.performanceDocumentName.substring(item.performanceDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
          // isDeletableAttachment: item.performanceDocumentName !== '' ? true : false,
          // isFileDeletable: false,
          // url: ''
        },

        attitudeRemarkId: item.attitudeRemarkId,
        attitude: item.attitude,
        attitudeCategory: item.attitudeCategory,
        // attitudeDocumentName: item.attitudeDocumentName,
        // attitudeCloudFilePath: item.attitudeCloudFilePath,
        // attitudeAttachmentpath: item.attitudeDocumentName,
        // isPreviewAttitude: (item.attitudeDocumentName !== '' ? true : false) || (item.attitudeCloudFilePath !== '' ? true : false),
        // isDeletableAttitudeAttachment: item.attitudeDocumentName !== '' ? true : false,
        attitudeModel: {
          empId: item.empid,
          assessmentId: item.assessmentId,
          remarkId: item.attitudeRemarkId,
          remarks: item.attitude,
          documentName: item.attitudeDocumentName ? item.attitudeDocumentName.substring(item.attitudeDocumentName.lastIndexOf('/') + 1, item.attitudeDocumentName.length) : '',
          documentContents: '',
          updatedby: this.userData.userId,
          cloudFilePath: item.attitudeCloudFilePath,
          attachmentpath: item.attitudeDocumentName,
          isPreview: (item.attitudeDocumentName !== '' ? true : false) || (item.attitudeCloudFilePath !== '' ? true : false),
          fileName: item.attitudeDocumentName ? item.attitudeDocumentName.substring(item.attitudeDocumentName.indexOf('$') + 1) : item.attitudeCloudFilePath ? item.attitudeCloudFilePath : '',
          // isCsvFile: (item.attitudeDocumentName !== '' && item.attitudeDocumentName.substring(item.attitudeDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
          // isDeletableAttachment: item.attitudeDocumentName !== '' ? true : false,
          // isFileDeletable: false,
          // url: ''
        },

        maintenanceRemarkId: item.maintenanceRemarkId,
        maintenance: item.maintenance,
        maintenanceCategory: item.maintenanceCategory,
        // maintenanceDocumentName: item.maintenanceDocumentName,
        // maintenanceCloudFilePath: item.maintenanceCloudFilePath,
        // maintenanceAttachmentpath: item.maintenanceDocumentName,
        // isPreviewMaintenance: (item.maintenanceDocumentName !== '' ? true : false) || (item.maintenanceCloudFilePath !== '' ? true : false),
        // isDeletableMaintenanceAttachment: item.maintenanceDocumentName !== '' ? true : false,
        maintenanceModel: {
          empId: item.empid,
          assessmentId: item.assessmentId,
          remarkId: item.maintenanceRemarkId,
          remarks: item.maintenance,
          documentName: item.maintenanceDocumentName ? item.maintenanceDocumentName.substring(item.maintenanceDocumentName.lastIndexOf('/') + 1, item.maintenanceDocumentName.length) : '',
          documentContents: '',
          updatedby: this.userData.userId,
          cloudFilePath: item.maintenanceCloudFilePath,
          attachmentpath: item.maintenanceDocumentName,
          isPreview: (item.maintenanceDocumentName !== '' ? true : false) || (item.maintenanceDocumentName !== '' ? true : false),
          fileName: item.maintenanceDocumentName ? item.maintenanceDocumentName.substring(item.maintenanceDocumentName.indexOf('$') + 1) : item.maintenanceDocumentName ? item.maintenanceCloudFilePath : '',
          // isCsvFile: (item.maintenanceDocumentName !== '' && item.maintenanceDocumentName.substring(item.maintenanceDocumentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
          // isDeletableAttachment: item.maintenanceDocumentName !== '' ? true : false,
          // isFileDeletable: false,
          // url: ''
        },

        generalRemarkId: item.generalRemarkId,
        general: item.general,
        generalCategory: item.generalCategory,
        // generalDocumentName: item.generalDocumentName,
        // generalCloudFilePath: item.generalCloudFilePath,
        // generalAttachmentpath: item.generalDocumentName,
        // isPreviewGeneral: (item.generalDocumentName !== '' ? true : false) || (item.generalCloudFilePath !== '' ? true : false),
        // isDeletableGeneralAttachment: item.generalDocumentName !== '' ? true : false,
        generalModel: {
          empId: item.empid,
          assessmentId: item.assessmentId,
          remarkId: item.generalRemarkId,
          remarks: item.general,
          documentName: item.generalDocumentName ? item.generalDocumentName.substring(item.generalDocumentName.lastIndexOf('/') + 1, item.generalDocumentName.length) : '',
          documentContents: '',
          updatedby: this.userData.userId,
          cloudFilePath: item.generalCloudFilePath,
          attachmentpath: item.generalDocumentName,
          isPreview: (item.generalDocumentName !== '' ? true : false) || (item.generalDocumentName !== '' ? true : false),
          fileName: item.generalDocumentName ? item.generalDocumentName.substring(item.generalDocumentName.indexOf('$') + 1) : item.generalDocumentName ? item.generalCloudFilePath : '',
        },
        // category: 'category',
        // remark: 'remark',
        // attachmentpath: item.documentName,
        // attachmentFileName: item.documentName ? item.documentName.substring(item.documentName.lastIndexOf('/') + 1, item.documentName.length) : '',
        // isPreview: (item.documentName !== '' ? true : false) || (item.cloudFilePath !== '' ? true : false),
        // isEditable: this.checkPermission(item.assessmentById, canEdit),
        // isDeletable: this.checkPermission(item.assessmentById, canDelete),
        // isDeletableAttachment: item.documentName !== '' ? true : false,
        // isCsvFile: (item.documentName !== '' && item.documentName.substring(item.documentName.lastIndexOf('.') + 1) === 'csv') ? true : false,
        itemUpdDateTime: new Date(),
        // serverCloudUrl: item.cloudFilePath,
        // cloudFilePath: item.cloudFilePath,
      }));
      return remarkList;
    }
  }

  private bindSpark(sparks): Spark[] {
    if (!!sparks) {
      let sparkList = sparks.map((values) => ({
        isTriggerSent: values.isTriggerSent,
        isSpark: true,
        empId: values.empId,
        sparkId: values.sparkId,
        categoryId: values.categoryId,
        category: values.category,
        classificationId: values.classificationId,
        classification: values.classification,
        sparkDate: values.sparkDate,
        sparkBy: values.sparkBy,
        sparkByFirstName: values.sparkByFirstName,
        sparkByLastName: values.sparkByLastName,
        documentName: values.documentName,
        cloudFilePath: values.cloudFilePath,
        remarks: values.remarks,
        bActive: values.bActive,
        createdBy: values.createdBy,
        updatedBy: values.updatedBy,
        sparkByImgPath: values.sparkByImgPath,
        profileName: values.sparkByFirstName.charAt(0).toUpperCase() + values.sparkByLastName.charAt(0).toUpperCase(),
        givenBy: values.sparkByFirstName + ' ' + values.sparkByLastName,
        isPreviewFile: (values.documentName !== '' || values.cloudFilePath !== '') ? true : false,
        path: values.documentName
      }));
      return sparkList;
    }

  }

  /**
   * Author : Mihir Patel
   * Created-Date : 30-12-2019
   * Description : Create method for load component based on permission.
  */
  private createViewBasedonPermission(): void {
    if (this.myDashboardPermission.canViewScore) {
      this.loadScoreReportingView();
    }
    if (this.myDashboardPermission.canViewSummary) {
      this.createReportingView();
    }
    if (this.myDashboardPermission.canViewDetail) {
      this.createDetailedReportingWidgets();
    }
    if (this.myDashboardPermission.canViewContextual) {
      this.createContexualReportingWidgets();
    }
    if (this.myDashboardPermission.requestForSpark || this.myDashboardPermission.requestForTrigger) {
      this.createMyRequestSparkWidgets();
    }
  }

  /**
    * Author : Shahbaz Shaikh
    * Created-Date : 01-07-2021
    * Description : Create method for load mobile view component if width is for mobile view..
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
 * Created-Date : 01-07-2021
 * Description : Create method for load Score-Reporting mobile view.
 */
  private createScoreMobileView(): void {
    this.summaryReportingcontainerRef.clear();
    this.mobileViewCompletedRef = this.createComponent(ThreeColumnMobileViewComponent, this.summaryReportingcontainerRef);
    this.bindScoreReportingData();
  }

  /**
  * Author : Shahbaz Shaikh
  * Created-Date : 01-07-2021
  * Description : Create method for load Score-Reporting Desktop view.
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
  * Created-Date : 01-07-2021
  * Description : Create method for bind score reporting.
  */
  private bindScoreReportingData(): void {
    if (this.isMobileView) {
      this.mobileViewCompletedRef.instance.lastScoreRank = this.myDashboardDetail.lastScoreRank ? this.myDashboardDetail.lastScoreRank : '-';
      this.mobileViewCompletedRef.instance.lastScoreRankClass = this.myDashboardDetail.lastScoreRankClass;
      this.mobileViewCompletedRef.instance.lastAssessedDate = this.myDashboardDetail.lastAssessedDate;
      this.mobileViewCompletedRef.instance.currentYrAvgScoreRank = this.myDashboardDetail.currentYrAvgScoreRank ? this.myDashboardDetail.currentYrAvgScoreRank : '-';
      this.mobileViewCompletedRef.instance.currentYrAvgScoreRankClass = this.myDashboardDetail.currentYrAvgScoreRankClass;
      this.mobileViewCompletedRef.instance.actualRating = this.myDashboardDetail.actualRating;
      this.mobileViewCompletedRef.instance.lastYearActualRating = this.myDashboardDetail.lastYearActualRating;
      this.mobileViewCompletedRef.instance.lyrAvgScoreRank = this.myDashboardDetail.lyrAvgScoreRank ? this.myDashboardDetail.lyrAvgScoreRank : '-';
      this.mobileViewCompletedRef.instance.lyrAvgScoreRankClass = this.myDashboardDetail.lyrAvgScoreRankClass;
    } else {
      this.currentScoreRef.instance.lastScoreRank = this.myDashboardDetail.lastScoreRank ? this.myDashboardDetail.lastScoreRank : '-';
      this.currentScoreRef.instance.lastScoreRankClass = this.myDashboardDetail.lastScoreRankClass;
      this.currentScoreRef.instance.lastAssessedDate = this.myDashboardDetail.lastAssessedDate;

      this.currentYearAverageScoreRef.instance.currentYrAvgScoreRank = this.myDashboardDetail.currentYrAvgScoreRank ? this.myDashboardDetail.currentYrAvgScoreRank : '-';
      this.currentYearAverageScoreRef.instance.currentYrAvgScoreRankClass = this.myDashboardDetail.currentYrAvgScoreRankClass;

      this.actualRatingCompletedRef.instance.actualRating = this.myDashboardDetail.actualRating;
      this.actualRatingCompletedRef.instance.lastYearActualRating = this.myDashboardDetail.lastYearActualRating;

      this.comparedAverageScoreRef.instance.currentYrAvgScoreRank = this.myDashboardDetail.currentYrAvgScoreRank ? this.myDashboardDetail.currentYrAvgScoreRank : '-';
      this.comparedAverageScoreRef.instance.currentYrAvgScoreRankClass = this.myDashboardDetail.currentYrAvgScoreRankClass;
      this.comparedAverageScoreRef.instance.lyrAvgScoreRank = this.myDashboardDetail.lyrAvgScoreRank ? this.myDashboardDetail.lyrAvgScoreRank : '-';
      this.comparedAverageScoreRef.instance.lyrAvgScoreRankClass = this.myDashboardDetail.lyrAvgScoreRankClass;
    }
    // this.createReportingView();
  }

  /**
* Author : Mihir Patel
* Created-Date : 30-12-2019
* Description : Create method for load mobile view component if width is for mobile view..
*/
  private createReportingView(): void {
    if (this.isMobileView) {
      this.createSummaryMobileView();
    } else {
      this.createSummaryDesktopView();
    }
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 30-12-2019
  * Description : Create method for load Summary-Reporting mobile view.
  */
  private createSummaryMobileView(): void {
    this.managerActioncontainerRef.clear();
    this.managerActionsRef = this.createComponent(EmployeeGuidanceComponent, this.managerActioncontainerRef);
    //this.managerActionsRef.instance.generalScoreRank = this.myDashboardDetail.lastGeneralScoreRank;
    this.managerActionsRef.instance.scoreSummary = this.myDashboardDetail.lastScoreSummary;
    //this.managerActionsRef.instance.managerAction = this.myDashboardDetail.lastManagerAction;
    this.managerActionsRef.instance.employeeRemarks = this.myDashboardDetail.lastEmployeeRemarks;
    this.managerActionsRef.instance.lastAssessedDate = this.myDashboardDetail.lastAssessedDate;
    this.managerActionsRef.instance.isSparkViewable = true;
    this.evaluationWidgetRef = this.createComponent(EvaluationStatusComponent, this.managerActioncontainerRef);
    this.trendStatusWidgetRef = this.createComponent(EvaluationStatusComponent, this.managerActioncontainerRef);
    this.bindSummaryReportingData();
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 30-12-2019
   * Description : Create method for load Summary-Reporting desktop view.
   */
  private createSummaryDesktopView(): void {
    this.managerActioncontainerRef.clear();
    this.managerActionsRef = this.createComponent(EmployeeGuidanceComponent, this.managerActioncontainerRef);
    //this.managerActionsRef.instance.generalScoreRank = this.myDashboardDetail.lastGeneralScoreRank;
    this.managerActionsRef.instance.scoreSummary = this.myDashboardDetail.lastScoreSummary;
    //this.managerActionsRef.instance.managerAction = this.myDashboardDetail.lastManagerAction;
    this.managerActionsRef.instance.employeeRemarks = this.myDashboardDetail.lastEmployeeRemarks;
    this.managerActionsRef.instance.isSparkViewable = true;
    this.managerActionsRef.instance.lastAssessedDate = this.myDashboardDetail.lastAssessedDate;
    this.managerActionsRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: this.myDashboardDetail.empBOTSuggestion };
    this.evaluationWidgetRef = this.createComponent(EvaluationStatusComponent, this.managerActioncontainerRef);
    this.trendStatusWidgetRef = this.createComponent(EvaluationStatusComponent, this.managerActioncontainerRef);
    this.bindSummaryReportingData();
  }

  private bindSummaryReportingData(): void {
    this.evaluationWidgetRef.instance.pageTitle = EvaluationStatusWidget;
    this.evaluationWidgetRef.instance.tooltipId = 60;
    this.trendStatusWidgetRef.instance.pageTitle = TrendStatusWidget;
    this.trendStatusWidgetRef.instance.tooltipId = 61;
    this.bindEvaluationStatus();
    if (!this.myDashboardPermission.canViewContextual && !this.myDashboardPermission.canViewDetail) {
      this.loaderService.emitIsLoaderShown(false);
    }
  }

  private bindEvaluationStatus(): void {
    if (this.myDashboardDetail.evaluationStatus) {
      let isEvaluationStatusWidget = this.myDashboardDetail.evaluationStatus.find(x => x.xAxis === 1);
      const insightManagerContextualhelp = isEvaluationStatusWidget ? isEvaluationStatusWidget.empContextualHelp : '';
      this.evaluationWidgetRef.instance.qualityDescription = isEvaluationStatusWidget ? isEvaluationStatusWidget.qualDesc : '';
      this.evaluationWidgetRef.instance.status = isEvaluationStatusWidget ? isEvaluationStatusWidget.status : '';
      this.evaluationWidgetRef.instance.date = isEvaluationStatusWidget ? isEvaluationStatusWidget.statusDate : '';
      this.evaluationWidgetRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: insightManagerContextualhelp };

      let isTrendStatusWidget = this.myDashboardDetail.evaluationStatus.find(y => y.xAxis === 0);
      const trendEmpContextualHelp = isTrendStatusWidget ? isTrendStatusWidget.empContextualHelp : '';
      this.trendStatusWidgetRef.instance.qualityDescription = isTrendStatusWidget ? isTrendStatusWidget.qualDesc : '';
      this.trendStatusWidgetRef.instance.status = isTrendStatusWidget ? isTrendStatusWidget.status : '';
      this.trendStatusWidgetRef.instance.date = isTrendStatusWidget ? isTrendStatusWidget.statusDate : '';
      this.trendStatusWidgetRef.instance.bulbTootlip = { isBulbTootlip: true, bulbTootlipContent: trendEmpContextualHelp };
    } else {
      this.evaluationWidgetRef.instance.qualityDescription = '';
      this.evaluationWidgetRef.instance.status = '';

      this.trendStatusWidgetRef.instance.qualityDescription = '';
      this.trendStatusWidgetRef.instance.status = '';
    }
  }


  private createDetailedReportingWidgets(): void {
    this.detailedReportingcontainerRef.clear();
    let lineGraphRef: any = this.createComponent(LineGraphComponent, this.detailedReportingcontainerRef);
    let graphArray = this.myDashboardDetail.graphCategories;
    lineGraphRef.instance.graphArray = graphArray;
    lineGraphRef.instance.isMyDashboard = true;
    let yearlyLineGraphRef: any = this.createComponent(YearlyLineGraphComponent, this.detailedReportingcontainerRef);
    yearlyLineGraphRef.instance.graphArray = graphArray;
    yearlyLineGraphRef.instance.isMyDashboard = true;
    let monthlyLineGraphRef: any = this.createComponent(MonthlyLineGraphComponent, this.detailedReportingcontainerRef);
    monthlyLineGraphRef.instance.isMyDashboard = true;
    monthlyLineGraphRef.instance.evaluationArray = this.employeeDatewiseEvaluation;
    monthlyLineGraphRef.instance.nextMonthButton.subscribe((res) => {
      this.dashboardService.getEmployeeDatewiseEvaluation(this.userData.employee.empId, res, DashboardTypeId.MyDashboard).subscribe((response) => {
        monthlyLineGraphRef.instance.evaluationArray = response.data;
      });
    });
    monthlyLineGraphRef.instance.prevMonthButton.subscribe((res) => {
      this.dashboardService.getEmployeeDatewiseEvaluation(this.userData.employee.empId, res, DashboardTypeId.MyDashboard).subscribe((response) => {
        monthlyLineGraphRef.instance.evaluationArray = response.data;
      });
    });
    if (!this.myDashboardPermission.canViewContextual) {
      this.loaderService.emitIsLoaderShown(false);
    }
  }

  private createContexualReportingWidgets(): void {
    this.createSparkWidget();
    this.contextualReportingcontainerRef.clear();
    this.triggerCommentRef = this.createComponent(CommentViewComponent, this.contextualReportingcontainerRef);
    this.triggerCommentRef.instance.comments = this.myDashboardDetail.remarks;
  }

  private createSparkWidget() {
    this.sparkcontainerRef.clear();
    sessionStorage.setItem(Encryption.DashboardRoute, Encryption.Dashboard)
    this.setSparkData();
    this.setSparkDetailByRoute();
    // this.sparkRef = this.createComponent(SparkViewComponent, this.sparkcontainerRef);
    this.sparkRef = this.createComponent(SparkWidgetComponent, this.sparkcontainerRef);

  }

  private createMyRequestSparkWidgets() {
    this.requestForSpakTriggerWidget.clear();
    this.requestForSparkTriggerRef = this.createComponent(MyDashboardWidgetComponent, this.requestForSpakTriggerWidget);
    this.requestForSparkTriggerRef.instance.isRequestForSpark = this.myDashboardPermission.requestForSpark;
    this.requestForSparkTriggerRef.instance.isRequestForTrigger = this.myDashboardPermission.requestForTrigger;
    if (this.myDashboardPermission.requestForSpark || this.myDashboardPermission.requestForTrigger) {
      this.requestListContainerRef.clear();
      this.requestListRef = this.createComponent(MyDashboardListComponent, this.requestListContainerRef);
    }

  }

  private createComponent(componentName, componentFactory): any {
    const dashboardComponentFactory: ComponentFactory<any> = this.resolver.resolveComponentFactory(componentName);
    let componentRef = componentFactory.createComponent(dashboardComponentFactory);
    return componentRef;
  }

  private setSparkData(): void {
    let sparkAnEmployee = new CurrentSparkAnEmployee();
    sparkAnEmployee = new CurrentSparkAnEmployee(
      this.globalResponseHandlerService.getUser().userId,
      this.globalResponseHandlerService.getUser().empId,
      '',
      '',
      true,
      false,
      false,
      false,
      false,
    );
    this.globalResponseHandlerService.setSparkAnEmployee(sparkAnEmployee);
  }

  private setSparkDetailByRoute() {
    let sparkDetail: sparkDetailByRoute;
    sparkDetail = {
      widgetHeader: 'Sparks',
      tooltipId: 55,
      routeType: 'dashboard',
      empId: this.userData.employee.empId,
      dashboardTypeId: 2,
      isRedirectFromNotification: false
    }
    sessionStorage.setItem(SparkDetail, JSON.stringify(sparkDetail))
  }

  ngOnDestroy() {
    sessionStorage.setItem(Encryption.DashboardRoute, null);
    // sessionStorage.setItem(SparkDetail,null)
  }
}
