import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcelReviewEmployeesComponent } from './excel-review-employees.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';;

describe('ExcelReviewEmployeesComponent', () => {
  let component: ExcelReviewEmployeesComponent;
  let fixture: ComponentFixture<ExcelReviewEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelReviewEmployeesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelReviewEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should be create ngOnInit()', () => {
      expect(component.ngOnInit).toBeTruthy();
    });

    it('should be check ngOnInit() work properly', () => {
      component.ngOnInit();
    });
  });

  describe("should test output emitter with subscriber", () => {

    it('should test the clickOnSkip emitter with a simple subscribe', async(() => {
      component.reviewMismatchData.subscribe(event => {
        expect(event)
      });
    }));

    it('should test the clickOnReviewNewEmployee emitter with a simple subscribe', async(() => {
      component.reviewNewEmployees.subscribe(event => {
        expect(event)
      });
    }));
  })

  describe("onClickSkipButton()", () => {
    it('should be create onClickReviewMismatchData()', () => {
      expect(component.onClickReviewMismatchData).toBeTruthy();
    });

    it('should be check onClickSkipButton() work properly', async(() => {
      spyOn(component.reviewMismatchData, 'emit');
      component.onClickReviewMismatchData();
      expect(component.reviewMismatchData.emit).toHaveBeenCalledWith();
    }));
  })

  describe("onClickOnReviewNewEmployee()", () => {
    it('should be create onClickOnReviewNewEmployee()', () => {
      expect(component.reviewNewEmployees).toBeTruthy();
    });

    it('should be check onClickOnReviewNewEmployee() work properly', async(() => {
      spyOn(component.reviewNewEmployees, 'emit');
      component.onClickReviewNewEmployees();
      expect(component.reviewNewEmployees.emit).toHaveBeenCalledWith();
    }));
  })
});
