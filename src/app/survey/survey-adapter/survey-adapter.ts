import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Adapter } from "../../core/adapter/adpater";
import { ApiResponse, ResponseById } from "../../core/magic-string/common.model";
import {
  RequestModel, ResponseModel, SurveyRequestModel, SurveyResponseModel, QuestionObject,
  AnswerObject, SurveyDetails, SurveyTypeMaster, CommonDimensionType, EmployeeList, ResponseModelActive, SurveyType, SurveyTypeName
} from "../survey.model";

/**
 * @author Anjali Tandel.
 * @description This is adapter service use for transforming data base user requirement. 
 */

@Injectable()

export class SurveyListAdapter implements Adapter<ApiResponse, RequestModel, ResponseModel> {
  constructor(private datePipe: DatePipe) {
  }    /** This method is used to transform response object into T object. */
  public toResponse(response: any): ApiResponse {
    const surveyList: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindSurveyList(response.data) : [],
      response.status,
      response.message,
    );
    return surveyList;
  }

  public bindSurveyList(data: any): ResponseModel[] {
    let survey: ResponseModel[];
    survey = data.map(t => (
      this.surveys(t)
    ));
    return survey;
  }

  public surveys(data: any): ResponseModel {
    const survey: ResponseModel = new ResponseModel(
      data.surveyId,
      data.surveyName,
      this.datePipe.transform(data.fromDate, 'MM/dd/yyyy'),
      this.datePipe.transform(data.toDate, 'MM/dd/yyyy'),
      data.isActive,
      data.isSurveySubmitted,
      data.surveyType,
      data.isPublished,
      data.surveyTypeName,
      data.description
    );
    return survey;
  }

}

@Injectable()
export class SurveyActiveListAdapter implements Adapter<ApiResponse, ResponseModelActive> {
  constructor(private datePipe: DatePipe) { }

  public toResponse(response: any): ApiResponse {
    const surveyList: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindSurveyList(response.data) : [],
      response.status,
      response.message,
    );
    return surveyList;
  }

  public bindSurveyList(data: any): ResponseModelActive[] {
    let survey: ResponseModelActive[];
    survey = data.map((item) => (
      this.surveys(item)
    ));
    return survey;
  }

  private surveys(data: any): ResponseModelActive {
    const survey: ResponseModelActive = new ResponseModelActive(
      data.surveyId,
      data.surveyId,
      data.surveyName,
      data.createdBy,
      data.createdByName,
      this.datePipe.transform(data.fromDate, 'MM/dd/yyyy'),
      this.datePipe.transform(data.toDate, 'MM/dd/yyyy'),
      data.surveyType,
      this.surveyTypeName(data.surveyType),
      data.isSubmitted
    );
    return survey;
  }

  private surveyTypeName(surveyType: number): string {
    if (surveyType === SurveyType.EvaluationSurvey) {
      return SurveyTypeName.EvaluationSurvey;
    } else if (surveyType === SurveyType.GlobalAssessment) {
      return SurveyTypeName.GlobalAssessment;
    } else if (surveyType === SurveyType.DimensionalSurvey) {
      return SurveyTypeName.DimensionalSurvey;
    }
  }
}

@Injectable()
export class SurveyFormAdapter implements Adapter<ResponseById, SurveyRequestModel, ResponseModel> {

  //   /** This method is used to transform T object into request object. */
  //   public toRequest(survey: any): SurveyRequestModel {
  public toRequest(survey: any): SurveyRequestModel {
    const requestModel: SurveyRequestModel = new SurveyRequestModel(
      survey.surveyId,
      survey.surveyName,
      survey.fromDate,
      survey.toDate,
      survey.surveyType,
      survey.surveySetOfUserConfiguration,
      survey.surveyTeamMembers,
      survey.isActive,
      survey.isSurveyAnonymous,
      survey.isSurveyMandatory,
      survey.description != '' ? survey.description.trim() : '',
      survey.createdBy,
      survey.updatedBy,
      survey.surveyWiseQuestions = this.Question(survey.surveyWiseQuestions)
    );
    return requestModel;
  }

  /** This method is used to transform response object into T object. */
  public toResponse(response: any): ResponseById {
    const survey: ResponseById = new ResponseById(
      response.data = this.survey(response.data),
      response.status,
      response.message,
    );
    return survey;
  }

  public survey(data: any): SurveyResponseModel {
    const survey: SurveyResponseModel = new SurveyResponseModel(
      data.surveyId,
      data.surveyName,
      data.fromDate,
      data.toDate,
      data.surveyType,
      data.surveyTypeName,
      data.description,
      data.surveySetOfUserConfiguration,
      data.surveyTeamMembers,
      data.isActive,
      data.isSurveyAnonymous,
      data.isSurveyMandatory,
      data.createdBy,
      data.updatedBy,
      data.surveyWiseQuestions = this.Question(data.surveyWiseQuestions)
    );
    return survey;
  }

  public Question(data: any): QuestionObject[] {
    let question: QuestionObject[];
    question = data.map(t => (
      this.bindQuestion(t)
    ));
    return question;
  }

