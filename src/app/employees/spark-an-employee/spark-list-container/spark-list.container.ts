/**
@author : Anjali Tandel
@class : SparkAnEmployeeListContainer
@description : SparkAnEmployeeListContainer is created for view, add, edit and delete employee-spark.
**/
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SparkAnEmployeeService } from '../spark-an-employee-service/spark-an-employee.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { LoaderService } from '../../../core/loader/loader.service';
import { MatDialog } from '@angular/material';
import { ApiResponse, SparkAnEmployee, RequestModel, Category, ClassificationsCategories, SparkListBy, DashboardType, SparkReplyObject } from '../spark-an-employee-model';
import { SparkListPresenter } from './spark-list-presenter/spark-list-presenter';
import { CurrentSparkAnEmployee } from '../../employee-model';
import { Encryption } from '../../../core/magic-string/common-validation-model';
import { SparkAnEmployeeAdapter } from '../spark-an-employee-adapter/spark-an-employee-adapter';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
import { CommonService } from '../../../core/services/common/common.service';
import { SendMail, ActionType, SparkDetail, sparkDetailByRoute } from '../../../core/magic-string/common.model';

@Component({
  selector: 'trigger-spark-list-container',
  templateUrl: './spark-list.container.html'
})
export class SparkListContainer implements OnInit {
  /** This is a observable of calling sync API which passes the list of sparks to its presentation */
  public baseResponse$: Observable<ApiResponse>;
  /** permission variable have spark view/add/edit/delete permissions's boolean value */
  public permission: CurrentSparkAnEmployee;
  /** This is a observable of calling sync API which passes the list of classifications to its presentation */
  public classifications$: Observable<ApiResponse>;
  /** This is a observable of calling sync API which passes the list of category to its presentation */
  public categories$: Observable<ApiResponse>;
  // public isEmployeeDashboardRoute: boolean;
  public isSparkList: boolean;
  public sendMailObject: SendMail;
  public sparkDetailBySelectedRoute: sparkDetailByRoute
  public isDashboardRoute: boolean;
  // /////For widget define variables : 
  public userData: any;
  public switchType: number
  public updateSparkObject: any;
  public isDataSaveInSession: boolean;
  constructor(
    private commonService: CommonService,
    private sparkAnEmployeeService: SparkAnEmployeeService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private globalEventsManager: GlobalEventsManager,
    private loaderService: LoaderService,
    private matDialog: MatDialog,
    private listPresenter: SparkListPresenter,
    private sparkAnEmployeeAdapter: SparkAnEmployeeAdapter) {
    this.globalEventsManager.getNotification(true);
    this.userData = this.globalResponseHandlerService.getUser()
    this.isDataSaveInSession = false;
  }

  ngOnInit() {
    this.checkAndGetRoteDetail(); // new code
  }

  private checkAndGetRoteDetail() {
    this.switchType = SparkListBy.Weekly;
    let sparkDetailBySelectedRoute: sparkDetailByRoute = JSON.parse(sessionStorage.getItem(SparkDetail))
    if (!!sparkDetailBySelectedRoute) {
      this.sparkDetailBySelectedRoute = sparkDetailBySelectedRoute;
      this.isSparkList = false; // For load spark widget insted of spark list
      this.isDashboardRoute = true;
      if (this.sparkDetailBySelectedRoute.routeType === 'empDashboard') {
        //Write code here for emp dashboard route
      } else if (this.sparkDetailBySelectedRoute.routeType === 'dashboard') {
        //for my dashboard
      } else {
        this.isSparkList = true;
        this.isDashboardRoute = false;
        // for spark list page
      }
    }
    this.getSparkPermission();
  }

