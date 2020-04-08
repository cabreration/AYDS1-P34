import { TestBed, inject } from '@angular/core/testing';

import { RestService } from './rest.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('RestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ RestService ],
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: RestService = TestBed.get(RestService);
    expect(service).toBeTruthy();
  });
});
