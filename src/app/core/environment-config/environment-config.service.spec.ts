import { TestBed, inject, async } from '@angular/core/testing';

import { EnvironmentConfigService } from './environment-config.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('EnvironmentConfigService', () => {
  let httpTestingController: HttpTestingController;
  let service: EnvironmentConfigService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnvironmentConfigService]
    }).compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(EnvironmentConfigService);
  }));

  it('should be created', inject([EnvironmentConfigService], (service: EnvironmentConfigService) => {
    expect(service).toBeTruthy();
  }));
  // describe('Get User Data', () => {

  //   it('should be create getUserData()', () => {
  //     expect(service.initializeApplicationEnvironment).toBeTruthy();
  //   });

  //   it('should be check UserData , clientId & UserID', inject([EnvironmentConfigService], (service: EnvironmentConfigService) => {
  //     expect(service.initializeApplicationEnvironment).toHaveBeenCalledWith('localhost');
  //   }));
    
  // });
});
