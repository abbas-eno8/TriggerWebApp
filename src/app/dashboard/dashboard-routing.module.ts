/**
@author : Mihir Patel
@class : DashboardRoutingModule
@description :DashboardRoutingModule is created for route dashboard component, (As child route).
**/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//  ................................................ //
import { AuthGuard } from '../core/auth-guard.service';
import { DashboardComponent } from './dashboard.component';
const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: DashboardComponent,
        children:[
          {
            path:'', loadChildren:'../employees/spark-an-employee/spark-an-employee.module#SparkAnEmployeeModule'
          }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DASHBOARD_ROUTES)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
