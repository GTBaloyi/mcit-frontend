import { TestBed } from '@angular/core/testing';

import { ClientRegService } from './client-reg.service';

describe('ClientRegService', () => {
  let service: ClientRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
