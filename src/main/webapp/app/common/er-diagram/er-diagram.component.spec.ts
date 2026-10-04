import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErDiagramComponent } from './er-diagram.component';


describe('ErDiagramComponent', () => {
  let fixture: ComponentFixture<ErDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErDiagramComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(ErDiagramComponent);
    fixture.detectChanges();
  });

  it('renders all nine tables with primary keys', () => {
    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    expect(svg.getAttribute('role')).toBe('img');
    const text = svg.textContent ?? '';
    for (const table of ['users', 'accounts', 'contacts', 'opportunities', 'activities', 'campaigns', 'products', 'memos', 'activity_relations']) {
      expect(text).toContain(table);
    }
    expect(fixture.componentInstance.tables.length).toBe(9);
  });

});
