import { Injectable, ComponentRef } from '@angular/core';
import { GlobalResponseHandlerService } from '../../../../core/global-response-handler/global-response-handler';
import { SurveyRequestModel, SurveyResponseModel } from '../../../survey.model';
import { Route } from '../../../../core/magic-string/common.model';
import { Router, NavigationEnd } from '@angular/router';
import { UrlEncryptionDecryptionService } from '../../../../core/url-encryption-decryption/url-encryption-decryption.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyPreviewPresenter {

  constructor(private globalResponseHandlerService: GlobalResponseHandlerService,
    private router: Router,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService, ) {
  }
  public checkResponse(response: any): any[] {
    if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
      return response.data;
    } else {
      return [];
    }
  }

  public getDataInFormat(sessionData): any {
    let Questions = [];
    let surveyQuestions = sessionData.surveyQuestions;
    let survey: SurveyResponseModel
    survey = new SurveyResponseModel(
      sessionData.surveyId,
      sessionData.surveyName,
      sessionData.fromDate,
      sessionData.toDate,
      sessionData.surveyType,
      sessionData.surveyTypeName,
      sessionData.description,
      sessionData.surveySetOfUserConfiguration,
      sessionData.surveyTeamMembers,
      sessionData.isActive,
      sessionData.isSurveyAnonymous,
      sessionData.isSurveyMandatory,
      sessionData.createdBy,
      sessionData.updatedBy,
      Questions
      );

    surveyQuestions.forEach((question, index, array) => {
      let questionItem = {
        questionId: question.questionId,
        surveyId: sessionData.surveyId,
        categoryId: 0,
        question: question.question,
        answerSelectionTypeId: question.questionType,
        orderNo: index + 1,
        isMandatory: question.isMandatory,
        createdBy: sessionData.createdBy,
        updatedBy: sessionData.updatedBy,
        surveyWiseQuestionAnswers: []
      }

      if (question.questionGroup.hasOwnProperty('options')) {
        if (question.questionGroup.options.length > 0) {
          question.questionGroup.options.forEach((option, index) => {
            let optionItem = {
              answerId: option.answerId,
              answers: option.answers,
              weightage: 0,
              orderNo: index + 1,
              createdBy: sessionData.createdBy
            }
            questionItem.surveyWiseQuestionAnswers.push(optionItem)
          });
        } else {
          let optionItem = {
            answerId: 0,
            answers: '',
            weightage: 0,
            orderNo: 0,
            createdBy: 0
          }
          questionItem.surveyWiseQuestionAnswers.push(optionItem)
        }
      }
      survey.surveyWiseQuestions.push(questionItem)
    });    
    return survey

  }

  redirectedToRespectedRoute(islastredirectFromEditPage, surveyId) {
    if (surveyId > 0 || (surveyId === 0 && islastredirectFromEditPage)) {
      this.urlEncryptionDecryptionService.urlEncryption(surveyId.toString(), Route.EditSurvey);
    } else {
      this.router.navigate([Route.Survey]);
    }
  }

  getCopyObject(surveyDetail) {
    let Questions = [];
    let surveyQuestions = surveyDetail.surveyWiseQuestions;
    let survey: SurveyRequestModel
    survey = new SurveyRequestModel(
      0,
      surveyDetail.surveyName,
      surveyDetail.fromDate,
      surveyDetail.toDate,
      surveyDetail.surveyType,
      surveyDetail.surveySetOfUserConfiguration,
      surveyDetail.surveyTeamMembers,
      false,
      false,
      false,
      surveyDetail.description,
      surveyDetail.createdBy,
      0,
      Questions
      );

    surveyQuestions.forEach((question, index, array) => {
      let questionItem = {
        questionId: 0,
        surveyId: 0,
        categoryId: 0,
        question: question.question,
        answerSelectionTypeId: question.answerSelectionTypeId,
        orderNo: index + 1,
        isMandatory: question.isMandatory,
        createdBy: 0,
        updatedBy: 0,
        surveyWiseQuestionAnswers: []
      }

      if (question.surveyWiseQuestionAnswers.length > 0) {
        question.surveyWiseQuestionAnswers.forEach((option, index) => {
          let optionItem = {
            answerId: 0,
            answers: option.answers,
            weightage: 0,
            orderNo: index + 1,
            createdBy: surveyDetail.createdBy
          }
          questionItem.surveyWiseQuestionAnswers.push(optionItem)
        });
      } else {
        let optionItem = {
          answerId: 0,
          answers: '',
          weightage: 0,
          orderNo: 0,
          createdBy: 0
        }
        questionItem.surveyWiseQuestionAnswers.push(optionItem)
      }
      survey.surveyWiseQuestions.push(questionItem)
    });
    return survey
  }
}
