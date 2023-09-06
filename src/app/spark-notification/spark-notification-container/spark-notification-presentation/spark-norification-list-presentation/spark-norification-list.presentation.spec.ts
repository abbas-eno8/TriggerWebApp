import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkNorificationListPresentation } from './spark-norification-list.presentation';

describe('SparkNorificationListPresentation', () => {
  let component: SparkNorificationListPresentation;
  let fixture: ComponentFixture<SparkNorificationListPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparkNorificationListPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkNorificationListPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
