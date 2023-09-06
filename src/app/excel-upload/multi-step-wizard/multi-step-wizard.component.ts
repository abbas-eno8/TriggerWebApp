/**
@author : Anjali Tandel
@class : MultiStepWizardComponent
@description :MultiStepWizardComponent is a child component of ExcelUploadComponent is created for muulti-step-wizard.
**/
import { Component, OnInit } from '@angular/core';
import { Class } from '../excel-upload-model';
import { ExcelUploadPresenter } from '../excel-upload-presenter/excel-upload.presenter';

@Component({
  selector: '[trigger-multi-step-wizard] .d-flex .justify-content-center .wizard-container .flex-column-sm .flex-wrap',
  templateUrl: './multi-step-wizard.component.html',
  styleUrls: ['./multi-step-wizard.component.scss']
})
export class MultiStepWizardComponent implements OnInit {
  public wizardSteps: any[] = []
  private currentStep: number;
  constructor(private presenter: ExcelUploadPresenter) {
    this.currentStep = 1;
    this.wizardSteps = [
      { id: 1, DisplayNumber: 1, display: 'Step One', title: 'Step1', class: Class.ExcelRemainStep },
      { id: 2, DisplayNumber: 2, display: 'Step Two', title: 'Step2', class: Class.ExcelRemainStep },
      { id: 3, DisplayNumber: 3, display: 'Step Three', title: 'Step3', class: Class.ExcelRemainStep },
      { id: 4, DisplayNumber: 4, display: 'Step Four', title: 'Step4', class: Class.ExcelRemainStep },
    ]
    this.changeClass(1);
  }

  ngOnInit() {
    this.presenter.changeWizard$.pipe().subscribe((currentStep: number) => {
      this.currentStep = currentStep;
      this.changeClass(this.currentStep);
    });
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  11-12-2018
  * Descriotion : Create function for wizard-multi-steps
  */
  private changeClass(value: number): void {
    this.currentStep = value;
    this.wizardSteps.forEach(wizard => {
      if (wizard.id === this.currentStep) {
        wizard.class = Class.ExcelActive;
      }
      if (wizard.id < this.currentStep) {
        wizard.class = Class.ExcelComplete;
        wizard.DisplayNumber = '';
      } else {
        wizard.DisplayNumber = wizard.id;
      }
      if (wizard.id > this.currentStep) {
        wizard.class = Class.ExcelRemainStep;
      }
    })
  }
}
