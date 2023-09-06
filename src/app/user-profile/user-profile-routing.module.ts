/**
 * @author Mihir Patel
 * @class  UserProfileRoutingModule
 * This module contain with User profile and sms-confirmation routes.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { AuthGuard } from '../core/auth-guard.service';
import { RouteUrl, LoadChildren, Role } from '../core/magic-string/common.model';

const USERPROFILE_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                component: UserProfileComponent
            },
            {
                path: '',
                children: [
                    {
                        path: RouteUrl.SmsConfirmation,
                        loadChildren: './sms-confirmation/sms-confirmation.module#SmsConfirmationModule',
                        data: { role: [Role.Admin, Role.TriggerAdmin, Role.Manager, Role.Executive] }
                    }
                ]
            }
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(USERPROFILE_ROUTES)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class UserProfileRoutingModule { }
