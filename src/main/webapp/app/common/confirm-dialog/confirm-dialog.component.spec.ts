import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';


describe('ConfirmDialogComponent', () => {
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    fixture.componentRef.setInput('title', 'Delete this record?');
    fixture.componentRef.setInput('message', 'This cannot be undone.');
    fixture.detectChanges();
  });

  it('opens as a modal dialog and emits only on confirm', () => {
    let confirmed = 0;
    fixture.componentInstance.confirmed.subscribe(() => confirmed++);

    fixture.componentInstance.open();
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    expect(dialog.open).toBeTrue();

    fixture.componentInstance.close();
    expect(dialog.open).toBeFalse();
    expect(confirmed).toBe(0);

    fixture.componentInstance.open();
    fixture.componentInstance.confirm();
    expect(confirmed).toBe(1);
  });

});
