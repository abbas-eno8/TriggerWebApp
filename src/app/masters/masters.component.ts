/**
@author : Anjali Tandel
@class : MastersComponent
@description :MastersComponent is created for add, edit and delete dimension.
**/
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MasterDimensionModel, CollaspeExpand, AccrdianMinus, Collaspe, AccrdianPlus, AttributeModel, DimensionAttributeModel, UpdateDimensionAttribute, UpdateBtnValue, AddDimensionAttribute, AddBtnValue, PopupboxClass, AddAttribute } from './masters.model';
import { DimensionService } from './dimension-services/dimension.service';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { LoaderService } from '../core/loader/loader.service';
import { Attribute } from '@angular/compiler';
import { DimensionsHeader } from '../shared/tooltip/tooltip-model';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { DeletePopupComponent } from '../shared/modal-popup/delete-popup/delete-popup.component';
import { RoleEnum, ApiResponseStatus, CommonCssClass, Dimension } from '../core/magic-string/common.model';
import { UserModel } from '../core/model/user';
import { ScrollService } from '../core/services/scroll.service';
import { GlobalEventsManager } from '../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-masters',
  templateUrl: './masters.component.html'
})
export class MastersComponent implements OnInit {
  /** user created for store login user's detail */
  public user: UserModel;
  /** masterDimension modal stored dimension-elements and bind in HTML */
  public masterDimension: MasterDimensionModel[];
  /** created pageTitle for store Page title and value will be used in tooltip */
  public pageTitle: string;
  /** created addAttribute for store title of Add attribute button */
  public addAttribute: string;
  /** masterDimension modal stored attributeType which is used in attribute-type dropdown in modal-popup */
  public attributeType: MasterDimensionModel[];
  public attributeTitle: string;
  public attributeAction: string;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(
    private matDialog: MatDialog,
    private dimensionService: DimensionService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    public scrollService: ScrollService,
    private globalEventsManager: GlobalEventsManager) {
    this.pageTitle = DimensionsHeader
    this.addAttribute = AddDimensionAttribute;
    this.user = this.globalResponseHandlerService.getUser();
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
        } else {
        this.isDarkTheme = false;
      }
    })
  }

  public ngOnInit(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.getDimensions(1);
  }
  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }

  public getDimensions(index: number): void {
    this.dimensionService.getDimensionElements(this.user.clientId).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, true)) {
          if (response.data) { this.bindModel(response.data, index); }
        }
      }
    );
  }

  public bindModel(dimensions, collapseId: number): void {
    this.masterDimension = [];
    this.masterDimension = dimensions.map(dimension => ({
      id: dimension.dimensionId,
      dimension: dimension.dimensionType,
      attributeModel: this.bindAttribute(dimension.dimensionValues, dimension.id),
      isCollapsed: dimension.dimensionId == collapseId ? true : false,
      accrodianIconClass: dimension.dimensionId == collapseId ? AccrdianMinus : AccrdianPlus,
      collapseClass: dimension.dimensionId == collapseId ? CollaspeExpand : Collaspe,
    }));
  }

  public bindAttribute(dimensionValues, dimensionid: number): AttributeModel[] {
    let elements: AttributeModel[];
    elements = dimensionValues.map(atr => ({
      id: atr.id,
      dimensionId: atr.dimensionId,
      dimensionValueid: atr.dimensionValueid,
      dimensionValues: atr.dimensionValues,
      isDefault: atr.isDefault,
      orderBy: atr.dimensionValues == RoleEnum.Executive ? true : false,
      isManagerAccess: atr.isManagerAccess
    }));
    elements.sort((a, b) => this._sortByExecutive(a, b))
    return elements;
  }

  public _sortByExecutive(a: AttributeModel, b: AttributeModel): number {
    // return (a.orderBy === b.orderBy) ? 0 : a ? -1 : 1;
    return a.orderBy ? -1 : b.orderBy ? 1 : 0;
  }

  public _sortAlphanumeric(a: string, b: string): number {
    return a.localeCompare(b, 'en', { numeric: true });
  }

  public collapse(data: MasterDimensionModel): void {
    let currentDimension = this.masterDimension.filter(item => item.id === data.id).map(x => x)[0];
    let otherDimension = this.masterDimension.filter(item => item.id != data.id);
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
   * Author : Anjali Tandel
   * Modified-Date : 18-06-2019
   * Description : Create function on click event add-attribute.
   */
  public onclickAdd(): void {
    this.attributeTitle = AddAttribute;
    this.attributeAction = AddBtnValue;
    this.getDimension();
    // this.createModel(AddAttribute, AddBtnValue)
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 18-06-2019
   * Description : Create function on click event edit-attribute.
   */
  public onclickUpdate(attribute: AttributeModel, dimension: string): void {
    this.attributeTitle = UpdateDimensionAttribute;
    this.attributeAction = UpdateBtnValue;
    this.attributeType = [
      { id: attribute.dimensionId, dimension: dimension },
    ]
    this.createModel(attribute);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 21-06-2019
   * Description : Create function for call API of contact us.
   */
  public getDimension(attribute?: AttributeModel): void {
    this.dimensionService.getDimension().subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          this.bindDimension(response.data, attribute)
        }
      }
    );
  }

  public bindDimension(dimensions, attribute?): void {
    this.attributeType = [];
    this.attributeType = dimensions.map(dimension => ({
      id: dimension.id,
      dimension: dimension.dimensionType,
    }))
    this.attributeType = this.attributeType.filter(field => (field.id === Dimension.Role));
    this.attributeType.sort((a, b) => this._sortAlphanumeric(a.dimension, b.dimension));
    this.createModel(attribute)
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 18-06-2019
   * Description : Create model for pass data to add-edit-attribute modal-popup.
   */
  public createModel(attribute?: AttributeModel): void {
    let addAttributeModel = new DimensionAttributeModel();
    let attributeModel = new AttributeModel();
    if (attribute) { attributeModel = attribute; }
    addAttributeModel.title = this.attributeTitle;
    addAttributeModel.operation = this.attributeAction;
    /** get dimensions id and dimension expect Relations which are used in dropdown of attribute-type */
    // addAttributeModel.dimensionsType = (this.masterDimension.filter(field => field.id !== 2).map(({ id, dimension }) => ({ id, dimension }))).sort((a, b) =>
    //   this._sortAlphanumeric(a.dimension, b.dimension));
    addAttributeModel.dimensionsType = this.attributeType;
    addAttributeModel.AttributeModel = attributeModel;
    this.openModal(addAttributeModel);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 18-06-2019
   * Description : Create function for add/edit attribute.
   */
  public openModal(model: DimensionAttributeModel): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    const dialogRef = this.matDialog.open(AddAttributeComponent, {
      data: model,
      panelClass: [PopupboxClass, modalBackground],
      // panelClass: PopupboxClass,
      position: { top: '', bottom: '', left: '', right: '' }
    });
    dialogRef.beforeClose().subscribe(attributeId => {
      if (attributeId) {
        //this.getDimension(attribute.dimensionId);
        this.getDimensions(attributeId);
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 18-06-2019
   * Description : Create function on click event delete-attribute.
   */
  public onclickDelete(attribute: AttributeModel): void {
    this.openDeleteModal(attribute)
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Open modal popup for delete department.
   */
  public openDeleteModal(attribute: AttributeModel): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(DeletePopupComponent, {
      panelClass: modalBackground,
      data: 'Attribute',
    })
    dialogRef.componentInstance.confirm.subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.deleteAttribute(attribute, dialogRef);
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Create method for Call API delete department.
   */
  public deleteAttribute(attribute: AttributeModel, dialogRef): void {
    attribute.updatedBy = this.user.userId;
    this.loaderService.emitIsLoaderShown(true);
    this.dimensionService.deleteAttribute(attribute, this.user.clientId).subscribe(
      (deleteDimensionresponse) => {
        if (this.globalResponseHandlerService.getApiResponse(deleteDimensionresponse, true, false)) {
          dialogRef.close();
          this.getDimensions(attribute.dimensionId);
        } else {
          if (deleteDimensionresponse.status === ApiResponseStatus.AlreadyReported) {
            dialogRef.close();
          }
        }
      }
    );
  }
}
