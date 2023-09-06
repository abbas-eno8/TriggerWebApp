/**
 * @author Anjali Tandel
 * @class  GlobalResponseHandlerService
 * This service handles an observable subject which accepts a status code which indicate type of response or error.
 */
import { Injectable } from '@angular/core';
import { BodyOutputType, Toast, ToasterService } from 'angular2-toaster';
import { isUndefined } from 'util';
// ........................................//
import { LoaderService } from '../../core/loader/loader.service';
import { AuthService } from '../../core/auth/auth.service';
import { GlobalEventsManager, partialClientResponse } from '../../core/navbar/globalEventsManager';
import * as CryptoJS from 'crypto-js';
import { ErrorMessage, Encryption, Image } from '../magic-string/common-validation-model';
import { RoleEnum, ApiResponseStatus, True, Error_Title, Error_Type, Success_Type, Success_Title, False, Role, Version, sparkDetailByRoute, SparkDetail } from '../magic-string/common.model';
import { TriggerScore } from '../../assessment/assessment-model';
import { UserModel } from '../model/user';
import { Permission } from '../magic-string/permission.model';
import { CurrentSparkAnEmployee } from '../../employees/employee-model';
import { MatDialog } from '@angular/material/dialog';
// @Pipe({
//     name: 'GlobalResponseHandlerService',
// })
@Injectable()
export class GlobalResponseHandlerService {
    public clientId: number;
    sidebar: boolean;
    isRedirectToDashboardVar: boolean = false;
    constructor(
        private toasterService: ToasterService,
        private loaderService: LoaderService,
        private authService: AuthService,
        private globalEventsManager: GlobalEventsManager,
        private matDialog: MatDialog,
    ) {
        this.globalEventsManager.partialClientResponse.subscribe((partialClientResponse) => {
            this.getUserData();
        })
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date :  18-04-2019
     * Descriotion : Handle resposnse error for all API response
     */
    getApiResponse(response, isDisplaySuccess = true, isLoaderDisplay = true) {
        if (response.status === ApiResponseStatus.Success) {
            if (isLoaderDisplay) {
                this.displayLoader(false);
            }
            if (response.message != 'Ok' && isDisplaySuccess) {
                this.disaplySuccessMessage(response.message);
            }
            return true;
        } else if (response.status === ApiResponseStatus.NonAuthoritativeInformation
            || response.status === ApiResponseStatus.AlreadyReported
            || response.status === ApiResponseStatus.UnAssigned
            || response.status === ApiResponseStatus.Gone) {
            this.displayLoader(false);
            this.disaplyErrorMessage(response.message);
            return false;
        } else if (response.status === ApiResponseStatus.NoContent
            || response.status === ApiResponseStatus.PreconditionFailed
            || response.status === ApiResponseStatus.UpgradeRequired
            || response.status === ApiResponseStatus.NotModified) {
            if (isLoaderDisplay) {
                this.displayLoader(false);
            }
            this.disaplySuccessMessage(response.message);
            return false;
        } else if (response.status === ApiResponseStatus.ContinueInformational || response.status === ApiResponseStatus.NotFound) {
            if (isLoaderDisplay) {
                this.displayLoader(false);
            }
            return false;
        } else if (response.status === ApiResponseStatus.AccessDenied || response.status === ApiResponseStatus.Forbidden) {
            this.disaplySuccessMessage(response.message);
            this.authService.redirectToLogin();
            return false;
        } else if (response.status === ApiResponseStatus.UnauthorizeAccess) {
            this.authService.redirectToLogin();
            return false;
        } else {
            console.log('failed');
            this.displayLoader(false);
            const toast: Toast = {
                type: Error_Type,
                title: Error_Title,
                body: ErrorMessage.InternalServerError,
                bodyOutputType: BodyOutputType.TrustedHtml,
            };
            this.toasterService.pop(toast)
            // this.disaplyErrorMessage(ErrorMessage.InternalServerError);
            return false;
        }
    }

    /**
    * Author : Anjali Tandel
    * Modified-Date :  11-12-2018
    * Descriotion : Throw error message
    */
    toastergetApiResponse(error) {
        this.toasterService.pop(Error_Type, Error_Title, error);
    }
    disaplyErrorMessage(error) {
        this.toasterService.pop(Error_Type, Error_Title, error);
    }

    /**
    * Author : Anjali Tandel
    * Modified-Date :  11-12-2018
    * Descriotion : Throw success message
    */
    disaplySuccessMessage(error) {
        this.toasterService.pop(Success_Type, Success_Title, error);
    }

    /**
    * Author : Anjali Tandel
    * Modified-Date :  11-12-2018
    * Descriotion : Create method for get user data which is saved in session after login response
    */
    getUserData() {
        let user: any;
        let departmentLength: string = '0';
        let countryCallingCode: any;
        if (!!this.decriptData(Encryption.TriggerUserMessage, Encryption.TriggerUserKey)) {
            user = JSON.parse(this.decriptData(Encryption.TriggerUserMessage, Encryption.TriggerUserKey));
        }
        if (!!this.decriptData(Encryption.TriggerDepartmentObjectMessage, Encryption.TriggerDepartmentObjectKey)) {
            departmentLength = JSON.parse(this.decriptData(Encryption.TriggerDepartmentObjectMessage, Encryption.TriggerDepartmentObjectKey));
        }
        if (!!this.decriptData(Encryption.TriggerCountryCallingCodeMessage, Encryption.TriggerCountryCallingCodeKey)) {
            countryCallingCode = JSON.parse(this.decriptData(Encryption.TriggerCountryCallingCodeMessage, Encryption.TriggerCountryCallingCodeKey));
        }
        let userData: any = [];
        if (!isUndefined(user)) {
            userData = {
                'userId': user.data[0].userId,
                'clientId': user.data[0].companyid,
                'clientName': '',
                'userRole': user.data[0].role,
                'roleId': user.data[0].roleId,
                'loginEmpId': user.data[0].empId,
                'sidebar': this.sidebar,
                'departmentLength': parseInt(departmentLength),
                'employee': user.data[0].employee,
                'iconUrl': user.data[0].employee.companyLogoPath,
                'iconUrlName': 'Company logo',
                'isRedirectToDashboard': false,
                'contractStartDate': '',
                'contractEndDate': '',
                'gracePeriod': '',
                'countryCallingCode': countryCallingCode,
                'phoneNumber': user.data[0].employee.phoneNumber,
                'firstName': user.data[0].employee.firstName,
                'lastName': user.data[0].employee.lastName,
                'myDashboardEnabled': user.data[0].myDashboardEnabled,
                'webThemeMode': user.data[0].webThemeMode,
                'isManagerAccess': user.data[0].isManagerAccess
            };
        }
        let clientResponse: any = this.getPartialClientResponse();
        if (!isUndefined(clientResponse) && clientResponse != null) {
            if (clientResponse.partialClientId != null) {
                userData.clientId = clientResponse.partialClientId;
                userData.clientName = clientResponse.partailClientName;
                userData.isRedirectToDashboard = clientResponse.isRedirectToClientDashboard;
                userData.iconUrl = clientResponse.iconUrl;
                userData.contractStartDate = clientResponse.contractStartDate;
                userData.contractEndDate = clientResponse.contractEndDate;
                userData.gracePeriod = clientResponse.gracePeriod;
            }
        }
        let userProfile: any = this.getUserProfile();
        if (!isUndefined(userProfile) && userProfile != null) {
            userData.employee.empImgPath = userProfile;
        }
        if (userData.userRole === RoleEnum.TriggerAdmin && !userData.isRedirectToDashboard) {
            userData.iconUrl = Image.TriggerLogo;
        }
        if (userData.iconUrl === '' || !userData.iconUrl) {
            userData.iconUrl = Image.ClientLogo;
            userData.iconUrlName = 'No logo';
        }
        let PhoneNumber: any = this.getPhoneNumber();
        if (!isUndefined(PhoneNumber) && PhoneNumber != null) {
            userData.employee.phoneNumber = PhoneNumber;
        }
        let userName: any = this.getUserName();
        if (!isUndefined(userName) && userName != null) {
            let userNameObject = JSON.parse(userName)
            userData.employee.firstName = userNameObject.firstName;
            userData.employee.lastName = userNameObject.lastName;
        }
        let themeMode: number = this.getTheme()
        if (!isUndefined(themeMode) && themeMode != null && themeMode > 0) {
            userData.webThemeMode = themeMode
        }
        return userData;
    }
    /**
     * Author : Anjali Tandel
     * Created-Date : 12-08-2019
     * Descriotion : Create method for get user
     */
    getUser(): UserModel {
        let user: UserModel;
        if (!!this.decriptData(Encryption.LoginUserMessage, Encryption.LoginUserKey)) {
            user = JSON.parse(this.decriptData(Encryption.LoginUserMessage, Encryption.LoginUserKey));
        }
        let clientResponse: any = this.getPartialClientResponse();
        if (!isUndefined(clientResponse) && clientResponse != null) {
            if (clientResponse.partialClientId != null) {
                user.clientId = clientResponse.partialClientId;
                user.client = clientResponse.partailClientName;
            }
        }
        return user;
    }
    /**
   * Author : Anjali Tandel
   * Modified-Date :  3-4-2019(Mihir Patel)
   * Descriotion : Get and set client data on client dashboard
   */
    setPartialClientResponse(clientId, clientName, isRedirectToClientDashboard, iconUrl, contractStartDate: string = '', contractEndDate: string = '', gracePeriod: number = 0) {
        let clientResponse: partialClientResponse = {
            partialClientId: clientId,
            partailClientName: clientName,
            isRedirectToClientDashboard: isRedirectToClientDashboard,
            iconUrl: iconUrl,
            contractStartDate: contractStartDate,
            contractEndDate: contractEndDate,
            gracePeriod: gracePeriod
        }
        this.encriptData(JSON.stringify(clientResponse), Encryption.TriggerPartialClientResponseMessage, Encryption.TriggerPartialClientResponseKey)
        this.globalEventsManager.setPartialClientData(clientResponse);
    }
    getPartialClientResponse() {
        let clientResponse: any;
        if (!!this.decriptData(Encryption.TriggerPartialClientResponseMessage, Encryption.TriggerPartialClientResponseKey)) {
            clientResponse = JSON.parse(this.decriptData(Encryption.TriggerPartialClientResponseMessage, Encryption.TriggerPartialClientResponseKey));

        }
        return clientResponse;
    }

    /**
   * Author : Anjali Tandel
   * Modified-Date :  16-01-2019
   * Descriotion : Get and set User-profile
   */
    setUserProfile(profile) {
        this.encriptData(profile, Encryption.TriggerProfilePicMessage, Encryption.TriggerProfilePicKey);
        this.globalEventsManager.changeProfile(profile);
    }
    getUserProfile() {
        let userProfile: any;
        if (!!this.decriptData(Encryption.TriggerProfilePicMessage, Encryption.TriggerProfilePicKey)) {
            userProfile = this.decriptData(Encryption.TriggerProfilePicMessage, Encryption.TriggerProfilePicKey);
        }
        return userProfile;
    }

    setTheme(theme) {
        sessionStorage.setItem('ThemeStatus', JSON.stringify(theme));
        this.globalEventsManager.changeTheme(JSON.stringify(theme));
    }
    getTheme() {
        let theme: string;
        if (!!sessionStorage.getItem('ThemeStatus')) {
            theme = sessionStorage.getItem('ThemeStatus')
        }
        return parseInt(theme);
    }

    setUserName(firstName, lastName) {
        let userNameObj = {
            firstName: firstName,
            lastName: lastName
        }
        this.encriptData(JSON.stringify(userNameObj), Encryption.TriggerUserName, Encryption.UserName);
        this.globalEventsManager.changeUserName(userNameObj);
    }
    getUserName() {
        let userName: any;
        if (!!this.decriptData(Encryption.TriggerUserName, Encryption.UserName)) {
            userName = this.decriptData(Encryption.TriggerUserName, Encryption.UserName);
        }
        return userName;
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date :  23-05-2019
     * Descriotion : Set and get Phone-number
     */
    setPhoneNumber(number) {
        this.encriptData(number, Encryption.TriggerPhoneNumber, Encryption.TriggerPhoneNumberKey);
    }
    getPhoneNumber() {
        let phoneNumber: any;
        if (!!this.decriptData(Encryption.TriggerPhoneNumber, Encryption.TriggerPhoneNumberKey)) {
            phoneNumber = this.decriptData(Encryption.TriggerPhoneNumber, Encryption.TriggerPhoneNumberKey);
        }
        return phoneNumber;
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date :  23-05-2019
     * Descriotion : Set and get Phone-number
     */
    setSparkAnEmployee(spark: CurrentSparkAnEmployee) {
        this.encriptData(JSON.stringify(spark), Encryption.SparkAnEmployeeMessage, Encryption.SparkAnEmployeeKey);
    }
    getSparkAnEmployee() {
        let spark: CurrentSparkAnEmployee;
        if (!!this.decriptData(Encryption.SparkAnEmployeeMessage, Encryption.SparkAnEmployeeKey)) {
            spark = JSON.parse(this.decriptData(Encryption.SparkAnEmployeeMessage, Encryption.SparkAnEmployeeKey));
        }
        return spark;
    }

    getCountryCallingCode() {
        let countryCallingCode: any;
        if (!!this.decriptData(Encryption.TriggerCountryCallingCodeMessage, Encryption.TriggerCountryCallingCodeKey)) {
            countryCallingCode = this.decriptData(Encryption.TriggerCountryCallingCodeMessage, Encryption.TriggerCountryCallingCodeKey);
        }
        return countryCallingCode;
    }
    /**
     * Author : Sonal Patil
     * Modified-Date :  11-12-2018
     * Modified-by : Anjali Tandel
     * Descriotion : Get details of current-trigger-score
     */
    public getCurrentTriggerScore(): TriggerScore {
        let triggerScore: TriggerScore;
        if (!!this.decriptData(Encryption.TriggerScoreMessage, Encryption.TriggerScoreKey)) {
            triggerScore = JSON.parse(this.decriptData(Encryption.TriggerScoreMessage, Encryption.TriggerScoreKey));
        }
        return triggerScore;
    }
    /**
    * Author : Anjali Tandel
    * Modified-Date :  11-12-2018
    * Descriotion : Create method for sidebar
    */
    isSideBar() {
        let test = this.decriptData(Encryption.TriggerSidebarMessage, Encryption.TriggerSidebarKey);
        if (test === True) {
            this.sidebar = true;
        } else {
            this.sidebar = false;
        }
        return this.sidebar;
    }

    getClientId() {
        return this.clientId;
    }

    getVersion() {
        let version: string;
        if (!!this.decriptData(Encryption.Version, Encryption.VersionKey)) {
            version = this.decriptData(Encryption.Version, Encryption.VersionKey);
            this.encriptData(null, Encryption.Version, Encryption.VersionKey)
        } else {
            version = Version.Version1;
        }
        return version;
    }

    /** 
     @author : Sonal Patil
     @method : displayLoader
     @description : displayLoader method is created as shared method for displaying loader. 
   **/
    displayLoader(value) {
        this.loaderService.emitIsLoaderShown(value);
    }
    /** 
     @author : Sonal Patil
     @method : encriptData
     @description : encriptData method is created as shared method for data encryption. 
   **/
    encriptData(myData, myPassword, key) {
        var encrypted: any = CryptoJS.AES.encrypt(myData, myPassword);
        sessionStorage.setItem(key, encrypted);
    }
    /** 
     @author : Sonal Patil
     @method : decriptData
     @description : decriptData method is created as shared method for data decryption. 
   **/
    decriptData(myPassword, key) {
        var sessioData = sessionStorage.getItem(key);
        if (sessioData === null) {
            return null
        }
        else {
            var decrypted = CryptoJS.AES.decrypt(sessioData, myPassword);
            var real = decrypted.toString(CryptoJS.enc.Utf8);
            return real;
        }
    }

    public getActionPermission(): Permission[] {
        let actionPermission: Permission[];
        if (!!this.decriptData(Encryption.ActionPermissionMessage, Encryption.ActionPermissionKey)) {
            actionPermission = JSON.parse(this.decriptData(Encryption.ActionPermissionMessage, Encryption.ActionPermissionKey));
        }
        return actionPermission;
    }

    public closeMaterialPopup(): void {
        this.matDialog.closeAll();
    }
    public setSparkDetailBySparkList(data) {
        let sparkDetail: sparkDetailByRoute;
        sparkDetail = {
            widgetHeader: 'Sparks for',
            tooltipId: 0,
            routeType: 'sparkList',
            empId: data.empId,
            dashboardTypeId: 3,
            isRedirectFromNotification: true
        }
        sessionStorage.setItem(SparkDetail, JSON.stringify(sparkDetail));
    }
}
