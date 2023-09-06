import { tooltip, hedaerTooltipIconClass } from "../shared/tooltip/tooltip-model";
import { Id, Name, EmailAddress, PhoneNumber, ContactNumber, AlphabaticWithSpace, ZipCodeValidation, NumberOnly, CurrentSalary } from "../core/magic-string/Regex-pattern";

/**
@author : Anjali Tandel
@class : Enumeration 
@description : Create enumeration for static values, error-message, dynamic-class.
**/

export enum Value {
    ExcelReview = 'REVIEW',
    ExcelStartImport = 'START IMPORT',
    ExcelResolve = 'RESOLVE',
    ExcelImportReplace = 'IMPORT & REPLACE',
    ExcelDone = 'DONE'
}

export enum Class {
    ExcelIconStar = 'icon icon-star text-white d-flex align-items-center',
    ExcelIconImport = 'icon icon-arrow-continue text-white d-flex align-items-center',
    ExcelIconResolved = 'icon icon-tools text-white',
    ExcelIconImportReplace = 'icon icon-arrow-continue text-white d-flex align-items-center',
    ExcelIconDone = 'icon icon-import text-white',
    ExcelStrikeout = 'strikeout',
    ExcelActive = 'primary-rounded round-inprogress d-flex align-items-center justify-content-center',
    ExcelComplete = 'primary-rounded round-active icon-right d-flex align-items-center justify-content-center',
    ExcelRemainStep = 'primary-rounded d-flex align-items-center justify-content-center'
}

export enum Message {
    ExcelFileInvalid = 'Invalid File Format.',
    ExcelInvalidData = 'Excel template | Invalid data.',
    ExcelNoDataSelected = 'No data selected for import, please select or skip the step.',
}

export enum FileType {
    Xls = 'xls',
    Xlsx = 'xlsx',
    Text = 'text',
    Buffer = 'buffer',
}
export enum FileSizeType {
    Bytes = ' Bytes',
    KB = ' KB',
    MB = ' MB',
    GB = ' GB',
}

export const ExeclUploadDescription = 'You can upload a list of up to thousands of team members of all different roles at once with the Excel Upload functionality. You can find instructions in Section 3.4 of the user guide.'
export const ExeclUploadVerifyDescription = 'After importing the file, verify the correct number of team members being loaded through the Excel as listed. If any duplicate data is found between the uploaded Excel and data already present in Truvelop, it will translate as Mismatch Data.'
export const ExeclUploadNewlyDescription = 'On the Review New Team members screen, you can mark all team members’ statuses as ‘Active.’'
export const ExeclUploadMismatchDescription = 'If there is any Mismatch Data detected, you will be able to review the invalids on the next step.'
export const ExeclUploadConfirmDescription = 'On the bottom of your screen, you will receive a confirmation message stating that all of your team members have been uploaded successfully into your company, along with the total number being uploaded. You can view all your team members on the team members List by clicking ‘Back to team members List.’'

/** Bind tooltip header, description and class for excel-upload */
export const tooltipData: tooltip[] = [
    { id: 1, pageTitle: 'Excel Upload', header: 'Excel Upload', description: ExeclUploadDescription },
    { id: 2, pageTitle: 'Verify', header: 'Verify', description: ExeclUploadVerifyDescription },
    { id: 3, pageTitle: 'Select', header: 'Select', description: ExeclUploadNewlyDescription },
    { id: 4, pageTitle: 'Mismatch Selection', header: 'Mismatch Selection', description: ExeclUploadMismatchDescription },
    { id: 5, pageTitle: 'Confirm', header: 'Confirm', description: ExeclUploadConfirmDescription },
]

export const Inactive = 'Inactive';
export const Active = 'Active';
export const Seperated = 'Separated';
export const OnLeave = 'On Leave';
export const Excel = 'Excel';
export const DB = 'DB';

