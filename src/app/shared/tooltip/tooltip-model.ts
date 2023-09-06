import { EvaluationStatusWidget, TrendStatusWidget } from "../modals/shared-model";

/**
 * description :Create constant for Tooltip header and description.
 * @author : Anjali Tandel
 * @class : Constant
 */

/** Create constant for title of Clients */
export const Client = 'Client'
/** Create constant for title of Add client */
export const AddClient = 'Add Client'
/** Create constant for title of Edit client */
export const EditClient = 'Edit Client'
/** Create constant for title of Client Profile */
export const ClientProfile = 'Client Profile'
/** Create constant for tooltip header of Client List */
export const TooltipHeaderClient = 'Client List'
/** Create constant for tooltip header of Add Client */
export const TooltipHeaderAddClient = 'Add Client'
/** Create constant for tooltip header of Edit Client */
export const TooltipHeaderEditClient = 'Edit Client'
/** Create constant for tooltip header of Company Profile */
export const TooltipHeaderClientProfile = 'Company Profile'
/** Create constant for tooltip description of Client List */
export const TooltipDescriptionClient = 'Here, the Truvelop Admin can view a list of all client data, make changes, or delete a client.'
/** Create constant for tooltip description of Add Client */
export const TooltipDescriptionAddClient = 'Once on this screen to add a new client, fill in the required information marked by the ‘*’ by each field.'
/** Create constant for tooltip description of Edit Client */
export const TooltipDescriptionEditClient = 'On this screen, simply modify, add, or remove information on any client. Make sure all required fields are filled before saving the revised data.'
/** Create constant for tooltip description of Company Profile */
export const TooltipDescriptionClientProfile = 'Here, you can add a company logo by selecting a file from your computer and make any necessary changes in your company information.'
/** Create constant for store search place-holder value for search-view component */


export const hedaerDashboardIconClass = 'info-tooltip'
export const hedaerTooltipIconClass = 'info-tooltip-header'
export const assessmentTooltipIconClass = 'info-tooltip-assessment'
export const dashboardToolTipIconClass = 'info-tooltip-dashboard-big';
export const settingsTooltipIconClass = 'tooltip-settings';


/** TOOLTIP COMPANY-ADMIN */

/** Create constant for Page-Title of Admin */
export const CompanyAdmin = 'Company Admin'
/** Create constant for Page-Title of Add-Admin */
export const AddAdmin = 'Add Admin'
/** Create constant for Page-Title of Edit-Admin */
export const EditAdmin = 'Edit Admin'

/** Create constant for tooltip-header of Admin-List */
export const TooltipHeaderAdmin = 'Admin List'
/** Create constant for tooltip-description of Admin-List */
export const TooltipDescriptionAdmin = 'This is the list of the Company Administrator for each client. Here you can add, edit, and remove Company Administrators.'

/** Create constant for tooltip-header of Add-Admin */
export const TooltipHeaderAddCompanyAdmin = 'Add Company Admin'
/** Create constant for tooltip-description of Add-Admin */
export const TooltipDescriptionAddCompanyAdmin = 'On this screen, simply modify, add, or remove information on any Company Administrator. Make sure all required fields are filled before saving the revised data.'

/** Create constant for tooltip-header of Edit-Admin */
export const TooltipHeaderEditCompanyAdmin = 'Edit Company Admin'
/** Create constant for tooltip-description of Edit-Admin */
export const TooltipDescriptionEditCompanyAdmin = 'On this screen, simply modify, add, or remove information on any Company Administrator. Make sure all required fields are filled before saving the revised data.'

/** TOOLTIP EMPLOYEE */

/** Create constant for tooltip-description of Employee-List-In-Executive */
export const TooltipDescriptionEmployeeListExecutive = 'On the ‘Team Member’ tab, you will find the list of all the team members in your organization.'
/** Create constant for tooltip-description of Employee-List-In-TriggerAdmin */
export const TooltipDescriptionEmployeeListTriggerAdmin = 'The Truvelop Admin can view the company’s team members on this screen. You can also add an team member or upload an Excel template if requested by the client.'
/** Create constant for tooltip-description of Employee-List-In-Admin */
export const TooltipDescriptionEmployeeListAdmin = 'On the ‘Team Member’ tab, you will find the list of all the team members in your organization. You are also able to add new team members either one at a time, or through the Excel upload process.'
/** Create constant for tooltip-description of Employee-List-In-Manager */
export const TooltipDescriptionEmployeeListManager = 'On the ‘Team Member’ tab, you will find the list of all the team members that report to you as their manager.'

/** Create constant for tooltip-header of Employee-List */
export const TooltipHeaderEmployeeList = 'Team Member List'
/** Create constant for tooltip-header of Client-Employee-List */
export const TooltipHeaderClientEmployeeList = 'Client Team Member List'

/** Create constant for PageTitle of Add-Employee */
export const AddEmployee = 'Add Team Member'
/** Create constant for PageTitle of Edit-Employee */
export const EditEmployee = 'Edit Team Member'

