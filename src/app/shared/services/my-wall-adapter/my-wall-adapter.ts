import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../core/magic-string/common.model';
import { SparkRecations, MyWallSparks, SparkComment, TooltipHover, MyWallGroupSparks, SubSpark } from '../../../my-wall/my-wall.model';

@Injectable({
  providedIn: 'root'
})
export class MyWallAdapter {
  public mainIndex: number;
  /** This method is used to transform response object into T object. */
  public getSparks(response: any): ApiResponse {
    const userSparks: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindGroupSparks(response.data) : [],
      response.status,
      response.message,
    );
    return userSparks;
  }

  public bindGroupSparks(data: any) {
    let groupSparks: MyWallGroupSparks[];
    groupSparks = data.map((item, index) => ({
      groupId: item.groupId,
      sparks: this.bindSparks(item.myWallSparkModels, index),
      sparkIds: item.sparkIds
    }));
    return groupSparks;
  }

  public bindSparks(data: any, parentIndex): MyWallSparks[] {
    let sparks: MyWallSparks[];
    
    sparks = data.map((t, index) => (
      this.bindSpark(t, parentIndex === 0 && index === 0 ? this.mainIndex = 0 : ++this.mainIndex)
    ));
    return sparks;
  }

  public bindSpark(data: any, index: number): MyWallSparks {
    const spark: MyWallSparks = new MyWallSparks(
      index,
      
      data.sparkId,
      data.empId,
      data.firstName,
      data.lastName,

      data.sparkByFirstName,
      data.sparkByLastName,
      data.sparkByImgPath,
      data.sparkDate,
      data.remarks,

      this.bindTopComments(data.lstCommentModel),
      data.parentCommentCount,
      data.commentCount,
      
      data.myReactId,
      this.bindTopSparkReactions(data.lstReactModel),
      this.bindTopImages(data.lstReactModel),
      data.reactCount,
      
      index === 0 ? true : false,
      
      this.generateRandomNumber(data.groupSparkRandomNumber),
      data.count
    );
    return spark;
  }

  private generateRandomNumber(randomNumber: number): number {
    if (randomNumber === 0) {
      return Math.floor(Math.random() * 90000) + 10000;
    } else {
      return randomNumber;
    }
  }

  public bindTopImages(data: any): number[] {
    let reactions: number[] = [];
    data.forEach(t => {
      let existing = reactions.find(r => r === t.reactType);
      if (!existing && reactions.length < 3)
        reactions.push(t.reactType)
    });
    return reactions;
  }

  public bindTopSparkReactions(data: any): TooltipHover[] {
    let recations: TooltipHover[];
    recations = data.map(t => (
      this.bindTopReaction(t)
    ));
    return recations;
  }

  public bindTopReaction(data: any): TooltipHover {
    const recation: TooltipHover = new TooltipHover(
      data.firstName,
      data.lastName,
      data.reactType,
      data.reactedBy
    );
    return recation;
  }

  public bindTopComments(data: any): TooltipHover[] {
    let recations: TooltipHover[];
    recations = data.map(t => (
      this.bindTopComment(t)
    ));
    return recations;
  }

  public bindTopComment(data: any): TooltipHover {
    const recation: TooltipHover = new TooltipHover(
      data.commentByFirstName,
      data.commentByLastName,
      0,
      0
    );
    return recation;
  }

  /** This method is used to transform response object into T object. */
  public getSparkReactions(response: any): ApiResponse {
    const teams: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindSparkRections(response.data) : [],
      response.status,
      response.message,
    );
    return teams;
  }

  public bindSparkRections(data: any): SparkRecations[] {
    let recations: SparkRecations[];
    recations = data.map(t => (
      this.bindSparkRection(t)
    ));
    return recations;
  }

  public bindSparkRection(data: any): SparkRecations {
    const recation: SparkRecations = new SparkRecations(
      data.sparkId,
      data.commentId,
      data.firstName,
      data.lastName,
      data.reactByImgPath,
      data.reactImg,
      data.reactType,
      data.reactedBy,
      data.reactDate
    );
    return recation;
  }

  public getSparkComments(response: any): ApiResponse {
    const comments: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindComments(response.data) : [],
      response.status,
      response.message,
    );
    return comments;
  }

  public bindComments(data: any): SparkComment[] {
    let comments: SparkComment[];
    comments = data.map((t, index) => (
      this.bindComment(t, index)
    ));
    return comments;
  }

  public bindComment(data: any, index: number): SparkComment {
    const comment: SparkComment = new SparkComment(
      data.sparkId,
      data.commentId,
      data.comment,
      data.parentCommentId,
      data.commentDate,
      data.commentByImgPath,
      data.firstName,
      data.lastName,
      data.myReactId,
      data.reactCount,
      this.bindTopCommentReactions(data.lstReactModel),
      this.bindTopImages(data.lstReactModel),
      data.lstChildComments ? this.bindRemarks(data.lstChildComments) : [],
      data.commentRandomNumber
    );
    return comment;
  }

  public bindTopCommentReactions(data: any): TooltipHover[] {
    const removeDuplicate = data.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.reactRandomNumber === value.reactRandomNumber
      ))
    );

    let recations: TooltipHover[];
    recations = removeDuplicate.map(t => (
      this.bindTopReaction(t)
    ));
    return recations;
  }

  public bindRemarks(data: any): SparkComment[] {
    let remarks: SparkComment[];
    remarks = data.map((t, index) => (
      this.bindRemark(t, index)
    ));
    return remarks;
  }

  public bindRemark(data: any, index: number): SparkComment {
    const spark: SparkComment = new SparkComment(
      data.sparkId,
      data.commentId,
      data.comment,
      data.parentCommentId,
      data.commentDate,
      data.commentByImgPath,
      data.firstName,
      data.lastName,
      data.myReactId,
      data.reactCount,
      this.bindTopCommentReactions(data.lstReactModel),
      this.bindTopImages(data.lstReactModel),
      []
    );
    return spark;
  }

   /** This method is used to transform response object into T object. */
   public getSubSparks(response: any, groupSparkRandomNumber: number): ApiResponse {
    const userSparks: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindSubSparks(response.data, groupSparkRandomNumber) : [],
      response.status,
      response.message,
    );
    return userSparks;
  }

  public bindSubSparks(data: any, groupSparkRandomNumber: number): SubSpark[] {
    let subSparks: SubSpark[];
    subSparks = data.map((t, index) => (
      this.bindSubSpark(t, index, groupSparkRandomNumber)
    ));
    return subSparks;
  }

  public bindSubSpark(data: any, index: number, groupSparkRandomNumber: number): SubSpark {
    const spark: SubSpark = new SubSpark( 
      data.firstName,
      data.lastName,
      data.sparkByImgPath,
      groupSparkRandomNumber
    ) ;

    return spark;
  }
}

