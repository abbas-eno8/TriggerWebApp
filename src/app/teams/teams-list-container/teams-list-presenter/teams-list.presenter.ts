/**
@author : Anjali Tandel
@class : TeamsListPresenter
@description : TeamsListPresenter is created for perform UI & bussiness logic of teams-list module.
**/
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { Sort } from '../../../shared/services/sort-by-field/sort';
import { SortByFieldService } from '../../../shared/services/sort-by-field/sort-by-field.service';
import { UrlEncryptionDecryptionService } from '../../../core/url-encryption-decryption/url-encryption-decryption.service';
import { Route, MainDiv, CskOverlayPanel, CommonCssClass, Relation, Actions, Role } from '../../../core/magic-string/common.model';
import { DeletePopupComponent } from '../../../shared/modal-popup/delete-popup/delete-popup.component';
import { MatDialog } from '@angular/material';
import { Subject ,  Observable } from 'rxjs';
import { Team, ResponseModel } from '../../teams-model';
import { ActionPermissionService, canEdit, canDelete } from '../../../core/services/action-permission/action-permission.service';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';

@Injectable()
export class TeamsListPresenter {
  /** This property-model is used for sorting team-list.  */
  public sortModel: Sort<ResponseModel[]>;
  /** This property is used for emit when delete-team.  */
  private delete: Subject<number> = new Subject();
  delete$: Observable<number> = this.delete.asObservable();
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(
    private actionPermissionService: ActionPermissionService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private matDialog: MatDialog,
    private resolver: ComponentFactoryResolver,
    public sortByFieldService: SortByFieldService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private globalEventsManager: GlobalEventsManager,
  ) {
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
   * Description : Gllobal check response handler & throw Error/Success message.
   */
  public checkResponse(response: any): any[] {
    this.sortModel = new Sort<any[]>(1, '', '', []);
    if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
      return response.data;
    }
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Check actions based on permission and logged in empId.
   */
  public checkActions(teams: ResponseModel[]): ResponseModel[] {
    let empId: string = this.globalResponseHandlerService.getUser().empId + '';
    teams.forEach((team) => {
      let isContainsId: boolean = team.managerIds ? team.managerIds.includes(empId) : false;
      team.isEditable = this.isAccesibleTeams() || (isContainsId && this.checkTeamsPermission(canEdit))
        ? true : false;
      team.isDeletable = this.isAccesibleTeams() || (isContainsId && this.checkTeamsPermission(canDelete))
        ? true : false;
    });
    return teams;
  }

  public isAccesibleTeams(): boolean {
    let roleId: number = this.globalResponseHandlerService.getUser().roleId;
    if (roleId === Role.Admin || roleId === Role.TriggerAdmin) {
      return true;
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Create list view dynmically (Desktop-view/Accrordian).
   */
  public createListViewPage(list, componentRef, entry, component): any {
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.instance.teams = list;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Create No-records found view dynmically.
   */
  public createNoRecordsFoundPage(componentRef, entry, component): any {
    let factory = this.resolver.resolveComponentFactory(component);
    componentRef = entry.createComponent(factory);
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Check actions based on configured team-permissions .
   */
  public checkTeamsPermission(permission: string): boolean {
    return this.actionPermissionService.checkRoleBasedPermission(Actions.TeamConfiguraton, permission);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Created event for scroll top automatically.
   */
  public scrollTop(): void {
    const mainDiv = document.getElementById(MainDiv);
    if (mainDiv) { mainDiv.scrollTop = 0; }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Bind data-source.
   */ 
  // public onClickPaginationPanel(): void {
  //   var parentElement = document.getElementsByClassName(CskOverlayPanel)[0];
  //   if (parentElement) { parentElement.classList.add(CommonCssClass.PaginationDropdownPosition) };
  // }

  public onClickPaginationPanel(): void {
    let dropdownClassName = this.isDarkTheme ? 'material-pagination-dropdown-dark' : 'material-pagination-dropdown-white' 
    var parentElement = document.getElementsByClassName('mat-select-panel mat-primary')[0];
    if (parentElement) { parentElement.classList.add(dropdownClassName) };
  }
  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Sort lists based on passing list & sorted-field & return sorted list.
   */
  public sort(property: string, teams: ResponseModel[]): any[] {
    this.sortModel.sortedPropety = property;
    this.sortModel.list = teams;
    this.sortModel = this.sortByFieldService.sort(this.sortModel);
    return this.sortModel.list;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Get sorted direction icon.
   */
  public getDirecionIcon(property: string): string {
    return this.sortByFieldService.getDirecionIcon(property, this.sortModel);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Redirect to edit-team route.
   */
  public editTeam(teamId: number): void {
    this.urlEncryptionDecryptionService.urlEncryption(teamId + '', Route.EditTeam);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Open delete-modal-popup window.
   */
  public deleteTeam(teamId: number): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
       data: Team
       });
    dialogRef.componentInstance.confirm.subscribe((isConfirm) => {
      if (isConfirm) {
        this.globalResponseHandlerService.displayLoader(true);
        this.delete.next(teamId);
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Close delete-modal-popup window.
   */
  public closeModalPopup(): void {
    this.matDialog.closeAll();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Function is created for update data locally, for now we are not using this function, need to work on this.
   */
  public updateTeams(teams: ResponseModel[]): ResponseModel[] {
    let teamId = 2;
    const updatedTeam = teams.find(t => t.teamId === teamId);
    updatedTeam.status = 'Inactive';
    const index = teams.indexOf(updatedTeam);
    teams[index] = updatedTeam;
    this.matDialog.closeAll();
    return teams;
  }
}
