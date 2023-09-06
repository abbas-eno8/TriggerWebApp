import { Route, HeaderParameter } from "../core/magic-string/common.model";
import { CustomColumn } from "../shared/modals/shared-model";
import { Id } from "../core/magic-string/Regex-pattern";

/**
 * description :Create enumeration for Tooltip header and description.
 * @author : Anjali Tandel
 * @class : Enumeration
 */

/** Create ClientModel for data transfer to api */
export class ClientModel {
    industryTypeId: number
    compId: number
    companyId: string
    companyName: string
    address1: string
    address2: string = ''
    city: string = ''
    state: string = ''
    zipcode: number
    country: string
    phoneNo1: any
    website: string = ''
    remarks: string = ''
    costPerEmp: number = 0
    fixedAmtPerMon: number = 0
    compImgPath: string = ''
    compImage: string = ''
    createdby: number = 0
    updatedby: number = 0
    dealsRemarks: string = ''
    contractStartDate: string
    contractEndDate: string
    gracePeriod: number
    inActivityDays: number = 0
    reminderDays: number = 0
    externalProviderId: number = 0
    externalProviderType: number = 0
    providerClientId: number = 0
    providerTenantId: number = 0
    applicationName: string = ''
    email: string = ''
    webCallBack: string = ''
    isWorkLocationMandatory : boolean = false
    isUpdateSurveyMandatory:  boolean = false
    defaultWorkLocations: WorkLocation[];
    // androidCallBack: string = ''
    // iosCallBack: string = ''
};

export class OrganizationType {
    organizationType: string
    organizationTypeId: number
}

/** Create constant for client search fields, this fields are from API response */
export const SEARCH_FIELDS: any[string] = ['companyId', 'companyName', 'industryType', 'city', 'state', 'zipcode', 'phoneNo1'];
/** Create constant for title of Clients */
export const Clients = 'Client';
/** Create constant for title of new client */
export const NewClient = 'New Client';
/** Create constant for title of Add client */
export const AddClient = 'Add Client';
/** Create constant for title of Edit client */
export const EditClient = 'Edit Client';
/** Create constant for title of Client Profile */
export const ClientProfile = 'Client Profile';
/** Create constant for title of Set as Client Logo */
export const ClientLogo = 'Set as Client Logo';
/** Create constant for title of Set as User Profile */
export const UserProfile = 'Set as User Profile';
/** Create constant for store search place-holder value for search-view component */
export const SearchPlaceHolder = 'Search Clients...';
export const CompanyName = 'companyName'
/** Create constant for store header parameter value for header-view component */
export const Header: HeaderParameter[] = [
    { title: NewClient, icon: 'icon icon-add d-flex align-items-center text-white', redirectTo: Route.AddClient }
]
/** Create constant for normal table column list */
export const ColumnArray = ['companyId', 'companyName', 'industryType', 'city', 'state', 'zipcode', 'phoneNo1', 'action']
/** Create constant for Search item array for normal table search */
export const SearchItemsArray = ['companyId', 'companyName', 'industryType', 'city', 'state', 'zipcode', 'phoneNo1']
/** Create constant for Accordion table column list*/
export const AccordionTableColumnArray = ['companyId', 'companyName', 'action'];
/** Create constant for Accordion table search items */
export const AccordionSearchItemArray = ['companyId', 'companyName'];
/** Create constant for Add-WorkLocation */
export const WorkLocationTitle = 'Work-Location';
/** Create constant for Add-WorkLocation */
export const AddWorkLocation = 'Add Work Location';
/** Create constant for Edit-WorkLocation */
export const EditWorkLocation = 'Edit Work Location';
/** Create constant for Add-WorkLocation */
export const SearchParameter = ['workLocation'];
export const EnterWorkLocation = 'Please Enter Work-Location.'
/** Create ClientModel for data transfer to api */
export class WorkLocation {
    public workLocationId: number
    public workLocation: string
    public createdBy: number
    public updatedBy: number
    constructor(
        workLocationId: number = 0,
        workLocation: string,
        createdBy: number = 0,
        updatedBy: number = 0
    ) {
        this.workLocationId = workLocationId;
        this.workLocation = workLocation;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
    }
};
