/**
@author : Anjali Tandel
@class : Model 
@description : UserModel created for store login-user-information.
**/
export class UserModel {
    constructor(
        public userId: number = 0,
        public clientId: number = 0,
        public client: string = '',
        public roleId: number = 0,
        public role: string = '',
        public empId: number = 0,
        public employeeId: string = '',
        public managerId: number = 0,
        public departmentId: number = 0,
        public firstName: string = '',
        public lastName: string = '',
        public phoneNumber: number = 0,
        public email: string = '',
        public companyLogoPath: string = '',
        public webThemeMode: number = 0,
        public userProfile: string = '',
        public profileName: string = ''
    ) { }
}


export class CountryCode {
    constructor(
        public countryName?: string,
        public countryCode?: string,
        public flag?: string,
    ) {

    }
}