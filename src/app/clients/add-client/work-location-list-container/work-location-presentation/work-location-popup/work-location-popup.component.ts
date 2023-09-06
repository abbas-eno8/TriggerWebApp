import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { WorkLocation, EnterWorkLocation } from '../../../../client-model';
import { LoaderService } from '../../../../../core/loader/loader.service';
import { ToasterService } from 'angular2-toaster';
import { Error_Type, Error_Title } from '../../../../../core/magic-string/common.model';
import { GlobalResponseHandlerService } from '../../../../../core/global-response-handler/global-response-handler';
import { UserModel } from '../../../../../core/model/user';
import { AlphabaticNumeric } from '../../../../../core/magic-string/Regex-pattern';

@Component({
  selector: 'trigger-work-location-popup',
  templateUrl: './work-location-popup.component.html'
})
export class WorkLocationPopupComponent implements OnInit {
  // Output cancel emitter for cancel overlay popup
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();
  // Output update emitter for update value overlay popup
  @Output() submit: EventEmitter<WorkLocation> = new EventEmitter();
  public workLocation: string;
  public pageTitle: string;
  public workLocationObject: WorkLocation;
  public user: UserModel;
  public pattern: any;
  @Input() data: any;
  constructor(
    private loaderService: LoaderService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private toasterService: ToasterService) {
    this.user = this.globalResponseHandlerService.getUser();
    this.pattern = AlphabaticNumeric;

  }

  ngOnInit() {
    this.workLocation = this.data.record.workLocation;
    this.pageTitle = this.data.pageTitle;
  }

  public onClickCancelButton(): void {
    this.cancel.emit(true);
  }

  public onClickSubmitButton(): void {
    if (this.workLocation && this.workLocation.trim()) {
      this.loaderService.emitIsLoaderShown(true);
      this.workLocationObject.workLocation = this.workLocation;
      if (this.workLocationObject.workLocationId > 0) {
        this.workLocationObject.updatedBy = this.user.userId;
      } else {
        this.workLocationObject.createdBy = this.user.userId;
      }
      this.submit.emit(this.workLocationObject);
    } else {
      this.toasterService.pop(Error_Type, Error_Title, EnterWorkLocation);
    }
  }
}
