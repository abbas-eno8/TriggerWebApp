import { Injectable } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
@Injectable({
  providedIn: 'root'
})
export class CsvExportService {
  constructor() { }
  public exportToCSv(records, dynamicColumns, file: string): void {
    var dynamicData = []
    records.forEach((record, index) => {
      let obj: DynamicObject = {};
      obj['No.'] = index + 1;
      dynamicColumns.forEach(column => {
        obj[column.column] = record[column.property];
      });
      dynamicData.push(obj);
    });
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      filename: file,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(dynamicData);
  }
}
interface DynamicObject {
  [key: string]: any
}
