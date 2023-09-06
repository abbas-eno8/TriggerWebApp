import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/auth-guard.service';
import { ManagerDashboardComponent } from './manager-dashboard.component';
const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ManagerDashboardComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
