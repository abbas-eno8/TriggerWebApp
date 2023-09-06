/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create ModalContent for content which are binding in static modal popup.
**/

export enum ModalContent {
    ExcelUploadNoDepartmentFoundContent = 'ExcelUploadNoDepartmentFound',
    ExcelUploadNoDepartmentFound = 'There are no departments created for your company. Please first create the appropriate departments, within the Truvelop application, and you will then have access to the bulk upload functionality.',
    NoAccessContent = 'AddEmployeeNoManagerFound',
    NoAccess = 'Please ensure you have created at least one company admin. Please logout from {{ client }} and navigate to Admin.'

}