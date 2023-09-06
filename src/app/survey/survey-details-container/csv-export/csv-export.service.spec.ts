import { TestBed } from '@angular/core/testing';

import { CsvExportService } from './csv-export.service';

describe('CsvExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CsvExportService = TestBed.get(CsvExportService);
    expect(service).toBeTruthy();
  });
});
