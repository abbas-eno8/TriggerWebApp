/**
@author : Anjali Tandel
@class : OpenOverlayService
@description : OpenOverlayService is created for open overlay based on passing component as parameter.
**/
import { Injectable, ComponentRef } from '@angular/core';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
import { OverlayConfig, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { PopupPanelClass, ThemeClass } from '../../../core/magic-string/common.model';
import { ComponentPortal } from '@angular/cdk/portal';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRefModel } from '../../modals/survey-form-model';

@Injectable({
  providedIn: 'root'
})
export class OpenOverlayService {
  private isDarkTheme: boolean;
  constructor(
    private focusTrapFactory: FocusTrapFactory,
    private globalEventsManager: GlobalEventsManager,
    private overlay: Overlay,
  ) {
    this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      this.isDarkTheme = status ? true : false;
    })
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 27-01-2020
   * Description : Created method for redirected to Trigger-score page.
   */
  public openSurveyForm(component): OverlayRefModel {
    let overlayRef: OverlayRef;
    let componentOverlayRef: ComponentRef<any>;
    let modalBackground = this.isDarkTheme ? ThemeClass.Black : ThemeClass.White;
    let config = new OverlayConfig({
      panelClass: [PopupPanelClass.extraLargeContainer, modalBackground],
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });
    overlayRef = this.overlay.create(config);
    componentOverlayRef = overlayRef.attach(new ComponentPortal(component));
    this.focusTrapFactory.create(overlayRef.overlayElement);
    return new OverlayRefModel(overlayRef, componentOverlayRef);
  }
}
