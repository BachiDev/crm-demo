import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BackendStatusComponent } from './backend-status.component';
import { environment } from 'environments/environment';


describe('BackendStatusComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackendStatusComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('reports running after a successful check', fakeAsync(() => {
    const fixture: ComponentFixture<BackendStatusComponent> = TestBed.createComponent(BackendStatusComponent);
    fixture.detectChanges();
    tick();
    const req = httpMock.expectOne(environment.apiPath + '/');
    req.flush('CRM Demo API is running!');
    tick();
    fixture.detectChanges();

    expect(fixture.componentInstance.running()).toBeTrue();
    expect(fixture.nativeElement.textContent).toContain('Running');
    httpMock.verify();
  }));

  it('reports waking up when the backend is unreachable', fakeAsync(() => {
    const fixture: ComponentFixture<BackendStatusComponent> = TestBed.createComponent(BackendStatusComponent);
    fixture.detectChanges();
    tick();
    const req = httpMock.expectOne(environment.apiPath + '/');
    req.error(new ProgressEvent('error'));
    tick();
    fixture.detectChanges();

    expect(fixture.componentInstance.running()).toBeFalse();
    expect(fixture.nativeElement.textContent).toContain('waking up');
    httpMock.verify();
  }));

});
