/**
@author : Mihir Patel
@class : GlobalEventsManager
**/
import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable ,  Subject } from 'rxjs';

@Injectable()
// GlobalEventsManager service is created for observe state of navbar(sidebar, topbar)
export class GlobalEventsManager {

    private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

    private _showSideBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public showSideBarByClientEmitter: Observable<boolean> = this._showSideBar.asObservable();

    private _openCloseSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public openCloseSidebar: Observable<boolean> = this._openCloseSidebar.asObservable();

    private _partialClientResponse: BehaviorSubject<partialClientResponse> = new BehaviorSubject<partialClientResponse>({ partialClientId: -1, partailClientName: '', isRedirectToClientDashboard: false, iconUrl: '' });
    public partialClientResponse: Observable<partialClientResponse> = this._partialClientResponse.asObservable();

    private imageSource = new BehaviorSubject('');
    currentImage = this.imageSource.asObservable();

    private dashboardType = new BehaviorSubject('');
    currentDashboard = this.dashboardType.asObservable();

    private isManagerDashboardLoad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public currentManagerDashboardStatus: Observable<boolean> = this.isManagerDashboardLoad.asObservable();
    private themeStatus = new BehaviorSubject('');
    currentTheme = this.themeStatus.asObservable();

    private userName = new BehaviorSubject('');
    currentUserName = this.userName.asObservable();


    private _showSmsVerificationPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public showSmsVerificationPageEmitter: Observable<boolean> = this._showSmsVerificationPage.asObservable();

    private removeSparkWidget: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public removeSparkWidgetEmitter: Observable<boolean> = this.removeSparkWidget.asObservable();

    private callNotificationApi: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public notification: Observable<boolean> = this.callNotificationApi.asObservable();
    private updateMyDashboardList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public updateMyDashboardListEmitter: Observable<boolean> = this.updateMyDashboardList.asObservable();

    private updateTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public updateThemeEmitter: Observable<boolean> = this.updateTheme.asObservable();


    private resetFormField: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public resetForm: Observable<string> = this.resetFormField.asObservable();

    private closeCdkModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public closeCdkModalPopup: Observable<boolean> = this.closeCdkModal.asObservable();

    private paginationEvent: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public paginationEventObs: Observable<any> = this.paginationEvent.asObservable();
    constructor() { }
    // showNavBar method is create for check showbar value(in boolean)
    showNavBar(ifShow: boolean) {
        this._showNavBar.next(ifShow);
    }

    showSideBar(ifShow: boolean) {
        this._showSideBar.next(ifShow);
    }

    // For get sidebar status open or close : 
    sidebarStatus(ifShow: boolean) {
        this._openCloseSidebar.next(ifShow);
    }
    // For set updated user profile
    changeProfile(image: string) {
        this.imageSource.next(image)
    }

    changeDashboard(dashboard: string) {
        this.dashboardType.next(dashboard)
    }

    updateManagerDashboardStatus(managerDashboardStatus: boolean) {
        this.isManagerDashboardLoad.next(managerDashboardStatus)
    }
    
    changeTheme(theme: string) {
        this.themeStatus.next(theme)
    }

    changeUserName(name: any) {
        this.userName.next(name)
    }


    showSmsVerificationPage(isDisplay: boolean) {
        this._showSmsVerificationPage.next(isDisplay);
    }

    getNotification(isTrue: boolean) {
        this.callNotificationApi.next(isTrue);
    }
    removeSpark(ifShow: boolean) {
        this.removeSparkWidget.next(ifShow);
    }

    updateCreateRequestList(isLoad: boolean) {
        this.updateMyDashboardList.next(isLoad);
    }

    updateThemeType(isDarkTheme: boolean) {
        this.updateTheme.next(isDarkTheme);
    }

    getEmailTemplate(content: string) {
        this.resetFormField.next(content);
    }

    closeModal(isTrue: boolean) {
        this.closeCdkModal.next(isTrue);
    }

    pagination(data: any): void {
        this.paginationEvent.next(data);
    }

    /**
    * Author : Anjali Tandel
    * Modified-Date :  18-12-2018
    * Description : Create event for get partial client data on client dashboard.
    */
    setPartialClientData(partialClientResponse: any) {
        this._partialClientResponse.next(partialClientResponse);
    }
}
export class partialClientResponse {
    partialClientId: number
    partailClientName: string
    isRedirectToClientDashboard: boolean
    iconUrl: string
    contractStartDate?: string
    contractEndDate?: string
    gracePeriod?: number
}