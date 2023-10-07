import { TestBed } from '@angular/core/testing';

import { Wage3Service } from './wage3.service';

describe('Wage3Service', () => {
  let service: Wage3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wage3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
