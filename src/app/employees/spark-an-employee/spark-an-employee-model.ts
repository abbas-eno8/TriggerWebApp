/**
 * description : Create Spark-am-employee model for constant, model.
 * @author : Anjali Tandel
 * @class : Spark-am-employee model
 */
import { Validator } from "../../core/magic-string/common.model";
import { IgnoreSpaceInitial } from "../../contact-us/contact-us-model";
import { Encryption } from "../../core/magic-string/common-validation-model";

export const SparkAddedSuccessfully = 'Team Member sparked successfully.'
export class ApiResponse {
    constructor(
        public data: any,
        public status: string = '',
        public message: string = '',
    ) { }
}

export class RequestModel {
    public empId: Number
    public sparkId: Number
    public categoryId: Number
    public classificationId: Number
    public sparkBy: Number
    public sparkDate: string
    public remarks: string
    public documentName: string
    public documentContents: string
    public cloudFilePath: string
    public createdBy: Number
    public updatedBy: Number
    public sendSpark: boolean
    public requestId: Number
    public isDisplayEmailConfirmation?: boolean
    public sparkPrivacy: number
    constructor(
        empId: Number = 0,
        sparkId: Number = 0,
        categoryId: Number = 0,
        classificationId: Number = 0,
        sparkBy: Number = 0,
        sparkDate: string = '',
        spark: string = '',
        attachmentName: string = '',
        attachmentPath: string = '',
        cloudFilePath: string = '',
        createdBy: Number = 0,
        updatedBy: Number = 0,
        sendSpark: boolean = false,
        sparkPrivacy: number = 0
    ) {
        this.empId = empId;
        this.sparkId = sparkId;
        this.categoryId = categoryId;
        this.classificationId = classificationId;
        this.sparkBy = sparkBy;
        this.sparkDate = sparkDate;
        this.remarks = spark !== '' ? spark.trim() : '';
        this.documentName = attachmentName;
        this.documentContents = attachmentPath;
        this.cloudFilePath = cloudFilePath;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.sendSpark = sendSpark;
        this.requestId = parseInt(sessionStorage.getItem(Encryption.RequestId));
        this.isDisplayEmailConfirmation = sendSpark;
        this.sparkPrivacy = sparkPrivacy;
        //this.RequestId = RequestId
    }
}
// profileName: comment.firstName.charAt(0).toUpperCase() + comment.lastName.charAt(0).toUpperCase(),
export class SparkAnEmployee {
    public empId: number
    public sparkId: number
    public categoryId: number
    public category: string
    public sparkDate: string
    public sparkBy: number
    public sparkByFirstName: string
    public sparkByLastName: string
    public givenBy: string
    public spark: string
    public classificationId: number
    public classification: string
    public attachmentName: string
    public attachmentPath: string
    public cloudFilePath: string
    public path: string
    public isEnabledAction: boolean
    public isEditable: boolean
    public isDeletable: boolean
    public isPreviewFile: boolean
    public classifications: SparkAnEmployee[]
    public categories: Category[]
    public createdBy: number
    public updatedBy: number
    public sparkByImgPath: string
    public profileName: string
    public sendSpark: boolean
    public sparkPrivacy: number
    public emailContent?: string
    public employeeEmail?: string
    public isSparkSent: boolean
    //public action: string
    constructor(
        isSparkSent: number = 0,
        empId: number = 0,
        sparkId: number = 0,
        categoryId: number = 0,
        category: string = '',
        sparkDate: string = '',
        sparkBy: number = 0,
        sparkByName: string = '',
        sparkByFirstName: string = '',
        sparkByLastName: string = '',
        remarks: string = '',
        classificationId: number = 0,
        classification: string = '',
        documentName: string = '',
        documentContents: string = '',
        cloudFilePath: string = '',
        sparkByImgPath: string = '',
        emailContent: string = '',
        employeeEmail: string = '',
        sparkPrivacy: number = 0,
        profileName: string = '',
        sendSpark: boolean = false,
        RequestId: number = 0,
    ) {
        this.isSparkSent = isSparkSent === 1 ? true : false;
        this.empId = empId;
        this.sparkId = sparkId;
        this.categoryId = categoryId;
        this.category = category;
        this.sparkDate = sparkDate;
        this.sparkBy = sparkBy;
        this.givenBy = sparkByFirstName + ' ' + sparkByLastName;
        this.sparkByFirstName = sparkByFirstName;
        this.sparkByLastName = sparkByLastName;
        this.spark = remarks;
        this.classificationId = classificationId;
        this.classification = classification;
        this.attachmentName = documentName ? documentName.substring(documentName.lastIndexOf('/') + 1, documentName.length) : '',
            this.path = documentName;
        this.attachmentPath = '';
        this.cloudFilePath = cloudFilePath;
        this.isEnabledAction = false;
        this.isEditable = false;
        this.isDeletable = false;
        this.isPreviewFile = (documentName !== '' || cloudFilePath !== '') ? true : false;
        this.classifications = [];
        this.categories = []
        this.createdBy = 0;
        this.updatedBy = 0;
        this.sparkByImgPath = sparkByImgPath;
        this.profileName = sparkByFirstName.charAt(0).toUpperCase() + sparkByLastName.charAt(0).toUpperCase();
        this.sendSpark = sendSpark;
        this.emailContent = emailContent;
        this.employeeEmail = employeeEmail;
        this.sparkPrivacy = sparkPrivacy;
    }
}

