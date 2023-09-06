/**
@author : Sonal Patil
@class : LineGraphComponent
@description :LineGraphComponent is created for employee dashboard separation.
**/
import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { IndividualEmployeeEncryptionModal, GraphBackgroundColor, GraphYAxisLabelColor, GraplineColor } from '../../../modals/individual-employee-model';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { SharedFunctionService } from '../../../../shared/services/shared-function/shared-function.service';
import { dashboardClass, dashboardClassByGrade } from '../../../../core/magic-string/common.model';
@Component({
  selector: '[trigger-line-graph].col-xl-6 .col-sm-12 .grid-item .px-2 .mb-3[id=line-graph]',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {
  @Input() isMyDashboard: boolean;
  @Input() graphArray: any;
  public isWeekly: boolean;
  public isMonthly: boolean;
  public isDarkTheme: boolean;
  private yAxisCategories: string[] = [];
  private xAxisCategoriesWeekly: string[] = [];
  private xAxisCategoriesMonthly: string[] = [];
  private weeklySeries: dashboardClassByGrade[] = [];
  private monthlySeries: dashboardClassByGrade[] = [];
  constructor(private globalResponseHandlerService: GlobalResponseHandlerService,
    private globalEventsManager: GlobalEventsManager,
    private sharedFunctionService: SharedFunctionService) {
    this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      this.isDarkTheme = status ? true : false;
    });
  }

  ngOnInit() {
    this.yAxisCategories = this.sharedFunctionService.getCategories(this.isMyDashboard);
    this.loadLineGraph()
  }

  private loadLineGraph() {
    let typeOfGraph = this.globalResponseHandlerService.decriptData(IndividualEmployeeEncryptionModal.TriggerIsMaPType, IndividualEmployeeEncryptionModal.IsMapType)
    if (typeOfGraph && typeOfGraph === IndividualEmployeeEncryptionModal.Weekly) {
      this.getWeeklyGraphData();
    } else {
      this.getMonthlyGraphData();
    }
  }

  /**
   * Author Anjali Tandel
   * Modified-Date : 18-06-2020
   * Description : Ceate function for get weekly series & x-axis values.  
   */
  public getWeeklyGraphData(): void {
    this.globalResponseHandlerService.encriptData(IndividualEmployeeEncryptionModal.Weekly, IndividualEmployeeEncryptionModal.TriggerIsMaPType, IndividualEmployeeEncryptionModal.IsMapType);
    this.isWeekly = true;
    this.isMonthly = false;
    if (!!this.graphArray && this.xAxisCategoriesWeekly.length === 0 && this.weeklySeries.length === 0) {
      let data = this.graphArray.lstWeekly;
      data.forEach(element => {
        let textToSplit = element.weekNo.split('-');
        let findSeries = dashboardClass.find(s => element.weekScoreRank === s.grade);
        if (findSeries) {
          findSeries.year = textToSplit[1];
          findSeries.xAxisValue = element.weekNo;
          this.weeklySeries.push(findSeries);
        }
        if (!!element.empid) {
          this.xAxisCategoriesWeekly.push(element.weekNo);
        }
      });
    }
    if (this.xAxisCategoriesWeekly && this.weeklySeries) {
      this.loadGraph(this.weeklySeries, this.xAxisCategoriesWeekly);
    }
  }

  /**
   * Author Anjali Tandel
   * Modified-Date : 18-06-2020
   * Description : Ceate function for get monthly series & x-axis values.  
   */
  public getMonthlyGraphData(): void {
    this.globalResponseHandlerService.encriptData(IndividualEmployeeEncryptionModal.Monthly, IndividualEmployeeEncryptionModal.TriggerIsMaPType, IndividualEmployeeEncryptionModal.IsMapType)
    this.isWeekly = false;
    this.isMonthly = true;
    if (!!this.graphArray && this.xAxisCategoriesMonthly.length === 0 && this.monthlySeries.length === 0) {
      let data = this.graphArray.lstMonthly;
      data.forEach(element => {
        let textToSplit = element.monthNo.split('-');
        let findSeries = dashboardClass.find(s => element.monthScoreRank === s.grade);
        if (findSeries) {
          findSeries.year = textToSplit[1];
          findSeries.xAxisValue = element.monthNo;
          this.monthlySeries.push(findSeries);
        }
        if (!!element.empid) {
          this.xAxisCategoriesMonthly.push(element.monthNo);
        }
      });
    }
    if (this.monthlySeries && this.xAxisCategoriesMonthly) {
      this.loadGraph(this.monthlySeries, this.xAxisCategoriesMonthly);
    }
  }

  /**
   * Author Anjali Tandel
   * Modified-Date : 18-06-2020
   * Description : Create line graph based on getting X & Y axis.  
   */
  private loadGraph(series: dashboardClassByGrade[], xAxisCategories: string[]): void {
    let backGroundColor = this.isDarkTheme ? GraphBackgroundColor.DarkBackGround : GraphBackgroundColor.LightBackGround;
    let labelColor = this.isDarkTheme ? GraphYAxisLabelColor.DarkLabel : GraphYAxisLabelColor.LightLabel;
    let lineColor = this.isDarkTheme ? GraplineColor.DarkLine : GraplineColor.LightLine;
    Highcharts.chart('lineGraph', {
      chart: {
        type: 'line',
        marginTop: 20,
        backgroundColor: backGroundColor,
        styledMode: true
      },
      title: {
        text: ''
      },
      xAxis: {
        lineColor: lineColor,
        categories: xAxisCategories,
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
        categories: this.yAxisCategories
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter: function () {
          return 'Year: <b>' + this.point.year + '<br>' + this.point.summary;
        }
      },
      series: [{
        showInLegend: false,
        name: 'Grade',
        data: series,
        color: '#7cb5ec',
      }]
    });
  }
}
