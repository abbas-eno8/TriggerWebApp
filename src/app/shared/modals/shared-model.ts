import { Route } from "../../core/magic-string/common.model";


export const EvaluationStatusWidget = 'Evaluation Insight';
export const TrendStatusWidget = 'Trend Status';
export const SortByDepartment = 'department';
export const ProtectionLowLevel = 1;
export const Pages = [50, 100, 150];
export enum Module {
    Client = 1,
    Admin = 2,
    TeamMember = 3,
    SparkAnEmployee = 4,
    Team = 5,
    SparkAnEmployeeNotification = 6,
    WorkLocation = 7,
}

export const StatusList: any[] = [
    { id: 1, label: "Active" },
    { id: 2, label: "Separated" },
    { id: 3, label: "On Leave" }
];

export const GenderList: any[] = [
    { id: 1, label: "Male" },
    { id: 2, label: "Female" },
    { id: 3, label: "Other" },
    { id: 4, label: "Do not wish to specify" }
];

export const trendingIconList: any[] = [
    { id: 1, icon: "font-icon-Up" },
    { id: 2, icon: "font-icon-Down" },
    { id: 3, icon: "font-icon-Steady" },
];

export class CustomColumn {
    public id: number = 0
    public column: string = ''
    public property: string = ''
    public widthClass: string = ''
    public isSortable?: boolean = true
    public title?: string = ''
    constructor(
        id: number = 0,
        column: string = '',
        property: string = '',
        widthClass: string = '',
        isSortable: boolean = true,
        title: string = '',
    ) {
        this.id = id;
        this.column = column,
            this.property = property,
            this.widthClass = widthClass,
            this.isSortable = isSortable,
            this.title = title
    }
}

export class ListModule {
    constructor(
        public id: number = 0,
        public route: string = '',
        public deleteRecordString: string = '',
    ) { }
}
export const listModule: ListModule[] = [
    { id: Module.Client, route: Route.EditClient, deleteRecordString: 'Client' },
    { id: Module.Admin, route: Route.EditAdmin, deleteRecordString: 'Record' },
    { id: Module.TeamMember, route: Route.AddEmployee, deleteRecordString: 'Record' },
    { id: Module.WorkLocation, route: '', deleteRecordString: 'Work-Location' },
]

export enum InvokeMethodType {
    Insert = 1,
    Update = 3,
    Delete = 4,
}
export class InvokeMethod {
    public actionType: number;
    public record: any;
    constructor(
        actionType: number = 0,
        record: any,
    ) {
        this.actionType = actionType;
        this.record = record;
    }
}

export class ReportView {
    public id: number;
    public reportTitle: string;
    public employeeName: string;
    public documentName: string;
    public documentFullPath: string;
    public createdDateTime: string;
    public remark: string;
    public status: number;
}

/**
 * This enum used for team member assesement evelution.
 */
export enum TeamMemberAssessment {
    SendAndNotShare = 0,
    SendAndShare = 1,
    SaveAsDraft = 2,
}

export enum EvaluationComments {
    GeneralRemarkId = 0,
    PerformanceRemarkId = 5,
    AttitudeRemarkId = 10,
    MaintenanceRemarkId = 13
}

export const EvaluationSavedAndMailSent = 'Evaluation saved successfully and email sent.';
export const EvaluationSavedAndMailNotSent = 'Evaluation saved successfully and email was not sent to team member.';
