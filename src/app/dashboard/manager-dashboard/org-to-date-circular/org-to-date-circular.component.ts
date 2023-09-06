/**
@author : Sonal Patil
@class : OrgToDateCircularComponent
@description :OrgToDateCircularComponent is created for dashboard separation.
**/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
import { GraphGrade, GraphColor, DashboardPassHeaderName, RedirectionParam, widgetType, GraphBackgroundColor } from '../manager-dashboard-model';
import { TooltioHeaderOrgToDateCircular } from '../../../shared/tooltip/tooltip-model';
import { TeamDashboardAdapter } from '../../dashboard-adapter/dashboard-adapter';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
declare var $: any;
@Component({
  selector: '[trigger-org-to-date-circular].col-xl-6 .col-sm-12 .grid-item .px-0[id=org-to-date-circular]',
  templateUrl: './org-to-date-circular.component.html'
})
export class OrgToDateCircularComponent implements OnInit {
  @Input() bulbTootlip: any;
  @Input() selectedYearBinding: any;
  @Input() role: any;
  @Input() noOfMyOrgToday: any;
  @Input() todayOrgtReport: any;
  @Input() isShowIPGrade: boolean;

  @Output() removeTile = new EventEmitter<string>();
  @Output() redirectedToList = new EventEmitter<RedirectionParam>();

