/**
@author : Anjali Tandel
@class : ClientRoutingModule
@description :ClientRoutingModule is created for client routes.
**/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//  ................................................ //
import { AuthGuard } from '../core/auth-guard.service';
import { ClientsComponent } from './clients.component';
import { RouteUrl, LoadChildren, Role } from '../core/magic-string/common.model';
const CLIENT_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ClientsComponent,
        data: { role: [Role.TriggerAdmin] },
    },
    {
        path: RouteUrl.AddClient,
        canActivate: [AuthGuard],
        loadChildren: './add-client/add-client.module#AddClientModule',
        data: { role: [Role.TriggerAdmin] },
    },
    {
        path: RouteUrl.EditClient,
        canActivate: [AuthGuard],
        loadChildren: './add-client/add-client.module#AddClientModule',
        data: { role: [Role.Admin, Role.TriggerAdmin] },
    }
    // {
    //     path: '',
    //     children: [
    //         {
    //             path: '',
    //             canActivate: [AuthGuard],
    //             component: ClientsComponent,
    //             data: { role: [Role.Admin, Role.TriggerAdmin, Role.Manager, Role.Executive] },
    //         },
    //         {
    //             path: '',
    //             canActivateChild: [AuthGuard],
    //             children: [
    //                 {
    //                     path: RouteUrl.AddClient,
    //                     loadChildren: './add-client/add-client.module#AddClientModule',
    //                     data: { role: [Role.Admin, Role.TriggerAdmin] },
    //                 },
    //                 {
    //                     path: RouteUrl.EditClient,
    //                     loadChildren: './add-client/add-client.module#AddClientModule',
    //                     data: { role: [Role.Admin, Role.TriggerAdmin] },
    //                 }
    //             ]
    //         }
    //     ]
    // }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CLIENT_ROUTES)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
