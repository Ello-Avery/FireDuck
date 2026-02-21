import { TestBed } from '@angular/core/testing';

import { DucksService } from './ducks-service';

describe('DucksService', () => {
  let service: DucksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
