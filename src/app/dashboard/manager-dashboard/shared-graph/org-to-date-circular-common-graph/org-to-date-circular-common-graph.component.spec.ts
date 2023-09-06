import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgToDateCircularCommonGraphComponent } from './org-to-date-circular-common-graph.component';

describe('OrgToDateCircularCommonGraphComponent', () => {
  let component: OrgToDateCircularCommonGraphComponent;
  let fixture: ComponentFixture<OrgToDateCircularCommonGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgToDateCircularCommonGraphComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgToDateCircularCommonGraphComponent);
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

    it('should test the callonClickmyOrgToDate emitter with a simple subscribe', async(() => {
      component.callonClickmyOrgToDate.subscribe(event => {
        expect(event)
      });
    }));
  })

  describe("onClickmyOrgToDate()", () => {

    it('should create onClickmyOrgToDate()', () => {
      expect(component.onClickmyOrgToDate).toBeTruthy();
    });

    it('should be check onClickmyOrgToDate() method work properly', () => {
      spyOn(component.callonClickmyOrgToDate, 'emit');
      component.onClickmyOrgToDate('RP');
      expect(component.callonClickmyOrgToDate.emit).toHaveBeenCalledWith('RP');
    });
  })
});
