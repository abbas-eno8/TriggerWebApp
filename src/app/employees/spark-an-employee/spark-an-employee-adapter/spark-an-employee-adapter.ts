/**
 * @author Anjali Tandel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

import { Injectable } from '@angular/core';
import { ApiResponse, SparkAnEmployee, RequestModel, Category, ClassificationsCategories, SparkAnEmployeeForWidget, bindSparkReplyForWidget } from '../spark-an-employee-model';
import { Adapter } from '../../../core/adapter/adpater';
// -------------------------------------------- //
@Injectable()
export class SparkAnEmployeeAdapter implements Adapter<any> {

    /** This method is used to transform response object into T object. */
    public toResponse(response: any): ApiResponse {
        const sparkAnEmployee: ApiResponse = new ApiResponse(
            response.data = response.data.length > 0 ? this.bindSpark(response.data) : [],
            response.status,
            response.message,
        );
        return sparkAnEmployee;
    }

    public bindSpark(data: any): SparkAnEmployee[] {
        let SparkAnEmployees: SparkAnEmployee[];
        SparkAnEmployees = data.map(spark => (
            this.SparkAnEmployee(spark)
        ));
        return SparkAnEmployees;
    }

    public getSparkResponse(response: any): ApiResponse {
        const sparkAnEmployee: ApiResponse = new ApiResponse(
            response.data = this.SparkAnEmployee(response.data),
            response.status,
            response.message,
        );
        return sparkAnEmployee;
    }

    public SparkAnEmployee(sparks): SparkAnEmployee {
        const spark: SparkAnEmployee = new SparkAnEmployee(
            sparks.isSparkSent,
            sparks.empId,
            sparks.sparkId,
            sparks.categoryId,
            sparks.category,
            sparks.sparkDate,
            sparks.sparkBy,
            sparks.sparkByName,
            sparks.sparkByFirstName,
            sparks.sparkByLastName,
            sparks.remarks,
            sparks.classificationId,
            sparks.classification,
            sparks.documentName,
            sparks.documentContents,
            sparks.cloudFilePath,
            sparks.sparkByImgPath,
            sparks.emailContent,
            sparks.employeeEmail,
            sparks.sparkPrivacy
        );
        return spark;
    }

    /** This method is used to transform T object into request object. */
    public toRequest(spark: SparkAnEmployee): RequestModel {
        const requestModel: RequestModel = new RequestModel(
            spark.empId,
            spark.sparkId,
            spark.categoryId,
            spark.classificationId,
            spark.sparkBy,
            spark.sparkDate,
            spark.spark,
            spark.attachmentName,
            spark.attachmentPath,
            spark.cloudFilePath,
            spark.createdBy,
            spark.updatedBy,
            spark.sendSpark,
            spark.sparkPrivacy
        );
        return requestModel;
    }

    /** This method is used to transform response object into T object. */
    public toResponseClassification(response: any): ApiResponse {
        const sparkAnEmployee: ApiResponse = new ApiResponse(
            response.data = response.data.length > 0 ? this.bindClassification(response.data) : [],
            response.status,
            response.message,
        );
        return sparkAnEmployee;
    }

    public bindClassification(data: any): SparkAnEmployee[] {
        let sparkAnEmployee: SparkAnEmployee[];
        sparkAnEmployee = data.map(spark => ({
            classificationId: spark.classificationId,
            classification: spark.classification,
            categoryId: spark.categoryId,
        }));
        return sparkAnEmployee;
    }

    /** This method is used to transform response object into T object. */
    public toResponseCategory(response: any): ApiResponse {
        const sparkAnEmployee: ApiResponse = new ApiResponse(
            response.data = response.data.length > 0 ? this.bindCategories(response.data) : [],
            response.status,
            response.message,
        );
        return sparkAnEmployee;
    }

    public bindCategories(data: any): Category[] {
        let sparkAnEmployee: Category[];
        sparkAnEmployee = data.map(c => ({
            id: c.categoryId,
            category: c.category,
        }));
        return sparkAnEmployee;
    }

    /** This method is used to create object of classifications & categories. */
    public bindClassificationscategories(classifications: SparkAnEmployee[], categories: Category[]): ClassificationsCategories {
        const classificationsCategoriesModel: ClassificationsCategories = new ClassificationsCategories(
            classifications,
            categories
        );
        return classificationsCategoriesModel;
    }

    // For get widget spark list response and bind in adapter : 
    /** This method is used to transform response object into T object. */
    public toWidgetResponse(response: any): ApiResponse {
        const sparkAnEmployee: ApiResponse = new ApiResponse(
            response.data = response.data.length > 0 ? this.bindSparkForWidget(response.data) : [],
            response.status,
            response.message,
        );
        return sparkAnEmployee;
    }

    public bindSparkForWidget(data: any): SparkAnEmployeeForWidget[] {
        let SparkAnEmployees: SparkAnEmployeeForWidget[];
        SparkAnEmployees = data.map((spark,index) => (
            this.SparkAnEmployeeForWidget(spark,index)
        ));
        return SparkAnEmployees;
    }
    public SparkAnEmployeeForWidget(sparks,index:number): SparkAnEmployeeForWidget {
        const sparkWidgetList: SparkAnEmployeeForWidget = new SparkAnEmployeeForWidget(
            index == 0 ? true : false,
            sparks.sparkReplys.length,
            sparks.sparkReplys = sparks.sparkReplys.length > 0 ? this.bindSparkReplyForWidget(sparks.sparkReplys) : [],
            sparks.isSparkSent,
            sparks.empId,
            sparks.sparkId,
            sparks.categoryId,
            sparks.category,
            sparks.sparkDate,
            sparks.sparkBy,
            sparks.sparkByName,
            sparks.sparkByFirstName,
            sparks.sparkByLastName,
            sparks.remarks,
            sparks.classificationId,
            sparks.classification,
            sparks.documentName,
            sparks.documentContents,
            sparks.cloudFilePath,
            sparks.sparkByImgPath,
            sparks.emailContent,
            sparks.employeeEmail,
            sparks.sparkPrivacy,
        );
        return sparkWidgetList;
    }

    public bindSparkReplyForWidget(data: any): bindSparkReplyForWidget[] {
        let bindSparkReplyForWidgetconst: bindSparkReplyForWidget[];
        bindSparkReplyForWidgetconst = data.map(reply => (
            this.bindSparkPeply(reply)
        ));
        return bindSparkReplyForWidgetconst;
    }

    public bindSparkPeply(reply: bindSparkReplyForWidget): bindSparkReplyForWidget {
        const replyConst: bindSparkReplyForWidget = new bindSparkReplyForWidget(
            reply.id,
            reply.replyBy,
            reply.sparkId,
            reply.reply,
            reply.replyDate,
            reply.replyByFirstName,
            reply.replyByLastName,
            reply.replyByImgPath,
            reply.documentName,
            reply.documentContents,
            reply.cloudFilePath,
        );
        return replyConst
    }
}
