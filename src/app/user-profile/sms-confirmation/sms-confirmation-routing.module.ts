/**
 * @author Anjali Tandel
 * @class  SmsConfirmationRoutingModule
 * This module consists of sms-confirmation routes. Note that RouterModule is configured using forChild().
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// --------------------------------------- //
import { SmsConfirmationComponent } from './sms-confirmation.component';
import { AuthGuard } from '../../core/auth-guard.service';

const SMSCONFIRMATION_ROUTES: Routes = [
    {
        path: '',
        component: SmsConfirmationComponent
    }

];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SMSCONFIRMATION_ROUTES)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class SmsConfirmationRoutingModule { }
