/**
 * @author Shahbaz Shaikh
 * @description This is spark module file.
 */
import { NgModule } from '@angular/core';
// ----------------------------------------------------------------- //
import { SharedModule } from '../shared/shared.module';
import { SparkRoutingModule } from './spark-routing.module';
import { SparkContainerComponent } from './spark-container/spark-container.component';
import { SparkPresentationComponent } from './spark-container/spark-presentation/spark-presentation.component';
import { SparkService } from './service/spark.service';
import { SparkAdapter, SparkFiltersAdapter } from './adapter/spark.adapter';
import { GroupSparkListPresentationComponent } from './spark-container/group-spark-list-presentation/group-spark-list-presentation.component';
import { SparkSearchPipe } from './spark-search.pipe';

@NgModule({
  imports: [
    SharedModule,
    SparkRoutingModule
  ],
  declarations: [
    SparkContainerComponent, 
    SparkPresentationComponent, 
    GroupSparkListPresentationComponent,
    SparkSearchPipe
  ],
  providers: [
    SparkService,
    SparkAdapter,
    SparkFiltersAdapter
  ],
  entryComponents: [
    GroupSparkListPresentationComponent
  ]
})
export class SparkModule { }
