/**
@author : Anjali Tandel
@class : TeamsDesktopPresentation
@description : TeamsDesktopPresentation is created for teams-list in desktop view.
**/
import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { RecordPerPage } from '../../../../employees/employee-model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { TeamsListPresenter } from '../../teams-list-presenter/teams-list.presenter';
import { CommonCssClass } from '../../../../core/magic-string/common.model';
import { ResponseModel } from '../../../teams-model';
import { ScrollService } from '../../../../core/services/scroll.service';

@Component({
  selector: 'trigger-teams-desktop-presentation',
  templateUrl: './teams-desktop.presentation.html',
  styleUrls: ['./teams-desktop.presentation.scss'],
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsDesktopPresentation implements OnInit {
  /** This variables created for store display column for desktop view */
  public desktopViewColumn = ['name', 'startDate', 'endDate', 'createdBy', 'managers', 'activityDays', 'status', 'action'];
  /** dataSource created for bind data-source in HTML */
  public dataSource: MatTableDataSource<any>;
  /** MatPaginator is using for Pagination which provided by Angular-material */
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  /** sparks input() store data of team-list. we are getting it from parent presentation where we dynamic created this component */
  @Input() teams: ResponseModel[];
  constructor(
    private listPresenter: TeamsListPresenter,
    public scrollService: ScrollService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.bindDataSource();
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
  public pageChanged(pageEvent): void {
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
    this.dataSource = new MatTableDataSource(this.teams);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = RecordPerPage;
    this.listPresenter.scrollTop();
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
