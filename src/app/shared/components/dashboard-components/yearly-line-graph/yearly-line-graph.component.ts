/**
@author : Mihir Patel
@class : YearlyLineGraphComponent
@description :YearlyLineGraphComponent is created for show yearly map.
**/
import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { GraphYAxisLabelColor, GraphBackgroundColor, GraplineColor } from '../../../modals/individual-employee-model';
import { SharedFunctionService } from '../../../services/shared-function/shared-function.service';
import { dashboardClass, dashboardClassByGrade } from '../../../../core/magic-string/common.model';

@Component({
  selector: '[trigger-yearly-line-graph].col-xl-6 .col-sm-12 .grid-item .px-2 .mb-3[id=yearly-line-graph]',
  templateUrl: './yearly-line-graph.component.html'
})
export class YearlyLineGraphComponent implements OnInit {
  @Input() isMyDashboard: boolean;
  @Input() graphArray: any;
  private isDarkTheme: boolean;
  constructor(
    private globalEventsManager: GlobalEventsManager,
    private sharedFunctionService: SharedFunctionService) {
    this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      this.isDarkTheme = status ? true : false;
    })
  }

  ngOnInit() {
    this.loadYearlyGraph(this.graphArray);
  }

  /**
   * Author : Mihir Patel
   * Modified-by : Anjali Tandel
   * Modified-Date : 18-06-2020
   * Modified-Description : Display Grade-summary(With animation tool-tip) instaed of grade-points, remove unnecessary code, bind x-axis & y-axis values dynamically instead of static.
   * Description : Ceate line graph of user by yearly  
   */
  private loadYearlyGraph(graphArray): void {
    let xAxisCategories: string[] = [];
    let yAxisCategories: string[] = this.sharedFunctionService.getCategories(this.isMyDashboard);;
    let series: dashboardClassByGrade[] = [];
    if (!!graphArray) {
      let yearlyArray = graphArray.lstYearly;
      yearlyArray.forEach(element => {
        let textToSplit = element.yearNo.split(':');
        let findSeries: dashboardClassByGrade = dashboardClass.find(s => element.yearScoreRank === s.grade);
        if (findSeries) {
          findSeries.year = textToSplit[1];
          findSeries.xAxisValue = element.yearNo;
          series.push(findSeries);
        }
        if (!!element.empid) {
          xAxisCategories.push(element.yearNo);
        }
      });
      let backGroundColor = this.isDarkTheme ? GraphBackgroundColor.DarkBackGround : GraphBackgroundColor.LightBackGround;
      let labelColor = this.isDarkTheme ? GraphYAxisLabelColor.DarkLabel : GraphYAxisLabelColor.LightLabel;
      let lineColor = this.isDarkTheme ? GraplineColor.DarkLine : GraplineColor.LightLine;

      Highcharts.chart('yearlyLineGraph', {
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
          categories: yAxisCategories
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
}
