import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'trigger-teams-mobile-widget',
  templateUrl: './teams-mobile-widget.component.html',
  styleUrls: ['./teams-mobile-widget.component.scss']
})
export class TeamsMobileWidgetComponent implements OnInit {
  @Input() avgScoreByDayScore: string;
  @Input() aveargeScoreByDaypageTitle: string;
  @Input() aveargeScoreByDayClass: string;

  @Input() teamAvgScore: string;
  @Input() teamAvgscorepageTitle: string;
  @Input() teamAvgscoreClass: string;
  @Input() selectedYearBinding: string;

  public bgTeamAvgscoreClass: string;
  public bgavgScoreByDayClass: string;
  constructor() { }

  ngOnInit() {


  }
  getbackgroundClassOfAvgScore() {
    if (!!this.teamAvgScore) {
      this.bgTeamAvgscoreClass = 'bg' + this.teamAvgscoreClass.split('text')[1];
    } else {
      this.teamAvgScore = '-'
      this.bgTeamAvgscoreClass = 'bg-dark';
    }    
    return this.bgTeamAvgscoreClass;
  }

  getbackgroundClassOfAvgScoreByDay() {
    if (!!this.avgScoreByDayScore) {      
      this.bgavgScoreByDayClass = 'bg' + this.aveargeScoreByDayClass.split('text')[1];
    } else {
      this.avgScoreByDayScore = '-'
      this.bgavgScoreByDayClass = 'bg-dark';
    }
    return this.bgavgScoreByDayClass;
  }

}
