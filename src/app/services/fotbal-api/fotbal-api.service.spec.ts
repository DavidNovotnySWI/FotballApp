import { TestBed } from '@angular/core/testing';

import { FotballApiService } from './fotbal-api.service';

describe('FotballApiService', () => {
  let service:FotballApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotballApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
