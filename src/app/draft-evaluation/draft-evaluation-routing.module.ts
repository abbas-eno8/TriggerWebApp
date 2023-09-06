/**
 * @author Shahbaz Shaikh
 * @description Draft Evaluation routing module file
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// --------------------------------------------- //
import { AuthGuard } from '../core/auth-guard.service';
import { Role } from '../core/magic-string/common.model';
import { DraftEvalutionContainerComponent } from './draft-evalution-container/draft-evalution.container';

/** Set the module route */
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DraftEvalutionContainerComponent,
        canActivate: [AuthGuard],
        data: { role: [Role.Admin, Role.Executive, Role.Manager, Role.Employee] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DraftEvaluationRoutingModule { }
