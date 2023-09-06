/**
@author : Sonal Patil
@class : OrgToDateCircularPieComponent
@description :OrgToDateCircularPieComponent is created for dashboard separation.
**/
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Encryption } from '../../../core/magic-string/common-validation-model';
import { RoleEnum, Route } from '../../../core/magic-string/common.model';
import { TooltioHeaderOrgToDateCircularPie } from '../../../shared/tooltip/tooltip-model';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { GraphGrade, DashboardPassHeaderName, GraphColor, RedirectionParam, widgetType, GraphBackgroundColor } from '../manager-dashboard-model';
import { TeamDashboardAdapter } from '../../dashboard-adapter/dashboard-adapter';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';

@Component({
  selector: '[trigger-org-to-date-circular-pie].col-xl-6 .col-sm-12 .grid-item .px-0[id=org-to-date-circular-pie]',
  templateUrl: './org-to-date-circular-pie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgToDateCircularPieComponent implements OnInit {
  @Input() bulbTootlip: any;
  @Input() selectedYearBinding: any;
  @Input() role: any;
  @Input() todayOrgtReport: any;
  @Input() isShowIPGrade: boolean;

  @Output() removeTile = new EventEmitter<string>();
  @Output() redirectedToList = new EventEmitter<RedirectionParam>();
  @Output() redirectedToTeamMembers = new EventEmitter<string>();

  public totalCountOfA: any;
  public totalCountOfB: any;
  public totalCountOfC: any;
  public totalCountOfIP: any;
  public totalCountOfRP: any;
  public circularPieTotalCountOfA: number;
  public circularPieTotalCountOfB: number;
  public circularPieTotalCountOfC: number;
  public circularPieTotalCountOfIP: number;
  public circularPieTotalCountOfRP: number;

  public circularPiePercentageOfA: any;
  public circularPiePercentageOfB: any;
  public circularPiePercentageOfC: any;
  public circularPiePercentageOfIP: any;
  public circularPiePercentageOfRP: any;
  public totalCountOfSecondPie: number;
  public finalSeconPieChartArray: any = [];
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
    this.pageTitle = TooltioHeaderOrgToDateCircularPie;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
        if (this.isInitialLoad) {
          this.getPieChartForCircularGraph(this.todayOrgtReport)
        }
      } else {
        this.isDarkTheme = false;
        if (this.isInitialLoad) {
          this.getPieChartForCircularGraph(this.todayOrgtReport)
        }
      }
    })
  }

  ngOnInit() {
    this.getPieChartForCircularGraph(this.todayOrgtReport)
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
    this.removeTile.emit(DashboardPassHeaderName.OrgToDateCircularPie);
  }

  /**
   * Author : Sonal Patil
   * Modified by : Anjali Tandel
   * Modified-Date : 05/03/2020
   * Description : Emit value to dashboard component for redirect to employeelist from dashboard.
   */
  public callonClickmyOrgToDate(grade: string): void {
    this.redirectedToList.emit(this.adapter.dashboardRedirectionParam(widgetType.organizationWidgetId, grade));
  }

  /**
     * Author : Mihir Patel
     * Modified-Date :  6-3-2019
     * Description : Create pie chart for circular graph.
  */
  getPieChartForCircularGraph(todayOrgtReport) {
    this.isInitialLoad = true;
    this.todayOrgtReport = todayOrgtReport;
    this.circularPieTotalCountOfA = 0;
    this.circularPieTotalCountOfB = 0;
    this.circularPieTotalCountOfC = 0;
    this.circularPieTotalCountOfIP = 0;
    this.circularPieTotalCountOfRP = 0;

    this.circularPiePercentageOfA = 0;
    this.circularPiePercentageOfB = 0;
    this.circularPiePercentageOfC = 0;
    this.circularPiePercentageOfIP = 0;
    this.circularPiePercentageOfRP = 0;

    this.totalCountOfA = '';
    this.totalCountOfB = '';
    this.totalCountOfC = '';
    this.totalCountOfRP = '';
    this.totalCountOfIP = '';

    this.todayOrgtReport.forEach(element => {
      if (element.TodayOrgRptRank === GraphGrade.A) {
        this.circularPieTotalCountOfA = element.TodayOrgRptCnt;
        this.totalCountOfA = element.TodayOrgRptCnt;
      } else if (element.TodayOrgRptRank === GraphGrade.B) {
        this.circularPieTotalCountOfB = element.TodayOrgRptCnt;
        this.totalCountOfB = element.TodayOrgRptCnt;
      } else if (element.TodayOrgRptRank === GraphGrade.C) {
        this.circularPieTotalCountOfC = element.TodayOrgRptCnt;
        this.totalCountOfC = element.TodayOrgRptCnt;
      } else if (element.TodayOrgRptRank === GraphGrade.RP) {
        this.circularPieTotalCountOfRP = element.TodayOrgRptCnt;
        this.totalCountOfRP = element.TodayOrgRptCnt;
      } else if (element.TodayOrgRptRank === GraphGrade.IP) {
        this.circularPieTotalCountOfIP = element.TodayOrgRptCnt;
        this.totalCountOfIP = element.TodayOrgRptCnt;
      }
    });

    this.totalCountOfSecondPie = this.circularPieTotalCountOfA + this.circularPieTotalCountOfB + this.circularPieTotalCountOfC + this.circularPieTotalCountOfRP + this.circularPieTotalCountOfIP;

    if (!!this.circularPieTotalCountOfA) {
      this.circularPiePercentageOfA = Math.round(100 * this.circularPieTotalCountOfA / this.totalCountOfSecondPie);
      this.circularPiePercentageOfA = this.circularPiePercentageOfA !== 0 ? this.circularPiePercentageOfA : 1;
    }
    if (!!this.circularPieTotalCountOfB) {
      this.circularPiePercentageOfB = Math.round(100 * this.circularPieTotalCountOfB / this.totalCountOfSecondPie);
      this.circularPiePercentageOfB = this.circularPiePercentageOfB !== 0 ? this.circularPiePercentageOfB : 1;
    }
    if (!!this.circularPieTotalCountOfC) {
      this.circularPiePercentageOfC = Math.round(100 * this.circularPieTotalCountOfC / this.totalCountOfSecondPie);
      this.circularPiePercentageOfC = this.circularPiePercentageOfC !== 0 ? this.circularPiePercentageOfC : 1;
    }
    if (!!this.circularPieTotalCountOfIP) {
      this.circularPiePercentageOfIP = Math.round(100 * this.circularPieTotalCountOfIP / this.totalCountOfSecondPie);
      this.circularPiePercentageOfIP = this.circularPiePercentageOfIP !== 0 ? this.circularPiePercentageOfIP : 1;
    }
    if (!!this.circularPieTotalCountOfRP) {
      this.circularPiePercentageOfRP = Math.round(100 * this.circularPieTotalCountOfRP / this.totalCountOfSecondPie);
      this.circularPiePercentageOfRP = this.circularPiePercentageOfRP !== 0 ? this.circularPiePercentageOfRP : 1;
    }

    if (this.circularPiePercentageOfIP === 0) {
      this.circularPiePercentageOfIP = null;
    }
    if (this.circularPiePercentageOfA === 0) {
      this.circularPiePercentageOfA = null;
    }
    if (this.circularPiePercentageOfB === 0) {
      this.circularPiePercentageOfB = null;
    }
    if (this.circularPiePercentageOfC === 0) {
      this.circularPiePercentageOfC = null;
    }
    if (this.circularPiePercentageOfRP === 0) {
      this.circularPiePercentageOfRP = null;
    }

    this.finalSeconPieChartArray = [
      [this.circularPieTotalCountOfIP + '', this.circularPiePercentageOfIP],
      [this.circularPieTotalCountOfA + '', this.circularPiePercentageOfA],
      [this.circularPieTotalCountOfB + '', this.circularPiePercentageOfB],
      [this.circularPieTotalCountOfC + '', this.circularPiePercentageOfC],
      [this.circularPieTotalCountOfRP + '', this.circularPiePercentageOfRP]
    ]

    this.pieChartArrayWithGrade = [
      ['IP:' + this.circularPieTotalCountOfIP + '', this.circularPiePercentageOfIP],
      ['A:' + this.circularPieTotalCountOfA + '', this.circularPiePercentageOfA],
      ['B:' + this.circularPieTotalCountOfB + '', this.circularPiePercentageOfB],
      ['C:' + this.circularPieTotalCountOfC + '', this.circularPiePercentageOfC],
      ['RP:' + this.circularPieTotalCountOfRP + '', this.circularPiePercentageOfRP]
    ]

    Highcharts.theme = {
      colors: [GraphColor.IP_Player, GraphColor.A_Player, GraphColor.B_Player, GraphColor.C_Player, GraphColor.RP_Player]
    };
    let backGroundColor = this.isDarkTheme ? GraphBackgroundColor.DarkBackGround : GraphBackgroundColor.LightBackGround;
    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);

    Highcharts.chart('secondPieContainer', {
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
                  // const p = event.point.name
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
                  this.callonClickmyOrgToDate(grade)
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
        data: this.finalSeconPieChartArray
      }]
    });
  }
}
