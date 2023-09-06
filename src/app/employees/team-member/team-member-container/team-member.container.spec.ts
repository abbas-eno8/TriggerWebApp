import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamMemberContainer } from './team-member.container';

describe('TeamMemberContainer', () => {
  let component: TeamMemberContainer;
  let fixture: ComponentFixture<TeamMemberContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemberContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
