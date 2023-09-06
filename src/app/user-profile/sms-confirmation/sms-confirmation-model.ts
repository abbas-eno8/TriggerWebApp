/**
 * description :Create enumeration for Sms-confirmaion.
 * @author : Anjali Tandel
 * @class : Enumeration
 */

/** Create ClientModel for data transfer to api */
export class SmsConfirmationModel {
    empId: number = 0
    email: string = ''
    phoneNumber: string = ''
    verificationCode: number = 0
    createdBy: number = 0
    updatedBy: number = 0
}
export class SmsConfirmationInputType {
    id: number = 0
    value: string = ''
    class: string = ''
    isAutoFocus: boolean = false
}
/** Create constant for active class */
export const ActiveClass = 'active';
/** Create constant for completed counter-state */
export const CounterStateCompleted = 'COMPLETE';
/** Create constant for aborted counter-state */
export const CounterStateAborted = 'ABORTED';
/** Create constant for aborted counter-state */
export const ExceededRequestsMessage = "You've exceeded the maximum number of requests.";
/** Create constant for aborted counter-state */
export const EnabledResendLink = "Your verification code has been expired. Please resend again.";