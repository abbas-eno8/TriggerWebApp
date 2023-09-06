import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsListContainer } from './teams-list-container/teams-list.container';
import { AuthGuard } from '../core/auth-guard.service';
import { RouteUrl, Role } from '../core/magic-string/common.model';
import { TeamsFormContainer } from './teams-form-container/teams-form.container';

const TEAMS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: TeamsListContainer,
    data: { role: [Role.TriggerAdmin, Role.Admin, Role.Manager, Role.Executive] },
  },
  {
    path: RouteUrl.AddTeam,
    canActivate: [AuthGuard],
    component: TeamsFormContainer,
  },
  {
    path: RouteUrl.EditTeam,
    canActivate: [AuthGuard],
    component: TeamsFormContainer,
  }
  // {
  //     path: '',
  //     children: [
  //         {
  //             path: '',
  //             canActivate: [AuthGuard],
  //             component: TeamsListContainer,
  //             data: { role: [Role.TriggerAdmin, Role.Admin, Role.Manager, Role.Executive] },
  //         },
  //         {
  //             path: '',
  //             canActivateChild: [AuthGuard],
  //             children: [
  //                 {
  //                     path: RouteUrl.AddTeam,
  //                     component: TeamsFormContainer,
  //                 },
  //                 {
  //                     path: RouteUrl.EditTeam,
  //                     component: TeamsFormContainer,
  //                 }
  //             ]
  //         }
  //     ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(TEAMS_ROUTES)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
