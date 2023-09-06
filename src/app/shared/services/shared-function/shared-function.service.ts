/**
@author : Anjali Tandel
@class : SharedFunctionService
@description : SharedFunctionService is created for shared method which is using in 2 or more components.
**/
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { dashboardClass, dashboardClassByGrade, GraphId } from '../../../core/magic-string/common.model';
@Injectable()
export class SharedFunctionService {

  private gradeId: number[] = [GraphId.RP, GraphId.C_Minus, GraphId.C, GraphId.C_Plus, GraphId.B_Minus, GraphId.B, GraphId.B_Plus, GraphId.A_Minus, GraphId.A, GraphId.A_Plus, GraphId.IP]

  constructor(
    private datePipe: DatePipe
  ) {
  }


  public getCategories(isMyDashboard: boolean = false): string[] {
    let categories: string[];
    categories = ['0'];
    this.gradeId.forEach((e) => {
      if (isMyDashboard) {
        categories.push(this.getMyDashboardGradeSummary(e));
      } else {
        categories.push(this.getGradeSummary(e));
      }
    });
    return categories;
  }

  private getGradeSummary(id: number): string {
    let gradeSummary: dashboardClassByGrade = dashboardClass.find(d => d.id === id);
    return `<div class="grow-right d-flex"><div>${gradeSummary.grade}</div><div class="grow-p-l">${gradeSummary.summary}</div></div>`;
  }

  // private getMyDashboardGradeSummary(id: number): string {
  //   let gradeSummary: dashboardClassByGrade = dashboardClass.find(d => d.id === id);
  //   // return  `<div class="">${gradeSummary.summary}</div>`;
  //   return gradeSummary.summary;
  // }
  private getMyDashboardGradeSummary(id: number): string {
    let gradeSummary: dashboardClassByGrade = dashboardClass.find(d => d.id === id);
    return `<div class="graph-text text-right">${gradeSummary.summary}</div>`;
    //return gradeSummary.summary;
  }

  public getFormatedDate(date: any) {
    const fromDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'MM/dd/yyyy');
    const toDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'MM/dd/yyyy');
    return {
      fromDate,
      toDate
    }
  }
}
