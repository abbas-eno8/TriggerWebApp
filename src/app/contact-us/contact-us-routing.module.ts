/**
 * @author Anjali Tandel
 * @class  ContactUsRoutingModule
 * This module consists of Contact us
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { ContactUsComponent } from './contact-us.component';

const CONTACTUS_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ContactUsComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(CONTACTUS_ROUTES)],
    exports: [RouterModule]
})
export class ContactUsRoutingModule { }
