import { Component, OnInit } from '@angular/core';
import { CommonService } from '../core/services/common/common.service';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { UserModel } from '../core/model/user';
import { WorkLocation } from '../clients/client-model';
import { UpdateWorkLocation } from '../core/magic-string/common.model';
import { AssessmentDateTimeStamp } from '../shared/modals/survey-form-model';
import { DatePipe } from '@angular/common';
import { LoaderService } from '../core/loader/loader.service';

@Component({
  selector: 'trigger-user-work-location',
  templateUrl: './user-work-location.component.html',
  styleUrls: ['./user-work-location.component.scss']
})
export class UserWorkLocationComponent implements OnInit {
  /** This is a observable of calling sync API which passes the list of work-location to its presentation */
  public workLocations: WorkLocation[];
  public user: UserModel;
  public workLocationId: number;
  constructor(
    private commonService: CommonService,
    private datePipe: DatePipe,
    private loaderService: LoaderService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
  ) {
    this.loaderService.emitIsLoaderShown(true);
    this.user = this.globalResponseHandlerService.getUser();
  }

  ngOnInit() {
    this.getWorkLocations();
  }


  public getWorkLocations(): void {
    this.commonService.getWorkLocations(this.user.clientId).subscribe(
      (getResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(getResponse)) {
          this.workLocations = getResponse.data;
        }
      }
    );
  }

  public onClick(id: number): void {
    this.workLocationId = id;

  }

  public onClickSubmit(): void {
    this.updateUserWorkLocations()
  }

  public updateUserWorkLocations(): void {
    this.loaderService.emitIsLoaderShown(true);
    let currentDate = this.datePipe.transform(new Date(), AssessmentDateTimeStamp);
    let object: UpdateWorkLocation = new UpdateWorkLocation(this.user.empId, this.workLocationId, currentDate, this.user.userId)
    this.commonService.updateUserWorkLocation(object).subscribe(
      (getResponse) => {
        if (this.globalResponseHandlerService.getApiResponse(getResponse, true, true)) {
          //this.workLocations = getResponse.data;
        }
      }
    );
  }

}