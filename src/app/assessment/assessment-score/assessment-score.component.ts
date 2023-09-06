/**
@author : Mihir Patel
@class : AssessmentScoreComponent
@description :AssessmentScoreComponent is created for assessment score page, which is show after assessment.
**/
import { Component, OnInit, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
//  ................................................ //
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { Encryption } from '../../core/magic-string/common-validation-model';
import { Route, NextRoute, ManagerDashboard } from '../../core/magic-string/common.model';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { TooltipHeaderScore } from '../../shared/tooltip/tooltip-model';
import { TriggerScore } from '../assessment-model';
import { OverlayConfig, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FeedbackConfirmationComponent } from '../feedback-confirmation/feedback-confirmation.component';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { Observable } from 'rxjs';
import { LoaderService } from '../../core/loader/loader.service';
import { DashboardStatus } from '../../dashboard/dashboard-model';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-assessment-score',
  templateUrl: './assessment-score.component.html',
  styleUrls: ['./assessment-score.component.scss']
})
export class AssessmentScoreComponent implements OnInit {
  /** TriggerScore modal stored value of trigger-score which is saved in TriggerScore model  */
  public trggerScore: TriggerScore;
  // Page title for tooltip title
  public pageTitle: string;
  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;
  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;
  // nextRoute is define for store value of next clicked route
  public nextRoute: string = '';
  //  isSubmit defined for manage boolean value of form submit or not.
  public isSubmit: boolean = false;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  
  constructor(
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private router: Router,
    public overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory,
    private loaderService: LoaderService,
    private globalEventsManager: GlobalEventsManager
    ) {
    this.pageTitle = TooltipHeaderScore;
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
   * Modified-Date : 18-12-2018
   * Description : trggerScore varibale is store data from session storage value of trigger-score which is stored after trigger-an-employee in trigger-employee page.
   **/
  ngOnInit() {
    this.trggerScore = this.globalResponseHandlerService.getCurrentTriggerScore();
    this.loaderService.emitIsLoaderShown(false);
  }

  ngOnDestroy(): void {
    this.themeEmitter.unsubscribe();
  }
  /**
  * Author : Mihir Patel
  * Modified-Date : 16-10-2019
  * Description : canDeactivate called when route is changed to next route and component destroy
  **/
  canDeactivate(): Observable<boolean> | boolean {
    if (this.isSubmit) {
      return true
    } else {
      if (this.nextRoute === '') {
        return this.opnFeedbackModalPopup();
      }
    }
  }

  /**
   * Author : Sonal Patil
   * Modified-Date : 03-07-2019
   * Description : This is for goes to assessment page:
   **/
  goToAssessmentPage() {
    this.nextRoute = Route.TriggerEmployee;
    this.goToSelectedRoutes();
  }

  /**
   * Author : Sonal Patil
   * Modified-Date :  18-12-2018
   * Description : This is for goes to main dashboard page:
   **/
  goToMainDashboard() {
    this.nextRoute = Route.Dashboard;
    this.goToSelectedRoutes();
  }

  /**
   * Author : Sonal Patil
   * Modified-Date :  18-12-2018
   * Description : TO-DO when employee dashboard created then paste url for navigation:
   **/
  goToEmployeeDashboard() {
    this.nextRoute = Route.IndividualEmployee;
    this.goToSelectedRoutes();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 18-12-2018
   * Description : Redirect to page on route which is passed through parameters.
   **/
  redirectToPage(empId: number, route: string) {
    this.globalResponseHandlerService.encriptData('', Encryption.TriggerScoreMessage, Encryption.TriggerScoreKey);
    this.urlEncryptionDecryptionService.urlEncryption(empId.toString(), route);
  }

  goToSelectedRoutes() {
    this.opnFeedbackModalPopup();
  }

  /**
    * Author : Mihir Patel
    * Created-Date : 14-10-2019
    * Description : Create method for open modal popup for Evaluator Feedback to Trigger Score presentation page.
    */

  public opnFeedbackModalPopup(): boolean {
    this.loaderService.emitIsLoaderShown(false);
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: '',
      panelClass: ['mt-5', modalBackground],
      // panelClass:'mt-5',
      positionStrategy: this.overlay.position().global().top().centerHorizontally(),
    });

    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(FeedbackConfirmationComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.componentOverlayRef.instance.trggerScoreDetail = this.trggerScore;
    this.componentOverlayRef.instance.closeSelectScoreModal.subscribe((status) => {
      this.componentOverlayRef.instance.positiveButton.nativeElement.focus();
    });
    this.componentOverlayRef.instance.submit.subscribe((status) => {
      this.isSubmit = true;
      this.overlayRef.dispose();
      if (this.nextRoute === Route.TriggerEmployee) {
        this.redirectToPage(0, Route.TriggerEmployee)
      } else if (this.nextRoute === Route.Dashboard) {
        let dashboardButtonsStatus = {
          isManagerDashboard: true,
          isTeamDashoard: false,
          isMyDashboard: false,
          isMyWall: false
        }
        sessionStorage.setItem(DashboardStatus, JSON.stringify(dashboardButtonsStatus))
        this.globalEventsManager.changeDashboard(ManagerDashboard);
        this.router.navigate([Route.Dashboard]);
      } else if (this.nextRoute === Route.IndividualEmployee) {
        this.redirectToPage(this.trggerScore.empId, Route.IndividualEmployee)
      } else {
        let nextRoute = sessionStorage.getItem(NextRoute);
        if (nextRoute === Route.TriggerEmployee) {
          this.redirectToPage(0, nextRoute)
        } else if (nextRoute === Route.AddClient) {
          this.urlEncryptionDecryptionService.urlEncryption(this.globalResponseHandlerService.getUserData().clientId, nextRoute);
        } else {
          this.router.navigate([nextRoute]);
        }
      }
      return true
    });
    return false
  }
}
