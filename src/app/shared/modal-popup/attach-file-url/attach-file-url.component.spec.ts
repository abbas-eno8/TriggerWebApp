import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachFileUrlComponent } from './attach-file-url.component';

describe('AttachFileUrlComponent', () => {
  let component: AttachFileUrlComponent;
  let fixture: ComponentFixture<AttachFileUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachFileUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachFileUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
