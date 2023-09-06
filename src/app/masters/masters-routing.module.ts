/**
 * @author Anjali Tandel
 * @class  MastersRoutingModule
 * This module consists of Master-dimension
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { MastersComponent } from './masters.component';

const MASTERS_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: MastersComponent
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MASTERS_ROUTES)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class MastersRoutingModule { }
