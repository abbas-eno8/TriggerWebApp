/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for Dashboard.
**/
export enum GraphColor {
    IP_Player = '#6E71C6',
    A_Player = '#808080',
    B_Player = '#0eaed1',
    C_Player = '#3A97EB',
    RP_Player = '#F39C12',
    white = 'white',
    Fill_Color = '#FFFFFF',
    backgroundColor = '#FFF',
    borderColor = 'transparent'
}
export enum GraphBackgroundColor {
    DarkBackGround = '#222c41',
    LightBackGround = 'white'
}

export enum GraphYAxisLabelColor {
    DarkLabel = 'white',
    LightLabel = '#808080'
}

export enum GraplineColor {
    DarkLine = '#455270',
    LightLine = 'rgb(204, 214, 235)'
}

/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for Graph Months.
**/
export enum GraphMonths {
    Jan = 'Jan',
    Feb = 'Feb',
    Mar = 'Mar',
    Apr = 'Apr',
    May = 'May',
    Jun = 'Jun',
    Jul = 'Jul',
    Aug = 'Aug',
    Sep = 'Sep',
    Oct = 'Oct',
    Nov = 'Nov',
    Dec = 'Dec'
}

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

/**
@author : Mihir Patel
@class : Enumeration 
@description :Create enumeration for Dashboard graph modified.
**/
export enum DashboardGraphModifiedName {
    TotalNumberOfDirectReports = 'Total Number of Direct Reports',
    AverageScoreOfMyDirectReports = 'Average Score of my Direct Reports',
    TotalNumberOfMyOrganiztion = 'Total Number of my Organization',
    AverageScoreOfMyOrganization = 'Average Score of my Organization',
    MyDirectReportsColumnGraph = 'My Direct Reports-Column Graph',
    MyorganizationColumnGraph = 'My Organization-Column Graph',
    MyDirectReportsProgressiveGraph = 'My Direct Reports-Progressive Graph',
    MyOrganizationCircularGraph = 'My Organization-Circular Graph',
    MyDirectReportsProgressivePieGraph = 'My Direct Reports-Progressive Pie Graph',
    MyOrganizationCircularPieGraph = 'My Organization-Circular Pie Graph',
    MyDirectWorkLocationHistory = 'Work Location Information of My Direct Reports'
}

/**
@author : Mihir Patel
@class : Enumeration 
@description :Create enumeration for Dashboard Header name.
**/
export enum DashboardPassHeaderName {
    TotalOrgToday = 'total-org-today',
    TotalDirectReportToday = 'total-direct-report-today',
    AverageDirectReportToday = 'average-direct-report-today',
    AverageOrgToday = 'average-org-today',
    DirectReportsByAverageScore = 'direct-reports-by-average-score',
    OrgByAverageScore = 'org-by-average-score',
    DirectReportsToDateProgressive = 'direct-reports-to-date-progressive',
    DirectReportsToDateProgressivePie = 'direct-reports-to-date-progressive-pie',
    OrgToDateCircular = 'org-to-date-circular',
    OrgToDateCircularPie = 'org-to-date-circular-pie',
    DirectReportsToDate = 'direct-reports-to-date',
    OrgToDate = 'org-to-date',
    MyDirectWorkLocationHistory = 'my-direct-work-location-history'
}

/**
@author : Mihir Patel
@class : Enumeration 
@description :Create enumeration for non managerDashboard Header name.
**/
export enum NonManagerDashboardPassHeaderName {
    RequestForTrigger = 'request-for-trigger',
    RequestForSpark = 'request-for-spark',
}
/**
@author : Mihir Patel
@class : Enumeration 
@description :Create enumeration for Dashboard Error message.
**/
export enum DashboardErrorMessage {
    SelectAtleasetOneDepartment = 'Please select atleast one department.'
}

export class dashboardYear {
    AssessedYear: string = ''
    companyId: number = 0
    managerId: number = 0
}

export class departmentList {
    name: string = ''
    id: number = 0
}

