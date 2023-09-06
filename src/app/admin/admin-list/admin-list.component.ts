/**
@author : Anjali Tandel
@class : AdminComponent
@description :AdminComponent is created for admin list page.
**/
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'underscore';
import { ToasterService } from 'angular2-toaster';
import { Header, CompanyAdmin } from '../admin-model';
import { LoaderService } from '../../core/loader/loader.service';
import { ClientService } from '../../clients/client-service/client.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { CustomValidation } from '../../shared/Validation/custom.validation';
import { Default_Search_Value, Route } from '../../core/magic-string/common.model';
import { ErrorMessage } from '../../core/magic-string/common-validation-model';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { EmployeeService } from '../../core/services/employee-service/employee.service';
import { CommonService } from '../../core/services/common/common.service';

@Component({
  selector: 'trigger-admin-list',
  templateUrl: './admin-list.component.html'
})
export class AdminListComponent implements OnInit {
  public employeeId: string;
  public filteredData: any;
  public user: any;
  public searchText: string;
  // public totalItems: any;
  public selectedClient: any;
  public clientData: any;
  /** isDisplayRecordsNotFound boolean variable created for display NoRecordsFoundComponent while no admins found */
  public isDisplayRecordsNotFound: boolean;
  /** HeaderViewParameter stored header parameter which are used in child-header-view-component  */
  public HeaderViewParameter = Header;
  public pageTitle: string;

  // public currentPage: number;
  // public itemsPerPage: any;
  public isArrayValue: boolean;
  public employeeArray: any = [];
  public filteredDataWithClient: any=[];
  public selectedClientId: number;
  public isApiCalled: boolean;
  public isAccordianTable: boolean;
  public isAccordion: boolean = false;
  constructor(
    private commonService: CommonService,
    private employeeService: EmployeeService,
    private loaderService: LoaderService,
    private clientService: ClientService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    public matDialog: MatDialog,
    private customValidation: CustomValidation,
    private toasterService: ToasterService,
    public breakpointObserver: BreakpointObserver
  ) {
    this.isDisplayRecordsNotFound = false;
    this.isArrayValue = false;
    this.isApiCalled = false;    
    this.filteredData = [];
    this.loaderService.emitIsLoaderShown(true);
    this.pageTitle = CompanyAdmin;
    // this.currentPage = 1;
    // this.itemsPerPage = 50;
  }
  ngOnInit() {
    this.GetUser();    
    // Calling media matcher method for get screen resolution
    this.breakpointObserver
      .observe(['(min-width: 1250px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isAccordianTable = false;
          if (this.filteredData.length > 0) {
            this.callNormalTable();
          }
        } else {
          this.isAccordianTable = true;
          if (this.filteredData.length > 0) {
            this.callAccordionTable();
          }
        }
      });
  }

  callNormalTable() {
    this.isAccordion = false;
    if (this.filteredDataWithClient.length > 0) {
      this.filteredData = this.filteredDataWithClient;
    }
  }

  // For accordion table calling : 
  callAccordionTable() {
    this.isAccordion = true;
    if (this.filteredDataWithClient.length > 0) {
      this.filteredData = this.filteredDataWithClient;
    }
  }
  /**
  * Author : Sonal Patil
  * Modified-Date :  19-12-2018
  * Description : For get session data and initialize variable
  */
  GetUser() {
    this.selectedClient = 0;
    this.user = this.globalResponseHandlerService.getUserData();
    this.getAllClient();
  }

  /**
  * Author : Sonal Patil
  * Modified-Date :  19-12-2018
  * Description : For get all clients list &  all employee list for client wise filtering
  */
  getAllClient() {
    this.clientService.getAllClient().subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          this.clientData = response.data;
          this.clientData = _.sortBy(this.clientData, 'companyName');
          this.getAdmin(this.user.clientId);
        }
      }
    );
  }

 
  clientDropdownFilter(selectedValue: string): void {
    this.selectedClientId = parseInt(selectedValue);
    this.filteredDataWithClient = [];
    if (this.selectedClientId === 0) {
      this.filteredData = this.employeeArray;
    } else {
      this.filteredDataWithClient = this.employeeArray.filter(x => x.companyId === this.selectedClientId)
      this.filteredData = this.filteredDataWithClient;
    }
  }

  // Ignore space when pasting the code
  public IgnoreSpace($event: any) {
    this.customValidation.IgnoreSpace(event);
  }

  blankArrayAndMessageOnwrongSearch() {
    this.filteredData = [];
    this.toasterService.pop('success', 'Success', ErrorMessage.NoRecordsFound);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  21-12-2018
  * Description : goToAddEmployee function is created for navigate url from employee to addEmployee.
  */
  // goToAddEmployee(employeeId) {
  //   this.urlEncryptionDecryptionService.urlEncryption(employeeId.toString(), Route.AddAdmin);
  // }

  goToEditEmployee(object) {
    this.globalResponseHandlerService.setPartialClientResponse(object.clientId, '', false, '')
    this.urlEncryptionDecryptionService.urlEncryption(object.employeeId.toString(), Route.EditAdmin);
  }
  /**
  * Author : Anjali Tandel
  * Modified-Date :  21-12-2018
  * Description : For get all employee list.
  */
  getAdmin(clientId) {
    this.isArrayValue = false;
    this.filteredData = [];
    let managerId: string;
    managerId = '0';
    clientId = '0';
    this.employeeService.getAllAdmins(clientId, managerId, this.selectedClient).subscribe(
      (response) => {
        this.isApiCalled = true;   
        if (this.globalResponseHandlerService.getApiResponse(response, false, true)) {
          if (response) {         
            this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(response.data, this.isDisplayRecordsNotFound);
            this.isArrayValue = true;
            this.filteredData = response.data;
            this.employeeArray = response.data;
            this.filteredData.forEach(element => {
              element.email = element.email.charAt(0).toLowerCase() + element.email.slice(1)
            })
            this.filteredData = _.sortBy(this.filteredData, 'companyName');
            if(this.selectedClientId > 0){
              this.filteredDataWithClient = response.data.filter(item => item.companyid === this.selectedClientId);
            }
            if (this.isAccordianTable) {
              this.callAccordionTable();
            } else {
              this.callNormalTable();
            }
          }          
        }
        // else {
        //   this.isDisplayRecordsNotFound = true;
        //   // this.totalItems = 0;
        // }
        // this.loaderService.emitIsLoaderShown(false);
      }
    );
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  21-12-2018
  * Description : For delete employee.
  */
  deleteAdmin(empId: number, clientId: number, dialogRef) {
    this.loaderService.emitIsLoaderShown(true);
    this.commonService.deleteEmployeeById(clientId, empId, this.user.userId).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, true, false)) {
          // this.searchEmployee(null);
          this.getAdmin(clientId);
          dialogRef.close();
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  08-04-2019
   * Description : Event for delete admin which is called by child-component.
   */
  public deleteAdminEvent(admin: any): void {
    this.deleteAdmin(admin.empId, admin.clientId, admin.dialogRef);
  }
}
