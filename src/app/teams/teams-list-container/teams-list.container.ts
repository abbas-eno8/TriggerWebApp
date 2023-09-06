/**
@author : Anjali Tandel
@class : TeamsListContainer
@description : TeamsListContainer is parent presentation for team-list-module.
**/
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../core/loader/loader.service';
import { TeamsService } from '../teams-service/teams.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';

@Component({
  selector: 'trigger-teams-list-container',
  templateUrl: './teams-list.container.html'
})
export class TeamsListContainer implements OnInit {
  /** This is a observable of calling sync API which passes the list of teams to its presentation */
  public baseResponse$: Observable<any> = this.teamsService.getTeams(this.globalResponseHandlerService.getUser().clientId); //1035
  public isInactivatedTeam: boolean;
  constructor(
    private teamsService: TeamsService,
    private loaderService: LoaderService,
    private globalResponseHandlerService: GlobalResponseHandlerService, ) {
    this.loaderService.emitIsLoaderShown(true);
  }
  ngOnInit() { }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Description : This Method is invoke when user inactie team from server.
   */
  public deleteTeam(teamId: number): void {
    this.isInactivatedTeam = false;
    this.teamsService.inactiveTeam(this.globalResponseHandlerService.getUser().clientId, teamId, this.globalResponseHandlerService.getUser().userId).subscribe(
      (deletetSparkResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(deletetSparkResponse, true, false)) {
          this.baseResponse$ = this.teamsService.getTeams(this.globalResponseHandlerService.getUser().clientId); //1035
          this.isInactivatedTeam = true;
        }
      }
    );
  }

}