  public triggerCompleted: number;
  public totalCountOfA: any;
  public totalCountOfB: any;
  public totalCountOfC: any;
  public totalCountOfIP: any;
  public totalCountOfRP: any;
  public circularArray: any;
  public percentageOfA: any;
  public percentageOfB: any;
  public percentageOfC: any;
  public percentageOfIP: any;
  public percentageOfRP: any;
  public pageTitle: string;
  public isDarkTheme: boolean;
  public isInitialLoad: boolean;
  public themeEmitter: any;
  constructor(private adapter: TeamDashboardAdapter,
    private globalEventsManager: GlobalEventsManager) {
    this.pageTitle = TooltioHeaderOrgToDateCircular;
    this.isInitialLoad = false;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;     
        if(this.isInitialLoad){
          this.getCircleGraph(this.todayOrgtReport);
        }
      } else {
        this.isDarkTheme = false;
        if(this.isInitialLoad){
          this.getCircleGraph(this.todayOrgtReport);
        }
      }
    })
  }

  ngOnInit() {
    this.getCircleGraph(this.todayOrgtReport)
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }

  /**
     * Author : Sonal Patil
     * ModifiedBy : Mihir Patel
     * Modified-Date :  6-3-2019
     * Description : Emit value to dashboard component for remove widget by id.
  */
  onclickremoveTile() {
    this.removeTile.emit(DashboardPassHeaderName.OrgToDateCircular);
  }

  /**
   * Author : Sonal Patil
   * Modified by : Anjali Tandel
   * Modified-Date : 05/03/2020
   * Description : Emit value to dashboard component for redirect to employeelist from dashboard.
   */
  callonClickmyOrgToDate(grade) {
    this.redirectedToList.emit(this.adapter.dashboardRedirectionParam(widgetType.organizationWidgetId, grade));
  }

  /**
     * Author : Mihir Patel
     * Modified-Date :  19-12-2018
     * Description : Create circle graph.
  */
  getCircleGraph(todayOrgtReport) {
    this.isInitialLoad = true;
    this.todayOrgtReport = todayOrgtReport;

    this.circularArray = [];
    this.percentageOfA = undefined;
    this.percentageOfB = undefined;
    this.percentageOfC = undefined;
    this.percentageOfIP = undefined;
    this.percentageOfRP = undefined;

    this.totalCountOfA = '';
    this.totalCountOfB = '';
    this.totalCountOfC = '';
    this.totalCountOfRP = '';
    this.totalCountOfIP = '';
    this.todayOrgtReport.forEach(element => {
      if (element.TodayOrgRptRank === GraphGrade.A) {
        this.totalCountOfA = element.TodayOrgRptCnt;
      } else if (element.TodayOrgRptRank === GraphGrade.B) {
        this.totalCountOfB = element.TodayOrgRptCnt;
      } else if (element.TodayOrgRptRank === GraphGrade.C) {
        this.totalCountOfC = element.TodayOrgRptCnt;
      } else if (element.TodayOrgRptRank === GraphGrade.RP) {
        this.totalCountOfRP = element.TodayOrgRptCnt;
      } else if (element.TodayOrgRptRank === GraphGrade.IP) {
        this.totalCountOfIP = element.TodayOrgRptCnt;
      }
      this.circularArray.push(element.TodayOrgRptCnt);
    });
    let maxValue = Math.max.apply(null, this.circularArray);
    
    if (!!this.totalCountOfA) {
      this.percentageOfA = Math.round(100 * this.totalCountOfA / maxValue);
    }
    if (!!this.totalCountOfB) {
      this.percentageOfB = Math.round(100 * this.totalCountOfB / maxValue);
    }
    if (!!this.totalCountOfC) {
      this.percentageOfC = Math.round(100 * this.totalCountOfC / maxValue);
    }
    if (!!this.totalCountOfRP) {
      this.percentageOfRP = Math.round(100 * this.totalCountOfRP / maxValue);
    }
    if (!!this.totalCountOfIP) {
      this.percentageOfIP = Math.round(100 * this.totalCountOfIP / maxValue);
    }


    let total = (this.totalCountOfA || 0) + (this.totalCountOfB || 0) + (this.totalCountOfC || 0) + (this.totalCountOfRP || 0) + (this.totalCountOfIP || 0);
    this.triggerCompleted = total;
    var percentageOfA = this.percentageOfA === 0 ? 1 : this.percentageOfA;
    var percentageOfB = this.percentageOfB === 0 ? 1 : this.percentageOfB;
    var percentageOfC = this.percentageOfC === 0 ? 1 : this.percentageOfC;
    var percentageOfIP = this.percentageOfIP === 0 ? 1 : this.percentageOfIP;
    var percentageOfRP = this.percentageOfRP === 0 ? 1 : this.percentageOfRP;

    if (!!this.totalCountOfA) {
      var totalCountOfA = this.totalCountOfA + '';
    } else {
      totalCountOfA = '';
    }
    if (!!this.totalCountOfB) {
      var totalCountOfB = this.totalCountOfB + '';
    } else {
      totalCountOfB = '';
    }
    if (!!this.totalCountOfC) {
      var totalCountOfC = this.totalCountOfC + '';
    } else {
      totalCountOfC = '';
    }
    if (!!this.totalCountOfRP) {
      var totalCountOfRP = this.totalCountOfRP + '';
    } else {
      totalCountOfRP = '';
    }
    if (!!this.totalCountOfIP) {
      var totalCountOfIP = this.totalCountOfIP + '';
    } else {
      totalCountOfIP = '';
    }
   
    let backGroundColor = this.isDarkTheme? GraphBackgroundColor.DarkBackGround : GraphBackgroundColor.LightBackGround;
    $(function () {
      Highcharts.chart('circularContainer', {
        chart: {
          type: 'solidgauge',
          // backgroundColor: '#140718',//color change for theme 
          backgroundColor: backGroundColor,
          marginTop: 10,
          marginBottom: 38,
        },

        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        tooltip: {
          enabled: false
        },

        pane: {
          startAngle: 0,
          endAngle: 300,
          background: [{ // Track for Move
            outerRadius: '112%',
            innerRadius: '90%',
            backgroundColor: backGroundColor,
            // backgroundColor: '#140718',
            borderWidth: 0,
            shape: 'arc'
          }, { // Track for Exercise
            outerRadius: '87%',
            innerRadius: '65%',
            backgroundColor: backGroundColor,
            // backgroundColor: '#140718',
            borderWidth: 0,
            shape: 'arc'
          }, { // Track for Stand
            outerRadius: '52%',
            innerRadius: '40%',
            backgroundColor: backGroundColor,
            // backgroundColor: '#140718',
            borderWidth: 0,
            shape: 'arc'
          }]
        },
        yAxis: [{
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: [],
          stops: [
            [0.5, '#16c4a1'], // dark
          ],
        }, {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: [],
          stops: [
            [0.5, '#6974ff'], // dark
          ],
        }, {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: [],
          stops: [
            [0.5, '#9a59b5'], // dark
          ],
        }, {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: [],
          stops: [
            [0.5, '#3a99ed'], // dark
          ],
        }, {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: [],
          stops: [
            [0.5, '#ef9e10'], // dark
          ],
        }],
        credits: {
          enabled: false
        },
        plotOptions: {
          solidgauge: {
            borderWidth: '10px',
            linecap: 'round',
            stickyTracking: false
          },
          series: {
            dataLabels: {
              enabled: false
            }
          }
        },
        series: [
          {
          animation: false,
          name: 'Low Impact',
          borderColor: GraphColor.borderColor,
          data: [{
            color: Highcharts.getOptions().colors[0],
            radius: '100%',
            innerRadius: '100%',
            y: percentageOfIP,
          }],
          dataLabels: {
            enabled: true,
            rotation: 0,
            align: 'left',
            format: totalCountOfIP, // one decimal
            y: -110, // 10 pixels down from the top
            x: -29,
            style: {
              fontSize: '8px',
              fontWeight: 'thin',
              color: GraphColor.IP_Player,
            },
            zIndex: 9,
            borderWidth: 0
          }
        },
         {
          animation: false,
          name: 'Fourth',
          borderColor: GraphColor.borderColor,
          data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '75%',
            innerRadius: '75%',
            y: percentageOfA
          }],
          dataLabels: {
            enabled: true,
            rotation: 0,
            align: 'left',
            format: totalCountOfA, // one decimal
            y: -96, // 10 pixels down from the top
            x: -29,
            style: {
              fontSize: '8px',
              fontWeight: 'thin',
              color: GraphColor.A_Player,
            },
            zIndex: 9,
            borderWidth: 0
          }
        }, 
        {
          animation: false,
          name: 'Third',
          borderColor: GraphColor.borderColor,
          data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '30%',
            innerRadius: '30%',
            y: percentageOfB
          }],
          dataLabels: {
            enabled: true,
            rotation: 0,
            align: 'left',
            format: totalCountOfB, // one decimal
            y: -82, // 10 pixels down from the top
            x: -29,
            style: {
              fontSize: '8px',
              fontWeight: 'thin',
              color: GraphColor.B_Player,
            },
            zIndex: 9,
            borderWidth: 0
          }
        },
         {
          animation: false,
          name: 'Second',
          borderColor: GraphColor.borderColor,
          yAxis: 1,
          data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '30%',
            innerRadius: '30%',
            //   y:  20
            y: percentageOfC
          }],
          dataLabels: {
            enabled: true,
            rotation: 0,
            align: 'left',
            format: totalCountOfC, // one decimal
            y: -68, // 10 pixels down from the top
            x: -29,
            style: {
              fontSize: '8px',
              fontWeight: 'thin',
              color: GraphColor.C_Player,
            },
            zIndex: 9,
            borderWidth: 0
          }
        }, 
        {
          animation: false,
          name: 'First',
          borderColor: GraphColor.borderColor,
          // yAxis: 1,
          data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '30%',
            innerRadius: '30%',
            //   y: 10
            y: percentageOfRP
          }],
          dataLabels: {
            enabled: true,
            rotation: 0,
            align: 'left',
            format: totalCountOfRP, // one decimal
            y: -54, // 10 pixels down from the top
            x: -29,
            style: {
              fontSize: '8px',
              fontWeight: 'thin',
              color: GraphColor.RP_Player,
            },
            zIndex: 9,
            borderWidth: 0
          }
        }]
      },
        function (chart) {
          var y = this.series[0].data[0].y;
          for (var m = y; m >= 0; m = m - (y / 80)) {
            chart.addSeries({
              borderColor: GraphColor.IP_Player,
              data: [{
                y: m,
                radius: '100%',
                innerRadius: '100%',
              }],
              stickyTracking: false,
              enableMouseTracking: false
            }, false)
          }
          var y1 = this.series[1].data[0].y;
          for (var n = y1; n >= 0; n = n - (y1 / 80)) {
            chart.addSeries({
              borderColor: GraphColor.A_Player,
              data: [{
                y: n,
                radius: '87%',
                innerRadius: '87%',
              }],
              stickyTracking: false,
              enableMouseTracking: false
            }, false)
          }
          var y2 = this.series[2].data[0].y;
          for (var o = y2; o >= 0; o = o - (y2 / 80)) {
            chart.addSeries({
              borderColor: GraphColor.B_Player,
              data: [{
                y: o,
                radius: '74%',
                innerRadius: '74%',
              }],
              stickyTracking: false,
              enableMouseTracking: false
            }, false)
          }
          var y3 = this.series[3].data[0].y;
          for (var p = y3; p >= 0; p = p - (y3 / 80)) {
            chart.addSeries({
              borderColor: GraphColor.C_Player,
              data: [{
                y: p,
                radius: '61%',
                innerRadius: '61%',
              }],
              stickyTracking: false,
              enableMouseTracking: false
            }, false)
          }
          var y4 = this.series[4].data[0].y;
          for (var q = y4; q >= 0; q = q - (y4 / 80)) {
            chart.addSeries({
              borderColor: GraphColor.RP_Player,
              data: [{
                y: q,
                radius: '48%',
                innerRadius: '48%',
              }],
              stickyTracking: false,
              enableMouseTracking: false
            }, false)
          }
          chart.redraw();
        }
      );
    });
  }
}