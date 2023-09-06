import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';

@Component({
  selector: 'trigger-team-widget',
  templateUrl: './team-widget.component.html'
})
export class TeamWidgetComponent implements OnInit {
  public score: string;
  public description: string;
  public scoreClass: string;
  public roleId: number;
  public pageTitle: string;
  public selectedYearBinding: string;
  @Output() removeTile = new EventEmitter<string>();
  constructor(private globalResponseHandlerService: GlobalResponseHandlerService) {
    this.roleId = this.globalResponseHandlerService.getUser().roleId;
  }

  ngOnInit() {
  }
  
  onclickremoveTile() {
    this.removeTile.emit(this.description);
  }

}