import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SightingMap} from './sighting-map';

describe('SightingMap', () => {
  let component: SightingMap;
  let fixture: ComponentFixture<SightingMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightingMap],
    }).compileComponents();

    fixture = TestBed.createComponent(SightingMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
