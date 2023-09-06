/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for Graph grade.
**/
export enum GraphGrade {
    RP = 'RP',
    C = 'C',
    C_Minus = 'C-',
    C_Plus = 'C+',
    B = 'B',
    B_Minus = 'B-',
    B_Plus = 'B+',
    A = 'A',
    A_Minus = 'A-',
    A_Plus = 'A+',
    IP = 'IP'
}

export enum TeamDashboardPassHeaderName {
    TeamAverageScore = 'team-average-score',
    TeamAverageScoreByDay = 'team-average-score-by-day'
}

/**
@author : Mihir Patel
@class : Enumeration 
@description :Create enumeration for Dashboard Error message.
**/
export enum DashboardErrorMessage {
    SelectAtleasetOneDepartment = 'Please select atleast one department.',
    SelectAtleasetOneManager = 'Please select atleast one manager.'
}

export class widgetData {
    id: number
    userId: number = 0
    widgetId: string = '0'
    tileSelector: string = ''
    isActive: boolean = false
    sequenceNumber: number = 0
    tileSequence: number = 0
    position: any
    widgetActualName: string = ''
}

export class widgetDetail {
    tabindex: string
    position: string
    selector: string
}

export const CurrentRouteUrl = '/dashboard';
export const RefrshComponent = '/RefrshComponent';
export const DataItemID = 'data-item-id';
export const DragItemPositioned = 'dragItemPositioned';
export const Dashboard_ = 'Dashboard_';
export const IN = 'In ';
export const Today = 'Today';
export const NameConstant = 'name';
export const NullConstatnt = 'null';
export const OpenSelectDropdownClass = 'open-select-dropdown';
export const OpenRequestSelectDropdownClass = 'open-request-select-dropdown';
export const IDConstatnt = 'id'
export const TrueAsString = 'true'
export const AverageScore = 'avrScore'
export const AverageScoreByDay = 'avrScoreByDay'
export const TeamsMobileView = 'teamsMobileView'
export const TeamDashboardStatus = 'TeamDashboardStatus'
export const MyDashboardStatus = 'MyDashboardStatus'
export const DashboardStatus = 'DashboardStatus'

/** Create model for TeamDashboard*/
export class TeamDashboard {
    public teamId: number = 0
    public yearId: number = 0
    public AverageScore: any
    public AverageScoreByDay: any
    constructor(
        teamId: number = 0,
        yearId: number = 0,
        teamAvgScore: any,
        teamAvgeScoreByDay: any, ) {
        this.teamId = teamId
        this.yearId = yearId,
            this.AverageScore = teamAvgScore
        this.AverageScoreByDay = teamAvgeScoreByDay;
    }
}

/** Create model for TeamDashboard*/
export class TeamScore {
    public teamAvgscore: number = 0
    public teamAvgscoreRank: string = ''
    constructor(
        teamAvgscore: number = 0,
        teamAvgscoreRank: string = '') {
        this.teamAvgscore = teamAvgscore
        this.teamAvgscoreRank = teamAvgscoreRank
    }
}

export const TeamAvgScore = 'Team Average Score';
export const TeamAvgScoreByDay = 'Team Average Score By Day';


export const TeamWidget = 'team-average-score';
export const TeamWidgetByDay = 'team-average-score-by-day';

export enum WidgetType {
    TeamWidgetType = 3,
    NonManagerWidgetType = 4
}

export class Widget {
    constructor(
        public userId: number = 0,
        public widgetId: number = 0,
        public position: number = 0,
        public sequenceNumber: number = 0,
        public tileSequence: number = 0,
        public widgetName: string = '',
        public isActive: boolean = false,
    ) { }
}

export class ManagerListModal {
    empId: number = 0
    empStatus: boolean = false
    firstName: string = ''
    lastName: string = ''
    fullName: string = ''
}

export const RequestForSpark = 'Request for Spark'
export const RequestForTrigger = 'Request for Evaluation'

