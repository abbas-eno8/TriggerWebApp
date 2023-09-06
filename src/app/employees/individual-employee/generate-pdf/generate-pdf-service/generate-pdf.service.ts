import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiURL } from '../../../../core/magic-string/common.model';
import { Response } from '../../../../core/common.response';
import { reportPeriod } from '../generate-pdf.model';
@Injectable()
export class GeneratePdfService {

  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  public getYearList(empId: number, UserId: number): Observable<Response> {
    const url: string = this.baseUrl + ApiURL.generatePDFYear + empId + '/' + UserId;
    return this.httpClient.get<Response>(url);
  }

  public getAnnualReportDetail(reportPeriod: reportPeriod, empId: number, UserId: number): Observable<Response> {
    const url: string = this.baseUrl + ApiURL.AnnualReviewReport + reportPeriod.fromDate + '/' + reportPeriod.toDate
      + '/' + empId + '/' + UserId;
    return this.httpClient.get<Response>(url);
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 30-01-2020
   * Descriotion : For send mail with PDF
   */
  public sendMailWithPdf(bodyContent): Observable<Response> {
    return this.httpClient.post<Response>(this.baseUrl + ApiURL.SendEmailWithPDF, bodyContent);
  }

}