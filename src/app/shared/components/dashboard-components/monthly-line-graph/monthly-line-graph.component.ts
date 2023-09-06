import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as Highcharts from 'highcharts';
// ----------------------------------------------------- //
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { SharedFunctionService } from '../../../../shared/services/shared-function/shared-function.service';
import { dashboardClass, dashboardClassByGrade, xAxisValues } from '../../../../core/magic-string/common.model';
import { GraphYAxisLabelColor, GraphBackgroundColor, GraplineColor } from '../../../modals/individual-employee-model';


@Component({
  selector: '[trigger-monthly-line-graph].col-xl-6 .col-sm-12 .grid-item .px-2 .mb-3[id=monthly-line-graph]',
  templateUrl: './monthly-line-graph.component.html'
})
export class MonthlyLineGraphComponent implements OnInit {

  @Input() isMyDashboard: boolean;

  @Input() public set evaluationArray(value: any) {
    this._evaluationArray = value ? value : [];
    this.isCurrentMonth = this.checkCurrentMonth(this.currentMonth);
    this.loadMonthlyGraph();
  }

  public get evaluationArray(): any {
    return this._evaluationArray;
  }


  @Output() nextMonthButton: EventEmitter<any>;
  @Output() prevMonthButton: EventEmitter<any>;

  public chart;
  public isCurrentMonth: boolean;
  public currentMonth: any;

  private _evaluationArray: any;
  private isDarkTheme: boolean;


  constructor(
    private globalEventsManager: GlobalEventsManager,
    private sharedFunctionService: SharedFunctionService,
    private datePipe: DatePipe
  ) {
    this.currentMonth = new Date();
    this.isCurrentMonth = false;
    this.nextMonthButton = new EventEmitter<any>();
    this.prevMonthButton = new EventEmitter<any>();
    this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      this.isDarkTheme = status ? true : false;
    });
  }

  ngOnInit() {
  }

  public nextMonth() {
    this.currentMonth = new Date((this.currentMonth.setMonth(this.currentMonth.getMonth() + 1, 1)));
    const fromAndToDate = this.sharedFunctionService.getFormatedDate(this.currentMonth);
    this.nextMonthButton.next(fromAndToDate);
  }

  public prevMonth() {
    this.currentMonth = new Date((this.currentMonth.setMonth(this.currentMonth.getMonth() - 1, 1)));
    const fromAndToDate = this.sharedFunctionService.getFormatedDate(this.currentMonth);
    this.prevMonthButton.emit(fromAndToDate);
  }

  /**
  * Author : Shahbaz Shaikh
  * Modified-Date : 16-07-2021
  * Description : Create line graph of user by Monthly  
  */
  private loadMonthlyGraph() {
    let xAxisCategories: string[] = this.getXAxisCategories();
    let yAxisCategories: string[] = this.sharedFunctionService.getCategories(this.isMyDashboard);
    let series: dashboardClassByGrade[] = [];
    let scatterSeries: dashboardClassByGrade[] = [];
    this.evaluationArray.forEach((item) => {
      let findSeries: dashboardClassByGrade = dashboardClass.find(s => s.grade === item.dayScoreRank);
      let findXaxis = xAxisValues.find(s => parseInt(this.datePipe.transform(item.assessmentDate, 'dd')) === s.xAxisValue);
      const evaluationDayScoreRankSamList = this.evaluationArray.filter(element =>
        element.dayScoreRank === item.dayScoreRank);
      const managerNameList: string[] = evaluationDayScoreRankSamList.map((e) => e.managerName).toString();
      if (findSeries) {
        let sericeObj: any = {
          ...findSeries,
          x: findXaxis.x,
          y: findSeries.y,
          managerName: managerNameList,
          year: this.datePipe.transform(item.assessmentDate, 'MM/dd'),
        }
        let existingSeries = series.find(s => s.year === sericeObj.year);
        if (existingSeries) {
          scatterSeries.push(sericeObj);
        } else {
          series.push(sericeObj);
        }
      }
    });
    if (xAxisCategories && yAxisCategories) {
      this.loadGraph(xAxisCategories, yAxisCategories, series, scatterSeries);
    }

  }

  private loadGraph(xAxisCategories, yAxisCategories, formatedData, series1): void {
    let backGroundColor = this.isDarkTheme ? GraphBackgroundColor.DarkBackGround : GraphBackgroundColor.LightBackGround;
    let labelColor = this.isDarkTheme ? GraphYAxisLabelColor.DarkLabel : GraphYAxisLabelColor.LightLabel;
    let lineColor = this.isDarkTheme ? GraplineColor.DarkLine : GraplineColor.LightLine;

    this.chart = Highcharts.chart('monthlyLineGraph', {
      chart: {
        // /type: 'spline',
        marginTop: 20,
        backgroundColor: backGroundColor,
        styledMode: true
      },
      title: {
        text: ''
      },
      xAxis: {
        lineColor: lineColor,
        // /lineColor: lineColor,
        offset: 8,
        min: 1.5, max: 7.2,
        title: { text: '' },
        labels: {
          //align: 'center',
          x: 25,
          y: 20,
          useHTML: true,
          style: { color: labelColor },
        },
        categories: xAxisCategories
      },
      plotOptions: {
        series: { allowPointSelect: true },
      },
      yAxis: {
        gridLineColor: lineColor,
        offset: 8,
        min: 1.5, max: 11,
        title: { text: '' },
        labels: {
          align: 'right',
          x: 0,
          y: -10,
          useHTML: true,
          style: { color: labelColor },
        },
        categories: yAxisCategories
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter: function () {
          return 'Assessment Date: <b>' + this.point.year + '<br>' + this.point.summary + '<br>' + 'Evaluator: <b>' + this.point.managerName;
        }
      },
      series: [{
        type: 'line',
        //name: 'line',
        marginTop: 20,
        backgroundColor: backGroundColor,
        color: '#7cb5ec',
        styledMode: true,
        showInLegend: false,
        //name: 'Grade',
        data: formatedData,
        marker: {
          enabled: true
        },
      },
      {
        type: 'scatter',
        //name: 'scatter',
        marginTop: 20,
        backgroundColor: backGroundColor,
        color: '#7cb5ec',
        styledMode: true,
        showInLegend: false,
        data: series1,
        marker: {
          enabled: true,
          // /radius: 5,
          symbol: 'round',
        },
      }]
    });
  }

  private getXAxisCategories(): string[] {
    let xAxisCategories: string[] = [];
    const daysArray = ['0', '01', '05', '10', '15', '20', '25', '30']
    daysArray.forEach((day) => {
      if (day !== '0') {
        let dayMonth = this.datePipe.transform(this.currentMonth, 'MM') + '/' + day;
        xAxisCategories.push(dayMonth);
      } else {
        xAxisCategories.push('0');
      }
    });
    return xAxisCategories;
  }

  private checkCurrentMonth(currentDate): boolean {
    let isCurrentMonth: boolean;
    isCurrentMonth = this.datePipe.transform(new Date(currentDate.getFullYear(),
      currentDate.getMonth(), 1), 'MM/dd/yyyy') === this.datePipe.transform(new Date(new Date().getFullYear(),
        new Date().getMonth(), 1), 'MM/dd/yyyy') ? true : false;
    return isCurrentMonth;
  }
}
