import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
// ----------------------------------------------------- //
import { SurveyPresenter } from '../survey-presenter/survey-presenter';
import { ResponseModel, ResponseModelActive, SurvetAccordionHeaderFields } from '../../../survey.model';

@Component({
  selector: 'trigger-survey-accordion-presentation',
  templateUrl: './survey-accordion-presentation.html',
  styleUrls: ['./survey-accordion-presentation.scss']
})
export class SurveyAccordionPresentation implements OnInit {

  public isSurvey: boolean;
  public filterSurvey: ResponseModel[] | ResponseModelActive[];
  private destroy: Subject<void>;
  public accordionHeader: any;

  constructor(
    public presenter: SurveyPresenter
  ) {
    this.destroy = new Subject();
    this.accordionHeader = SurvetAccordionHeaderFields;
  }

  ngOnInit() {
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
