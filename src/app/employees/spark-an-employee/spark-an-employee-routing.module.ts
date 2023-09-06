/**
 * @author Anjali Tandel
 * @class  SparkAnEmployeeRoutingModule
 * This module consists of all spark-an-employee's routes. Note that RouterModule is configured using forChild().
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SparkListContainer } from './spark-list-container/spark-list.container';
const SPARKANEMPLOYEE_ROUTS: Routes = [
  {
    path: '',
    component: SparkListContainer
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(SPARKANEMPLOYEE_ROUTS)],
  exports: [RouterModule]
})
export class SparkAnEmployeeRoutingModule { }
