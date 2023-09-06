/**
@author : Mihir Patel
@class : Enumeration 
@description :Create enumeration for Tooltip header and description for Individual employee.
**/

/**
@author : Mihir Patel
@class : Enumeration 
@description :Create enumeration for pass key and value for encryption and decryption.
**/
export enum IndividualEmployeeEncryptionModal {
    TriggerIsMaPType = 'trigger-isMapType',
    IsMapType = 'isMapType',
    Monthly = 'monthly',
    Weekly = 'wekly',
}
export const GoogleDocsLink = 'https://view.officeapps.live.com/op/embed.aspx?src=';
export const OfficeAppLink = 'https://view.officeapps.live.com/op/embed.aspx?src=';
/**
@author : Anjali Tandel
@class : Remarks  
@description : Remarks created for bind remarks which we get on API response.
**/

export class RemarkRequest {
    public assessmentId: number;
    public assessmentDate: string;
    public assessmentBy: number;
    public isTriggerSent: number;
    public empId: number
    public createdBy: number
    public requestId: number;

    public performanceRemarkId: number;
    public performance: string;
    public performanceDocumentName: string;
    public performanceDocumentContents: string;
    public performanceAttachmentpath: string;
    public performanceCloudFilePath: string;

    public attitudeRemarkId: number
    public attitude: string;
    public attitudeDocumentName: string;
    public attitudeDocumentContents: string;
    public attitudeCloudFilePath: string;

    public maintenanceRemarkId: number;
    public maintenance: string;
    public maintenanceDocumentName: string;
    public maintenanceDocumentContents: string;
    public maintenanceCloudFilePath: string;

    public generalRemarkId: number;
    public general: string;
    public generalDocumentName: string;
    public generalDocumentContents: string;
    public generalCloudFilePath: string;
}

export class RemarkEditRequest {
    public assessmentId: number;
    public updatedby: number;
    public isTriggerSent: number;

    public performanceRemarkId: number;
    public performance: string;
    public performanceDocumentName: string;
    public performanceDocumentContents: string;
    public performanceCloudFilePath: string;

    public attitudeRemarkId: number
    public attitude: string;
    public attitudeDocumentName: string;
    public attitudeDocumentContents: string;
    public attitudeCloudFilePath: string;

    public maintenanceRemarkId: number;
    public maintenance: string;
    public maintenanceDocumentName: string;
    public maintenanceDocumentContents: string;
    public maintenanceCloudFilePath: string;

    public generalRemarkId: number;
    public general: string;
    public generalDocumentName: string;
    public generalDocumentContents: string;
    public generalCloudFilePath: string;

    public commentUpdDateTime: string;

    public isPerformanceCommentSend: number;
    public isAttitudeCommentSend: number;
    public isMaintenanceCommentSend: number;
    public isGeneralRemarkSend: number;

    constructor(
        assessmentId: number,
        updatedby: number,
        isTriggerSent: number,

        performanceRemarkId: number,
        performance: string,
        performanceDocumentName: string,
        performanceDocumentContents: string,
        performanceCloudFilePath: string,

        attitudeRemarkId: number,
        attitude: string,
        attitudeDocumentName: string,
        attitudeDocumentContents: string,
        attitudeCloudFilePath: string,

        maintenanceRemarkId: number,
        maintenance: string,
        maintenanceDocumentName: string,
        maintenanceDocumentContents: string,
        maintenanceCloudFilePath: string,

        generalRemarkId: number,
        general: string,
        generalDocumentName: string,
        generalDocumentContents: string,
        generalCloudFilePath: string,

        commentUpdDateTime: string,

        isPerformanceCommentSend: number,
        isAttitudeCommentSend: number,
        isMaintenanceCommentSend: number,
        isGeneralRemarkSend: number,

    ) {
        this.assessmentId = assessmentId;
        this.updatedby = updatedby;
        this.isTriggerSent = isTriggerSent;

        this.performanceRemarkId = performanceRemarkId;
        this.performance = performance;
        this.performanceDocumentName = performanceDocumentName;
        this.performanceDocumentContents = performanceDocumentContents;
        this.performanceCloudFilePath = performanceCloudFilePath;

        this.attitudeRemarkId = attitudeRemarkId;
        this.attitude = attitude;
        this.attitudeDocumentName = attitudeDocumentName;
        this.attitudeDocumentContents = attitudeDocumentContents;
        this.attitudeCloudFilePath = attitudeCloudFilePath;

        this.maintenanceRemarkId = maintenanceRemarkId;
        this.maintenance = maintenance;
        this.maintenanceDocumentName = maintenanceDocumentName;
        this.maintenanceDocumentContents = maintenanceDocumentContents;
        this.maintenanceCloudFilePath = maintenanceCloudFilePath;

        this.generalRemarkId = generalRemarkId;
        this.general = general;
        this.generalDocumentName = generalDocumentName;
        this.generalDocumentContents = generalDocumentContents;
        this.generalCloudFilePath = generalCloudFilePath;

        this.commentUpdDateTime = commentUpdDateTime;

        this.isPerformanceCommentSend = isPerformanceCommentSend;
        this.isAttitudeCommentSend = isAttitudeCommentSend;
        this.isMaintenanceCommentSend = isMaintenanceCommentSend;
        this.isGeneralRemarkSend = isGeneralRemarkSend;
    }
}

