/**
 * @author Mihir Patel
 * @class  AssessmentRoutingModule
 * This module consists of all assessment routes. Note that RouterModule is configured using forChild().
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// --------------------------------------- //
import { AuthGuard } from '../core/auth-guard.service';
import { AssessmentComponent } from './assessment.component';
import { AssessmentScoreComponent } from './assessment-score/assessment-score.component';
import { RouteUrl, Role } from '../core/magic-string/common.model';
import { CanDeactivateGuard } from '../core/can-deactivate-guard.service';

const ASSESSMNET_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: AssessmentComponent,
        data: { role: [Role.Manager, Role.Executive, Role.Admin] }
      },
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: AssessmentComponent,
            data: { role: [Role.Manager, Role.Executive, Role.Admin] }
          },
          {
            path: RouteUrl.TriggerScore,
            component: AssessmentScoreComponent,
            data: {
              role: [Role.Manager, Role.Executive, Role.Admin]
            },
            canDeactivate: [CanDeactivateGuard]
          }
        ]
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(ASSESSMNET_ROUTES)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