export interface dashboardButtonsStatus {
    isManagerDashboard: boolean,
    isTeamDashoard: boolean,
    isMyDashboard: boolean,
    isMyWall: boolean
}

export class CreateRequest {
    id: string
    managerId: number
    actionId: number
    action: string
    requestStatus: number
    status: string
    managerFirstName: string
    managerLastName: string
    createdDate: string
    managerName: string
    remarks: string
}

export const CreateRequestAccordionTableColumn = ['status','action']
/** Create constant for Display-column of Desktop & accrodian view */
export const CreateRequestNormalTableColumn = ['status', 'action', 'managerName','remarks', 'createdDate'];

export class MyRequest {
    id: string
    empId: number
    actionId: number
    action: string
    requestStatus: number
    status: string
    requestStatusName: string
    firstName: string
    lastName: string
    createdDate: string
    requesterName: string
    remarks: string
}

export const MyRequestAccordionTableColumn = ['status', 'action', 'button']
/** Create constant for Display-column of Desktop & accrodian view */
export const MyRequestNormalTableColumn = ['status', 'action', 'requesterName','remarks', 'createdDate', 'button'];

export const CreateRequestSearchField = ['status','action', 'managerName', 'createdDate', 'requestStatus','remarks'];

export const MyRequestSearchField = ['status','action', 'requesterName', 'createdDate', 'requestStatus','remarks'];

// MyDashboardPermission class create for bind permission of my dashboard accordion : 
export class MyDashboardPermission { 
    canViewScore: boolean
    canViewSummary: boolean
    canViewDetail: boolean
    canViewContextual: boolean
    requestForSpark: boolean
    requestForTrigger: boolean
}

// MyDashboardDetail class create for bind data of my dashboard
export class MyDashboardDetail {
    empId: number
    empName: string
    actualRating: number
    lastYearActualRating: number
    lastScoreRank: string
    lastScoreRankClass: string
    lastScore: number
    currentYrAvgScoreRank: string
    currentYrAvgScoreRankClass: string
    currentYrAvgScore: number
    lyrAvgScoreRank: string
    lyrAvgScoreRankClass: string
    lastAssessedDate: string
    lyrAvgScore: number
    lastScoreRemarks: string
    lastEmployeeRemarks: string
    lastManagerAction: string
    lastScoreSummary: string
    lastGeneralScoreRank: string
    graphCategories: any
    remarks: Remark[]
    spark: Spark[]
    evaluationStatus: any
    empBOTSuggestion: string
}

// For bind Comment data of my dashboard
export class Remark {
    name: string
    profileName: string
    empid: number
    category: string
    remark: string
    status: number
    assessmentDate: string
    firstName: string
    lastName: string
    assessmentByImgPath: string
    documentName: string
    assessmentId: number
    assessmentById: number
    remarkId: number
    cloudFilePath: string
    attachmentFileName: string
    attachmentpath: string
    isPreview:boolean
    isCsvFile: boolean
    isSpark: boolean
    scoreSummary: string
    isPerformanceCommentSend: number
    isAttitudeCommentSend: number
    isMaintenanceCommentSend: number
    isGeneralRemarkSend: number
}

// For bind spark list :
export class Spark {
    empId: number
    sparkId: number
    categoryId: number
    category: string
    classificationId: number
    classification: string
    sparkDate: string
    sparkBy: number
    sparkByFirstName: string
    sparkByLastName: string
    documentName: string
    cloudFilePath: string
    remarks: string
    bActive: boolean
    createdBy: number
    updatedBy: number
    sparkByImgPath: string
    profileName: string
    givenBy: string
    isPreviewFile: boolean
    path: string
    isSpark: boolean
}

export const Completed = 'Completed';
export const Pending = 'Pending';
export const OnGoing = 'OnGoing';
export const History = 'History';
export const DateFormat = 'MM-DD-YYYY';
export const MyRequestConst = 'MyRequest';
export const CreateRequestConst = 'CreateRequest'