import { Validator } from "../core/magic-string/common.model";
import { AlphabaticNumeric } from "../core/magic-string/Regex-pattern";

export const AddSurvey = 'Add Survey';
export const EditSurvey = 'Edit Survey';

export const SearchSurveyFields: any[string] = ['surveyName', 'fromDate', 'toDate', 'status'];
export const SurvetDesktopHeaderFields: any[string] = [{
    property: 'surveyName',
    name: 'survey Name'
},
{
    property: 'fromDate',
    name: 'from Date'
},
{
    property: 'toDate',
    name: 'to Date'
},
{
    property: 'surveyTypeName',
    name: 'survey Type Name'
},
    // {
    //     property: 'status',
    //     name: 'status'
    // }
];

export const ActiveSurvetDesktopHeaderFields: any[string] = [
    {
        property: 'surveyName',
        name: 'survey Name'
    },
    {
        property: 'createdByName',
        name: 'Created By'
    },
    {
        property: 'fromDate',
        name: 'from Date'
    },
    {
        property: 'toDate',
        name: 'to Date'
    }
]

export const SearchAcordionSurveyFields: any[string] = ['surveyName', 'status'];
export const SurvetAccordionHeaderFields: any[string] = [{
    property: 'surveyName',
    name: 'survey Name'
}
];

export enum SearchPlaceHolder {
    Survey = 'Search Survey...',
    ActiveSurvey = 'Search Active Survey...'
}

export enum SurveyType {
    EvaluationSurvey = 1,
    GlobalAssessment = 2,
    DimensionalSurvey = 3
}

export enum SurveyTypeName {
    EvaluationSurvey = 'Evaluation Survey',
    GlobalAssessment = 'Global Assessment',
    DimensionalSurvey = 'Dimensional Survey'
}

export class ResponseModel {
    public id: number = 0
    public surveyName: string = ''
    public fromDate: string = ''
    public toDate: string = ''
    public isActive: boolean = false
    public isSurveySubmitted: boolean = false
    public surveyType: number = 0
    public isPublished: boolean = false
    public surveyTypeName: string = ''
    public description: string = ''

    constructor(
        id: number = 0,
        surveyName: string = '',
        fromDate: string = '',
        toDate: string = '',
        isActive: boolean = false,
        isSurveySubmitted: boolean = false,
        surveyType: number = 0,
        isPublished: boolean = false,
        surveyTypeName: string = '',
        description: string = ''
    ) {
        this.id = id;
        this.surveyName = surveyName;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.isActive = isActive;
        this.isSurveySubmitted = isSurveySubmitted;
        this.surveyType = surveyType;
        this.isPublished = isPublished;
        this.surveyTypeName = surveyTypeName;
        this.description = description;
    }
}

export class ResponseModelActive {
    public id: number = 0;
    public surveyId: number = 0;
    public surveyName: string = '';
    public createdBy: number = 0;
    public createdByName: string = '';
    public fromDate: string = '';
    public toDate: string = '';
    public surveyType: number = 0;
    public surveyTypeName: string = '';
    public isSubmitted: boolean = false;

    constructor(
        id: number = 0,
        surveyId: number = 0,
        surveyName: string = '',
        createdBy: number = 0,
        createdByName: string = '',
        fromDate: string = '',
        toDate: string = '',
        surveyType: number = 0,
        surveyTypeName: string = '',
        isSubmitted: boolean = false
    ) {
        this.id = id;
        this.surveyId = surveyId;
        this.surveyName = surveyName;
        this.createdBy = createdBy;
        this.createdByName = createdByName;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.surveyType = surveyType;
        this.surveyTypeName = surveyTypeName;
        this.isSubmitted = isSubmitted;
    }
}

/** Create model for teams-list-request-model */
export class RequestModel {
    public teamId: number = 0
    public name: string = ''
    public description: string = ''
    public startDate: Date
    public endDate: Date
    public activityDays: number = 0
    public status: boolean = true
    public createdBy: number = 0
    public updatedBy: number = 0
    // public teamManagers: TeamManager[]
    // public teamEmployees: TeamEmployee[]
    constructor(
        teamId: number = 0,
        team: string = '',
        description: string = '',
        startDate: Date,
        endDate: Date,
        triggerActivityDays: number = 0,
        status: boolean = true,
        createdBy: number = 0,
        updatedBy: number = 0,
        // teamManagers: TeamManager[],
        // teamEmployees: TeamEmployee[]
    ) {
        this.teamId = teamId;
        this.name = team;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.activityDays = triggerActivityDays;
        this.status = status;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        // this.teamManagers = teamManagers;
        // this.teamEmployees = teamEmployees;
    }
}

