import { Actions, Dimension } from "../core/magic-string/common.model";

/** Create constant for Class accordion-minus */
export const AccrdianMinus = 'icon-minus d-flex align-items-center';
/** Create constant for Class accordion-plus */
export const AccrdianPlus = 'icon-pluse d-flex align-items-center';
/** Create constant for Class collaspe */
export const Collaspe = 'collapse';
/** Create constant for Class collaspe-show */
export const CollaspeExpand = 'collapse show';

/** Create constant for Class cemptyValidationMessage */
export const emptyValidationMessage = 'Please perform operation first.';
/** Create constant for Class ValidatationForEditDelete */
export const ValidatationForEditDelete = 'Please check view permission first.';
/** Create constant for Class validationForviewUncheck */
export const validationForviewUncheck = 'Please uncheck edit and delete permission first.';

export class MasterDimensionModel {
    dimensionType: string = ''
    id: number = 0
    bActive: boolean = false
}

export class MasterDimensionElementModel {
    dimensionId: number = 0
    dimensionType: string = ''
    dimensionValuesWisePermision?: DimensionValueModel[]
}

export class DimensionValueModel {
    dimensionValues: string = ''
    dimensionValueid: number = 0
    actionwisePermissionModel?: ActionWisePermissionModel[]
    isCollapsed?: boolean = false
    accrodianIconClass?: string = AccrdianPlus
    collapseClass?: string = Collaspe
    isShowDimensionElement: boolean
}

export class ActionWisePermissionModel {
    id: number = 0
    dimensionId: number = 0
    dimensionType: string = ''
    actionId: number = 0
    actions: string = ''
    dimensionValues: string = ''
    dimensionValueid: number = 0
    createdBy?: number = 0
    updatedBy?: number = 0
    result?: number = 0
    canView: boolean = false
    canAdd: boolean = false
    canEdit: boolean = false
    canDelete: boolean = false
    isViewable: boolean = false
    isAddable: boolean = false
    isEditable: boolean = false
    isDeletabled: boolean = false
    managerId?: number = 0
    //isEnableCheckbox: boolean = true
}

export class MasterActionsModel {
    actionId: number = 0
    actions: string = ''
}

export class masterModel {
    actionId: number = 0
    actions: string = ''
}

export enum Permission {
    EditClick = 'editClick',
    ViewClick = 'viewClick',
    Edit = 'edit',
    Delete = 'delete',
    View = 'view',
    Add = 'add'
}

/**
@author : Anjali Tandel
@class : Model  
@description : Model created for actions and thier permission.
**/
export class PermissionActions {
    constructor(
        public actionId: number = 0,
        public isViewable: boolean = true,
        public isAddable: boolean = true,
        public isEditable: boolean = true,
        public isDeletabled: boolean = true
    ) { }
}

export const ActionModel: PermissionActions[] = [
    { actionId: Actions.TriggerAnEmployee, isViewable: false, isAddable: true, isEditable: false, isDeletabled: false },
    { actionId: Actions.SparkAnEmployee, isViewable: true, isAddable: true, isEditable: false, isDeletabled: false },
    //{ actionId: Actions.EmployeeDashboard, isViewable: true, isAddable: false, isEditable: false, isDeletabled: false },
    { actionId: Actions.Comment, isViewable: false, isAddable: false, isEditable: false, isDeletabled: false },
    { actionId: Actions.TeamConfiguraton, isViewable: true, isAddable: false, isEditable: false, isDeletabled: false },
    { actionId: Actions.TeamDashboard, isViewable: true, isAddable: false, isEditable: false, isDeletabled: false },
    { actionId: Actions.RequestForTrigger, isViewable: false, isAddable: true, isEditable: false, isDeletabled: false },
    { actionId: Actions.RequestForSpark, isViewable: false, isAddable: true, isEditable: false, isDeletabled: false },
    { actionId: Actions.SummaryReporting, isViewable: true, isAddable: false, isEditable: false, isDeletabled: false },
    { actionId: Actions.DetailReporting, isViewable: true, isAddable: false, isEditable: false, isDeletabled: false },
    { actionId: Actions.ContextualReporting, isViewable: true, isAddable: false, isEditable: false, isDeletabled: false },
    { actionId: Actions.ScoreReporting, isViewable: true, isAddable: false, isEditable: false, isDeletabled: false },
    { actionId: Actions.EvaluationsInDrafts, isViewable: false, isAddable: true, isEditable: false, isDeletabled: false },
]


