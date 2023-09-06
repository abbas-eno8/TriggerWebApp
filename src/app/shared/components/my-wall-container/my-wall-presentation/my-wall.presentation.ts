import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { KeyValue } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment from 'moment';
// ------------------------------------------------------ //
import { MyWallPresenter } from '../my-wall-presenter/my-wall.presenter';
import {
  MyWallSparks, ReactionType, AddReaction, AddComment, SparkComment, SparkPageSize,
  InitialPageIndex, CommentPageSize, SparkRecations, ReactionRequest, SparkInitialPageSize
} from '../../../../my-wall/my-wall.model';
import { LoaderService } from '../../../../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { UserModel } from '../../../../core/model/user';
import { ScrollType } from '../../../../assessment/assessment-model';
import { DateTimeConverterService } from '../../../../shared/services/date-time-converter/date-time-converter.service';
import { Encryption } from '../../../../core/magic-string/common-validation-model';
import { CommonService } from '../../../../core/services/common/common.service';
@Component({
  selector: 'trigger-my-wall-ui',
  templateUrl: './my-wall.presentation.html',
  styleUrls: ['./my-wall.presentation.scss']
})
export class MyWallPresentation implements OnInit {
  @Input() isUpdateReaction: boolean;

  @Input() public set updateComment(value: any) {
    if (value) {
      this._updateComment = value;
    }
  }
  public get updateComment(): any {
    return this._updateComment;
  }

  /** This property is used for get user-sparks response from container component */
  @Input() public set userSpark(value: any) {
    if (value) {
      this.userSparksLength = value.data.length;

      const userSparksResponse = this.myWallPresenter.checkResponse(value);
      /** This logic merge upcoming new userSpark and merge in existing userSparks. And, Also remove duplicate data. */
      !!this._userSparks ? this._userSparks = this.meargeExistingRecord(userSparksResponse) : this._userSparks = userSparksResponse;
      if (this.userSparksLength === 0 && this.sparkPageNumber === InitialPageIndex) {
        this.isDisplayNoRecordFoundPage = true;
        this.loaderService.emitIsLoaderShown(false);
      } else {
        this.isDisplayNoRecordFoundPage = false;
        this.isInvokeNextSparkAPI =
          this.userSparksLength === SparkInitialPageSize
            || this.userSparksLength === SparkPageSize ? true : false;
        if (this._userSparks) {
          // When new post arrive,So old post and new post merge into array,
          // So we need to first clear old post array then we push new array
          this.userSparksList = [];

          this._userSparks.forEach(s => {

            this.userSparksList.push(s);
            s.sparks.forEach((item) => {
              if (this.sparkPageNumber > InitialPageIndex) {
                item.isDisplayCommentSection = false;
              }
              item.sparkDate = (this.dateTimeConverterService.getLocalDateTimeFromUtcDateTime(new Date(item.sparkDate))).toString();
            });
          });

          this.isSparksGetting = true;
          if (this.sparkPageNumber === InitialPageIndex) {
            if (this._userSparks && this._userSparks[0].sparks[0]) {
              this.getSparkComments.emit([this._userSparks[0].sparks[0].sparkId, InitialPageIndex]);
              this._userSparks[0].sparks[0].isDisplayMoreCommentText = (InitialPageIndex * CommentPageSize) < this._userSparks[0].sparks[0].countOfSparkComment ? false : true;
            }
          }
        }
        // this.groupedSpark = this.myWallPresenter.getGroupedSparkResponse(this.userSparksList);
      }
    }
  }
  public get userSpark(): any {
    return this._userSparks;
  }

  /** This property is used for get recations-emoji response from container component */
  @Input() public set reactions(reactions: any) {
    if (reactions) {
      this._reactions = this.myWallPresenter.checkResponse(reactions);
      //this.myWallPresenter.getRections(this._reactions);
    }
  }
  public get reactions(): any {
    return this._reactions;
  }

