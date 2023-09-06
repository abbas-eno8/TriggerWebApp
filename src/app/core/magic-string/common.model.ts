/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for role.
**/
export enum RoleEnum {
    TriggerAdmin = 'TriggerAdmin',
    Executive = 'Executive',
    Admin = 'Admin',
    Manager = 'Manager',
    Employee = 'Non-Manager',
}

export enum Role {
    TriggerAdmin = 1,
    Admin = 2,
    Manager = 3,
    Executive = 4,
    Employee = 5,
}


export enum Actions {
    TriggerAnEmployee = 1,
    SparkAnEmployee = 2,
    EmployeeDashboard = 3,
    Comment = 4,
    TeamConfiguraton = 5,
    TeamDashboard = 6,
    RequestForTrigger = 7,
    RequestForSpark = 8,
    SummaryReporting = 9,
    DetailReporting = 10,
    ContextualReporting = 11,
    ScoreReporting = 12,
    EvaluationsInDrafts = 13
}

export enum Dimension {
    Role = 1,
    Relation = 2,
    Department = 3,
    Team = 4,
    ProtectionLevel = 5
}

export enum Relation {
    Direct = 1,
    Hierarchal = 2,
    Indirect = 3
}

export enum DepartmentType {
    Inside = 1,
    Outside = 2
}

export enum TeamType {
    Connected = 1,
    Oversight = 2
}

export enum ProtectionLevel {
    Low = 1,
    Medium = 2,
    High = 3
}

/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for common Api Response status.
**/
export enum ApiResponseStatus {
    Success = 200,
    AlreadyReported = 208,
    UnAssigned = 209,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    NotModified = 304,
    NotFound = 404,
    Gone = 410,
    AccessDenied = 402,
    Forbidden = 403,
    InternalServer = 500,
    UnauthorizeAccess = 401,
    NotImplemented = 501,
    PreconditionFailed = 412,
    UpgradeRequired = 426,
    ContinueInformational = 100
}

/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for Url route.
**/
export enum Route {
    Client = '/clients',
    AddClient = '/clients/add-client',
    EditClient = '/clients/edit-client/',
    Admin = '/admin',
    AddAdmin = '/admin/add-admin',
    EditAdmin = '/admin/edit-admin/',
    Employee = '/team-members',
    AddEmployee = '/team-members/add-team-member/',
    IndividualEmployee = '/team-members/individual-employee/',
    // TriggerScore = '/evaluate-employee/trigger-score/',
    TriggerScore = '/evaluate-team-member/trigger-score/',
    ExcelUpload = '/excel-upload/',
    Dashboard = '/dashboard',
    // TriggerEmployee = '/evaluate-employee',
    TriggerEmployee = '/evaluate-team-member',
    Department = '/department',
    ChangePassword = '/change-password',
    UserProfile = '/user-profile',
    ContactUs = '/contact-us',
    SparkAnEmployee = '/team-members/spark-team-member',
    Team = '/teams',
    AddTeam = '/teams/add-team/',
    EditTeam = '/teams/edit-team/',
    SparkNotification = '/spark-notification',
    UnauthorizeAccess = '/unauthorize-access',
    PlatformCheck = '/platform-Checking',
    Survey = '/survey',
    SurveyDeatils = '/survey/details',
    AddSurvey = '/survey/add-survey/',
    EditSurvey = '/survey/edit-survey/',
    PreviewSurvey = '/survey/preview-survey/',
    MyWall = '/my-wall',
    UpdateWorkLocation = '/update-work-location',
    RecognitionWall = '/recognition-wall',
    Spark = '/spark',
    EvaluationsInDrafts = '/evaluations-in-drafts'
}