/** Create model for excel-upload */
export class ImportExcelUpload {
    public empId: number = 0
    public employeeId: string = ''
    public companyId: number = 0
    public firstName: string = ''
    public middleName: string = ''
    public lastName: string = ''
    public suffix: string = ''
    public email: string = ''
    public phonenumber: string = ''
    public jobTitle: string = ''
    public joiningDate: string = ''
    public workCity: string = ''
    public workState: string = ''
    public workZipcode: string = ''
    public departmentId: number = 0
    public department: string = ''
    public managerId: number = 0
    public protectionLevelId: number = 0
    public inTime: string = ''
    public outTime: string = ''
    public empStatus: number = 0
    public displayEmpStatus: string = ''
    public roleId: number = 0
    public dateOfBirth: string = ''
    public raceorethanicityId: number = 0
    public gender: string = ''
    public jobCategory: string = ''
    public jobCode: string = ''
    public jobGroup: string = ''
    public lastPromodate: string = ''
    public currentSalary: number = 0
    public lastIncDate: string = ''
    public empLocation: string = ''
    public countryId: number = 0
    public regionId: number = 0
    public createdBy: number = 0
    public updatedBy: number = 0
    public CSVManagerId: string = ''
    public createddtstamp: string = ''
    public updateddtstamp: string = ''
    public isChecked: boolean = false
    public recordType: string = ''
    public isHideCheckbox: boolean = false
    constructor(
        empId: number = 0,
        companyId: number = 0,
        employeeId: string = '',
        firstName: string = '',
        middleName: string = '',
        lastName: string = '',
        suffix: string = '',
        email: string = '',
        phonenumber: string = '',
        jobTitle: string = '',
        joiningDate: string = '',
        workCity: string = '',
        workState: string = '',
        workZipcode: string = '',
        departmentId: number = 0,
        department: string = '',
        managerId: number = 0,
        protectionLevelId: number = 0,
        inTime: string = '',
        outTime: string = '',
        empStatus: number = 0,
        roleId: number = 0,
        dateOfBirth: string = '',
        raceorethanicityId: number = 0,
        gender: string = '',
        jobCategory: string = '',
        jobCode: string = '',
        jobGroup: string = '',
        lastPromodate: string = '',
        currentSalary: number = 0,
        lastIncDate: string = '',
        empLocation: string = '',
        countryId: number = 0,
        regionId: number = 0,
        createdBy: number = 0,
        updatedBy: number = 0,
        CSVManagerId: string = '',
        index: number = 0,
    ) {
        this.empId = empId;
        this.employeeId = employeeId.split('-')[0] !== '' ? employeeId.split('-')[0] : '';
        this.companyId = companyId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.suffix = suffix;
        this.email = email;
        this.phonenumber = phonenumber;
        this.jobTitle = jobTitle;
        this.joiningDate = joiningDate;
        this.workCity = workCity;
        this.workState = workState;
        this.workZipcode = workZipcode;
        this.departmentId = departmentId;
        this.department = department;
        this.managerId = managerId;
        this.protectionLevelId = protectionLevelId;
        this.inTime = inTime;
        this.outTime = outTime;
        this.empStatus = empStatus;
        // this.displayEmpStatus = empStatus ? Active : Inactive;
        this.displayEmpStatus = EmployeeStatss.find(e => e.id === this.empStatus).key;
        this.roleId = roleId;
        this.dateOfBirth = dateOfBirth || '01-01-1900';
        this.raceorethanicityId = raceorethanicityId;
        this.gender = gender;
        this.jobCategory = jobCategory;
        this.jobCode = jobCode;
        this.jobGroup = jobGroup;
        this.lastPromodate = lastPromodate || '01-01-1900';
        this.currentSalary = currentSalary;
        this.lastIncDate = lastIncDate || '01-01-1900';
        this.empLocation = empLocation;
        this.countryId = countryId;
        this.regionId = regionId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.CSVManagerId = CSVManagerId;
        this.createddtstamp = '01-01-1900'; // Unnecessary parameter which should removed from backend side
        this.updateddtstamp = '01-01-1900'; // Unnecessary parameter which should removed from backend side
        this.isChecked = false;
        this.recordType = index % 2 === 0 ? Excel : DB;
        this.isHideCheckbox = false;
    }
}

