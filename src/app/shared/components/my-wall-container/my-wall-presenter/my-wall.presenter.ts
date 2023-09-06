import { Injectable, ComponentRef, HostListener } from '@angular/core';
import { OverlayConfig, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject, Observable } from 'rxjs';
import { ToasterService } from 'angular2-toaster';
// ---------------------------------------------------------- //
import { LikePresentation } from '../my-wall-presentation/like-presentation/like.presentation';
import { LikeEmoji, SparkRecations, ReactionType, MyWallEmoji, AddReaction, AddComment, TooltipHover, MyWallSparks, SparkComment, ReactionRequest } from '../../../../my-wall/my-wall.model';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { UserModel } from '../../../../core/model/user';
import { Error_Type, Error_Title, ThemeClass } from '../../../../core/magic-string/common.model';
import { LoaderService } from '../../../../core/loader/loader.service';
import { MyWallAdapter } from '../../../services/my-wall-adapter/my-wall-adapter';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { DateTimeConverterService } from '../../../services/date-time-converter/date-time-converter.service';
import { SparkUsersComponent } from '../my-wall-presentation/spark-users/spark-users.component';

@Injectable()
export class MyWallPresenter {
  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;
  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;
  private reactions: MyWallEmoji[];
  private sparkRecations: SparkRecations[];

  private addReact: Subject<AddReaction> = new Subject();
  addReact$: Observable<AddReaction> = this.addReact.asObservable();

  private addComment: Subject<AddComment> = new Subject();
  addComment$: Observable<AddComment> = this.addComment.asObservable();

  private deleteReact: Subject<AddReaction> = new Subject();
  deleteReact$: Observable<AddReaction> = this.deleteReact.asObservable();

  private getUserSpark: Subject<boolean> = new Subject();
  getUserSpark$: Observable<boolean> = this.getUserSpark.asObservable();

  private getUser: UserModel;
  private isDefaultWhiteTheme: boolean;
  //https://stackoverflow.com/questions/29956925/function-to-get-scroll-position-and-scroll-maximum-size-not-working
  @HostListener("window:scroll", ["$event"])
  onScroll() {
    var scrollTop = document.getElementById('my-wall-container').scrollTop;
    var offsetHeight = document.getElementById('my-wall-container').offsetHeight;
    var scrollHeight = document.getElementById('my-wall-container').scrollHeight;
    if ((scrollTop + offsetHeight) > scrollHeight) {
      this.getUserSpark.next(true);
    }
  }
  constructor(
    private adapter: MyWallAdapter,
    private focusTrapFactory: FocusTrapFactory,
    private globalEventsManager: GlobalEventsManager,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private overlay: Overlay,
    private toasterService: ToasterService,
    private dateTimeConverterService: DateTimeConverterService
  ) {
    this.getUser = this.globalResponseHandlerService.getUser();
  }