export class Classification {
    constructor(
        public classificationId: number = 0,
        public classification: string = '',
    ) {

    }
}

export class Category {
    public id: number
    public category: string
    constructor(
        id: number = 0,
        category: string = '',
    ) {
        this.id = id;
        this.category = category;
    }
}
/** Create constant for minimum width of desktop view */
export const DesktopWidth = '(min-width: 1250px)';
/** Create constant for List-view-class */
export const ListViewClass = 'h-100';
/** Create constant for List-view-class */
export const NoRecordFoundViewClass = 'no-records-container';
/** Create constant for Search-place-holder */
export const SearchPlaceHolder = 'Search Sparks...';
/** Create constant for spark */
export const Spark = 'spark';
/** Create constant for attachment */
export const Attachment = 'attachment';
/** Create constant for cdk-overlay-pane */
export const CskOverlayPanel = 'cdk-overlay-pane';
/** Create constant for Search-field of Desktop & accrodian view */
export const SearchFieldDesktopView = ['category', 'classification', 'spark', 'sparkByFirstName', 'sparkByLastName', 'sparkDate', 'reply', 'replyDate'];
export const SearchFieldAccrodianView = ['category', 'classification'];

/** Create constant for Display-column of Desktop & accrodian view */
export const desktopViewColumn = ['isSparkSent', 'category', 'classification', 'spark', 'givenBy', 'sparkDate', 'action'];
//export const displayColumnAccrodianView = ['category','classification', 'spark', 'action'];
export const AccoladeCategoryId = 5;
export enum PopupPanelClass {
    lgContainer = 'lg-dialog-container',
    customContainer = 'custom-dialog-container',
    extraLargeContainer = 'xl-dialog-container'
};

export enum SparkAction {
    add = 'Add New Spark',
    edit = 'Edit Spark',
    delete = 'delete',
    preview = 'preview'
};

export class PopupModal {
    public component: any;
    public panelClass: string = '';
    public object: any;
    public action: string = '';
    constructor(
        component: any,
        panelClass: string = '',
        object: any,
        action: string = '',
    ) {
        this.component = component;
        this.panelClass = panelClass;
        this.object = object;
        this.action = action;
    }
}
export const fieldValidator: Validator[] = [
    { id: 1, key: 'categoryId', value: '', name: 'Category', isMandatory: true, isDropdown: true },
    { id: 1, key: 'classificationId', value: '', name: 'Classification', isMandatory: true, isDropdown: true },
    { id: 2, key: 'spark', value: '', name: 'Spark', isMandatory: false, pattern: IgnoreSpaceInitial },
];

export class AddAttachment {
    public fileName: string
    public filePath
    public isCloudUrl: boolean;
    constructor(
        fileName: string = '',
        filePath: string = '',
        isCloudUrl: boolean = false
    ) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.isCloudUrl = isCloudUrl
    }
}

export class ClassificationsCategories {
    public classifications: SparkAnEmployee[]
    public categories: Category[]
    constructor(
        classifications: SparkAnEmployee[],
        categories: Category[]) {
        this.classifications = classifications;
        this.categories = categories;
    }
}

