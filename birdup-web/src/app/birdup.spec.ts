import { TestBed } from '@angular/core/testing';

import { Birdup } from './birdup';

describe('Birdup', () => {
  let service: Birdup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Birdup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
