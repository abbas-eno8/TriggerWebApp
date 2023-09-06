/**
@author : Mihir Patel
@class : SparkNotificationAdapter
@description : SparkNotificationAdapter is create for bind data to model of request and response.
**/
import { Injectable } from '@angular/core';

import { ApiResponse, UnApprovedSpark, RequestModel } from '../spark-notification-model';

@Injectable()
export class SparkNotificationAdapter implements Adapter<any>{

  constructor() { }
  /** This method is used to transform response object into T object. */
  public toResponseSparkNotificationList(response: any): ApiResponse {
    const unApprovedSpark: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindUnApprovedSparkList(response.data) : [],
      response.status,
      response.message,
    );
    return unApprovedSpark;
  }

  public bindUnApprovedSparkList(data: any): UnApprovedSpark[] {
    let unApprovedSparkList: UnApprovedSpark[];
    unApprovedSparkList = data.map(spark => (
      this.bindSpark(spark)
    ));
    return unApprovedSparkList;
  }

  public bindSpark(sparks): UnApprovedSpark {
    const spark: UnApprovedSpark = new UnApprovedSpark(
      sparks.empId,
      sparks.sparkId,
      sparks.sparkDate,
      sparks.sparkBy,
      sparks.sparkByFirstName + sparks.sparkByLastName,
      sparks.sparkByFirstName,
      sparks.sparkByLastName,
      sparks.firstName,
      sparks.lastName,
      sparks.remarks,
      sparks.approvalStatus,
      sparks.createdBy
    );
    return spark;
  }

  /** This method is used to transform T object into request object. */
  public toRequest(spark, remark, status, userId: number) {
    const sparkAnEmployee: RequestModel = new RequestModel(
      spark.empId,
      spark.sparkId,
      status,
      userId,
      remark,
    );
    return sparkAnEmployee;
  }
}

export interface Adapter<T, Request = any, Response = any> {
  /**
   * This will used to convert T object into request object
   * @param item : This is T type object contains the info
   */
  toRequest?(item: T, remark: string, status: number, userId: number): Request;
  /**
   * This will convert the response into T object
   * @param item This is the response model from api response
   */
  toResponse?(item: Response): T;
}