export class Configuration {
    constructor(
        public dimensionId: number = 0,
        public isAccessibleTeamsConfiguration: boolean = true,
        public isAccessibleTeamsDashboard: boolean = true,
        public isAccessibleRequestForSpark: boolean = true,
        public isAccessibleRequestForTrigger: boolean = true,
        public isAccessibleSparkAnEmployee: boolean = true,
        public isAccessibleTriggerAnEmployee: boolean = true,
        public isAccessibleEmployeeDashboard: boolean = true,
        public isAccessibleComment: boolean = true,
        public isAccessibleSummaryReporting: boolean = true,
        public isAccessibleDetailReporting: boolean = true,
        public isAccessibleContextualReporting: boolean = true,
        public isAccessibleScoreReporting: boolean = true,
        public isAccessibleEvaluationsInDrafts: boolean = true,
    ) { }
}

export const Configurations: Configuration[] = [
    { dimensionId: Dimension.Role, isAccessibleEvaluationsInDrafts: true, isAccessibleTeamsConfiguration: true, isAccessibleTeamsDashboard: true, isAccessibleRequestForSpark: true, isAccessibleRequestForTrigger: true, isAccessibleSparkAnEmployee: true, isAccessibleTriggerAnEmployee: true, isAccessibleEmployeeDashboard: true, isAccessibleComment: true, isAccessibleSummaryReporting: true, isAccessibleDetailReporting: true, isAccessibleContextualReporting: true, isAccessibleScoreReporting: true },
    { dimensionId: Dimension.Relation, isAccessibleEvaluationsInDrafts: true, isAccessibleTeamsConfiguration: false, isAccessibleTeamsDashboard: false, isAccessibleRequestForSpark: false, isAccessibleRequestForTrigger: false, isAccessibleSparkAnEmployee: true, isAccessibleTriggerAnEmployee: true, isAccessibleEmployeeDashboard: true, isAccessibleComment: true, isAccessibleSummaryReporting: true, isAccessibleDetailReporting: true, isAccessibleContextualReporting: true, isAccessibleScoreReporting: true  },
    { dimensionId: Dimension.Department, isAccessibleEvaluationsInDrafts: true, isAccessibleTeamsConfiguration: false, isAccessibleTeamsDashboard: false, isAccessibleRequestForSpark: false, isAccessibleRequestForTrigger: false, isAccessibleSparkAnEmployee: true, isAccessibleTriggerAnEmployee: true, isAccessibleEmployeeDashboard: true, isAccessibleComment: true, isAccessibleSummaryReporting: true, isAccessibleDetailReporting: true, isAccessibleContextualReporting: true, isAccessibleScoreReporting: true  },
    { dimensionId: Dimension.Team, isAccessibleEvaluationsInDrafts: true, isAccessibleTeamsConfiguration: false, isAccessibleTeamsDashboard: true, isAccessibleRequestForSpark: false, isAccessibleRequestForTrigger: false, isAccessibleSparkAnEmployee: true, isAccessibleTriggerAnEmployee: true, isAccessibleEmployeeDashboard: true, isAccessibleComment: true, isAccessibleSummaryReporting: true, isAccessibleDetailReporting: true, isAccessibleContextualReporting: true, isAccessibleScoreReporting: true  },
    { dimensionId: Dimension.ProtectionLevel, isAccessibleEvaluationsInDrafts: true, isAccessibleTeamsConfiguration: false, isAccessibleTeamsDashboard: false, isAccessibleRequestForSpark: false, isAccessibleRequestForTrigger: false, isAccessibleSparkAnEmployee: true, isAccessibleTriggerAnEmployee: true, isAccessibleEmployeeDashboard: true, isAccessibleComment: false, isAccessibleSummaryReporting: true, isAccessibleDetailReporting: true, isAccessibleContextualReporting: true , isAccessibleScoreReporting: true },
]
