import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user.service';


describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests pages with page, size and optional search', () => {
    service.getUsersPaged(1, 25, 'alice').subscribe();
    const req = httpMock.expectOne(
      request => request.url.endsWith('/api/users/paged')
        && request.params.get('page') === '1'
        && request.params.get('size') === '25'
        && request.params.get('q') === 'alice'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ content: [], totalElements: 0 });
  });

  it('omits the search param when no query is given', () => {
    service.getUsersPaged(0, 10).subscribe();
    const req = httpMock.expectOne(request => request.url.endsWith('/api/users/paged'));
    expect(req.request.params.has('q')).toBeFalse();
    req.flush({ content: [], totalElements: 0 });
  });

  it('reads the count endpoint', () => {
    let count: number | undefined;
    service.countUsers().subscribe(value => (count = value));
    const req = httpMock.expectOne(request => request.url.endsWith('/api/users/count'));
    req.flush(3);
    expect(count).toBe(3);
  });

});
