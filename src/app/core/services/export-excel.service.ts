import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Injectable()
export class ExportExcelService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public exportAsExcelFile(json: any[], columnNameList: any, excelFileName: string, EXCEL_EXTENSION: string = '.xlsx'): void {
      
    /* generate worksheet */
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    
    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [columnNameList], { origin: "A1" });
    
    /* calculate column width */
    worksheet["!cols"] = this.fitToColumn(json);

    /* generate workbook and add the worksheet */
    const workbook: XLSX.WorkBook = { Sheets: { 'Team-Member': worksheet }, SheetNames: ['Team-Member'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, excelFileName, EXCEL_EXTENSION);
  }

  private saveAsExcelFile(buffer: any, fileName: string, EXCEL_EXTENSION: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + `_exported-${this.datePipe.transform(new Date(), 'MM-dd-yyyy')}` + EXCEL_EXTENSION);
  }

  private fitToColumn(arrayOfArray) {
    const header = Object.keys(arrayOfArray[0]); // columns name
    var wscols = [];
    for (var i = 0; i < header.length; i++) {  // columns length added
      wscols.push({ wch: header[i].length + 5 })
    }
    return wscols;
  }
}