import { Validator } from "../core/magic-string/common.model";

/**
@author : Anjali Tandel
@class : Enumeration 
@description : Create enumeration for static values, error-message, tooltip header and description.
**/

/** Constant Error-messsage for Assessment NotI nitiated */
export const AssessmentNotInitiated = 'Assessment is not initiated for this team member.';
/** Constant Error-messsage for Assessment Already Done */
export const AssessmentAlreadyDone = 'Whoops! It looks like you have already Evaluated this team member today, come back tomorrow.';
/** Constant Error-messsage for Assessment Already Done */
export const AssessmentInSaveAsDraft = 'Whoops! It looks like evaluation is still in draft for this teammate, Please complete it first.';
//export const AssessmentAlreadyDone = 'Whoops! It looks like you have already Triggered this employee today, come back tomorrow.';
/** Constant value for initial select team member in droddown menu */
export const AssessmentSelectEmployee = 'Please select team member.';
/** Constant value for initial select option */
export const AssssmentSelectOption = 'Please select all options.';
/** Constant class for text-danger */
export const ClassRedText = 'text-danger';
/** Create constant for client search fields, this fields are from API response */
export const FileTypes: any[string] = ['xls', 'xlsx', 'pdf', 'rtf', 'x-rtf', 'doc', 'docx', 'ppt', 'pptx', 'txt'];
// Create constant for declare  file size which used to checked attached file size
export const FileMaxSize: number = 3.0000;
// Create constant for CategoryAttachment
export const CategoryAttachment = 'categoryAttachment'
// Create constant for GeneralAttachment
export const GeneralAttachment = 'generalAttachment'
// Create constant for AssessmentDateFormate
export const AssessmentDateFormate = 'MM/dd/yyyy'
// Create constant for AssessmentDateTimeStamp
export const AssessmentDateTimeStamp = 'MM-dd-yyyy HH:mm:ss'
// Create constant for StrikeOutStyleClass
export const StrikeOutStyleClass = '#strikeout'
// Create constant for ScrollType
export const ScrollType = 'smooth'
// Create constant for QuarterlyString
export const QuarterlyString = 'Quarterly'
// Create constant for Attachment which pass to modal popup title
export const AttachmentString = 'Attachment'
export const SubmitSurvey = 'Please select at least 1 answer to submit Survey.';
//  Create Category class for bind category : 
export class Category {
    constructor(
        public categoryid: number = 0,
        public category: string = '',
        public questions: Question[]
    ) { }
}

// Create Question class for bind all questions : 
export class Question {
    id: number = 0
    categoryid: number = 0
    category: string = ''
    questions: string = ''
    isActive: boolean = false
    isShowTooltip: boolean = false;
    isComment: boolean = false;
    isCommentSectionShow: boolean = false
    attachedFile: string = ''
    answers: Answer[]
}

// Create Answer class for bind all answer for questions : 
export class Answer {
    id: number = 0
    questionId: number = 0
    answers: string = ''
    weightage: number = 0
    isActive: boolean = false
    createdby: number = 0
    updatedby: number = 0
}

// Create a class for bind request body
export class requestBody {
    empid: number = 0
    assessmentDate: Date
    assessmentBy: number = 0
    assessmentPeriod: string = 'Quarterly'
    remarks: string = ''
    createdby: number = 0
    GeneralStatus: number = 0
    remarksType: number = 0
    empassessmentdet: questionAnswer[]
}

//  Create claas for answer model which used for answer type in request body : 
export class questionAnswer {
    questionId: number = 0
    answerId: number = 0
    remarks: string = ''
    createdby: number = 0
}

// Create TriggerScore class for save assessment response detail which used in Trigger score page : 
export class TriggerScore {
    constructor(
        public assessmentId: number = 0,
        public assessmentById: number = 0,
        public companyId: number = 0,
        public empId: number = 0,
        public empName: string = '',
        public empScoreRank: string = '',
        public generalScoreRank: string = '',
        public managerAction: string = '',
        public ratingDate: string = '',
        public scoreRemarks: string = '',
        public scoreSummary: string = '',
        public gradeClass: string = '',
        public isDisabledBtnEmployeeDhashboard: boolean = false,
        public isDisabledBtnTruvelopDashboard: boolean = false,
    ) { }
}
//  Create claas for grade list : 
export class TriggerGrade {
    scoreId: number = 0
    scoreRank: string = ''
}

export interface AssessmentScore {
    AssessmentId: number
    ScoreFeedback: boolean
    ExpectedScoreId: number,
    FeedbackRemark: string
}

export const fieldValidator: Validator[] = [
    { id: 1, key: 'scoreId', value: '', name: 'Score', isMandatory: true, isDropdown: true },
];

export const TriggerScoreList = 'trigger-score-list';
export const SurveyConfirmation = 'Do you want to participate in a brief survey?';
export const TextDark = 'dark-text';
export const SaveAsDraftMessage = 'Employee assessment is still in draft, cannot save draft assessment again.';

export const emailPreviewDropDownList: any[] = [
{ id: 1, name:'Cancel, Save As Draft', isTriggerSent: 2},
{ id: 2, name:'Submit, Send Email Notification', isTriggerSent:1},
{ id: 3, name: `Submit, Don't Send Email Notification`, isTriggerSent: 0},
]

export const emailPreviewDropDownListForSubmitOnly: any[] = [
{ id: 1, name:'Submit, Send Email Notification', isTriggerSent:1},
{ id: 2, name: `Submit, Don't Send Email Notification`, isTriggerSent: 0},
]