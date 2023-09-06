/** Evaulation Draft response*/
export class EvaulationDraftResponse {
    public empId: number;
    public empFirstName: string;
    public empLastName: string;
    public empImgPath: string;
    public departmentId: number;

    public assessmentId: number;
    public assessmentById: number;
    public assessmentDate: string;
    public assessmentByImgPath: string;
    public firstName: string;
    public lastName: string;
    public isTriggerSent: number;
    public empRelation: number;
    public protectionLevel: number;
    public teamType: number;
    public joiningDate: string;
    public empStatus: number;

    public performanceRemarkId: number;
    public performance: string;
    public performanceCategory: string;
    public performanceDocumentName: string;
    public performanceCloudFilePath: string;

    public attitudeRemarkId: number;
    public attitude: string;
    public attitudeCategory: string;
    public attitudeDocumentName: string;
    public attitudeCloudFilePath: string;

    public maintenanceRemarkId: number;
    public maintenance: string;
    public maintenanceCategory: string;
    public maintenanceDocumentName: string;
    public maintenanceCloudFilePath: string;
    public generalRemarkId: number;

    public general: string;
    public generalCategory: string;
    public generalDocumentName: string;
    public generalCloudFilePath: string;

    // public scoreSummary: string;
    public sendSpark: boolean;

    public isPerformanceCommentSend: number;
    public isAttitudeCommentSend: number;
    public isMaintenanceCommentSend: number;
    public isGeneralRemarkSend: number;

    constructor(
        empId?: number,
        empFirstName?: string,
        empLastName?: string,
        empImgPath?: string,
        departmentId?: number,

        assessmentId?: number,
        assessmentById?: number,
        assessmentDate?: string,
        assessmentByImgPath?: string,
        firstName?: string,
        lastName?: string,
        isTriggerSent?: number,
        empRelation?: number,
        protectionLevel?: number,
        teamType?: number,
        joiningDate?: string,
        empStatus?: number,

        performanceRemarkId?: number,
        performance?: string,
        performanceCategory?: string,
        performanceDocumentName?: string,
        performanceCloudFilePath?: string,

        attitudeRemarkId?: number,
        attitude?: string,
        attitudeCategory?: string,
        attitudeDocumentName?: string,
        attitudeCloudFilePath?: string,

        maintenanceRemarkId?: number,
        maintenance?: string,
        maintenanceCategory?: string,
        maintenanceDocumentName?: string,
        maintenanceCloudFilePath?: string,

        generalRemarkId?: number,
        general?: string,
        generalCategory?: string,
        generalDocumentName?: string,
        generalCloudFilePath?: string,

        // scoreSummary?: string,
        sendSpark?: boolean,

        isPerformanceCommentSend?: number,
        isAttitudeCommentSend?: number,
        isMaintenanceCommentSend?: number,
        isGeneralRemarkSend?: number,

    ) {
        this.empId = empId;
        this.empFirstName = empFirstName;
        this.empLastName = empLastName;
        this.empImgPath = empImgPath;
        this.departmentId = departmentId;

        this.assessmentId = assessmentId;
        this.assessmentById = assessmentById;
        this.assessmentDate = assessmentDate;
        this.assessmentByImgPath = assessmentByImgPath;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isTriggerSent = isTriggerSent;
        this.empRelation = empRelation;
        this.protectionLevel = protectionLevel;
        this.teamType = teamType;
        this.joiningDate = joiningDate;
        this.empStatus = empStatus;

        this.performanceRemarkId = performanceRemarkId;
        this.performance = performance;
        this.performanceCategory = performanceCategory;
        this.performanceDocumentName = performanceDocumentName;
        this.performanceCloudFilePath = performanceCloudFilePath;

        this.attitudeRemarkId = attitudeRemarkId;
        this.attitude = attitude;
        this.attitudeCategory = attitudeCategory;
        this.attitudeDocumentName = attitudeDocumentName;
        this.attitudeCloudFilePath = attitudeCloudFilePath;

        this.maintenanceRemarkId = maintenanceRemarkId;
        this.maintenance = maintenance;
        this.maintenanceCategory = maintenanceCategory;
        this.maintenanceDocumentName = maintenanceDocumentName;
        this.maintenanceCloudFilePath = maintenanceCloudFilePath;

        this.generalRemarkId = generalRemarkId;
        this.general = general;
        this.generalCategory = generalCategory;
        this.generalDocumentName = generalDocumentName;
        this.generalCloudFilePath = generalCloudFilePath;

        // this.scoreSummary = scoreSummary;
        this.sendSpark = sendSpark;

        this.isPerformanceCommentSend = isPerformanceCommentSend;
        this.isAttitudeCommentSend = isAttitudeCommentSend;
        this.isMaintenanceCommentSend = isMaintenanceCommentSend;
        this.isGeneralRemarkSend = isGeneralRemarkSend;
    }
}

/** Model class for file attachment */
export class Model {
    public remarkId: number;
    public remarks: string;
    public documentName: string;
    public documentContents: string;
    public attachmentPath: string;
    public cloudFilePath: string
    public fileName: string;
    public updatedBy: string;
    public isPreview: boolean;
    public isCsvFile: boolean;
    public isDeletableAttachment: boolean;
    public isFileDeletable: boolean;
}

/**
 * Publish evaluation Request model
 */
export class PublishAssessmentRequest {
    public assessmentId: number;
    public assessmentDate: string;
    public assessmentBy: number;
    public createdBy: number;
    public empId: number;
    public requestId: number;
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
        assessmentDate: string,
        assessmentBy: number,
        createdBy: number,
        empId: number,
        requestId: number,
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
        this.assessmentDate = assessmentDate;
        this.assessmentBy = assessmentBy;
        this.createdBy = createdBy;
        this.empId = empId;
        this.requestId = requestId;
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

/**
 * Share comment Request model
 */
export class shareCommentRequest {
    public assessmentId: number;
    public employeeId: number;
    public remarkId: number;
    public updatedBy: number;

    constructor(
        assessmentId: number,
        employeeId: number,
        remarkId: number,
        updatedBy: number,
    ) {
        this.assessmentId = assessmentId;
        this.employeeId = employeeId;
        this.remarkId = remarkId;
        this.updatedBy = updatedBy;
    }
}

// Create constant for AssessmentDateTimeStamp
export const AssessmentDateTimeStamp = 'MM-dd-yyyy HH:mm:ss';

export const SearchFields = ['empName', 'empProfileName', 'attitude', 'general', 'maintenance', 'performance'];

export const PerformanceField = ['performanceDocumentName', 'performanceDocumentContents', 'performanceCloudFilePath', 'isDeletePerformance', 'performanceFileName'];
export const AttitudeField = ['attitudeDocumentName', 'attitudeDocumentContents', 'attitudeCloudFilePath', 'isDeleteAttitude', 'attitudeFileName'];
export const MaintenancField = ['maintenanceDocumentName', 'maintenanceDocumentContents', 'maintenanceCloudFilePath', 'isDeleteMaintenance', 'maintenanceFileName'];
export const GeneralFiled = ['generalDocumentName', 'generalDocumentContents', 'generalCloudFilePath', 'isDeleteGeneral', 'generalFileName'];

export const GoogleDocsLink = 'https://view.officeapps.live.com/op/embed.aspx?src=';
export const OfficeAppLink = 'https://view.officeapps.live.com/op/embed.aspx?src=';