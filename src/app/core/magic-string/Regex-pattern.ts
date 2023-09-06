/** Regex pattern for No spcae allow in initial character */
export const IgnoreSpaceInitial = /^[^\s]/;
/** Regex pattern for Alphabatic */
export const AlphabaticPattern = /^[a-zA-Z ]*$/;
/** Regex pattern for Numeric */
export const NumericPattern = /^((?!(0))[0-9]{1,3})$/
export const AlphabaticNumeric = /(^[a-zA-Z0-9\s]{1,50})$/
/** Regex pattern for email
 * oldExample:- sample123@hotmail.co.us
 * newExample:- anjali@triggertransformation.onmicrosoft.com
 */
// export const EmailAddress = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3}){1,2})$/ 
export const EmailAddress = /^[a-zA-Z0-9.'!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\.[a-zA-Z0-9-]+)*$/
export const Id = /^$|^[A-Za-z0-9]+/
export const Name = /^[a-zA-Z\'-]+$/i
export const AlphabaticWithSpace = /^[a-zA-Z ]*$/;
export const PhoneNumber = /^((?!(0))[0-9]{7,15})$/;
export const CurrentSalary = /^((?!(0))[0-9]{1,7})$/;
export const NumberOnly = /[0-9]/
export const ContactNumber = /[0-9+]/
export const ZipCodeValidation = /^[0-9-]*$/ // /^[a-zA-Z0-9]*$/
