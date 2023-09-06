import { TestBed } from '@angular/core/testing';

import { GroupSparkListPresenter } from './group-spark-list.presenter';

describe('GroupSparkListPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupSparkListPresenter = TestBed.get(GroupSparkListPresenter);
    expect(service).toBeTruthy();
  });
});
