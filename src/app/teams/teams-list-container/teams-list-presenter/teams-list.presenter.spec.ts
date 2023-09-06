import { TestBed, inject } from '@angular/core/testing';
import { TeamsListPresenter } from './teams-list.presenter';

describe('TeamsListPresenter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamsListPresenter]
    });
  });

  // it('should be created', inject([TeamsListPresenter], (service: TeamsListPresenter) => {
  //   expect(service).toBeTruthy();
  // }));
});
