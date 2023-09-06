import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedPaginationPresentation } from './pagination.presentation';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { GlobalEventsManager } from '../../../../core/navbar/globalEventsManager';
import { ListPresenter } from '../list-presenter/list.presenter';

describe('PaginationPresentation', () => {
  let component: SharedPaginationPresentation;
  let fixture: ComponentFixture<SharedPaginationPresentation>;
  let globalEventsManager, memberPresenter;
  beforeEach(async(() => {
    globalEventsManager = jasmine.createSpyObj(['getTeams', 'inactiveTeam']);
    TestBed.configureTestingModule({
      declarations: [SharedPaginationPresentation],
      providers: [
        { provide: GlobalEventsManager, useValue: globalEventsManager },
        { provide: ListPresenter, useValue: memberPresenter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(SharedPaginationPresentation);
    component = fixture.componentInstance;
    spyOn<any>(component, 'globalPaginationEvent').and.returnValue(of([]));
    spyOn<any>(component, 'globalPaginationEvent')
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });


  // describe('globalPaginationEvent', () => {

  //   it('should be create globalPaginationEvent', () => {
  //     spyOn<any>(component, 'globalPaginationEvent')
  //   });

  //   it('should check globalPaginationEvent working properly', () => {

  //   });
  // });

  // describe('ngOnInit', () => {

  //   it('should be create ngOnInit', () => {
  //     expect(component.ngOnInit).toBeTruthy();
  //   });

  //   it('should check ngOnInit working properly', () => {
  //     spyOn<any>(component, 'initData').and.returnValue(of([]));
  //     component.ngOnInit();
  //   });
  // });

});
