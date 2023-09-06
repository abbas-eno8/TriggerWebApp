/**
@author : Anjali Tandel
@class : CommonService
@description : CommonService is created for services which are common for some modules.
**/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, ApiURL, DateTimeFormate, SendMail, UpdateWorkLocation, UTCTimeFormate } from '../../magic-string/common.model';
import { AddSurveyForm } from '../../../shared/modals/survey-form-model';
import { CountryCdeAdapter } from '../../adapter/CountryCodeAdapter';
import { map } from 'rxjs/operators';
// import { map } from 'rxjs-compat/operators/map';


@Injectable()
export class CommonService {

  private isNewNotification: Subject<boolean>;
  private isNewPost: Subject<boolean>;

  private baseUrl: string;

  public countryObj: Subject<any>;
  public countryObj$: Observable<any>;
  public newCountryObj: Subject<any>;
  public newCountryObj$: Observable<any>;
  constructor(
    private httpClient: HttpClient,
    private datePipe: DatePipe,
    private countryCdeAdapter: CountryCdeAdapter,
  ) {
    this.baseUrl = environment.baseUrl
    this.isNewNotification = new Subject<boolean>();
    this.isNewPost = new Subject<boolean>();
    this.countryObj = new Subject<any>();
    this.countryObj$ = this.countryObj.asObservable();
    this.newCountryObj = new Subject<any>();
    this.newCountryObj$ = this.newCountryObj.asObservable();
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  04-10-2019
   * Description : API for get Team Widget Data(copy method from employee service which is used in three modules, so place in common service)
   */
  public getWidgetData(userId: number, widgetType: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.Widget + widgetType + '/' + userId);
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  04-10-2019
   * Description : API for Set Teams widget Data
   */
  public setWidgetData(object) {
    return this.httpClient.post<any>(this.baseUrl + ApiURL.Widget, object);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 27-01-2020
   * Description : API for send email for spark/evalution
   */
  public sendMail(object: SendMail): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(this.baseUrl + ApiURL.SendActionWiseEmail, object);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 02-03-2020
   * Descriotion : Http server call for deleting team-members by id.
   */
  public deleteEmployeeById(clientId: number, employeeId: number, userId: number): Observable<Response> {
    return this.httpClient.delete<Response>(this.baseUrl + ApiURL.Employee + clientId + '/' + employeeId + '/' + userId);
  }

  public getWorkLocations(clientId: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + ApiURL.WorkLocation + clientId);
  }

  public updateUserWorkLocation(object: UpdateWorkLocation): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.baseUrl + ApiURL.WorkLocation + ApiURL.TeamMemberWorkLocation, object);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-05-2020
   * Descriotion : Http server call for submit survey from.
   */
  public submitSurveyForm(addSurey: AddSurveyForm): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.baseUrl + ApiURL.Survey, addSurey);
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 07-07-2021
   * Descriotion : Http server call for last updated notification.
   */
  public getUpdatedNotifications(): Observable<any> {
    const toDayDate = this.datePipe.transform(new Date().setMinutes(new Date().getMinutes() - 5),
      DateTimeFormate, UTCTimeFormate);
    const baseUrl = `${this.baseUrl}MyWall/Notification?lastNoficationTime=${toDayDate}`;
    return this.httpClient.get<any>(baseUrl);
  }

  /*
   * @return {Observable<string>} : siblingMsg
   */
  public getFlagForNotification(): Observable<boolean> {
    return this.isNewNotification.asObservable();
  }

  /*
   * @param {string} message : siblingMsg
   */
  public setFlagForNotification(isNotification: boolean): void {
    this.isNewNotification.next(isNotification);
  }

  /**
   * Author : vishnu Tandel
   * Created-Date : 14-12-2022
   * Descriotion : Http server call for country code
   */
  public getCountryCode(): Observable<any> {
    const baseUrl: string = 'https://restcountries.com/v3.1/all';

    return this.httpClient.get<any>(baseUrl).pipe(map((data: any) => {
      return  this.countryCdeAdapter.toResponse(data);
    }));
  }
}
