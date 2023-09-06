export class TeamMembers {
    public isPasswordGenerated: boolean = false
    public empId: number = 0
    public employeeId: string = ''
    public teamMemberName: string = ''
    public teamMemberFirstName: string = ''
    public teamMemberLastName: string = ''
    public email: string = ''
    public managerName: string = ''
    public managerFirstName: string = ''
    public managerLastName: string = ''
    public position: string = ''
    public department: string = ''
    public lastEvaluationDate: string = ''
    public managerLastAssessedDate: string = ''
    public ratingCompleted: string = ''
    public ratingCompletedCurrentYear: string = ''
    public averageScore: string = ''
    public lastEvaluation: string = ''
    public empRelation: number = 0
    public teamType: number = 0
    public protectionLevel: number = 0
    public currentSalary: number = 0
    public departmentId: number = 0
    public roleId: number = 0
    public managerId: number = 0
    public empStatus: number = 0
    public isMailSent: boolean = false
    public sendSpark: boolean = false
    public sendTrigger: boolean = false
    public noOfSpark: string = ''
    public lastSparkDate: string = ''
    public isEditableSalary: boolean = false
    public isEditable: boolean = false
    public isDeletable: boolean = false
    public isTriggerEmployee: boolean = false
    public isDisplayEmployeeDashboard: boolean = false
    public isDisabledAction: boolean = false
    public isDisaplyTriggerScore: boolean = false
    public isSparkViewable: boolean = false
    public isSparkAddable: boolean = false
    public isSparkEditable: boolean = false
    public isSparkDeletable: boolean = false
    public isChecked: boolean = false
    public isTriggerSent: number = 0
    public managerAction: string = ''
    public scoreSummary: string = ''
    public trending: number = 0

    constructor(
        isPasswordGenerated: boolean = false,
        empId: number = 0,
        employeeId: string = '',
        fisrtName: string = '',
        lastName: string = '',
        email: string = '',
        managerFirstName: string = '',
        managerLastName: string = '',
        jobTitle: string = '',
        department: string = '',
        lastAssessedDate: string = '',
        managerLastAssessedDate: string = '',
        ratingCompleted: number = 0,
        ratingCompletedCurrentYear: string = '',
        averageScore: string = '',
        lastScoreRank: string = '',
        currentSalary: number = 0,
        departmentId: number = 0,
        roleId: number = 0,
        managerId: number = 0,
        empRelation: number = 0,
        teamType: number = 0,
        protectionLevel: number = 0,
        empStatus: number = 0,
        isMailSent: boolean = false,
        sendSpark: boolean = false,
        sendTrigger: boolean = false,
        noOfSpark: string = '',
        lastSparkDate: string = '',
        isTriggerSent: number = 0,
        managerAction: string = '',
        scoreSummary: string = '',
        trending: number = 0
    ) {
        this.isPasswordGenerated = isPasswordGenerated;
        this.empId = empId;
        this.employeeId = employeeId;
        this.teamMemberName = fisrtName + ' ' + lastName
        this.teamMemberFirstName = fisrtName;
        this.teamMemberLastName = lastName;
        this.email = email;
        this.managerFirstName = managerFirstName;
        this.managerLastName = managerLastName;
        this.managerName = managerFirstName + ' ' + managerLastName;
        this.position = jobTitle;
        this.department = department;
        this.lastEvaluationDate = lastAssessedDate;
        this.ratingCompleted = ratingCompleted + '';
        this.ratingCompletedCurrentYear = ratingCompletedCurrentYear + '';
        this.averageScore = averageScore;
        this.lastEvaluation = lastScoreRank;
        this.managerLastAssessedDate = managerLastAssessedDate;
        this.currentSalary = currentSalary;
        this.departmentId = departmentId;
        this.roleId = roleId;
        this.managerId = managerId;
        this.empRelation = empRelation;
        this.empStatus = empStatus;
        this.teamType = teamType;
        this.protectionLevel = protectionLevel;
        this.isMailSent = isMailSent;
        this.sendSpark = sendSpark;
        this.sendTrigger = sendTrigger;
        this.noOfSpark = noOfSpark + '';
        this.lastSparkDate = lastSparkDate;
        this.isTriggerSent = isTriggerSent;
        this.managerAction = managerAction;
        this.scoreSummary = scoreSummary;
        this.trending = trending;
    }
}