  public bindQuestion(questionObj: any): QuestionObject {
    const question: QuestionObject = new QuestionObject(
      questionObj.questionId,
      questionObj.surveyId,
      questionObj.categoryId,
      questionObj.question,
      questionObj.answerSelectionTypeId,
      questionObj.orderNo,
      questionObj.isMandatory,
      questionObj.createdBy,
      // questionObj.updatedBy,
      questionObj.surveyWiseQuestionAnswers = this.Answers(questionObj.surveyWiseQuestionAnswers)
    );
    return question;
  }
  public Answers(data: any): AnswerObject[] {
    let answer: AnswerObject[];
    answer = data.map(t => (
      this.bindAnswers(t)
    ));
    return answer;
  }

  public bindAnswers(answerObj: any): AnswerObject {
    const answer: AnswerObject = new AnswerObject(
      answerObj.answerId,
      answerObj.questionId,
      answerObj.answers,
      answerObj.orderNo
    );
    return answer;
  }

  // For msater survey type : 

  /** This method is used to transform response object into T object. */
  public toMasterSurveyTypeResponse(response: any): ResponseById {
    const survey: ResponseById = new ResponseById(
      response.data = this.bindSurveyMaster(response.data),
      response.status,
      response.message,
    );
    return survey;
  }

  public bindSurveyMaster(data: any): SurveyTypeMaster {
    const masterData: SurveyTypeMaster = new SurveyTypeMaster(
      data.surveyType = data.surveyType.length > 0 ? this.bindMaster(data.surveyType) : [],
      data.dimensionList = data.dimensionList.length > 0 ? this.bindMaster(data.dimensionList) : [],
      data.departmentList = data.departmentList.length > 0 ? this.bindMaster(data.departmentList) : [],
      data.roleList = data.roleList.length > 0 ? this.bindMaster(data.roleList) : [],
      data.teamList = data.teamList.length > 0 ? this.bindMaster(data.teamList) : [],
    );
    return masterData;
  }

  public bindMaster(data: any): CommonDimensionType[] {
    let masterArray: CommonDimensionType[];
    masterArray = data.map(t => (
      this.bindDimenion(t)
    ));
    return masterArray;
  }

  public bindDimenion(masterObject: any): CommonDimensionType {
    const dimensionObject: CommonDimensionType = new CommonDimensionType(
      masterObject.id,
      masterObject.name,
      false
    );
    return dimensionObject;
  }


  /** This method is used to transform response object into T object. */
  public toTeamMemberResponse(response: any): ApiResponse {
    const surveyList: ApiResponse = new ApiResponse(
      response.data = response.data.length > 0 ? this.bindEmployeeList(response.data) : [],
      response.status,
      response.message,
    );
    return surveyList;
  }

  public bindEmployeeList(data: any): EmployeeList[] {
    let employee: EmployeeList[];
    employee = data.map(t => (
      this.employees(t)
    ));
    return employee;
  }

  public employees(data: any): EmployeeList {
    const employee: EmployeeList = new EmployeeList(
      data.empId,
      data.firstName,
      data.lastName,
      data.firstName + ' ' + data.lastName,
      data.isChecked,
      data.dimensionElementId
    );
    return employee;
  }

}

interface DynamicObject {
  [key: string]: any
}

@Injectable()
export class SurveyDeatilsAdapter implements Adapter<ResponseById, SurveyRequestModel, ResponseModel> {
  constructor(private datePipe: DatePipe) {
  } /** This method is used to transform response object into T object. */
  public surveyDetailList: any[];
  public customColumns: any[];
  public toResponse(response: any): any {
    const surveyDetails: ResponseById = new ResponseById(
      response.data = this.surveyDetails(response.data),
      response.status,
      response.message,
    );
    return surveyDetails
  }

  public surveyDetails(data: any): SurveyDetails[] {
    this.surveyDetailList = [];
    data.forEach(element => {
      this.survey(element)
    });
    return this.surveyDetailList;
  }

  public survey(data: any): void {
    let obj: DynamicObject = {};
    obj['name'] = data.empFirstName + ' ' + data.empLastName;
    obj['date'] = this.datePipe.transform(data.submissionDate, 'MM/dd/yyyy');
    obj['isSurveyAnonymous'] = data.isSurveyAnonymous;
    let records = this.removeDuplicateRecordAndMerge(data.submittedAnswers);
    records.forEach((t, index) => {
      obj['answer' + (index + 1)] = t.answer ? t.answer : '';
      obj['qId' + (index + 1)] = t.questionId;
      obj['question' + (index + 1)] = t.question;
    })
    this.surveyDetailList.push(obj);
  }

  removeDuplicateRecordAndMerge(data) {
    let returnObject = [];
    data.forEach(o => {
      let existRecord = returnObject.find(r => r.questionId === o.questionId);
      if (existRecord) {
        existRecord.answer += ',' + o.answer
      } else {
        returnObject.push(o);
      }
    })
    return returnObject;
  }

}