export interface QuestionType {
    id: number;
    name: string;
    avatar: string
}

export const QuestionTypeArray: QuestionType[] = [
    { id: 1, name: 'Single choice', avatar: 'assets/images/dashboard/radio-button.png' },
    { id: 2, name: 'Multi choice', avatar: 'assets/images/dashboard/checkbox.png' },
    { id: 3, name: 'Free form text-box', avatar: 'assets/images/dashboard/textbox.png' }
];


export class Survey {
    constructor(
        public surveyName: string,
        public fromDate: string,
        public toDate: string,
        public isActive: boolean,
        public createdBy: number,
        public surveyWiseQuestions: Question[]
    ) { }
}

export class Question {
    constructor(
        public categoryId: number,
        public question: string,
        public answerSelectionTypeId: number,
        public orderNo: number,
        public isMandatory: boolean,
        public createdBy: number,
        public surveyWiseQuestionAnswers: Option[]
    ) { }
}

export class Option {
    constructor(
        public answers: string,
        public weightage: number,
        public orderNo: number,
        public createdBy: number
    ) { }

}

export const fieldValidator: Validator[] = [
    { id: 1, key: 'surveyName', value: '', name: 'Survey Name', isMandatory: true, minLength: 1, maxLength: 50, pattern: AlphabaticNumeric },
    { id: 2, key: 'fromDate', value: '', name: 'From Date', isMandatory: true, isDate: true },
    { id: 2, key: 'toDate', value: '', name: 'To Date', isMandatory: true, isDate: true },
    { id: 2, key: 'questionTitle', value: '', name: 'Question Title', isMandatory: true, minLength: 1, maxLength: 50 },
    { id: 2, key: 'optionText', value: '', name: 'Option Text', isMandatory: true, minLength: 1, maxLength: 50 },
];

export class SurveyRequestModel {
    public surveyId: number = 0
    public surveyName: string = ''
    public fromDate: string = ''
    public toDate: string = ''
    public surveyType: number = 0
    public surveySetOfUserConfiguration: any = []
    public surveyTeamMembers: any = []
    public isActive: boolean = true
    public isSurveyAnonymous: boolean = false
    public isSurveyMandatory: boolean = false
    public description: string = ''
    public createdBy: number = 0
    public updatedBy: number = 0
    public surveyWiseQuestions: QuestionObject[]

    constructor(
        surveyId: number = 0,
        surveyName: string = '',
        fromDate: string = '',
        toDate: string = '',
        surveyType: number = 0,
        surveySetOfUserConfiguration = [],
        surveyTeamMembers = [],
        isActive: boolean = true,
        isSurveyAnonymous: boolean = false,
        isSurveyMandatory: boolean = false,
        description: string = '',
        createdBy: number = 0,
        updatedBy: number = 0,
        surveyWiseQuestions = []
    ) {
        this.surveyId = surveyId;
        this.surveyName = surveyName;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.surveyType = surveyType;
        this.surveySetOfUserConfiguration = surveySetOfUserConfiguration
        this.surveyTeamMembers = surveyTeamMembers
        this.isActive = isActive;
        this.isSurveyAnonymous = isSurveyAnonymous,
        this.isSurveyMandatory = isSurveyMandatory,
        this.description = description;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.surveyWiseQuestions = surveyWiseQuestions
    }
}


