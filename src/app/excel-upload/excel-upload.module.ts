/**
@author : Anjali Tandel
@class : ExcelUploadModule
@description :ExcelUploadModule is created for assessment page, which contain ExcelUploadComponent.
**/
import { NgModule } from '@angular/core';
// ........................................ //
import { SharedModule } from '../shared/shared.module';
import { ExcelUploadRoutingModule } from './excel-upload.routing.module';
import { ExcelUploadService } from './excel-upload-service/excel-upload.service';
import { ExcelUploadComponent } from './excel-upload.component';
import { ExcelMismatchComponent } from './excel-mismatch/excel-mismatch.component';
import { ExcelImportNewEmployeeComponent } from './excel-import-new-employee/excel-import-new-employee.component';
import { ExcelImportReadDataComponent } from './excel-import-read-data/excel-import-read-data.component';
import { MultiStepWizardComponent } from './multi-step-wizard/multi-step-wizard.component';
import { ExcelReviewEmployeesComponent } from './excel-review-employees/excel-review-employees.component';
import { ExcelUploadHeaderComponent } from './excel-upload-header/excel-upload-header.component';
import { ExcelUploadPresenter } from './excel-upload-presenter/excel-upload.presenter';
import { ExcelUploadAdapter } from './excel-adapter/excel-adapter';

@NgModule({
  imports: [
    SharedModule,
    ExcelUploadRoutingModule
  ],
  declarations: [
    ExcelUploadComponent,
    ExcelMismatchComponent,
    ExcelReviewEmployeesComponent,
    ExcelImportNewEmployeeComponent,
    ExcelImportReadDataComponent,
    MultiStepWizardComponent,
    ExcelUploadHeaderComponent
  ],
  providers: [
    ExcelUploadService,
    ExcelUploadPresenter,
    ExcelUploadAdapter
  ],
  entryComponents:[
    ExcelUploadHeaderComponent,
    MultiStepWizardComponent,
    ExcelImportReadDataComponent,
    ExcelReviewEmployeesComponent,
    ExcelImportNewEmployeeComponent,
    ExcelMismatchComponent
  ]
})
export class ExcelUploadModule { }