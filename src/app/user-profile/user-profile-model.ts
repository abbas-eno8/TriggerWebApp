/** Create ClientModel for data transfer to api */
export class UserProfileModel {
    empId: number = 0
    employeeId: number = 0
    phoneNumber: string = ''
    updatedBy: number = 0
    workCity: string = ''
    workState: string = ''
    workZipcode: number = 0
    inTime: string = ''
    outTime: string = ''
};

/** Create ContactNumber for calling-code and phone-number */
export class ContactNumber {
    callingCode: string = '+1'
    phoneNumber: string = ''
};

/** Create SmsNotificationModel for data transfer to API */
export class SmsNotificationModel {
    empId: number = 0
    optForSms: boolean = false
    updatedBy: number = 0
};


// Create UserProfile class for bind user profile data : 
export class UserProfile {
    constructor(
        public firstName: string = '',
        public lastName: string = '',
        public phoneNumber: string = '',
        public employeeId: number = 0,
        public empId: number = 0,
        public workCity: string = '',
        public workState: string = '',
        public workZipcode: string = '',
        public phoneConfirmed: boolean = false,
        public optForSms: boolean = false,
        public empImgPath: string = '',
        public themeStatus: boolean,
        public callingCode?: string,
        public inTime: string = '',
        public outTime: string = ''
    ) { }
}

export class ThemeModel {
    WebThemeMode: number = 0
};
// Export constant for define value text of Verified button 
export const Verified = 'Verified'
//  Export constant for define value text of Verify button 
export const Verify = 'Verify'