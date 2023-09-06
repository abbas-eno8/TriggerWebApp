import { Route, HeaderParameter } from "../core/magic-string/common.model";

/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for Tooltip header and description.
**/

/** Create ClientModel for data transfer to api */
export class AdminModel {
}

/** Constant for page-title of Add Admin */
export const AddAdmin = 'Add Admin'
/** Constant for page-title of Edit Admin */
export const EditAdmin = 'Edit Admin'
/** Constant for page-title of New Admin */
export const NewAdmin = 'New Admin'
/** Constant for page-title of Company Admin */
export const CompanyAdmin = 'Company Admin'

/** Create constant for store header parameter value for header-view component */
export const Header: HeaderParameter[] = [
    { title: NewAdmin, icon: 'icon icon-add d-flex align-items-center text-white', redirectTo: Route.AddAdmin }
]