export class Remarks {
    constructor(
        public assessmentDate: string = '',
        name: string = '',
        profileName: string = '',
        public category: string = '',
        public remark: string = '',
        public assessmentByImgPath: string = '',
        public url: string = '',
        public isCsvFile: boolean = false,
        public attachmentpath: string = '',
        public attachmentFileName: string = '',
        public isPreview: boolean = false,
        public isActionEnabled: boolean = false,
        public isEditable: boolean = false,
        public isDeletable: boolean = false,
        public isDeletableAttachment: boolean = false,
        public model: Model,
        public serverCloudUrl: string = '',
        public cloudFilePath: string = '',
        public scoreSummary: string = '',
        public assessmentId: number = 0,
        public isDelete?: boolean
    ) { }
}

/**
@author : Anjali Tandel
@class : Model  
@description : Model created for bind remarks which we used while calling API for update/delete attachment and comments.
**/
export class Model {
    constructor(
        public empId: number = 0,
        public assessmentId: number = 0,
        public remarkId: number = 0,
        public remarks: string,
        public documentName: string,
        public documentContents: string = '',
        public updatedby: number = 0,
        public category: string = '',
        public commentUpdDateTime: string = '',
        public cloudFilePath: string = ''
    ) { }
}

/**
@author : Mihir Patel
@class : Employee 
@description :Create modal class for bind emploee list data
**/
export class Employee {
    public empId: number
    public firstName: string
    public lastName: string
    public ratingCompleted: string
    public isTriggerSent: number
    public empRelation: number
    public departmentId: number
    public roleId: number
    public teamType: number
    public protectionLevel: number
    public managerId: number
    public empStatus: number;
    public sendSpark: boolean;
    public joiningDate: string;

    constructor(
        empId: number,
        firstName: string,
        lastName: string,
        ratingCompleted: string,
        isTriggerSent: number,
        empRelation: number,
        departmentId: number,
        roleId: number,
        teamType: number,
        protectionLevel: number,
        managerId: number,
        empStatus: number,
        sendSpark: boolean,
        joiningDate: string
    ) {
        this.empId = empId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.ratingCompleted = ratingCompleted;
        this.isTriggerSent = isTriggerSent;
        this.empRelation = empRelation;
        this.departmentId = departmentId;
        this.roleId = roleId;
        this.teamType = teamType;
        this.protectionLevel = protectionLevel;
        this.managerId = managerId;
        this.empStatus = empStatus;
        this.sendSpark = sendSpark;
        this.joiningDate = joiningDate;
    }
}

export const EmployeeDashboardSearchFields = ['firstName', 'lastName'];
export const canEdit = 'canEdit';
export const canDelete = 'canDelete';
export const SummaryReportingcontainerRef = 'summaryReportingcontainerRef';
export const DetailedReportingcontainerRef = 'detailedReportingcontainerRef';
export const ContextualReportingcontainerRef = 'contextualReportingcontainerRef';
export const RequestForSpakTriggerWidget = 'requestForSpakTriggerWidget';
export const ManagerActioncontainerRef = 'managerActioncontainerRef';
export const RequestListContainerRef = 'requestListContainerRef';
export const SparkcontainerRef = 'sparkcontainerRef';
export const ReportsContainerRef = 'reportsContainerRef';
export const ResizeMinLength = '(min-width: 768px)';


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