/**
@author : Sonal Patil
@class : Enumeration 
@description :Create enumeration for common Api.
**/
export enum ApiURL {
    Client = 'client/',
    Department = 'department/',
    QuestionList = 'questionnaries/',
    Category = 'Questionnaries/category/',
    Assesment = 'assessment/',
    AssessmentYear = 'assessmentyear/',
    IndustyType = 'industrytype/',
    Notification = 'notification/',
    ActionRequest = 'ActionRequest/',
    ChangePassword = 'changepassword',
    Dashboard = 'dashboard/',
    ExcelUpload = 'excelupload/',
    ImportExcelData = 'excelupload/upload/',
    Employee = 'employee/',
    Employees = 'employees/',
    DashboardTeamMember = 'TeamMemberList/Dashboard',
    Allemployee = 'allemployee/',
    Allemployees = 'allemployees/',
    ActiveManagers = 'employee/ActiveManagerList/',
    NonManager = 'employee/nonmanagers/',
    DashboardEmployees = 'dashboardemployees/',
    Widget = 'widget/',
    Role = 'role/',
    Ethnicity = 'ethnicity/',
    Country = 'country/',
    Region = 'region/',
    Login = 'login',
    ChangeProfile = 'changeprofile/',
    Admin = 'CompanyAdmin/',
    SendMail = 'sendmail/',
    ChangeEmpSalary = 'changeempsalary/',
    EditProfile = 'editProfile/',
    AllowSms = 'allowSms/',
    Theme = 'Theme/',
    SmsVerification = 'SmsService/',
    ContactUs = 'ContactUs/',
    SystemConfiguration = 'SystemConfiguration',
    Dimension = 'Dimension/',
    DimensionElements = 'DimensionElements/',
    ActionPermission = 'ActionPermission/',
    TriggerEmployee = 'employee/triggeremplist/',
    DashboardEmployee = 'employee/dashboardemplist/',
    CheckActionPermission = 'actionPermission/checkpermission',
    AssessmentComment = 'Assessment/Comment',
    Attachment = 'Assessment/Attachment',
    SparkAnEmployee = 'EmployeeSpark/',
    SparkAnEmployeeAttachment = 'EmployeeSpark/Attachment',
    Classification = 'Classification/',
    UnApprovedSpark = 'UnApprovedSpark',
    SmsSparkApproval = 'SmsSparkApproval',
    TeamConfiguration = 'teamConfiguration/',
    TeamDashboard = 'TeamDashboard/',
    TeamAssessmentYear = 'TeamDashboard/assessmentYear/',
    TeamConfigurationSetInactive = 'teamConfiguration/SetInactive/',
    OrganizationType = 'OrganizationType',
    TriggerScore = 'questionnaries/ScoreRank',
    ScoreFeedback = 'Assessment/ScoreFeedback',
    NonmanagerDashboardManagerList = 'Nonmanager/dashboard/managerlist/',
    NonmanagerDashboarSendActionRequest = 'Nonmanager/dashboard/sendactionrequest',
    myDashboarSendActionRequest = 'mydashboard/sendactionrequest',
    CreatedRequestList = 'MyDashboard/CreatedRequestList',
    ActionRequestDetail = 'ActionRequest/',
    MyRequestList = 'MyDashboard/MyRequestList',
    Mydashboard = 'mydashboard',
    generatePDFYear = 'AnnualReviewReport/ReviewYear/',
    AnnualReviewReport = 'AnnualReviewReport/',
    SendEmailWithPDF = 'AnnualReviewReport/Email',
    SendActionWiseEmail = 'SendActionWiseEmail',
    PermissionwiseDimensionElements = 'DimensionElements/permissionwise',
    CustomColumnConfig = 'CustomColumnConfig/',
    Survey = 'Survey/',
    Spark = 'Spark/',
    SubmittedSurvey = 'Survey/SubmittedSurvey/',
    UpdateStatus = 'UpdateStatus/',
    MyWall = 'MyWall/',
    React = 'React/',
    ReactType = 'ReactType/',
    Comment = 'Comment/',
    WorkLocation = 'WorkLocation/',
    EmployeeSparkReply = 'EmployeeSpark/Reply',
    SurveyTypeConfiguration = 'SurveyTypeConfiguration/',
    GlobalAssessment = 'GlobalAssessment/',
    SendAssessmentNotification = 'SendAssessmentNotification/',
    TeamMemberByDimension = 'TeamMemberList/DimensionElement/',
    TeamMemberWorkLocation = 'TeamMemberWorkLocation/',
    Today = 'Today/',
    History = 'History/',
    WorkStatus = 'WorkStatus/',
    SubmittedSurveyAnswerDetails = 'SubmittedSurveyAnswerDetails/',
    ActiveSurvey = 'ActiveSurvey/',
    assessmentPublishEmailPreview = 'Assessment/publish/EmailPreview/',
    publishAssessment = 'Assessment/publish',
}

