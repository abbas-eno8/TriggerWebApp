import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiStepWizardComponent } from './multi-step-wizard.component';
import { Class } from '../excel-upload-model';
import { ExcelUploadPresenter } from '../excel-upload-presenter/excel-upload.presenter';
describe('MultiStepWizardComponent', () => {
  let component: MultiStepWizardComponent;
  let fixture: ComponentFixture<MultiStepWizardComponent>;
  let wizardId: number = 1,
    wizardClass: string = Class.ExcelRemainStep,
    DisplayNumber: number = 0;
    let presenter;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiStepWizardComponent],
      providers: [
        { provide: ExcelUploadPresenter, useValue: presenter }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiStepWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // describe("ngOnInit", () => {
  //   it('should be create ngOnInit()', () => {
  //     expect(component.ngOnInit).toBeTruthy();
  //   });

  //   it('should be check ngOnInit() work properly', () => {
  //     spyOn(component, 'changeClass');
  //     component.ngOnInit();
  //     expect(component.changeClass).toHaveBeenCalledWith(1);
  //   });
  // })

  // describe("changeClass", () => {
  //   it("should be create changeClass()", () => {
  //     expect(component.changeClass).toBeTruthy();
  //   });

  //   it("should be check excelStepNumber equals to value", () => {
  //     expect(component.currentStep).toBe(1);
  //   });

  //   it("should be check for active step", () => {
  //     expect(1).toBe(component.currentStep);
  //     //expect('primary-rounded round-inprogress d-flex align-items-center justify-content-center').toBe(Class.ExcelActive);
  //   });

  //   it("should be check for complete step", () => {
  //     expect(0).toBeLessThan(component.currentStep);
  //     //expect('primary-rounded round-active icon-right d-flex align-items-center justify-content-center').toBe(Class.ExcelComplete);
  //     //expect(DisplayNumber).toBe(0);
  //   });

  //   it("should be check for remain step", () => {
  //     expect(2).toBeGreaterThan(component.currentStep);
  //   });
  // })
});
