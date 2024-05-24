import { TestBed } from '@angular/core/testing';

import { NourriService } from './nourri.service';

describe('NourriService', () => {
  let service: NourriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NourriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