/**
@author : Anjali Tandel
@class : Enumeration 
@description : Create enumeration for version API.
**/
export enum Api {
    Version = '/api/'
}

export enum Version {
    Version1 = '1.0',
    Version2 = '2.0'
}

export enum Version2 {
    Version1 = '2.1',
    Version2 = '2.2',
    Version3 = '2.3',
    Version4 = '2.4'
}

// For set search default value in all files.
export const Default_Search_Value: string = 'all records';
export const True: string = 'true';
export const False: string = 'false';
export const Null: string = 'null';
export const Error_Type: string = 'error';
export const Error_Title: string = 'Error';
export const Success_Type: string = 'success';
export const Success_Title: string = 'Success';
export const Warning_Type: string = 'warning';
export const Warning_Title: string = 'Warning';
export const Error_Input_class: string = 'border-danger';

/**
@author : Mihir Patel
@class : Enumeration 
@description :Create enumeration for Common string which are compared.
**/
export enum CompareString {
    To_Date = 'To Date',
    Over_The_Last_12Months = 'Over The Last 12 Months',
    Last_12Months = 'Last 12 Months',
    Excel_Prefix = 'Select Prefix',
    Excel_Role = 'Select Role',
    Excel_Manager = 'Select Manager:',
    Excel_Department = 'Select Department',
    Excel_Status = 'Select Status',
    Excel_Country = 'Select Country',
    Excel_Region = 'Select Region',
    Excel_Calling_Code = 'Select Country Calling Code',
    Invalid_Date = 'Invalid date',
    Valid_Date_Format = 'MM-DD-YYYY',
}

/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for Url route.
**/
export enum RouteUrl {
    Login = 'login',
    ResetPassword = 'reset-password',
    Home = 'home',
    AuthCallBack = 'auth-callback',
    Dashboard = 'dashboard',
    // TriggerEmployee = 'evaluate-employee',
    TriggerEmployee = 'evaluate-team-member',
    Employee = 'team-members',
    RecognitionWall = 'recognition-wall',
    AddEmployee = 'add-team-member',
    // Employee = 'team-members',
    // AddEmployee = 'add-team-member',
    InvidualEmployee = 'individual-employee',
    ExcelUpload = 'excel-upload',
    Client = 'clients',
    ClientProfile = 'Client Profile',
    AddClient = 'add-client',
    EditClient = 'edit-client',
    Admin = 'admin',
    AddAdmin = 'add-admin',
    EditAdmin = 'edit-admin',
    Department = 'department',
    AddDepartment = 'add-department',
    ChangePassword = 'change-password',
    TriggerScore = 'trigger-score',
    SmsConfirmation = 'sms-confirmation',
    SmsConfirmationRoute = '/user-profile/sms-confirmation',
    UserProfile = 'user-profile',
    ContactUs = 'contact-us',
    Dimension = 'dimension',
    Permission = 'permission',
    SparkAnEmployee = 'spark-team-member',
    Teams = 'teams',
    AddTeam = 'add-team',
    EditTeam = 'edit-team',
    UnauthorizeAccess = 'unauthorize-access',
    SparkNotification = 'spark-notification',
    Spark = 'spark',
    PlatformCheck = 'platform-Checking',
    Survey = 'survey',
    ActiveSurvey = 'active-survey',
    SurveyDetails = 'details',
    AddSurvey = 'add-survey',
    EditSurvey = 'edit-survey',
    PreviewSurvey = 'preview-survey',
    MyWall = 'my-wall',
    UpdateWorkLocation = 'update-work-location',
    EvaluationsInDrafts = 'evaluations-in-drafts'
}

