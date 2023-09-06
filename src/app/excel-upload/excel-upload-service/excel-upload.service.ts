/**
 * description : ExcelUploadService is created for excel upload read, insert and update the employee data.
 * @author : Anjali Tandel
 * @class : ExcelUploadService
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiURL } from '../../core/magic-string/common.model';
import { Response } from '../../core/common.response';
import { ReadExcelUpload, ImportExcelUpload } from '../excel-upload-model';
import { ExcelUploadAdapter } from '../excel-adapter/excel-adapter';

@Injectable()
export class ExcelUploadService {
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private excelUploadAdapter: ExcelUploadAdapter
  ) {
    this.baseUrl = environment.baseUrl
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 25-11-2019
   * Descriotion : Http server call for get excel-template.
   */
  public getExcelTemplate(clientId: number): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.ExcelUpload + clientId);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 25-11-2019
   * Descriotion : Http server call for read excel records.
   */
  public readExcelFile(object: any, clientId: number): Observable<Response> {
    let excelRecords: ReadExcelUpload[] = this.excelUploadAdapter.read(object, clientId);
    return this.httpClient.post<Response>(this.baseUrl + ApiURL.ExcelUpload + clientId, excelRecords)
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 25-11-2019
   * Descriotion : Http server call for insert/update excel records.
   */
  public import(object: ImportExcelUpload[], clientId: number): Observable<Response> {
    return this.httpClient.post<Response>(this.baseUrl + ApiURL.ImportExcelData + clientId, object);
  }
}
