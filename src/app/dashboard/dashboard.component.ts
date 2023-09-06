import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DashboardPresenter } from './dashboard-presenter/dashboard.presenter';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Encryption } from '../core/magic-string/common-validation-model';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { Role, ManagerDashboard, TeamDashboard, MyDashboard, MyWall } from '../core/magic-string/common.model';
import { GlobalEventsManager } from '../core/navbar/globalEventsManager';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { dashboardButtonsStatus, DashboardStatus } from './dashboard-model';
import { MyWallContainer } from '../shared/components/my-wall-container/my-wall.container';
@Component({
  selector: 'trigger-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  componentRef: any;
  @ViewChild('container', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
  public component: any;
  private destroy: Subject<void> = new Subject();
  public userData: any;
  public isLoadByStatus: boolean
  constructor(
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private presenter: DashboardPresenter,
    private globalEventsManager: GlobalEventsManager) {
    this.userData = this.globalResponseHandlerService.getUserData();
    this.destroy = new Subject();
  }

  ngOnInit() {
    this.globalEventsManager.currentDashboard.subscribe((currentDashboard) => {
      this.isLoadByStatus = false;
      if (!!currentDashboard) {
        this.isLoadByStatus = true;
        this.isLoadDashboardByStatus(currentDashboard)
      }
    })
    // Code comment by mihir now we are load dashboard from overlay insted of switch, code is for future reference
    // this.presenter.loadComponent$.pipe(takeUntil(this.destroy)).subscribe((componentName: Component) => {
    //   this.component = componentName;
    //   this.entry.clear();
    //   this.componentRef = this.presenter.createComponent(this.componentRef, this.entry, this.component);
    // });
    if (!this.isLoadByStatus) {
      let dashboardType: dashboardButtonsStatus = JSON.parse(sessionStorage.getItem(DashboardStatus))
      if (!!dashboardType) {
        if (dashboardType.isManagerDashboard) {
          this.component = ManagerDashboardComponent;
        } else if (dashboardType.isTeamDashoard) {
          this.component = TeamDashboardComponent;
        } else if (dashboardType.isMyDashboard) {
          this.component = MyDashboardComponent;
        } else {
          this.component = MyWallContainer;
        }
      } else {
        if (this.userData.roleId === Role.Employee) {
          let dashboardButtonsStatus = {
            isMyDashboard: true,
            isManagerDashboard: false,
            isTeamDashoard: false,
            isMyWall: false,
          }
          sessionStorage.setItem(DashboardStatus, JSON.stringify(dashboardButtonsStatus))
          this.component = MyDashboardComponent;
        } else if (this.userData.isManagerAccess || this.userData.roleId === Role.TriggerAdmin) {
          this.component = ManagerDashboardComponent;
        } else {
          this.component = MyDashboardComponent;
        }
      }
      this.componentRef = this.presenter.createComponent(this.componentRef, this.entry, this.component);
    }
  }
  ngOnChange() {
    let dashboardType = JSON.parse(sessionStorage.getItem(DashboardStatus))
  }

  isLoadDashboardByStatus(type) {
    let componentName: any;
    if (type === ManagerDashboard) {
      componentName = ManagerDashboardComponent
    } else if (type === TeamDashboard) {
      componentName = TeamDashboardComponent
    } else if (type === MyDashboard) {
      componentName = MyDashboardComponent
    } else if (type === MyWall) {
      componentName = MyWallContainer
    }
    this.component = componentName;
    if (this.entry) {
      this.entry.clear();
    }
    this.componentRef = this.presenter.createComponent(this.componentRef, this.entry, this.component);
  }

  ngOnDestroy(): void {
    this.globalResponseHandlerService.encriptData(JSON.stringify(false), Encryption.TeamDashboardLoad, Encryption.TeamDashboardLoadKey);
    this.destroy.next();
    this.destroy.complete();
  }

}
