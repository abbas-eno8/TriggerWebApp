import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeColumnMobileViewComponent } from './three-column-mobile-view.component';

describe('ThreeColumnMobileViewComponent', () => {
  let component: ThreeColumnMobileViewComponent;
  let fixture: ComponentFixture<ThreeColumnMobileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeColumnMobileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeColumnMobileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
