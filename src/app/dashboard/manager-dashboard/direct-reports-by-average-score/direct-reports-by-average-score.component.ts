/**
@author : Sonal Patil
@class : DirectReportsByAverageScoreComponent
@description :DirectReportsByAverageScoreComponent is created for dashboard separation.
**/
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { GraphGrade, GraphColor, DashboardPassHeaderName, linGraphs, GraphBackgroundColor, GraphYAxisLabelColor, GraplineColor } from '../manager-dashboard-model';
import { TooltioHeaderDirectReportsByAverageScore } from '../../../shared/tooltip/tooltip-model';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
@Component({
    selector: '[trigger-direct-reports-by-average-score].col-xl-6 .col-sm-12 .grid-item .px-0[id=direct-reports-by-average-score]',
    templateUrl: './direct-reports-by-average-score.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectReportsByAverageScoreComponent implements OnInit {
    @Input() bulbTootlip: any;
    @Input() selectedYearBinding: any;
    @Input() role: any;
    @Input() directReportRankGraphArray: any;

    @Output() removeTile = new EventEmitter<string>();
    
    public value: any = [];
    public isIpGrade: boolean;
    //public areaOneSeriesArray: any;
    public graphData: any;
    public areaOneXAxis: any;
    public pageTitle: string;
    public isDarkTheme: boolean;
    public isInitialLoad: boolean;
    public themeEmitter: any;
    
    constructor(private globalEventsManager: GlobalEventsManager) {
        this.pageTitle = TooltioHeaderDirectReportsByAverageScore;
        this.isInitialLoad = false;
        this.themeEmitter= this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
            if (status) {
                this.isDarkTheme = true;
                if (this.isIpGrade === true || this.isIpGrade === false) {
                    this.getFirstAreaChart(this.directReportRankGraphArray);
                }
            } else {
                this.isDarkTheme = false;
                if (this.isInitialLoad && (this.isIpGrade === true || this.isIpGrade === false)) {
                    this.getFirstAreaChart(this.directReportRankGraphArray);
                }
            }
        })
    }

    ngOnInit() {
        if (this.isIpGrade === true || this.isIpGrade === false) {
            this.isInitialLoad = true;
            this.getFirstAreaChart(this.directReportRankGraphArray);
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
        this.removeTile.emit(DashboardPassHeaderName.DirectReportsByAverageScore);
    }

    /**
       * Author : Mihir Patel
       * Modified-Date :  19-12-2018
       * Description : Create first area chart.
       */
    getFirstAreaChart(directReportRankGraphArray) {
        this.directReportRankGraphArray = directReportRankGraphArray;
        this.graphData = [];
        this.areaOneXAxis = [];
        this.directReportRankGraphArray.forEach(data => {
            this.areaOneXAxis.push(data.directAvgMonYr);
            if (data.directAvgScoreRank === '') {
                this.graphData.push({
                    y: 0,
                    grade: '0',
                    xAxis: data.directAvgMonYr
                });
            } else {
                linGraphs.forEach(model => {
                    if (model.grade === data.directAvgScoreRank) {
                        model.xAxis = data.directAvgMonYr;
                        this.graphData.push(model);
                    }
                })
            }
        })
        let backGroundColor = this.isDarkTheme ? GraphBackgroundColor.DarkBackGround : GraphBackgroundColor.LightBackGround;
        let labelColor = this.isDarkTheme ? GraphYAxisLabelColor.DarkLabel : GraphYAxisLabelColor.LightLabel;
        let lineColor = this.isDarkTheme ? GraplineColor.DarkLine : GraplineColor.LightLine;
        this.value = [0, 1, 2, 3, 4, 5];
        if (this.isIpGrade === true) {
            Highcharts.chart('firstAreaContainer', {
                chart: {
                    type: 'area',
                    // backgroundColor: '#697d9f' //color change for theme 
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
                    categories: this.areaOneXAxis
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
                    data: this.graphData
                }]
            });
        }
        if (this.isIpGrade === false) {
            Highcharts.chart('firstAreaContainer', {
                chart: {
                    type: 'area',
                    backgroundColor: backGroundColor
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: '',
                },

                xAxis: {
                    lineColor: lineColor,
                    categories: this.areaOneXAxis
                },

                yAxis: {
                    gridLineColor: lineColor,
                    min: 0, max: 5,
                    title: {
                        text: ''
                    },

                    labels:
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
                    data: this.graphData
                }]
            });
        }
    }
}
