/**
@author : Sonal Patil
@class : DirectReportsToDateProgressivePieComponent
@description :DirectReportsToDateProgressivePieComponent is created for dashboard separation.
**/
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { GraphGrade, GraphColor, DashboardPassHeaderName, RedirectionParam, widgetType, GraphBackgroundColor } from '../manager-dashboard-model';
import { Route, True, RoleEnum } from '../../../core/magic-string/common.model';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { TooltioHeaderDiRectreportsToDateProgressivePie } from '../../../shared/tooltip/tooltip-model';
import { Encryption } from '../../../core/magic-string/common-validation-model';
import { TeamDashboardAdapter } from '../../dashboard-adapter/dashboard-adapter';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';

@Component({
  selector: '[trigger-direct-reports-to-date-progressive-pie].col-xl-6 .col-sm-12 .grid-item .px-0[id=direct-reports-to-date-progressive-pie]',
  templateUrl: './direct-reports-to-date-progressive-pie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectReportsToDateProgressivePieComponent implements OnInit {
  @Input() bulbTootlip: any;
  @Input() selectedYearBinding: any;
  @Input() role: any;
  @Input() todayDirectReport: any;
  @Input() isShowIPGrade: any;
  
  @Output() removeTile = new EventEmitter<string>();
  @Output() redirectedToList = new EventEmitter<RedirectionParam>();

  public pieStatckTotalCountOfIP: any;
  public pieStatckTotalCountOfA: any;
  public pieStatckTotalCountOfB: any;
  public pieStatckTotalCountOfC: any;
  public pieStatckTotalCountOfRP: any;

  public piePercentageOfA: any;
  public piePercentageOfB: any;
  public piePercentageOfC: any;
  public piePercentageOfIP: any;
  public piePercentageOfRP: any;

  public totalEmployeeCount: number;
  public finalFirstPieChartArray: any = [];
  pieChartArrayWithGrade = [];
  public pageTitle: string;
  public isDarkTheme: boolean;
  public isInitialLoad: boolean;
  public themeEmitter: any;
  constructor(
    private adapter: TeamDashboardAdapter,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private globalEventsManager: GlobalEventsManager
  ) {
    this.pageTitle = TooltioHeaderDiRectreportsToDateProgressivePie;
    this.themeEmitter= this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;     
        if(this.isInitialLoad){
          this.getPieChartForHorizontalStack(this.todayDirectReport)
        }
      } else {
        this.isDarkTheme = false;
        if(this.isInitialLoad){
          this.getPieChartForHorizontalStack(this.todayDirectReport)
        }
      }
    })
  }

  ngOnInit() {    
    this.getPieChartForHorizontalStack(this.todayDirectReport)
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  /**
     * Author :  Sonal Patil
     * ModifiedBy : Mihir Patel
     * Modified-Date :  6-3-2019
     * Description : Emit value to dashboard component for remove widget by id.
  */
  onclickremoveTile() {
    this.removeTile.emit(DashboardPassHeaderName.DirectReportsToDateProgressivePie);
  }

  /**
   * Author : Sonal Patil
   * Modified by : Anjali Tandel
   * Modified-Date : 05/03/2020
   * Description : Emit value to dashboard component for redirect to employeelist from dashboard.
   */
  public callgoToEmployeeListPage(grade: string): void {
    this.redirectedToList.emit(this.adapter.dashboardRedirectionParam(widgetType.directWidgetId, grade));
  }

  /**
     * Author : Mihir Patel
     * Modified-Date :  6-3-2019
     * Description : Create Pie chart for Horizontal stack bar graph.
  */
  getPieChartForHorizontalStack(todayDirectReport) {
    this.isInitialLoad = true;
    this.todayDirectReport = todayDirectReport;
    this.pieStatckTotalCountOfA = 0;
    this.pieStatckTotalCountOfB = 0;
    this.pieStatckTotalCountOfC = 0;
    this.pieStatckTotalCountOfIP = 0;
    this.pieStatckTotalCountOfRP = 0;

    this.piePercentageOfA = 0;
    this.piePercentageOfB = 0;
    this.piePercentageOfC = 0;
    this.piePercentageOfIP = 0;
    this.piePercentageOfRP = 0;
    this.todayDirectReport.forEach(element => {
      if (element.TodayDirectRptRank === GraphGrade.A) {
        this.pieStatckTotalCountOfA = element.TodayDirectRptCnt;
      } else if (element.TodayDirectRptRank === GraphGrade.B) {
        this.pieStatckTotalCountOfB = element.TodayDirectRptCnt;
      } else if (element.TodayDirectRptRank === GraphGrade.C) {
        this.pieStatckTotalCountOfC = element.TodayDirectRptCnt;
      } else if (element.TodayDirectRptRank === GraphGrade.RP) {
        this.pieStatckTotalCountOfRP = element.TodayDirectRptCnt;
      } else if (element.TodayDirectRptRank === GraphGrade.IP) {
        this.pieStatckTotalCountOfIP = element.TodayDirectRptCnt;
      }
    });
    this.totalEmployeeCount = this.pieStatckTotalCountOfA + this.pieStatckTotalCountOfB + this.pieStatckTotalCountOfC + this.pieStatckTotalCountOfRP + this.pieStatckTotalCountOfIP;

    if (!!this.pieStatckTotalCountOfA) {
      this.piePercentageOfA = Math.round(100 * this.pieStatckTotalCountOfA / this.totalEmployeeCount);
    }
    if (!!this.pieStatckTotalCountOfB) {
      this.piePercentageOfB = Math.round(100 * this.pieStatckTotalCountOfB / this.totalEmployeeCount);
    }
    if (!!this.pieStatckTotalCountOfC) {
      this.piePercentageOfC = Math.round(100 * this.pieStatckTotalCountOfC / this.totalEmployeeCount);
    }
    if (!!this.pieStatckTotalCountOfIP) {
      this.piePercentageOfIP = Math.round(100 * this.pieStatckTotalCountOfIP / this.totalEmployeeCount);
    }
    if (!!this.pieStatckTotalCountOfRP) {
      this.piePercentageOfRP = Math.round(100 * this.pieStatckTotalCountOfRP / this.totalEmployeeCount);
    }
    if (this.piePercentageOfIP === 0) {
      this.piePercentageOfIP = null;
    }
    if (this.piePercentageOfA === 0) {
      this.piePercentageOfA = null;
    }
    if (this.piePercentageOfB === 0) {
      this.piePercentageOfB = null;
    }
    if (this.piePercentageOfC === 0) {
      this.piePercentageOfC = null;
    }
    if (this.piePercentageOfRP === 0) {
      this.piePercentageOfRP = null;
    }

    this.finalFirstPieChartArray = [
      [this.pieStatckTotalCountOfIP + '', this.piePercentageOfIP],
      [this.pieStatckTotalCountOfA + '', this.piePercentageOfA],
      [this.pieStatckTotalCountOfB + '', this.piePercentageOfB],
      [this.pieStatckTotalCountOfC + '', this.piePercentageOfC],
      [this.pieStatckTotalCountOfRP + '', this.piePercentageOfRP]
    ]
    // let pieChartArrayWithGrade = [];
    this.pieChartArrayWithGrade = [
      ['IP:' + this.pieStatckTotalCountOfIP + '', this.piePercentageOfIP],
      ['A:' + this.pieStatckTotalCountOfA + '', this.piePercentageOfA],
      ['B:' + this.pieStatckTotalCountOfB + '', this.piePercentageOfB],
      ['C:' + this.pieStatckTotalCountOfC + '', this.piePercentageOfC],
      ['RP:' + this.pieStatckTotalCountOfRP + '', this.piePercentageOfRP]
    ]
    Highcharts.theme = {
      colors: [GraphColor.IP_Player, GraphColor.A_Player, GraphColor.B_Player, GraphColor.C_Player, GraphColor.RP_Player]
    };
    let backGroundColor = this.isDarkTheme? GraphBackgroundColor.DarkBackGround : GraphBackgroundColor.LightBackGround;
    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);

    Highcharts.chart('fistPieContainer', {
      chart: {
        // plotBackgroundColor: '#151515', //color change for theme 
        backgroundColor: backGroundColor,
        plotBorderWidth: 0,
        plotShadow: false
      },
      title: {
        text: '',
        align: 'center',
        verticalAlign: 'middle',
        y: 40
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -30,
            style: {
              color: GraphColor.white,
              textOutline: 'none'
            }
          },
          startAngle: 0,
          endAngle: 360,
          center: ['50%', '50%']
        },
        series: {
          pointWidth: 25,
          cursor: 'pointer',
          point: {
            events: {
              click: function (event) {
                if (this.role === RoleEnum.TriggerAdmin) {
                  return;
                } else {
                  let grade = '';
                  const color = event.point.color;
                  if (color === GraphColor.A_Player) {
                    grade = GraphGrade.A;
                  } else if (color === GraphColor.B_Player) {
                    grade = GraphGrade.B;
                  } else if (color === GraphColor.C_Player) {
                    grade = GraphGrade.C;
                  } else if (color === GraphColor.RP_Player) {
                    grade = GraphGrade.RP;
                  } else if (color === GraphColor.IP_Player) {
                    grade = GraphGrade.IP;
                  }
                  sessionStorage.setItem(Encryption.SelectedDimensionArray, '');
                  sessionStorage.setItem(Encryption.SelectedDepartment, '0');
                  sessionStorage.setItem(Encryption.SelectedEmpStatus, '0');
                  sessionStorage.setItem(Encryption.ManagerAction, '');
                  sessionStorage.setItem(Encryption.ScoreTitle, '');
                  this.callgoToEmployeeListPage(grade);
                }
              }.bind(this)
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Percentage',
        innerSize: '50%',
        data: this.finalFirstPieChartArray
      }]
    });
  }
}