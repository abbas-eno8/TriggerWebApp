/**
@author : Anjali Tandel
@class : DepartmentRoutingModule
@description :DepartmentRoutingModule is created for department routes
**/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//  ................................................ //
import { AuthGuard } from '../core/auth-guard.service';
import { DepartmentComponent } from './department.component';
import { Role } from '../core/magic-string/common.model';

const DEPARTMENT_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: DepartmentComponent,
        data: { role: [Role.TriggerAdmin, Role.Admin] },
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DEPARTMENT_ROUTES)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class DepartmentRoutingModule { }
