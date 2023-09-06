import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoaderService } from '../../../../core/loader/loader.service';

@Component({
  selector: 'trigger-create-survey-confirmation',
  templateUrl: './create-survey-confirmation.component.html'
})
export class CreateSurveyConfirmationComponent implements OnInit {
  @Output() update = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();
  constructor(private loaderService: LoaderService,) { }

  ngOnInit() {
  }

  public onClickCancel(): void {
    this.cancel.emit(true);
  }

  public onClickSubmit(): void {
    // this.loaderService.emitIsLoaderShown(true);
    this.update.emit(true);
  }
}
