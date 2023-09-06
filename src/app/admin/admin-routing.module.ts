/**
@author : Anjali Tandel
@class : AdminRoutingModule
@description :AdminRoutingModule is created for admin routes.
**/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { AdminComponent } from './admin.component';
import { RouteUrl, LoadChildren, Role } from '../core/magic-string/common.model';
const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { role: [Role.TriggerAdmin] }
  },
  {
    path: RouteUrl.AddAdmin,
    canActivate: [AuthGuard],
    loadChildren: './add-admin/add-admin.module#AddAdminModule',
    data: { role: [Role.TriggerAdmin] }
  },
  {
    path: RouteUrl.EditAdmin,
    canActivate: [AuthGuard],
    loadChildren: './add-admin/add-admin.module#AddAdminModule',
    data: { role: [Role.TriggerAdmin] }
  }

  // {
  //   path: '',
  //   children: [
  //     {
  //       path: '',
  //       canActivate: [AuthGuard],
  //       component: AdminComponent,
  //       data: { role: [Role.TriggerAdmin] }
  //     },
  //     {
  //       path: '',
  //       canActivateChild: [AuthGuard],
  //       children: [
  //         {
  //           path: RouteUrl.AddAdmin,
  //           loadChildren: './add-admin/add-admin.module#AddAdminModule',
  //           data: { role: [Role.TriggerAdmin] }
  //         },
  //         {
  //           path: RouteUrl.EditAdmin,
  //           loadChildren: './add-admin/add-admin.module#AddAdminModule',
  //           data: { role: [Role.TriggerAdmin] }
  //         }
  //       ]
  //     }
  //   ]
  // }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
