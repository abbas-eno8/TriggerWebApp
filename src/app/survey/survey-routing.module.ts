import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { Role, RouteUrl } from '../core/magic-string/common.model';
import { SurveyListContainer } from './survey-list-container/survey-list-container';
import { SurveyFormContainer } from './survey-form-container/survey-form-container';
import { SurveyPreviewContainer } from './survey-preview-containern/survey-preview-containern';
import { SurveyDetailsContainer } from './survey-details-container/survey-details.container';

const SURVEY_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: SurveyListContainer,
        data: { role: [Role.TriggerAdmin, Role.Admin, Role.Executive, Role.Manager, Role.Employee] }
    },

    {
        path: RouteUrl.AddSurvey,
        canActivate: [AuthGuard],
        component: SurveyFormContainer,
    },
    {
        path: RouteUrl.EditSurvey,
        canActivate: [AuthGuard],
        component: SurveyFormContainer,
    },
    {
        path: RouteUrl.PreviewSurvey,
        canActivate: [AuthGuard],
        component: SurveyPreviewContainer,
    },
    {
        path: RouteUrl.SurveyDetails,
        canActivate: [AuthGuard],
        component: SurveyDetailsContainer,
        data: { role: [Role.TriggerAdmin, Role.Admin] },
    }
    // {
    //     path: '',
    //     children: [
    //         {
    //             path: '',
    //             canActivate: [AuthGuard],
    //             component: SurveyListContainer,
    //             data: { role: [Role.TriggerAdmin, Role.Admin, Role.Executive, Role.Manager, Role.Employee] }
    //         },
    //         {
    //             path: '',
    //             canActivateChild: [AuthGuard],
    //             children: [
    //                 {
    //                     path: RouteUrl.AddSurvey,
    //                     component: SurveyFormContainer,
    //                 },
    //                 {
    //                     path: RouteUrl.EditSurvey,
    //                     component: SurveyFormContainer,
    //                 },
    //                 {
    //                     path: RouteUrl.PreviewSurvey,
    //                     component: SurveyPreviewContainer,
    //                 },
    //                 {
    //                     path: RouteUrl.SurveyDetails,
    //                     component: SurveyDetailsContainer,
    //                     data: { role: [Role.TriggerAdmin, Role.Admin] },
    //                 }
    //             ]
    //         }
    //     ]
    // }
];

@NgModule({
    imports: [RouterModule.forChild(SURVEY_ROUTES)],
    exports: [RouterModule]
})
export class SurveyRoutingModule { }
