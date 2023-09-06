/**
@author : Anjali Tandel
@class : PaginationPresentation
@description : PaginationPresentation is using in list-view.
**/
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Encryption } from '../../../../../core/magic-string/common-validation-model';
import { Pages } from '../../../../../core/magic-string/common.model';
import { GlobalEventsManager } from '../../../../../core/navbar/globalEventsManager';
import { MemberPresenter } from '../member-presenter/member.presenter';

@Component({
  selector: 'trigger-pagination-presentation',
  templateUrl: './pagination.presentation.html',
  styleUrls: ['./pagination.presentation.scss']
})
export class PaginationPresentation implements OnInit {
  /** total items get from parent component */
  public items: Array<Object>;
  public length: number;
  /** total page size options bind in HTML */
  public pageSizeOptions: number[];
  /** Currently selected page size */
  public selectedPageSize: number;
  /** Current page index based on selectedPageSize or any events occure */
  public currentPageIndex: number;
  /** First page index for current page */
  public firstPageIndex: number;
  /** Last page index for current page */
  public lastPageIndex: number;
  /** Boolean value for enabled/disabled first/previous icon based on firstPageIndex */
  public isDisabledInitialIcon: boolean;
  /** Boolean value for enabled/disabled first/previous icon based on lastPageIndex */
  public isDisabledLastIcon: boolean;
  /** Click event for pass firstPageIndex and lastPageIndex to parent component for bind records */
  @Output() paginationEvent = new EventEmitter<[number, number]>();

  constructor(
    private globalEventsManager: GlobalEventsManager,
    public presenter: MemberPresenter
  ) {
    this.pageSizeOptions = Pages;
    this.globalEventsManager.paginationEventObs.subscribe((items) => {
      if (items) {
        this.initData(items.length);
        this.globalEventsManager.pagination('');
      }
    })
  }

  ngOnInit() {
    this.initData(this.items.length);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : Created method for init variables.
   */
  private initData(iteams: number): void {
    const pageSize = parseInt(sessionStorage.getItem(Encryption.TeamMemberPageSize));
    this.length = iteams;
    this.selectedPageSize = pageSize ? pageSize : 50;
    this.pageChanged();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : Event for on change page.
   */
  public pageChanged() {
    sessionStorage.setItem(Encryption.TeamMemberPageSize, this.selectedPageSize.toString());
    this.firstPageIndex = 1;
    this.currentPageIndex = 1;
    this.getLastPageIndex();
    this.emitPaginationEvent();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : On click first page event.
   */
  public onClickFirstPage(): void {
    this.selectedPageSize = this.pageSizeOptions[0];
    this.currentPageIndex = 1;
    this.getFirstPageIndex();
    this.getLastPageIndex();
    this.emitPaginationEvent();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : On click last page event.
   */
  public onClickLastPage(): void {
    this.currentPageIndex = Math.ceil(this.length / this.selectedPageSize);
    this.firstPageIndex = ((this.currentPageIndex - 1) * this.selectedPageSize) + 1;
    this.lastPageIndex = this.length;
    this.emitPaginationEvent();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : On click previous page event.
   */
  public onClickPreviousPage(): void {
    this.currentPageIndex -= 1;
    this.getFirstPageIndex();
    this.getLastPageIndex();
    this.emitPaginationEvent();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : On click next page event.
   */
  public onClickNextPage(): void {
    this.currentPageIndex += 1;
    this.getFirstPageIndex();
    this.getLastPageIndex();
    this.emitPaginationEvent();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : Create method for get first page-index.
   */
  private getFirstPageIndex(): void {
    this.firstPageIndex = (this.currentPageIndex - 1) * this.selectedPageSize + 1;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : Create method for get last page-index.
   */
  private getLastPageIndex(): void {
    if ((this.currentPageIndex * this.selectedPageSize) > this.length) {
      this.lastPageIndex = this.length;
    } else {
      this.lastPageIndex = this.currentPageIndex * this.selectedPageSize;
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : Create method for emit paginationEvent and pass first & last page index .
   */
  public emitPaginationEvent(): void {
    this.disabledIcon();
    //this.paginationEvent.emit([this.firstPageIndex - 1, this.lastPageIndex]);
    this.presenter.teamMemberChunks(this.firstPageIndex - 1, this.lastPageIndex);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 25-02-2020
   * Description : Create method for enabled/disabled click icon (first, previous, next & last page).
   */
  private disabledIcon(): void {
    let lastPageIndex: number = Math.ceil(this.length / this.selectedPageSize);
    this.isDisabledInitialIcon = this.currentPageIndex === 1 ? true : null;
    this.isDisabledLastIcon = this.currentPageIndex === lastPageIndex ? true : null;
  }

}
