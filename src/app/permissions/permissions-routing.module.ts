/**
 * @author Mihir Patel
 * @class  PermissionsRoutingModule
 * This module consists of system permissions routing
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { PermissionsComponent } from './permissions.component';

const PERMISSIONS_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: PermissionsComponent
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(PERMISSIONS_ROUTES)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class PermissionsRoutingModule { }