  /** This property is used for get user-sparks-reactions response from container component */
  @Input() public set sparkReactions(sparkReactions: any) {
    if (sparkReactions) {
      this._sparkReactions = this.myWallPresenter.checkResponse(sparkReactions);
      this.myWallPresenter.openModal(this._sparkReactions);
      if (this.reactionSparkId[0] > 0) {
        let sparkObj = this.userSparksList.find((item) => item.groupId === this.reactionSparkId[2]);
        sparkObj = this.myWallPresenter.updateSparksReactions(sparkObj.sparks[0], this._sparkReactions, this.reactionSparkId[1]);
        this.reactionSparkId[0] = 0;
      }
    }
  }
  public get sparkReactions(): any {
    return this._userSparks;
  }

  /** This property is used for get user-sparks-reactions response from container component */
  @Input() public set comments(comments: any) {
    if (comments) {
      this._comments = this.myWallPresenter.checkResponse(comments);

      if (this._comments) {
        this._comments.forEach(s => {
          s.date = (this.dateTimeConverterService.getLocalDateTimeFromUtcDateTime(new Date(s.date))).toString();
          s.remarks && s.remarks.forEach((remark) => {
            remark.date = (this.dateTimeConverterService.getLocalDateTimeFromUtcDateTime(new Date(remark.date))).toString();
          });

          this.sparkcomments.push(s);
        });

        this._comments.forEach(comment => {
          this.userSparksList.forEach(item => {
            let existingRecord = item.sparks[0].comments.find(e => e.commentId === comment.commentId);
            if (comment.sparkId === item.sparks[0].sparkId && !existingRecord) {
              item.sparks[0].comments.push(comment);
              item.sparks[0].moreCommentCount = item.sparks[0].comments.length === item.sparks[0].commentCount ? 0 : item.sparks[0].moreCommentCount - 1
            }
          })
        });
        this.isSparkCommentsGetting = true;
      }
    }
  }
  public get comments(): any {
    return this._comments;
  }

  @Input() public set subSparks(value: any) {
    if (value) {
      this._subSparks = this.myWallPresenter.checkResponse(value);
      const sparkObj = this.userSparksList.find((item) => item.groupId === this._subSparks[0].groupSparkRandomNumber);
      this.myWallPresenter.openSparkUserModel(this._subSparks, sparkObj.sparks[0].sparkCount);

      // let sparkObj = this.userSparksList.find((item) => item.groupId === this._subSparks[0].groupSparkRandomNumber);
      // if (!!sparkObj) {
      //   this._subSparks.forEach((spark) => {
      //     sparkObj.sparks[0].subSparks.push(spark)
      //   });
      // }
    }
  }
  public get subSparks(): any {
    return this._subSparks;
  }

  @Output() getSparkReactionsById: EventEmitter<[number, number]> = new EventEmitter();
  @Output() getSparkComments: EventEmitter<[number, number]> = new EventEmitter();
  @Output() addReaction: EventEmitter<any> = new EventEmitter();
  @Output() deleteReaction: EventEmitter<ReactionRequest> = new EventEmitter();
  @Output() addComment: EventEmitter<any> = new EventEmitter();
  @Output() getUserSparks: EventEmitter<number> = new EventEmitter();
  @Output() getSubSparks: EventEmitter<any> = new EventEmitter<any>();

  /** Protected Property */
  /** This property is used for store sparks */
  protected _userSparks: any;
  /** This property is used for store sparks */
  public userSparksList: any;
  /** This property is used for store sparks */
  protected _reactions: ReactionType[];
  /** This property is used for store sparks */
  protected _sparkReactions: SparkRecations[];
  /** This property is used for store sparks */
  protected _comments: SparkComment[];
  /** Spark comments */
  protected sparkcomments: SparkComment[];
  private _updateComment: any;

