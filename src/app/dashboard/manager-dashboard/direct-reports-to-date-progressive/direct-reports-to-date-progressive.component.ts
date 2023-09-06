/**
@author : Sonal Patil
@class : DirectReportsToDateProgressiveComponent
@description :DirectReportsToDateProgressiveComponent is created for dashboard separation.
**/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GraphGrade, DashboardPassHeaderName, RedirectionParam, widgetType } from '../manager-dashboard-model';
import { TooltioHeaderDirectReportsToDateProgressive } from '../../../shared/tooltip/tooltip-model';
import { TeamDashboardAdapter } from '../../dashboard-adapter/dashboard-adapter';

@Component({
    selector: '[trigger-direct-reports-to-date-progressive].col-xl-6 .col-sm-12 .grid-item .px-0[id=direct-reports-to-date-progressive]',
    templateUrl: './direct-reports-to-date-progressive.component.html'
})
export class DirectReportsToDateProgressiveComponent implements OnInit {
    @Input() bulbTootlip: any;
    @Input() selectedYearBinding: any;
    @Input() role: string;
    @Input() todayDirectReport: any;
    @Input() isShowIPGrade: boolean;

    @Output() removeTile = new EventEmitter<string>();
    @Output() redirectedToList = new EventEmitter<RedirectionParam>();

    public stackPercentageOfA: number;
    public stackPercentageOfB: number;
    public stackPercentageOfC: number;
    public stackPercentageOfIP: number;
    public stackPercentageOfRP: number;

    public statckTotalCountOfIP: number;
    public statckTotalCountOfA: number;
    public statckTotalCountOfB: number;
    public statckTotalCountOfC: number;
    public statckTotalCountOfRP: number;

    public pieStatckTotalCountOfA: any;
    public pieStatckTotalCountOfB: any;
    public pieStatckTotalCountOfC: any;
    public pieStatckTotalCountOfIP: any;
    public pieStatckTotalCountOfRP: any;
    public statckArray: any;
    public totalEmployeeCount: number;
    public pageTitle: string;
    constructor(private adapter: TeamDashboardAdapter) {
        this.pageTitle = TooltioHeaderDirectReportsToDateProgressive;
    }

    ngOnInit() {
        this.getHorizontalSatckBar(this.todayDirectReport);
    }

    /**
       * Author : Sonal Patil
       * ModifiedBy : Mihir Patel
       * Modified-Date :  6-3-2019
       * Description : Emit value to dashboard component for remove widget by id.
       */
    onclickremoveTile() {
        this.removeTile.emit(DashboardPassHeaderName.DirectReportsToDateProgressive);
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
       * Modified-Date :  19-12-2018
       * Description : Creating Horizontal stack bar graph.
       */
    getHorizontalSatckBar(todayDirectReport) {
        this.todayDirectReport = todayDirectReport;
        this.statckArray = [];
        this.statckTotalCountOfA = 0;
        this.statckTotalCountOfB = 0;
        this.statckTotalCountOfC = 0;
        this.statckTotalCountOfRP = 0;
        this.statckTotalCountOfIP = 0;

        this.stackPercentageOfA = 0;
        this.stackPercentageOfB = 0;
        this.stackPercentageOfC = 0;
        this.stackPercentageOfIP = 0;
        this.stackPercentageOfRP = 0;

        this.pieStatckTotalCountOfA = 0;
        this.pieStatckTotalCountOfB = 0;
        this.pieStatckTotalCountOfC = 0;
        this.pieStatckTotalCountOfIP = 0;
        this.pieStatckTotalCountOfRP = 0;

        this.todayDirectReport.forEach(element => {
            if (element.TodayDirectRptRank === GraphGrade.A) {
                this.statckTotalCountOfA = element.TodayDirectRptCnt;
                this.pieStatckTotalCountOfA = element.TodayDirectRptCnt;
            } else if (element.TodayDirectRptRank === GraphGrade.B) {
                this.statckTotalCountOfB = element.TodayDirectRptCnt;
                this.pieStatckTotalCountOfB = element.TodayDirectRptCnt;
            } else if (element.TodayDirectRptRank === GraphGrade.C) {
                this.statckTotalCountOfC = element.TodayDirectRptCnt;
                this.pieStatckTotalCountOfC = element.TodayDirectRptCnt;
            } else if (element.TodayDirectRptRank === GraphGrade.RP) {
                this.statckTotalCountOfRP = element.TodayDirectRptCnt;
                this.pieStatckTotalCountOfRP = element.TodayDirectRptCnt;
            } else if (element.TodayDirectRptRank === GraphGrade.IP) {
                this.statckTotalCountOfIP = element.TodayDirectRptCnt;
                this.pieStatckTotalCountOfIP = element.TodayDirectRptCnt;
            }
            this.statckArray.push(element.TodayDirectRptCnt);
        });
        this.totalEmployeeCount = this.statckTotalCountOfA + this.statckTotalCountOfB + this.statckTotalCountOfC + this.statckTotalCountOfRP + this.statckTotalCountOfIP;

        let stackMaxValue = Math.max.apply(null, this.statckArray);
        if (!!this.statckTotalCountOfA) {
            this.stackPercentageOfA = Math.round(100 * this.statckTotalCountOfA / stackMaxValue);
        }
        if (!!this.statckTotalCountOfB) {
            this.stackPercentageOfB = Math.round(100 * this.statckTotalCountOfB / stackMaxValue);
        }
        if (!!this.statckTotalCountOfC) {
            this.stackPercentageOfC = Math.round(100 * this.statckTotalCountOfC / stackMaxValue);
        }
        if (!!this.statckTotalCountOfIP) {
            this.stackPercentageOfIP = Math.round(100 * this.statckTotalCountOfIP / stackMaxValue);
        }
        if (!!this.statckTotalCountOfRP) {
            this.stackPercentageOfRP = Math.round(100 * this.statckTotalCountOfRP / stackMaxValue);
        }
    }
}