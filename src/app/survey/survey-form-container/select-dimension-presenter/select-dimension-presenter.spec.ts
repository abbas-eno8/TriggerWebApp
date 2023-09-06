import { TestBed } from '@angular/core/testing';

import { SelectDimensionPresenter } from './select-dimension-presenter';

describe('SelectDimensionPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectDimensionPresenter = TestBed.get(SelectDimensionPresenter);
    expect(service).toBeTruthy();
  });
});
