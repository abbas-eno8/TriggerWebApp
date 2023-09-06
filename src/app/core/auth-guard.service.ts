/**
@author : Mihir Patel
@class : AuthGuard
@description :AuthGuard is created for protect routes by role.
**/
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, CanActivateChild } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
// ----------------------------------------------------------- //
import { AuthService } from '../core/auth/auth.service';
import { GlobalResponseHandlerService } from './global-response-handler/global-response-handler';
import { ErrorMessage, Encryption } from './magic-string/common-validation-model';
import { Route, RouteUrl, True, Error_Type, Error_Title, False, Role, SystemType, TriggerScoreUrl } from './magic-string/common.model';
import { UrlEncryptionDecryptionService } from './url-encryption-decryption/url-encryption-decryption.service';
import { GlobalEventsManager } from './navbar/globalEventsManager';
import { LoaderService } from './loader/loader.service';
import { CommonRedirectionServiceService } from './services/common-redirection-service/common-redirection-service.service';

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild {
    public userData: any;
    public userRole: string;
    public companyId: any;
    public userRoleId: number;

    constructor(
        private router: Router,
        private authService: AuthService,
        private toasterService: ToasterService,
        private globalResponseHandlerService: GlobalResponseHandlerService,
        private loaderService: LoaderService,
        private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
        private globalEventsManager: GlobalEventsManager,
        private commonRedirectionServiceService: CommonRedirectionServiceService
    ) {
    }

    /**
     * Author : Mihir Patel
     * Modified-Date :  19-12-2018
     * Description : canActivate guad created for manage route as per role of login user.
    */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        // Added condition because route is client , need to display this message when user is trying to access client page (Expect role i Triggger-Admin).
        this.userData = this.globalResponseHandlerService.getUserData();
        this.userRole = this.userData.userRole;
        let encryptedString = JSON.parse(sessionStorage.getItem(Encryption.DeepLink));
        let data;
        if (encryptedString && encryptedString != 'null') {
            data = JSON.parse(atob(encryptedString['data']));
        }
        if (encryptedString && encryptedString != 'null' && data && this.userData.employee && parseInt(data.managerId) === this.userData.employee.empId) {
            this.checkDeepLinking(data);
        } else {
            if (encryptedString && this.userData.employee && parseInt(data.managerId) !== this.userData.employee.empId) {
                if (parseInt(data.actionId) === 1) {
                    sessionStorage.setItem(Encryption.DeepLinkUnAuthorized, ErrorMessage.SparkUnauthorizedAccess);
                } else {
                    sessionStorage.setItem(Encryption.DeepLinkUnAuthorized, ErrorMessage.TriggerEmployeeUnauthorizedAccess);
                }
                this.router.navigate([Route.UnauthorizeAccess]);
                // this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.UnauthorizedAccessError);
            }
            this.redirectToUserProfile(route, state);
            if (this.userData.employee && state.url.includes(RouteUrl.Client) && route.queryParams['data']) {
                let encryptedString = '';
                if (route.queryParams['data']) {
                    encryptedString = JSON.parse(atob(route.queryParams['data']));
                }
                // if (parseInt(encryptedString['managerId']) === this.userData.employee.empId) {
                //     sessionStorage.setItem(Encryption.DeepLinkUnAuthorized, '1');
                // }
                if (encryptedString && parseInt(encryptedString['managerId']) === this.userData.employee.empId) {
                    this.loaderService.emitIsLoaderShown(true);
                    this.checkDeepLinking(encryptedString);
                } else {
                    //this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.UnauthorizedAccessError);
                    if (parseInt(encryptedString['actionId']) === 1) {
                        sessionStorage.setItem(Encryption.DeepLinkUnAuthorized, ErrorMessage.SparkUnauthorizedAccess);
                    } else {
                        sessionStorage.setItem(Encryption.DeepLinkUnAuthorized, ErrorMessage.TriggerEmployeeUnauthorizedAccess);
                    }
                    this.router.navigate([Route.UnauthorizeAccess])
                    return true;
                }
            }
            else {
                if (route.queryParams['data']) {
                    sessionStorage.setItem(Encryption.DeepLink, JSON.stringify(route.queryParams));
                    let systemType: number = this.commonRedirectionServiceService.getSystem();
                    if (systemType === SystemType.Browser) {
                        return this.redirectBasedOnRole(route, state);
                    } else {
                        this.router.navigate([Route.PlatformCheck]);
                    }
                    //return this.redirectBasedOnRole(route, state);
                } else {
                    return this.redirectBasedOnRole(route, state);
                }
            }

        }
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date :  26-02-2019
     * Description : canActivateChild guad created for managing url encryption of child route.
    */
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        let decryptedId = this.urlEncryptionDecryptionService.urlDecryption(route.queryParams['id'].toString());

        if (decryptedId == '0' || decryptedId > '0') {
            return this.redirectBasedOnRole(route, state);
        } else {
            if (route.routeConfig.path === TriggerScoreUrl) {
                this.router.navigate([Route.Dashboard]);
                return
            }
            this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.UnauthorizedAccessError);
            if (this.userRoleId === Role.TriggerAdmin) {
                this.router.navigate([Route.Client])
            } else {
                this.router.navigate([Route.Dashboard])
            }
        }
    }

    private checkDeepLinking(queryParams): void {
        sessionStorage.setItem(Encryption.DeepLink, null);
        this.commonRedirectionServiceService.getActionRequestBasedOnDeepLink(queryParams);
    }

    redirectToUserProfile(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.globalEventsManager.showSmsVerificationPageEmitter.subscribe((isDisplay) => {
            if (!isDisplay) {
                if (state.url.includes(RouteUrl.SmsConfirmation)) {
                    this.router.navigate([Route.UserProfile])
                    this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.UnauthorizedAccessError);
                }
            }

        })
    }

    redirectBasedOnRole(route, state) {
        let loggedin = this.authService.isLoggedInObs();
        loggedin.subscribe(res => {
            if (!res) {
                this.authService.startAuthentication();
            } else {
                let user = this.globalResponseHandlerService.getUserData();
                this.userData = JSON.parse(this.globalResponseHandlerService.decriptData(Encryption.TriggerUserMessage, Encryption.TriggerUserKey));
                // this.userRole = this.userData.data[0].role;
                this.userRoleId = this.userData.data[0].roleId;
                this.companyId = this.userData.data[0].companyid;
                if (route.data && route.data['role'].length > 0 && route.data['role'].includes(this.userRoleId)) {
                    const url = state.url;
                    let selectedUrl = url.split('/');
                    if (this.userRoleId === Role.TriggerAdmin) {
                        //const shoWD = this.globalResponseHandlerService.decriptData(Encryption.TriggerShowPageMessage, Encryption.TriggerShowPageKey);
                        if (!user.isRedirectToDashboard) {
                            if (selectedUrl[1] == RouteUrl.Dashboard || selectedUrl[1] == RouteUrl.Employee || selectedUrl[1] == RouteUrl.ExcelUpload) {
                                this.router.navigate([Route.Client]);
                                this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.UnauthorizedAccessError);
                                return true;
                            }
                        }
                        else if (user.isRedirectToDashboard) {
                            if (selectedUrl[1] == RouteUrl.Admin || selectedUrl[1] == RouteUrl.Client) {
                                this.router.navigate([Route.Dashboard])
                                this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.UnauthorizedAccessError);
                                return true;
                            }
                        }
                    }
                    return true;
                } else {
                    this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.UnauthorizedAccessError);
                    if (this.userRoleId === Role.TriggerAdmin) {
                        this.router.navigate([Route.Client])
                    } else {
                        this.router.navigate([Route.Dashboard])
                    }
                    return false;
                }
            }
        });
        return loggedin;
    }
}
