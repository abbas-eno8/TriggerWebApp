import { Injectable, ComponentFactoryResolver, ComponentRef, Component } from '@angular/core';
import { TeamDashboard } from '../dashboard-model';
import { Subject, Observable } from 'rxjs';
import { dashboardClass, Role } from '../../core/magic-string/common.model';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { OverlayConfig, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { RequestForSparkTriggerComponent } from '../request-for-spark-trigger/request-for-spark-trigger.component';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { LoaderService } from '../../core/loader/loader.service';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';

@Injectable()
export class DashboardPresenter {
  public teamDashboard: TeamDashboard;
  public userData: any
  // private isLoadCurrentComponent: Subject<Component> = new Subject();
  // loadComponent$: Observable<Component> = this.isLoadCurrentComponent.asObservable();

  // private isReloadTeamDashboard: Subject<boolean> = new Subject();
  // reloadTeamDashboard$: Observable<boolean> = this.isReloadTeamDashboard.asObservable();

  // private isLoadNonManagerDashboard: Subject<boolean> = new Subject();
  // loadNonManagerComponent$: Observable<boolean> = this.isLoadNonManagerDashboard.asObservable();

  // private isLoadMyDashboard: Subject<boolean> = new Subject();
  // loadMyDashboardComponent$: Observable<boolean> = this.isLoadMyDashboard.asObservable();

  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;
  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(private resolver: ComponentFactoryResolver,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    public overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory,
    private loaderService: LoaderService,
    private globalEventsManager: GlobalEventsManager) {
    this.userData = this.globalResponseHandlerService.getUserData();
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
    // this.checkAndLoadDashboard();
    // this.isLoadManagerDashboard.next(true);
  }

  // checkAndLoadDashboard() {
  //   if (this.userData.roleId === Role.Employee) {
  //     this.isLoadNonManagerDashboard.next(true);
  //     // this.component = NonManagerDashboardComponent;
  //   } else {
  //     this.isLoadManagerDashboard.next(true);
  //   }
  // }
  public createComponent(componentRef, entry, component): any {
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  ngOnDestroy(): void {
    this.themeEmitter.unsubscribe();
  }

  public getDashboard(teamDashboard: TeamDashboard): void {
    this.teamDashboard = teamDashboard;
  }

  // public loadManagerDashboard(isManagerDashboardEnabled): void {
  //   this.isLoadManagerDashboard.next(isManagerDashboardEnabled);
  // }

  // public loadTeamDashboard(isloadTeamDashboard): void {
  //   this.isReloadTeamDashboard.next(isloadTeamDashboard);
  // }

  // public loadComponent(isRoadNonManagerDashboard): void {
  //   this.isLoadNonManagerDashboard.next(isRoadNonManagerDashboard);
  // }

  // public loadNonMyDashboard(isRoadMyDashboard): void {
  //   this.isLoadMyDashboard.next(isRoadMyDashboard);
  // }

  // public loadComponent(componentName): void {
  //   this.isLoadCurrentComponent.next(componentName);
  // }

  getClassByGrade(grade: string): string {
    if (grade !== '') {
      return dashboardClass.find(c => grade.includes(c.grade)).bindClass;
    } else {
      return '';
    }
  }

  openRequestModal(managerList, modalHeader, isMobile): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(RequestForSparkTriggerComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.componentOverlayRef.instance.data = managerList;
    this.componentOverlayRef.instance.header = modalHeader;
    this.loaderService.emitIsLoaderShown(false);
    this.componentOverlayRef.instance.cancel.subscribe(status => {
      this.overlayRef.dispose();
    });
    this.componentOverlayRef.instance.update.subscribe(managerList => {
      this.overlayRef.dispose();
    });
  }

}
