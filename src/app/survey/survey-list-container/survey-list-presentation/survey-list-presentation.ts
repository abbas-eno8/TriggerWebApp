import {
  Component, OnInit, ViewChild, ViewContainerRef, ChangeDetectionStrategy, Input, ChangeDetectorRef,
  Output, EventEmitter
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
// ------------------------------------------------------------------------ //
import { SurveyPaginationPresentation } from './pagination-presentation/pagination.presentation';
import { DesktopWidth, SidebarName } from '../../../core/magic-string/common.model';
import { SurveyPresenter } from './survey-presenter/survey-presenter';
import { ResponseModel, SearchPlaceHolder, SearchSurveyFields } from '../../survey.model';
import { SurveyAccordionPresentation } from './survey-accordion-presentation/survey-accordion-presentation';
import { SurveyDesktopPresentation } from './survey-desktop-presentation/survey-desktop-presentation';
import { LoaderService } from '../../../core/loader/loader.service';


@Component({
  selector: 'trigger-survey-list-presentation',
  templateUrl: './survey-list-presentation.html',
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveyListPresentation implements OnInit {

  /** Store the flag for survey or Active Survey */
  @Input() public set isSurvey(value: boolean) {
    this._isSurvey = value;
    this.headerText = this._isSurvey ? SidebarName.Survey : SidebarName.ActiveSurvey;
    this.searchPlaceHolder = this._isSurvey ? SearchPlaceHolder.Survey : SearchPlaceHolder.ActiveSurvey;
  }

  public get isSurvey(): boolean {
    return this._isSurvey;
  }

  /** This property is used for get survey response from container component */
  @Input() public set baseResponse(baseResponse: any) {
    if (baseResponse) {
      this._baseResponse = this.surveyListPresenter.checkResponse(baseResponse);
      this.filteredSurveyList = this._baseResponse;
      if (!!this._baseResponse) {
        sessionStorage.setItem('SurveyList', JSON.stringify(this._baseResponse));
      } else {
        sessionStorage.setItem('SurveyList', '');
      }
      this.surveyListPresenter.setSurvey(this._baseResponse);
      this.createView();
      this.changeDetection.detectChanges();
    }
  }
  public get baseResponse(): any {
    return this._baseResponse;
  }

  /** get input from container and if value get true then close overlay modal popup */
  @Input() public set isDeleteSurvey(isDeleteSurvey: boolean) {
    if (isDeleteSurvey) {
      this.surveyListPresenter.closeModalPopup();
    }
  }

  /** EventEmitter for update-survey-api which we called in container page */
  @Output() public updateStatus: EventEmitter<any>;
  /** EventEmitter for delete-survey-api which we called in container page */
  @Output() public delete: EventEmitter<number>;

  @ViewChild('viewListRef', { read: ViewContainerRef, static: true }) viewListRef: ViewContainerRef;
  @ViewChild('viewPaginationRef', { read: ViewContainerRef, static: true }) viewPaginationRef: ViewContainerRef;

  /** Public Property */
  public isListViewCreated: boolean;
  public searchFields = SearchSurveyFields;
  public headerText: string;
  public searchPlaceHolder: string;

  /** This property is used for store survey's */
  protected _baseResponse: ResponseModel[];
  protected filteredSurveyList: ResponseModel[];

  private destroy: Subject<void>;
  private viewSurveyComponentRef: any;
  private viewPaginationcomponentRef: any;
  private _isSurvey: boolean;

  constructor(
    public breakpointObserver: BreakpointObserver,
    public surveyListPresenter: SurveyPresenter,
    public changeDetection: ChangeDetectorRef,
    private loaderService: LoaderService
  ) {
    this.destroy = new Subject();
    this.headerText = '';
    this.searchPlaceHolder = '';
    this.updateStatus = new EventEmitter();
    this.delete = new EventEmitter();
  }

  ngOnInit() {
    sessionStorage.setItem('CopySurvey', '');
    this.surveyListPresenter.delete$.pipe(takeUntil(this.destroy)).subscribe((surveyId: number) => {
      this.delete.next(surveyId)
    });

    this.surveyListPresenter.updateStatus$.pipe(takeUntil(this.destroy)).subscribe((survey: any) => {
      this.updateStatus.next(survey)
    });
  }

  ngOnChanges() {
    if (this.viewSurveyComponentRef) {
      this.loaderService.emitIsLoaderShown(false);
    }
  }

  public bindRecords(surveyList: any): void {
    this.filteredSurveyList = surveyList;
    this.surveyListPresenter.setSurvey(this.filteredSurveyList);
    this.createView();
  }

  private createView(): void {
    this.breakpointObserver
      .observe([DesktopWidth])
      .subscribe((state: BreakpointState) => {
        this.createViewComponent(state.matches);
      });
  }

  private createViewComponent(isDesktopView: boolean): void {
    this.viewListRef.clear();
    this.viewPaginationRef.clear();
    if (this.filteredSurveyList && this.filteredSurveyList.length > 0) {
      this.isListViewCreated = true;
      this.viewPaginationcomponentRef = this.surveyListPresenter.createPaginationView(this.viewPaginationcomponentRef, this.viewPaginationRef, SurveyPaginationPresentation);
      if (isDesktopView) {
        this.viewSurveyComponentRef = this.surveyListPresenter.createListViewPage(this.filteredSurveyList,
          this.viewSurveyComponentRef, this.viewListRef, SurveyDesktopPresentation, this._isSurvey);
      } else {
        this.viewSurveyComponentRef = this.surveyListPresenter.createListViewPage(this.filteredSurveyList,
          this.viewSurveyComponentRef, this.viewListRef, SurveyAccordionPresentation, this._isSurvey);
      }
    } else {
      this.isListViewCreated = false;
      this.viewSurveyComponentRef = this.surveyListPresenter.createNoRecordsFoundPage(this.viewSurveyComponentRef, this.viewListRef);
    }

  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}