export enum SidebarName {
    Dashboard = 'Dashboard',
    TriggerEmployee = 'Evaluate Team Member',
    RecognitionWall = 'Recognition Wall',
    Employee = 'Team Member',
    Client = 'Clients',
    ClientProfile = 'Client Profile',
    Admin = 'Admin',
    Department = 'Department',
    Dimension = 'Dimension',
    Permission = 'Permission',
    Teams = 'Team',
    Survey = 'Survey',
    ActiveSurvey = 'Active Survey',
    MyWall = 'My Wall',
    Spark = 'Spark',
    EvaluationsInDraft = 'Evaluation(s) In Draft'
}


/**
@author : Anjali Tandel
@class : dashboardClassByGrade 
@description : dashboard Class by grade.
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

export enum GraphId {
    A_Plus = 1,
    A = 2,
    A_Minus = 3,
    B_Plus = 4,
    B = 5,
    B_Minus = 6,
    C_Plus = 7,
    C = 8,
    C_Minus = 9,
    RP = 10,
    IP = 11
}

export class dashboardClassByGrade {
    constructor(
        public id: number = 0,
        public grade: string = '',
        public bindClass: string = '',
        public summary: string,
        public y: number,
        public xAxisValue: any,
        public year: string
    ) { }
}

export const dashboardClass: dashboardClassByGrade[] = [
    { id: 1, grade: 'A+', bindClass: 'text-secondary-dark', summary: 'Exceptional Contributor', y: 10.5, xAxisValue: 0, year: '' },
    { id: 2, grade: 'A', bindClass: 'text-secondary-dark', summary: 'Leading Contributor', y: 9.5, xAxisValue: 0, year: '' },
    { id: 3, grade: 'A-', bindClass: 'text-secondary-dark', summary: 'Core Contributor', y: 8.5, xAxisValue: 0, year: '' },
    { id: 4, grade: 'B+', bindClass: 'text-info-light', summary: 'Rising Performer', y: 7.5, xAxisValue: 0, year: '' },
    { id: 5, grade: 'B', bindClass: 'text-info-light', summary: 'Steady Performer', y: 6.5, xAxisValue: 0, year: '' },
    { id: 6, grade: 'B-', bindClass: 'text-info-light', summary: 'Improvement Performer', y: 5.5, xAxisValue: 0, year: '' },
    { id: 7, grade: 'C+', bindClass: 'text-info', summary: 'Lagging Performer', y: 4.5, xAxisValue: 0, year: '' },
    { id: 8, grade: 'C', bindClass: 'text-info', summary: 'Low Performer', y: 3.5, xAxisValue: 0, year: '' },
    { id: 9, grade: 'C-', bindClass: 'text-info', summary: 'Under Performing', y: 2.5, xAxisValue: 0, year: '' },
    { id: 10, grade: 'RP', bindClass: 'text-warning', summary: 'Not Performing', y: 1.5, xAxisValue: 0, year: '' },
    { id: 11, grade: 'IP', bindClass: 'text-secondary', summary: 'Exceptional', y: 11.5, xAxisValue: 0, year: '' },
]

export const xAxisValues = [
    { id: 1, xAxisValue: 1, x: 1.5 },
    { id: 1, xAxisValue: 2, x: 1.7 },
    { id: 1, xAxisValue: 3, x: 1.9 },
    { id: 1, xAxisValue: 4, x: 2.2 },
    { id: 2, xAxisValue: 5, x: 2.5 },
    { id: 1, xAxisValue: 6, x: 2.7 },
    { id: 1, xAxisValue: 7, x: 2.9 },
    { id: 1, xAxisValue: 8, x: 3.1 },
    { id: 1, xAxisValue: 9, x: 3.3 },
    { id: 3, xAxisValue: 10, x: 3.5 },
    { id: 4, xAxisValue: 11, x: 3.7 },
    { id: 4, xAxisValue: 12, x: 3.9 },
    { id: 4, xAxisValue: 13, x: 4.1 },
    { id: 4, xAxisValue: 14, x: 4.3 },
    { id: 4, xAxisValue: 15, x: 4.5 },
    { id: 4, xAxisValue: 16, x: 4.7 },
    { id: 4, xAxisValue: 17, x: 4.9 },
    { id: 4, xAxisValue: 18, x: 5.1 },
    { id: 4, xAxisValue: 19, x: 5.3 },
    { id: 4, xAxisValue: 20, x: 5.5 },
    { id: 5, xAxisValue: 21, x: 5.7 },
    { id: 4, xAxisValue: 22, x: 5.9 },
    { id: 4, xAxisValue: 23, x: 6.1 },
    { id: 4, xAxisValue: 24, x: 6.3 },
    { id: 5, xAxisValue: 25, x: 6.5 },
    { id: 5, xAxisValue: 26, x: 6.7 },
    { id: 5, xAxisValue: 27, x: 6.9 },
    { id: 5, xAxisValue: 28, x: 7.1 },
    { id: 5, xAxisValue: 29, x: 7.3 },
    { id: 6, xAxisValue: 30, x: 7.5 },
    { id: 6, xAxisValue: 31, x: 7.6 },
]

/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for Load-children path.
**/
export enum LoadChildren {
    Admin = './admin/admin.module#AdminModule',
    client = './clients/clients.module#ClientsModule',
    employee = './employees/employees.module#EmployeesModule',
    Department = './department/department.module#DepartmentModule',
    Dashboard = './dashboard/dashboard.module#DashboardModule',
    //Dashboard = './manager-dashboard/manager-dashboard.module#ManagerDashboardModule',
    Assesment = './assessment/assessment.module#AssessmentModule',
    AddAdmin = './add-admin/add-admin.module#AddAdminModule',
    AddClient = './add-client/add-client.module#AddClientModule',
    AddEmployee = './add-employee/add-employee.module#AddEmployeeModule',
    IndividualEmployee = './individual-employee/individual-employee.module#IndividualEmployeeModule',
    ExcelUpload = './excel-upload/excel-upload.module#ExcelUploadModule',
    UserProfile = './user-profile/user-profile.module#UserProfileModule',
    SmsConfirmation = './sms-confirmation/sms-confirmation.module#SmsConfirmationModule',
    ChangePassword = './change-password/change-password.module#ChangePasswordModule',
    ContactUs = './contact-us/contact-us.module#ContactUsModule',
    Masters = './masters/masters.module#MasterModule',
    Permission = './permissions/permissions.module#PermissionsModule',
    SparkAnEmployee = './spark-an-employee/spark-an-employee.module#SparkAnEmployeeModule',
    Teams = './teams/teams.module#TeamsModule',
    AddTeam = './add-client/add-client.module#AddClientModule',
    SparkNotification = './spark-notification/spark-notification.module#SparkNotificationModule',
}

