/**
@author : Sonal Patil
@class : TooltipComponent
@description :TooltipComponent is created for widget toolTip.
**/
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
// ----------------------------------------------------- //
import { tooltipData } from './tooltip-model';
import { SettingsPopupComponent } from '../modal-popup/settings-popup/settings-popup.component';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-tooltip',
  templateUrl: './tooltip.component.html'
})
export class TooltipComponent implements OnInit {
  /** isBulbTootlip is getting from parent component */
  @Input() bulbTootlip: any;
  /** pageTitle is getting from parent component */
  @Input() pageTitle: string;
  /** tooltipHeader created for store header of tooltip which we used in html */
  public tooltipHeader: string;
  /** tooltipDescription created for store description of tooltip which we used in html */
  public tooltipDescription: string[];
  /** tooltipIconClass store icon class which is bind in HTML ngClass */
  public tooltipIconClass: string;
  /** assessmentCategory store array of description with <br> tag */
  public assessmentCategory: any;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  public isBulbTootlip: boolean;
  public bulbTootlipContent: string;

  constructor(
    private matDialog: MatDialog,
    private globalEventsManager: GlobalEventsManager
  ) {
    this.isBulbTootlip = false;
    this.bulbTootlipContent = '';
    this.tooltipDescription = [];
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }

  ngOnInit(): void {
    if (this.bulbTootlip) {
      this.isBulbTootlip = this.bulbTootlip.isBulbTootlip;
      this.bulbTootlipContent = this.bulbTootlip.bulbTootlipContent;
    }
    this.setTooltip();
  }

  public ngOnDestroy(): void {
    this.themeEmitter.unsubscribe();
  }
  /**
   * Author : Anjali Tandel
   * Modified-Date : 01-05-2019
   * Description : Create method for ser tooltip header and description.
   */
  setTooltip(): void {
    let tooltip = tooltipData.find(t => (t.pageTitle) === this.pageTitle)
    if (tooltip) {
      this.tooltipIconClass = tooltip.class;
      this.tooltipHeader = tooltip.header;
      //if (tooltip.description.includes('<br><br>')) {
      // if (tooltip.class === assessmentTooltipIconClass) {
      //   this.assessmentCategory = tooltip.description.split('<br><br>');
      // } else {
      if (tooltip.description.includes('<br><br>')) {
        this.tooltipDescription = tooltip.description.split('<br><br>')
      } else {
        this.tooltipDescription.push(tooltip.description)
      }
      //}

    }
  }

  public openModal(): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    const dialogRef = this.matDialog.open(SettingsPopupComponent, {
      data: 'model',
      disableClose: false,
      position: { top: '' },
      width: '527px',
      height: '500px',
      // panelClass: SettingsPopupClass, 
      panelClass: ['lg-dialog-container', modalBackground],
      // panelClass: 'lg-dialog-container',
    });
    dialogRef.beforeClose().subscribe(isClose => {
      //  console.log('isClose : ' , isClose);     
    });
  }
}
