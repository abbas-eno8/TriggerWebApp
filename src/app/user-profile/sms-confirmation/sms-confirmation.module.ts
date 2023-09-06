/**
 * description :SmsConfirmationModule is created for sms-confirmation.
 * @author : Anjali Tandel
 * @class : SmsConfirmationModule
 */
import { NgModule } from '@angular/core';
// ........................................//
import { SmsConfirmationRoutingModule } from './sms-confirmation-routing.module';
import { SmsConfirmationComponent } from './sms-confirmation.component';
import { CounterComponent } from './counter.component';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
    imports: [
        SharedModule,
        SmsConfirmationRoutingModule,
    ],
    declarations: [
        SmsConfirmationComponent,
        CounterComponent
    ]
})
export class SmsConfirmationModule { }
