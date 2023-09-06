import { Component, OnInit, Input } from '@angular/core';
import { ListPresenter } from '../list-presenter/list.presenter';

@Component({
  selector: 'trigger-actions-ui',
  templateUrl: './actions.presentation.html',
  styleUrls: ['./actions.presentation.scss']
})
export class ActionsPresentation implements OnInit {
  /** This property is used for current displaying team-members. */
  @Input() record: any;
  constructor(public presenter: ListPresenter) { }

  ngOnInit() {
  }

}
