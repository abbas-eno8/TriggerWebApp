import { Validator } from "../core/magic-string/common.model";

/**
@author : Anjali Tandel
@class : Enumeration 
@description :Create enumeration for contact-us.
**/

/** Create ClientModel for data transfer to api */
export class ContactUsModel {
    fullName: string = ''
    email: string = ''
    subject: string = ''
    comments: string = ''
}

/** Regex pattern for No spcae allow in initial character */
export const IgnoreSpaceInitial = /^[^\s]/;

export const fieldValidator: Validator[] = [
    { id: 1, key: 'subject', value: '', name: 'Subject', isMandatory: true, pattern : IgnoreSpaceInitial },
    { id: 2, key: 'comments', value: '', name: 'Message', isMandatory: true, pattern : IgnoreSpaceInitial },
];
