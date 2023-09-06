/**
@author : Anjali Tandel
@class : Validator 
@description :Create Permission for store records action-permission.
**/

export class Permission {
    constructor(
        public actionId: number = 0,
        public actions: string = '',
        public actionPermissions: ActionsPermission[],
    ) { }
}

export class ActionsPermission {
    constructor(
        public id: number = 0,
        public actionId: number = 0,
        public actions: string = '',
        public dimensionId: number = 0,
        public dimensionType: string = '',
        public dimensionValueid: number = 0,
        public dimensionValues: string = '',
        public canView: boolean = false,
        public canAdd: boolean = false,
        public canEdit: boolean = false,
        public canDelete: boolean = false,
        public createdBy: number = 0,
        public result: number = 0,
        public managerId: number = 0,
        public departmentDimension: ActionsPermission[],
    ) { }
}