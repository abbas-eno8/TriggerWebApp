/**
@author : Anjali Tandel
@class : TeamsAccordionPresentation
@description : TeamsAccordionPresentation is created for teams-list in accordian view.
**/
import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort, PageEvent } from '@angular/material';
import { Observable ,  of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonCssClass } from '../../../../core/magic-string/common.model';
import { fromMatPaginator, paginateRows } from '../../../../employees/employee-list/employee-accordion-table/datasource-utils';
import { Records } from '../../../../employees/employee-model';
import { TeamsListPresenter } from '../../teams-list-presenter/teams-list.presenter';
import { ResponseModel } from '../../../teams-model';
import { ScrollService } from '../../../../core/services/scroll.service';

@Component({
  selector: 'trigger-teams-accordion-presentation',
  templateUrl: './teams-accordion.presentation.html',
  styleUrls: ['./teams-accordion.presentation.scss'],
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsAccordionPresentation implements OnInit {
  /** displayedRows$ is using for bind rows which provided by Angular-material */
  displayedRows$: Observable<any[]>;
  /** totalRows$ is using for bind totalRows which provided by Angular-material */
  totalRows$: Observable<number>;
  /** MatPaginator is using for Pagination which provided by Angular-material */
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  /** isExpand boolean variable is created for collapse/expand panel */
  public isExpand: boolean;
  /** sparks input() store data of team-list. we are getting it from parent presentation where we dynamic created this component */
  @Input() teams: ResponseModel[];
  constructor(private listPresenter: TeamsListPresenter,
    public scrollService: ScrollService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.bindDataSource();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Expand/collapse panel .
   */
  public expansionPanel(isExpand: boolean): void {
    this.isExpand = isExpand;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Soring spark based on property-name & bind-data-sources.
   */
  public sort(property: string): void {
    this.teams = this.listPresenter.sort(property, this.teams);
    this.bindDataSource();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Change direction-icon based on sorting-order.
   */
  public getDirecionIcon(property: string): string {
    return this.listPresenter.getDirecionIcon(property);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Bind data-source on page-changed.
   */
  public pageChanged(event: any): void {
    this.bindDataSource();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Bind data-source.
   */
  public onClickPaginationPanel(): void {
    this.listPresenter.onClickPaginationPanel();
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Bind data-source.
   */
  private bindDataSource(): void {
    const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
    const rows$ = of(this.teams);
    this.totalRows$ = rows$.pipe(map(rows => rows.length));
    this.displayedRows$ = rows$.pipe(paginateRows(pageEvents$));
    new MatTableDataSource(this.teams);
    this.listPresenter.scrollTop();
    this.paginator._intl.itemsPerPageLabel = Records;
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Click event for edit-team.
   */
  public edit(teamId: number): void {
    this.listPresenter.editTeam(teamId);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Click event for delete-team.
   */
  public delete(teamId: number): void {
    this.listPresenter.deleteTeam(teamId);
  }

}
