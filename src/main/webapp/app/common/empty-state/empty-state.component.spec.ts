import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmptyStateComponent } from './empty-state.component';


describe('EmptyStateComponent', () => {
  let fixture: ComponentFixture<EmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, EmptyStateComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(EmptyStateComponent);
    fixture.componentRef.setInput('title', 'No users found');
    fixture.detectChanges();
  });

  it('renders the title without action by default', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('No users found');
    expect(fixture.nativeElement.querySelector('a')).toBeNull();
  });

  it('renders the action when link and label are set', () => {
    fixture.componentRef.setInput('actionLink', '/users/add');
    fixture.componentRef.setInput('actionLabel', 'Create new User');
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.textContent).toContain('Create new User');
  });

});
