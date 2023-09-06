/**
@author : Anjali Tandel
@class : TeamsListPresentation
@description : TeamsListPresentation is parent presentation for teams-module.
**/
import { Component, OnInit, ViewChild, ViewContainerRef, ChangeDetectorRef, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { DesktopWidth, NoRecordFoundViewClass, ListViewClass } from '../../../employees/spark-an-employee/spark-an-employee-model';
import { NoRecordsFoundComponent } from '../../../shared/no-records-found/no-records-found.component';
import { Subject } from 'rxjs';
import { LoaderService } from '../../../core/loader/loader.service';
import { TeamsDesktopPresentation } from './teams-desktop-presentation/teams-desktop.presentation';
import { TeamsAccordionPresentation } from './teams-accordion-presentation/teams-accordion.presentation';
import { TeamsListPresenter } from '../teams-list-presenter/teams-list.presenter';
import { TeamsSearchFieldDesktopView, TeamsSearchFieldAccrodianView, ResponseModel } from '../../teams-model';
import { takeUntil } from 'rxjs/operators';
import { canAdd } from '../../../core/services/action-permission/action-permission.service';

@Component({
  selector: 'trigger-teams-list-ui',
  templateUrl: './teams-list.presentation.html',
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsListPresentation implements OnInit {
  componentRef: any;
  @ViewChild('container', { read: ViewContainerRef, static: false }) entry: ViewContainerRef;

  // get input from container and if value get true then close overlay modal popup
  @Input() public set isInactivatedTeam(isInactivatedTeam: boolean) {
    if (isInactivatedTeam) {
      this.listPresenter.closeModalPopup();
    }
  }
  /** This property is used for get sparks response from container component */
  @Input() public set baseResponse(baseResponse: any) {
    if (baseResponse) {
      this._baseResponse = this.listPresenter.checkResponse(baseResponse);
      this.filterTeams = this._baseResponse ? this.listPresenter.checkActions(this._baseResponse) : [];
      this.desktopView();
      this.changeDetection.detectChanges();
    }
  }
  public get baseResponse(): any {
    return this._baseResponse;
  }
  /** This property is used for store sparks */
  protected _baseResponse: ResponseModel[];
  private filterTeams: ResponseModel[];
  /** searchPlaceHolder stored search-fields based on desktop-view or accrodian */
  public searchFields: string[];
  /** searchPlaceHolder stored static place-holder value for search input */
  public searchPlaceHolder: string = 'Search Teams...';
  /** containerClass stored class dynamically */
  public containerClass: string;
  private destroy: Subject<void> = new Subject();
  /** EventEmitter for delete-team-api which we called in container page */
  @Output() delete: EventEmitter<number> = new EventEmitter();
  public isTeamAddable: boolean;
  public isDesktopView: boolean;
  constructor(
    public changeDetection: ChangeDetectorRef,
    public breakpointObserver: BreakpointObserver,
    private listPresenter: TeamsListPresenter,
    private loaderService: LoaderService
  ) {
    this.destroy = new Subject();
    this.isTeamAddable = this.listPresenter.isAccesibleTeams() || this.listPresenter.checkTeamsPermission(canAdd);
  }

  ngOnInit() {
    this.listPresenter.delete$.pipe(takeUntil(this.destroy)).subscribe((teamId: number) => {
      this.delete.next(teamId)
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Create component desktop or accrodian based on minimum width.
   */
  private desktopView(): void {
    this.breakpointObserver
      .observe([DesktopWidth])
      .subscribe((state: BreakpointState) => {
        this.isDesktopView = state.matches;
        this.createComponent();
      });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Create component (desktop/accrodian/no-records-found page) dynamically based on spakrs get.
   */
  private createComponent(): void {
    this.entry.clear();
    if (this.filterTeams && this.filterTeams.length > 0) {
      this.bindListView();
    } else {
      this.containerClass = NoRecordFoundViewClass;
      this.componentRef = this.listPresenter.createNoRecordsFoundPage(this.componentRef, this.entry, NoRecordsFoundComponent);
    }
  }

  private bindListView(): void {
    let component: any;
    if (this.isDesktopView) {
      component = TeamsDesktopPresentation;
      this.containerClass = ListViewClass;
      this.searchFields = TeamsSearchFieldDesktopView;
    } else {
      this.containerClass = ListViewClass;
      this.searchFields = TeamsSearchFieldAccrodianView;
      component = TeamsAccordionPresentation;
    }
    this.componentRef = this.listPresenter.createListViewPage(this.filterTeams, this.componentRef, this.entry, component);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Close loader while component reference created and get the spark categories and classificactions which we are using in form popup modal.
   */
  ngOnChanges() {
    if (this.componentRef) {
      this.loaderService.emitIsLoaderShown(false);
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 06-09-2019
   * Description : Event for bind-records while use is searching which is called by search-presentation.
   */
  public bindRecords(spark: any): void {
    this.filterTeams = spark;
    this.createComponent();
  }

  private destroyComponent(): void {
    this.componentRef.destroy();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