/** Create model for excel-upload */
export class ReadExcelUpload {
    public employeeId: string = ''
    public companyId: number = 0
    public firstName: string = ''
    public middleName: string = ''
    public lastName: string = ''
    public suffix: string = ''
    public email: string = ''
    public phonenumber: string = ''
    public jobTitle: string = ''
    public joiningDate: string = ''
    public workCity: string = ''
    public workState: string = ''
    public workZipcode: string = ''
    public departmentId: string = ''
    public managerId: string = ''
    public protectionLevel: string = ''
    public inTime: string = ''
    public outTime: string = ''
    public empStatus: number = 0
    public roleId: string = ''
    public dateOfBirth: string = ''
    public raceorethanicityId: string = ''
    public gender: string = ''
    public jobCategory: string = ''
    public jobCode: string = ''
    public jobGroup: string = ''
    public lastPromodate: string = ''
    public currentSalary: number = 0
    public lastIncdate: string = ''
    public empLocation: string = ''
    public countryId: string = ''
    public regionId: string = ''
    public CSVManagerId: string = ''
    public createddtstamp: string = ''
    public updateddtstamp: string = ''
    constructor(
        companyId: number = 0,
        TeamMemberID: string = '',
        FirstName: string = '',
        MiddleName: string = '',
        LastName: string = '',
        Prefix: string = '',
        EmailAddress: string = '',
        CountryCallingCode: string = '',
        PhoneNumber: string = '',
        TeamMemberPosition: string = '',
        DateOfHire: string = '',
        City: string = '',
        State: string = '',
        Zip: string = '',
        Department: string = '',
        TeamMemberStatus: string = '',
        Role: string = '',
        ManagersName: string = '',
        ProtectionLevel: string = '',
        InTime: string = '',
        OutTime: string = '',
        ExcelManagersTeamMemberID: string = '',
        Ethnicity: string = '',
        Gender: string = '',
        JobCategory: string = '',
        JobCode: string = '',
        JobGroup: string = '',
        DateInPosition: string = '',
        CurrentSalary: string = '',
        DateOfLastSalaryIncrease: string = '',
        DateOfBirth: string = '',
        LocationName: string = '',
        Country: string = '',
        Region: string = '',
    ) {
        this.employeeId = TeamMemberID ? TeamMemberID.trim() : '',
            this.companyId = companyId;
        this.firstName = FirstName;
        this.middleName = MiddleName ? MiddleName.trim() : '';
        this.lastName = LastName;
        this.suffix = Prefix ? Prefix.trim() : '0';
        this.email = EmailAddress;
        this.phonenumber = PhoneNumber && CountryCallingCode ? (CountryCallingCode.trim() + ' ' + PhoneNumber.trim()) : '';
        this.jobTitle = TeamMemberPosition;
        this.joiningDate = DateOfHire;
        this.workCity = City;
        this.workState = State;
        this.workZipcode = Zip;
        this.departmentId = Department;
        this.managerId = ManagersName ? ManagersName.trim() : '';
        this.protectionLevel = ProtectionLevel ? ProtectionLevel.trim() : '';
        this.inTime = InTime ? InTime.trim() : '';
        this.outTime = OutTime ? OutTime.trim() : '';
        // this.empStatus = TeamMemberStatus === Active ? true : false;
        this.empStatus = TeamMemberStatus === Active ? 1 : TeamMemberStatus === Seperated ? 2 : TeamMemberStatus === OnLeave ? 3 : 0;
        this.roleId = Role;
        this.dateOfBirth = DateOfBirth ? DateOfBirth.trim() : '01-01-1900';
        this.raceorethanicityId = Ethnicity ? Ethnicity.trim() : '';
        this.gender = Gender ? Gender.trim() : '';
        this.jobCategory = JobCategory ? JobCategory.trim() : '';
        this.jobCode = JobCode ? JobCode.trim() : '';
        this.jobGroup = JobGroup ? JobGroup.trim() : '';
        this.lastPromodate = DateInPosition ? DateInPosition.trim() : '01-01-1900';
        this.currentSalary = CurrentSalary ? parseInt(CurrentSalary.trim()) : 0;
        this.lastIncdate = DateOfLastSalaryIncrease ? DateOfLastSalaryIncrease.trim() : '01-01-1900';
        this.empLocation = LocationName ? LocationName.trim() : '';
        this.countryId = Country ? Country.trim() : '';
        this.regionId = Region ? Region.trim() : '';
        this.CSVManagerId = ExcelManagersTeamMemberID ? ExcelManagersTeamMemberID.trim() : '';
        this.createddtstamp = '01-01-1900'; // Unnecessary parameter which should removed from backend side
        this.updateddtstamp = '01-01-1900'; // Unnecessary parameter which should removed from backend side
    }
}
export const DuplicateEmployeeId = 'Record failed with duplicate TeamMemberID.';
export const DuplicateEmailAddress = 'Record failed with duplicate EmailAddress.';
export const DuplicatePhoneNumber = 'Record failed with duplicate PhoneNumber.';
export const SelectManagerOrId = 'Please select ManagersName or enter ExcelManagersTeamMemberID.'
export const RegionMandatory = 'Please Select Region.';
export const InvalidRecordFile = 'Invalid_records_';
export const InvalidFileFormat = 'MM-DD-YYYY HH:mm:ss';
export const DiscardDateFormat = '(MM-DD-YYYY)';
export const DiscardTimeFormat = '(HH:MM)';
export const MultiStepWizard = 'multiStepWizard';
export const Header = 'header';
export const ReviewEmployees = 'reviewEmployees';
export const ImportReadData = 'importReadData';
export const MismatchData = 'mismatchData';
export const Canada = 'Canada';
export const UnitedStates = 'United States';
export class ExcelValidation {
    public id: number = 0
    public key: string = ''
    public isMandatory: boolean = true;
    public minLength?: number = 0
    public maxlength?: number = 0
    public pattern?: any
    public isDate?: boolean = false
    public isDropdown?: boolean = false
    public invalid?: string = ''
    public invalidString?: string = ''
}
export enum CompareString {
    Excel_Prefix = 'Select Prefix',
    Excel_Role = 'Select Role',
    Excel_Manager = 'Select Manager:',
    Excel_Department = 'Select Department',
    Excel_Status = 'Select Status',
    Excel_Country = 'Select Country',
    Excel_Region = 'Select Region',
    Excel_Calling_Code = 'Select Country Calling Code'
}

