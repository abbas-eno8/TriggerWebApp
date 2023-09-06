import { Route, HeaderParameter } from "../core/magic-string/common.model";

/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for Tooltip header and description.
**/

export enum EmployeeModel {
    Add = 'Add',
    Update = 'Update',
    AddEmployee = 'Add Team Member',
    EditEmployee = 'Edit Team Member',
    ManagerName = 'Manager name',
    CurrentManagerName = 'Current Manager name',
    UpdateSalary = 'Update Salary'
}

/** Create constant for Page-Title of Excel-Uplod */
export const ExcelUpload = 'Excel Uplod'

/** Create constant for Records per page string */
export const RecordPerPage = 'Records per page :'

/** Create constant for Records string */
export const Records = 'Records:'

/** Create constant for DateFormate */
export const DateFormate = 'yyyy/MM/dd'

/** Create constant for MainDiv string */
export const MainDiv = 'mainDIV'

/** Create ClientModel for data transfer to api */
export class CountryCallinCodeModel {
    name: string
    callingCodes: number
    flag: string
};

/** Create ContactNumber for calling-code and phone-number */
export class ContactNumber {
    callingCode: string = '+1'
    phoneNumber: string = ''
};

export enum EmployeeStatus {
    Active = 1,
    Separated = 2,
    OnLeave = 3,
}

/** Create constant for store header parameter value for header-view component */
export const Header: HeaderParameter[] = [
    { title: ExcelUpload, icon: 'icon-xls-file', redirectTo: Route.ExcelUpload },
    { title: EmployeeModel.AddEmployee, icon: 'icon-add', redirectTo: Route.AddEmployee }
]

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


export class MasterDimensionElementModel {
    dimensionId: number = 0
    dimensionType: string = ''
    dimensionValuesWisePermision?: DimensionValueModel[]
}

export class DimensionValueModel {
    dimensionValues: string = ''
    dimensionValueid: number = 0
    checked: boolean = false
}

export class DimensionList {
    dimensionId: number
    dimensionName: string
    dimensionElements: DimensionElementList[]
}

export class DimensionElementList {
    elementName: string
    elementId: number
    checked: boolean = false
}