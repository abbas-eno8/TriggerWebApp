/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for change-password.
**/

export enum ChangePasswordModel {
    ChangePasswordHeader = 'Change Password',
    TooltipHeader = 'Change Password:',
    TooltipDescription = 'Passwords are required to have a minimum of 10 characters and a maximum of 15 characters.Passwords must contain at least one upper case letter, one lower case letter, one number, and one special character.',
    EnterCurrentPassword = 'Please enter your Current Password.',
    CurrentPasswordInvalid = ' Password should be minimum 8 characters.',
    EnterNewPassword = 'Enter New Password.',
    NewPasswordLengthInvalid = 'Password must be at least 10 characters.',
    NewPasswordInvalid = 'Password must contain uppercase, lowercase, number and special character.',
    EnterConfirmPassword = 'Enter Confirm New Password.',
    PasswordNotMatch = 'Confirm New Password should be same as New Password.'
}