import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../../../../core/services/scroll.service';
import { ListPresenter } from '../list-presenter/list.presenter';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs';

@Component({
  selector: 'trigger-desktop-view-ui',
  templateUrl: './desktop-view.presentation.html',
  styleUrls: ['./desktop-view.presentation.scss']
})
export class DesktopViewPresentation implements OnInit {
  /** This property is used for current displaying team-members. */
  public list: any[];
  /** This property is used for current displaying configurable columns. */
  public columns: any[];
  public isDisplayActions: boolean;
  private destroy: Subject<void> = new Subject();
  constructor(
    public presenter: ListPresenter,
    public scrollService: ScrollService) {
    this.destroy = new Subject();
  }

  ngOnInit() {
    this.presenter.bindRecords$.pipe(takeUntil(this.destroy)).subscribe((list: any[]) => {
      this.list = list;
    });
  }

}
