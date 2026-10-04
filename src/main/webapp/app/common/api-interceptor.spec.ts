import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { apiInterceptor } from './api-interceptor';
import { environment } from 'environments/environment';


describe('apiInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([apiInterceptor])), provideHttpClientTesting()]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('retries a failed GET once when the backend looks asleep, then succeeds', () => {
    let seen: HttpErrorResponse | null = null;
    http.get(environment.apiPath + '/api/users').subscribe({ error: (error) => (seen = error) });

    const first = httpMock.expectOne(environment.apiPath + '/api/users');
    first.flush('sleeping', { status: 503, statusText: 'Service Unavailable' });

    const retry = httpMock.expectOne(environment.apiPath + '/api/users');
    retry.flush([]);
    expect(seen).toBeNull();
  });

  it('does not retry mutations (no double-create risk)', () => {
    let failures = 0;
    http.post(environment.apiPath + '/api/users', {}).subscribe({ error: () => failures++ });

    const only = httpMock.expectOne(environment.apiPath + '/api/users');
    only.flush('sleeping', { status: 503, statusText: 'Service Unavailable' });

    httpMock.expectNone(environment.apiPath + '/api/users');
    expect(failures).toBe(1);
  });

});