  getRections(reactions: ReactionType[]): void {
    this.reactions = LikeEmoji;
    let getEmoji;
    reactions.forEach(r => {
      getEmoji = this.reactions.find(e => e.id === r.reactTypeId);
      getEmoji.image = r.reactTypeImgPath;
      getEmoji = [];
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Gllobal check response handler & throw Error/Success message.
   */
  public checkResponse(response: any): any[] {
    if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
      return response.data;
    } else {
      return [];
    }
  }

  public getGroupedSparkResponse(userSpark: any[]) {
    const groupedSpark = userSpark.reduce((entryMap, e) =>
      entryMap.set(e.groupSparkRandomNumber, [...entryMap.get(e.groupSparkRandomNumber) || [], e]),
      new Map()
    );
    return groupedSpark;
  }

  public isDefaultTheme(): boolean {
    this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      this.isDefaultWhiteTheme = status;
    });
    return this.isDefaultWhiteTheme;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 24-04-2020
   * Description : Open email-confiramtion modal popup.
   */
  public openModal(sparkRecations: SparkRecations[]): void {
    if (sparkRecations.length > 0) {
      this.getReactionsCounts(sparkRecations);
      let config = new OverlayConfig({
        panelClass: this.isDefaultWhiteTheme ? ThemeClass.Black : ThemeClass.White,
        hasBackdrop: true,
        backdropClass: '',
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
      });
      this.overlayRef = this.overlay.create(config);
      this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(LikePresentation));
      this.focusTrapFactory.create(this.overlayRef.overlayElement);
      this.componentOverlayRef.instance.sparkRecations = this.sparkRecations;
      this.componentOverlayRef.instance.listOfEmoji = this.reactions;
      this.componentOverlayRef.instance.cancel.subscribe(isCancel => {
        this.overlayRef.dispose();
      });
    }
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 26-07-2022
   * Description : Open spark users modal popup.
   */
  public openSparkUserModel(sparkUsers: any, sparkCount: number): void {
    let config = new OverlayConfig();
    config.panelClass = this.isDefaultWhiteTheme ? ThemeClass.Black : ThemeClass.White;
    config.hasBackdrop = true;
    config.backdropClass = '';
    config.positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();

    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(SparkUsersComponent));
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.componentOverlayRef.instance.sparkUsers = sparkUsers;
    this.componentOverlayRef.instance.sparkCount = sparkCount;
    this.componentOverlayRef.instance.cancel.subscribe(isCancel => {
      this.overlayRef.dispose();
    });
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
    });
  }

  private getReactionsCounts(sparkRecations: SparkRecations[]): void {
    this.sparkRecations = sparkRecations;
    const groupById = sparkRecations.reduce((acc, it) => {
      acc[it.reactType] = acc[it.reactType] + 1 || 1;
      return acc;
    }, {});
    this.reactions.find(e => {
      e.isDisplay = (groupById[e.id] ? true : false);
      e.count = groupById[e.id];
    });
  }

  public deleteReaction(sparkGroupId, myReactId: number, sparkId: number, commentId: number): void {
    if (myReactId > 0) {
      let object = new AddReaction(sparkGroupId, sparkId, myReactId, commentId, this.getUser.empId);
      this.deleteReact.next(object);
    } else {
      this.addReaction(sparkGroupId, sparkId, commentId, 1);
    }
  }

  public addReaction(sparkGroupId: number, sparkId: number, commentId: number = 0, reactTypeId: number): void {
    let object = new AddReaction(sparkGroupId, sparkId, reactTypeId, commentId, this.getUser.empId);
    this.addReact.next(object);
  }

  public updateCommentOnAdd(spark: MyWallSparks, object: any): MyWallSparks {
    object.commentDate = (this.dateTimeConverterService.getLocalDateTimeFromUtcDateTime(new Date(object.commentDate))).toString();
    let addObject = new SparkComment(object.sparkId, object.commentId,
      object.comment, object.parentCommentId, object.commentDate, this.getUser.userProfile, this.getUser.firstName, this.getUser.lastName,
      0, 0, [], [], []);
    if (spark.sparkId === object.sparkId) {
      if (object.parentCommentId > 0) {
        let existingComment = spark.comments.find(e => e.commentId === object.parentCommentId);
        existingComment.remarks.push(addObject);
        //existingComment.remarks.splice(0, 0, addObject);
        existingComment.model = '';
      } else {
        //spark.comments.splice(0, 0, addObject);
        if (spark.comments.length === 0) {
          let commentTooltip = new TooltipHover(this.getUser.firstName, this.getUser.lastName, 0, 0);
          spark.commentTooltip.push(commentTooltip);
        }
        spark.comments.push(addObject);
        spark.model = '';
        spark.commentCount += 1;
        spark.countOfSparkComment = spark.commentCount;
      }
    }
    spark.totalCount += 1;
    spark.moreCommentTooltipCount = spark.totalCount > 1 ? (spark.totalCount - 1) : 0;
    return spark;
  }

  public updateRecordOnReaction(spark: MyWallSparks, object: AddReaction, isdeletedRecord: boolean = false): MyWallSparks {
    if (spark.sparkId === object.sparkId) {
      if (object.commentId > 0) {
        let existingComment = spark.comments.find(e => e.commentId === object.commentId);
        if (existingComment) {
          existingComment = this.updateSparkReaction(existingComment, object, isdeletedRecord);
        }
        spark.comments.forEach(c => {
          let existingCommentbyParentCommentID = c.remarks.find(r => r.commentId === object.commentId);
          if (existingCommentbyParentCommentID) {
            existingCommentbyParentCommentID = this.updateSparkReaction(existingCommentbyParentCommentID, object, isdeletedRecord);
          }
        });
      } else {
        spark = this.updateSparkReaction(spark, object, isdeletedRecord);
      }
    }
    return spark;
  }

  private updateSparkReaction(spark, object: AddReaction, isdeletedRecord: boolean = false): any {
    spark.myReactId = object.reactType;
    let existingRecord = spark.reactionTooltip.find(r => r.reactedBy === object.reactedBy);
    if (isdeletedRecord) {
      const index: number = spark.reactionTooltip.indexOf(existingRecord);
      if (index !== -1) {
        spark.reactionTooltip.splice(index, 1);
        spark.countReaction -= 1;
        object.reactType = 0;
      }
    } else {
      if (existingRecord) {
        existingRecord.reactType = object.reactType;
        spark.isMyReactIdDefault = object.reactType === 0 ? true : false;
      } else {
        spark.countReaction += 1;
        let tooltipObject = new TooltipHover(this.getUser.firstName, this.getUser.lastName, object.reactType, object.reactedBy);
        spark.reactionTooltip.push(tooltipObject);
      }
    }
    spark.isMyReactIdDefault = object.reactType === 0 ? true : false;
    spark.reactionEmoji = this.adapter.bindTopImages(spark.reactionTooltip);
    spark.myReactActiveClass = LikeEmoji.find(c => c.id === object.reactType).htmlActiveClass;
    spark.myReactName = LikeEmoji.find(c => c.id === object.reactType).name;
    spark.myReactId = object.reactType;
    return spark;
  }


  public updateSparksReactions(spark: MyWallSparks, object: SparkRecations[], commentId: number): MyWallSparks {
    if (commentId > 0) {
      let existingComment = spark.comments.find(e => e.commentId === commentId);
      if (existingComment) {
        existingComment = this.updateReactions(existingComment, object);
      } else {
        spark.comments.forEach(c => {
          let existingCommentbyParentCommentID = c.remarks.find(r => r.commentId === commentId);
          if (existingCommentbyParentCommentID) {
            existingCommentbyParentCommentID = this.updateReactions(existingCommentbyParentCommentID, object);
            return spark;
          }
        });
      }
    } else {
      spark = this.updateReactions(spark, object);
    }
    return spark;
  }

  private updateReactions(spark: any, object: SparkRecations[]): any {
    if (object.length > 0) {
      spark.countReaction = object.length;
      spark.reactionEmoji = [];
      spark.reactionEmoji = this.adapter.bindTopImages(object);
      spark.reactionTooltip = [];
      spark.reactionTooltip = this.adapter.bindTopSparkReactions(object);
      return spark;
    } else {
      spark.countReaction = 0;
      spark.reactionEmoji = [];
      spark.reactionTooltip = [];
      return spark;
    }
  }

  public onEnterComment(event: any, sparkGroupId: number, sparkId: number, parentCommentId = 0): boolean {
    if (event && event.target.value && event.target.value.trim() !== '') {
      let object = new AddComment(sparkGroupId, sparkId, event.target.value.trim(), parentCommentId, this.getUser.empId);
      this.addComment.next(object);
      return true;
    } else {
      this.loaderService.emitIsLoaderShown(false);
      //this.toasterService.pop(Error_Type, Error_Title, 'Please Enter text.');
      return false;
    }
  }

  public getEmoji(id: number): string {
    if (this.reactions) {
      let getImage = this.reactions.find(e => e.id === id);
      return getImage ? getImage.image : '';
    }
    return '';
  }
}