import { TestBed, inject } from '@angular/core/testing';

import { MeetandgreetService } from './meetandgreet.service';

describe('MeetandgreetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetandgreetService]
    });
  });

  it('should be created', inject([MeetandgreetService], (service: MeetandgreetService) => {
    expect(service).toBeTruthy();
  }));
});
