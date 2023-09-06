import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
// ---------------------------------------------------- //
import { SurveyService } from '../survey-service/survey.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { UserModel } from '../../core/model/user';
import { RouteUrl } from '../../core/magic-string/common.model';
import { LoaderService } from '../../core/loader/loader.service';

@Component({
  selector: 'trigger-survey-list-container',
  templateUrl: './survey-list-container.html'
})
export class SurveyListContainer implements OnInit {

  /** Store flag for survey or active survey */
  public isSurvey: boolean;
  /** This is a observable of calling sync API which passes the list of survey list to its presentation */
  public baseResponse$: Observable<any>;
  public isDeleteSurvey: boolean;

  /** Store user data */
  private userData: UserModel;

  constructor(
    private surveyService: SurveyService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private router: Router
  ) {
    this.userData = this.globalResponseHandlerService.getUser();
    this.loaderService.emitIsLoaderShown(true);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let url = event.url;
        let selectedUrl = url.split('/');
        const selectedRoute = selectedUrl[1];
        this.isSurvey = selectedRoute === RouteUrl.Survey ? true : false;
        if (this.isSurvey) {
          this.getSurvey();
        } else {
          this.getActiveSurvey();
        }
      }
    });
  }

  public ngOnInit() {
  }

  public deleteSurvey(surveyId: number): void {
    this.isDeleteSurvey = false;
    this.surveyService.deleteSurvey(this.userData.clientId, surveyId, this.userData.userId).subscribe(
      (deletetSurveyResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(deletetSurveyResponse, true, false)) {
          this.getSurvey();
          this.isDeleteSurvey = true;
        }
      }
    );
  }

  public updateStatus(survey: any): void {
    if (survey.isSubmit) {
      this.surveyService.updatestatus(survey, this.userData.clientId).subscribe(
        (survey) => {
          if (this.globalResponseHandlerService.getApiResponse(survey, true)) {
            this.getSurvey();
          }
        }
      );
    } else {
      this.getSurvey();
    }
  }

  private getSurvey(): void {
    this.baseResponse$ = this.surveyService.getSurvey(this.userData.clientId);
  }

  private getActiveSurvey(): void {
    this.baseResponse$ = this.surveyService.getActiveSurvey(this.userData.empId);
  }
}
