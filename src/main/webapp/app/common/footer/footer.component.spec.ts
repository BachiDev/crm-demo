import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from './footer.component';


describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FooterComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });

  it('renders brand, resources and the current year', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('CRM Demo');
    expect(text).toContain('Source on GitHub');
    expect(text).toContain(String(new Date().getFullYear()));
  });

});
