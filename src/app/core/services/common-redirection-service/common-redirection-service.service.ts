/**
@author :Anjali Tandel
@class : CommonRedirectionServiceService
@description : CommonRedirectionServiceService is created for redirection on spark or trigger based on getting action-request response.
**/
import { Injectable, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActionPermissionService, canAdd, canView, canEdit, canDelete } from '../action-permission/action-permission.service';
import { GlobalResponseHandlerService } from '../../global-response-handler/global-response-handler';
import { LoaderService } from '../../loader/loader.service';
import { NotificationService } from '../../navbar/notification/notification.service/notification.service';
import { UrlEncryptionDecryptionService } from '../../url-encryption-decryption/url-encryption-decryption.service';
import { ActionType, Actions, Route, ApiResponseStatus, NotificationType, SystemType, PlayStoreLink, AppleStoreLink } from '../../magic-string/common.model';
import { Encryption, ErrorMessage } from '../../magic-string/common-validation-model';
import { CurrentSparkAnEmployee } from '../../../employees/employee-model';
import { RefrshComponent } from '../../../dashboard/dashboard-model';
import { OpenOverlayService } from '../../../shared/services/open-cdk-overlay/open-overlay.service';
import { SurveyFormComponent } from '../../../shared/components/survey-form/survey-form.component';
import { OverlayRef } from '@angular/cdk/overlay';
import { UserModel } from '../../model/user';
import { AssessmentAdapter } from '../../../shared/adapter/assessment-adapter/assessment-adapter';
import { AddSurveyForm, OverlayRefModel } from '../../../shared/modals/survey-form-model';
import { CommonService } from '../common/common.service';

@Injectable()
export class CommonRedirectionServiceService {
  public user: UserModel;
  constructor(
    private assessmentAdapter: AssessmentAdapter,
    private commonService: CommonService,
    private actionPermissionService: ActionPermissionService,
    private openOverlayService: OpenOverlayService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private router: Router) {
    this.user = this.globalResponseHandlerService.getUser();
  }

