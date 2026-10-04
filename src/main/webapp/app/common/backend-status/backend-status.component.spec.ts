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

  it('uses light text on dark surfaces', fakeAsync(() => {
    const fixture: ComponentFixture<BackendStatusComponent> = TestBed.createComponent(BackendStatusComponent);
    fixture.componentRef.setInput('onDark', true);
    fixture.detectChanges();
    tick();
    const req = httpMock.expectOne(environment.apiPath + '/');
    req.flush('CRM Demo API is running!');
    tick();
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('span.text-sm') as HTMLElement;
    expect(label.className).toContain('text-emerald-300');
    httpMock.verify();
  }));

});
