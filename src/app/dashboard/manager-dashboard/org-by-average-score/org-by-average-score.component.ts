/**
@author : Sonal Patil
@class : OrgByAverageScoreComponent
@description :OrgByAverageScoreComponent is created for dashboard separation.
**/
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { GraphGrade, GraphColor, DashboardPassHeaderName, linGraphs, GraphBackgroundColor, GraphYAxisLabelColor, GraplineColor } from '../manager-dashboard-model';
import { TooltioHeaderOrgByAverageScore } from '../../../shared/tooltip/tooltip-model';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';

@Component({
    selector: '[trigger-org-by-average-score].col-xl-6 .col-sm-12 .grid-item .px-0[id=org-by-average-score]',
    templateUrl: './org-by-average-score.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgByAverageScoreComponent implements OnInit {
    @Input() bulbTootlip: any;
    @Input() selectedYearBinding: any;
    @Input() role: any;
    @Input() orgReportRankGraphArray: any;
    
    @Output() removeTile = new EventEmitter<string>();
    
    public areaTwoSeriesArray: any;
    public areaTwoXAxis: any;
    public value: any = [];
    public pageTitle: string;
    public isIpGrade: boolean;
    public isInitialLoad: boolean;
    public isDarkTheme: boolean;
    public themeEmitter: any;
    constructor(private globalEventsManager: GlobalEventsManager) {
        this.pageTitle = TooltioHeaderOrgByAverageScore;
        this.isInitialLoad = false;
        this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
            if (status) {
              this.isDarkTheme = true;     
              if (this.isIpGrade === true || this.isIpGrade === false) {
                this.getSecondAreaChart(this.orgReportRankGraphArray);
            }
            } else {
              this.isDarkTheme = false;
              if(this.isInitialLoad && (this.isIpGrade === true || this.isIpGrade === false)){
                this.getSecondAreaChart(this.orgReportRankGraphArray);
              }
            }
          })
    }

    ngOnInit() {
        if (this.isIpGrade === true || this.isIpGrade === false) {
            this.isInitialLoad = true;
            this.getSecondAreaChart(this.orgReportRankGraphArray);
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
        this.removeTile.emit(DashboardPassHeaderName.OrgByAverageScore);
    }

    /**
       * Author : Mihir Patel
       * Modified-Date :  19-12-2018
       * Description : Creating Second Area chart.
    */
    getSecondAreaChart(orgReportRankGraphArray) {
        this.orgReportRankGraphArray = orgReportRankGraphArray;
        this.areaTwoSeriesArray = [];
        this.areaTwoXAxis = [];
        
        this.orgReportRankGraphArray.forEach(data => {
            this.areaTwoXAxis.push(data.orgAvgMonYr);
            if (data.orgAvgScoreRank === '') {
                this.areaTwoSeriesArray.push({
                    y: 0,
                    grade: '0',
                    xAxis: data.directAvgMonYr
                });
            } else {
                linGraphs.forEach(model => {
                    if (model.grade === data.orgAvgScoreRank) {
                        model.xAxis = data.orgAvgMonYr;
                        this.areaTwoSeriesArray.push(model);
                    }
                })
            }
        })
        
        let backGroundColor = this.isDarkTheme? GraphBackgroundColor.DarkBackGround : GraphBackgroundColor.LightBackGround;
        let labelColor = this.isDarkTheme ? GraphYAxisLabelColor.DarkLabel : GraphYAxisLabelColor.LightLabel;
        let lineColor = this.isDarkTheme ? GraplineColor.DarkLine : GraplineColor.LightLine;
        this.value = [0, 1, 2, 3, 4, 5];
        if (this.isIpGrade === true) {
            Highcharts.chart('graphContainer', {
                chart: {
                    type: 'area',
                    backgroundColor: backGroundColor //color change for theme 
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: '',
                },

                xAxis: {
                    lineColor: lineColor,
                    categories: this.areaTwoXAxis
                },

                yAxis: {
                    gridLineColor: lineColor,
                    min: 0, max: 5,
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            color: labelColor
                        },
                        formatter: function () {
                            if (this.value === 0) {
                                return '';
                            }
                            if (this.value === 1) {
                                return GraphGrade.RP;
                            }
                            if (this.value === 2) {
                                return GraphGrade.C;
                            }
                            if (this.value === 3) {
                                return GraphGrade.B;
                            }
                            if (this.value === 4) {
                                return GraphGrade.A;
                            }
                            if (this.value === 5) {
                                return GraphGrade.IP;
                            }
                        }
                    },
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            'Grade' + ': ' + this.point.grade;
                    }
                },
                plotOptions: {
                    series: {
                        fillColor: {
                            linearGradient: [0, 0, 0, 300],
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    marker: {
                        fillColor: GraphColor.Fill_Color,
                        lineWidth: 2,
                        lineColor: null // inherit from series
                    },
                    showInLegend: false,
                    data: this.areaTwoSeriesArray
                }]
            });
        }
        if (this.isIpGrade === false) {
            Highcharts.chart('graphContainer', {
                chart: {
                    type: 'area',
                    backgroundColor: backGroundColor //color change for theme 
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: '',
                },

                xAxis: {
                    lineColor: lineColor,
                    categories: this.areaTwoXAxis
                },

                yAxis: {
                    gridLineColor: lineColor,
                    min: 0, max: 5,
                    title: {
                        text: ''
                    },
                    labels:// this.categories
                        {
                            style: {
                                color: labelColor
                            },
                            formatter: function () {
                                if (this.value === 0) {
                                    return '';
                                }
                                if (this.value === 1) {
                                    return GraphGrade.RP;
                                }
                                if (this.value === 2) {
                                    return GraphGrade.C;
                                }
                                if (this.value === 3) {
                                    return GraphGrade.B;
                                }
                                if (this.value === 4) {
                                    return GraphGrade.A;
                                }
                                if (this.value === 5) {
                                    return '';
                                }
                            }
                        },
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            'Grade' + ': ' + this.point.grade;
                    }
                },
                plotOptions: {
                    series: {
                        fillColor: {
                            linearGradient: [0, 0, 0, 300],
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    marker: {
                        fillColor: GraphColor.Fill_Color,
                        lineWidth: 2,
                        lineColor: null // inherit from series
                    },
                    showInLegend: false,
                    data: this.areaTwoSeriesArray
                }]
            });
        }
    }
}
