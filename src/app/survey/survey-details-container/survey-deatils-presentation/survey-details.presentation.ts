import { Component, OnInit, Input, ViewChild, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { SurveyDetailsPresenter } from '../survey-details-presenter/survey-details.presenter';
import { ListPresenter } from '../../../shared/components/list-presentation/list-presenter/list.presenter';
import { LoaderService } from '../../../core/loader/loader.service';
import { ResponseModel } from '../../survey.model';
import { SortByFieldService } from '../../../shared/services/sort-by-field/sort-by-field.service';
import { ActivatedRoute } from '@angular/router';
import { UrlEncryptionDecryptionService } from '../../../core/url-encryption-decryption/url-encryption-decryption.service';
import { SurveyDeatilsAdapter } from '../../survey-adapter/survey-adapter';

@Component({
    selector: 'trigger-survey-deatils-ui',
    templateUrl: './survey-details.presentation.html',
    styleUrls: ['./survey-details.presentation.scss']
})

export class SurveyDetailsPresentation implements OnInit {
    /** This property is used for get survey-details from container component */
    @Input() public set surveyDetails(surveyDetails: any) {
        if (surveyDetails) {
            this._surveyDetails = surveyDetails;
            this.surveyDetailsPresenter.checkIsSurveyAnonymous(this._surveyDetails.data);
        }
    }
    /** This property is used for list of survey-details */
    private _surveyDetails: any;
    /** This property is used for get submitted survey list from container component */
    @Input() public set survey(survey: any) {
        if (survey) {
            this._survey = this.listPresenter.checkResponse(survey);
            this._survey = this.sortByFieldService.sortByField(this._survey, 'surveyName');
        }
    }
    @Output() getSurveyDetails: EventEmitter<number> = new EventEmitter();

    @ViewChild('container', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;

    /** This property is used for list of survey */
    public _survey: ResponseModel[];
    public selectedSurvey: string;
    public selectedSurveyName: string;
    componentRef: any;
    public isCreatedView: boolean;

    constructor(
        private adaptger: SurveyDeatilsAdapter,
        private activatedRoute: ActivatedRoute,
        public listPresenter: ListPresenter,
        public surveyDetailsPresenter: SurveyDetailsPresenter,
        private sortByFieldService: SortByFieldService,
        private loaderService: LoaderService,
        private urlEncryptionDecryptionService: UrlEncryptionDecryptionService) {
        this.selectedSurvey = this.activatedRoute.snapshot.queryParams['id'];
        this.selectedSurvey = this.urlEncryptionDecryptionService.urlDecryption(this.selectedSurvey);
    }

    ngOnInit() { }

    ngOnChanges() {
        if (this._survey && this._surveyDetails && !this.isCreatedView) {
            this._surveyDetails.data = this.surveyDetailsPresenter.removeDuplicateRecordAndMerge(this._surveyDetails.data);
            this._surveyDetails = this.adaptger.toResponse(this._surveyDetails);
            this._surveyDetails = this.listPresenter.checkResponse(this._surveyDetails);
            this.getSelectedSurvey();
            this.surveyDetailsPresenter.getRecords(this._surveyDetails);
            this.createView();
            this.loaderService.emitIsLoaderShown(false);
        }
    }

    private createView(): void {
        this.isCreatedView = true;
        this.entry.clear();
        this.componentRef = this.surveyDetailsPresenter.createListViewPage(this.componentRef, this.entry);
    }

    public onChangeSurvey(): void {
        this.loaderService.emitIsLoaderShown(true);
        this.isCreatedView = false;
        this._surveyDetails = null;
        this.getSelectedSurvey();
        this.getSurveyDetails.next(parseInt(this.selectedSurvey));
    }

    private getSelectedSurvey(): void {
        this.selectedSurveyName = this._survey.find(a => a.id === parseInt(this.selectedSurvey)).surveyName;
        this.surveyDetailsPresenter.getSelectedSurvey(this.selectedSurveyName);
    }


}