/** Create constant for tooltip-header of Add-Employee */
export const TooltipHeaderAddEmployee = 'Add Team Member'
/** Create constant for tooltip-description of Add-Employee */
export const TooltipDescriptionAddEmployee = 'Once on this screen, fill in the required information marked by the ‘*’ by each field. Be sure to assign a Truvelop role and Reporting Manager, which should be loaded first, along with departments.'

/** Create constant for tooltip-header of Edit-Employee */
export const TooltipHeaderEditEmployee = 'Edit Team Member'
/** Create constant for tooltip-description of Edit-Employee */
export const TooltipDescriptionEditEmployee = 'On this screen, simply modify, add, or remove information on any team member. Make sure all required fields are filled before saving the revised data.'

/** TOOLTIP DEPARTMENT */

/** Create constant for PageTitle of Department */
export const Department = 'Departments';
/** Create constant for tooltip-header of Department */
export const DepartmentTooltipHeader = 'Department';
/** Create constant for tooltip-description of Department */
export const DepartmentTooltipDescription = 'By clicking the ‘Department’ tab on the dashboard, a Company Administrator can add his/her company’s departments.';

/** TOOLTIP DEPARTMENT */

/** Create constant for PageTitle of Department */
export const DepartmentForTruvelopAdmin = 'Client Departments';
/** Create constant for tooltip-header of Department */
export const DepartmentTooltipHeaderForTruvelopAdmin = 'Client Departments';
/** Create constant for tooltip-description of Department */
export const DepartmentTooltipDescriptionForTruvelopAdmin = 'By clicking the ‘Department’ tab on the dashboard, a Truvelop Administrator can add client’s departments.';

/** TOOLTIP Assessment */

/** Create constant for PageTitle of TriggerEmployee */
export const TriggerEmployee = 'TriggerEmployee'
/** Create constant for tooltip-header of Trigger Employee */
// export const TooltipHeaderTriggerEmployee = 'Evaluate Employee'
export const TooltipHeaderTriggerEmployee = 'Evaluate Team Member'
/** Create constant for tooltip-header of Trigger Employee */
export const TooltipDescriptionTriggerEmployee = 'This is the core of Truvelop: the streamlined team member assessment tool that provides real-time next steps in a manager’s role of appreciating, motivating, elevating, educating, or eliminating members of their team. Note that you are only able to evaluate the team member that report to you.'

/** Create constant for tooltip-header of Trigger Score */
export const TooltipHeaderScore = 'Evaluation Score'
/** Create constant for tooltip-description of Trigger Score */
export const TooltipDescriptionScore = 'After the assessment is submitted, the results will reconfigure as a letter grade with a brief description of what that grade means for the team member, and next steps for you as his/her reporting manager.'

/** Create constant for tooltip-header of Performance */
export const TooltipHeaderPerformance = 'Performance'
/** Create constant for tooltip-header of Performance */
export const TooltipDescriptionPerformance = 'Key performance indicators (KPIs) are measurable activities specific to a role in your business. KPIs are also known as goals or objectives that are job related. Each role in your organization has unique KPIs, goals or objectives. We recommend identifying at least three KPI’s per role.<br><br> Examples: Closing rate on sales, handling support emails, completed client projects.'

/** Create constant for tooltip-header of Maintenance */
export const TooltipHeaderMaintenance = 'Maintenance'
/** Create constant for tooltip-header of Maintenance */
export const TooltipDescriptionMaintenance =// 'For this role that you manage, what is the single most frustrating behavior that team members in that role engage in or exhibit.<br><br> This question measures how often the team member you manage exhibits that frustrating behavior.<br><br> For example: A sales manager’s #1 point of frustration may be sales people bringing excuses instead of results to meetings.<br><br> A coach’s #1 point of frustration may be players showing up late to meetings.<br><br> Each role can have a different #1 point of frustration. It’s up to you to determine what your #1 point of frustration is.'
    'How often is this team member your number one point of frustration relative to other team members you interact with.'
/** TOOLTIP MANAGER-DASHBOARD */

/** Constant for tooltip-header of Dashboard */
export const TooltioHeaderDashboard = 'Dashboard'
/** Constant for tooltip-description of Dashboard */
export const TooltioDescriptionDashboard = 'Your dashboard contains an overview of the performance of your company with customizable widgets that are broken down in components.'

/** Constant for tooltip-header of Client-Dashboard */
export const TooltioHeaderClientDashboard = 'Client Dashboard View'
/** Constant for tooltip-description of Client-Dashboard */
export const TooltioDescriptionClientDashboard = 'This screen allows the Truvelop Admin to view a client’s company data based on Truvelop scores. It is identical to what users in that company can see.'

/** Constant for tooltip-header of Team Dashboard */
export const TooltioHeaderTeamDashboard = 'Team Dashboard'
/** Constant for tooltip-description of Team Dashboard */
export const TooltioDescriptionTeamDashboard = 'Need to set description'

