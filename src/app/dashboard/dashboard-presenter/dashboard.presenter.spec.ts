import { TestBed, inject } from '@angular/core/testing';
import { DashboardPresenter } from './dashboard.presenter';

describe('DashboardPresenter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardPresenter]
    });
  });

  // it('should be created', inject([DashboardPresenter], (service: DashboardPresenter) => {
  //   expect(service).toBeTruthy();
  // }));
});