export class SurveyResponseModel {
    public surveyId: number = 0
    public surveyName: string = ''
    public fromDate: Date
    public toDate: Date
    public surveyType: number
    public surveyTypeName: string
    public surveySetOfUserConfiguration: any;
    public surveyTeamMembers: any;
    public description: string = ''
    public isActive: boolean = true
    public isSurveyAnonymous: boolean = false
    public isSurveyMandatory: boolean = false
    public createdBy: number = 0
    public updatedBy: number = 0
    public surveyWiseQuestions: QuestionObject[]
    constructor(
        surveyId: number = 0,
        surveyName: string = '',
        fromDate: string = '',
        toDate: string = '',
        surveyType: number = 0,
        surveyTypeName: string = '',
        description: string = '',
        surveySetOfUserConfiguration: any = [],
        surveyTeamMembers: any = [],
        isActive: boolean = true,
        isSurveyAnonymous: boolean = false,
        isSurveyMandatory: boolean = false,
        createdBy: number = 0,
        updatedBy: number = 0,
        surveyWiseQuestions
    ) {
        this.surveyId = surveyId;
        this.surveyName = surveyName;
        this.fromDate = new Date(fromDate);
        this.toDate = new Date(toDate);
        this.surveyType = surveyType;
        this.surveyTypeName = surveyTypeName;
        this.description = description;
        this.surveySetOfUserConfiguration = surveySetOfUserConfiguration;
        this.surveyTeamMembers = surveyTeamMembers;
        this.isActive = isActive;
        this.isSurveyAnonymous = isSurveyAnonymous;
        this.isSurveyMandatory = isSurveyMandatory;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.surveyWiseQuestions = surveyWiseQuestions
    }
}

export class QuestionObject {
    public questionId: number = 0
    public surveyId: number = 0
    public categoryId: number = 0
    public question: string = ''
    public answerSelectionTypeId: number = 0
    public orderNo: number = 0
    public isMandatory: boolean = false
    public createdBy: number = 0
    // public updatedBy: number = 0
    public surveyWiseQuestionAnswers: AnswerObject[]
    constructor(
        questionId: number = 0,
        surveyId: number = 0,
        categoryId: number = 0,
        question: string = '',
        answerSelectionTypeId: number = 0,
        orderNo: number = 0,
        isMandatory: boolean = false,
        createdBy: number = 0,
        // updatedBy: number = 0,
        surveyWiseQuestionAnswers
    ) {
        this.questionId = questionId;
        this.surveyId = surveyId;
        this.categoryId = categoryId,
            this.question = question;
        this.answerSelectionTypeId = answerSelectionTypeId;
        this.orderNo = orderNo;
        this.isMandatory = isMandatory;
        this.createdBy = createdBy;
        // this.updatedBy = updatedBy;
        this.surveyWiseQuestionAnswers = surveyWiseQuestionAnswers
    }
}

export class AnswerObject {
    public answerId: number = 0
    public questionId: number = 0
    public answers: string = ''
    public orderNo: number = 0
    constructor(
        answerId: number = 0,
        questionId: number = 0,
        answers: string = '',
        orderNo: number = 0,
    ) {
        this.answerId = answerId;
        this.questionId = questionId;
        this.answers = answers;
        this.orderNo = orderNo;
    }
}

export class SurveyDetails {
    public name: string = ''
    public question: string = ''
    public answer: string = ''
    constructor(
        public firstname: string = '',
        public lastname: string = '',
        question: string = '',
        answer: string = '',
    ) {
        this.name = this.firstname + ' ' + this.lastname;
        this.question = question;
        this.answer = answer;
    }
}

export class SurveyTypeMaster {
    public surveyType: CommonDimensionType[]
    public dimensionList: CommonDimensionType[]
    public departmentList: CommonDimensionType[]
    public roleList: CommonDimensionType[]
    public teamList: CommonDimensionType[]
    constructor(
        surveyType: CommonDimensionType[] = [],
        dimensionList: CommonDimensionType[] = [],
        departmentList: CommonDimensionType[] = [],
        roleList: CommonDimensionType[] = [],
        teamList: CommonDimensionType[] = []
    ) {
        this.surveyType = surveyType;
        this.dimensionList = dimensionList;
        this.departmentList = departmentList;
        this.roleList = roleList;
        this.teamList = teamList;
    }
}

export class DimensionList {
    id: number
    name: string
}

export class CommonDimensionType {
    public id: number
    public name: string
    public isChecked: boolean
    constructor(
        id: number = 0,
        name: string = '',
        isChecked: boolean = false
    ) {
        this.id = id;
        this.name = name;
        this.isChecked = false;
    }
}

export interface DimensionElemet {
    dimensionId: number
    dimensionElementString: string
}

export class EmployeeList {
    public empId: number
    public firstName: string
    public lastName: string
    public fullName: string
    public isChecked: boolean
    public dimensionElementId: number
    constructor(
        empId: number = 0,
        firstName: string = '',
        lastName: string = '',
        fullName: string = '',
        isChecked: boolean = true,
        dimensionElementId: number = 0
    ) {
        this.empId = empId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = this.firstName + ' ' + this.lastName;
        this.isChecked = true;
        this.dimensionElementId = dimensionElementId;
    }
}

