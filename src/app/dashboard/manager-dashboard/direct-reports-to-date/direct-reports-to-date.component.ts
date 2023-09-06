/**
@author : Sonal Patil
@class : DirectReportsToDateComponent
@description :DirectReportsToDateComponent is created for dashboard separation.
**/
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';
// require('highcharts/highcharts-more')(Highcharts);
// require('highcharts/modules/solid-gauge')(Highcharts);
import * as _ from 'underscore';
import { GraphColor, GraphGrade, DashboardPassHeaderName, RedirectionParam, widgetType, GraphBackgroundColor, GraphYAxisLabelColor, GraplineColor } from '../manager-dashboard-model';
import { TooltioHeaderDirectReportsToDate } from '../../../shared/tooltip/tooltip-model';
import { RoleEnum } from '../../../core/magic-string/common.model';
import { Encryption } from '../../../core/magic-string/common-validation-model';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
@Component({
  selector: '[trigger-direct-reports-to-date].col-xl-6 .col-sm-12 .grid-item .px-0[id=direct-reports-to-date]',
  templateUrl: './direct-reports-to-date.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectReportsToDateComponent implements OnInit {
  @Input() bulbTootlip: any;
  @Input() selectedYearBinding: any;
  @Input() role: any;
  @Input() isMobileView: boolean;

  @Output() removeTile = new EventEmitter<string>();
  @Output() redirectedToList = new EventEmitter<RedirectionParam>();
  @Input() directReportPerGrapgArray: any;

  public pageTitle: string;
  public xAxisValue: any;
  public graphXAxisArray: any;
  public xAxisArray: any;
  public baseArray: any;
  public graphOneIPArray: any;
  public graphOneAArray: any;
  public graphOneBArray: any;
  public graphOneCArray: any;
  public graphOneRPArray: any;
  public isIpGrade: boolean;// Changed boolean varibale by Anjali Tandel - 09/-1/2020
  public isDarkTheme: boolean;
  public isInitialLoad: boolean;
  public themeEmitter: any;

  constructor(
    private globalEventsManager: GlobalEventsManager
  ) {
    this.pageTitle = TooltioHeaderDirectReportsToDate;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
        if (this.isIpGrade === true || this.isIpGrade === false) {
          this.getFirstColumnGraphs(this.directReportPerGrapgArray);
        }
      } else {
        this.isDarkTheme = false;
        if (this.isInitialLoad && (this.isIpGrade === true || this.isIpGrade === false)) {
          this.getFirstColumnGraphs(this.directReportPerGrapgArray);
        }
      }
    })
  }

  ngOnInit() {
    if (this.isIpGrade === true || this.isIpGrade === false) {
      this.isInitialLoad = true;
      this.getFirstColumnGraphs(this.directReportPerGrapgArray);
    }
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
    this.removeTile.emit(DashboardPassHeaderName.DirectReportsToDate);
  }

  /**
     * Author : Mihir Patel
     * Modified-Date :  6-3-2019
     * Description : Create first column graph.
     */
  getFirstColumnGraphs(directReportPerGrapgArray) {
    this.directReportPerGrapgArray = directReportPerGrapgArray;
    this.xAxisValue = [];
    this.graphXAxisArray = [];
    this.directReportPerGrapgArray.forEach(element => {
      this.graphXAxisArray.push(element);
    });

    this.xAxisArray = _.uniq(this.graphXAxisArray, _.property('directMonYr'));
    this.xAxisArray.forEach(obj => {
      this.xAxisValue.push(obj.directMonYr);
    });

    this.baseArray = [];
    if (this.xAxisValue.length === 1) {
      this.baseArray = [0];
    } else if (this.xAxisValue.length === 2) {
      this.baseArray = [0, 0];
    } else if (this.xAxisValue.length === 3) {
      this.baseArray = [0, 0, 0];
    } else if (this.xAxisValue.length === 4) {
      this.baseArray = [0, 0, 0, 0];
    } else if (this.xAxisValue.length === 5) {
      this.baseArray = [0, 0, 0, 0, 0];
    } else if (this.xAxisValue.length === 6) {
      this.baseArray = [0, 0, 0, 0, 0, 0];
    } else if (this.xAxisValue.length === 7) {
      this.baseArray = [0, 0, 0, 0, 0, 0, 0];
    } else if (this.xAxisValue.length === 8) {
      this.baseArray = [0, 0, 0, 0, 0, 0, 0, 0];
    } else if (this.xAxisValue.length === 9) {
      this.baseArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else if (this.xAxisValue.length === 10) {
      this.baseArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else if (this.xAxisValue.length === 11) {
      this.baseArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else if (this.xAxisValue.length === 12) {
      this.baseArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    this.graphOneIPArray = Object.assign([], this.baseArray);
    this.graphOneAArray = Object.assign([], this.baseArray);
    this.graphOneBArray = Object.assign([], this.baseArray);
    this.graphOneCArray = Object.assign([], this.baseArray);
    this.graphOneRPArray = Object.assign([], this.baseArray);
    this.directReportPerGrapgArray.forEach((element) => {
      if (this.isIpGrade && element.directScoreRank === GraphGrade.IP) { // Added conidition by Anjali Tandel - 09/-1/2020
        this.xAxisValue.forEach((elem, index) => {
          if (elem === element.directMonYr) {
            this.graphOneIPArray[index] = element.directRptEmpCnt;
          }
        })
      } else if (element.directScoreRank === GraphGrade.A) {
        this.xAxisValue.forEach((elem, index) => {
          if (elem === element.directMonYr) {
            this.graphOneAArray[index] = element.directRptEmpCnt;
          }
        })
      } else if (element.directScoreRank === GraphGrade.B) {
        this.xAxisValue.forEach((elem, index) => {
          if (elem === element.directMonYr) {
            this.graphOneBArray[index] = element.directRptEmpCnt;
          }
        })
      } else if (element.directScoreRank === GraphGrade.C) {
        this.xAxisValue.forEach((elem, index) => {
          if (elem === element.directMonYr) {
            this.graphOneCArray[index] = element.directRptEmpCnt;
          }
        })
      } else if (element.directScoreRank === GraphGrade.RP) {
        this.xAxisValue.forEach((elem, index) => {
          if (elem === element.directMonYr) {
            this.graphOneRPArray[index] = element.directRptEmpCnt;
          }
        })
      }
    });
    let colmnWidth: number;
    if (this.isMobileView) {
      colmnWidth = 15;
    } else {
      colmnWidth = 25;
    }
    Highcharts.theme = {// Changed conidition by Anjali Tandel - 09/-1/2020
      colors: this.isIpGrade ? [GraphColor.IP_Player, GraphColor.A_Player, GraphColor.B_Player, GraphColor.C_Player, GraphColor.RP_Player] :
        [GraphColor.A_Player, GraphColor.B_Player, GraphColor.C_Player, GraphColor.RP_Player]
    };
    // Apply the theme
    let backGroundColor = this.isDarkTheme ? GraphBackgroundColor.DarkBackGround : GraphBackgroundColor.LightBackGround;
    let labelColor = this.isDarkTheme ? GraphYAxisLabelColor.DarkLabel : GraphYAxisLabelColor.LightLabel;
    let lineColor = this.isDarkTheme ? GraplineColor.DarkLine : GraplineColor.LightLine;
    Highcharts.setOptions(Highcharts.theme);
    if (this.isIpGrade) {// Changed conidition by Anjali Tandel - 09/-1/2020
      Highcharts.chart('firstColumncontainer', {
        chart: {
          type: 'column',
          // backgroundColor: '#140718'//color change for theme 
          backgroundColor: backGroundColor
        },
        title: {
          text: ''
        },
        xAxis: {
          lineColor: lineColor,
          categories: this.xAxisValue
        },
        yAxis: {
          gridLineColor: lineColor,
          min: 0,
          title: {
            text: ''
          },
          labels: {
            style: {
              color: labelColor
            },
          }
        },
        credits: {
          enabled: false
        },
        legend: {
          verticalAlign: 'top',
          backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || GraphColor.white,
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            borderWidth: 0,
          },
          series: {
            pointWidth: colmnWidth,
            cursor: 'pointer',
            point: {
              events: {
                click: function (event) {
                  if (this.role === RoleEnum.TriggerAdmin) {
                    return;
                  } else {
                    const p = event.point
                    sessionStorage.setItem(Encryption.SelectedDimensionArray, '');
                    sessionStorage.setItem(Encryption.SelectedDepartment, '0');
                    this.redirectedToList.emit(this.adapter.dashboardRedirectionParam(widgetType.directWidgetId, p.series.name, p.category));
                  }
                }.bind(this)
              }
            }
          }
        },
        series: [
          {
            name: GraphGrade.IP,
            data: this.graphOneIPArray,
            key: GraphGrade.IP
          },
          {
            name: GraphGrade.A,
            data: this.graphOneAArray,
            key: GraphGrade.A
          },
          {
            name: GraphGrade.B,
            data: this.graphOneBArray,
            key: GraphGrade.B
          }, {
            name: GraphGrade.C,
            data: this.graphOneCArray,
            key: GraphGrade.C
          }, {
            name: GraphGrade.RP,
            data: this.graphOneRPArray,
            key: GraphGrade.RP
          }]
      });
    } else {
      Highcharts.chart('firstColumncontainer', {
        chart: {
          type: 'column',
          // backgroundColor: '#140718'//color change for theme 
          backgroundColor: backGroundColor
        },
        title: {
          text: ''
        },
        xAxis: {
          lineColor: lineColor,
          categories: this.xAxisValue
        },
        yAxis: {
          gridLineColor: lineColor,
          min: 0,
          title: {
            text: ''
          },
          labels: {
            style: {
              color: labelColor
            },
          }
        },
        credits: {
          enabled: false
        },
        legend: {
          verticalAlign: 'top',
          backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || GraphColor.white,
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            borderWidth: 0,
          },
          series: {
            pointWidth: colmnWidth,
            cursor: 'pointer',
            point: {
              events: {
                click: function (event) {
                  if (this.role === RoleEnum.TriggerAdmin) {
                    return;
                  } else {
                    const p = event.point
                    sessionStorage.setItem(Encryption.SelectedDimensionArray, '');
                    sessionStorage.setItem(Encryption.SelectedDepartment, '0');
                    sessionStorage.setItem(Encryption.SelectedEmpStatus, '0');
                    sessionStorage.setItem(Encryption.ManagerAction, '');
                    sessionStorage.setItem(Encryption.ScoreTitle, '');
                    this.redirectedToList.emit(this.adapter.dashboardRedirectionParam(widgetType.directWidgetId, p.series.name, p.category));
                  }
                }.bind(this)
              }
            }
          }
        },
        series: [
          {
            name: GraphGrade.A,
            data: this.graphOneAArray,
            key: GraphGrade.A
          },
          {
            name: GraphGrade.B,
            data: this.graphOneBArray,
            key: GraphGrade.B
          }, {
            name: GraphGrade.C,
            data: this.graphOneCArray,
            key: GraphGrade.C
          }, {
            name: GraphGrade.RP,
            data: this.graphOneRPArray,
            key: GraphGrade.RP
          }]
      });
    }
  }
}
