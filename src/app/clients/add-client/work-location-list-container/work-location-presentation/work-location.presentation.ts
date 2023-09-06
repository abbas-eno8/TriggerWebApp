import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ListPresenter } from '../../../../shared/components/list-presentation/list-presenter/list.presenter';
import { WorkLocationPresenter } from '../work-location-presenter/work-location.presenter';
import { WorkLocation, SearchParameter } from '../../../../clients/client-model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SearchPipePipe } from '../../../../shared/pipes/search-pipe.pipe';
@Component({
  selector: 'trigger-work-location-list-ui',
  templateUrl: './work-location.presentation.html',
  styleUrls: ['./work-location.presentation.scss'],
  providers: [WorkLocationPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkLocationPresentation implements OnInit {
  /** This property is used for get sparks response from container component */
  @Input() public set workLocationsObs(baseResponse: any) {
    if (baseResponse) {
      this._workLocations = this.listPresenter.checkResponse(baseResponse);
      this.workLocations = this._workLocations;
    }
  }
  public get workLocationsObs(): any {
    return this._workLocations;
  }
  /** This property is used for store sparks */
  protected _workLocations: WorkLocation[];
  /** This property is used for store sparks */
  public workLocations: WorkLocation[];
  public isNoRecordFound: boolean;
  //private defaultWorkLocations: WorkLocationList[];
  @Output() add: EventEmitter<WorkLocation> = new EventEmitter();
  @Output() edit: EventEmitter<WorkLocation> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() getDefaultWorkLocationsEvent: EventEmitter<WorkLocation[]> = new EventEmitter();
  private destroy: Subject<void> = new Subject();
  @Input() isAddClient: boolean;
  @Input() isDeletedRecordId: number;
  @Input() updatObject: WorkLocation;
  @Input() defaultWorkLocations: WorkLocation[];
  public searchText: string;
  constructor(
    public listPresenter: ListPresenter,
    private presenter: WorkLocationPresenter,
    private searchPipePipe: SearchPipePipe,
  ) {
    this.destroy = new Subject();
  }

  ngOnInit() {
    this.defaultWorkLocations = [];
    this.presenter.add$.pipe(takeUntil(this.destroy)).subscribe((object: WorkLocation) => {
      if (this.isAddClient) {
        if (object.workLocationId === 0) {
          if (!this._workLocations) {
            object.workLocationId = 1
          } else {
            object.workLocationId = (this._workLocations.length + 1);
          }
        }
        this.updatObject = new WorkLocation(object.workLocationId, object.workLocation);
        this.updateLocations();
      } else {
        this.add.emit(object);
      }
    });
    this.presenter.edit$.pipe(takeUntil(this.destroy)).subscribe((object: WorkLocation) => {
      this.updatObject = new WorkLocation(object.workLocationId, object.workLocation);
      this.isAddClient ? this.updateLocations() : this.edit.emit(object);
    });
    this.presenter.delete$.pipe(takeUntil(this.destroy)).subscribe((id: number) => {
      this.isAddClient ? this.deleteLocations(id) : this.delete.emit(id);
    });
  }

  ngOnChanges() {
    if (this.isDeletedRecordId && this.isDeletedRecordId > 0) {
      this.deleteLocations(this.isDeletedRecordId);
    }
    if (this.updatObject) {
      this.updateLocations();
    }
  }


  private deleteLocations(id: number): void {
    let ifExist = this.workLocations.find(w => w.workLocationId === id);
    if (ifExist) {
      const index: number = this._workLocations.indexOf(ifExist);
      if (index !== -1) {
        this.workLocations.splice(index, 1);
        this._workLocations = this.workLocations;
        this.filterRecordsBySerachText(this.searchText);
      }
      if (this.isAddClient) {
        this.defaultWorkLocations.splice(index, 1);
        this.getDefaultWorkLocationsEvent.emit(this.defaultWorkLocations);
      }
      this.presenter.closeDeletePopup();
      this.isDeletedRecordId = 0;
    }
  }

  private updateLocations(): void {
    if (!this._workLocations) {
      this._workLocations = [];
    }
    let ifExist = this._workLocations.find(w => w.workLocationId === this.updatObject.workLocationId);
    if (ifExist) {
      ifExist.workLocation = this.updatObject.workLocation;
    } else {
      this._workLocations.splice(0, 0, this.updatObject);
      this.workLocations = this._workLocations;
      if (this.isAddClient) {
        this.defaultWorkLocations.splice(0, 0, this.updatObject);
      }
    }

    if (this.isAddClient) {
      this.getDefaultWorkLocationsEvent.emit(this.defaultWorkLocations);
    }
    this.presenter.closeOverlay();

    this.updatObject = null;
  }

  public openAddLocationPopup(): void {
    let object = new WorkLocation(0, '', 0, 0);
    this.presenter.openWorkLocationPopup(object, this.workLocations);
  }

  public editLocationPopup(location: WorkLocation): void {
    let object = new WorkLocation(location.workLocationId, location.workLocation);
    this.presenter.openWorkLocationPopup(object, this.workLocations);
  }

  public deletePopup(id: number): void {
    this.presenter.deletePopup(id, this.workLocations);
  }

  public filterRecordsBySerachText(searchText: string): void {
    this.searchText = searchText;
    let records: WorkLocation[] = searchText === '' ? this.workLocations : this.searchPipePipe.transform(this.workLocations, searchText, SearchParameter);
    this.createNoRecordFoundView(records);
    this._workLocations = records;
  }

  private createNoRecordFoundView(location: WorkLocation[]): void {
    this.isNoRecordFound = location.length === 0 ? true : false;
  }

}
