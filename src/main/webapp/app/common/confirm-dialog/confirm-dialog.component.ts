import { Component, ElementRef, input, output, ViewChild } from '@angular/core';


/**
 * Accessible delete confirmation built on the native `<dialog>` element
 * (Escape closes, focus is trapped by the browser). Open imperatively:
 * `dialog.open()` — subscribe to `confirmed` for the actual delete.
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <dialog #dialog class="rounded-2xl border border-zinc-200 p-0 shadow-xl backdrop:bg-zinc-950/50" (close)="onClose()">
      <div class="w-[calc(100vw-3rem)] max-w-md p-6">
        <h2 class="text-lg font-semibold tracking-tight">{{ title() }}</h2>
        <p class="mt-2 text-sm leading-relaxed text-zinc-600">{{ message() }}</p>
        <div class="mt-6 flex justify-end gap-2">
          <button type="button" (click)="close()" autofocus
                  class="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100" i18n="@@dialog.cancel">Cancel</button>
          <button type="button" (click)="confirm()"
                  class="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500">{{ confirmLabel() }}</button>
        </div>
      </div>
    </dialog>
  `
})
export class ConfirmDialogComponent {

  title = input.required<string>();
  message = input.required<string>();
  confirmLabel = input($localize`:@@dialog.delete:Delete`);
  confirmed = output<void>();

  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;

  open(): void {
    this.dialog.nativeElement.showModal();
  }

  close(): void {
    this.dialog.nativeElement.close();
  }

  confirm(): void {
    this.close();
    this.confirmed.emit();
  }

  protected onClose(): void {
    // No-op: dismissal without confirm simply emits nothing.
  }

}
