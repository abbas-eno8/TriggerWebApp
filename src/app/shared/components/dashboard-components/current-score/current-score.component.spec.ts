import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentScoreComponent } from './current-score.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CurrentScoreComponent', () => {
  let component: CurrentScoreComponent;
  let fixture: ComponentFixture<CurrentScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentScoreComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentScoreComponent);
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
});
