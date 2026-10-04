import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';


describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentRef.setInput('page', 0);
    fixture.componentRef.setInput('totalPages', 5);
    fixture.componentRef.setInput('totalElements', 42);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();
  });

  it('shows position and total', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Page 1 of 5');
    expect(text).toContain('42');
  });

  it('disables prev on the first page and emits next', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[0].nativeElement.disabled).toBeTrue();

    let emitted: number | undefined;
    fixture.componentInstance.pageChange.subscribe(page => (emitted = page));
    buttons[1].nativeElement.click();
    expect(emitted).toBe(1);
  });

  it('disables next on the last page', () => {
    fixture.componentRef.setInput('page', 4);
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[1].nativeElement.disabled).toBeTrue();
  });

});
