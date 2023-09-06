import { TestBed, inject } from '@angular/core/testing';

import { ActionPermissionService } from './action-permission.service';

describe('ActionPermissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionPermissionService]
    });
  });

  // it('should be created', inject([ActionPermissionService], (service: ActionPermissionService) => {
  //   expect(service).toBeTruthy();
  // }));
});
