/**
 * @author Shahbaz Shaikh
 * @description This is adapter file use convert request and response model.
 */
import { Injectable } from "@angular/core";
// ---------------------------------------------- //
import { Adapter } from "../../core/adapter/adpater";
import { RequestModel, SparkAnEmployee } from "../spark.model";

@Injectable()
export class SparkAdapter implements Adapter<any> {

    /** This method is used to transform T object into request object. */
    public toRequest(spark: SparkAnEmployee): RequestModel {
        const requestModel: RequestModel = new RequestModel(
            spark.empIds,
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
}

@Injectable()
export class SparkFiltersAdapter implements Adapter<any> {

    /** This method is used to transform T object into request object. */
    public toResponse(oldData: any): any {
        let newArr1: any;
        newArr1 = (Object.keys(oldData.data)).forEach((keyData) => {
            const result = oldData.data[keyData].map(element => {
                return element.id !== 0 ? element : { ...element, id: element.name };
            });
            return oldData.data[keyData] = result;
        });
        return oldData
    }
}
