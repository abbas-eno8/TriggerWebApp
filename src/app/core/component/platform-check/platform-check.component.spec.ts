import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformCheckComponent } from './platform-check.component';

describe('PlatformCheckComponent', () => {
  let component: PlatformCheckComponent;
  let fixture: ComponentFixture<PlatformCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
