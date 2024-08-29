import { TestBed } from '@angular/core/testing';

import { ApiProuctService } from './api-prouct.service';

describe('ApiProuctService', () => {
  let service: ApiProuctService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProuctService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