/** Constant for tooltip-header of Spark An Employee */
export const TooltioHeaderSparkAnEmployee = 'Spark Team Member'
/** Constant for tooltip-description of Spark an employee description */
export const TooltioDescriptionSparkAnEmployee = "A Spark is used to deliver real-time feedback or post to the Recognition Wall. It can also be used to capture an observation or internal note."

/** Constant for tooltip-header of Team Configuration */
export const TooltioHeaderTeamConfiguration = 'Team Configuration'
/** Constant for tooltip-description of Team configuration description */
export const TooltioDescriptionTeamConfiguration = 'Team configuration description'

/** Constant for tooltip-header of Team Average Score widget */
export const TooltioHeaderTeamAveargeScore = 'Team Average Score'
/** Constant for tooltip-description of Team Average Score widget */
export const TooltioDescriptionTeamAverageScore = 'This is the average score of the Team members who are assigned to the selected Team based on the assessments completed on each Evaluator of those members.'

/** Constant for tooltip-header of Team Average Score by day widget */
export const TooltioHeaderTeamAveargeScoreByDay = 'Team Average Score By Day'
/** Constant for tooltip-description of Team Average Score by ay widget */
export const TooltioDescriptionTeamAverageScoreByDay = 'This is the average score of the Team members who are assigned to the selected Team  based on the assessments completed on each Evaluator of those members displayed by day.'

/** Constant for tooltip-header of Total-Organization-Today */
export const TooltioHeaderTotalOrgToday = 'Total Number of my Organization'
/** Constant for tooltip-description of Total-Organization-Today */
export const TooltioDescriptionTotalOrgToday = 'This is the total number of team members currently in your company. Everyone in your organization with rights to use Evaluation sees this number.'

/** Constant for tooltip-header of Total-Direct-Report-Today */
export const TooltioHeaderTotalDirectReportToday = 'Total Number of Direct Reports Today'
/** Constant for tooltip-description of Total-Direct-Report-Today */
export const TooltioDescriptionTotalDirectReportToday = 'This is the total number of team members currently reporting to you in your role as a manager or executive and the number of team members you are responsible for Evaluate on a regular basis.'

/** Constant for tooltip-header of Average-Direct-Report-Today */
export const TooltioHeaderAverageDirectReportToday = 'Average Score of My Direct Reports Today'
/** Constant for tooltip-description of Average-Direct-Report-Today */
export const TooltioDescriptionAverageDirectReportToday = 'This is the average score of the team members who directly report to you based on the assessments completed on each team member.'

/** Constant for tooltip-header of Average-Organization-Today */
export const TooltioHeaderAverageOrgToday = 'Average Score of My Organization'
/** Constant for tooltip-description of Average-Organization-Today */
export const TooltioDescriptionAverageOrgToday = 'This is the average score of all team members assessed as of today based on the current calendar year. Everyone in your organization with rights to use Evaluation sees this number.'

/** Constant for tooltip-header of Direct-Reports-by-Average-Score */
export const TooltioHeaderDirectReportsByAverageScore = 'My Direct Reports by Average Score'
/** Constant for tooltip-description of Direct-Reports-by-Average-Score */
export const TooltioDescriptionDirectReportsByAverageScore = 'This graph shows the changes in the average score of all the team members who report directly to you over the course of the current year. It is separated by months.'

/** Constant for tooltip-header of My-Organization-by-Average-Score */
export const TooltioHeaderOrgByAverageScore = 'My Organization by Average Score'
/** Constant for tooltip-description of My-Organization-by-Average-Score */
export const TooltioDescriptionOrgByAverageScore = 'This graph shows the changes in the average score of all the team members in your organization over the course of the current year. It is separated by months. Everyone in your organization with rights to use Evaluation sees this.'

/** Constant for tooltip-header of Direct-Reports-To-Date-Progressive */
export const TooltioHeaderDirectReportsToDateProgressive = 'My Direct Reports to Date (proportionate graph)'
/** Constant for tooltip-description of Direct-Reports-To-Date-Progressive */
export const TooltioDescriptionDirectReportsToDateProgressive = 'This progressive graph offers a unique visualization of the proportionate number of team members in each category present in your team. It is the same information presented in the My Direct Reports bar chart but in a different visual layout.'

/** Constant for tooltip-header of Direct-Reports-To-Date-Progressive-Pie */
export const TooltioHeaderDiRectreportsToDateProgressivePie = 'My Direct Reports to Date (pie chart)'
/** Constant for tooltip-description of Direct-Reports-To-Date-Progressive-Pie */
export const TooltioDescriptionDiRectreportsToDateProgressivePie = 'This pie chart offers a unique visualization of the proportionate number of team members in each category present in your team. It is the same information presented in the My Direct Reports bar chart but in a different visual layout.'

