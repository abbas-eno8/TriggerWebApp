/**
@author : Mihir Patel
@class : AppComponent
@description :AppComponent is the main component of a Trigger app..
**/
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { pairwise, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
// ...............................................//
import { GlobalEventsManager } from './core/navbar/globalEventsManager';
import { LoaderService } from './core/loader/loader.service';
import { AuthService } from './core/auth/auth.service';
import { GlobalResponseHandlerService } from './core/global-response-handler/global-response-handler';
import { Encryption, Session } from './core/magic-string/common-validation-model';
import { RouteUrl } from './core/magic-string/common.model';
import { ThemeService } from './core/theme/theme.service';
import { environment } from '../environments/environment';

export let browserRefresh = false;

@Component({
  selector: 'trigger-root',
  templateUrl: './app.component.html',
  host: {
    '(keypress)': '_onKeypress($event)',
    '(mousemove)': '_onMouseMove($event)',
  }
})

export class AppComponent implements OnInit {
  public showNavBar: boolean;
  public showLoader: boolean;
  public toasterConfig: ToasterConfig;
  public currentUrl: any;
  public isSelectedRoute: string;
  public selectedRoute: string;
  public isHeaderFooter: boolean;
  idleTime: number = 0;
  public state: any;
  // For trigger loader :
  template: string = '<img class="custom-spinner" src="/assets/images/dashboard/triggerLoader.gif" />';
  subscription: Subscription;
  
  constructor(
    public router: Router,
    private loader: LoaderService,
    private changeDetector: ChangeDetectorRef,
    private globalEventsManager: GlobalEventsManager,
    private authService: AuthService,
    private responseHadlerService: GlobalResponseHandlerService,
    private toasterService: ToasterService,
    private themeService: ThemeService
  ) {
    /**
    * SUBSCRIBE TO MENUBAR SERVICE FOR MENU-STATE CHANGE
    */
    this.setToastPosition();
    this.setLoader();
    this.setNavbar();
    this.checkCurrentUrl()
    this.checkPreviousRoute();
  }
  ngOnInit() {
    this.setIdleTIme();
  }

  /**
  * Author : Sonal Patil
  * Modified-Date :  20-12-2018
  * Description : For idle time 
  */
  setIdleTIme() {
    setInterval(() => {
      this.idleTime = this.idleTime + 1;
      if (this.idleTime > 60) {
        this.toasterService.pop('error', 'Error', 'Seems like your session timed out, Please relogin');
        this.globalEventsManager.showNavBar(false);
        this.authService.startSignoutMainWindowAutoLogout();
      }
    }, 60000)  // 1minute
  }

  /**
  * Author : Sonal Patil
  * Modified-Date :  20-12-2018
  * Description : For key press and mouse move for idle time checked
  */
  _onKeypress($event) {
    this.idleTime = 0;
  }
  _onMouseMove($event) {
    this.idleTime = 0;
  }

  /**
 * Author : Mihir Patel
 * Modified-Date :  21-12-2018
 * Description : This is for set  toast position:
 */
  setToastPosition() {
    this.toasterConfig = new ToasterConfig({
      positionClass: 'toast-top-right',
      tapToDismiss: true,
      // showCloseButton: true,      
      limit: 1
    });
  }

  /**
  * Author : Mihir Patel
  * Modified-Date :  21-12-2018
  * Description : For check loader show/hide & initialize variables
  */
  setLoader() {
    this.showLoader = false;
    this.isHeaderFooter = false;
    this.loader.isLoaderShown.subscribe(
      (isShown) => {
        this.showLoader = isShown;
        this.changeDetector.detectChanges(); // If not added causes change in value error.
      });
  }

  /**
  * Author : Mihir Patel
  * Modified-Date :  21-12-2018
  * Description : For check ShowNavbar mode using globalEventsManager service:
  */
  setNavbar() {
    this.globalEventsManager.showNavBarEmitter.subscribe((mode) => {
      if (!!this.responseHadlerService.decriptData(Encryption.TriggerUserMessage, Encryption.TriggerUserKey)) {
        this.showNavBar = true;
      } else {
        this.showNavBar = mode;
      }
    });
  }

  /**
  * Author : Mihir Patel
  * Modified-Date :  21-12-2018
  * Description : For check previous route :     
  */
  checkPreviousRoute() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      pairwise()).subscribe((routeEvent: any) => {
        let lastRouteUrl = routeEvent[0].url;
        let lastRouteUrlSplit = lastRouteUrl.split('/');
        let finalLatRouteUrl = lastRouteUrlSplit[1];
        if (finalLatRouteUrl === RouteUrl.Employee) {
          sessionStorage.setItem(Session.TeamMemberQueryString, '');
        }
      });
  }

  /**
  * Author : Mihir Patel
  * Modified-Date :  21-12-2018
  * Description : For check current url as parent component :
  */
  checkCurrentUrl() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAndApplyTheme();
        let url = event.url;
        let selectedUrl = url.split('/');
        this.selectedRoute = selectedUrl[1];
        if (this.selectedRoute === RouteUrl.Login || this.selectedRoute === RouteUrl.ResetPassword) {
          this.isHeaderFooter = true;
          this.showNavBar = false;
        }
        if (this.selectedRoute === RouteUrl.Home) {
          this.isHeaderFooter = false;
        }
        let authURL = this.selectedRoute.split('#id_token');
        if (authURL[0] === RouteUrl.AuthCallBack) {
          this.isHeaderFooter = true;
        }
        if (this.selectedRoute === RouteUrl.Dashboard) {
          this.isSelectedRoute = RouteUrl.Dashboard;
        } else if (this.selectedRoute === RouteUrl.RecognitionWall) {
          this.isSelectedRoute = RouteUrl.RecognitionWall;
        } else if (this.selectedRoute.includes(RouteUrl.TriggerEmployee) || this.selectedRoute === RouteUrl.TriggerEmployee || this.selectedRoute === RouteUrl.TriggerEmployee) {
          this.isSelectedRoute = RouteUrl.TriggerEmployee;
        } else if (this.selectedRoute === RouteUrl.Employee || this.selectedRoute === RouteUrl.AddEmployee
          || this.selectedRoute === RouteUrl.InvidualEmployee
          || this.selectedRoute === RouteUrl.ExcelUpload
          || this.selectedRoute === RouteUrl.UserProfile
          || this.selectedRoute === RouteUrl.SparkAnEmployee) {
          this.isSelectedRoute = RouteUrl.Employee;
        } else if (this.selectedRoute === RouteUrl.Client || this.selectedRoute === RouteUrl.AddClient) {
          this.isSelectedRoute = RouteUrl.Client;
        } else if (this.selectedRoute === RouteUrl.Admin || this.selectedRoute === RouteUrl.AddAdmin) {
          this.isSelectedRoute = RouteUrl.Admin;
        } else if (this.selectedRoute === RouteUrl.AddDepartment) {
          this.isSelectedRoute = RouteUrl.AddDepartment;
        } else if (this.selectedRoute === RouteUrl.Department) {
          this.isSelectedRoute = RouteUrl.Department;
        } else if (this.selectedRoute === RouteUrl.ChangePassword) {
          this.isSelectedRoute = RouteUrl.ChangePassword;
        } else if (this.selectedRoute === RouteUrl.SmsConfirmation) {
          this.isSelectedRoute = RouteUrl.SmsConfirmation;
        } else if (this.selectedRoute === RouteUrl.ContactUs) {
          this.isSelectedRoute = RouteUrl.ContactUs;
        } else if (this.selectedRoute === RouteUrl.Dimension) {
          this.isSelectedRoute = RouteUrl.Dimension;
        } else if (this.selectedRoute === RouteUrl.Permission) {
          this.isSelectedRoute = RouteUrl.Permission;
        } else if (this.selectedRoute === RouteUrl.SparkNotification) {
          this.isSelectedRoute = RouteUrl.SparkNotification;
        } else if (this.selectedRoute === RouteUrl.Teams) {
          this.isSelectedRoute = RouteUrl.Teams;
        } else if (this.selectedRoute === RouteUrl.Survey) {
          this.isSelectedRoute = RouteUrl.Survey;
        } else if (this.selectedRoute === RouteUrl.ActiveSurvey) {
          this.isSelectedRoute = RouteUrl.ActiveSurvey;
        } else if (this.selectedRoute === RouteUrl.SurveyDetails) {
          this.isSelectedRoute = RouteUrl.SurveyDetails;
        } else if (this.selectedRoute === RouteUrl.UpdateWorkLocation) {
          this.isSelectedRoute = RouteUrl.UpdateWorkLocation;
        } else if (this.selectedRoute === RouteUrl.Spark) {
          this.isSelectedRoute = RouteUrl.Spark;
        } else if (this.selectedRoute === RouteUrl.EvaluationsInDrafts) {
          this.isSelectedRoute = RouteUrl.EvaluationsInDrafts;
        }
      }
    });
  }

  checkAndApplyTheme() {
    let status = this.responseHadlerService.getUserData().webThemeMode === 3 ? true : false;
    if (status) {
      this.themeService.setTheme('dark');
      this.globalEventsManager.updateThemeType(true);
    } else {
      this.themeService.setTheme('light');
      this.globalEventsManager.updateThemeType(false);
    }
  }
}
