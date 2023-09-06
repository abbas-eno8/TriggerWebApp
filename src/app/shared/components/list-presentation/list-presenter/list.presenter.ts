import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NoRecordsFoundComponent } from '../../../no-records-found/no-records-found.component';
import { SortByFieldService } from '../../../services/sort-by-field/sort-by-field.service';
import { Sort } from '../../../services/sort-by-field/sort';
import { DeletePopupComponent } from '../../../modal-popup/delete-popup/delete-popup.component';
import { MatDialog } from '@angular/material';
import { LoaderService } from '../../../../core/loader/loader.service';
import { MainDiv, Route } from '../../../../core/magic-string/common.model';
import { Observable, Subject } from 'rxjs';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { SearchPipePipe } from '../../../pipes/search-pipe.pipe';
import { Router } from '@angular/router';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { UrlEncryptionDecryptionService } from '../../../../core/url-encryption-decryption/url-encryption-decryption.service';
import { Module, ListModule, listModule, InvokeMethod, InvokeMethodType } from '../../../modals/shared-model';

@Injectable({
  providedIn: 'root'
})
export class ListPresenter {
  /** This property is used for store current page records. */
  //private currentPageTeamMembers: any[];
  /** This property is storing first page-index which we are using for getting current page records. */
  public firstPageIndex: number;
  /** This property is storing last page-index which we are using for getting current page records. */
  public lastPageIndex: number;
  public sortModel: Sort<any[]>;
  public records: any[];
  public filterRecords: any[];
  public currentFilterRecords: any[];
  public searchparameters: string[];
  public module: ListModule;
  /** This property is used for bind filter team-members. */
  private bindRecords: Subject<any[]> = new Subject();
  bindRecords$: Observable<any[]> = this.bindRecords.asObservable();

  private createView: Subject<any> = new Subject();
  createView$: Observable<any> = this.createView.asObservable();
  /** This property is used for emit when edit-user. */
  private invokeMethod: Subject<InvokeMethod> = new Subject();
  invokeMethod$: Observable<InvokeMethod> = this.invokeMethod.asObservable();
  /** This property is used for emit when delete-user. */
  private delete: Subject<any> = new Subject();
  delete$: Observable<any> = this.delete.asObservable();
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(
    private globalEventsManager: GlobalEventsManager,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private matDialog: MatDialog,
    private loaderService: LoaderService,
    private resolver: ComponentFactoryResolver,
    private searchPipePipe: SearchPipePipe,
    private sortByFieldService: SortByFieldService,
    private router: Router,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService) {
    this.sortModel = new Sort<any[]>(1, '', '', []);
    this.firstPageIndex = 0;
    this.lastPageIndex = 50;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Gllobal check response handler & throw Error/Success message.
   */
  public checkResponse(response: any): any[] {
    if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
      return response.data;
    }
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }

  public getInstances(records, column, moduleType: number): void {
    this.records = records;
    this.filterRecords = records;
    this.searchparameters = column.map(x => x.property);
    this.module = listModule.find(m => m.id === moduleType);
  }

  public createListViewPage(componentRef, entry, component, columns, isDisplayActions): any {
    this.teamMemberChunks(this.firstPageIndex, this.lastPageIndex);
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.instance.list = this.currentFilterRecords;
    componentRef.instance.columns = columns;
    componentRef.instance.isDisplayActions = isDisplayActions;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  public createPaginationView(componentRef, entry, component): any {
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.instance.items = this.filterRecords;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  public teamMemberChunks(firstIndex: number, lastIndex: number): void {
    this.currentFilterRecords = this.filterRecords.slice(firstIndex, lastIndex);
    this.firstPageIndex = firstIndex;
    this.lastPageIndex = lastIndex > this.currentFilterRecords.length ? lastIndex : this.currentFilterRecords.length;
    this.bindRecords.next(this.currentFilterRecords);
    this.scrollTop();
  }

  private scrollTop(): void {
    const mainDiv = document.getElementById(MainDiv);
    if (mainDiv) {
      mainDiv.scrollTop = 0;
    }
  }

  public createNoRecordsFoundPage(componentRef, entry: ViewContainerRef): any {
    let factory = this.resolver.resolveComponentFactory(NoRecordsFoundComponent);
    componentRef = entry.createComponent(factory);
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  public filterRecordsBySerachText(searchText: string, searchparameters): any[] {
    let records: any[] = searchText === '' ? this.records : this.searchPipePipe.transform(this.records, searchText, searchparameters);
    this.filterRecords = records;
    this.teamMemberChunks(this.firstPageIndex, this.lastPageIndex);
    this.globalEventsManager.pagination(records);
    return records;
  }

  public searchByText(searchText: string): any[] {
    let records: any[] = searchText === '' ? this.records : this.searchPipePipe.transform(this.records, searchText, this.searchparameters);
    this.filterRecords = records;
    this.teamMemberChunks(this.firstPageIndex, this.lastPageIndex);
    this.globalEventsManager.pagination(records);
    this.createView.next(this.filterRecords);
    return records;
  }

  public isCreateDynamicView(isListViewCreated: boolean): boolean {
    if ((this.filterRecords.length === 0 && isListViewCreated) || (this.filterRecords.length > 0 && !isListViewCreated)) {
      return true;
    } else {
      return false;
    }
  }

  public createDynamicView(isListViewCreated: boolean): void {
    if ((this.filterRecords.length === 0 && isListViewCreated) || (this.filterRecords.length > 0 && !isListViewCreated)) {
      //this.createView.next();
    }
  }

  public sort(property: string): any[] {
    this.sortModel.sortedPropety = property;
    this.sortModel.list = this.filterRecords;
    this.sortModel = this.sortByFieldService.sort(this.sortModel);
    this.filterRecords = this.sortModel.list;
    this.teamMemberChunks(this.firstPageIndex, this.lastPageIndex);
    return this.sortModel.list;
  }

  public getDirecionIcon(property: string): string {
    return this.sortByFieldService.getDirecionIcon(property, this.sortModel);
  }

  public openModalForDeleteRecord(record): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: this.module.deleteRecordString
    });
    dialogRef.componentInstance.confirm.subscribe((isConfirm) => {
      if (isConfirm) {
        this.loaderService.emitIsLoaderShown(true);
        this.delete.next(record); //Call event for delete
      }
    });
  }

  public editRecord(record): void {
    let object: InvokeMethod = new InvokeMethod(InvokeMethodType.Update, record);
    this.invokeMethod.next(object);
  }


  public redirectedToEdit(id: number): void {
    this.urlEncryptionDecryptionService.urlEncryption(id.toString(), this.module.route);
    if (this.module.id === Module.Client) {
      this.setClient(id);
    }
  }

  public redirectedToCompanyDashboard(client): void {
    this.globalResponseHandlerService.setPartialClientResponse(client.id, client.client, true, client.clientImagepath, client.contractStartDate, client.contractEndDate, client.gracePeriod)
    this.router.navigate([Route.Dashboard]);
  }

  /**
    * Author : Anjali Tandel
    * Modified-Date :  21-12-2018
    * Descriotion : Page redirect to add-edit client
    */
  public setClient(id: number): void {
    this.globalResponseHandlerService.setPartialClientResponse(id, '', false, '')
  }
}
