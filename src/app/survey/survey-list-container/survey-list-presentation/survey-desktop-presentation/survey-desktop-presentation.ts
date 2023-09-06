import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
// ------------------------------------------------------- //
import { SurveyPresenter } from '../survey-presenter/survey-presenter';
import { ScrollService } from '../../../../core/services/scroll.service';
import { ActiveSurvetDesktopHeaderFields, ResponseModel, ResponseModelActive, SurvetDesktopHeaderFields } from '../../../survey.model';

@Component({
  selector: 'trigger-survey-desktop-presentation',
  templateUrl: './survey-desktop-presentation.html',
  styleUrls: ['./survey-desktop-presentation.scss']
})
export class SurveyDesktopPresentation implements OnInit {

  public isSurvey: boolean;
  public filterSurvey: ResponseModel[] | ResponseModelActive[];
  public desktopHeader: any;
  private destroy: Subject<void>;

  constructor(
    public presenter: SurveyPresenter,
    public scrollService: ScrollService
  ) {
    this.destroy = new Subject();
  }

  ngOnInit() {
    this.desktopHeader = this.isSurvey ? SurvetDesktopHeaderFields : ActiveSurvetDesktopHeaderFields;
    this.presenter.bindRecords$.pipe(takeUntil(this.destroy)).subscribe((surveys: ResponseModel[] | ResponseModelActive[]) => {
      this.filterSurvey = surveys;
    });
  }

  ischangeStatus(event, surveyId, surveyName) {
    this.presenter.ischangeStatus(event, surveyId, this.filterSurvey, surveyName)
  }

  isCheckAndDisableToggle(data) {
    return this.presenter.isCheckAndDisableToggle(data);
  }
}