  /** Public Property */
  /** groupSparkList */
  public avatarLength: number = 8;
  public groupedSpark: any;
  public userProfile: string;
  public userProfileName: string;
  public reactionSparkId: any;
  public sparkPageNumber: number;
  public commentsPageIndex: number;
  public isInvokeNextSparkAPI: boolean;
  public isSparksGetting: boolean;
  public isSparkCommentsGetting: boolean;
  public isDefaultTheme: Boolean;
  public isDisplayNoRecordFoundPage: Boolean;
  public isScrolledToSpark: Boolean;
  public isDisplayOverlay: boolean;
  public hoverReaction: number;
  public isNewPost: boolean;
  /** Private Property */
  private destroy: Subject<void> = new Subject();
  private getUser: UserModel;
  private isSingleClick: Boolean;
  private userSparksLength: number;
  private subSparkPageNumber: number;
  private _subSparks: any;

  constructor(
    private dateTimeConverterService: DateTimeConverterService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    public myWallPresenter: MyWallPresenter,
    private elementRef: ElementRef,
    private router: Router,
    private commonService: CommonService
  ) {
    this.isNewPost = false;
    this.sparkPageNumber = InitialPageIndex;
    this.commentsPageIndex = InitialPageIndex;
    this.subSparkPageNumber = InitialPageIndex;
    this.isSingleClick = false;
    this.isScrolledToSpark = false;
    this.destroy = new Subject();
    this.isDisplayOverlay = (this.router.url.split('/')[1] === "dashboard") ? true : false;
  }

  public ngOnInit(): void {
    this.afterInitialization();
  }

  public ngOnChanges(): void {
    this.onChangesProps();
  }

  /** Preserve original property order */
  public originalOrder(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
    return 0;
  }

  /** Track by function use for maintain order */
  public trackByFn(index, item) {
    return index;
  }

  public onNewNotification(): void {
    this.getUserSparks.emit(InitialPageIndex)
    this.isNewPost = false;
    this.commonService.setFlagForNotification(false);
  }

  public openReactionPopup(data): void {
    this.loaderService.emitIsLoaderShown(true);
    this.reactionSparkId = data;
    this.getSparkReactionsById.emit([data[0], data[1]]);
  }

  public onClickCommentsCount(groupId: number, id: number, sparkId: number): void {
    let getSpark = this.userSparksList.find(c => c.groupId === groupId);
    getSpark.sparks[0].isDisplayCommentSection = !getSpark.sparks[0].isDisplayCommentSection;
    if (getSpark.sparks[0].isDisplayCommentSection && getSpark.sparks[0].comments.length < CommentPageSize) {
      this.onClickViewMoreComments(getSpark.sparks[0]);
    }
    getSpark.sparks[0].comments.forEach(c =>
      c.isFocusOnReplyTextbox = false
    )
  }

  public onFocusReply(isFocus: boolean, event): void {
    if (isFocus) {
      event.preventDefault()
    }
  }

  public onClickReply(comments: any[], comment: any, commentId: number): void {
    //if (!comment.isFocusOnReplyTextbox) {
    comments.forEach(c => {
      if (c.commentId === commentId) {
        c.isFocusOnReplyTextbox = true;
        c.isDisplayReplySection = true;
      } else {
        c.isFocusOnReplyTextbox = false;
      }
    })
    // comment.isFocusOnReplyTextbox = comment.commentId === commentId ? true : false;
    // comment.isDisplayReplySection = comment.commentId === commentId ? true : comment.isDisplayReplySection;
    //}
  }

  public onFocusComment(comments): void {
    comments && comments.forEach(c => {
      c.isFocusOnReplyTextbox = false
    });
  }

  public onClickReaction(sparkId: number, reactTypeId: number, commentId: number): void {
    this.myWallPresenter.addReaction(null, sparkId, reactTypeId, commentId);
  }

  public addReactionType(reaction): void {
    this.myWallPresenter.addReaction(reaction[0], reaction[1], reaction[2], reaction[3],);
  }

