/**
@author : Mihir Patel
@class : TopBarComponent
@description :TopBarComponent is created for top bar.
**/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// ----------------------------------------------- //
import { GlobalEventsManager } from '../globalEventsManager';
import { AuthService } from '../../../core/auth/auth.service';
import { GlobalResponseHandlerService } from '../../global-response-handler/global-response-handler';
import { True, Null, NextRoute, Role, Route } from '../../magic-string/common.model';
import { Encryption, Session } from '../../magic-string/common-validation-model';
import { NotificationService } from '../notification/notification.service/notification.service';
import { ThemeService } from '../../theme/theme.service';
@Component({
  selector: 'trigger-top-bar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

export class TopBarComponent implements OnInit {
  public totalCount: number;
  public isNotificationViewCreated: boolean;
  public clientResponse = {
    'clientId': 0,
    'clientName': '',
    'loginEmpId': 0,
    'userRole': '',
    'firstName': '',
    'lastName': '',
    'profilePic': '',
    'profileName': '',
    'isRedirectToClientDashboard': false,
    'isSrcValid': false
  }

  constructor(
    private router: Router,
    private globalEventsManager: GlobalEventsManager,
    private notificationService: NotificationService,
    private authService: AuthService,
    private globalResponseHandlerService: GlobalResponseHandlerService
  ) {
    /**
    * SUBSCRIBE TO GET NEW USER PROFILE
    */
    this.globalEventsManager.currentImage.subscribe((image) => {
      this.getUserData();
    })

    this.globalEventsManager.currentUserName.subscribe((name) => {
      this.getUserData();
    })

    // Create event for get partial client data
    this.globalEventsManager.partialClientResponse.subscribe((partialClientResponse) => {
      this.getUserData();
    })

  }

  ngOnInit() {
    this.globalEventsManager.getNotification(true);
    this.getUserData();
  }


  /**
  * Author : Sonal Patil
  * Modified-Date :  18-12-2018
  * Description : Check user loggedIn & get userdata
  */
  getUserData() {
    this.authService.isLoggedInObs().subscribe(response => {
      if (response) {
        let userData = this.globalResponseHandlerService.getUserData();
        this.clientResponse.isRedirectToClientDashboard = userData.isRedirectToDashboard;
        this.clientResponse.clientName = userData.clientName;
        let userDetail = userData.employee;
        this.clientResponse.userRole = userData.userRole;
        this.clientResponse.firstName = userDetail.firstName;
        this.clientResponse.lastName = userDetail.lastName;
        this.clientResponse.profilePic = userData.employee.empImgPath;
        this.clientResponse.profileName = userDetail.firstName.charAt(0).toUpperCase() + userDetail.lastName.charAt(0).toUpperCase();
        this.clientResponse.isSrcValid = false;
        if (userData.roleId !== Role.TriggerAdmin) {
          this.isNotificationViewCreated = true;
        }
      }
    })
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  18-12-2018
  * Description : Create function for logout from current client dashboard.
  */
  logoutFormDashboard() {
    this.globalResponseHandlerService.encriptData(null, Encryption.TriggerPartialClientResponseMessage, Encryption.TriggerPartialClientResponseKey)
    this.globalResponseHandlerService.setPartialClientResponse(null, null, false, '')
    this.globalResponseHandlerService.encriptData('null', Encryption.TriggerSelectDepartmentMessage, Encryption.TriggerSelectDepartmentKey)
    this.globalResponseHandlerService.encriptData(null, Encryption.TriggerSelectYearMessage, Encryption.TriggerSelectYearKey);

    this.router.navigate([Route.Client]);
  }
  public onError() {
    this.clientResponse.isSrcValid = true;
  }

  logout() {
    this.globalEventsManager.showNavBar(false);
    this.authService.startSignoutMainWindowGoToHomeScreen();
  }

  /**
  * Author : Mihir Patel
  * Modified-Date :  26-12-2018
  * Description : Create function for change route to change password and sidebar position get slide-in if current state is slide-out.
  */
  changePassword() {
    sessionStorage.setItem(NextRoute, Route.ChangePassword)
    this.router.navigate([Route.ChangePassword]);
  }

  goToUserProfile() {
    sessionStorage.setItem(NextRoute, Route.UserProfile)
    this.router.navigate([Route.UserProfile]);
  }

  redirectToContactUs() {
    sessionStorage.setItem(NextRoute, Route.ContactUs)
    this.router.navigate([Route.ContactUs]);
  }

}