/** Constant for tooltip-header of Organization-To-Date-Proportionate-Graph */
export const TooltioHeaderOrgToDateCircular = 'My Organization to Date (proportionate graph)'
/** Constant for tooltip-description of Organization-To-Date-Proportionate-Graph */
export const TooltioDescriptionOrgToDateCircular = 'This progressive graph offers a unique visualization of the proportionate number of team members in each category present in your organization. It is the same information presented in the My Direct Reports bar chart but in a different visual layout. Everyone in your organization with rights to use Evaluation sees this.'

/** Constant for tooltip-header of My-Organization-TO-Date-Pie */
export const TooltioHeaderOrgToDateCircularPie = 'My Organization to Date (pie chart)'
/** Constant for tooltip-description of My-Organization-TO-Date-Pie */
export const TooltioDescriptionOrgToDateCircularPie = 'This pie chart offers a unique visualization of the proportionate number of team members in each category present in your organization. It is the same information presented in the My Direct Reports bar chart but in a different visual layout. Everyone in your organization with rights to use Evaluation sees this.'

/** Constant for tooltip-header of My-Direct-Reports-To-Date */
export const TooltioHeaderDirectReportsToDate = 'My Direct Reports to Date'
/** Constant for tooltip-description of My-Direct-Reports-To-Date */
export const TooltioDescriptionDirectReportsToDate = ''

/** Constant for tooltip-header of My-Organization-To-Date */
export const TooltioHeaderOrgToDate = 'My Organization to Date'
/** Constant for tooltip-description of My-Organization-To-Date */
export const TooltioDescriptionOrgToDate = 'This shows the proportion of team members in your organization over the course of the current year. Everyone in your organization with rights to use Evaluation sees this number.'

/** TOOLTIP EMPLOYEE-DASHBOARD */

/** Constant for tooltip-header of Employee-Dashboard */
export const EmployeeDashboardHeader = 'Team Member’s Dashboard'
/** Constant for tooltip-description of Employee-Dashboard */
export const EmployeeDashboardDescription = 'You can access this screen from the Team Member List screen. The team member’s dashboard displays the data provided on that team member based on the Evaluation scores given by their reporting manager.'

/** Constant for tooltip-header of Current-Score */
export const CurrentScoreHeader = 'Current Score'
/** Constant for tooltip-description of Current-Score */
export const CurrentScoreDescription = 'This score captures the team member’s most recent Evaluation score, and the date it was submitted.'

/** Constant for tooltip-header of Number-of-Actual-Ratings-Completed */
export const NumberOfActualRatingCompletedHeader = 'Number of Actual Ratings Completed'
/** Constant for tooltip-description of Number-of-Actual-Ratings-Completed */
export const ActualRatingCompletedDescription = 'This amount represents the number of assessments performed on the team member by his/her reporting manager in the last 12 months.'

/** Constant for tooltip-header of Current-Calendar-Year */
export const CurrentCalendarYearHeading = 'Current Calendar Year'

/** Constant for tooltip-header of Average-Score */
export const AverageScoreHeader = 'Average Score'
/** Constant for tooltip-description of Average-Score */
export const AverageScoreDescription = 'This is the team member’s average Evaluation score. The average is calculated based on the assessments given within the current calendar year.'

/** Constant for tooltip-header of Current-Calendar-Year-compared-to-Last-Calendar-Year */
export const CurrentCalandarYearComparedToLastCalandarYearHeader = 'Current Calendar Year compared to Last Calendar Year'
/** Constant for tooltip-description of Current-Calendar-Year-compared-to-Last-Calendar-Year */
export const CurrentCalandarYearComparedToLastCalandarYearDescription = 'This comparison provides the team member’s average scores between the past calendar year and the current calendar year.'

/** Constant for tooltip-header of Average-Score(Current calendar year to past calendar year) */
export const AverageScoreCurrentCalandarYearToPastCalanadarYearHeader = 'Average Score(Current calendar year to past calendar year)'

/** Constant for tooltip-header of Employee-Average-Trigger-Score */
export const EmployeeAverageTriggerScoreHeader = 'Team Member’s Average Evaluation Score'
/** Constant for tooltip-description of Employee-Average-Trigger-Score */
export const EmployeeAverageTriggerScoreDescription = 'This graph allows you to see the progression of team member’s average Evaluation score in a weekly or monthly view.'

/** Constant for tooltip-header of Employee-Average-Trigger-Score (Yearly) */
export const EmployeeAverageTriggerScoreYearlyHeader = 'Team Member’s Average Evaluation Score (Yearly)'
/** Constant for tooltip-header of Employee-Average-Trigger-Score (Yearly) */
export const EmployeeCurrentTriggerScoreMonthlyHeader = 'Team Member’s Current Evaluation Score (Monthly)'
/** Constant for tooltip-description of Employee-Average-Trigger-Score (Yearly) */
export const EmployeeAverageTriggerScoreYearlyDescription = 'This graph allows you to see the progression of team member’s average Evaluation score in a yearly view.'
/** Constant for tooltip-description of Employee-Average-Trigger-Score (Yearly) */
export const EmployeeCurrentTriggerScoreMonthlyDescription = 'This graph allows you to see the progression of team member’s current Evaluation score in a monthly view.'

