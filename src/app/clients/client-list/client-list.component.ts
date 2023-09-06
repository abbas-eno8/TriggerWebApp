/**
 * @author : Anjali Tandel
 * @class : ClientListComponent
 * @description :ClientListComponent is created for disaply client list.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'underscore';
//  ................................................ //
import { ClientModel, SEARCH_FIELDS, Header, Clients, SearchPlaceHolder, CompanyName } from '../client-model';
import { DeletePopupComponent } from '../../shared/modal-popup/delete-popup/delete-popup.component';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { LoaderService } from '../../core/loader/loader.service';
import { Route, DesktopWidth } from '../../core/magic-string/common.model';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { SearchViewComponent } from '../../shared/search-view/search-view.component';
import { ClientService } from './../client-service/client.service';
import { CustomValidation } from '../../shared/Validation/custom.validation';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'trigger-client-list',
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
  @ViewChild(SearchViewComponent, {static: false}) searchViewComponent: SearchViewComponent;
  /** user created for store login user's detail */
  public user: any;
  /** clients created for store clients's detail */
  public clients: ClientModel[];
  /** searchFields is created for fields which we used in search functionality */
  public searchFields = SEARCH_FIELDS;
  /** isDisplayRecordsNotFound boolean variable created for display NoRecordsFoundComponent while no clients found */
  public isDisplayRecordsNotFound: boolean;
  /** searchPlaceHolder stored static place-holder value for search input */
  public searchPlaceHolder: string;
  /** HeaderViewParameter stored header parameter which are used in child-header-view-component  */
  public HeaderViewParameter = Header;
  public pageTitle: string;
  public isArrayValue: boolean;
  public isAccordianTable: boolean;
  public isAccordion: boolean = false;
  public isApiCalled: boolean;
  constructor(
    private clientService: ClientService,
    private loaderService: LoaderService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    public matDialog: MatDialog,
    private customValidation: CustomValidation,
    public breakpointObserver: BreakpointObserver,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private router: Router
  ) {
    this.loaderService.emitIsLoaderShown(true);
    this.isApiCalled = false;
    this.isArrayValue = false;
    this.pageTitle = Clients;
    this.searchPlaceHolder = SearchPlaceHolder;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  19-03-2019
   * Description : get the user-details and called API for get all clients list
   */
  ngOnInit(): void {
    this.user = this.globalResponseHandlerService.getUserData();
    this.getAllClient();
    this.breakpointObserver
      .observe([DesktopWidth])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isAccordianTable = false;
          if (this.clients && this.clients.length > 0) {
            this.callNormalTable();
          }
        } else {
          this.isAccordianTable = true;
          if (this.clients && this.clients.length > 0) {
            this.callAccordionTable();
          }
        }
      });
  }

  callNormalTable() {
    this.isAccordion = false;
    if (this.clients.length > 0) {
      this.clients = this.clients;
    }
  }

  // For accordion table calling : 
  callAccordionTable() {
    this.isAccordion = true;
    if (this.clients.length > 0) {
      this.clients = this.clients;
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : Get all client list and bind clients in html
   */
  public getAllClient(): void {
    this.isArrayValue = false;
    this.clientService.getAllClient().subscribe(
      (response) => {
        this.isApiCalled = true;
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          if (response) {
            this.isDisplayRecordsNotFound = this.customValidation.isDisplayRecordsNotFoundPage(response.data, this.isDisplayRecordsNotFound);
            this.isArrayValue = true;
            this.clients = _.sortBy(response.data, CompanyName);
            this.clients.forEach(element => {
              element.phoneNo1 = element.phoneNo1 + '';
            });
            if (this.isAccordianTable) {
              this.callAccordionTable();
            } else {
              this.callNormalTable();
            }
          }
        }

      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  16-03-2019
   * Descriotion : API for delete selected client.
   */
  public deleteClient(clientId: number, dialogRef: MatDialogRef<DeletePopupComponent>): void {
    this.loaderService.emitIsLoaderShown(true);
    this.clientService.deleteClientById(clientId).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, true, false)) {
          this.searchViewComponent.searchText = '';
          this.getAllClient();
          dialogRef.close();
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  08-04-2019
   * Description : Event for delete client which is called by child-component.
   */
  public deleteClientEvent(client: any): void {
    this.deleteClient(client.clientId, client.dialogRef);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : Create function for redirect to edit-client
   */
  public goToEditClient(clientId: number): void {
    this.user.clientId = clientId;
    this.redirectToAddClient(clientId);
  }

  public goToDashboard(client): void {
    this.globalResponseHandlerService.setPartialClientResponse(client.clientId, client.clientName, true, client.iconUrl, client.contractStartDate, client.contractEndDate, client.gracePeriod)
    this.router.navigate([Route.Dashboard]);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : Page redirect to add-edit client
   */
  public redirectToAddClient(clientId: number): void {
    this.urlEncryptionDecryptionService.urlEncryption(clientId.toString(), Route.EditClient);
    this.globalResponseHandlerService.setPartialClientResponse(clientId, '', false, '')
  }

}
