import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class CustomLoaderService {
  // An observable to toggle custom-spinner.
  public isCustomLoaderShow: Subject<boolean>;
  constructor() { 
    this.isCustomLoaderShow = new Subject<boolean>();
  }

   //  For track loader true or false :
  public setLoaderStatus(status) {
    this.isCustomLoaderShow.next(status);
  }
}
