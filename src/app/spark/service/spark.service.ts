/**
 * @author Shahbaz Shaikh
 * @description This service file used for get and send the data to server.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// ----------------------------------------- //
import { environment } from '../../../environments/environment';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { Encryption } from '../../core/magic-string/common-validation-model';
import { ApiResponse, Version, Version2 } from '../../core/magic-string/common.model';
import { SparkAdapter, SparkFiltersAdapter } from '../adapter/spark.adapter';

@Injectable()
export class SparkService {
    /** Store the environments URL */
    private baseURL: string;

    constructor(
        private http: HttpClient,
        private globalResponseHandlerService: GlobalResponseHandlerService,
        private sparkAdapter: SparkAdapter,
        private sparkFiltersAdapter: SparkFiltersAdapter,
    ) {
        this.baseURL = environment.baseUrl;
    }

    /**
     * Author : Shahbaz Shaikh
     * Get the Team member list from server
     * @param companyId Get the company id
     * @param managerId Get the manager id
     * @returns
     */
    public getTeamMember(companyId: number, managerId: number, dimensionId: number, dimensionValues: number): Observable<any> {
        this.globalResponseHandlerService.encriptData(Version.Version2, Encryption.Version, Encryption.VersionKey);
        const url = this.baseURL + `employees/reportToUser?companyId=${companyId}&managerId=${managerId}&dimensionId=${dimensionId}&dimensionValues=${dimensionValues}`;
        return this.http.get<any>(url).pipe(map((result) => result.data));
    }
    public getAllTeamMember(companyId: number, managerId: number): Observable<any> {
        this.globalResponseHandlerService.encriptData(Version.Version1, Encryption.Version, Encryption.VersionKey)
        const url = this.baseURL + `employees/reportToUser?companyId=${companyId}&managerId=${managerId}`;
        return this.http.get<any>(url).pipe(map(result => 
            result.data
        ));
    }
    /**
     * Author : Shahbaz Shaikh
     * Get the list of Categories from server based on client id
     * @param clientId get the client id
     * @returns
     */
    public getCategories(clientId: number): Observable<any> {
        const url = this.baseURL + `Questionnaries/category/${clientId}`;
        return this.http.get<any>(url).pipe(map((result) => result.data));
    }

    /**
     * Author : Shahbaz Shaikh
     * Get the list of Classifications from server based on client id
     * @param clientId Get the client id
     * @returns
     */
    public getClassifications(clientId: number): Observable<any> {
        const url = this.baseURL + `Classification/${clientId}`;
        return this.http.get<any>(url).pipe(map((result) => result.data));
    }

    /**
     * Author : Shahbaz Shaikh
     * Save the spark on server
     * @param spark Get the request body of spark
     * @returns
     */
    public saveSpark(spark): Observable<any> {
        this.globalResponseHandlerService.encriptData(Version2.Version4, Encryption.Version, Encryption.VersionKey);
        const body = this.sparkAdapter.toRequest(spark);
        const url = this.baseURL + 'EmployeeSpark';
        return this.http.post<any>(url, body);
    }

    /**
     * Author : Shahbaz Shaikh
     * Modified-Date : 20-09-2021
     * Description : API for send email for spark/evalution
     */
    public sendEmail(mailObj): Observable<ApiResponse> {
        this.globalResponseHandlerService.encriptData(Version.Version2, Encryption.Version, Encryption.VersionKey);
        const url = this.baseURL + 'SendActionWiseEmail';
        return this.http.put<ApiResponse>(url, mailObj);
    }

    /**
  * Author : Mihir Patel
  * Created-Date : 02-03-2020
  * Descriotion : Http server call for getting dimenstion-elemenets based on configured permission.
  */
    public getFilterElementData(companyId: number): Observable<ApiResponse> {
        this.globalResponseHandlerService.encriptData(Version.Version1, Encryption.Version, Encryption.VersionKey);
        const url = `${this.baseURL}/EmployeeSpark/SparkFilters/${companyId}`;
        return this.http.get<ApiResponse>(url).pipe(map((data: any) => {
            return this.sparkFiltersAdapter.toResponse(data);
        }));
    }
}
