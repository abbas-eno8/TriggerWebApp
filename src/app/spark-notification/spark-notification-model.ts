export class ApiResponse {
    constructor(
        public data: any[],
        public status: string = '',
        public message: string = '',
    ) { }
}

export class UnApprovedSpark {
    public empId: number
    public sparkId: number
    public sparkDate: string
    public sparkBy: number
    public sparkByFirstName: string
    public sparkByLastName: string
    public firstName: string
    public lastName: string
    public givenBy: string
    public employeeName: string
    public spark: string
    public approvalStatus: number
    public createdBy: number
    constructor(
        empId: number = 0,
        sparkId: number = 0,
        sparkDate: string = '',
        sparkBy: number = 0,
        givenBy: string = '',
        sparkByFirstName: string = '',
        sparkByLastName: string = '',
        firstName: string = '',
        lastName: string = '',
        remarks: string = '',
        approvalStatus: number = 0,
        createdBy: number = 0
    ) {
        this.empId = empId;
        this.sparkId = sparkId;
        this.sparkDate = sparkDate;
        this.sparkBy = sparkBy;
        this.givenBy = sparkByFirstName + ' ' + sparkByLastName;
        this.employeeName = firstName + ' ' + lastName
        this.sparkByFirstName = sparkByFirstName;
        this.sparkByLastName = sparkByLastName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.spark = remarks;
        this.approvalStatus = approvalStatus;
        this.createdBy = createdBy
    }
}

export class RequestModel {
    public EmpId: number;
    public SparkId: number;
    public ApprovalStatus: number;
    public CreatedBy: number;
    public RejectionRemark: string;
    constructor(
        EmpId: number,
        SparkId: number,
        ApprovalStatus: number,
        CreatedBy: number,
        RejectionRemark: string
    ) {
        this.EmpId = EmpId;
        this.SparkId = SparkId;
        this.ApprovalStatus = ApprovalStatus;
        this.CreatedBy = CreatedBy;
        this.RejectionRemark = RejectionRemark
    }
}

/** Create constant for Display-column  */
export const unApprovedSparkColumns = ['spark', 'employeeName' , 'givenBy', 'action'];
/** Create constant for cdk-overlay-pane */
export const CskOverlayPanel = 'cdk-overlay-pane';

export const MainDiv = 'mainDIV'
export const H100 = 'h-100'
export const NoRecordContainerClass= 'no-records-container'