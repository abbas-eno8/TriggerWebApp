import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'trigger-active-survey-confirmation',
  templateUrl: './active-survey-confirmation.component.html',
  styleUrls: ['./active-survey-confirmation.component.scss']
})
export class ActiveSurveyConfirmationComponent implements OnInit {
  
  @Input() data: any;
  
  @Output() update = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit() {

  }

  public onClickCancel(): void {
    this.cancel.emit(true);
  }

  public onClickSubmit(): void {
    this.update.emit(true);
  }

}
