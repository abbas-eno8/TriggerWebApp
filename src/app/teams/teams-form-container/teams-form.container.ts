/**
@author : Anjali Tandel
@class : TeamsFormContainer
@description : TeamsFormContainer is parent presentation for team-form-module.
**/
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { ApiResponse } from '../../employees/spark-an-employee/spark-an-employee-model';
import { TeamsService } from '../teams-service/teams.service';
import { LoaderService } from '../../core/loader/loader.service';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsResponseModel, TeamsRequestModel } from '../teams-model';
import { Route } from '../../core/magic-string/common.model';

@Component({
  selector: 'trigger-teams-form-container',
  templateUrl: './teams-form.container.html'
})
export class TeamsFormContainer implements OnInit {
  /** This is a observable of calling sync API which passes the list of teams-manager to its presentation */
  public teamManagers$: Observable<ApiResponse> = this.teamsService.getManagers(this.globalResponseHandlerService.getUser().clientId);
  /** This is a observable of calling sync API which passes the list of teams-members to its presentation */
  public teamMembers$: Observable<ApiResponse> = this.teamsService.getNonManagers(this.globalResponseHandlerService.getUser().clientId);
  /** This is a observable of calling sync API which passes the get team-details based on team-id to its presentation */
  public getTeamById$: Observable<ApiResponse>;
  constructor(
    private router: Router,
    private teamsService: TeamsService,
    private activatedRoute: ActivatedRoute,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private loaderService: LoaderService) {
    this.loaderService.emitIsLoaderShown(true);
  }

  ngOnInit() {
    /** This is a observable of calling sync API which passes the get team-details based on team-id to its presentation */
    let teamId = parseInt(this.urlEncryptionDecryptionService.urlDecryption(this.activatedRoute.snapshot.queryParams['id']));
    if (teamId > 0) {
      this.getTeamById$ = this.teamsService.getTeamById(this.globalResponseHandlerService.getUser().clientId, teamId);
    }
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Description : This Method is invoke when user add team from server..
   */
  public addTeam(team: TeamsRequestModel): void {
    this.teamsService.addTeam(team, this.globalResponseHandlerService.getUser().clientId).subscribe(
      (sparkAnEmployee) => {
        if (this.globalResponseHandlerService.getApiResponse(sparkAnEmployee, true)) {
          this.router.navigate([Route.Team]);
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 19-09-2019
   * Description : This Method is invoke when user update team from server.
   */
  public updateTeam(team: TeamsRequestModel): void {
    this.teamsService.updateTeam(team, this.globalResponseHandlerService.getUser().clientId).subscribe(
      (updateSparkAnEmployee) => {
        if (this.globalResponseHandlerService.getApiResponse(updateSparkAnEmployee, true)) {
          this.router.navigate([Route.Team]);
        }
      }
    );
  }

}