export interface dashboardData {
    directRptAvgScore: number
    directRptAvgScoreRank: string
    directRptCnt: number
    lstGraphDirectRptPct: directReportsToDate[]
    lstGraphDirectRptRank: directReportsByAverageScore[]
    lstGraphOrgRptPct: orgToDateModel[]
    lstGraphOrgRptRank: orgByAverageScore[]
    lstGraphTodayDirectRpt: averageDirectReportsToday[]
    lstGraphTodayOrgRpt: orgToDateCircular[]
    orgRptAvgScore: number
    orgRptAvgScoreRank: string
    orgRptCnt: number
    truvelopTips: string
}

export class directReportsToDate {
    directMonYr: string = ''
    directMonYrId: number = 0
    directRptEmpCnt: number = 0
    directRptEmpPct: number = 0
    directScoreRank: string = ''
}

export class directReportsByAverageScore {
    directAvgMonYr: string = ''
    directAvgMonYrId: number = 0
    directAvgScoreRank: string = ''
    directRptAvgScore: number = 0
}

export class orgToDateModel {
    orgMonYr: string = ''
    orgMonYrId: number = 0
    orgRptEmpCnt: number = 0
    orgRptEmpPct: number = 0
    orgScoreRank: string = ''
}

export class orgByAverageScore {
    orgAvgMonYr: string = ''
    orgAvgMonYrId: number = 0
    orgAvgScoreRank: string = ''
    orgRptAvgScore: number = 0
}

export class averageDirectReportsToday {
    TodayDirectRptCnt: number = 0
    TodayDirectRptRank: string = ''
    TodayRptEmpList: string = ''
}

export class orgToDateCircular {
    TodayOrgEmpList: string = ''
    TodayOrgRptCnt: number = 0
    TodayOrgRptRank: string = ''
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
export const ThreeColumnDivContaierRef = 'threeColumnDivContaierRef';
export const SixColumnDivContaierRef = 'sixColumnDivContaierRef'
export const MyDirectWorkLocationHistoryContainerRef = 'myDirectWorkLocationHistoryContainerRef'
export const IDConstatnt = 'id'
export const TrueAsString = 'true'
export const Year2020 = 2020;

/**
@author : Anjali Tandel
@class : Model  
@description : line-graph model.
**/
export class LinGraph {
    constructor(
        public id: number = 0,
        public y: number = 0.0,
        public grade: string = '',
        public xAxis: string = '',
        public year: number = 0
    ) { }
}
export const linGraphs: LinGraph[] = [
    { id: 1, y: 0, grade: '0', xAxis: '', year: 0 },
    { id: 1, y: 1, grade: GraphGrade.RP, xAxis: '', year: 0 },
    { id: 1, y: 1.8, grade: GraphGrade.C_Minus, xAxis: '', year: 0 },
    { id: 1, y: 2, grade: GraphGrade.C, xAxis: '', year: 0 },
    { id: 2, y: 2.2, grade: GraphGrade.C_Plus, xAxis: '', year: 0, },
    { id: 3, y: 2.8, grade: GraphGrade.B_Minus, xAxis: '', year: 0, },
    { id: 4, y: 3, grade: GraphGrade.B, xAxis: '', year: 0, },
    { id: 5, y: 3.2, grade: GraphGrade.B_Plus, xAxis: '', year: 0, },
    { id: 6, y: 3.8, grade: GraphGrade.A_Minus, xAxis: '', year: 0, },
    { id: 7, y: 4, grade: GraphGrade.A, xAxis: '', year: 0, },
    { id: 8, y: 4.2, grade: GraphGrade.A_Plus, xAxis: '', year: 0, },
    { id: 8, y: 5, grade: GraphGrade.IP, xAxis: '', year: 0, }
];

export class RedirectionParam {
    constructor(
        public widgetId: number = 0,
        public grade: string = '',
        public month: string = '',
    ) { }
}

export enum widgetType {
    directWidgetId = 1,
    organizationWidgetId = 2
}