  private getSparkPermission(): void {
    this.permission = this.listPresenter.getSparkAnEmployee();
    if (this.permission.isSparkViewable) { this.getSparks(); }
    if (this.permission.isSparkAddable || this.permission.isSparkEditable || this.permission.isSparkViewable) {
      this.getClassificationsCategories();
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 08-11-2019
   * Modified-Date : 15-11-2019
   * Description : This Method is invoke when for get all sparks from server..
   */
  private getSparks(): void {
    let queryString = this.getQueryString();
    this.baseResponse$ = this.sparkAnEmployeeService.getSparksBySelectedTab(queryString);
  }

  getQueryString(): string {
    let apiQueryString: string = '';
    apiQueryString = '?EmpId=' + this.sparkDetailBySelectedRoute.empId + '&SparkById=' + this.userData.userId + '&DashboardId=' + this.sparkDetailBySelectedRoute.dashboardTypeId + '&SparkListBy=' + this.switchType;
    return apiQueryString;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 08-11-2019
   * Modified-Date : 15-11-2019
   * Description : This Method is invoke when for get spark categories & cassifications from server.
   */
  private getClassificationsCategories(): void {
    if (!this.listPresenter.checkClassficationsCategories()) {
      this.getClassifications();
      this.classifications$ = this.sparkAnEmployeeService.getSparkClassification(this.globalResponseHandlerService.getUser().clientId);
      this.categories$ = this.sparkAnEmployeeService.getCategory(this.globalResponseHandlerService.getUser().clientId)
    } else {
      this.isDataSaveInSession = true;
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 15-11-2019
   * Description : This Method is invoke when for get spark cassifications from server.
   */
  public getClassifications(): void {
    this.sparkAnEmployeeService.getSparkClassification(this.globalResponseHandlerService.getUser().clientId).subscribe(
      (sparkClassifications) => {
        if (this.globalResponseHandlerService.getApiResponse(sparkClassifications, false, false)) {
          let classifications: SparkAnEmployee[] = sparkClassifications.data;
          this.getCategories(classifications);
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 15-11-2019
   * Description : This Method is invoke when for get spark categories from server.
   */
  public getCategories(classifications: SparkAnEmployee[]): void {
    this.sparkAnEmployeeService.getCategory(this.globalResponseHandlerService.getUser().clientId).subscribe(
      (sparkCategories) => {
        if (this.globalResponseHandlerService.getApiResponse(sparkCategories, false, false)) {
          let categories: Category[] = sparkCategories.data;
          const ClassificationsCategories: ClassificationsCategories = this.sparkAnEmployeeAdapter.bindClassificationscategories(classifications, categories);
          this.globalResponseHandlerService.encriptData(JSON.stringify(ClassificationsCategories), Encryption.SparkClassficationsCategories, Encryption.SparkClassficationsCategoriesKey);
          this.isDataSaveInSession = true;
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 31-08-2019
   * Modified-Date : 15-11-2019
   * Description : This Method is invoke when user add spark from server..
   */
  public addSpark(spark: RequestModel): void {
    this.sparkAnEmployeeService.addSpark(spark).subscribe(
      (sparkAnEmployee) => {
        if (this.globalResponseHandlerService.getApiResponse(sparkAnEmployee, !spark.isDisplayEmailConfirmation, false)) {
          this.sendMailObject = new SendMail(sparkAnEmployee.data.sparkId, ActionType.Spark, sparkAnEmployee.data.employeeEmail, sparkAnEmployee.data.emailContent);
          this.globalEventsManager.getEmailTemplate(this.sendMailObject.emailContent);
          //  Code comment here and get loaded spark after mail send popup
          // if (this.permission.isSparkViewable && !this.isEmployeeDashboardRoute) { this.getSparks(); }
          // if (this.isEmployeeDashboardRoute) { this.getBaseResponse(); }
        } else {
          this.loaderService.emitIsLoaderShown(false);
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 31-08-2019
   * Modified-Date : 15-11-2019
   * Description : This Method is invoke when user update spark from server.
   */
  public updateSpark(spark: RequestModel): void {
    this.sparkAnEmployeeService.updateSpark(spark).subscribe(
      (updateSparkAnEmployee) => {
        if (this.globalResponseHandlerService.getApiResponse(updateSparkAnEmployee, true, false)) {
          this.getBaseResponse();
        } else {
          this.loaderService.emitIsLoaderShown(false);
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 31-08-2019
   * Modified-Date : 15-11-2019
   * Description : This Method is invoke when user delete spark from server.
   */
  public deleteSpark(spark: SparkAnEmployee): void {
    this.sparkAnEmployeeService.deleteSpark(spark.empId, spark.sparkId, this.globalResponseHandlerService.getUser().userId).subscribe(
      (deletetSparkResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(deletetSparkResponse, true, false)) {
          this.getBaseResponse();
        } else {
          this.loaderService.emitIsLoaderShown(false);
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 31-08-2019
   * Modified-Date : 15-11-2019
   * Description : This Method is invoke when user delet-spark-attachment from server.
   */
  public deleteAttachment(spark: RequestModel): void {
    this.sparkAnEmployeeService.deleteSparkAttachment(spark).subscribe(
      (deletetSparkResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(deletetSparkResponse, true)) {
          this.getSparks();
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 31-08-2019
   * Modified-Date : 15-11-2019
   * Description : Private method for get all sparks after calling add/edit/delete spark API.
   */
  private getBaseResponse(): void {
    if (this.permission.isSparkViewable) { this.getSparks(); }
    this.matDialog.closeAll();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 24-01-2020
   * Description : This Method is invoke when user hit send button from sen-mail-confirmation modal-popup from server..
   */
  public sendMail(sendMail: boolean): void {
    this.commonService.sendMail(this.sendMailObject).subscribe(
      (sendMail) => {
        if (this.globalResponseHandlerService.getApiResponse(sendMail, true, false)) {
          this.globalEventsManager.getEmailTemplate('');
          this.globalEventsManager.closeModal(true);
          this.loadSpark();
        }
      }
    );
  }

  public loadSpark(): void {
    if (this.permission.isSparkViewable && this.sparkDetailBySelectedRoute.routeType !== 'empDashboard') { this.getSparks(); }
    if (this.sparkDetailBySelectedRoute.routeType === 'empDashboard') { this.getBaseResponse(); }
  }

  // For load spark by selected tab : 
  public loadSparkByTab(tabType): void {
    this.switchType = tabType;
    this.getSparks();
  }

  public addReply(object: SparkReplyObject): void {
    this.updateSparkObject = {};
    this.sparkAnEmployeeService.addReply(object).subscribe(
      (addSpark) => {
        if (this.globalResponseHandlerService.getApiResponse(addSpark, false)) {
          this.updateSparkObject = addSpark.data;
        }
      }
    );
  }
}