export class Department {
    public id: number = 0
    public department: string = ''
    constructor(
        departmentId: number = 0,
        department: string = ''
    ) {
        this.id = departmentId;
        this.department = department;
    }
}

export class TeamMemberColumns {
    public empId: number = 0
    public columnId: number = 0
    public property: string = ''
    public column: string = ''
    public position: number = 0
    public hidden: boolean = false
    public widthClass: string = ''

    constructor(
        empId: number = 0,
        columnId: number = 0,
        column: string = '',
        displayColumn: string = '',
        columnSequence: number = 0,
        hidden: boolean = false,
        widthClass: string = '',
    ) {
        this.empId = empId;
        this.columnId = columnId;
        this.property = column;
        this.column = displayColumn;
        this.position = columnSequence;
        this.hidden = hidden;
        this.widthClass = widthClass;
    }
}

export class ColumnConfiguration {
    public empId: number = 0
    public columnId: number = 0
    public columnSequence: number = 0
    public CreatedBy: number = 0
    constructor(
        empId: number = 0,
        columnId: number = 0,
        position: number = 0,
        CreatedBy: number = 0,
    ) {
        this.empId = empId;
        this.columnId = columnId;
        this.columnSequence = position;
        this.CreatedBy = CreatedBy;
    }
}

export class DimensionList {
    public dimensionId: number = 0
    public dimensionName: string = ''
    public dimensionElements: DimensionElementList[]
    constructor(
        dimensionId: number = 0,
        dimensionName: string = '',
        dimensionElements: DimensionElementList[]
    ) {
        this.dimensionId = dimensionId;
        this.dimensionName = dimensionName;
        this.dimensionElements = dimensionElements
    }
}

export class DimensionElementList {
    public elementName: string = ''
    public elementId: number = 0
    public checked: boolean = false
    constructor(
        elementName: string = '',
        elementId: number = 0,
        checked: boolean = false
    ) {
        this.elementName = elementName;
        this.elementId = elementId;
        this.checked = checked
    }
}

export class SendMail {
    public empIdlist: string = ''
    public companyId: number = 0
    constructor(
        empIdlist: string = '',
        companyId: number = 0,
    ) {
        this.empIdlist = empIdlist;
        this.companyId = companyId
    }
}

export const Record = 'record';

export const CustomColumn = [
    { id: 1, property: 'employeeId', widthClass: 'id-column-width mx-auto', },
    { id: 2, property: 'teamMemberName', widthClass: 'normal-column-width', },
    { id: 3, property: 'managerName', widthClass: 'normal-column-width', },
    { id: 4, property: 'position', widthClass: 'position-column-width', },
    { id: 5, property: 'department', widthClass: 'position-column-width', },
    { id: 6, property: 'lastEvaluationDate', widthClass: 'evaluat-column-width', },
    { id: 7, property: 'ratingCompleted', widthClass: 'evaluat-column-width', },
    { id: 8, property: 'averageScore', widthClass: 'position-column-width', },
    { id: 9, property: 'lastEvaluation', widthClass: 'position-column-width', },
    { id: 10, property: 'noOfSpark', widthClass: 'position-column-width', },
    { id: 11, property: 'lastSparkDate', widthClass: 'position-column-width', },
    { id: 12, property: 'ratingCompletedCurrentYear', widthClass: 'evaluat-column-width rating-label text-break' },
    { id: 13, property: 'managerAction', widthClass: 'evaluat-column-width' },
    { id: 14, property: 'scoreSummary', widthClass: 'evaluat-column-width' },
    { id: 15, property: 'trending', widthClass: 'evaluat-column-width' },
];
