import { Validator } from "../core/magic-string/common.model";

/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for Masters-Dimension.
**/

/** Create constant for Class accordion-minus */
export const AccrdianMinus = 'icon-minus d-flex align-items-center';
/** Create constant for Class accordion-plus */
export const AccrdianPlus = 'icon-pluse d-flex align-items-center';
/** Create constant for Class collaspe */
export const Collaspe = 'collapse';
/** Create constant for Class collaspe-show */
export const CollaspeExpand = 'collapse show';
/** Create constant for title of add-attribute */
export const AddAttribute = 'Add Attribute';
/** Create constant for title of add-new-attribute */
export const AddDimensionAttribute = 'New Attribute';
/** Create constant for title of update-new-attribute */
export const UpdateDimensionAttribute = 'Update Attribute';
/** Create constant for title of add-button-value */
export const AddBtnValue = 'Add';
/** Create constant for title of update-button-value */
export const UpdateBtnValue = 'Update';
/** Create constant for class of modal-popup */
export const PopupboxClass = 'lg-dialog-container';

export class MasterDimensionModel {
    id: number = 0
    dimension: string = ''
    isCollapsed?: boolean = false
    accrodianIconClass?: string = AccrdianPlus
    collapseClass?: string = Collaspe
    attributeModel?: AttributeModel[]
}

// export class AttributeModel {
//     constructor(
//         public id: number = 0,
//         public attribute: string = ''
//     ) { }
// }

export class AttributeModel {
    id: number = 0
    dimensionId: number = 0
    dimensionValueid?: number = 0
    dimensionValues: string = ''
    isDefault: boolean = true
    orderBy: boolean = false
    createdBy?: number = 0
    updatedBy?: number = 0
    result?: number = 0
    isManagerAccess: boolean = false;
}

export class DimensionAttributeModel {
    title: string = ''
    operation: string = ''
    dimensionsType?: MasterDimensionModel[]
    AttributeModel?: AttributeModel
}

/** Regex pattern for alphabatic with space */
//export const Alphabatic = /^[a-zA-Z][a-zA-Z\s-]*$/ //    /^[^\s]|[a-zA-Z-]{1,25}$/ //      /^[a-zA-Z\s]{1,10}$/; 
export const Alphabatic = /^[a-zA-Z](|[a-zA-Z\s-]{1,49})$/;      //      /^[a-zA-Z](|[a-zA-Z\s-]{1,5})$/;    

export const fieldValidator: Validator[] = [
    { id: 1, key: 'dimensionId', value: '', name: 'Attribute Type', isMandatory: true, isDropdown: true },
    { id: 2, key: 'dimensionValues', value: '', name: 'Attribute', isMandatory: true, pattern: Alphabatic, maxLength: 50 },
];

