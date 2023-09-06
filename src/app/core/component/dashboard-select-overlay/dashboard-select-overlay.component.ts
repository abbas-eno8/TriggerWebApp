/**
@author : Mihir Patel
@class : DashboardSelectOverlayComponent
@description :DashboardSelectOverlayComponent is created to show all dashboards in overlay and select from here insted of switch.
**/
import { Component, OnInit } from '@angular/core';
import { dashboardButtonsStatus, DashboardStatus, Role, TeamDashboardStatus, MyDashboardStatus, TeamDashboard, MyDashboard, MyWall, ManagerDashboard } from '../../magic-string/common.model';
import { GlobalEventsManager } from '../../navbar/globalEventsManager';
import { Encryption } from '../../magic-string/common-validation-model';
import { GlobalResponseHandlerService } from '../../global-response-handler/global-response-handler';

@Component({
  selector: 'trigger-dashboard-select-overlay',
  templateUrl: './dashboard-select-overlay.component.html',
  styleUrls: ['./dashboard-select-overlay.component.scss']
})
export class DashboardSelectOverlayComponent implements OnInit {

  public userRole: any;
  public userData: any;
  public dashboardButtonsStatus: dashboardButtonsStatus;
  public isDisabledManagerDashboard: boolean;
  public isDisabledMyWall: boolean;
  public isDisabledTeamDashboard: boolean;
  public isDisabledMyDashboard: boolean;
  public isDisabledTeamMemberDashboard: boolean;
  public isEmployeeRole: boolean;
  public roleId: number;
  public selectedDashboardName: string;

  constructor(private globalEventsManager: GlobalEventsManager,
    private globalResponseHandlerService: GlobalResponseHandlerService) {
    this.userRole = globalResponseHandlerService.getUser();
    this.userData = globalResponseHandlerService.getUserData();
    this.roleId = this.globalResponseHandlerService.getUserData().roleId;
    this.isEmployeeRole = this.userRole.roleId === Role.Employee ? true : false;
  }

  ngOnInit() {
    this.isCheckAndDisableDashboard();
    this.globalEventsManager.currentManagerDashboardStatus.subscribe((dashboardLoad) => {
      if (dashboardLoad) {
        this.getDashboardStatus();
      }
    });
  }

  /** Public Method */
  public onClickTeamBtn() {
    if (!this.dashboardButtonsStatus.isTeamDashoard) {
      this.dashboardButtonsStatus = {
        isTeamDashoard: true,
        isManagerDashboard: false,
        isMyDashboard: false,
        isMyWall: false,
      }
      this.checkAndGetDashboardName();
      sessionStorage.setItem(DashboardStatus, JSON.stringify(this.dashboardButtonsStatus))
      this.globalEventsManager.changeDashboard(TeamDashboard);
    }
  }

  public onClickMyDashboardBtn() {
    if (!this.dashboardButtonsStatus.isMyDashboard) {
      this.dashboardButtonsStatus = {
        isMyDashboard: true,
        isManagerDashboard: false,
        isTeamDashoard: false,
        isMyWall: false,
      }
      this.checkAndGetDashboardName();
      sessionStorage.setItem(DashboardStatus, JSON.stringify(this.dashboardButtonsStatus))
      this.globalEventsManager.changeDashboard(MyDashboard);
    }
  }

  public onClickMyWall(): void {
    if (!this.dashboardButtonsStatus.isMyWall) {
      this.dashboardButtonsStatus = {
        isMyDashboard: false,
        isManagerDashboard: false,
        isTeamDashoard: false,
        isMyWall: true,
      }
      this.checkAndGetDashboardName();
      sessionStorage.setItem(Encryption.WallSparkId, '0');
      sessionStorage.setItem(DashboardStatus, JSON.stringify(this.dashboardButtonsStatus))
      this.globalEventsManager.changeDashboard(MyWall);
    }
  }

  public onClickManagerBtn() {
    if (!this.dashboardButtonsStatus.isManagerDashboard) {
      this.dashboardButtonsStatus = {
        isManagerDashboard: true,
        isTeamDashoard: false,
        isMyDashboard: false,
        isMyWall: false,
      }
      this.checkAndGetDashboardName();
      sessionStorage.setItem(DashboardStatus, JSON.stringify(this.dashboardButtonsStatus))
      this.globalEventsManager.changeDashboard(ManagerDashboard);
    }
  }

  /** Private method */
  private isCheckAndDisableDashboard() {
    if (this.roleId !== Role.TriggerAdmin) {
      if (!!JSON.parse(sessionStorage.getItem(DashboardStatus))) {
        this.dashboardButtonsStatus = JSON.parse(sessionStorage.getItem(DashboardStatus).toString())
      } else {
        if (this.isEmployeeRole || !this.userData.isManagerAccess) {
          this.dashboardButtonsStatus = {
            isManagerDashboard: false,
            isTeamDashoard: false,
            isMyDashboard: true,
            isMyWall: false,
          }
        } else {
          this.dashboardButtonsStatus = {
            isManagerDashboard: true,
            isTeamDashoard: false,
            isMyDashboard: false,
            isMyWall: false,
          }
        }
      }
    }
    else {
      this.dashboardButtonsStatus = {
        isManagerDashboard: true,
        isTeamDashoard: false,
        isMyDashboard: false,
        isMyWall: false,
      }
    }
    this.checkAndGetDashboardName();
  }

  private checkAndGetDashboardName() {
    if (this.dashboardButtonsStatus.isManagerDashboard) {
      this.selectedDashboardName = 'Truvelop Dashboard'
    } else if (this.dashboardButtonsStatus.isTeamDashoard) {
      this.selectedDashboardName = 'Team Dashboard'
    } else if (this.dashboardButtonsStatus.isMyDashboard) {
      this.selectedDashboardName = 'My Dashboard'
    } else if (this.dashboardButtonsStatus.isMyWall) {
      this.selectedDashboardName = 'Recognition Wall'
    }
    this.getDashboardStatus();
  }

  private getDashboardStatus() {
    this.isDisabledMyWall = this.userRole.roleId === Role.TriggerAdmin ? true : false;
    this.isDisabledTeamMemberDashboard = this.isDisabledMyWall ? false : !this.userData.isManagerAccess;
    this.isDisabledTeamDashboard = !this.userData.isManagerAccess ? true : JSON.parse(sessionStorage.getItem(TeamDashboardStatus));
    this.isDisabledMyDashboard = this.isCheckAndDisabledMyDashboard();
  }

  private isCheckAndDisabledMyDashboard(): boolean {
    if (this.roleId === Role.TriggerAdmin) {
      return true;
    } else if (this.globalResponseHandlerService.getUserData().myDashboardEnabled) {
      return false;
    } else {
      return true;
    }
  }
}
