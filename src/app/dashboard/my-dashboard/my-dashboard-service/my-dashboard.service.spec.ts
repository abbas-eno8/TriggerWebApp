import { TestBed, inject } from '@angular/core/testing';

import { MyDashboardService } from './my-dashboard.service';

describe('MyDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyDashboardService]
    });
  });

  // it('should be created', inject([MyDashboardService], (service: MyDashboardService) => {
  //   expect(service).toBeTruthy();
  // }));
});
