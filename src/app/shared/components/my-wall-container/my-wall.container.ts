/**
@author : Anjali Tandel
@class : MyWallContainer
@description : MyWallContainer is parent presentation for public user-spark-module.
**/
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyWallService } from '../../../shared/services/my-wall-service/my-wall.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { ApiResponse } from '../../../core/magic-string/common.model';
import { LoaderService } from '../../../core/loader/loader.service';
import { AddReaction, AddComment, SparkPageSize, InitialPageIndex, CommentPageSize, ReactionRequest, SparkInitialPageSize } from '../../../my-wall/my-wall.model';

@Component({
  selector: 'trigger-my-wall-container',
  templateUrl: './my-wall.container.html'
})
export class MyWallContainer implements OnInit {
  /** This is a observable of calling sync API which passes the list of user-sparks to its presentation */
  public userSparks$: Observable<ApiResponse>;
  /** This is a observable of calling sync API which passes the list of user-sparks to its presentation */
  public subSparks$: Observable<ApiResponse>;
  /** This is a observable of calling sync API which passes the list of user-sparks to its presentation */
  public reactions$: Observable<ApiResponse>;//
  /** This is a observable of calling sync API which passes the list of user-sparks-comments to its presentation */
  public comments$: Observable<ApiResponse>
  /** This is a observable of calling sync API which passes the list of user-sparks-reactions to its presentation */
  public sparkReactions$: Observable<ApiResponse>;
  public updateCommentObject: any;
  public isUpdateReaction: boolean;

  constructor(
    private loaderService: LoaderService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private service: MyWallService
  ) {
    this.loaderService.emitIsLoaderShown(true);
  }

  ngOnInit() {
    this.getUserSparks(InitialPageIndex, SparkInitialPageSize);
    this.reactions$ = this.service.getReactions();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 20-04-2020
   * Description : Create event-method for invoke server call for get spark by pageNumber & pageSize.
   */
  public getUserSparks(pageNumber: number, pageSize: number = SparkPageSize): void {
    this.userSparks$ = this.service.getUserSparks(pageNumber, pageSize);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 20-04-2020
   * Description : Create event-method for invoke server call for get spark by pageNumber & pageSize.
   */
  public getSubSparks(spark: any, pageSize: number = 10): void {
    this.subSparks$ = this.service.getUserSubSparks(spark.sparkRandoNumber, spark.pageNumber, pageSize);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 20-04-2020
   * Description : Create event-method for invoke server call for get spark-recations by sparkId.
   */
  public getSparkReactionsById(data): void {
    this.sparkReactions$ = this.service.getSparkReactionsById(data[0], data[1]);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 20-04-2020
   * Description : Create event-method for invoke server call for get spark-comments by sparkId and page index and size.
   */
  public getSparkComments(data, pageSize: number = CommentPageSize): void {
    this.comments$ = this.service.getSparkComments(data[0], data[1], pageSize);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 20-04-2020
   * Description : Create event-method for invoke server call for add reactions for spark/comment/reply.
   */
  public addReaction(object: any): void {
    this.isUpdateReaction = false;
    this.service.addReaction(object).subscribe(
      (addReaction) => {
        if (this.globalResponseHandlerService.getApiResponse(addReaction, false)) {
          this.isUpdateReaction = true;
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 20-04-2020
   * Description : Create event-method for invoke server call for delete reactions for spark/comment/reply.
   */
  public deleteReaction(object: ReactionRequest): void {
    this.isUpdateReaction = false;
    this.service.deleteReaction(object).subscribe(
      (deleteReaction) => {
        if (this.globalResponseHandlerService.getApiResponse(deleteReaction, false)) {
          this.isUpdateReaction = true;
        }
      }
    );
  }

  /**
  * Author : Anjali Tandel
  * Created-Date : 20-04-2020
  * Description : Create event-method for invoke server call for add comments for spark/comment/reply.
  */
  public addComment(object: any): void {
    this.updateCommentObject = {};
    this.service.addComment(object).subscribe(
      (addComment) => {
        if (this.globalResponseHandlerService.getApiResponse(addComment, false)) {
          this.updateCommentObject = addComment.data;
        }
      }
    );
  }
}
