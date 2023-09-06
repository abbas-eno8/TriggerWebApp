/**
 * @author Mihir Patel
 * @class  UserProfileRoutingModule
 * This module consists of User profile
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';
import { AuthGuard } from '../core/auth-guard.service';

const CHANGEPASSWORD_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ChangePasswordComponent
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CHANGEPASSWORD_ROUTES)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }
