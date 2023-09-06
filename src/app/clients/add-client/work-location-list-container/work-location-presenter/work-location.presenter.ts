import { Injectable, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { WorkLocation, EditWorkLocation, AddWorkLocation, WorkLocationTitle } from '../../../../clients/client-model';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { OverlayRef, OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { LoaderService } from '../../../../core/loader/loader.service';
import { DeletePopupComponent } from '../../../../shared/modal-popup/delete-popup/delete-popup.component';
import { MatDialog } from '@angular/material';
import { WorkLocationPopupComponent } from '../work-location-presentation/work-location-popup/work-location-popup.component';

@Injectable({
  providedIn: 'root'
})
export class WorkLocationPresenter {
  private isDarkTheme: boolean;
  private overlayRef: OverlayRef;

  private add = new Subject<WorkLocation>();
  add$ = this.add.asObservable();

  private edit = new Subject<WorkLocation>();
  edit$ = this.edit.asObservable();

  private delete = new Subject<number>();
  delete$ = this.delete.asObservable();
  constructor(
    private loaderService: LoaderService,
    private focusTrapFactory: FocusTrapFactory,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private globalEventsManager: GlobalEventsManager,
    private matDialog: MatDialog,
    private overlay: Overlay) {
    this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      this.isDarkTheme = status ? true : false;
    });
  }
  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Gllobal check response handler & throw Error/Success message.
   */
  public checkResponse(response: any): any[] {
    if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
      return response.data;
    } else {
      return [];
    }
  }

  public openWorkLocationPopup(record: WorkLocation, locations: WorkLocation[]): void {
    let componentOverlayRef: ComponentRef<any>;
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
    this.overlayRef = this.overlay.create(config);
    componentOverlayRef = this.overlayRef.attach(new ComponentPortal(WorkLocationPopupComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    componentOverlayRef.instance.workLocationObject = record;
    componentOverlayRef.instance.data = {
      record: record,
      pageTitle: record.workLocation ? EditWorkLocation : AddWorkLocation
    };
    componentOverlayRef.instance.cancel.subscribe(status => {
      this.overlayRef.dispose();
    });
    componentOverlayRef.instance.submit.subscribe((location: WorkLocation) => {
      if (this.isLocationAlreadyExist(location, locations)) {
        if (location.workLocationId > 0) {
          this.edit.next(location);
        } else {
          this.add.next(location);
        }
      }
    });
  }

  public deletePopup(id: number, workLocations: WorkLocation[]): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: WorkLocationTitle
    });
    dialogRef.componentInstance.confirm.subscribe((isConfirm) => {
      if (isConfirm) {
        if (workLocations.length > 1) {
          this.loaderService.emitIsLoaderShown(true);
          this.delete.next(id);
        } else {
          this.globalResponseHandlerService.disaplyErrorMessage('Client required minimum 1 work-location.')
          this.loaderService.emitIsLoaderShown(false);
        }
      }
    });
  }

  private isLocationAlreadyExist(location: WorkLocation, workLocations: WorkLocation[]): boolean {
    let exist = workLocations ? workLocations.find(c => c.workLocation === location.workLocation) : null;
    if (exist) {
      this.loaderService.emitIsLoaderShown(false);
      this.globalResponseHandlerService.disaplyErrorMessage('Work-Location Already Exists.')
      return false;
    }
    return true;
  }

  public closeDeletePopup(): void {
    this.matDialog.closeAll();
    this.loaderService.emitIsLoaderShown(false);
  }

  public closeOverlay(): void {
    this.overlayRef.dispose();
    this.loaderService.emitIsLoaderShown(false);
  }
}