export const ManagerCommentsHeader = 'Manager Comments'
/** Constant for tooltip-header of Manager-Actions-for-Employee */
export const ManagerActionForEmployeeHeader = 'Manager Action for Team Member'
/** Constant for tooltip-description of Manager-Comments */
export const ManagerActionForEmployeeDescription = 'Based on the most recent Evaluation score, the system generates next steps for a employee in aiding in his/her team member’s success within the organization.'

/** Constant for tooltip-header of Trigger-a-Comment */
export const TriggerAComment = 'Evaluation Comment'
/** Constant for tooltip-description of Trigger-a-Comment */
export const TriggerACommentDescription = 'This section provides the list of comments the reporting manager gave on the dates assessments were submitted. Feel free to type in key words or dates in the Search box to narrow down the list of comments.'



/** Constant for page-title of Change-password */
export const ChangePasswordPageTitle = 'Change Password'
/** Constant for tooltip-header of Change-password */
export const TooltipHeader = 'Change Password'
/** Constant for tooltip-description of Change-password */
export const TooltipDescription = 'Passwords are required to have a minimum of 10 characters and a maximum of 15 characters.Passwords must contain at least one upper case letter, one lower case letter, one number, and one special character.'


/** Constant for tooltip-header of User-profile */
export const TooltiProfileHeader = 'User Profile'
/** Constant for tooltip-description of User-profile */
export const TooltipProfileDescription = 'Your profile allows you to establish your presence within Truvelop. By adding a profile picture and location information, you will give other users a better sense of who you are.  While adding a mobile number and enabling SMS notification, will allow you to better interact with Truvelop.'


/** Constant for tooltip-header of SMS Confirmation */
export const SMSVerificationHeader = 'SMS Confirmation'
/** Constant for tooltip-description of SMS Confirmation */
export const SMSVerificationDescription = 'The verification process within Truvelop is set up to ensure that your mobile device is protected from unwanted messaging.  In order to complete the process, type in the six digit code that was sent to the mobile device number you input on your profile.'


/** Constant for tooltip-header of 'Contact Us */
export const ContactUsHeader = 'Contact Us'
/** Constant for tooltip-description of 'Contact Us */
export const ContactUsDescription = 'The Truvelop Support staff is here to help.  Please let us know if you are having an issue or need a question answered.  Just enter your topic in the Subject line and provide a rich description of issue or question.  We are here to help.'

/** Constant for tooltip-header Dimensions */
export const DimensionsHeader = 'Dimensions'
/** Constant for tooltip-description of Dimensions */
export const DimensionsDescription = 'Dimensions Description:.'

/** Constant for tooltip-header of System Configuration */
export const PermissionHeader = 'Permission'
/** Constant for tooltip-description of System Configuration */
export const PermissionDescription = 'With the created dimensions, you can dictate what team members can do on the Truvelop tool. These actions could be evaluating, Sparking, commenting on evaluations or viewing team member dashboards.  he check boxes apply to the corresponding column and row. Each role will have their own drop down menu. (Example: Executive, Manager, HR)<br><br> The permissions can apply to more than just Roles, it can also use Departments, Teams or Relation.'
//export const PermissionDescription = 'Permissions Description:'

/** Constant for tooltip-header of Survey list */
export const SurveyListHeader = 'Survey header'
/** Constant for tooltip-description of Survey list */
export const SurveyListDescription = 'Survey list description'
export const ActiveSurveyListDescription = 'Active Survey list description'

/** Constant for tooltip-header of Add Survey */
export const SurveyAddHeader = 'Add Survey header'
/** Constant for tooltip-description of Add Survey */
export const AddSurveyDescription = 'Add Survey description'

/** Constant for tooltip-header of Edit Survey */
export const SurveyEditHeader = 'Edit Survey header'
/** Constant for tooltip-description of Edit Survey */
export const EditSurveyDescription = 'Edit Survey description'
/** Constant for tooltip-description of Preview Survey */
export const PreviewSurveyDescription = 'Preview Survey description'

/**
 * Author : Anjali Tandel
 * Modified-Date :  18-04-2019
 * Description : Create interface for tooltip-header-description.
 */
export interface tooltip {
    id: number;
    pageTitle: any;
    class?: string;
    header: string;
    description: string;
}

export enum TooltipId {
    EmployeeInExecutive = 8,
    EmployeeInTriggerAdmin = 9,
    EmployeeInAdmin = 10,
    EmployeeInManager = 11,
    AddTeamMember = 12,
    EditTeamMember = 13,
}

/**
 * Author : Anjali Tandel
 * Modified-Date :  04-03-2019
 * Description : Bind menubar list.
 */