export class SparkAnEmployeeForWidget {
    public isDisplayCommentSection: boolean;
    public replyCount: number;
    public empId: number
    public sparkId: number
    public categoryId: number
    public category: string
    public sparkDate: string
    public sparkBy: number
    public sparkByFirstName: string
    public sparkByLastName: string
    public givenBy: string
    public spark: string
    public classificationId: number
    public classification: string
    public attachmentName: string
    public attachmentPath: string
    public cloudFilePath: string
    public path: string
    public isEnabledAction: boolean
    public isEditable: boolean
    public isDeletable: boolean
    public isPreviewFile: boolean
    public classifications: SparkAnEmployee[]
    public categories: Category[]
    public createdBy: number
    public updatedBy: number
    public sparkByImgPath: string
    public profileName: string
    public sendSpark: boolean
    public sparkPrivacy: number
    public emailContent?: string
    public employeeEmail?: string
    public isSparkSent: boolean
    public sparkReplys: bindSparkReplyForWidget[];
    public sparkReplyDocumentName: string
    public sparkReplyDocumentContents: string
    public sparkReplyCloudFilePath: string
    public sparkReplyFileName: string
    constructor(
        isDisplayCommentSection: boolean = false,
        replyCount: number = 0,
        sparkReplys: bindSparkReplyForWidget[],
        isSparkSent: number = 0,
        empId: number = 0,
        sparkId: number = 0,
        categoryId: number = 0,
        category: string = '',
        sparkDate: string = '',
        sparkBy: number = 0,
        sparkByName: string = '',
        sparkByFirstName: string = '',
        sparkByLastName: string = '',
        remarks: string = '',
        classificationId: number = 0,
        classification: string = '',
        documentName: string = '',
        documentContents: string = '',
        cloudFilePath: string = '',
        sparkByImgPath: string = '',
        emailContent: string = '',
        employeeEmail: string = '',
        sparkPrivacy: number = 0,
        profileName: string = '',
        sendSpark: boolean = false,
        RequestId: number = 0,
        sparkReplyDocumentName: string = '',
        sparkReplyDocumentContents: string = '',
        sparkReplyCloudFilePath: string = '',
        sparkReplyFileName: string = ''
    ) {
        this.isDisplayCommentSection = isDisplayCommentSection;
        this.replyCount = sparkReplys.length;
        this.sparkReplys = sparkReplys;
        this.isSparkSent = isSparkSent === 1 ? true : false;
        this.empId = empId;
        this.sparkId = sparkId;
        this.categoryId = categoryId;
        this.category = category;
        this.sparkDate = sparkDate;
        this.sparkBy = sparkBy;
        this.givenBy = sparkByFirstName + ' ' + sparkByLastName;
        this.sparkByFirstName = sparkByFirstName;
        this.sparkByLastName = sparkByLastName;
        this.spark = remarks;
        this.classificationId = classificationId;
        this.classification = classification;
        this.attachmentName = documentName ? documentName.substring(documentName.lastIndexOf('/') + 1, documentName.length) : '',
            this.path = documentName;
        this.attachmentPath = '';
        this.cloudFilePath = cloudFilePath;
        this.isEnabledAction = false;
        this.isEditable = false;
        this.isDeletable = false;
        this.isPreviewFile = (documentName !== '' || cloudFilePath !== '') ? true : false;
        this.classifications = [];
        this.categories = []
        this.createdBy = 0;
        this.updatedBy = 0;
        this.sparkByImgPath = sparkByImgPath;
        this.profileName = sparkByFirstName.charAt(0).toUpperCase() + sparkByLastName.charAt(0).toUpperCase();
        this.sendSpark = sendSpark;
        this.emailContent = emailContent;
        this.employeeEmail = employeeEmail;
        this.sparkPrivacy = sparkPrivacy;
        this.sparkReplyDocumentName = sparkReplyDocumentName;
        this.sparkReplyDocumentContents = sparkReplyDocumentContents;
        this.sparkReplyCloudFilePath = sparkReplyCloudFilePath;
        this.sparkReplyFileName = sparkReplyFileName;
    }
}

export class bindSparkReplyForWidget {
    public id: number
    public replyBy: number
    public sparkId: number
    public reply: string
    public replyDate: string
    public createdBy: number
    public replyByFirstName: string
    public replyByLastName: string
    public replyByShortName: string
    public replyByFullName: string
    public replyByImgPath: string
    public documentName: string
    public documentContents: string
    public cloudFilePath: string
    public fileName: string
    public path: string
    public isPreview: boolean
    constructor(
        id: number = 0,
        replyBy: number = 0,
        sparkId: number = 0,
        reply: string = '',
        replyDate: string = '',
        replyByFirstName: string = '',
        replyByLastName: string = '',
        replyByImgPath: string = '',
        documentName: string = '',
        documentContents: string = '',
        cloudFilePath: string = '',
    ) {
        this.id = id;
        this.replyBy = replyBy;
        this.sparkId = sparkId;
        this.reply = reply;
        this.replyDate = replyDate;
        this.replyByFirstName = replyByFirstName;
        this.replyByLastName = replyByLastName;
        this.replyByShortName = replyByFirstName.charAt(0).toUpperCase() + replyByLastName.charAt(0).toUpperCase();
        this.replyByFullName = replyByFirstName + ' ' + replyByLastName;
        this.replyByImgPath = replyByImgPath;
        this.documentName = documentName;
        this.documentContents = documentContents;
        this.cloudFilePath = cloudFilePath;
        this.fileName = documentName ? documentName.substring(documentName.indexOf('$') + 1) : cloudFilePath ? cloudFilePath : '';
        this.path = documentName;
        this.isPreview = (documentName !== '' ? true : false) || (cloudFilePath !== '' ? true : false);
    }
}

export enum DashboardType {
    MyDashboard = 1,
    TeamMemberDashboard = 2
};

export enum SparkListBy {
    Weekly = 1,
    Monthly = 2,
    History = 3
};

export interface SparkReplyObject {
    replyBy: number,
    sparkId: number,
    reply: string,
    replyDate: string,
    createdBy: number,
    documentName: string,
    documentContents: string,
    cloudFilePath: string,
    // fileName: string,
}
// {"replyBy":26773,"sparkId":2052,"reply":"thak you mayur","replyDate":"2020-05-13","createdBy":26773,}