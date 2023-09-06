import { ComponentRef } from "@angular/core";
import { OverlayRef } from "@angular/cdk/overlay";

/** Constant class for text-danger */
export const ClassRedText = 'text-danger';
export const TextDark = 'dark-text';
// Create constant for StrikeOutStyleClass
export const StrikeOutStyleClass = '#strikeout'
// Create constant for AssessmentDateTimeStamp
export const AssessmentDateTimeStamp = 'MM-dd-yyyy HH:mm:ss';
// Create constant for ScrollType
export const ScrollType = 'smooth';
export const SubmitSurvey = 'Please select at least 1 answer to submit Survey.';
export class SurveyFormResponse {
    public id: number
    public name: string
    public fromDate: string
    public toDate: string
    public description: string
    public question: SurveyFormQuestion[]
    public answers: SurveyFormRequest[]
    constructor(
        id: number = 0,
        name: string = '',
        fromDate: string = '',
        toDate: string = '',
        description: string = '',
        question: SurveyFormQuestion[],
        answers: SurveyFormRequest[]
    ) {
        this.id = id
        this.name = name;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.description = description;
        this.question = question;
        this.answers = answers;
    }
}

export class SurveyFormQuestion {
    public id: number
    public question: string
    public selectionTypeId: number
    public isMandatory: boolean
    public dynamicClass: string
    public answers: SurveyFormAnswer[]
    constructor(
        questionId: number = 0,
        question: string = '',
        answerSelectionTypeId: number = 0,
        isMandatory: boolean,
        answers: SurveyFormAnswer[]
    ) {
        this.id = questionId
        this.question = question;
        this.selectionTypeId = answerSelectionTypeId;
        this.isMandatory = isMandatory;
        this.dynamicClass = TextDark;//'dark-text'
        this.answers = answers;
    }
}

export class SurveyFormAnswer {
    public id: number
    public questionId: number
    public answers: string
    public isSelected: boolean
    constructor(
        answerId: number = 0,
        questionId: number = 0,
        answers: string = ''
    ) {
        this.id = answerId
        this.questionId = questionId;
        this.answers = answers;
        this.isSelected = false;
    }
}

export class AddSurveyForm {
    public empId: number
    public surveyId: number
    public createdBy: number
    public submissionDate: string
    public surveyQuestionAnswers: SurveyFormRequest[]
    constructor(
        empId: number = 0,
        surveyId: number = 0,
        createdBy: number = 0,
        submissionDate: string = '',
        surveyQuestionAnswers: SurveyFormRequest[]
    ) {
        this.empId = empId
        this.surveyId = surveyId;
        this.createdBy = createdBy;
        this.submissionDate = submissionDate;
        this.surveyQuestionAnswers = surveyQuestionAnswers;
    }
}

export class SurveyFormRequest {
    public answerId: number
    public questionId: number
    public createdBy: number
    public remarks: string
    constructor(
        answerId: number = 0,
        questionId: number = 0,
        createdBy: number = 0,
        remarks: string = '',
    ) {
        this.answerId = answerId
        this.questionId = questionId;
        this.createdBy = createdBy;
        this.remarks = remarks;
    }
}

export class OverlayRefModel {
    public overLay: OverlayRef
    public component: ComponentRef<any>
    constructor(
        overLay: OverlayRef,
        component: ComponentRef<any>
    ) {
        this.overLay = overLay
        this.component = component;
    }
}

// export class AddSurveyForm {
//     public empId: number
//     public surveyId: number
//     public createdBy: number
//     public submissionDate: string
//     public surveyQuestionAnswers: SurveyFormRequest[]
//     constructor(
//         empId: number = 0,
//         surveyId: number = 0,
//         createdBy: number = 0,
//         submissionDate: string = '',
//         surveyQuestionAnswers: SurveyFormRequest[]
//     ) {
//         this.empId = empId
//         this.surveyId = surveyId;
//         this.createdBy = createdBy;
//         this.submissionDate = submissionDate;
//         this.surveyQuestionAnswers = surveyQuestionAnswers;
//     }
// }