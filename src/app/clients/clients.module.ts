/**
 * description :ClientsModule is created for clients page.
 * @author : Mihir Patel
 * @class : ClientsModule
 */
import { NgModule } from '@angular/core';
// ........................................//
import { ClientsComponent } from './clients.component';
import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientTableComponent } from './client-list/client-table/client-table.component';
import { ClientAccordionTableComponent } from './client-list/client-accordion-table/client-accordion-table.component';
@NgModule({
  imports: [
    ClientRoutingModule,
    SharedModule
  ],
  declarations: [
    ClientsComponent,
    ClientListComponent,
    ClientTableComponent,
    ClientAccordionTableComponent
  ]
})
export class ClientsModule { }
