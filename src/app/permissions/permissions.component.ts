import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AccrdianPlus, AccrdianMinus, ActionWisePermissionModel, CollaspeExpand, Collaspe, DimensionValueModel, MasterActionsModel, MasterDimensionElementModel, MasterDimensionModel, Permission, ActionModel, Configurations } from './permissions-model';
import { RoleEnum, Actions, Dimension } from '../core/magic-string/common.model';
import { PermissionHeader } from '../shared/tooltip/tooltip-model';
import { LoaderService } from '../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { canView, canAdd, canDelete } from '../core/services/action-permission/action-permission.service';
import { canEdit } from '../shared/modals/individual-employee-model';
import { PermissionsService } from './permission-service/permissions.service';

@Component({
  selector: 'trigger-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  public allDimensions: MasterDimensionModel[];
  public allDimensionEement: MasterDimensionElementModel[];
  public allActions: MasterActionsModel[];
  public selectedDimensionId: number;
  public selectedDimensionElementArray: any;
  public getAllPermissionsData: Array<any>;
  public clientId: number;
  public managerId: number;
  public submitConfigurationArray: ActionWisePermissionModel[]
  public copyArrayOfAllDimension: Array<any>;
  public collapseIndex: number;
  dimensionForm: FormGroup;
  /** created pageTitle for store Page title and value will be used in tooltip */
  public pageTitle: string;
  public isDisplayRecordsNotFound: boolean;
  //public isEnableCheckbox: boolean;
  public isSubmitEnable: boolean

  constructor(
    private permissionsService: PermissionsService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private cdn: ChangeDetectorRef,
  ) {
    this.submitConfigurationArray = [];
    this.pageTitle = PermissionHeader
    this.dimensionForm = this.formBuilder.group({
      dimensionControl: ['1']
    });
    //this.isEnableCheckbox = true
    this.isSubmitEnable = false;
  }

  ngOnInit() {
    this.loaderService.emitIsLoaderShown(true);
    let userData = this.globalResponseHandlerService.getUserData();
    this.clientId = userData.clientId;
    this.managerId = userData.userId;
    this.selectedDimensionId = 1;
    this.collapseIndex = 0;
    this.getAllDimensions();
    // this.getAllPermissions();
  }

  /**
    * Author : Mihir Patel
    * Modified-Date : 19-06-2019
    * Description : Create function for call get API of dimensions.
    */
  public getAllDimensions(): void {
    this.permissionsService.getDimensions().subscribe(
      (dimensionResponse: any) => {
        if (this.globalResponseHandlerService.getApiResponse(dimensionResponse, false, false)) {
          if (dimensionResponse.data) {
            this.bindDimension(dimensionResponse.data)
          }
          this.getAllPermissions();
          this.cdn.detectChanges();
        }
      }
    );
  }

  /**
    * Author : Mihir Patel
    * Modified-Date : 19-06-2019
    * Description : Create Method for bind dimensions.
    */
  bindDimension(dimensionResponse): void {
    this.allDimensions = [];
    /** get dimensions id and dimension expect Relations which are used in dropdown of attribute-type */
    this.allDimensions = dimensionResponse.map(({ id, dimensionType }) => ({ id, dimensionType })).sort((a, b) =>
      this._sortAlphanumeric(a.dimensionType, b.dimensionType));
    this.dimensionForm.controls['dimensionControl'].setValue(this.selectedDimensionId);
  }

  public _sortAlphanumeric(a: string, b: string): number {
    return a.localeCompare(b, 'en', { numeric: true });
  }
  /**
   * Author : Mihir Patel
   * Modified-Date : 21-06-2019
   * Description : Create Method for Get all actions from master using get api of ActionPermission.
   */
  getAllActions(): void {
    this.permissionsService.getAllActions().subscribe(
      (actionsResponse: any) => {
        if (this.globalResponseHandlerService.getApiResponse(actionsResponse, false, false)) {
          if (actionsResponse.data) {
            this.bindActionsData(actionsResponse.data);
            this.cdn.detectChanges();
          }
        }
      }
    );
  }

  /**
    * Author : Mihir Patel
    * Modified-Date : 21-06-2019
    * Description : Create Method for Bind actions data to modal
    */
  bindActionsData(actionsResponse): void {
    this.allActions = [];
    this.allActions = actionsResponse.map((action) => ({
      actionId: action.actionId,
      actions: action.actions
    }));
    this.getAllADimensionElement();
  }

  /**
    * Author : Mihir Patel
    * Modified-Date : 21-06-2019
    * Description : Create Method for Get all dimension element from master using get api of DimensionElements.
    */
  getAllADimensionElement(): void {
    this.permissionsService.getDimensionsElement(this.clientId).subscribe(
      (dimensionElementResponse: any) => {
        if (this.globalResponseHandlerService.getApiResponse(dimensionElementResponse, false, false)) {
          if (dimensionElementResponse.data) {
            dimensionElementResponse.data.forEach(element => {
              if (element.dimensionId === 1) {
                element.dimensionValues.forEach(role => {
                  if (role.dimensionValues === RoleEnum.Executive) {
                    role.orderBy = true
                  } else {
                    role.orderBy = false
                  }
                });
              }
              element.dimensionValues.sort((a, b) => this._sortByExecutive(a, b));
            });
            this.bindDimensionElement(dimensionElementResponse.data);
          }
          this.copyArrayOfAllDimension = JSON.parse(JSON.stringify(dimensionElementResponse.data));
        }
      }
    );
  }

  public _sortByExecutive(a, b): number {
    return a.orderBy ? -1 : b.orderBy ? 1 : 0;
  }
  /**
   * Author : Mihir Patel
   * Modified-Date : 24-06-2019
   * Description : Create Method for bind dimension element in modal.
   */
  bindDimensionElement(dimensionElement): void {
    this.allDimensionEement = [];
    this.allDimensionEement = dimensionElement.map((dimensionelement) => ({
      dimensionId: dimensionelement.dimensionId,
      dimensionType: dimensionelement.dimensionType,
      dimensionValuesWisePermision: this.bindDimensionValues(dimensionelement.dimensionValues),
    }));
    this.mapConfigurationData();
  }

  bindDimensionValues(dimensionValue: DimensionValueModel[]): DimensionValueModel[] {
    let dimensionValuesArray: DimensionValueModel[];
    //dimensionValuesArray = [];
    dimensionValuesArray = dimensionValue.map((values, index) => ({
      dimensionValues: values.dimensionValues,
      dimensionValueid: values.dimensionValueid,
      actionwisePermissionModel: this.bindActions(this.allActions, values),
      isCollapsed: index == this.collapseIndex ? true : false,
      accrodianIconClass: index == this.collapseIndex ? AccrdianMinus : AccrdianPlus,
      collapseClass: index == this.collapseIndex ? CollaspeExpand : Collaspe,
      isShowDimensionElement: values.dimensionValueid === 5 ? false : true
    }));
    return dimensionValuesArray;
  }

  bindActions(allActions, values) {
    let actionwisePermissionArray: ActionWisePermissionModel[];
    actionwisePermissionArray = [];
    actionwisePermissionArray = allActions.map((element, index) => {
      if (this.isAccessActionsByCondition(values, element.actionId)) {
        return {
          id: values.id,
          dimensionId: values.dimensionId,
          dimensionValueid: values.dimensionValueid,
          actionId: this.allActions.filter((a, actionIndex) => index === actionIndex)[0].actionId,
          dimensionType: values.dimensionType,
          actions: this.allActions.filter((a, actionIndex) => index === actionIndex)[0].actions,
          dimensionValues: values.dimensionValues,
          createdBy: values.createdBy,
          result: values.result,
          canView: false,
          canAdd: false,
          canEdit: false,
          canDelete: false,
          isViewable: this.isDisabledAction(index, 'isViewable'),
          isAddable: this.isDisabledAction(index, 'isAddable'),
          isEditable: this.isDisabledAction(index, 'isEditable'),
          isDeletabled: this.isDisabledAction(index, 'isDeletabled'),
        }
      } else {
        actionwisePermissionArray.splice(-1, 1)
      }
    });
    actionwisePermissionArray = actionwisePermissionArray.filter(e => e !== undefined);
    return actionwisePermissionArray;
  }

  private isAccessActionsByCondition(values, actionId: number): boolean {
    let dimensionId = values.dimensionId
    let dimensionValueid = values.dimensionValueid
    let isAccessible: boolean = true;
    if (!this.isCheckTeamConfig(values, actionId, dimensionId, dimensionValueid)) {
      isAccessible = false;
    } else if (!this.isCheckRequestTriggerSpark(values, actionId, dimensionId, dimensionValueid)) {
      isAccessible = false;
    } else if (!this.isCheckOtherAcion(values, actionId, dimensionId, dimensionValueid)) {
      isAccessible = false;
    }
    return isAccessible;
  }

  isCheckTeamConfig(values, actionId, dimensionId, dimensionValueid): boolean {
    let isAccessible: boolean = true;
    if (actionId == Actions.TeamConfiguraton || actionId == Actions.TeamDashboard) {
      let getDimension = Configurations.find(t => t.dimensionId === dimensionId);
      if (actionId == Actions.TeamConfiguraton && !getDimension.isAccessibleTeamsConfiguration) {
        isAccessible = false;
      }
      if (actionId == Actions.TeamDashboard && !getDimension.isAccessibleTeamsDashboard) {
        isAccessible = false;
      }
      if ((actionId == Actions.TeamConfiguraton && getDimension.isAccessibleTeamsConfiguration) || (actionId == Actions.TeamDashboard && getDimension.isAccessibleTeamsDashboard)) {
        if (dimensionValueid === 5 || dimensionValueid === -1) {
          isAccessible = false;
        }
      }
    }
    return isAccessible;
  }

  isCheckRequestTriggerSpark(values, actionId, dimensionId, dimensionValueid): boolean {
    let isAccessible: boolean = true;
    if (actionId == Actions.RequestForTrigger || actionId == Actions.RequestForSpark) {
      if ((actionId == Actions.RequestForTrigger) || (actionId == Actions.RequestForSpark)) {
        if (dimensionValueid === -1) {
          isAccessible = true;
        } else {
          isAccessible = false;
        }
      }
    }
    return isAccessible;
  }

  isCheckOtherAcion(values, actionId, dimensionId, dimensionValueid): boolean {
    let isAccessible: boolean = true;
    if (actionId == Actions.SparkAnEmployee || actionId == Actions.TriggerAnEmployee
      //|| actionId == Actions.EmployeeDashboard 
      || actionId == Actions.Comment || actionId == Actions.EvaluationsInDrafts) {
      let getDimension = Configurations.find(t => t.dimensionId === dimensionId);
      if (actionId == Actions.SparkAnEmployee && getDimension.isAccessibleSparkAnEmployee) {
        if (dimensionValueid === -1) {
          isAccessible = false;
        }
      }
      if ((actionId == Actions.EvaluationsInDrafts && getDimension.isAccessibleEvaluationsInDrafts) || (actionId == Actions.TriggerAnEmployee && getDimension.isAccessibleTriggerAnEmployee)
        //|| (actionId == Actions.EmployeeDashboard && getDimension.isAccessibleEmployeeDashboard)
        || (actionId == Actions.Comment && getDimension.isAccessibleComment) || (actionId == Actions.SummaryReporting && getDimension.isAccessibleSummaryReporting) ||
        (actionId == Actions.SummaryReporting && getDimension.isAccessibleSummaryReporting) || (actionId == Actions.DetailReporting && getDimension.isAccessibleDetailReporting) || (actionId == Actions.ContextualReporting && getDimension.isAccessibleContextualReporting)
        || (actionId == Actions.ScoreReporting && getDimension.isAccessibleScoreReporting)) {
        if (dimensionValueid === -1) {
          isAccessible = false;
        }
      }
    }
    return isAccessible;
  }
  isDisabledAction(actionId: number, action: string): boolean {
    let currentAction = this.allActions.find((a, actionIndex) => actionId === actionIndex);
    let actionPermission = ActionModel.find(a => a.actionId == currentAction.actionId)
    if (actionPermission) {
      return actionPermission[action];
    } else {
      return true;
    }
  }

  /**
   * Author : Mihir Patel
   * Modified-by : Anjali Tandel
   * Modified-Date : 14-08-2019
   * Description : Create Method for map configuration data into master structure of JSON.
   */
  public mapConfigurationData(): void {
    if (this.allDimensionEement && this.getAllPermissionsData) {
      this.allDimensionEement.forEach(dimensionElement => {
        this.getAllPermissionsData.map(configureData => {
          if (dimensionElement.dimensionId === configureData.dimensionId) {
            dimensionElement.dimensionValuesWisePermision.map(element => {
              configureData.dimensionValuesWisePermision.map(elem => {
                if (element.dimensionValueid === elem.dimensionValueId) {
                  element.actionwisePermissionModel.map(data => {
                    elem.actionwisePermissionModel.map(e => {

                      if (data.actionId === e.actionId) {
                        data.canAdd = e.canAdd,
                          data.canDelete = e.canDelete,
                          data.canEdit = e.canEdit,
                          data.canView = e.canView,
                          data.isViewable = this.isEnabledAction(e.actionId, 'isViewable'),
                          data.isAddable = this.isEnabledAction(e.actionId, 'isAddable'),
                          data.isEditable = this.isEnabledAction(e.actionId, 'isEditable'),
                          data.isDeletabled = this.isEnabledAction(e.actionId, 'isDeletabled'),
                          data.managerId = e.managerId,
                          data.id = e.id
                      }
                    });

                  });
                }

              });

            });
          }
        })
      });
      this.getDimensionWiseElement();
    }
  }

  isEnabledAction(actionId: number, action: string): boolean {
    //ActionModel.find(a => a.actionId === e.actionId).isViewable ? true : false
    let actionPermission = ActionModel.find(a => a.actionId === actionId)
    if (actionPermission) {
      return actionPermission[action];
    } else {
      return true;
    }
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 26-06-2019
   * Description : Create method to get array of selcetd dimension.
   */
  public onChangeDimension(dimensionId) {
    this.isSubmitEnable = false;
    this.collapseIndex = 0
    this.bindDimensionElement(this.copyArrayOfAllDimension);
    if (!!dimensionId) {
      this.selectedDimensionId = parseInt(dimensionId);
    }
    this.getDimensionWiseElement();
  }

  /**
   * Author : Mihir Patel
   * Modified-by : Anjali Tandel
   * Modified-Date : 14-08-2019
   * Description : Create method to get system configuation data using get API of ActionPermission.
   */
  getDimensionWiseElement(): void {
    let selectedDimensionId = this.dimensionForm.get('dimensionControl').value;
    const cloneData = JSON.parse(JSON.stringify(this.allDimensionEement));
    this.selectedDimensionElementArray = [];
    this.submitConfigurationArray = [];
    cloneData.forEach(dimensionArray => {
      if (dimensionArray.dimensionId === parseInt(selectedDimensionId)) {
        this.selectedDimensionElementArray = [...dimensionArray.dimensionValuesWisePermision];
      }
    })
    if (this.selectedDimensionElementArray.length > 0) {
      this.selectedDimensionElementArray.forEach(element => {
        // let empDashboardData = element.actionwisePermissionModel.find(item => item.actionId === Actions.EmployeeDashboard);
        let contextualReporting = element.actionwisePermissionModel.find(item => item.actionId === Actions.ContextualReporting);
        let commentAction = element.actionwisePermissionModel.find(item => item.actionId === Actions.Comment);
        let sparkAnEmpAction = element.actionwisePermissionModel.find(item => item.actionId === Actions.SparkAnEmployee);
        let teamConfigurationAction = element.actionwisePermissionModel.find(item => item.actionId === Actions.TeamConfiguraton);
        if (contextualReporting && contextualReporting.canView) {
          if (commentAction && commentAction.canView) {
            commentAction.canView = true
            commentAction.isEditable = true
            commentAction.isDeletabled = true
            commentAction.canAdd = false
            commentAction.isAddable = false
          }
        }
        if (contextualReporting && !contextualReporting.canView) {
          if (commentAction && commentAction.canView) {
            commentAction.canAdd = false
            commentAction.canEdit = false
            commentAction.canDelete = false
            commentAction.isViewable = false
            commentAction.isEditable = false
            commentAction.isDeletabled = false
          }
        }
        if (sparkAnEmpAction && sparkAnEmpAction.canView) {
          sparkAnEmpAction.isEditable = true
          sparkAnEmpAction.isDeletabled = true
        }
        if (teamConfigurationAction && teamConfigurationAction.canView) {
          teamConfigurationAction.isAddable = true
          teamConfigurationAction.isEditable = true
          teamConfigurationAction.isDeletabled = true
        }

      })
      this.isDisplayRecordsNotFound = false;
    } else {
      this.isDisplayRecordsNotFound = true;
    }
    this.loaderService.emitIsLoaderShown(false);
    this.cdn.detectChanges();
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 19-06-2019
   * Description : Create method to get system configuation data using get API of ActionPermission.
   */
  public getAllPermissions(): void {
    this.getAllPermissionsData = [];
    this.permissionsService.getSystemConguration(this.clientId).subscribe(
      (systeConfigurationResponse: any) => {
        if (this.globalResponseHandlerService.getApiResponse(systeConfigurationResponse, false, false)) {
          this.getAllPermissionsData = systeConfigurationResponse.data;
          this.getAllActions()
        }
      }
    );
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 24-06-2019
   * Description : Create method to manage accordion open/close.
   */
  public collapse(data): void {
    let currentDimension = this.selectedDimensionElementArray.filter(item => item.dimensionValueid === data.dimensionValueid).map(x => x)[0];
    let otherDimension = this.selectedDimensionElementArray.filter(item => item.dimensionValueid != data.dimensionValueid);
    otherDimension.forEach(item => item.isCollapsed = false);
    otherDimension.forEach(item => item.accrodianIconClass = AccrdianPlus);
    currentDimension.isCollapsed = data.isCollapsed;
    if (currentDimension.isCollapsed) {
      currentDimension.accrodianIconClass = AccrdianMinus
    } else {
      currentDimension.accrodianIconClass = AccrdianPlus
    }
  }

  /**
   * Author : Mihir Patel
   * Modified-by : Anjali Tandel
   * Modified-Date : 14-08-2019
   * Description : Create method to manage checked/unchecked status of actions for selceted dimension.
   */
  public onActionCheck(action, item, columnType, actions): void {
    if (action.actionId === Actions.ContextualReporting && action.dimensionValueid !== -1) {
      this.enabledCommentAction(action, item.checked, actions)
    }
    // if ((action.actionId === Actions.SparkAnEmployee || action.actionId === Actions.TeamConfiguraton) && columnType === canView) {
    //   this.enabledSparkAction(action, item.checked, actions)
    // }
    if ((action.actionId === Actions.SparkAnEmployee) && columnType === canView) {
      this.enabledSparkAction(action, item.checked, actions)
    }
    if ((action.actionId === Actions.TeamConfiguraton) && columnType === canView) {
      this.enabledTeamsAction(action, item.checked, actions)
    }
    this.isSubmitEnable = true;
    let configArray = (this.selectedDimensionElementArray.find(x => x.dimensionValueid === action.dimensionValueid)).actionwisePermissionModel;
    let data = configArray.find(e => e.actionId === action.actionId);
    data[columnType] = item.checked;
    this.selectedDimensionElementArray[this.selectedDimensionElementArray.indexOf(configArray)] = actions;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 14-08-2019
   * Description : Create method to for enabled/disabled checkbox for comment permission if view permission of employee-dashboard checked/unchecked.
   */
  enabledCommentAction(action, isChecked, actions): void {
    let commentAction = actions.find(a => a.actionId === Actions.Comment);
    if (isChecked) {
      commentAction.canView = true;
      //commentAction.isViewable = false;
      commentAction.isEditable = true;
      commentAction.isDeletabled = true;
    } else {
      commentAction.canView = false;
      commentAction.canEdit = false;
      commentAction.canDelete = false;
      //commentAction.isViewable = false;
      commentAction.isEditable = false;
      commentAction.isDeletabled = false;
    }
    let config = (this.selectedDimensionElementArray.find(x => x.dimensionValueid === action.dimensionValueid)).actionwisePermissionModel;
    let data = config.find(e => e.actionId === Actions.Comment);
    this.selectedDimensionElementArray[this.selectedDimensionElementArray.indexOf(data)] = commentAction;
  }

  enabledSparkAction(action, isChecked, actions): void {
    let sparkAction = actions.find(a => a.actionId === action.actionId);
    if (isChecked) {
      //sparkAction.isAddable = true;
      sparkAction.isEditable = true;
      sparkAction.isDeletabled = true;
    } else {
      //sparkAction.isAddable = false;
      sparkAction.isEditable = false;
      sparkAction.isDeletabled = false;
      //sparkAction.canAdd = false;
      sparkAction.canEdit = false;
      sparkAction.canDelete = false;
    }
    let config = (this.selectedDimensionElementArray.find(x => x.dimensionValueid === action.dimensionValueid)).actionwisePermissionModel;
    let data = config.find(e => e.actionId === Actions.Comment);
    this.selectedDimensionElementArray[this.selectedDimensionElementArray.indexOf(data)] = sparkAction;
  }

  enabledTeamsAction(action, isChecked, actions): void {
    let sparkAction = actions.find(a => a.actionId === action.actionId);
    if (isChecked) {
      sparkAction.isAddable = true;
      sparkAction.isEditable = true;
      sparkAction.isDeletabled = true;
    } else {
      sparkAction.isAddable = false;
      sparkAction.isEditable = false;
      sparkAction.isDeletabled = false;
      sparkAction.canAdd = false;
      sparkAction.canEdit = false;
      sparkAction.canDelete = false;
    }
    let config = (this.selectedDimensionElementArray.find(x => x.dimensionValueid === action.dimensionValueid)).actionwisePermissionModel;
    let data = config.find(e => e.actionId === Actions.Comment);
    this.selectedDimensionElementArray[this.selectedDimensionElementArray.indexOf(data)] = sparkAction;
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 26-06-2019
   * Description : Create method to call post api of ActionPermission for save configuration which are configured.
   */
  submitConfiguration(): void {
    this.isSubmitEnable = false;
    this.loaderService.emitIsLoaderShown(true);
    this.selectedDimensionElementArray.forEach((element, index) => {
      if (element.isCollapsed) {
        this.collapseIndex = index;
      }
      element.actionwisePermissionModel.forEach(action => {
        action.createdBy = this.managerId;
        this.submitConfigurationArray.push(action)
      });
    });
    this.permissionsService.updateSysyemConfiguration(this.submitConfigurationArray, this.clientId).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, true, false)) {
          this.getAllDimensions();
        } else {
          this.loaderService.emitIsLoaderShown(false);
        }
      }
    );
  }
}