import { TestBed } from '@angular/core/testing';

import { SearchBoxService } from './search-box.service';

describe('SearchBoxService', () => {
  let service: SearchBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
