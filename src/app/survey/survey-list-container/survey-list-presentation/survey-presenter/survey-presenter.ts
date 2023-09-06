import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayConfig, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material';
import { Injectable, ComponentFactoryResolver, HostListener, ViewContainerRef, ComponentRef } from '@angular/core';
import { Route, CommonCssClass, Warning_Type, Warning_Title } from '../../../../core/magic-string/common.model';
import { UrlEncryptionDecryptionService } from '../../../../core/url-encryption-decryption/url-encryption-decryption.service';
import { Sort } from '../../../../shared/services/sort-by-field/sort';
import { ResponseModel, ResponseModelActive } from '../../../survey.model';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { NoRecordsFoundComponent } from '../../../../shared/no-records-found/no-records-found.component';
import { SortByFieldService } from '../../../../shared/services/sort-by-field/sort-by-field.service';
import { DeletePopupComponent } from '../../../../shared/modal-popup/delete-popup/delete-popup.component';
import { ActiveSurveyConfirmationComponent } from '../active-survey-confirmation/active-survey-confirmation.component';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { LoaderService } from '../../../../core/loader/loader.service';
import { CommonRedirectionServiceService } from '../../../../core/services/common-redirection-service/common-redirection-service.service';
import { SurveyService } from '../../../../survey/survey-service/survey.service';
import { ToasterService } from 'angular2-toaster';


@Injectable({
  providedIn: 'root'
})
export class SurveyPresenter {

  @HostListener("window:scroll", [])
  public onWindowScroll(): void {
    var parentElement = document.getElementsByClassName(CommonCssClass.ToggleDropdownMenu);
    Array.prototype.forEach.call(parentElement, function (el) {
      el.classList.remove(CommonCssClass.ShowClassName);
    });
  }

  /** This property is used for emit when save-survey.  */
  private updateStatus: Subject<any> = new Subject();
  updateStatus$: Observable<any> = this.updateStatus.asObservable();

  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;

  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;
  private bindRecords: Subject<ResponseModel[] | ResponseModelActive[]> = new Subject();
  bindRecords$: Observable<ResponseModel[] | ResponseModelActive[]> = this.bindRecords.asObservable();

  /** This property-model is used for sorting survey-list.  */
  public sortModel: Sort<ResponseModel[] | ResponseModelActive[]>;
  public filteredSurveyList: ResponseModel[] | ResponseModelActive[];
  private currentPageSurvey: ResponseModel[] | ResponseModelActive[];
  public firstPageIndex: number;
  public lastPageIndex: number;
  /** This property is used for emit when delete-survey.  */
  private delete: Subject<number> = new Subject();
  delete$: Observable<number> = this.delete.asObservable();
  public activeCount: number;
  public isDarkTheme: boolean;
  public themeEmitter: any;

  constructor(
    public overlay: Overlay,
    private resolver: ComponentFactoryResolver,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private sortByFieldService: SortByFieldService,
    private matDialog: MatDialog,
    private focusTrapFactory: FocusTrapFactory,
    private datePipe: DatePipe,
    private globalEventsManager: GlobalEventsManager,
    private loaderService: LoaderService,
    private commonRedirectionServiceService: CommonRedirectionServiceService,
    private surveyService: SurveyService,
    private toasterService: ToasterService
  ) {
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }

