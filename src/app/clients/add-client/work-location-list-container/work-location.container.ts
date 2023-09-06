import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { UserModel } from '../../../core/model/user';
import { AddClientService } from '../add-client-service/add-client.service';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from '../../../core/magic-string/common.model';
import { WorkLocation } from '../../client-model';
import { ActivatedRoute } from '@angular/router';
import { UrlEncryptionDecryptionService } from '../../../core/url-encryption-decryption/url-encryption-decryption.service';
import { CommonService } from '../../../core/services/common/common.service';
@Component({
  selector: 'trigger-work-location-list-container',
  templateUrl: './work-location.container.html'
})
export class WorkLocationContainer implements OnInit {
  @Input() isAddClient: boolean;
  @Output() getDefaultWorkLocations: EventEmitter<WorkLocation[]> = new EventEmitter();
  public user: UserModel;
  public isDeletedRecordId: number;
  /** This is a observable of calling sync API which passes the list of work-location to its presentation */
  public workLocationsObs$: Observable<ApiResponse>;
  public updatObject: WorkLocation;
  constructor(
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private workLocationService: AddClientService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService) {
    this.user = this.globalResponseHandlerService.getUser();
  }

  ngOnInit() {
    let encryptedKey = this.activatedRoute.snapshot.queryParams['id'];
    let clientId = parseInt(this.urlEncryptionDecryptionService.urlDecryption(encryptedKey));
    if (clientId > 0) {
      this.getWorkLocations();
    }
  }

  public getWorkLocations() {
    this.workLocationsObs$ = this.commonService.getWorkLocations(this.user.clientId);
  }

  public getDefaultWorkLocationsEvent(object: WorkLocation[]): void {
    this.getDefaultWorkLocations.emit(object);
  }

  public add(object: WorkLocation): void {
    this.updatObject = null;
    this.workLocationService.addWorkLocation(this.user.clientId, object).subscribe(
      (addResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(addResponse, true, false)) {
          let addObject = new WorkLocation(addResponse.data.workLocationId, object.workLocation);
          this.updatObject = addObject;
        }
      }
    );
  }

  public edit(object: WorkLocation): void {
    this.updatObject = null;
    this.workLocationService.updateWorkLocation(this.user.clientId, object).subscribe(
      (updateResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(updateResponse, true, false)) {
          let updateObject = new WorkLocation(object.workLocationId, object.workLocation);
          this.updatObject = updateObject;
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 18-05-2020
   * Description : Create event-method for invoke server call for delete reactions for spark/comment/reply.
   */
  public delete(id: number): void {
    this.isDeletedRecordId = 0;
    this.workLocationService.deleteWorkLocation(this.user.clientId, id, this.user.userId).subscribe(
      (deleteReaction) => {
        if (this.globalResponseHandlerService.getApiResponse(deleteReaction)) {
          this.isDeletedRecordId = id;
        } else {
          this.globalResponseHandlerService.closeMaterialPopup();
        }
      }
    );
  }
}