  public getActionRequestBasedOnDeepLink(notification): void {
    this.notificationService.getActionRequest(notification).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          response.data.empStatus = true;
          if ((parseInt(notification.actionId) === ActionType.TriggerAnEmployee) &&
            this.actionPermissionService.isAddTriggerAnEmployee(Actions.TriggerAnEmployee, canAdd, response.data)) {
            sessionStorage.setItem(Encryption.RequestId, notification.requestId);
            this.checkRouteAndRedirect(Route.TriggerEmployee, notification.empId);
          } else if (parseInt(notification.actionId) === ActionType.Spark &&
            (this.actionPermissionService.checkSparkPermission(canView, response.data) || this.actionPermissionService.checkSparkPermission(canAdd, response.data))) {
            sessionStorage.setItem(Encryption.RequestId, notification.requestId);
            this.globalResponseHandlerService.setSparkDetailBySparkList(response.data);
            this.goToSparkAnEmployee(response.data);
          } else {
            sessionStorage.setItem(Encryption.DeepLinkUnAuthorized, ErrorMessage.NoPermissionToAccess);
            this.router.navigate([Route.UnauthorizeAccess]);
            this.loaderService.emitIsLoaderShown(false);
          }
        } else {
          if (response.status === ApiResponseStatus.AlreadyReported) {
            sessionStorage.setItem(Encryption.DeepLinkUnAuthorized, ErrorMessage.TriggerEmployeeUnauthorizedAccess);
            this.router.navigate([Route.UnauthorizeAccess]);
          }
        }
      });
  }

  public getActionRequestOnNotification(notification): void {
    this.notificationService.getActionRequest(notification).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          response.data.empStatus = true;
          if (notification.type === NotificationType.TriggerAnEmployee && this.actionPermissionService.isAddTriggerAnEmployee(Actions.TriggerAnEmployee, canAdd, response.data)) {
            sessionStorage.setItem(Encryption.RequestId, notification.requestId);
            this.checkRouteAndRedirect(Route.TriggerEmployee, notification.empId);
          } else if (notification.type === NotificationType.Spark && (this.actionPermissionService.checkSparkPermission(canView, response.data) || this.actionPermissionService.checkSparkPermission(canAdd, response.data))) {
            sessionStorage.setItem(Encryption.RequestId, notification.requestId);
            this.goToSparkAnEmployee(response.data);
          } else {
            this.globalResponseHandlerService.disaplyErrorMessage(ErrorMessage.NoPermissionToAccess);
            this.loaderService.emitIsLoaderShown(false);
          }
        }
      });
  }

  private goToSparkAnEmployee(empData): void {
    const sparkAnEmployee: CurrentSparkAnEmployee = new CurrentSparkAnEmployee(
      this.globalResponseHandlerService.getUser().userId,
      empData.empId,
      empData.firstName,
      empData.lastName,
      this.actionPermissionService.checkSparkPermission(canView, empData),
      this.actionPermissionService.checkSparkPermission(canAdd, empData),
      this.actionPermissionService.checkSparkPermission(canEdit, empData),
      this.actionPermissionService.checkSparkPermission(canDelete, empData),
      empData.sendSpark
    );
    this.globalResponseHandlerService.setSparkDetailBySparkList(sparkAnEmployee);
    this.globalResponseHandlerService.setSparkAnEmployee(sparkAnEmployee);
    this.checkRouteAndRedirect(Route.SparkAnEmployee, empData.empId);
  }

  private checkRouteAndRedirect(route: string, empId: number): void {
    let currentRoute = this.router.url;
    if (route !== currentRoute.split('?')[0]) {
      this.urlEncryptionDecryptionService.urlEncryption(empId.toString(), route);
    } else {
      this.router.navigateByUrl(RefrshComponent, { skipLocationChange: true }).then(() =>
        this.urlEncryptionDecryptionService.urlEncryption(empId.toString(), route));
    }
  }
  // https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
  getSystem(): number {
    var userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) {
      sessionStorage.setItem(Encryption.MobileLink, JSON.stringify(PlayStoreLink));
      return SystemType.Android;
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      sessionStorage.setItem(Encryption.MobileLink, JSON.stringify(AppleStoreLink));
      return SystemType.IOS;
    }
    return SystemType.Browser;
  }

  public getGlobalAssessmentForm(surveyId: number): void {
    this.notificationService.getGlobalAssessmentForm(surveyId, this.user.empId).subscribe(
      (surveyFormResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(surveyFormResponse, false, false)) {
          this.openSurveyFromPopup(surveyFormResponse);
        }
      });
  }

  private openSurveyFromPopup(surveyFormResponse): void {
    let surveyForm = this.assessmentAdapter.toResponse(surveyFormResponse);
    let object: OverlayRefModel = this.openOverlayService.openSurveyForm(SurveyFormComponent);
    let overlayRef: OverlayRef;
    let componentOverlayRef: ComponentRef<any>;
    overlayRef = object.overLay;
    componentOverlayRef = object.component;
    componentOverlayRef.instance.surveyForm = surveyForm.data;
    componentOverlayRef.instance.onSubmitSurvey.subscribe(addSurvey => {
      this.addSurvey(addSurvey, overlayRef);
    });
    componentOverlayRef.instance.cancel.subscribe(status => {
      overlayRef.dispose();
    });
  }
  
  public getEmployeeSurveyForm(): void {
    this.notificationService.getEmployeeSurveyForm(this.user.empId).subscribe(
      (surveyFormResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(surveyFormResponse, false, false)) {
          this.openSurveyFromPopup(surveyFormResponse);
        }
      });
  }



  private addSurvey(addSurey: AddSurveyForm, overlayRef): void {
    this.commonService.submitSurveyForm(addSurey).subscribe(
      (surveyResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(surveyResponse, true, true)) {
          overlayRef.dispose();
        }
      });
  }

}