  public checkResponse(response: any): any[] {
    this.sortModel = new Sort<any[]>(1, '', '', []);
    if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
      return response.data;
    }
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }

  public setSurvey(surveys: any) {
    this.filteredSurveyList = surveys
  }

  public surveyChunks(firstIndex: number, lastIndex: number): void {
    this.currentPageSurvey = this.filteredSurveyList.slice(firstIndex, lastIndex)
    this.firstPageIndex = firstIndex;
    this.lastPageIndex = lastIndex > this.currentPageSurvey.length ? lastIndex : this.currentPageSurvey.length;
    this.bindRecords.next(this.currentPageSurvey);
  }

  public createListViewPage(filteredSurveyList, componentRef, entry, component, isSurvey: boolean): any {
    this.filteredSurveyList = filteredSurveyList;
    this.surveyChunks(this.firstPageIndex, this.lastPageIndex);
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.instance.isSurvey = isSurvey;
    componentRef.instance.filterSurvey = this.filteredSurveyList;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  public createPaginationView(componentRef, entry, component): any {
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.instance.items = this.filteredSurveyList;
    // componentRef.instance.items = [];
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  public createNoRecordsFoundPage(componentRef, entry: ViewContainerRef): any {
    let factory = this.resolver.resolveComponentFactory(NoRecordsFoundComponent);
    componentRef = entry.createComponent(factory);
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  public redirectedToAddSurvey(surveyId: number): void {
    this.urlEncryptionDecryptionService.urlEncryption(surveyId.toString(), Route.AddSurvey);
  }

  public redirectedToEditSurvey(surveyId: number): void {
    this.urlEncryptionDecryptionService.urlEncryption(surveyId.toString(), Route.EditSurvey);
  }

  public redirectedToPreviewSurvey(surveyId: number): void {
    this.urlEncryptionDecryptionService.urlEncryption(surveyId.toString(), Route.PreviewSurvey);
  }

  public redirectToGlobalAssessment(transactionId: number): void {
    this.loaderService.emitIsLoaderShown(true);
    this.commonRedirectionServiceService.getGlobalAssessmentForm(transactionId);
  }

  public getDirecionIcon(property: string): string {
    return this.sortByFieldService.getDirecionIcon(property, this.sortModel);
  }

  public sort(property: string): ResponseModel[] | ResponseModelActive[] {
    this.sortModel.sortedPropety = property;
    this.sortModel.list = this.filteredSurveyList;
    this.sortModel = this.sortByFieldService.sort(this.sortModel);
    this.filteredSurveyList = this.sortModel.list;
    this.surveyChunks(this.firstPageIndex, this.lastPageIndex);
    return this.sortModel.list;
  }

  public deleteTeam(surveyId: number): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: 'Survey'
    });
    dialogRef.componentInstance.confirm.subscribe((isConfirm) => {
      if (isConfirm) {
        this.globalResponseHandlerService.displayLoader(true);
        this.delete.next(surveyId);
      }
    });
  }

  public closeModalPopup(): void {
    this.matDialog.closeAll();
  }

  public redirectedToSurveyDetails(surveyId: number): void {
    this.surveyService.getSubmittedAnswerBySurveyId(this.globalResponseHandlerService.getUser().clientId, surveyId).subscribe((response) => {
      if (response.data.length > 0) {
        this.urlEncryptionDecryptionService.urlEncryption(surveyId.toString(), Route.SurveyDeatils);
      } else {
       this.toasterService.pop(Warning_Type, Warning_Title, 'No Survey Details Found')
      }
    });
  }

  public ischangeStatus(event, surveyId, surveyList, surveyName): void {
    let activeSurveyObj: any;
    
    activeSurveyObj = {
      surveyName: surveyName,
      activSurvey: event.target.checked,
    }

    // this.activeCount = 0;
    // surveyList.forEach(survey => {
    //   if (survey.isActive) {
    //     this.activeCount = this.activeCount + 1;
    //     activeSurveyObj = {
    //       surveyName: surveyName,
    //       activSurvey: true,
    //       inActiveSurvey: false,
    //       isActiveFirstSurvey: this.activeCount > 1 ? false : true
    //     }
    //   }
    // });
    // if (!activeSurveyObj) {
    //   activeSurveyObj = {
    //     surveyName: surveyName,
    //     activSurvey: false,
    //     inActiveSurvey: true,
    //     isActiveFirstSurvey: false
    //   }
    // }
    this.openConfirmationPopup(event, surveyId, activeSurveyObj)
  }

  openConfirmationPopup(event, surveyId, activeSurveyObj) {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(ActiveSurveyConfirmationComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.componentOverlayRef.instance.data = activeSurveyObj;
    this.componentOverlayRef.instance.cancel.subscribe(status => {
      let updateStatusObj = {
        isSubmit: false,
        surveyId: surveyId,
        isActive: event.target.checked ? 1 : 0,
        updatedBy: this.globalResponseHandlerService.getUser().userId,
        // isActiveFirstSurvey: false
      }
      this.updateStatus.next(updateStatusObj);
      this.overlayRef.dispose();
    });
    this.componentOverlayRef.instance.update.subscribe(status => {
      let updateStatusObj = {
        isSubmit: true,
        surveyId: surveyId,
        isActive: event.target.checked ? 1 : 0,
        updatedBy: this.globalResponseHandlerService.getUser().userId
      }
      this.updateStatus.next(updateStatusObj);
      this.overlayRef.dispose();
    });
  }
  isCheckAndDisableToggle(data): boolean {
    let isToggleDisabled: boolean = true;
    let currentToDate = this.datePipe.transform(data.toDate, 'MM-dd-yyyy');
    let todate = Date.parse(currentToDate);
    let todayDate = this.datePipe.transform(new Date(), 'MM-dd-yyyy');
    let currentDate = Date.parse(todayDate);

    if (currentDate > todate) {
      isToggleDisabled = true;
    } else {
      isToggleDisabled = false;
    }
    return isToggleDisabled;
  }
}
