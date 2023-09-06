import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSparkListPresentationComponent } from './group-spark-list-presentation.component';

describe('GroupSparkListPresentationComponent', () => {
  let component: GroupSparkListPresentationComponent;
  let fixture: ComponentFixture<GroupSparkListPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSparkListPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSparkListPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
