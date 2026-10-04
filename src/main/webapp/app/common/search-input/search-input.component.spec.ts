import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchInputComponent } from './search-input.component';


describe('SearchInputComponent', () => {
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(SearchInputComponent);
    fixture.detectChanges();
  });

  it('emits debounced queries', fakeAsync(() => {
    const seen: string[] = [];
    fixture.componentInstance.search.subscribe(query => seen.push(query));

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'al';
    input.dispatchEvent(new Event('input'));
    tick(299);
    expect(seen).toEqual([]);

    input.value = 'alice';
    input.dispatchEvent(new Event('input'));
    tick(300);
    expect(seen).toEqual(['alice']);
  }));

  it('offers a clear button that resets the query', fakeAsync(() => {
    const seen: string[] = [];
    fixture.componentInstance.search.subscribe(query => seen.push(query));

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'x';
    input.dispatchEvent(new Event('input'));
    tick(300);
    fixture.detectChanges();

    const clear = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    clear.click();
    tick(300);
    expect(seen).toEqual(['x', '']);
  }));

});
