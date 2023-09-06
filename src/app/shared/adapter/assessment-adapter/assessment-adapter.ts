import { Injectable } from '@angular/core';
import { Adapter } from "../../../core/adapter/adpater";
import { ApiResponse, ResponseById } from "../../../core/magic-string/common.model";
import { SurveyFormResponse, SurveyFormQuestion, SurveyFormAnswer, SurveyFormRequest } from '../../../../app/shared/modals/survey-form-model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentAdapter implements Adapter<ApiResponse, any, any> {
  /** This method is used to transform response object into T object. */
  public toResponse(response: any): ResponseById {
    const teams: ResponseById = new ResponseById(
      response.data = this.bindSurveyForm(response.data),
      response.status,
      response.message,
    );
    return teams;
  }

  public bindSurveyForm(data: any): SurveyFormResponse {
    const survey: SurveyFormResponse = new SurveyFormResponse(
      data.surveyId,
      data.surveyName,
      data.fromDate,
      data.toDate,
      data.description,
      this.bindSurveyFormQuestion(data.surveyWiseQuestions),
      this.bindSubmittedAnswers(data.submittedSurveyAnswerDetails)
    );
    return survey;
  }

  public bindSurveyFormQuestion(data: any): SurveyFormQuestion[] {
    let questions: SurveyFormQuestion[];
    questions = data.map(t => (
      this.bindQuestions(t)
    ));
    return questions;
  }

  public bindQuestions(data: any): SurveyFormQuestion {
    const team: SurveyFormQuestion = new SurveyFormQuestion(
      data.questionId,
      data.question,
      data.answerSelectionTypeId,
      data.isMandatory,
      this.bindSurveyFormAnswers(data.surveyWiseQuestionAnswers),
    );
    return team;
  }

  public bindSurveyFormAnswers(data: any): SurveyFormAnswer[] {
    let questions: SurveyFormAnswer[];
    questions = data.map(t => (
      this.bindAnswers(t)
    ));
    return questions;
  }

  public bindAnswers(data: any): SurveyFormAnswer {
    const team: SurveyFormAnswer = new SurveyFormAnswer(
      data.answerId,
      data.questionId,
      data.answers
    );
    return team;
  }

  public bindSubmittedAnswers(data: any): SurveyFormRequest[] {
    let questions: SurveyFormRequest[];
    questions = data.map(t => (
      this.bindSubmittedAnswer(t)
    ));
    return questions;
  }

  public bindSubmittedAnswer(data: any): SurveyFormRequest {
    const team: SurveyFormRequest = new SurveyFormRequest(
      data.answerId,
      data.questionId,
      0,
      data.answer
    );
    return team;
  }
}

