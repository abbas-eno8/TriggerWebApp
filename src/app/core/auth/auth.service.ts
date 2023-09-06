/**
@author : Mihir Patel
@class : AuthService
@description :AuthService is created for perform user operations.
**/
import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { map } from 'rxjs/operators';
import { ThemeService } from '../theme/theme.service';
import * as CryptoJS from 'crypto-js';
// --------------------------------------- //
import { AuthenticationService } from '../authentication.service';
import { GlobalEventsManager } from '../navbar/globalEventsManager';
import { LoaderService } from '../loader/loader.service';
import { Route, Error_Type, Error_Title, ApiResponseStatus, Role } from '../magic-string/common.model';
import { Encryption } from '../magic-string/common-validation-model';
//import * as _ from 'underscore';
import { Permission } from '../magic-string/permission.model';
import { UserModel } from '../model/user';
import { environment } from '../../../environments/environment';

declare let pendo: any;
@Injectable()
export class AuthService {

  public actionPermission: Permission[];
  public user: UserModel;

  private settings: UserManagerSettings = {
    client_id: environment.authorityClientId,
    authority: environment.authorityUrl,
    scope: `openid profile ${environment.authorityClientApi}`,
    redirect_uri: `${environment.angularUrl}auth-callback`,
    // redirect_uri: `${environment.angularUrl}signin-callback.html`,
    post_logout_redirect_uri: `${environment.angularUrl}`,
    silent_redirect_uri: `${environment.angularUrl}silent-renew.html`,
    // includeIdTokenInSilentRenew:false,
    response_type: 'id_token token',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 4,
    // silentRequestTimeout:10000,
    filterProtocolClaims: true,
    loadUserInfo: true,
    // userStore: new WebStorageStateStore({ store: window.localStorage })
  };

  manager: UserManager = new UserManager(this.settings);
  userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User;
  currentUserData = new Subject<object>();
  loggedIn = false;
  public companyLogo: string;
  public callingCode: any;

