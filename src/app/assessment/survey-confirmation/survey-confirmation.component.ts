import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from '../../core/loader/loader.service';

@Component({
  selector: 'trigger-survey-confirmation',
  templateUrl: './survey-confirmation.component.html',
  styleUrls: ['./survey-confirmation.component.scss']
})
export class SurveyConfirmationComponent implements OnInit {
  confirm: EventEmitter<boolean> = new EventEmitter();
  /** created content for store content for display in model-popup */
  public content: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
  private loaderService: LoaderService
  ) {
    this.content = data;
    this.loaderService.emitIsLoaderShown(false);
   }

  ngOnInit() {
  }

  public onClickYes(): void {
    this.confirm.emit(true);
  }

  public onClickNo(): void {
    this.confirm.emit(false);
  }

}
