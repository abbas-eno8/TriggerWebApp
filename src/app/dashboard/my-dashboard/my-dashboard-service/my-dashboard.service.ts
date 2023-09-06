import { Injectable } from '@angular/core';
import { CskOverlayPanel, CommonCssClass, MainDiv, Actions, Error_Type, Error_Title, Route } from '../../../core/magic-string/common.model';
import { SortByFieldService } from '../../../shared/services/sort-by-field/sort-by-field.service';
import { CreateRequest } from '../../dashboard-model';
import { Subject ,  Observable } from 'rxjs';
import { Sort } from '../../../shared/services/sort-by-field/sort';
import { DashboardService } from '../../dashboard-service/dashboard.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { ActionPermissionService, canAdd, canView, canEdit, canDelete } from '../../../core/services/action-permission/action-permission.service';
import { ToasterService } from 'angular2-toaster';
import { ErrorMessage, Encryption } from '../../../core/magic-string/common-validation-model';
import { LoaderService } from '../../../core/loader/loader.service';
import { UrlEncryptionDecryptionService } from '../../../core/url-encryption-decryption/url-encryption-decryption.service';
import { CurrentSparkAnEmployee } from '../../../employees/employee-model';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';

@Injectable()
export class MyDashboardService {
  public sortModel: Sort<any[]>;
  private bindRecords: Subject<any[]> = new Subject();
  bindRecords$: Observable<any[]> = this.bindRecords.asObservable();
  public requestList: any;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(public sortByFieldService: SortByFieldService,
    private dashboardService: DashboardService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private actionPermissionService: ActionPermissionService,
    private toasterService: ToasterService,
    private loaderService: LoaderService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private globalEventsManager: GlobalEventsManager) {
      this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
        if (status) {
          this.isDarkTheme = true;
          } else {
          this.isDarkTheme = false;
        }
      })
     }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Created event for scroll top automatically.
   */
  public scrollTop(): void {
    const mainDiv = document.getElementById(MainDiv);
    if (mainDiv) { mainDiv.scrollTop = 0; }
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Bind data-source.
   */
  public onClickPaginationPanel(): void {
    let dropdownClassName = this.isDarkTheme ? 'material-pagination-dropdown-dark' : 'material-pagination-dropdown-white' 
    var parentElement = document.getElementsByClassName('mat-select-panel mat-primary')[0];
    if (parentElement) { parentElement.classList.add(dropdownClassName) };
  }
  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Sort lists based on passing list & sorted-field & return sorted list.
   */
  public sort(property: string, requestList) {
    this.sortModel.sortedPropety = property;
    this.sortModel.list = requestList;
    this.sortModel = this.sortByFieldService.sort(this.sortModel);
    return this.sortModel.list;
  }


  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Get sorted direction icon.
   */
  public getDirecionIcon(property: string): string {
    return this.sortByFieldService.getDirecionIcon(property, this.requestList);
  }

  public filterRecords(request: CreateRequest[]): void {
    this.bindRecords.next(request);
  }

  checkActionAndRedirectOnPage(actionObj) {
    this.loaderService.emitIsLoaderShown(true);
    this.dashboardService.getActionRequestDetail(parseInt(actionObj.id), actionObj.empId, actionObj.actionId, this.globalResponseHandlerService.getUserData().loginEmpId).subscribe((actionResponse: any) => {
      if (this.globalResponseHandlerService.getApiResponse(actionResponse, false)) {
        // sessionStorage.setItem('requestId',actionObj.id); 
        sessionStorage.setItem(Encryption.RequestId, actionObj.id);
        let actionResponseObj = actionResponse.data;
        let empDetail = {
          empId: actionResponseObj.empId,
          employeeId: actionResponseObj.employeeId,
          departmentId: actionResponseObj.departmentId,
          firstName: actionResponseObj.firstName,
          lastName: actionResponseObj.lastName,
          sendSpark: actionResponseObj.sendSpark,
          sendTrigger: actionResponseObj.sendTrigger,
          managerId: actionResponseObj.managerId,
          empRelation: actionResponseObj.empRelation,
          teamType: actionResponseObj.teamType,
          result: actionResponseObj.result,
          empStatus: true,
          protectionLevel:  actionResponseObj.protectionLevel
        };
        if (actionObj.actionId === 1) {
          let isTriggerAnEmployee = this.actionPermissionService.isAddTriggerAnEmployee(Actions.TriggerAnEmployee, canAdd, empDetail);
          if (isTriggerAnEmployee) {
            this.urlEncryptionDecryptionService.urlEncryption(actionResponseObj.empId.toString(), Route.TriggerEmployee);
          } else {
            this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.PermissionChanged);
          }
        } else {
          let isSparkAnEmployeeAdd = this.actionPermissionService.checkSparkPermission(canAdd, empDetail);
          if (isSparkAnEmployeeAdd) {
            const sparkAnEmployee: CurrentSparkAnEmployee = new CurrentSparkAnEmployee(
              this.globalResponseHandlerService.getUserData().userId,
              empDetail.empId,
              empDetail.firstName,
              empDetail.lastName,
              this.actionPermissionService.checkSparkPermission(canView, empDetail),
              this.actionPermissionService.checkSparkPermission(canAdd, empDetail),
              this.actionPermissionService.checkSparkPermission(canEdit, empDetail),
              this.actionPermissionService.checkSparkPermission(canDelete, empDetail),
              empDetail.sendSpark
            );
            this.globalResponseHandlerService.setSparkDetailBySparkList(empDetail);
            this.globalResponseHandlerService.setSparkAnEmployee(sparkAnEmployee);
            this.urlEncryptionDecryptionService.urlEncryption(empDetail.empId.toString(), Route.SparkAnEmployee);
          } else {
            this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.PermissionChanged);
          }
        }
      }
    })
  }

  getGraphCategories() {
    let myArray = [ 
      { 
         "lstWeekly":[ 
            { 
               "empid":1271,
               "weekNo":"Week52-2019",
               "weekScore":12,
               "weekScoreRank":"C-"
            }
         ],
         "lstMonthly":[ 
            { 
               "empid":1271,
               "monthNo":"Dec-2019",
               "monthScore":12,
               "monthScoreRank":"C-"
            }
         ],
         "lstYearly":[ 
            { 
               "empid":1271,
               "yearNo":"Year: 2019",
               "yearScore":12,
               "yearScoreRank":"C-"
            }
         ]
      }
   ]
    return myArray
  }
}



export interface ActionRequestResponse {
  empId: number
  employeeId: string
  departmentId: number
  firstName: string
  lastName: string
  sendSpark: boolean
  sendTrigger: boolean
  managerId: number
  empRelation: number
  teamType: number
  result: number
  empStatus: boolean
}