import { TestBed } from '@angular/core/testing';

import Sighting from './sighting.models';

describe('Sighting', () => {
  let service: Sighting;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sighting);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
