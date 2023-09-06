/**
@author : Mihir Patel
@class : SparkNotificationPresenter
@description : SparkNotificationPresenter is contain with business logic of spark notification module.
**/
import { Injectable, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { OverlayConfig, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Observable, Subject } from 'rxjs';

import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { UnApprovedSpark, CskOverlayPanel, MainDiv } from '../../spark-notification-model';
import { SortByFieldService } from '../../../shared/services/sort-by-field/sort-by-field.service';
import { Sort } from '../../../shared/services/sort-by-field/sort';
import { CommonCssClass, ApiResponseStatus } from '../../../core/magic-string/common.model';
import { SparkNotificationAdapter } from '../../spark-notification-adapter/spark-notification.adapter';
import { SparkNotificationDeclinePresentation } from '../spark-notification-presentation/spark-notification-decline-presentation/spark-notification-decline.presentation';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';


@Injectable()
export class SparkNotificationPresenter {
  // sparkData is created for manage current spark detail when open overlay popup.
  public sparkData: UnApprovedSpark;
  // sortModel is defined for manage sorting list.
  public sortModel: Sort<UnApprovedSpark[]>;
  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;
  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;
  //  create subject which is subscribe detail.
  private update: Subject<any> = new Subject();
  update$: Observable<any> = this.update.asObservable();
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private sortByFieldService: SortByFieldService,
    public overlay: Overlay,
    private resolver: ComponentFactoryResolver,
    private adapter: SparkNotificationAdapter,
    private globalEventsManager: GlobalEventsManager,) {
      this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
        if (status) {
          this.isDarkTheme = true;
          } else {
          this.isDarkTheme = false;
        }
      })

  }

  /**
  * Author : Mihir Patel
  * Created-Date : 10-09-2019
  * Descriotion : Create method for create spark-list component dymanically.
  */
  public createListViewPage(list, componentRef, entry, component): any {
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.instance.sparks = list;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  /**
   * Author : Mihir Patel
   * Created-Date : 10-09-2019
   * Descriotion : Create method for create no-record-found component dymanically.
   */
  public createNoRecordsFoundPage(componentRef, entry, component): any {
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 10-09-2019
   * Descriotion : Create method for check response which get from server call and 
   * from here call getApiResponse method which is responsible for check status and show/hide loader and toaster
   */
  public checkResponse(response: any): any[] {
    this.sortModel = new Sort<UnApprovedSpark[]>(1, '', '', []);
    if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
      return response.data;
    } else if (response.status = ApiResponseStatus.NoContent) {
      return response.data;
    }
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 09-10-2019
   * Descriotion : Create method for sorting list by sorting order and return sorted list.
   */
  public sort(property: string, sparks: UnApprovedSpark[]): UnApprovedSpark[] {
    this.sortModel.sortedPropety = property;
    this.sortModel.list = sparks;
    this.sortModel = this.sortByFieldService.sort(this.sortModel);
    return this.sortModel.list;
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 11-09-2019
   * Description : Get sorted direction icon.
   */
  public getDirecionIcon(property: string): string {
    if (!!this.sortModel) {
      return this.sortByFieldService.getDirecionIcon(property, this.sortModel);
    }
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 11-09-2019
   * Description : Add class to cdk-overlay-pane when click on pagination dropdown.
   */
  public onClickPaginationPanel(): void {
    var parentElement = document.getElementsByClassName(CskOverlayPanel)[0];
    parentElement.classList.add(CommonCssClass.PaginationDropdownPosition);
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 11-09-2019
   * Description : Create method for scroll top to selected div.
   */
  public scrollTop(): void {
    const mainDiv = document.getElementById(MainDiv);
    if (mainDiv) { mainDiv.scrollTop = 0; }
  }

  /**
    * Author : Mihir Patel
    * Created-Date : 11-09-2019
    * Description : Create method for Open reject spark overlay popup.
    */
  public openRejectSparkModel(spark: UnApprovedSpark): void {
    this.sparkData = spark;
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(SparkNotificationDeclinePresentation));
    this.componentOverlayRef.instance.cancel.subscribe(status => {
      this.overlayRef.dispose();
    });
    this.componentOverlayRef.instance.update.subscribe(remark => {
      let obj = this.adapter.toRequest(this.sparkData, remark, 2, this.globalResponseHandlerService.getUser().userId);
      this.update.next(obj)
    });
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 11-09-2019
   * Description : Create method for Close overlay modal popup.
   */
  public closeModal(): void {
    this.overlayRef.dispose();
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 11-09-2019
  * Description : Method is for create request body and call approved spark method to conainer.
  */
  public approvedSpark(spark: UnApprovedSpark): void {
    let remark = '';
    let obj = this.adapter.toRequest(spark, remark, 1, this.globalResponseHandlerService.getUser().userId);
    this.update.next(obj)
  }


}
