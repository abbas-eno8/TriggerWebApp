import { Encryption } from '../core/magic-string/common-validation-model';
import { Validator } from '../core/magic-string/common.model';
import { IgnoreSpaceInitial } from '../core/magic-string/Regex-pattern';
import { TeamMembers } from '../employees/team-member/team-member-model';

/** Base Response */
export class BaseResponse {
    public categories: Category[];
    public classifications: Classification[];
    // public teamMember: TeamMembers[];
}

/** This class used for Classifications Categories */
export class ClassificationsCategories {
    public classifications: SparkAnEmployee[]
    public categories: Category[]

    constructor(
        classifications: SparkAnEmployee[],
        categories: Category[]
    ) {
        this.classifications = classifications;
        this.categories = categories;
    }
}

/** This model class used for Classifications */
export class Classification {
    public classificationId: number;
    public classification: string;
    public documentName: string;
    public documentContents: string;
    public cloudFilePath: string;
    constructor(
        classificationId: number = 0,
        classification: string = '',
        documentName: string = '',
        documentContents: string = '',
        cloudFilePath: string = '',
    ) {
        this.classificationId = classificationId;
        this.classification = classification;
        this.documentName = documentName;
        this.documentContents = documentContents;
        this.cloudFilePath = cloudFilePath;
    }
}

/** This model class used for Category */
export class Category {
    public categoryId: number
    public category: string

    constructor(
        categoryId: number = 0,
        category: string = '',
    ) {
        this.categoryId = categoryId;
        this.category = category;
    }
}

/** This model class used for SparkAnEmployee */
export class SparkAnEmployee {
    public empIds: number[]
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
    public dimensionId?: any
    //public action: string
    constructor(
        isSparkSent: number = 0,
        empIds: number[] = [],
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
        sendSpark: boolean = true,
        RequestId: number = 0,
        dimensionId: any = 0,
    ) {
        this.isSparkSent = isSparkSent === 1 ? true : false;
        this.empIds = empIds;
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
        this.dimensionId = dimensionId;
    }
}

/** This model class used for Add Attachment */
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

/** This model class used for RequestModel */
export class RequestModel {
    public empIds: number[]
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
        empIds: number[] = [],
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
        this.empIds = empIds;
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

/** Store the SendMailObject */
export class SendMailObject {
    public employeeSparkDetails: EmployeeSparkDetails[];
    public emailContent: string;
}

/** Store the EmployeeSparkDetails list */
export class EmployeeSparkDetails {
    public empId: number;
    public employeeEmail: string;
    public sparkId: number;
}

/** This const used for category id */
export const AccoladeCategoryId = 5;

/** This const used for field Validator */
export const fieldValidator: Validator[] = [
    { id: 1, key: 'empIds', value: '', name: 'Team Members', isMandatory: true, isSelectDropdown: true },
    { id: 1, key: 'categoryId', value: '', name: 'Category', isMandatory: true, isDropdown: true },
    { id: 1, key: 'classificationId', value: '', name: 'Classification', isMandatory: true, isDropdown: true },
    { id: 2, key: 'spark', value: '', name: 'Spark', isMandatory: false, pattern: IgnoreSpaceInitial },
];

export class CommonDimensionType {
    public elementId: number
    public elementName: string
    public isChecked: boolean
    constructor(
        elementId: number = 0,
        elementName: string = '',
        isChecked: boolean = false
    ) {
        this.elementId = elementId;
        this.elementName = elementName;
        this.isChecked = false;
    }
}


/** This const used for field Validator */
export const GroupSparkAdditionalFilter: GroupSparkAdditionalFilterType[] = [
    { dimensionId: 0, dimensionName: 'Additional Filter', dimensionValues: 'Additional Filter' },
    { dimensionId: 1, dimensionName: 'Role', dimensionValues: 'Roles' },
    { dimensionId: 3, dimensionName: 'Department', dimensionValues: 'Departments' },
    { dimensionId: 4, dimensionName: 'Team', dimensionValues: 'Teams' },
    { dimensionId: 2, dimensionName: 'Position', dimensionValues: 'Positions' },

];

/** Store the GroupSparkAdditionalFilter list */
export class GroupSparkAdditionalFilterType {
    constructor(
        public dimensionId: number | string,
        public dimensionName: string,
        public dimensionValues: string,
    ) { }
}