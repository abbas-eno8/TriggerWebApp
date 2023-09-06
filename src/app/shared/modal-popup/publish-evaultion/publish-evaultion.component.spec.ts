import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishEvaultionComponent } from './publish-evaultion.component';

describe('PublishEvaultionComponent', () => {
  let component: PublishEvaultionComponent;
  let fixture: ComponentFixture<PublishEvaultionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishEvaultionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishEvaultionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