/** Create fieldValidator for team-form-validation  */
export const ExcelFieldValidation: ExcelValidation[] = [
    { id: 1, key: 'TeamMemberID', isMandatory: false, minLength: 0, maxlength: 10, pattern: /^[a-zA-Z0-9]*$/, invalid: 'TeamMemberID should allow only alphanumeric values.' },
    { id: 2, key: 'FirstName', isMandatory: true, minLength: 1, maxlength: 25, pattern: Name, invalid: 'FirstName should allow only alphabetic characters and hyphened.' },
    { id: 3, key: 'MiddleName', isMandatory: false, minLength: 0, maxlength: 25, pattern: Name, invalid: 'MiddleName should allow only alphabatic character.' },
    { id: 4, key: 'LastName', isMandatory: true, minLength: 1, maxlength: 25, pattern: Name, invalid: 'LastName should allow only alphabatic character.' },
    { id: 5, key: 'Prefix', isMandatory: false, minLength: 0, maxlength: 50, pattern: '', invalidString: CompareString.Excel_Region, invalid: 'Prefix is not selected.' },
    { id: 6, key: 'EmailAddress', isMandatory: true, minLength: 1, maxlength: 60, pattern: EmailAddress, invalid: 'EmailAddress is not valid.' },
    { id: 7, key: 'CountryCallingCode', isMandatory: false, minLength: 2, maxlength: 5, pattern: ContactNumber, invalidString: CompareString.Excel_Calling_Code, invalid: 'CountryCallingCode.' },
    { id: 8, key: 'PhoneNumber', isMandatory: false, minLength: 7, maxlength: 15, pattern: PhoneNumber, invalid: 'Phone number should be at least 7 digits and no more than 15 digits.' },
    { id: 9, key: 'TeamMemberPosition', isMandatory: true, minLength: 1, maxlength: 50, pattern: AlphabaticWithSpace, invalid: 'TeamMemberPosition should allow only alphabatic character.' },
    { id: 10, key: 'DateOfHire', isMandatory: true, isDate: true, pattern: /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/, invalid: 'DateOfHire(MM-DD-YYYY) is invalid, it should be in MM/DD/YYYY format and year should be not less than 1900.' },
    { id: 11, key: 'City', isMandatory: true, minLength: 1, maxlength: 30, pattern: AlphabaticWithSpace, invalid: 'City should allow only alphabatic character.' },
    { id: 12, key: 'State', isMandatory: true, minLength: 1, maxlength: 25, pattern: AlphabaticWithSpace, invalid: 'State should allow only alphabatic character.' },
    { id: 13, key: 'Zip', isMandatory: true, minLength: 1, maxlength: 15, pattern: ZipCodeValidation, invalid: 'Zip should allow numeric values and dash.' },
    { id: 14, key: 'Department', isMandatory: true, minLength: 1, maxlength: 50, pattern: '', isDropdown: true, invalidString: CompareString.Excel_Department, invalid: 'Department is not selected.' },
    { id: 15, key: 'TeamMemberStatus', isMandatory: true, minLength: 1, maxlength: 50, pattern: '', isDropdown: true, invalidString: CompareString.Excel_Status, invalid: 'TeamMemberStatus is not valid.' },
    { id: 16, key: 'Role', isMandatory: true, minLength: 1, maxlength: 50, pattern: '', isDropdown: true, invalidString: CompareString.Excel_Role, invalid: 'Role is not selected.' },
    { id: 17, key: 'ManagersName', isMandatory: false, minLength: 0, maxlength: 50, isDropdown: true, pattern: '', invalidString: CompareString.Excel_Manager, invalid: 'ManagersName is not selected.' },
    { id: 18, key: 'ProtectionLevel', isMandatory: true, minLength: 1, maxlength: 50, isDropdown: true, pattern: '', invalidString: '', invalid: 'Protection-Level is not selected.' },
    { id: 18, key: 'InTime', isMandatory: true, minLength: 4, maxlength: 5, pattern: '', invalidString: '', invalid: 'In-time is not selected.' },
    { id: 18, key: 'OutTime', isMandatory: true, minLength: 4, maxlength: 5, pattern: '', invalidString: '', invalid: 'Out-time is not selected.' },
    { id: 19, key: 'ExcelManagersTeamMemberID', isMandatory: false, minLength: 0, maxlength: 10, pattern: '', invalid: 'ExcelManagersTeamMemberID.' },
    { id: 20, key: 'Ethnicity', isMandatory: false, minLength: 0, maxlength: 50, pattern: '', invalid: 'Ethnicity is not selected.' },
    { id: 21, key: 'Gender', isMandatory: false, minLength: 0, maxlength: 10, pattern: '', invalid: 'Gender is not selected.' },
    { id: 22, key: 'CareerLevel', isMandatory: false, minLength: 0, maxlength: 25, pattern: AlphabaticWithSpace, invalid: 'CareerLevel should allow only alphabatic character.' },
    { id: 23, key: 'JobCode', isMandatory: false, minLength: 0, maxlength: 25, pattern: AlphabaticWithSpace, invalid: 'JobCode should allow only alphabatic character.' },
    { id: 24, key: 'JobGroup', isMandatory: false, minLength: 0, maxlength: 25, pattern: AlphabaticWithSpace, invalid: 'JobGroup should allow only alphabatic character.' },
    { id: 25, key: 'DateInPosition', isMandatory: false, pattern: '', isDate: true, invalid: 'DateInPosition(MM-DD-YYYY) is invalid, it should be in MM/DD/YYYY format.' },
    { id: 26, key: 'CurrentSalary', isMandatory: false, minLength: 0, maxlength: 7, pattern: /^[\d]+$/, invalid: 'CurrentSalary allow only numeric values.' },
    { id: 27, key: 'DateOfLastSalaryIncrease', isMandatory: false, pattern: '', isDate: true, invalid: 'DateOfLastSalaryIncrease(MM-DD-YYYY) is invalid, it should be in MM/DD/YYYY format.' },
    { id: 28, key: 'DateOfBirth', isMandatory: false, pattern: '', isDate: true, invalid: 'DateOfBirth(MM-DD-YYYY) is invalid, it should be in MM/DD/YYYY format.' },
    { id: 29, key: 'LocationName', isMandatory: false, minLength: 0, maxlength: 50, pattern: AlphabaticWithSpace, invalid: 'LocationName should allow only alphabatic character.' },
    { id: 30, key: 'Country', isMandatory: false, minLength: 0, maxlength: 50, pattern: '', invalidString: CompareString.Excel_Country, invalid: 'Country is not selected.' },
    { id: 31, key: 'Region', isMandatory: false, minLength: 0, maxlength: 50, pattern: '', invalidString: CompareString.Excel_Region, invalid: 'Region is not selected.' },
];

/** Create EmployeeStatus with key  */
export const EmployeeStatss = [
    { id: 1, key: Active },
    { id: 2, key: Seperated },
    { id: 3, key: OnLeave },
];
