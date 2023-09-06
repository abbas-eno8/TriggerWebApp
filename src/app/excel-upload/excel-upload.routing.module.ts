/**
 * @author Anjali Tandel
 * @class  ExcelUploadRoutingModule
 * This module consists of all assessment routes. Note that RouterModule is configured using forChild().
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// --------------------------------------- //
import { AuthGuard } from '../core/auth-guard.service';
import { ExcelUploadComponent } from './excel-upload.component';

const EXCELUPLOAD_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ExcelUploadComponent
  }
  
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EXCELUPLOAD_ROUTES)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class ExcelUploadRoutingModule { }
