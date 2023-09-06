/**
 * @author Mihir Patel
 * @class  EmployeeRoutingModule
 * This module consists of all employee's routes. Note that RouterModule is configured using forChild().
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { RouteUrl, LoadChildren, Role } from '../core/magic-string/common.model';
import { TeamMemberContainer } from './team-member/team-member-container/team-member.container';
const EMPLOYEE_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        data: { role: [Role.TriggerAdmin, Role.Admin, Role.Manager, Role.Executive] },
        component: TeamMemberContainer
    },
    {
        path: RouteUrl.AddEmployee,
        canActivate: [AuthGuard],
        loadChildren: './add-employee/add-employee.module#AddEmployeeModule',
        data: { role: [Role.TriggerAdmin, Role.Admin] },
    },
    {
        path: RouteUrl.InvidualEmployee,
        canActivate: [AuthGuard],
        loadChildren: './individual-employee/individual-employee.module#IndividualEmployeeModule',
        data: { role: [Role.Admin, Role.Manager, Role.Executive] },
    },
    {
        path: RouteUrl.SparkAnEmployee,
        canActivate: [AuthGuard],
        loadChildren: './spark-an-employee/spark-an-employee.module#SparkAnEmployeeModule',
        data: { role: [Role.TriggerAdmin, Role.Admin, Role.Manager, Role.Executive] },
    }
    // {
    //     path: '',
    //     children: [
    //         {
    //             path: '',
    //             canActivate: [AuthGuard],
    //             data: { role: [Role.TriggerAdmin, Role.Admin, Role.Manager, Role.Executive] },
    //             component: TeamMemberContainer
    //         },
    //         {
    //             path: '',
    //             canActivateChild: [AuthGuard],
    //             children: [
    //                 {
    //                     path: RouteUrl.AddEmployee,
    //                     loadChildren: './add-employee/add-employee.module#AddEmployeeModule',
    //                     data: { role: [Role.TriggerAdmin, Role.Admin] },
    //                 },
    //                 {
    //                     path: RouteUrl.InvidualEmployee,
    //                     loadChildren: './individual-employee/individual-employee.module#IndividualEmployeeModule',
    //                     data: { role: [Role.Admin, Role.Manager, Role.Executive] },
    //                 },
    //                 {
    //                     path: RouteUrl.SparkAnEmployee,
    //                     loadChildren: './spark-an-employee/spark-an-employee.module#SparkAnEmployeeModule',
    //                     data: { role: [Role.TriggerAdmin, Role.Admin, Role.Manager, Role.Executive] },
    //                 }
    //             ]
    //         }
    //     ]
    // }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(EMPLOYEE_ROUTES)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
