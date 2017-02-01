/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HoursService } from './hours.service';

describe('HoursService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoursService]
    });
  });

  it('should ...', inject([HoursService], (service: HoursService) => {
    expect(service).toBeTruthy();
  }));
});