/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for sidebar menu icon.
**/
export enum Icon {
    Dashboard = 'icon icon-dashboard-1',
    Employee = 'icon icon-user',
    Client = 'icon icon-business',
    Admin = 'icon icon-profile-settings',
    ClientProfile = 'icon icon-user-building',
    TriggerEmployee = 'icon icon-trigger',
    Dimension = 'icon icon-user-star',
    Permission = 'icon icon-gears',
    Team = 'icon icon-team',
    Survey = 'icon icon-survey',
    ActiveSurvey = 'icon icon-survey',
    RecognitionWall = 'icon icon-dashboard',
    Spark = 'icon icon-spark',
    EvaluationsInDrafts = 'icon font-icon-draft'
}

/**
@author : Anjali Tandel
@class : Validator 
@description :Create Validator for field-validation.
**/
export interface Validator {
    id: number;
    key: string;
    value: string;
    name: string;
    isMandatory: boolean
    maxLength?: number;
    minLength?: number;
    maxInput?: number;
    pattern?: any;
    isDate?: boolean;
    isDropdown?: boolean;
    isSelectDropdown?: boolean;
}

export enum SortDirection {
    Decending = 'desc',
    Ascending = 'asc'
}

export enum LangaugeType {
    English = 'en'
}

export enum CommonCssClass {
    PaginationDropdownPosition = 'pagination-dropdown-position',
    ToggleDropdownMenu = 'toggle-dropdown-menu',
    ShowClassName = 'show'
}

