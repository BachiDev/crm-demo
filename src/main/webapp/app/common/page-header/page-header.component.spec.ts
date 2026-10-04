import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageHeaderComponent } from './page-header.component';


describe('PageHeaderComponent', () => {
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, PageHeaderComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(PageHeaderComponent);
    fixture.componentRef.setInput('title', 'Users');
    fixture.componentRef.setInput('count', 3);
    fixture.componentRef.setInput('createLink', '/users/add');
    fixture.componentRef.setInput('createLabel', 'Create new User');
    fixture.detectChanges();
  });

  it('renders title, count and create action', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Users');
    expect(text).toContain('3');
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.textContent).toContain('Create new User');
  });

});
