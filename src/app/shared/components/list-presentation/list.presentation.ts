import { Component, OnInit, ViewChild, ViewContainerRef, EventEmitter, Output, Input } from '@angular/core';
import { DesktopWidth } from '../../../core/magic-string/common.model';
import { BreakpointState } from '@angular/cdk/layout';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ListPresenter } from './list-presenter/list.presenter';
import { AccordianViewPresentation } from './accordian-view-presentation/accordian-view.presentation';
import { DesktopViewPresentation } from './desktop-view-presentation/desktop-view.presentation';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs';
import { SharedPaginationPresentation } from './pagination-presentation/pagination.presentation';
import { CustomColumn, InvokeMethod } from '../../modals/shared-model';

@Component({
  selector: '[trigger-list-ui] .h-100',
  templateUrl: './list.presentation.html',
  styleUrls: ['./list.presentation.scss']
})
export class ListPresentation implements OnInit {
  /** This property is used for current displaying team-members. */
  @Input() records: any[];
  /** This property is used for current displaying configurable columns. */
  public columns: CustomColumn[];
  public moduleType: number;
  public isListViewCreated: boolean;
  public displayActions: boolean;
  public isAccordianView: boolean;
  viewSparkcomponentRef: any;
  viewPaginationcomponentRef: any;
  @ViewChild('viewListRef', { read: ViewContainerRef, static: true }) viewListRef: ViewContainerRef;
  @ViewChild('viewPaginationRef', { read: ViewContainerRef, static: true }) viewPaginationRef: ViewContainerRef;
  /** EventEmitter for invoke method type which we called in container page */
  @Output() invokeMethod: EventEmitter<InvokeMethod> = new EventEmitter();
  /** EventEmitter for delete-team-member-api which we called in container page */
  @Output() delete: EventEmitter<any> = new EventEmitter();
  private destroy: Subject<void> = new Subject();
  constructor(
    public breakpointObserver: BreakpointObserver,
    public listPresenter: ListPresenter,
    public presenter: ListPresenter, ) {
    this.destroy = new Subject();
  }

  ngOnInit() {
    this.presenter.createView$.pipe(takeUntil(this.destroy)).subscribe(records => {
      this.records = records;
      this.createView();
    });
    this.presenter.invokeMethod$.pipe(takeUntil(this.destroy)).subscribe((invokeMethod: InvokeMethod) => {
      this.invokeMethod.next(invokeMethod);
    });
    this.presenter.delete$.pipe(takeUntil(this.destroy)).subscribe((record: any) => {
      this.delete.next(record);
    });
    this.presenter.getInstances(this.records, this.columns, this.moduleType);
    this.createView();
  }

  ngOnChanges() {
    //if (this.filterTeamMembers && this.columns) {
    //this.createView();
    //}
  }

  private createView(): void {
    if (this.columns.length > 2) {
      this.breakpointObserver
        .observe([DesktopWidth])
        .subscribe((state: BreakpointState) => {
          this.createListViewComponent(state.matches);
        });
    } else {
      this.createListViewComponent(true);
    }
  }


  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : Method for create componennt dynamically (accordian/desktop/page-not-found/pagination).
   */
  private createListViewComponent(isDesktopView: boolean): void {
    this.isAccordianView = false;
    this.viewListRef.clear();
    this.viewPaginationRef.clear();
    if (this.records && this.records.length > 0) {
      this.isListViewCreated = true;
      this.viewPaginationcomponentRef = this.listPresenter.createPaginationView(this.viewPaginationcomponentRef, this.viewPaginationRef, SharedPaginationPresentation);
      if (isDesktopView) {
        this.viewSparkcomponentRef = this.listPresenter.createListViewPage(this.viewSparkcomponentRef, this.viewListRef, DesktopViewPresentation, this.columns, this.displayActions);
      } else {
        this.viewSparkcomponentRef = this.listPresenter.createListViewPage(this.viewSparkcomponentRef, this.viewListRef, AccordianViewPresentation, this.columns, this.displayActions);
        this.isAccordianView = true;
      }
    } else {
      this.isListViewCreated = false;
      this.viewSparkcomponentRef = this.listPresenter.createNoRecordsFoundPage(this.viewSparkcomponentRef, this.viewListRef);
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 17-02-2020
   * Description : Keyup event for filtering team-members by search-text.
   */
  public searchByText(searchKeywords: string): void {
    let searchparameters = this.columns.map(x => x.property);
    this.records = this.presenter.filterRecordsBySerachText(searchKeywords, searchparameters);
    this.presenter.createDynamicView(this.isListViewCreated);
  }


  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