export class ApiResponse {
    constructor(
        public data: any[],
        public status: string = '',
        public message: string = '',
    ) { }
}

export class ResponseById {
    constructor(
        public data: any,
        public status: string = '',
        public message: string = '',
    ) { }
}

export enum PopupPanelClass {
    lgContainer = 'lg-dialog-container',
    customContainer = 'custom-dialog-container',
    extraLargeContainer = 'xl-dialog-container'
};

export enum Regex {
    CloudUrl = "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|HTTP:\/\/WWW\.|HTTPS:\/\/WWW\.|HTTP:\/\/|HTTPS:\/\/)[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,}(:[0-9]{1,5})?(\/.*)?$"
}

export const Base64SplitString = 'base64,'
export const CountryCallingApi = 'https://restcountries.eu/rest/v2/all';
export const AzureUrl = 'blob.core.windows.net/assessmentdoc';
export const CdkOverlayPane = 'cdk-overlay-pane';
// Dashboard constants : 
export const GridItemClass = '.grid-item';
export const GridSizerClass = '.grid-sizer';
export const IconDragDropClass = '.icon-dragdrop';
export const GridClass = '.grid';
export const IconSortingUpClass = 'icon-sorting-up';
export const IconSortingDownClass = 'icon-sorting-down';
export const IconSortingUpDownClass = 'icon-sorting-updown';
/** Create constant for Records per page string */
export const RecordPerPage = 'Records per page :'
/** Create constant for MainDiv string */
export const MainDiv = 'mainDIV'
/** Create constant for cdk-overlay-pane */
export const CskOverlayPanel = 'cdk-overlay-pane';
export const Records = 'Records:'
export const DesktopWidth = '(min-width: 1250px)';
export const DateTimeFormate = 'MM-dd-yyyy HH:mm:ss'
export const UTCTimeFormate = 'UTC/GMT'

/** Create constant for client search fields, this fields are from API response */
export const FileTypes: any[string] = ['xls', 'xlsx', 'pdf', 'rtf', 'x-rtf', 'doc', 'docx', 'ppt', 'pptx', 'txt'];
// Create constant for declare  file size which used to checked attached file size
export const FileMaxSize: number = 3.0000;
export const NextRoute = 'next-route';

/**
 * Author : Anjali Tandel
 * Modified-Date :  09-04-2019
 * Description : Create menu interface for menu bar list.
 */
export interface HeaderParameter {
    title: string,
    icon: string,
    redirectTo: string
}
export enum NotificationType {
    Employee = 1,
    TriggerAnEmployee = 2,
    Spark = 3,
    UnApprovedSpark = 4,
    PublicSpark = 5,
    sparkListReply = 6,
    myDashboardReply = 7,
    GlobalAssessment = 8,
    UpdateWorkLocation = 9,
    UpdateSurveyForm = 10,
    EvaluationaInDraft = 11,
    AddNewSpark = 12,
    AddNewEvaluationa = 13
};

export enum ActionType {
    TriggerAnEmployee = 1,
    Spark = 2
};

export class NotificationModel {
    constructor(
        public id: number = 0,
        public empId: number = 0,
        public managerId: number = 0,
        public actionId: number = 0,
        public requestId: number = 0,
        public message: string = '',
        public type: number = 0,
        public markAs: boolean = false,
        public totalRows: number = 0
    ) { }
}