  constructor(
    private authenticationService: AuthenticationService,
    private globalEventsManager: GlobalEventsManager,
    private toaster: ToasterService,
    private router: Router,
    private loaderService: LoaderService,
    private themeService: ThemeService,
    private ngZone: NgZone
  ) {
    console.log(this.settings);
    this.manager.getUser().then(user => {
      if (user) {
        this.loggedIn = true;
        this.currentUser = user;
        this.currentUserData.next(this.currentUser.profile);
        this.userLoadededEvent.emit(user);
      }
      else {
        this.loggedIn = false;
      }
    }).catch((err) => {
      this.loggedIn = false;
    });
    this.manager.events.addUserLoaded((user) => {
      this.currentUser = user;
      this.loggedIn = true;
      this.currentUserData.next(this.currentUser.profile);
    });
    this.manager.events.addUserUnloaded(() => {
      this.loggedIn = false;
    });
  }
  /**
  * CHECK USER IS LOGGED IN OR NOT
  */
  isLoggedInObs(): Observable<boolean> {
    return from(this.manager.getUser()).pipe(map<User, boolean>((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    }));
  }
  /**
   * START CALLING AUTH CALLBACK TO CHECK AUTHENTICATION
   * USED IN AUTH GUARD TO PROTECT ROUTES
   */
  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }
  /**
   * SET USER TOKEN IF SUCCESSFULLY AUTHENTICATED
   * USED IN AUTH CALLBACK COMPONENT.
   */
  completeAuthentication(): Promise<void> {
    // this._spinner.show();
    return this.manager.signinRedirectCallback()
      .then(user => {
        this.currentUser = user;
        this.loggedIn = true;
        this.userLogin(this.currentUser);
      }).catch(err => {
        setTimeout(() => {
          this.router.navigate(['/']);
          console.log('completeAuthentication catch path', err);
        }, 3000)
      });
  }
  /**
   * LOGOUT CURRENT USER AND REDIRECT TO LOGIN PAGE
   */
  startSignoutMainWindow() {
    let authorityUrl = environment.authorityUrl;
    var args = { post_logout_redirect_uri: authorityUrl };
    this.manager.signoutRedirect(args).then(function (resp) {
      sessionStorage.clear();
      localStorage.clear();
    }).catch(function (err) {
      console.log(err);
    });
  }

  // Redirect to Login page after Logout
  startSignoutMainWindowGoToHomeScreen() {
    // let marketingUrl = this.environmentConfigService.getMarketingUrl() + 'home';
    let marketingUrl = environment.marketingUrl;
    if (marketingUrl.includes('https://www.truvelop.com')) {
      marketingUrl = 'https://www.truvelop.com'
    } else {
      marketingUrl = marketingUrl + 'home';
    }
    var args = { post_logout_redirect_uri: marketingUrl };
    this.manager.signoutRedirect(args).then(function (resp) {
      sessionStorage.clear();
      localStorage.clear();
    }).catch(function (err) {
      console.log(err);
    });
  }

  /**
  * AUTO LOGOUT CURRENT USER AND REDIRECT TO session-timedout PAGE
  */
  startSignoutMainWindowAutoLogout() {
    let marketingUrl = environment.marketingUrl + 'session-timeout';
    var args = { post_logout_redirect_uri: marketingUrl };
    this.manager.signoutRedirect(args).then(function (resp) {
      sessionStorage.clear();
      localStorage.clear();
    }).catch(function (err) {
      console.log(err);
    });
  }

  redirectToMainWindow() {
    this.manager.signoutRedirect().then(function (resp) {
    }).catch(function (err) {
      console.log(err);
    });
  }
  endSignoutMainWindow() {
    this.manager.signoutRedirectCallback().then(function (resp) {
    }).catch(function (err) {
      console.log(err);
    });
  }
  /**
   * GET AUTHORIZATION HEADER STRING
   * CONTAINS TOKEN_TYPE, ACCESS_TOKEN
   */
  getAuthorizationHeaderValue(): string {
    return `${this.currentUser.token_type} ${this.currentUser.access_token}`;
  }
  /**
   * GET USER TOKEN
   */
  getUser() {
    this.manager.getUser().then((user) => {
      this.currentUser = user;
      this.loggedIn = true;
      this.currentUserData.next(this.currentUser.profile);
      this.userLoadededEvent.emit(user);
    }).catch(function (err) {
      this.loggedIn = false;
      console.log(err);
    });
  }
  /**
   * GET USER PROFILE(CLAIMS)
   */
  getUserData() {
    return this.currentUserData.asObservable();
  }

  /**
     * Author : Mihir Patel
     * Modified-Date :  19-12-2018
     * Description : create method of user login which is calling after completeAuthentication.
  */
  userLogin(authorityUser) {
    this.loaderService.emitIsLoaderShown(true);
    this.authenticationService.login(authorityUser).subscribe(
      (response) => {
        if (response.status === ApiResponseStatus.Success) {
          /** After verifying that a user is authorized, we put the pendo.initialize inside whatever */
          /** Initialize the company name and users name for Pendo Analytics */
          this.ngZone.runOutsideAngular(() => {
            pendo.initialize({
              visitor: {
                id: response.data[0].employee.firstName + ' ' + response.data[0].employee.lastName
              },
              account: {
                id: response.data[0].companyname
              }
            });
          });

          if (response.data[0].roleId > 5) {
            response.data[0].roleId = Role.Manager;
          }
          if (response.data[0]) { this.bindUser(response.data[0]) }
          this.getPermisssion(response.data[0]);
          this.companyLogo = response.data[0].employee.companyLogoPath;
          this.globalEventsManager.showNavBar(true);
          var encrypted = CryptoJS.AES.encrypt(JSON.stringify(response), Encryption.TriggerUserMessage);
          sessionStorage.setItem(Encryption.TriggerUserKey, encrypted.toString());
          if (response.data[0].roleId === Role.TriggerAdmin) {
            this.router.navigate([Route.Client]);
          } else {
            this.router.navigate([Route.Dashboard]);
          }
        } else if (response.status === ApiResponseStatus.AccessDenied) {
          this.globalEventsManager.showNavBar(false);
          this.startSignoutMainWindow();
          this.toaster.pop(Error_Type, Error_Title, response.message);
        }
        else {
          this.loaderService.emitIsLoaderShown(false);
          this.toaster.pop(Error_Type, Error_Title, response.message);
        }
      },
      (error) => {
        console.log('error : ', error);
      }
    );
  }

  getPermisssion(data) {
    this.actionPermission = data.permission.map(Permission => ({
      actionId: Permission.actionId,
      actions: Permission.actions,
      actionPermissions: Permission.actionPermissions
    }));
    var encryptedPermission = CryptoJS.AES.encrypt(JSON.stringify(this.actionPermission), Encryption.ActionPermissionMessage);
    sessionStorage.setItem(Encryption.ActionPermissionKey, encryptedPermission.toString());
  }

  bindUser(d: any) {
    this.user = {
      userId: d.userId,
      clientId: d.companyid,
      client: d.companyname,
      roleId: d.roleId,
      role: d.role,
      empId: d.empId,
      employeeId: d.employeeId,
      managerId: d.employee.managerId,
      departmentId: d.employee.departmentId,
      firstName: d.employee.firstName,
      lastName: d.employee.lastName,
      phoneNumber: d.employee.phoneNumber,
      email: d.employee.email,
      companyLogoPath: d.employee.companyLogoPath,
      webThemeMode: d.webThemeMode,
      userProfile: d.employee.empImgPath,
      profileName: d.employee.firstName.charAt(0) + d.employee.lastName.charAt(0)
    }
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(this.user), Encryption.LoginUserMessage);
    sessionStorage.setItem(Encryption.LoginUserKey, encrypted.toString());
    this.checkAndApplyTheme(this.user)
  }

  checkAndApplyTheme(user) {
    let themeStatus = user.webThemeMode === 3 ? true : false;
    if (themeStatus) {
      this.themeService.setTheme('dark');
      this.globalEventsManager.updateThemeType(true);
    } else {
      this.themeService.setTheme('light');
      this.globalEventsManager.updateThemeType(false);
    }
  }

  /**
     * Author : Mihir Patel
     * Modified-Date :  19-12-2018
     * Description : create method of redirectToLogin , which is used to redirect to login page.
  */
  redirectToLogin() {
    this.globalEventsManager.showNavBar(false);
    this.startSignoutMainWindowGoToHomeScreen();
  }
}
