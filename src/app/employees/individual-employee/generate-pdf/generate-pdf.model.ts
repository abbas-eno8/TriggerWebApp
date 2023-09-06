export class yearList {
    id?: number;
    reviewYear: string;
}

export class reportPeriod {
    fromDate: any;
    toDate: any;
}

export enum REVIEWYEAR {
    LastTwelveMonth = 'Last 12 Months',
    AllHistory = 'All History',
    SpecificDate = 'Specific Dates'
}

export interface AnnualReportDetail {
    employeeID: string
    EmpId: number
    employeeFirstName: string
    employeeLastName: string
    employeePosition: string
    yearlyScoreRank: string
    scoreSummary: string
    employeeRemarks: string
    loggedInUserName: string
    managerFirstName: string
    managerLastName: string
    YearId: string
    evaluationDate: string
    CompanyLogo: string
    UserId: number
    summaryReportingView: boolean
    sparkView: boolean
    contextualReportingView: boolean
    evaluationDetails: EvaluationDetails[]
    commentDetails: CommentDetails[]
    sparkDetails: SparkDetails[],
    sendMail: boolean
    Remark: string
    DocumentName: string
    department: string
    signature: string
    reportDuration?: string
}

export class EvaluationDetails {
    evaluationDate: string
    scoreRank: string
    scoreSummary: string
    evaluator: string
}

export class CommentDetails {
    commentDate: string
    commentDateForView: string
    performance: string
    attitude: string
    maintenance: string
    generalRemarks: string
    checked: boolean
    isTriggerSent: boolean
    commentBy: string
    scoreSummary: string
    isPerformanceCommentSend: boolean
    isAttitudeCommentSend: boolean
    isMaintenanceCommentSend: boolean
    isGeneralRemarkSend: boolean
}

export class SparkDetails {
    sparkDate: string
    sparkDateForView: string
    category: string
    classification: string
    sparkRemarks: string
    checked: boolean
    isSparkSent: boolean
    sparkBy: string
}

export interface employeePermission {
    empId: number
    summaryReportingView: boolean
    sparkView: boolean
    contextualReportingView: boolean
}

export const ByteArrayType = 'data:image/jpg;base64,';
export const TruvelopFilePath = '/assets/images/truvelop-text-logo.png';
export const AnnualReport = 'AnnualReport_';
export const DateFormat = 'dd-MM-yyyy_hh:mm:ss';
export const Export = 'Export';