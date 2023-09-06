import { TestBed, inject } from '@angular/core/testing';
import { MemberPresenter } from './member.presenter';

describe('MemberPresenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberPresenter]
    });
  });

  // it('should be created', inject([MemberPresenter], (service: MemberPresenter) => {
  //   expect(service).toBeTruthy();
  // }));
});
