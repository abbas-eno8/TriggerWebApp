/**
@author : Sonal Patil
@class : OrgToDateComponent
@description :OrgToDateComponent is created for dashboard separation.
**/
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';
// require('highcharts/highcharts-more')(Highcharts);
// require('highcharts/modules/solid-gauge')(Highcharts);
import * as _ from 'underscore';
import { GraphGrade, GraphColor, GraphMonths, DashboardPassHeaderName, RedirectionParam, widgetType, GraphBackgroundColor, GraphYAxisLabelColor, GraplineColor } from '../manager-dashboard-model';
import { TooltioHeaderOrgToDate } from '../../../shared/tooltip/tooltip-model';
import { RoleEnum, Route } from '../../../core/magic-string/common.model';
import { Encryption } from '../../../core/magic-string/common-validation-model';
import { TeamDashboardAdapter } from '../../dashboard-adapter/dashboard-adapter';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';

@Component({
  selector: '[trigger-org-to-date].col-xl-6 .col-sm-12 .grid-item .px-0[id=org-to-date]',
  templateUrl: './org-to-date.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgToDateComponent implements OnInit {
  @Input() bulbTootlip: any;
  @Input() selectedYearBinding: any;
  @Input() role: any;
  @Input() isMobileView: boolean;
  @Input() orgReportPerGrapgArray: any;

  @Output() removeTile = new EventEmitter<string>();
  @Output() redirectedToList = new EventEmitter<RedirectionParam>();
  
  public pageTitle: string;
  public yAxisValue: any;
  public graphYAxisArray: any;
  public yAxisArray: any;
  public baseArrayForY: any;
  public graphTwoIPArray: any;
  public graphTwoAArray: any;
  public graphTwoBArray: any;
  public graphTwoCArray: any;
  public graphTwoRPArray: any;
  public isIpGrade: boolean;// Changed boolean varibale by Anjali Tandel - 09/-1/2020
  public isDarkTheme: boolean;
  public isInitialLoad: boolean;
  public themeEmitter: any;

  constructor(
    private globalEventsManager: GlobalEventsManager
  ) {
    this.pageTitle = TooltioHeaderOrgToDate;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;     
        if (this.isIpGrade === true || this.isIpGrade === false) {
          this.getSecondColumnGraph(this.orgReportPerGrapgArray);
        }
      } else {
        this.isDarkTheme = false;
        if(this.isInitialLoad && (this.isIpGrade === true || this.isIpGrade === false)){
          this.getSecondColumnGraph(this.orgReportPerGrapgArray);
        }
      }
    })
  }

  ngOnInit() {
    if (this.isIpGrade === true || this.isIpGrade === false) {
      this.isInitialLoad = true;
      this.getSecondColumnGraph(this.orgReportPerGrapgArray);
    }
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
    this.removeTile.emit(DashboardPassHeaderName.OrgToDate);
  }

  /**
     * Author : Mihir Patel
     * ModifiedBy : Mihir Patel
     * Modified-Date :  6-3-2019
     * Description : Create second column graph.
  */
  getSecondColumnGraph(orgReportPerGrapgArray) {
    this.orgReportPerGrapgArray = orgReportPerGrapgArray;
    this.yAxisValue = [];
    this.graphYAxisArray = [];
    this.orgReportPerGrapgArray.forEach(element => {
      this.graphYAxisArray.push(element);
    });

    this.yAxisArray = _.uniq(this.graphYAxisArray, _.property('orgMonYr'));
    this.yAxisArray.forEach(obj => {
      this.yAxisValue.push(obj.orgMonYr);
    });
    this.baseArrayForY = [];
    if (this.yAxisValue.length === 1) {
      this.baseArrayForY = [0];
    } else if (this.yAxisValue.length === 2) {
      this.baseArrayForY = [0, 0];
    } else if (this.yAxisValue.length === 3) {
      this.baseArrayForY = [0, 0, 0];
    } else if (this.yAxisValue.length === 4) {
      this.baseArrayForY = [0, 0, 0, 0];
    } else if (this.yAxisValue.length === 5) {
      this.baseArrayForY = [0, 0, 0, 0, 0];
    } else if (this.yAxisValue.length === 6) {
      this.baseArrayForY = [0, 0, 0, 0, 0, 0];
    } else if (this.yAxisValue.length === 7) {
      this.baseArrayForY = [0, 0, 0, 0, 0, 0, 0];
    } else if (this.yAxisValue.length === 8) {
      this.baseArrayForY = [0, 0, 0, 0, 0, 0, 0, 0];
    } else if (this.yAxisValue.length === 9) {
      this.baseArrayForY = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else if (this.yAxisValue.length === 10) {
      this.baseArrayForY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else if (this.yAxisValue.length === 11) {
      this.baseArrayForY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else if (this.yAxisValue.length === 12) {
      this.baseArrayForY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    this.graphTwoIPArray = Object.assign([], this.baseArrayForY);
    this.graphTwoAArray = Object.assign([], this.baseArrayForY);
    this.graphTwoBArray = Object.assign([], this.baseArrayForY);
    this.graphTwoCArray = Object.assign([], this.baseArrayForY);
    this.graphTwoRPArray = Object.assign([], this.baseArrayForY);

    this.orgReportPerGrapgArray.forEach(element => {
      if (this.isIpGrade && element.orgScoreRank === GraphGrade.IP) {// Changed conidition by Anjali Tandel - 09/-1/2020
        this.yAxisValue.forEach((elem, index) => {
          if (elem === element.orgMonYr) {
            this.graphTwoIPArray[index] = element.orgRptEmpCnt;
          }
        })
      } else if (element.orgScoreRank === GraphGrade.A) {
        this.yAxisValue.forEach((elem, index) => {
          if (elem === element.orgMonYr) {
            this.graphTwoAArray[index] = element.orgRptEmpCnt;
          }
        })
      } else if (element.orgScoreRank === GraphGrade.B) {
        this.yAxisValue.forEach((elem, index) => {
          if (elem === element.orgMonYr) {
            this.graphTwoBArray[index] = element.orgRptEmpCnt;
          }
        })
      } else if (element.orgScoreRank === GraphGrade.C) {
        this.yAxisValue.forEach((elem, index) => {
          if (elem === element.orgMonYr) {
            this.graphTwoCArray[index] = element.orgRptEmpCnt;
          }
        })
      } else if (element.orgScoreRank === GraphGrade.RP) {
        this.yAxisValue.forEach((elem, index) => {
          if (elem === element.orgMonYr) {
            this.graphTwoRPArray[index] = element.orgRptEmpCnt;
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
    let backGroundColor = this.isDarkTheme? GraphBackgroundColor.DarkBackGround : GraphBackgroundColor.LightBackGround;
    let labelColor = this.isDarkTheme ? GraphYAxisLabelColor.DarkLabel : GraphYAxisLabelColor.LightLabel;
    let lineColor = this.isDarkTheme ? GraplineColor.DarkLine : GraplineColor.LightLine;
    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);
    if (this.isIpGrade) {// Changed conidition by Anjali Tandel - 09/-1/2020
      Highcharts.chart('secondColumncontainer', {
        chart: {
          type: 'column',
          // backgroundColor: '#FE2E2E'//color change for theme 
          backgroundColor: backGroundColor
        },
        
        title: {
          text: ''
        },
        xAxis: {  
          lineColor: lineColor,
          categories: this.yAxisValue
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
                    this.redirectedToList.emit(this.adapter.dashboardRedirectionParam(widgetType.organizationWidgetId, p.series.name, p.category));
                  }
                }.bind(this)
              }
            }
          }
        },
        series: [
          {
            name: GraphGrade.IP,
            data: this.graphTwoIPArray
          }, {
            name: GraphGrade.A,
            data: this.graphTwoAArray
          },
          {
            name: GraphGrade.B,
            data: this.graphTwoBArray
          }, {
            name: GraphGrade.C,
            data: this.graphTwoCArray
          }, {
            name: GraphGrade.RP,
            data: this.graphTwoRPArray
          }]
      });
    } else {
      Highcharts.chart('secondColumncontainer', {
        chart: {
          type: 'column',
          // backgroundColor: '#FE2E2E' //color change for theme 
          backgroundColor: backGroundColor
        },
        title: {
          text: ''
        },
        xAxis: {
          lineColor: lineColor,
          categories: this.yAxisValue
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
                    const p = event.point;
                    sessionStorage.setItem(Encryption.SelectedDimensionArray, '');
                    sessionStorage.setItem(Encryption.SelectedDepartment, '0');
                    this.redirectedToList.emit(this.adapter.dashboardRedirectionParam(widgetType.organizationWidgetId, p.series.name, p.category));
                  }
                }.bind(this)
              }
            }
          }
        },
        series: [{
          name: GraphGrade.A,
          data: this.graphTwoAArray
        },
        {
          name: GraphGrade.B,
          data: this.graphTwoBArray
        }, {
          name: GraphGrade.C,
          data: this.graphTwoCArray
        }, {
          name: GraphGrade.RP,
          data: this.graphTwoRPArray
        }]
      });
    }
  }
}
