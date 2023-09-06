import { Component, OnInit, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import { DashboardService } from '../dashboard-service/dashboard.service';
import { LoaderService } from '../../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { TeamsRequestModel } from '../../teams/teams-model';
import { TeamDashboard, TeamAvgScore, TeamAvgScoreByDay, widgetData, Widget, Dashboard_, RefrshComponent, CurrentRouteUrl, WidgetType, TeamDashboardPassHeaderName, DragItemPositioned, DataItemID, IDConstatnt, AverageScore, AverageScoreByDay, NameConstant, widgetDetail, IN, TeamsMobileView } from '../dashboard-model';
import { DashboardPresenter } from '../dashboard-presenter/dashboard.presenter';
import { TeamWidgetComponent } from './team-widget/team-widget.component';
import { Encryption } from '../../core/magic-string/common-validation-model';
import * as _ from 'underscore';
import { CommonService } from '../../core/services/common/common.service';
import { Router } from '@angular/router';
import { TooltioHeaderTeamDashboard, TooltioHeaderTeamAveargeScore, TooltioHeaderTeamAveargeScoreByDay } from '../../shared/tooltip/tooltip-model';
import { GridItemClass, GridSizerClass, IconDragDropClass, GridClass } from '../../core/magic-string/common.model';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { TeamsMobileWidgetComponent } from './mobile-view/teams-mobile-widget/teams-mobile-widget.component';
declare var $: any;
declare var Packery: any;
declare var Draggabilly: any;
@Component({
  selector: 'trigger-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.scss']
})
export class TeamDashboardComponent implements OnInit {
  @ViewChild(TeamsMobileView, { read: ViewContainerRef, static: false }) teamsMobileView: ViewContainerRef;
  @ViewChild(AverageScore, { read: ViewContainerRef, static: false }) avrScore: ViewContainerRef;
  @ViewChild(AverageScoreByDay, { read: ViewContainerRef, static: false }) avrScoreByDay: ViewContainerRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.lastTouchStartEvent === 0) {
      this.lastTouchStartEvent = Date.now();
    }
    this.checkTimeMethod();
  }
  avrScoreRef: any;
  avrScoreByDayRef: any;
  mobileViewRef: any;
  public teams: TeamsRequestModel[];
  public years: any;
  public teamDashboard: TeamDashboard;
  public selectedTeam: number;
  public selectedYear: number;
  public selectedYearBinding: string;
  public isWidgetCreated: boolean;
  public teamWidgetList: widgetData[];
  public managerCheckedWidgetArray: widgetData[];
  public localStoragePackeryArray: widgetData[];
  public checkedWidgetArray: any[];
  public widgetArray: Widget[];
  public userId: any;
  public grid: any;
  public tilesArray: widgetData[];
  public positionNull: boolean;
  public packeryArray: widgetData[];
  public sequence: widgetDetail[];
  public responseArray: any;
  public tileNotEnabled: widgetDetail[];
  public windowWidth: any = $(window).width();
  public noTiles: any;
  public lastSequenceNumber: number;
  private lastTouchStartEvent: number;
  private ignoreEventTime: number;
  public pageTitle: string;
  public isWidgetActive: boolean = false;
  public breakPointvalue: any;
  public isMobileView: boolean = false;
  public isComponentRender: boolean = false;
  constructor(
    private service: DashboardService,
    private loaderService: LoaderService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private presenter: DashboardPresenter,
    private dashboardService: DashboardService,
    private commonService: CommonService,
    public router: Router,
    public breakpointObserver: BreakpointObserver) {
    this.loaderService.emitIsLoaderShown(true);
    this.isWidgetCreated = false;
    this.ignoreEventTime = 300;
    this.lastTouchStartEvent = 0;
    this.pageTitle = TooltioHeaderTeamDashboard;
    this.selectedYear = parseInt(this.globalResponseHandlerService.decriptData(Encryption.TriggerSelectYearMessage, Encryption.TriggerSelectYearKey));
    // Calling media matcher method for get screen resolution, with help of this widget show for dekstop and mobile :
    this.breakPointvalue = this.breakpointObserver
      .observe(['(min-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobileView = false;
          this.destroyAndRecallPackery();
        } else {
          this.isMobileView = true;
          this.destroyAndRecallPackery();
        }
      });
  }
  ngOnInit() {
    this.localStoragePackeryArray = [];
    // this.getTeams();
    this.getPackeryData()
    //this.getYears();
    this.userId = this.globalResponseHandlerService.getUser().userId;
  }

  /**
     * Author : Mihir Patel
     * Created-Date :  07-10-2019
     * Description : Create method for get widget data which used to show and hide widget
 */
  getPackeryData() {
    this.commonService.getWidgetData(this.globalResponseHandlerService.getUser().userId, WidgetType.TeamWidgetType).subscribe(
      (widgetResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(widgetResponse, false, false)) {
          this.packeryArray = [];
          this.packeryArray = widgetResponse.data.map((widget) => ({
            userId: widget.userId,
            id: widget.widgetId,
            widgetId: Dashboard_ + widget.widgetId,
            tileSelector: widget.widgetName,
            isActive: widget.isActive,
            sequenceNumber: widget.sequenceNumber,
            tileSequence: widget.tileSequence,
            position: widget.position,
            widgetActualName: widget.widgetActualName
          }));
          this.checkedWidgetArray = this.packeryArray;
          this.packeryArray.forEach(element => {
            if (element.isActive) {
              this.isWidgetActive = true;
            }
          });
          this.getYears();
          // Code comment by @Mihir Patel
          // if (this.isWidgetCreated) {
          //   this.bindScoreToWidget();
          // } else 
          if (this.isWidgetActive) {
            this.createComponent(this.packeryArray);
          } else {
            this.loaderService.emitIsLoaderShown(false);
          }
        }
      }
    );
  }

  private createComponent(teamWidgetList) {
    this.windowWidth = $(window).width()
    this.clearContainer();
    this.isComponentRender = false;
    this.clearContainer();
    if (teamWidgetList.length > 0) {
      teamWidgetList.forEach(widget => {
        if (widget.isActive) {
          if (this.isMobileView) {
            if (!this.isComponentRender) {
              this.mobileViewRef = this.presenter.createComponent(this.mobileViewRef, this.teamsMobileView, TeamsMobileWidgetComponent);
              this.mobileViewRef.instance.teamAvgScoreDescription = TeamAvgScore;
              this.mobileViewRef.instance.teamAvgScoreByDayDescription = TeamAvgScoreByDay;
              this.isComponentRender = true;
            }

          } else {
            // load component by ID
            if (widget.id === 21) {
              this.avrScoreRef = this.presenter.createComponent(this.avrScoreRef, this.avrScore, TeamWidgetComponent);
              this.avrScoreRef.instance.description = TeamAvgScore;
              this.avrScoreRef.instance.removeTile.subscribe(data => {
                this.removeTile(TeamDashboardPassHeaderName.TeamAverageScore);
              });
            } else if (widget.id === 22) {
              this.avrScoreByDayRef = this.presenter.createComponent(this.avrScoreByDayRef, this.avrScoreByDay, TeamWidgetComponent);
              this.avrScoreByDayRef.instance.description = TeamAvgScoreByDay;
              this.avrScoreByDayRef.instance.removeTile.subscribe(data => {
                this.removeTile(TeamDashboardPassHeaderName.TeamAverageScoreByDay);
              });
            }
          }
        }
      })
      if (!!this.teamDashboard && !!this.teamDashboard.AverageScoreByDay[0]) {
        this.bindScoreToWidget()
      } else {
        this.bindBlankValue()
      }
      this.isWidgetCreated = true;
      // this.getYears();
      //this.getTeams();
    }
    this.getPackery();
  }

  /**
   * Author : Mihir Patel
   * Created-Date :  09-10-2019
   * Description : Create a method for check time gap and based on that call destroyAndRecallPackery method.
   */
  checkTimeMethod() {
    if (Date.now() > this.lastTouchStartEvent + this.ignoreEventTime) {
      this.destroyAndRecallPackery();
      this.lastTouchStartEvent = 0;
    }
  }

  destroyAndRecallPackery() {
    if (this.grid) {
      this.grid.destroy();
      setTimeout(() => {
        this.createComponent(this.packeryArray);
      }, 500);
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Description : This Method is invoke when user inactie team from server.
   */
  private getYears(): void {
    this.service.getYear(this.globalResponseHandlerService.getUser().clientId).subscribe(
      (years) => {
        if (this.globalResponseHandlerService.getApiResponse(years, true, false)) {
          this.years = years.data;
          this.selectedYear = this.years[0].AssessedYear;
          this.selectedYearBinding = IN + this.selectedYear;
          this.getTeams();
        } else {
          this.loaderService.emitIsLoaderShown(false);
        }
      }
    );
  }

  public onChangeYear(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.selectedYearBinding = IN + this.selectedYear;
    this.getTeams();
    //this.getTeamDashboard()
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Description : This Method is invoke when user inactie team from server.
   */
  private getTeams(): void {
    this.service.getTeams(this.globalResponseHandlerService.getUser().clientId, this.selectedYear).subscribe(
      (teams) => {
        if (this.globalResponseHandlerService.getApiResponse(teams, true, false)) {
          this.teams = _.sortBy(teams.data, NameConstant);
          this.selectedTeam = this.teams[0].teamId;
          this.getTeamDashboard();
        } else {
          this.loaderService.emitIsLoaderShown(false);
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Description : This Method is invoke when user inactie team from server.
   */
  private getTeamDashboard(): void {
    this.service.getTeamDashboard(this.globalResponseHandlerService.getUser().clientId, this.selectedYear, this.selectedTeam).subscribe(
      (dashboardResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(dashboardResponse, true, false)) {
          this.teamDashboard = dashboardResponse.data;
          this.presenter.getDashboard(this.teamDashboard);
          this.bindScoreToWidget();
        }
        else {
          this.teamDashboard = null;
          this.bindBlankValue()
        }
      }
    );
  }

  bindBlankValue() {
    if (this.avrScoreRef) {
      this.avrScoreRef.instance.selectedYearBinding = this.selectedYearBinding;
      this.avrScoreRef.instance.score = '';
      this.avrScoreRef.instance.pageTitle = TooltioHeaderTeamAveargeScore;
      this.avrScoreRef.instance.scoreClass = '';
    }
    if (this.avrScoreByDayRef) {
      this.avrScoreByDayRef.instance.score = '';
      this.avrScoreByDayRef.instance.pageTitle = TooltioHeaderTeamAveargeScoreByDay;
      this.avrScoreByDayRef.instance.scoreClass = '';

    }
    if (this.mobileViewRef) {
      this.mobileViewRef.instance.avgScoreByDayScore = '-';
      this.mobileViewRef.instance.aveargeScoreByDaypageTitle = TooltioHeaderTeamAveargeScoreByDay;
      this.mobileViewRef.instance.aveargeScoreByDayClass = '';

      this.mobileViewRef.instance.teamAvgScore = '-';
      this.mobileViewRef.instance.teamAvgscorepageTitle = TooltioHeaderTeamAveargeScore;
      this.mobileViewRef.instance.teamAvgscoreClass = '';
      this.mobileViewRef.instance.selectedYearBinding = this.selectedYearBinding;
    }
    this.loaderService.emitIsLoaderShown(false);
  }

  public onChangeTeam(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.getTeamDashboard();
  }

  private bindScoreToWidget(): void {
    if (this.avrScoreRef && !!this.teamDashboard) {
      this.avrScoreRef.instance.score = this.teamDashboard.AverageScore[0].teamAvgscoreRank;
      this.avrScoreRef.instance.pageTitle = TooltioHeaderTeamAveargeScore;
      this.avrScoreRef.instance.selectedYearBinding = this.selectedYearBinding;
      this.avrScoreRef.instance.scoreClass = this.presenter.getClassByGrade(this.teamDashboard.AverageScore[0].teamAvgscoreRank);
    }
    if (this.avrScoreByDayRef && !!this.teamDashboard) {
      this.avrScoreByDayRef.instance.score = this.teamDashboard.AverageScoreByDay[0].avgScoreByDayRank;
      this.avrScoreByDayRef.instance.pageTitle = TooltioHeaderTeamAveargeScoreByDay;
      this.avrScoreByDayRef.instance.scoreClass = this.presenter.getClassByGrade(this.teamDashboard.AverageScoreByDay[0].avgScoreByDayRank);
    }
    if (this.mobileViewRef && !!this.teamDashboard) {
      this.mobileViewRef.instance.avgScoreByDayScore = this.teamDashboard.AverageScoreByDay[0].avgScoreByDayRank;
      this.mobileViewRef.instance.aveargeScoreByDaypageTitle = TooltioHeaderTeamAveargeScoreByDay;
      this.mobileViewRef.instance.aveargeScoreByDayClass = this.presenter.getClassByGrade(this.teamDashboard.AverageScoreByDay[0].avgScoreByDayRank);

      this.mobileViewRef.instance.teamAvgScore = this.teamDashboard.AverageScore[0].teamAvgscoreRank;
      this.mobileViewRef.instance.teamAvgscorepageTitle = TooltioHeaderTeamAveargeScore;
      this.mobileViewRef.instance.teamAvgscoreClass = this.presenter.getClassByGrade(this.teamDashboard.AverageScore[0].teamAvgscoreRank);
      this.mobileViewRef.instance.selectedYearBinding = this.selectedYearBinding;
    }
    this.loaderService.emitIsLoaderShown(false);
  }

  clearContainer() {
    if (this.avrScore) {
      this.avrScore.clear();
    }
    if (this.avrScoreByDay) {
      this.avrScoreByDay.clear();
    }
    if (this.teamsMobileView) {
      this.teamsMobileView.clear();
    }
  }

   /**
    * Author : Mihir Patel
    * Created-Date :  07-10-2019
    * Description : Create method for perform check/uncheck widget at right bar and save values in array.
    */
  checkValue(widget: string, isChecked: boolean, index: number) {
    this.checkedWidgetArray[index].isActive = isChecked ? true : false;
  }

  /**
   * Author : Mihir Patel 
   * Created-Date :  07-10-2019
   * Description : Create method for save widget checked/unchecked values on click of submit button at right bar
   */
  submitCheckValue() {
    this.globalResponseHandlerService.encriptData(JSON.stringify(true), Encryption.TeamDashboardLoad, Encryption.TeamDashboardLoadKey);
    this.widget(this.checkedWidgetArray, false)
  }

  /**
   * Author : Mihir Patel
   * Created-Date :  07-10-2019
   * Description : ngOnDestroy method used to save widget data at change employee dashboard route.
   */
  ngOnDestroy() {
    //this.globalResponseHandlerService.encriptData('null', Encryption.TriggerSelectedId, Encryption.SelectedId);
    this.widget(this.localStoragePackeryArray, true)
  }

  /**
   * Author : Mihir Patel
   * Created-Date :  07-10-2019
   * Description : Create common function for call API for bind widget-section.
   */
  widget(object: any, isDestroy: boolean): void {
    let widgetCount: number = 0;
    this.widgetArray = [];
    if (object.length > 0) {
      widgetCount = object.filter(w => w.isActive === false).length;
      if (widgetCount === 8) {
        let defaultWidgetPosition = this.dashboardService.getDefaultWidgetPosition(this.userId);
        this.widgetArray = this.bindWidgetSection(defaultWidgetPosition);
      } else {
        if (!isDestroy) {
          this.widgetArray = this.bindWidgetSection(object);
        } else {
          this.widgetArray = this.bindWidgetSection(this.localStoragePackeryArray);
        }
      }
      this.commonService.setWidgetData(this.widgetArray).subscribe(
        (response) => {
          if (this.globalResponseHandlerService.getApiResponse(response, false)) {
            localStorage.clear();
            this.localStoragePackeryArray = [];
            if (isDestroy) {
              this.grid.destroy();
            } else {
              this.reloadCurrentComponent();
            }
          }
        }
      );
    }
  }

  bindWidgetSection(widgets): Widget[] {
    return widgets.map(widget => ({
      userId: this.userId,
      widgetId: isNaN(widget.widgetId) ? parseInt(widget.widgetId.split('_')[1]) : widget.widgetId,
      widgetName: widget.widgetName,
      sequenceNumber: widget.sequenceNumber,
      tileSequence: widget.tileSequence,
      position: widget.position === '' ? 0 : widget.position,
      isActive: widget.isActive
    }));
  }

  reloadCurrentComponent(): void {
    // For load current component : 
    this.router.navigateByUrl(RefrshComponent, { skipLocationChange: true }).then(() =>
      this.router.navigate([CurrentRouteUrl]));
  }

  /**
     * Author : Mihir Patel
     * Created-Date :  07-10-2019
     * Description : Create method for Perform packery operations for move widgets
  */
  getPackery() {
    this.positionNull = false;
    if (this.localStoragePackeryArray.length > 0) {
      this.tilesArray = this.localStoragePackeryArray;
    } else {
      this.tilesArray = this.packeryArray;
    }
    setTimeout(() => {
      this.sequence = [];
      this.tileNotEnabled = [];
      var tilePosition;
      this.tilesArray.forEach(tile => {
        var element = document.getElementById("" + tile.tileSelector + "");
        if (element !== null)
          element.setAttribute(DataItemID, "" + tile.sequenceNumber + "");

        if (tile.position === '' && tile.isActive) {//if (tile.position === '' && tile.isEnabled === true) {
          this.positionNull = true;
        }
        this.tilesArray.forEach(tab => {
          if (tile.tileSequence == tab.sequenceNumber) {
            if (tab.isActive) {// if (tab.isEnabled) {
              if (this.windowWidth >= 768 && this.windowWidth <= 991) {
                tilePosition = 0;
              } else {
                tilePosition = tab.position;
              }
              this.sequence.push({
                tabindex: tile.tileSequence.toString(),
                position: tilePosition,
                selector: tab.tileSelector
              });
            } else {
              this.tileNotEnabled.push({
                tabindex: tile.tileSequence.toString(),
                position: tab.position,
                selector: tab.tileSelector
              });
            }
          }
        });
      });
      this.noTiles = this.tilesArray.every(this.checkIsEnabled);
      //  For packery : 
      Packery.prototype.getShiftPositions = function (attrName) {
        attrName = attrName || IDConstatnt;
        const _thiss = this;
        return this.items.map(function (item) {
          return {
            attr: item.element.getAttribute(attrName),
            x: item.rect.x / _thiss.packer.width
          }
        });
      };
      var grids = document.querySelector(GridClass);
      // init Packery
      this.grid = new Packery(grids, {
        itemSelector: GridItemClass,
        columnWidth: GridSizerClass,
        gutter: 20,
        // originLeft: true,
        // percentPosition: true,
        // isInitLayout: false // disable initial layout
      });
      // Set column width for responsive
      var itemElems = grids.querySelectorAll(GridItemClass);
      for (var i = 0; i < itemElems.length; i++) {
        var itemElem = itemElems[i];
        var draggie = new Draggabilly(itemElem, {
          handle: IconDragDropClass
        });
        this.grid.bindDraggabillyEvents(draggie);
      }
      //  For set position :
      if (this.tileNotEnabled.length > 0) {
        this.tileNotEnabled.forEach(item => {
          this.grid.remove(document.getElementById("" + item.selector + ""));
        });
      }
      if (this.sequence && !this.positionNull) {
        this.grid._resetLayout();

        // set item order and horizontal position from saved positions
        this.grid.items = this.sequence.map((itemPosition) => {
          var itemElem = grids.querySelector('[data-item-id="' + itemPosition.tabindex + '"]');
          var item = this.grid.getItem(itemElem);
          item.rect.x = parseFloat(itemPosition.position) * this.grid.packer.width;
          return item;
        });
        this.grid.shiftLayout();
      } else {
        this.grid.layout();
      }
      this.grid.on(DragItemPositioned, (event, draggedItem) => {
        var positions = this.getItemsShiftPositions(this.grid.packer.width);
        var itemElems = this.grid.getItemElements();
        var sortOrder = [];
        for (var i = 0; i < itemElems.length; i++) {
          itemElems[i].setAttribute(DataItemID, i + 1);
          this.lastSequenceNumber = i + 1;
        }
        for (var k = 0; k < itemElems.length; k++) {
          sortOrder[k] = {
            'tabindex': itemElems[k].getAttribute(DataItemID),
            'selector': itemElems[k].getAttribute("id")
          };
        }
        positions.forEach(position => {
          sortOrder.forEach(order => {
            if (position.selector == order.selector) {
              position.tabindex = order.tabindex;
            }
          });
        });
        if (this.tileNotEnabled.length > 0) {
          this.tilesArray.forEach(tile => {
            this.tileNotEnabled.forEach(item => {
              if (tile.tileSelector == item.selector) {
                tile.sequenceNumber = this.lastSequenceNumber + 1;
                this.lastSequenceNumber = this.lastSequenceNumber + 1
              }
            });
          });
        }
        if (this.sequence.length == 0) {
          this.lastSequenceNumber = 0;
        }
        this.tilesArray.forEach(tile => {
          positions.forEach(preference => {
            if (tile.tileSelector == preference.selector) {
              tile.sequenceNumber = parseInt(preference.tabindex);
              if (this.windowWidth > 991) {
                tile.position = preference.position;
              }
            }
          });
        });
        this.localStoragePackeryArray = [];
        localStorage.setItem('widgetPosition', JSON.stringify(this.tilesArray));
        this.localStoragePackeryArray = JSON.parse(localStorage.getItem('widgetPosition'));
      });
    }, 50);
    // this.loaderService.emitIsLoaderShown(false)
  }

  /**
     * Author : Mihir Patel
     * Created-Date :  07-10-2019
     * Description : Create method for Perform packery operations
  */
  getItemsShiftPositions(packeryWidth) {
    return this.grid.items.map(function (item) {
      return {
        selector: item.element.getAttribute(IDConstatnt),
        position: item.rect.x / packeryWidth
      }
    });
  }
  checkIsEnabled(tile) {
    // return tile.isEnabled == false;
    return tile.isActive == false;
  }

  /**
     * Author : Mihir Patel
     * Created-Date :  07-10-2019
     * Description : Create method for Remove tile on click of cross ison
  */
  removeTile(tileSelector) {
    this.tilesArray.forEach(tile => {
      if (tile.tileSelector == tileSelector) {
        tile.isActive = false;// tile.isEnabled = false;
      }
    });
    for (var i = 0; i < this.sequence.length; i++) {
      if (this.sequence[i].selector == tileSelector) {
        this.tileNotEnabled.push({
          tabindex: this.sequence[i].tabindex,
          position: this.sequence[i].position,
          selector: this.sequence[i].selector
        });
        this.sequence.splice(i, 1);
      }
    }
    this.noTiles = this.tilesArray.every(this.checkIsEnabled);
    setTimeout(() => {
      this.grid.remove(document.getElementById("" + tileSelector + ""));
      this.grid.layout();
      var positions = this.getItemsShiftPositions(this.grid.packer.width);
      var itemElems = this.grid.getItemElements();
      var sortOrder = [];
      for (var j = 0; j < itemElems.length; j++) {
        this.lastSequenceNumber = j + 1;
      }
      for (var k = 0; k < itemElems.length; k++) {
        sortOrder[k] = { 'tabindex': itemElems[k].getAttribute(DataItemID), 'selector': itemElems[k].getAttribute("id") };
      }
      positions.forEach(positionData => {
        sortOrder.forEach(orderData => {
          if (positionData.selector == orderData.selector) {
            positionData.tabindex = orderData.tabindex;
          }
        });
      });
      if (this.sequence.length == 0) {
        this.lastSequenceNumber = 0;
      }
      this.tilesArray.forEach(tileData => {
        positions.forEach(preferenceData => {
          if (tileData.tileSelector == preferenceData.selector) {
            tileData.sequenceNumber = parseInt(preferenceData.tabindex);
            if (this.windowWidth > 991) {
              tileData.position = preferenceData.position;
            }
          }
        });
      });
      this.localStoragePackeryArray = [];
      localStorage.setItem('widgetPosition', JSON.stringify(this.tilesArray));
      this.localStoragePackeryArray = JSON.parse(localStorage.getItem('widgetPosition'));
    }, 100);
  };
}