export const tooltipData: tooltip[] = [
    /** Bind tooltip header, description and class for Client-list, add/edit client and client-profile */
    { id: 1, pageTitle: Client, class: hedaerTooltipIconClass, header: TooltipHeaderClient, description: TooltipDescriptionClient },
    { id: 2, pageTitle: AddClient, class: hedaerTooltipIconClass, header: TooltipHeaderAddClient, description: TooltipDescriptionAddClient },
    { id: 3, pageTitle: EditClient, class: hedaerTooltipIconClass, header: TooltipHeaderEditClient, description: TooltipDescriptionEditClient },
    { id: 4, pageTitle: ClientProfile, class: hedaerTooltipIconClass, header: TooltipHeaderClientProfile, description: TooltipDescriptionClientProfile },
    /** Bind tooltip header, description and class for Employee-list, add/edit admin */
    { id: 5, pageTitle: CompanyAdmin, class: hedaerTooltipIconClass, header: TooltipHeaderAdmin, description: TooltipDescriptionAdmin },
    { id: 6, pageTitle: AddAdmin, class: hedaerTooltipIconClass, header: TooltipHeaderAddCompanyAdmin, description: TooltipDescriptionAddCompanyAdmin },
    { id: 7, pageTitle: EditAdmin, class: hedaerTooltipIconClass, header: TooltipHeaderEditCompanyAdmin, description: TooltipDescriptionEditCompanyAdmin },
    /** Bind tooltip header, description and class for Employee-list, add/edit employee */
    { id: 8, pageTitle: TooltipId.EmployeeInExecutive, class: hedaerTooltipIconClass, header: TooltipHeaderEmployeeList, description: TooltipDescriptionEmployeeListExecutive },
    { id: 9, pageTitle: TooltipId.EmployeeInTriggerAdmin, class: hedaerTooltipIconClass, header: TooltipHeaderClientEmployeeList, description: TooltipDescriptionEmployeeListTriggerAdmin },
    { id: 10, pageTitle: TooltipId.EmployeeInAdmin, class: hedaerTooltipIconClass, header: TooltipHeaderEmployeeList, description: TooltipDescriptionEmployeeListAdmin },
    { id: 11, pageTitle: TooltipId.EmployeeInManager, class: hedaerTooltipIconClass, header: TooltipHeaderEmployeeList, description: TooltipDescriptionEmployeeListManager },
    { id: 12, pageTitle: AddEmployee, class: hedaerTooltipIconClass, header: TooltipHeaderAddEmployee, description: TooltipDescriptionAddEmployee },
    { id: 13, pageTitle: EditEmployee, class: hedaerTooltipIconClass, header: TooltipHeaderEditEmployee, description: TooltipDescriptionEditEmployee },
    /** Bind tooltip header, description and class for Department */
    { id: 14, pageTitle: Department, class: hedaerTooltipIconClass, header: DepartmentTooltipHeader, description: DepartmentTooltipDescription },
    /** Bind tooltip header, description and class for Change-Password */
    { id: 15, pageTitle: ChangePasswordPageTitle, class: hedaerTooltipIconClass, header: TooltipHeader, description: TooltipDescription },
    /** Bind tooltip header, description and class for Trigger-Employee */
    { id: 16, pageTitle: TriggerEmployee, class: hedaerTooltipIconClass, header: TooltipHeaderTriggerEmployee, description: TooltipDescriptionTriggerEmployee },
    { id: 17, pageTitle: TooltipHeaderPerformance, class: assessmentTooltipIconClass, header: '', description: TooltipDescriptionPerformance },
    { id: 18, pageTitle: TooltipHeaderMaintenance, class: assessmentTooltipIconClass, header: TooltipHeaderMaintenance, description: TooltipDescriptionMaintenance },
    { id: 19, pageTitle: TooltipHeaderScore, class: hedaerTooltipIconClass, header: TooltipHeaderScore, description: TooltipDescriptionScore },
    /** Bind tooltip header, description and class for Manager-Dashboard */
    { id: 20, pageTitle: TooltioHeaderDashboard, class: hedaerTooltipIconClass, header: TooltioHeaderDashboard, description: TooltioDescriptionDashboard },
    { id: 21, pageTitle: TooltioHeaderClientDashboard, class: hedaerTooltipIconClass, header: TooltioHeaderClientDashboard, description: TooltioDescriptionClientDashboard },
    { id: 22, pageTitle: TooltioHeaderTotalDirectReportToday, class: hedaerDashboardIconClass, header: TooltioHeaderTotalDirectReportToday, description: TooltioDescriptionTotalDirectReportToday },
    { id: 23, pageTitle: TooltioHeaderAverageDirectReportToday, class: hedaerDashboardIconClass, header: TooltioHeaderAverageDirectReportToday, description: TooltioDescriptionAverageDirectReportToday },
    { id: 24, pageTitle: TooltioHeaderTotalOrgToday, class: hedaerDashboardIconClass, header: TooltioHeaderTotalOrgToday, description: TooltioDescriptionTotalOrgToday },
    { id: 25, pageTitle: TooltioHeaderAverageOrgToday, class: hedaerDashboardIconClass, header: TooltioHeaderAverageOrgToday, description: TooltioDescriptionAverageOrgToday },
    { id: 26, pageTitle: TooltioHeaderOrgToDate, class: dashboardToolTipIconClass, header: TooltioHeaderOrgToDate, description: TooltioDescriptionOrgToDate },
    { id: 27, pageTitle: TooltioHeaderDirectReportsByAverageScore, class: hedaerDashboardIconClass, header: TooltioHeaderDirectReportsByAverageScore, description: TooltioDescriptionDirectReportsByAverageScore },
    { id: 28, pageTitle: TooltioHeaderDirectReportsToDate, class: dashboardToolTipIconClass, header: TooltioHeaderDirectReportsToDate, description: '' },
    { id: 29, pageTitle: TooltioHeaderOrgByAverageScore, class: hedaerDashboardIconClass, header: TooltioHeaderOrgByAverageScore, description: TooltioDescriptionOrgByAverageScore },
    { id: 30, pageTitle: TooltioHeaderDirectReportsToDateProgressive, class: hedaerDashboardIconClass, header: TooltioHeaderDirectReportsToDateProgressive, description: TooltioDescriptionDirectReportsToDateProgressive },
    { id: 31, pageTitle: TooltioHeaderDiRectreportsToDateProgressivePie, class: hedaerDashboardIconClass, header: TooltioHeaderDiRectreportsToDateProgressivePie, description: TooltioDescriptionDiRectreportsToDateProgressivePie },
    { id: 32, pageTitle: TooltioHeaderOrgToDateCircular, class: hedaerDashboardIconClass, header: TooltioHeaderOrgToDateCircular, description: TooltioDescriptionOrgToDateCircular },
    { id: 33, pageTitle: TooltioHeaderOrgToDateCircularPie, class: hedaerDashboardIconClass, header: TooltioHeaderOrgToDateCircularPie, description: TooltioDescriptionOrgToDateCircularPie },
    /** Bind tooltip header, description and class for Employee-Dashboard */
    { id: 34, pageTitle: EmployeeDashboardHeader, class: hedaerTooltipIconClass, header: EmployeeDashboardHeader, description: EmployeeDashboardDescription },
    { id: 35, pageTitle: CurrentScoreHeader, class: hedaerDashboardIconClass, header: CurrentScoreHeader, description: CurrentScoreDescription },
    { id: 36, pageTitle: AverageScoreHeader, class: hedaerDashboardIconClass, header: AverageScoreHeader, description: AverageScoreDescription },
    { id: 37, pageTitle: NumberOfActualRatingCompletedHeader, class: hedaerDashboardIconClass, header: NumberOfActualRatingCompletedHeader, description: ActualRatingCompletedDescription },
    { id: 38, pageTitle: AverageScoreCurrentCalandarYearToPastCalanadarYearHeader, class: hedaerDashboardIconClass, header: AverageScoreCurrentCalandarYearToPastCalanadarYearHeader, description: CurrentCalandarYearComparedToLastCalandarYearDescription },
    { id: 39, pageTitle: 39, class: hedaerDashboardIconClass, header: EmployeeAverageTriggerScoreHeader, description: EmployeeAverageTriggerScoreDescription },
    { id: 40, pageTitle: 40, class: hedaerDashboardIconClass, header: EmployeeAverageTriggerScoreYearlyHeader, description: EmployeeAverageTriggerScoreYearlyDescription },
    { id: 41, pageTitle: ManagerCommentsHeader, class: hedaerDashboardIconClass, header: ManagerActionForEmployeeHeader, description: ManagerActionForEmployeeDescription },
    { id: 42, pageTitle: TriggerAComment, class: hedaerDashboardIconClass, header: TriggerAComment, description: TriggerACommentDescription },
    /** Bind tooltip header, description and class for Profile-upload */
    { id: 43, pageTitle: TooltiProfileHeader, class: hedaerTooltipIconClass, header: TooltiProfileHeader, description: TooltipProfileDescription },
    /** Bind tooltip header, description and class for SMS verification */
    { id: 44, pageTitle: SMSVerificationHeader, class: hedaerTooltipIconClass, header: SMSVerificationHeader, description: SMSVerificationDescription },
    /** Bind tooltip header, description and class for Cotact-us */
    { id: 45, pageTitle: ContactUsHeader, class: hedaerTooltipIconClass, header: ContactUsHeader, description: ContactUsDescription },
    /** Bind tooltip header, description and class for Dimension */
    { id: 46, pageTitle: DimensionsHeader, class: hedaerTooltipIconClass, header: DimensionsHeader, description: DimensionsDescription },
    { id: 47, pageTitle: PermissionHeader, class: hedaerTooltipIconClass, header: PermissionHeader, description: PermissionDescription },
    /** Bind tooltip header, description and class for Team spark-an-employee */
    { id: 48, pageTitle: 48, class: hedaerTooltipIconClass, header: TooltioHeaderSparkAnEmployee, description: TooltioDescriptionSparkAnEmployee },
    /** Bind tooltip header, description and class for Team team-conifguration */
    { id: 49, pageTitle: 49, class: hedaerTooltipIconClass, header: TooltioHeaderTeamConfiguration, description: TooltioDescriptionTeamConfiguration },
    /** Bind tooltip header, description and class for Team dashboard */
    { id: 50, pageTitle: TooltioHeaderTeamDashboard, class: hedaerTooltipIconClass, header: TooltioHeaderTeamDashboard, description: TooltioDescriptionTeamDashboard },
    { id: 51, pageTitle: TooltioHeaderTeamAveargeScore, class: hedaerDashboardIconClass, header: TooltioHeaderTeamAveargeScore, description: TooltioDescriptionTeamAverageScore },
    { id: 52, pageTitle: TooltioHeaderTeamAveargeScoreByDay, class: hedaerDashboardIconClass, header: TooltioHeaderTeamAveargeScoreByDay, description: TooltioDescriptionTeamAverageScoreByDay },
    { id: 53, pageTitle: 53, class: hedaerTooltipIconClass, header: 'Add Team', description: 'Add team description' },
    { id: 54, pageTitle: 54, class: hedaerTooltipIconClass, header: 'Edit Team', description: 'Edit team description' },
    { id: 55, pageTitle: 55, class: hedaerDashboardIconClass, header: 'Spark', description: 'The Spark widget displays the Sparks that were sent by an Evaluator.' },
    { id: 56, pageTitle: 56, class: hedaerDashboardIconClass, header: 'Request for Evaluation', description: 'This allows a user to send a Request for an Evaluation  to any other user that has been provided with the Evaluation permission.' },
    { id: 57, pageTitle: 57, class: hedaerDashboardIconClass, header: 'Request for Spark', description: 'This allows a user to send a Request for a Spark  to any other user that has been provided with the Spark permission.' },
    { id: 58, pageTitle: 58, class: hedaerTooltipIconClass, header: 'My Dashboard', description: 'My Dashboard displays your collective data within the tool.' },
    { id: 59, pageTitle: 59, class: hedaerDashboardIconClass, header: 'Evaluation Comment', description: 'The Comments widget dispalys the General comments that were sent by an Evaluator.' },
    { id: 60, pageTitle: 60, class: hedaerDashboardIconClass, header: EvaluationStatusWidget, description: 'A recommendation based on your last evaluation.' },
    { id: 61, pageTitle: 61, class: hedaerDashboardIconClass, header: TrendStatusWidget, description: 'A recommendation based on the latest collection of evaluations.' },
    { id: 62, pageTitle: 62, class: hedaerDashboardIconClass, header: 'Team Member Guidance', description: ManagerActionForEmployeeDescription },
    { id: 63, pageTitle: DepartmentForTruvelopAdmin, class: hedaerTooltipIconClass, header: DepartmentTooltipHeaderForTruvelopAdmin, description: DepartmentTooltipDescriptionForTruvelopAdmin },
    { id: 64, pageTitle: 64, class: hedaerTooltipIconClass, header: 'Survey List', description: SurveyListDescription },
    { id: 65, pageTitle: 65, class: hedaerTooltipIconClass, header: 'Add Survey', description: AddSurveyDescription },
    { id: 66, pageTitle: 66, class: hedaerTooltipIconClass, header: 'Edit Survey', description: EditSurveyDescription },
    { id: 67, pageTitle: 67, class: hedaerTooltipIconClass, header: 'Preview Survey', description: PreviewSurveyDescription },
    { id: 68, pageTitle: 68, class: hedaerDashboardIconClass, header: TooltioHeaderSparkAnEmployee, description: TooltioDescriptionSparkAnEmployee },
    { id: 69, pageTitle: 69, class: hedaerTooltipIconClass, header: 'Survey details & CSV export', description: 'Survey details & CSV export Description.' },
    { id: 70, pageTitle: 70, class: hedaerTooltipIconClass, header: 'Recognition Wall', description: 'Recognition Wall allows all employees to engage in the recognition experience. By creating a Public, Recognition Spark an Evaluator instantly publishes feedback for everyone in the organization to interact with and engage in. Once published, everyone is able to Like and Comment on the Spark. This provides a central location for everyone in the organization to celebrate individual contributions.' },
    { id: 71, pageTitle: 71, class: hedaerTooltipIconClass, header: 'Work Location', description: 'Work Location Description.' },
    { id: 72, pageTitle: 72, class: hedaerDashboardIconClass, header: 'Work Location History', description: 'Work Location History Description.' },
    { id: 73, pageTitle: 73, class: hedaerDashboardIconClass, header: EmployeeCurrentTriggerScoreMonthlyHeader, description: EmployeeCurrentTriggerScoreMonthlyDescription },
    { id: 74, pageTitle: 74, class: hedaerTooltipIconClass, header: 'Active Survey List', description: ActiveSurveyListDescription },
    { id: 75, pageTitle: 75, class: hedaerTooltipIconClass, header: 'Evaluation(s) In Draft', description: 'Evaluation(s) In Draft list.' },
];

export const SettingsPopupClass = 'setting-popupbox-container';