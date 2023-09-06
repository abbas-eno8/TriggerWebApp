/**
@author : Mihir Patel
@class : SideBarComponent
@description :SideBarComponent is created for side nav bar.
**/
import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router, } from '@angular/router';
import { interval, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// ----------------------------------------------------------------- //
import { GlobalEventsManager } from '../globalEventsManager';
import { GlobalResponseHandlerService } from '../../global-response-handler/global-response-handler';
import { Image, Encryption } from '../../magic-string/common-validation-model';
import { Route, RouteUrl, Icon, SidebarName, Actions, NextRoute, Role, Dimension } from '../../magic-string/common.model';
import { UrlEncryptionDecryptionService } from '../../url-encryption-decryption/url-encryption-decryption.service';
import { Permission, ActionsPermission } from '../../magic-string/permission.model';
import { ActionPermissionService } from '../../services/action-permission/action-permission.service';
import { CommonService } from '../../services/common/common.service';
@Component({
  selector: 'trigger-side-bar',
  inputs: ['selectedRoute'],
  templateUrl: './sidebar.component.html'
})

export class SideBarComponent implements OnInit {

  @Input() public set selectedRoute(value: string) {
    if (value) {
      this._selectedRoute = value;
      this.findIndex();
    }
  }
  public get selectedRoute(): string {
    return this._selectedRoute;
  }

  @Input() public set routeName(value: string) {
    if (value) {
      this._routeName = value;
    }
  }
  public get routeName(): string {
    return this._routeName;
  }

  public isRedirectToDashboard: boolean = false;
  public iconUrl: string;
  public iconUrlName: string;
  public isShowSubMenu: boolean;
  public current: number = 0;

  public menuBar: Menu[];
  public actionPermission: Permission[];
  public isMobileView: boolean = false;
  public isUpdatedNotificaion: boolean;
  public isNotificationApiInvoked: boolean;

  private _selectedRoute: string;
  private _routeName: string;

  constructor(
    private globalEventsManager: GlobalEventsManager,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private router: Router,
    private actionPermissionService: ActionPermissionService,
    public breakpointObserver: BreakpointObserver,
    private commonService: CommonService
  ) {
    this.isUpdatedNotificaion = false;
    this.isNotificationApiInvoked = false;
    // Create event for get partial client data
    this.globalEventsManager.partialClientResponse.subscribe((partialClientResponse) => {
      this.getUser();
    })
    // Calling media matcher method for get screen resolution, with help of this widget show for dekstop and mobile :
    this.breakpointObserver
      .observe(['(min-width: 1200px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobileView = false;
        } else {
          this.isMobileView = true;
        }
      });
  }

  ngOnInit(): void {
    this.getUser();
    this.getNotificaion();
    this.commonService.getFlagForNotification().subscribe((isNewPostButon: boolean) => {
      if (!isNewPostButon) {
        this.isNotificationApiInvoked = isNewPostButon;
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  04-03-2019
   * Description : Create method for get user data, and set client logo.
   */
  private getUser(): void {
    let user = this.globalResponseHandlerService.getUserData();
    // let role = user.userRole;
    this.iconUrl = user.iconUrl;
    this.iconUrlName = user.iconUrlName;
    this.isRedirectToDashboard = user.isRedirectToDashboard;
    this.isDisplayMenu(user.roleId, user.clientId);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  04-03-2019
   * Description : Create method for which route is accessible or not based on role and used in html.
   */
  private isDisplayMenu(userRole: number, clientId: number): void {
    this.actionPermission = this.actionPermissionService.getActionPErmission();
    this.menuBar = sidebarMenu;
    this.menuBar.forEach(route => {
      if (route.actionId) {
        let getAction = this.actionPermission.find(p => p.actionId == Actions.TriggerAnEmployee);
        if (route.actionId === Actions.TriggerAnEmployee && getAction && getAction.actionPermissions && this.globalResponseHandlerService.getUserData().roleId !== Role.Employee) {
          let protectionLevel: ActionsPermission = getAction.actionPermissions.find(a => a.dimensionId === Dimension.ProtectionLevel && a.canAdd);
          // getAction.actionPermissions.forEach(permission => {
          //   if (permission.canAdd) {
          //     route.isAccess = true;
          //   }
          // });
          if (protectionLevel) {
            route.isAccess = true;
          }

          // route.subMenu && route.subMenu.forEach((item) => {
          //   let evaluationAction = this.actionPermission.find(p => p.actionId === item.actionId);
          //   if (evaluationAction && evaluationAction.actionPermissions) {
          //     let protectionLevelSubMenu: ActionsPermission = evaluationAction.actionPermissions.find((action) =>
          //       action.dimensionId === Dimension.ProtectionLevel && action.canAdd);
          //     if (protectionLevelSubMenu) {
          //       let subMenuObj = route.subMenu.find((r) => r.actionId === evaluationAction.actionId);
          //       if (subMenuObj) {
          //         subMenuObj.isAccess = true;
          //       }
          //       route.isArrow = true;
          //     }
          //   }
          // });
        }

        let getSparkAction = this.actionPermission.find(p => p.actionId == Actions.SparkAnEmployee)
        if (route.actionId === Actions.SparkAnEmployee && getSparkAction && getSparkAction.actionPermissions && this.globalResponseHandlerService.getUserData().roleId !== Role.Employee) {
          let protectionLevel: ActionsPermission = getSparkAction.actionPermissions.find(a => a.dimensionId === Dimension.ProtectionLevel && a.canAdd);

          if (protectionLevel) {
            route.isAccess = true;
          }
        }

        let getTeamConfiguraton: Permission = this.actionPermission.find(p => p.actionId == Actions.TeamConfiguraton)
        if (route.actionId === Actions.TeamConfiguraton) {
          if (userRole === Role.Admin || (userRole === Role.TriggerAdmin && this.isRedirectToDashboard)) {
            route.isAccess = true;
          } else if (getTeamConfiguraton && getTeamConfiguraton.actionPermissions[0] && getTeamConfiguraton.actionPermissions[0].canView) {
            route.isAccess = true;
          } else {
            route.isAccess = false;
          }
        }
      } else {
        if ((!route.isPermission || userRole === Role.Admin) && route.role.includes(userRole)) {
          route.isAccess = true
          if (route.url === RouteUrl.Client && userRole === Role.Admin) {
            route.id = clientId;
          }
          if (userRole === Role.TriggerAdmin) {
            if (!this.isRedirectToDashboard) {
              if (!route.isAccesssClientDashboard) {
                route.isAccess = true
              } else {
                route.isAccess = false
              }
            } else {
              if (route.isAccesssClientDashboard) {
                route.isAccess = true
              } else {
                route.isAccess = false
              }
            }
          }
        }
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  04-03-2019
   * Description : Function created for redirect to based on route, method is click event which is binded in html.
   */
  public redirectToRoute(route: string, encryptedId: number): void {
    sessionStorage.setItem('MenuName', 'mainMenu')
    sessionStorage.setItem(Encryption.RequestId, '0');
    sessionStorage.setItem(NextRoute, route)
    if (!encryptedId) {
      // if (route === RouteUrl.Dashboard) {
      //   this.globalResponseHandlerService.encriptData(JSON.stringify(false), Encryption.TeamDashboardLoad, Encryption.TeamDashboardLoadKey);
      // }
      this.router.navigate([route]);
    } else {
      this.urlEncryptionDecryptionService.urlEncryption(encryptedId.toString(), route);
    }
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date :  23-03-2022
   * Description : Function created for redirect to based on route, method is click event which is binded in html.
   */
  public redirectToSubRoute(route: string, encryptedId: number): void {
    sessionStorage.setItem('MenuName', 'subMenu')
    sessionStorage.setItem(Encryption.RequestId, '0');
    sessionStorage.setItem(NextRoute, route);
    if (!encryptedId) {
      // if (route === RouteUrl.Dashboard) {
      //   this.globalResponseHandlerService.encriptData(JSON.stringify(false), Encryption.TeamDashboardLoad, Encryption.TeamDashboardLoadKey);
      // }
      this.router.navigate([route]);
    } else {
      this.urlEncryptionDecryptionService.urlEncryption(encryptedId.toString(), route);
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  04-03-2019
   * Description : Function created for set image while getting image is corrupted from server, we set no-logo image.
   */
  public onError(): void {
    this.iconUrl = Image.ClientLogo;
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date :  07-07-2021
   * Description : Function created for set false for RecognitionWall.
   */
  public onSideBarMenu(menuName: string): void {
    if (menuName === SidebarName.RecognitionWall) {
      this.isUpdatedNotificaion = false;
    } else {
      this.isNotificationApiInvoked = false;
    }
  }

  private findIndex(): void {
    if (sessionStorage.getItem('MenuName') === 'subMenu') {
      return
    }
    this.current = this.menuBar.findIndex((item) => item.url === this.selectedRoute);
    const filterArray = this.menuBar.find((item) => item.url === this.selectedRoute);
    if (filterArray && filterArray.url === 'evaluate-team-member') {
      if (filterArray.isAccess) {
        this.current;
      } else {
        this.current += 1;
      }
    }
  }
  /**
   * Author : Shahbaz Shaikh
   * Modified-Date :  07-07-2021
   * Description : Function created for get updated new notifications.
   */
  private getNotificaion(): void {

    interval(5 * 60 * 1000)
      .pipe(
        mergeMap(() => this.isUpdatedNotificaion === this.isNotificationApiInvoked ?
          this.commonService.getUpdatedNotifications() : of({ message: "Ok", status: 201, data: 0 }))
      )
      .subscribe((response) => {
        if (response.data > 0) {
          if (this.selectedRoute === RouteUrl.RecognitionWall) {
            this.isNotificationApiInvoked = true;
            this.commonService.setFlagForNotification(true);
          } else {
            this.isUpdatedNotificaion = true;
          }
        }
      });
  }
}

/**
 * Author : Anjali Tandel
 * Modified-Date :  04-03-2019
 * Description : Create menu interface for menu bar list.
 */
export class Menu {
  id?: number;
  actionId?: number;
  name: string;
  url: string;
  icon: string;
  route: string;
  isAccess: boolean;
  isAccesssClientDashboard?: boolean;
  role?: any[];
  isPermission?: boolean;
  isBeta?: boolean;
  subMenu?: SubMenu[];
  isArrow?: boolean;

  constructor(
    subMenu: SubMenu[] = [],
    isArrow: boolean = false
  ) {
    this.subMenu = subMenu;
    this.isArrow = isArrow;
  }
}

/**
 * Author : Shahbaz Shaikh
 * Modified-Date :  23-03-2022
 * Description : Create sub menu interface for menu bar list.
 */
export class SubMenu {
  id?: number;
  actionId?: number;
  name: string;
  url: string;
  icon: string;
  route: string;
  isAccess: boolean;
  isAccesssClientDashboard?: boolean;
  role?: any[];
  isPermission?: boolean;
  isBeta?: boolean;
}

/**
 * Author : Anjali Tandel
 * Modified-Date :  04-03-2019
 * Description : Bind menubar list.
 */
export const sidebarMenu: Menu[] = [
  { name: SidebarName.Client, url: RouteUrl.Client, icon: Icon.Client, route: RouteUrl.Client, isAccess: false, role: [Role.TriggerAdmin] },
  { name: SidebarName.Admin, url: RouteUrl.Admin, icon: Icon.Admin, route: RouteUrl.Admin, isAccess: false, role: [Role.TriggerAdmin] },
  { name: SidebarName.Dashboard, url: RouteUrl.Dashboard, icon: Icon.Dashboard, route: RouteUrl.Dashboard, isAccess: false, role: [Role.Executive, Role.TriggerAdmin, Role.Admin, Role.Manager, Role.Employee], isAccesssClientDashboard: true },
  { name: SidebarName.RecognitionWall, url: RouteUrl.RecognitionWall, icon: Icon.RecognitionWall, route: RouteUrl.RecognitionWall, isAccess: false, role: [Role.Executive, Role.Admin, Role.Manager, Role.Employee], isAccesssClientDashboard: true },
  { name: SidebarName.Employee, url: RouteUrl.Employee, icon: Icon.Employee, route: RouteUrl.Employee, isAccess: false, role: [Role.Executive, Role.TriggerAdmin, Role.Admin, Role.Manager], isAccesssClientDashboard: true },
  { name: SidebarName.ClientProfile, id: 0, url: RouteUrl.Client, icon: Icon.ClientProfile, route: Route.EditClient, isAccess: false, role: [Role.Admin] },
  {
    name: SidebarName.TriggerEmployee, id: 0, url: RouteUrl.TriggerEmployee, icon: Icon.TriggerEmployee, route: RouteUrl.TriggerEmployee, isAccess: false, isPermission: false, role: [Role.Admin],
    subMenu: [
      { name: SidebarName.EvaluationsInDraft, url: RouteUrl.EvaluationsInDrafts, icon: Icon.EvaluationsInDrafts, route: RouteUrl.EvaluationsInDrafts, isAccess: true, role: [Role.Admin, Role.Manager, Role.Executive, Role.Employee], actionId: Actions.EvaluationsInDrafts, isAccesssClientDashboard: true, isBeta:false },
    ]
  },
  {
    name: SidebarName.TriggerEmployee, id: 0, url: RouteUrl.TriggerEmployee, icon: Icon.TriggerEmployee, route: RouteUrl.TriggerEmployee, isAccess: false, isPermission: true, role: [Role.Admin], actionId: Actions.TriggerAnEmployee,
    subMenu: [
      { name: SidebarName.EvaluationsInDraft, url: RouteUrl.EvaluationsInDrafts, icon: Icon.EvaluationsInDrafts, route: RouteUrl.EvaluationsInDrafts, isAccess: true, role: [Role.Admin, Role.Manager, Role.Executive, Role.Employee], actionId: Actions.EvaluationsInDrafts, isAccesssClientDashboard: true, isBeta: false },
    ]
  },
  { name: SidebarName.Department, url: RouteUrl.Department, icon: Icon.Admin, route: RouteUrl.Department, isAccess: false, role: [Role.TriggerAdmin, Role.Admin], isAccesssClientDashboard: true },
  { name: SidebarName.Teams, url: RouteUrl.Teams, icon: Icon.Team, route: RouteUrl.Teams, isAccess: false, role: [Role.TriggerAdmin, Role.Admin, Role.Manager, Role.Executive], isAccesssClientDashboard: true, actionId: Actions.TeamConfiguraton },
  { name: SidebarName.Dimension, url: RouteUrl.Dimension, icon: Icon.Dimension, route: RouteUrl.Dimension, isAccess: false, role: [Role.Admin, Role.TriggerAdmin], isAccesssClientDashboard: true },
  { name: SidebarName.Permission, url: RouteUrl.Permission, icon: Icon.Permission, route: RouteUrl.Permission, isAccess: false, role: [Role.Admin, Role.TriggerAdmin], isAccesssClientDashboard: true },
  { name: SidebarName.Survey, url: RouteUrl.Survey, icon: Icon.Survey, route: RouteUrl.Survey, isAccess: false, role: [Role.TriggerAdmin, Role.Admin], isAccesssClientDashboard: true },
  { name: SidebarName.ActiveSurvey, url: RouteUrl.ActiveSurvey, icon: Icon.ActiveSurvey, route: RouteUrl.ActiveSurvey, isAccess: false, role: [Role.Admin, Role.Manager, Role.Executive, Role.Employee], isAccesssClientDashboard: true },
  { name: SidebarName.Spark, url: RouteUrl.Spark, icon: Icon.Spark, route: RouteUrl.Spark, isAccess: false, isPermission: true, role: [Role.Admin, Role.Executive, Role.Manager], actionId: Actions.SparkAnEmployee }
];