  public onClickLike(sparkGroupId, myReactId: number, sparkId: number, commentId: number): void {
    this.myWallPresenter.deleteReaction(+sparkGroupId, myReactId, sparkId, commentId);
  }

  public onEnterComment(event, sparkGroupId: any, sparkId: number, parentCommentId: number): void {
    event.preventDefault();
    if (!this.isSingleClick) {
      this.loaderService.emitIsLoaderShown(true);
      this.isSingleClick = this.myWallPresenter.onEnterComment(event, +sparkGroupId, sparkId, parentCommentId);
    }
  }

  public getEmoji(id: number): string {
    return this.myWallPresenter.getEmoji(id);
  }

  public onClickViewMoreComments(spark: MyWallSparks): void {
    if (spark.isDisplayCommentSection && spark.comments.length < spark.commentCount) {
      this.isSparkCommentsGetting = false;
      this.loaderService.emitIsLoaderShown(true);
      let pageIndex = spark.comments.length === 0 ? 0 : spark.comments.length / CommentPageSize;
      this.getSparkComments.emit([spark.sparkId, pageIndex + 1]);
    }
  }

  private scrollToQuestion(sparkId: number): void {
    let existingRecord = this.userSparksList.find((spark) => spark.sparkIds.includes(sparkId));
    if (existingRecord) {
      this.elementRef.nativeElement.querySelector('#spark' + existingRecord.groupId).scrollIntoView({ behavior: ScrollType });
      this.isScrolledToSpark = true;
    }
  }

  public onScrollDown(e) {
    if (this.isInvokeNextSparkAPI) {
      this.isSparksGetting = false;
      this.loaderService.emitIsLoaderShown(true);
      this.sparkPageNumber += 1;
      this.getUserSparks.emit(this.sparkPageNumber);
    }
  }

  public onHoverReaction(): void {
    this.hoverReaction = Math.random();
  }

  public moreAvatar(): void {
    this.avatarLength += 5;
  }

  public onSubSparks(groupId: number): void {
    // console.log('calling');
    // const sparkArray = this.userSparksList.find((item) => item.groupId === groupId);
    // this.getSubSparks.emit({ sparkRandoNumber: groupId, pageNumber: this.subSparkPageNumber });
  }

  public openSparkUserModel(groupId: number): void {
    this.loaderService.emitIsLoaderShown(true);
    this.getSubSparks.emit({ sparkRandoNumber: groupId, pageNumber: this.subSparkPageNumber });
  }

  public onLeaveSubSparks(groupId: number): void {
    // console.log('Leaving !!!');
    // const sparkArray = this.userSparksList.find((item) => item.groupId === groupId);
    // if (!!sparkArray) {
    //   sparkArray.sparks[0].subSparks = [];
    // }
  }

