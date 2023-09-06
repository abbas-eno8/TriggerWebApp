/**
 * @author Shahbaz Shaikh
 * DraftEvalutionPresentationComponent
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// --------------------------------------------------- //
import { DraftEvalutionPresenter } from '../draft-evalution-presenter/draft-evalution.presenter';
import { SearchPipePipe } from '../../../shared/pipes/search-pipe.pipe';
import { SearchFields } from '../../draft-evaluation.model';


@Component({
  selector: 'trigger-draft-evalution-ui',
  templateUrl: './draft-evalution.presentation.html',
  viewProviders: [DraftEvalutionPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftEvalutionPresentationComponent implements OnInit, OnDestroy {

  /** This property is used for get data from container component */
  @Input() public set evaulationDraftList(value: any) {
    if (value) {
      this._evaulationDraftList = value;
      this.noRecordsFound = this.cheackNoRecordsFound(this._evaulationDraftList);
      this.evaulationList = this.draftEvalutionPresenter.setEvaulationDraftList(this._evaulationDraftList);
      this.evaulationListSearch = this.draftEvalutionPresenter.evaluationDraftList;
    }
  }
  public get evaulationDraftList(): any {
    return this._evaulationDraftList;
  }

  /** This property is used for get data from container component */
  @Input() public set deleteEvaluationList(value: any) {
    if (value) {
      this._deleteEvaluationList = value;
      this.draftEvalutionPresenter.updateDeletedEvaluation();
    }
  }
  public get deleteEvaluationList(): any {
    return this._deleteEvaluationList;
  }

  /** This property is used for get data from container component */
  @Input() public set emailPreview(value: any) {
    if (value) {
      this._emailPreview = value;
      this.draftEvalutionPresenter.openPublishModal(this._emailPreview);
    }
  }
  public get emailPreview(): any {
    return this._emailPreview;
  }

  /** This property is used for get data from container component */
  @Input() public set scoreCardDetails(value: any) {
    if (value) {
      this._scoreCardDetails = value;
      this.draftEvalutionPresenter.redirectToTruvelopScore(this._scoreCardDetails);;
    }
  }
  public get scoreCardDetails(): any {
    return this._scoreCardDetails;
  }

  /**  Event emitter is used for emit data to container component */
  @Output() public deleteEvaluation: EventEmitter<any>;
  /**  Event emitter is used for emit data to container component */
  @Output() public getEmailPreview: EventEmitter<any>;
  /**  Event emitter is used for emit data to container component */
  @Output() public publishEvalution: EventEmitter<any>;

  /** Store the pageTitle */
  public pageTitle: string
  /** Store the evaluation list */
  public evaulationList: any;
  /** Check wether image or not */
  public isSrcValid: boolean;
  /** Store the evaluation list search */
  public evaulationListSearch: any;
  /** Check wether evaluation length */
  public noRecordsFound: boolean;
  /** Store the search text */
  public _searchText: string;

  /** Store Evaulation Draft List */
  private _evaulationDraftList: any;
  /** Store the delete evaulaution list */
  private _deleteEvaluationList: any;
  /** Store the email preview data */
  private _emailPreview: any;
  /** Store the score card details */
  private _scoreCardDetails: any;
  /** destroy  */
  private destroy: Subject<boolean>;
  private searchFields: string[];

  constructor(
    private draftEvalutionPresenter: DraftEvalutionPresenter,
    private searchPipePipe: SearchPipePipe,
    private cdr: ChangeDetectorRef
  ) {
    this.setProperty();
  }

  public ngOnInit() {
    this.initProperty();
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 22-03-2022
   * Description : For search name of commented user on comment section
   */
  get searchText() {
    return this._searchText;
  }
  set searchText(search: string) {
    this._searchText = search;
    this.evaulationList = this.searchText ? this.searchPipePipe.transform(this.evaulationListSearch, this.searchText, this.searchFields) : this.evaulationListSearch;
  }

  /**
   * Author : Shahbaz Shaikh
   * Modified-Date : 22-03-2022
   * @param index 
   * @param item 
   * @returns 
   */
  public trackByFn(index, item) {
    return item.assessmentId;
  }

  /**
  * Author : Shahbaz Shaikh
  * Modified-Date :  21-03-2022
  * Description : For show short name of user if image not get from server
  */
  public onError(): void {
    this.isSrcValid = true;
  }

  /**
   * Author : Shahbaz Shaikh
   * Edit the evaluation
   * @param evaluation Get the evaluation
   */
  public edit(evaluation: any): void {
    this.draftEvalutionPresenter.editEvaluation(evaluation);
  }

  /**
   * Author : Shahbaz Shaikh
   * Delete the Evaluation
   * @param evaluation Get the evaluation
   */
  public delete(evaluation: any): void {
    this.draftEvalutionPresenter.deleteEvaluations(evaluation);
  }

  /**
   * Author : Shahbaz Shaikh
   * Preview evaluation Attachment
   * @param evaluation Get the evaluation
   * @param modelName Get the attachment model
   */
  public preview(evaluation, modelName): void {
    this.draftEvalutionPresenter.preview(evaluation, modelName);
  }

  /**
   * Author : Shahbaz Shaikh
   * Publish Evaluation
   * @param evalution Get the evaluation
   */
  public onPublishEvaultion(evalution): void {
    this.draftEvalutionPresenter.saveEvaultion(evalution);
  }

  /** Private Method */
  /** Initializes default properties for the component */
  private setProperty(): void {
    this.destroy = new Subject();
    this.searchFields = SearchFields;
    this.isSrcValid = false;
    this.deleteEvaluation = new EventEmitter();
    this.getEmailPreview = new EventEmitter();
    this.publishEvalution = new EventEmitter();
  }

  /** After Init Prop */
  private initProperty(): void {
    this.draftEvalutionPresenter.updatedEvaluation$.pipe(takeUntil(this.destroy)).subscribe((updatedEvaluation) => {
      this.evaulationList = [...updatedEvaluation];
      this.cdr.markForCheck();
    });

    this.draftEvalutionPresenter.deleteEvaluation$.pipe(takeUntil(this.destroy)).subscribe((deleteEvaluation) => {
      this.deleteEvaluation.emit(deleteEvaluation);
    });

    this.draftEvalutionPresenter.emailPreview$.pipe(takeUntil(this.destroy)).subscribe((respose) => {
      this.getEmailPreview.emit(respose);
    });

    this.draftEvalutionPresenter.publishEvalution$.pipe(takeUntil(this.destroy)).subscribe((response) => {
      this.publishEvalution.emit(response);
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Check the lenght of arrays
   * @param evaluationList Get teg Evaluation list array
   * @returns 
   */
  private cheackNoRecordsFound(evaluationList): boolean {
    if (evaluationList.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  /** destroy */
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
