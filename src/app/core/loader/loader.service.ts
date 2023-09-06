/**
 * @author Mihir Patel
 * @class  LoaderService
 * This service handles an observable subject which accepts a boolean that is responsible to toggling the spinner on the UI. This service is
 * used is app.component to toggle the spinner.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()

export class LoaderService {
  // An observable to toggle spinner.
  public isLoaderShown: Subject<boolean>;
  
  constructor(
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.isLoaderShown = new Subject<boolean>();
  }

  //  For track loader true or false :
  public emitIsLoaderShown(status) {
    if (status) {
      this.spinnerService.show();
    } else {
      this.spinnerService.hide();
    }
    this.isLoaderShown.next(status);
  }
}
