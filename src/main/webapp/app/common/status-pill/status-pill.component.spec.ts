import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusPillComponent } from './status-pill.component';


describe('StatusPillComponent', () => {
  let fixture: ComponentFixture<StatusPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusPillComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(StatusPillComponent);
  });

  it('maps tones to palettes', () => {
    fixture.componentRef.setInput('value', 'negotiation');
    fixture.componentRef.setInput('tone', 'amber');
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span') as HTMLElement;
    expect(span.textContent).toContain('negotiation');
    expect(span.className).toContain('bg-amber-50');
  });

  it('falls back to zinc', () => {
    fixture.componentRef.setInput('value', 'x');
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span') as HTMLElement;
    expect(span.className).toContain('bg-zinc-100');
  });

});
