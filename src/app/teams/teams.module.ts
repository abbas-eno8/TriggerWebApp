import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsAccordionPresentation } from './teams-list-container/teams-list-presentation/teams-accordion-presentation/teams-accordion.presentation';
import { TeamsDesktopPresentation } from './teams-list-container/teams-list-presentation/teams-desktop-presentation/teams-desktop.presentation';
import { TeamsListContainer } from './teams-list-container/teams-list.container';
import { TeamsListPresentation } from './teams-list-container/teams-list-presentation/teams-list.presentation';
import { TeamsHeaderPresentation } from './teams-list-container/teams-list-presentation/teams-header-presentation/teams-header.presentation';
import { SparkAnEmployeeService } from '../employees/spark-an-employee/spark-an-employee-service/spark-an-employee.service';
import { SparkAnEmployeeAdapter } from '../employees/spark-an-employee/spark-an-employee-adapter/spark-an-employee-adapter';
import { TeamsFormContainer } from './teams-form-container/teams-form.container';
import { TeamsFormPresentation } from './teams-form-container/teams-form-presentation/teams-form.presentation';
import { TeamsService } from './teams-service/teams.service';
import { TeamsListPresenter } from './teams-list-container/teams-list-presenter/teams-list.presenter';
import { TeamsListAdapter, TeamsFormAdapter } from './teams-adapter/teams-adapter';
import { TeamsFormPresenter } from './teams-form-container/teams-form-presenter/teams-form.presenter';

@NgModule({
  imports: [
    SharedModule,
    TeamsRoutingModule,
  ],
  declarations: [
    TeamsListContainer,
    TeamsListPresentation,
    TeamsAccordionPresentation,
    TeamsDesktopPresentation,
    TeamsHeaderPresentation,
    TeamsFormContainer,
    TeamsFormPresentation
  ],
  providers: [
    TeamsListAdapter,
    TeamsFormAdapter,
    TeamsListPresenter,
    TeamsFormPresenter,
    SparkAnEmployeeService,
    SparkAnEmployeeAdapter,
    TeamsService
],
  entryComponents: [
    TeamsAccordionPresentation,
    TeamsDesktopPresentation,
    TeamsFormPresentation
  ]
})
export class TeamsModule { }
