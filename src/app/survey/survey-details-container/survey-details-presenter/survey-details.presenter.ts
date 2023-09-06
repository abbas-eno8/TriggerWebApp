import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { CustomColumn } from '../../../shared/modals/shared-model';
import { CsvExportService } from '../csv-export/csv-export.service';
import { Route } from '../../../core/magic-string/common.model';
import { Router } from '@angular/router';
import { ListPresentation } from '../../../shared/components/list-presentation/list.presentation';

@Injectable({
  providedIn: 'root'
})
export class SurveyDetailsPresenter {

  public records: any;
  public dynamicColumns: CustomColumn[];
  public selectedSurveyName: string;

  private isSurveyAnonymous: boolean;

  constructor(
    public csvExportService: CsvExportService,
    private resolver: ComponentFactoryResolver,
    private router: Router) {
  }

  /** Check the survey of Anonymous or Not. */
  public checkIsSurveyAnonymous(surveyDetails: any[]): void {
    this.isSurveyAnonymous = surveyDetails.some((item) => { return item.isSurveyAnonymous });
  }

  public getRecords(records): void {
    this.records = [];
    this.records = records;
  }

  public getSelectedSurvey(selectedSurveyName: string): void {
    this.selectedSurveyName = selectedSurveyName;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 09-04-2020
   * Description : Create method for remove array with same question-id and merge them in single array.
   */
  public removeDuplicateRecordAndMerge(records: any): any {
    let returnObject = [];
    records.forEach(record => {
      record.submittedAnswers.forEach(o => {
        let existRecord = returnObject.find(r => r.questionId === o.questionId);
        if (existRecord) {
          existRecord.answer += ', ' + o.answer
        } else {
          returnObject.push(o);
        }
      })
      record.submittedAnswers = returnObject;
      returnObject = [];
    })
    this.createDynamicColumns(records);
    return records;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 09-04-2020
   * Description : Create dynamic columns based on getting records.
   */
  public createDynamicColumns(records): void {
    let dynamicColumnLenth = records[0].submittedAnswers.length;
    this.dynamicColumns = [];
    if (!this.isSurveyAnonymous) {
      let record = { id: 0, column: "Name", property: "name", widthClass: 'normal-column-width', isSortable: false, title: '' }
      this.dynamicColumns.push(record);
    }
    let dateRecord = { id: 1, column: "Submitted date", property: "date", widthClass: 'normal-column-width', isSortable: false, title: '' }
    this.dynamicColumns.push(dateRecord);
    for (var i = 1; i <= dynamicColumnLenth; i++) {
      let record = { id: i + 1, column: 'Question ' + i, property: 'answer' + i, widthClass: 'position-column-width', isSortable: false, title: records[0].submittedAnswers[i - 1].question }
      this.dynamicColumns.push(record);
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 09-04-2020
   * Description : Create list view dynmically (Desktop-view/Accrordian).
   */
  public createListViewPage(componentRef, entry): any {
    let factory = this.resolver.resolveComponentFactory(ListPresentation);
    componentRef = entry.createComponent(factory);
    componentRef.instance.records = this.records;
    componentRef.instance.displayActions = false;
    componentRef.instance.columns = this.dynamicColumns;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 09-04-2020
   * Description : Create method for call service method export data.
   */
  public exportData(): void {
    this.csvExportService.exportToCSv(this.records, this.dynamicColumns, this.selectedSurveyName);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 09-04-2020
   * Description : Create method for redireced to Survey-list.
   */
  public backToSurveyList(): void {
    this.router.navigate([Route.Survey]);
  }
}
