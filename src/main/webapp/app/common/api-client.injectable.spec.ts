import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiClient } from './api-client.injectable';


describe('ApiClient', () => {
  let client: ApiClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    client = TestBed.inject(ApiClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('prefixes GET with the API base URL and sends no credentials', () => {
    client.get('/api/users').subscribe();
    const req = httpMock.expectOne(request => request.url.endsWith('/api/users'));
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBeFalse();
    req.flush([]);
  });

  it('sends POST bodies to the resource path', () => {
    client.post<string>('/api/users', { username: 'jdoe' }).subscribe();
    const req = httpMock.expectOne(request => request.url.endsWith('/api/users'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'jdoe' });
    req.flush('some-id');
  });

  it('sends PUT and DELETE to the item path', () => {
    client.put('/api/users/1', { username: 'x' }).subscribe();
    client.delete('/api/users/1').subscribe();
    const put = httpMock.expectOne(request => request.method === 'PUT');
    const del = httpMock.expectOne(request => request.method === 'DELETE');
    expect(put.request.url.endsWith('/api/users/1')).toBeTrue();
    expect(del.request.url.endsWith('/api/users/1')).toBeTrue();
    put.flush('1');
    del.flush(null);
  });

});