  private afterInitialization(): void {
    this.userSparksList = [];
    this.sparkcomments = [];
    this.getUser = this.globalResponseHandlerService.getUser();
    this.userProfile = this.getUser.userProfile;
    this.userProfileName = this.getUser.profileName;
    this.isDefaultTheme = this.myWallPresenter.isDefaultTheme();
    this.myWallPresenter.getUserSpark$.pipe(takeUntil(this.destroy)).subscribe((isTrue: boolean) => {
      if (this.isInvokeNextSparkAPI) {
        this.isSparksGetting = false;
        this.loaderService.emitIsLoaderShown(true);
        this.sparkPageNumber += 1;
        this.getUserSparks.emit(this.sparkPageNumber);
      }
    });

    this.myWallPresenter.addReact$.pipe(takeUntil(this.destroy)).subscribe((object: AddReaction) => {
      let sparkIds = this.getGroupSparkId(object);
      let sparkObj = this.userSparksList.find(item => item.groupId === object.sparkGroupId);
      sparkObj = this.myWallPresenter.updateRecordOnReaction(sparkObj.sparks[0], object);
      object.ReactDate = moment(object.ReactDate).utc().format("MM-DD-YYYY HH:mm:ss");
      const addReactObj = {
        LstSparkId: sparkIds,
        commentId: object.commentId,
        reactType: object.reactType,
        reactedBy: object.reactedBy,
        ReactDate: object.ReactDate
      }
      this.addReaction.emit(addReactObj);
    });

    this.myWallPresenter.deleteReact$.pipe(takeUntil(this.destroy)).subscribe((object: AddReaction) => {
      let sparkIds = this.getGroupSparkId(object);
      let sparkObj = this.userSparksList.find(item => item.groupId === object.sparkGroupId);
      sparkObj = this.myWallPresenter.updateRecordOnReaction(sparkObj.sparks[0], object, true);
      this.deleteReaction.emit(new ReactionRequest(object.sparkId, object.commentId, object.reactedBy));
    });


    this.myWallPresenter.addComment$.pipe(takeUntil(this.destroy)).subscribe((object: AddComment) => {
      let sparkIds = this.getGroupSparkId(object);
      object.commentDate = moment(object.commentDate).utc().format("MM-DD-YYYY HH:mm:ss");
      const addCommetObj = {
        LstSparkId: sparkIds,
        comment: object.comment,
        parentCommentId: object.parentCommentId,
        commentBy: object.commentBy,
        commentDate: object.commentDate
      }
      this.addComment.emit(addCommetObj);
    });

    this.commonService.getFlagForNotification().subscribe((isNewNotification: boolean) => {
      if (isNewNotification) {
        this.isNewPost = isNewNotification;
      }
    });
  }

  private onChangesProps(): void {
    if (this._updateComment) {
      // const sparkIds = this._updateComment.sparkIds.split(',');
      // let spark = this.userSparksList.find(item => item.sparks[0].sparkId === parseInt(sparkIds[0]));
      let spark = this.userSparksList.find((spark) => spark.sparkIds.includes(this._updateComment.sparkId));
      let sparkObj = this.userSparksList.find((item) => item.groupId === spark.groupId);
      sparkObj.sparks.length > 0 ? this.updateComment.sparkId = sparkObj.sparks[0].sparkId : null;

      if (spark) {
        spark = this.myWallPresenter.updateCommentOnAdd(sparkObj.sparks[0], this._updateComment);
        this.isSingleClick = false;
      }
      this._updateComment = null;
    } else {
      if (this.isSparksGetting && this._reactions && this.isSparkCommentsGetting) {
        this.myWallPresenter.getRections(this._reactions);
        if (!this.isScrolledToSpark) {
          let notificationSparkId = sessionStorage.getItem(Encryption.WallSparkId);
          if (this.isDisplayOverlay && notificationSparkId > '0' && this.sparkPageNumber === InitialPageIndex) {
            this.scrollToQuestion(parseInt(notificationSparkId));
          }
        }
        this.loaderService.emitIsLoaderShown(false);
      }
    }
  }

  private getGroupSparkId(item: any): number[] {
    // let listOfSparkIdList = [];
    let userSpark = this.userSparksList.find((e: any) => e.groupId === item.sparkGroupId);
    return userSpark.sparkIds;
    // userSpark.sparks && userSpark.sparks.forEach((spark) => {
    //   listOfSparkIdList.push(spark.sparkId);
    // });
    // return listOfSparkIdList;
  }

  private meargeExistingRecord(userSparksResponse: any): any {
    let updatedSparks = [];
    return updatedSparks = [...this._userSparks, ...userSparksResponse];
    // return this._userSparks.map(oldSpark => userSparksResponse.find(newSpark =>
    //   newSpark.sparkId === oldSpark.sparkId) || oldSpark);
  }
}
//https://www.angularjswiki.com/angular/angular-date-pipe-formatting-date-times-in-angular-with-examples/
