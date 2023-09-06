import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ListPresenter } from '../list-presenter/list.presenter';
import { ScrollService } from '../../../../core/services/scroll.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'trigger-accordian-view-ui',
  templateUrl: './accordian-view.presentation.html',
  styleUrls: ['./accordian-view.presentation.scss']
})
export class AccordianViewPresentation implements OnInit {
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
