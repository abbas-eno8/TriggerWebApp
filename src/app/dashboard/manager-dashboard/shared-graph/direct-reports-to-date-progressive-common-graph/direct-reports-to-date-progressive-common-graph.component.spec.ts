import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectReportsToDateProgressiveCommonGraphComponent } from './direct-reports-to-date-progressive-common-graph.component';

describe('DirectReportsToDateProgressiveCommonGraphComponent', () => {
  let component: DirectReportsToDateProgressiveCommonGraphComponent;
  let fixture: ComponentFixture<DirectReportsToDateProgressiveCommonGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectReportsToDateProgressiveCommonGraphComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectReportsToDateProgressiveCommonGraphComponent);
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

    it('should test the callgoToEmployeeListPage emitter with a simple subscribe', async(() => {
      component.callgoToEmployeeListPage.subscribe(event => {
        expect(event)
      });
    }));
  });

  describe("onClickgoToEmployeeListPage()", () => {

    it('should create onClickgoToEmployeeListPage()', () => {
      expect(component.onClickgoToEmployeeListPage).toBeTruthy();
    });

    it('should be check onClickgoToEmployeeListPage() method work properly', () => {
      spyOn(component.callgoToEmployeeListPage, 'emit');
      component.onClickgoToEmployeeListPage('RP');
      expect(component.callgoToEmployeeListPage.emit).toHaveBeenCalledWith('RP');
    });
  })
});