export enum SystemType {
    Browser = 1,
    Android = 2,
    IOS = 3
}

export const PlayStoreLink = 'https://play.google.com/store/apps/details?id=com.trigger.transformation';
export const AppleStoreLink = 'https://itunes.apple.com/in/app/trigger-transformation/id1401786101?mt=8';

export class SendMail {
    public id: number = 0
    public actionId: number = 0
    public employeeEmail: string = ''
    public sendSpark: number = 0
    public sendTrigger: number = 0
    public emailContent: string = ''
    constructor(
        id: number = 0,
        actionId: number = 0,
        // sendSpark: number = 0,
        // sendTrigger: number = 0,
        employeeEmail: string = '',
        emailContent: string = '',
    ) {
        this.id = id;
        this.actionId = actionId;
        this.sendSpark = actionId === ActionType.Spark ? 1 : 0;
        this.sendTrigger = actionId === ActionType.TriggerAnEmployee ? 1 : 0;
        this.employeeEmail = employeeEmail;
        this.emailContent = emailContent;
    }
}

export const Pages = [50, 100, 150];


export enum ThemeClass {
    Black = 'modal-background-with-dialog-container',
    White = 'modal-white-background-with-dialog-container'
};

export interface dashboardButtonsStatus {
    isManagerDashboard: boolean,
    isTeamDashoard: boolean,
    isMyDashboard: boolean,
    isMyWall: boolean
}
export const DashboardStatus = 'DashboardStatus';
export const TeamDashboardStatus = 'TeamDashboardStatus';
export const MyDashboardStatus = 'MyDashboardStatus';
export const ManagerDashboard = 'ManagerDashboard';
export const TeamDashboard = 'TeamDashboard';
export const MyDashboard = 'MyDashboard';
export const MyWall = 'MyWall';

export interface sparkDetailByRoute {
    widgetHeader: string,
    tooltipId: number,
    routeType: string,
    empId: number,
    dashboardTypeId: number,
    isRedirectFromNotification: boolean
}

export const SparkDetail = 'sparkDetail';

export class CurrentSparkAnEmployee {
    public userId: number
    public empId: number
    public firstName: string
    public lastName: string
    public isSparkViewable: boolean
    public isSparkAddable: boolean
    public isSparkEditable: boolean
    public isSparkDeletable: boolean
    public sendSpark: boolean
    constructor(
        userId: number = 0,
        id: number = 0,
        firstName: string = '',
        lastName: string = '',
        isSparkViewable: boolean = false,
        isSparkAddable: boolean = false,
        isSparkEditable: boolean = false,
        isSparkDeletable: boolean = false,
        sendSpark: boolean = false
    ) {
        this.userId = userId
        this.empId = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isSparkViewable = isSparkViewable;
        this.isSparkAddable = isSparkAddable,
            this.isSparkEditable = isSparkEditable,
            this.isSparkDeletable = isSparkDeletable
        this.sendSpark = sendSpark
    }
}


/** Create ClientModel for data transfer to api */
export class UpdateWorkLocation {
    public empId: number
    public workLocationId: number
    public workDate: string
    public createdBy: number
    constructor(
        empId: number,
        workLocationId: number,
        workDate: string,
        createdBy: number
    ) {
        this.workLocationId = workLocationId;
        this.empId = empId;
        this.createdBy = createdBy;
        this.workDate = workDate;
    }
};

export enum DashboardTypeId {
    TeamMemberDashboard = 1,
    MyDashboard = 2,
    SparkList = 3
}

// Create constant for AssessmentDateFormate
export const DateFormat = 'MM-dd-yyyy'
export const ExpiredNotification = 'Your notification has been expired.'
export const PerformanceId = 1;
export const AttitudeId = 2;
export const MaintenanceId = 3;
export const GeneralId = 4;
export const RecognitionWallId = 5;
export const TriggerScoreUrl = 'trigger-score';