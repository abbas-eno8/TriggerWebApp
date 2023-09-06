/**
 * @author Shahbaz Shaikh
 * @description This is spark routing module file.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// ----------------------------------------------------------- //
import { AuthGuard } from '../core/auth-guard.service';
import { SparkContainerComponent } from './spark-container/spark-container.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: SparkContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SparkRoutingModule { }
