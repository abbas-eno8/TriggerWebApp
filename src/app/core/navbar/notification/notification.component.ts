import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// -------------------------------------------------- //
import { NotificationService } from './notification.service/notification.service';
import { GlobalResponseHandlerService } from '../../global-response-handler/global-response-handler';
import { LoaderService } from '../../loader/loader.service';
import { GlobalEventsManager } from '../globalEventsManager';
import { CommonRedirectionServiceService } from '../../services/common-redirection-service/common-redirection-service.service';
import { DashboardStatus } from '../../../dashboard/dashboard-model';
import { Encryption } from '../../magic-string/common-validation-model';
import { UrlEncryptionDecryptionService } from '../../url-encryption-decryption/url-encryption-decryption.service';
import { DateTimeConverterService } from '../../../shared/services/date-time-converter/date-time-converter.service';
import {
  NotificationType, Route, NotificationModel, MyWall, CurrentSparkAnEmployee, sparkDetailByRoute,
  SparkDetail, MyDashboard, ExpiredNotification, DateFormat
} from '../../magic-string/common.model';

@Component({
  selector: 'trigger-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {

  @ViewChild('scrollRef', { read: ElementRef, static: false }) public scrollRef: ElementRef;

  public countOfUnreadMessage: number;
  public notifications: NotificationModel[];
  public responseErrorMessage: string;

  private page: number;
  private pageSize: number;

  constructor(
    private commonRedirectionServiceService: CommonRedirectionServiceService,
    private datePipe: DatePipe,
    private globalEventsManager: GlobalEventsManager,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private router: Router,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private dateTimeConverterService: DateTimeConverterService
  ) {
    this.page = 1;
    this.pageSize = 10;
    this.globalEventsManager.notification.subscribe((isTrue) => {
      if (isTrue) {
        this.getNotification();
      }
    })
  }

  ngOnInit() { }

  /**
    * Author : Shahbaz Shaikh
    * Modified-Date :  10-09-2021
    * Description : Get API for get load more notifications.
    */
  public loadMoreNotification() {
    if (this.scrollRef.nativeElement.offsetHeight + this.scrollRef.nativeElement.scrollTop >= this.scrollRef.nativeElement.scrollHeight) {
      if (this.notifications.length < this.notifications[this.notifications.length - 1].totalRows) {
        this.page++;
        this.notificationService.getNotifications(this.globalResponseHandlerService.getUser().empId, this.page, this.pageSize).subscribe((response) => {
          if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
            const notificationList = this.dateTimeConvert(response.data)
            this.notifications = [...this.notifications, ...notificationList];
          }
        });
      }
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  18-12-2018
  * Description : Get API for get all notificcations.
  */
  private getNotification(): void {
    this.notifications = [];
    this.countOfUnreadMessage = 0;
    this.notificationService.getNotifications(this.globalResponseHandlerService.getUser().empId, this.page, this.pageSize).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          this.notifications = this.dateTimeConvert(response.data);
          this.responseErrorMessage = response.data.message;
          this.countOfUnreadMessage = this.notifications.filter(n => !n.markAs).length;
        } else {
          this.responseErrorMessage = response.message;
        }
      });
  }
  /**
  * Author : Anjali Tandel
  * Modified-Date :  18-12-2018
  * Description : Read notification on click icon.
  */
  public onClickIcon(): void {
    this.countOfUnreadMessage = 0;
    // let arrayOfId = '';
    // this.notifications.forEach(list => {
    //   if (!list.markAs) {
    //     arrayOfId += (list.id + ',');
    //   }
    // })
    // if (arrayOfId != '') {
    //   this.notificationService.readNotification(arrayOfId).subscribe(
    //     (response) => {
    //       this.globalResponseHandlerService.getApiResponse(response, false);
    //     }
    //   );
    // }
  }

  public redirection(notification: NotificationModel): void {
    let selectedNotification = this.notifications && this.notifications.find((item) => item.id === notification.id);
    selectedNotification.markAs = true;
    this.notificationService.readNotification(notification.id).subscribe(
      (response) => {
        this.globalResponseHandlerService.getApiResponse(response, false);
      }
    );
    this.redirectBasedOnType(notification);
  }

  private redirectBasedOnType(notification): void {
    if (notification.type === NotificationType.Employee) {
      this.router.navigate([Route.Employee]);
    } else if (notification.type === NotificationType.UnApprovedSpark) {
      this.router.navigate([Route.SparkNotification]);
    } else if (notification.type === NotificationType.PublicSpark) {
      //this.router.navigate([Route.MyWall]);
      sessionStorage.setItem(Encryption.WallSparkId, notification.transactionId);
      let obj = {
        isMyDashboard: false,
        isManagerDashboard: false,
        isTeamDashoard: false,
        isMyWall: true,
      }
      sessionStorage.setItem(DashboardStatus, JSON.stringify(obj));
      if (this.router.url !== Route.Dashboard) {
        this.globalEventsManager.changeDashboard(MyWall);
        this.router.navigate([Route.Dashboard]);
      } else {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.globalEventsManager.changeDashboard(MyWall);
          this.router.navigate([Route.Dashboard]);
        });
      }
    } else if (notification.type === NotificationType.sparkListReply) {
      this.loaderService.emitIsLoaderShown(true);
      this.setSparkDetailBySparkList(notification);
      this.setSparkData(notification);
      if (this.router.url === Route.SparkAnEmployee) {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.urlEncryptionDecryptionService.urlEncryption(notification.empId.toString(), Route.SparkAnEmployee);
        });
      } else {
        this.urlEncryptionDecryptionService.urlEncryption(notification.empId.toString(), Route.SparkAnEmployee);
      }
    } else if (notification.type === NotificationType.myDashboardReply) {
      this.loaderService.emitIsLoaderShown(true);
      this.setSparkDetailForMyDashboard(notification);
      this.setSparkData(notification);

      // For select my dashboard and save object in session : 
      let dashboardButtonsStatus = {
        isMyDashboard: true,
        isManagerDashboard: false,
        isTeamDashoard: false,
        isMyWall: false,
      }
      sessionStorage.setItem(DashboardStatus, JSON.stringify(dashboardButtonsStatus))
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.globalEventsManager.changeDashboard(MyDashboard);
        this.router.navigate([Route.Dashboard]);
      });
    } else if (notification.type === NotificationType.GlobalAssessment) {
      this.loaderService.emitIsLoaderShown(true);
      this.commonRedirectionServiceService.getGlobalAssessmentForm(notification.transactionId);
    } else if (notification.type === NotificationType.UpdateWorkLocation) {
      let date = this.datePipe.transform(new Date(), DateFormat);
      if (this.datePipe.transform(new Date(), DateFormat) === this.datePipe.transform(new Date(notification.createdDtStamp), DateFormat)) {
        if (this.router.url !== Route.UpdateWorkLocation) {
          this.loaderService.emitIsLoaderShown(true);
          this.router.navigate([Route.UpdateWorkLocation]);
        }
      } else {
        this.globalResponseHandlerService.disaplyErrorMessage(ExpiredNotification);
      }
    } else if (notification.type === NotificationType.UpdateSurveyForm) {
      if (this.datePipe.transform(new Date(), DateFormat) === this.datePipe.transform(new Date(notification.createdDtStamp), DateFormat)) {
        this.loaderService.emitIsLoaderShown(true);
        this.commonRedirectionServiceService.getEmployeeSurveyForm();
      } else {
        this.globalResponseHandlerService.disaplyErrorMessage(ExpiredNotification);
      }
    } else if (notification.type === NotificationType.EvaluationaInDraft) {
      this.loaderService.emitIsLoaderShown(true);
      this.urlEncryptionDecryptionService.urlEncryption(this.globalResponseHandlerService.getUser().userId.toString(), Route.EvaluationsInDrafts);
    } else if (notification.type === NotificationType.AddNewSpark) {
      this.loaderService.emitIsLoaderShown(true);
      // this.setSparkDetailForMyDashboard(notification);
      // this.setSparkData(notification);
      // For select my dashboard and save object in session : 
      let dashboardButtonsStatus = {
        isMyDashboard: true,
        isManagerDashboard: false,
        isTeamDashoard: false,
        isMyWall: false,
      }
      sessionStorage.setItem(DashboardStatus, JSON.stringify(dashboardButtonsStatus))
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.globalEventsManager.changeDashboard(MyDashboard);
        this.router.navigate([Route.Dashboard]);
      });
    } else if (notification.type === NotificationType.AddNewEvaluationa) {
      this.loaderService.emitIsLoaderShown(true);
      // this.setSparkDetailForMyDashboard(notification);
      // this.setSparkData(notification);

      // For select my dashboard and save object in session : 
      let dashboardButtonsStatus = {
        isMyDashboard: true,
        isManagerDashboard: false,
        isTeamDashoard: false,
        isMyWall: false,
      }
      sessionStorage.setItem(DashboardStatus, JSON.stringify(dashboardButtonsStatus))
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.globalEventsManager.changeDashboard(MyDashboard);
        this.router.navigate([Route.Dashboard]);
      });
    } else {
      this.loaderService.emitIsLoaderShown(true);
      this.commonRedirectionServiceService.getActionRequestOnNotification(notification);
    }
  }

  private setSparkDetailBySparkList(data) {
    let sparkDetail: sparkDetailByRoute;
    sparkDetail = {
      widgetHeader: 'Sparks for',
      tooltipId: 0,
      routeType: 'sparkList',
      empId: data.empId,
      dashboardTypeId: 3,
      isRedirectFromNotification: true
    }
    sessionStorage.setItem(SparkDetail, JSON.stringify(sparkDetail))
  }

  private setSparkDetailForMyDashboard(data) {
    let sparkDetail: sparkDetailByRoute;
    sparkDetail = {
      widgetHeader: 'Sparks',
      tooltipId: 55,
      routeType: 'dashboard',
      empId: data.empId,
      dashboardTypeId: 2,
      isRedirectFromNotification: true
    }
    sessionStorage.setItem(SparkDetail, JSON.stringify(sparkDetail))
  }
  private setSparkData(data): void {
    let name = data.message.split(' ');
    let firstName = name[0]
    let lastName = name[1]
    let sparkAnEmployee = new CurrentSparkAnEmployee();
    sparkAnEmployee = new CurrentSparkAnEmployee(
      this.globalResponseHandlerService.getUser().userId,
      this.globalResponseHandlerService.getUser().empId, //this.selectedEmployee.empId,
      firstName, //this.selectedEmployee.firstName,
      lastName, //this.selectedEmployee.lastName,
      true, //this.actionPermissionService.checkSparkPermission(canView, this.selectedEmployee),
      false, //this.actionPermissionService.checkSparkPermission(canAdd, this.selectedEmployee),
      false, //this.actionPermissionService.checkSparkPermission(canEdit, this.selectedEmployee),
      false, //this.actionPermissionService.checkSparkPermission(canDelete, this.selectedEmployee),
      false, //this.selectedEmployee.sendSpark
    );
    this.globalResponseHandlerService.setSparkAnEmployee(sparkAnEmployee);
  }

  private dateTimeConvert(notificationList: any[]): any[] {
    !!notificationList && notificationList.forEach((item) => {
      item.createdDtStamp = (this.dateTimeConverterService.getLocalDateTimeFromUtcDateTime(new Date(item.createdDtStamp))).toString();
    });
    return notificationList;
  }
}
