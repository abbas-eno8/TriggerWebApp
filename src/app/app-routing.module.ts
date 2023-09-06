/**
@author : Mihir Patel
@class : AppRouting
@description :AppRouting is created to define rout for root module, which is calling when app is intialize and run.
**/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// .......................................... //
import { AuthGuard } from './core/auth-guard.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { RouteUrl, LoadChildren, Role } from './core/magic-string/common.model';
import { CanDeactivateGuard } from './core/can-deactivate-guard.service';
import { PlatformCheckComponent } from './core/component/platform-check/platform-check.component';
import { UnauthorizePageComponent } from './core/component/unauthorize-page/unauthorize-page.component';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';
import { UserWorkLocationComponent } from './user-work-location/user-work-location.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot([
            { path: RouteUrl.AuthCallBack, component: AuthCallbackComponent },
            { path: '', redirectTo: RouteUrl.Client, pathMatch: 'full' },
            { path: RouteUrl.Admin, loadChildren: './admin/admin.module#AdminModule' },
            { path: RouteUrl.Client, loadChildren: './clients/clients.module#ClientsModule' },
            { path: RouteUrl.Employee, loadChildren: './employees/employees.module#EmployeesModule' },
            { path: RouteUrl.RecognitionWall, loadChildren: './my-wall/my-wall.module#MyWallModule', canActivate: [AuthGuard] },
            { path: RouteUrl.ExcelUpload, loadChildren: './excel-upload/excel-upload.module#ExcelUploadModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.TriggerAdmin] } },
            { path: RouteUrl.Department, loadChildren: './department/department.module#DepartmentModule', canActivate: [AuthGuard], data: { role: [Role.TriggerAdmin, Role.Admin] } },
            { path: RouteUrl.Dashboard, loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.TriggerAdmin, Role.Manager, Role.Executive, Role.Employee] } },
            { path: RouteUrl.TriggerEmployee, loadChildren: './assessment/assessment.module#AssessmentModule' },
            { path: RouteUrl.ChangePassword, loadChildren: './change-password/change-password.module#ChangePasswordModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.TriggerAdmin, Role.Manager, Role.Executive, Role.Employee] } },
            { path: RouteUrl.UserProfile, loadChildren: './user-profile/user-profile.module#UserProfileModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.Manager, Role.Executive, Role.Employee] } },
            { path: RouteUrl.ContactUs, loadChildren: './contact-us/contact-us.module#ContactUsModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.TriggerAdmin, Role.Manager, Role.Executive, Role.Employee] } },
            { path: RouteUrl.Dimension, loadChildren: './masters/masters.module#MasterModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.TriggerAdmin] } },
            { path: RouteUrl.Permission, loadChildren: './permissions/permissions.module#PermissionsModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.TriggerAdmin] } },
            { path: RouteUrl.Teams, loadChildren: './teams/teams.module#TeamsModule', canActivate: [AuthGuard], data: { role: [Role.TriggerAdmin, Role.Admin, Role.Manager, Role.Executive] } },
            { path: RouteUrl.SparkNotification, loadChildren: './spark-notification/spark-notification.module#SparkNotificationModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.Manager, Role.Executive] } },
            { path: RouteUrl.Spark, loadChildren: './spark/spark.module#SparkModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.Manager, Role.Executive] } },
            { path: RouteUrl.Survey, loadChildren: './survey/survey.module#SurveyModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.TriggerAdmin] } },
            { path: RouteUrl.ActiveSurvey, loadChildren: './survey/survey.module#SurveyModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.Executive, Role.Manager, Role.Employee] } },
            { path: RouteUrl.EvaluationsInDrafts, loadChildren: './draft-evaluation/draft-evaluation.module#DraftEvaluationModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.Executive, Role.Manager, Role.Employee] } },
            //{ path: RouteUrl.MyWall, loadChildren: './my-wall/my-wall.module#MyWallModule', canActivate: [AuthGuard], data: { role: [Role.Admin, Role.Manager, Role.Executive, Role.Employee] } },
            { path: RouteUrl.UnauthorizeAccess, component: UnauthorizePageComponent },
            { path: RouteUrl.PlatformCheck, component: PlatformCheckComponent },
            { path: RouteUrl.UpdateWorkLocation, component: UserWorkLocationComponent },
            { path: '**', component: PageNotFoundComponent }
        ]),
    ],
    providers: [CanDeactivateGuard],
    exports: [RouterModule]
})
export class AppRoutingModule { }

