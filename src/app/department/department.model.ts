/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for Tooltip header and description.
**/

export const Search_Fields: any[string] = ['departmentId', 'department'];

export enum DepartmentModel {
    // PageTitle = 'Departments',
    // TooltipHeader = 'Department:',
    // TooltipDescription = 'By clicking the ‘Department’ tab on the dashboard, a Company Administrator can add his/her company’s departments.',
    AddDepartment = 'Add department',
    EditDepartment = 'Edit department',
    Add = 'Add',
    Edit = 'Edit',
    Update = 'Update',
    SearchPlaceHolder = 'Search Departments...',
    DepartmentHeader = 'Department'
}

export const DepartmentAccordionTableColumn = ['departmentId', 'department', 'action']
// export const DepartmentNormalTableColumn = ['departmentId', 'department', 'emailConfig', 'action']
export const DepartmentNormalTableColumn = ['department', 'emailConfig', 'action']

export class DepartmentList {
    departmentId: string
    department: string
    companyId: number
    sendSpark: boolean
    sendTrigger: boolean
    config: string
}