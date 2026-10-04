import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';


/** Server-side pagination controls: prev/next + page position + page-size select. */
@Component({
  selector: 'app-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-600">
      <p role="status">
        <span class="font-mono font-medium text-zinc-900">{{ totalElements() }}</span>
        <ng-content>records</ng-content>
        <span class="text-zinc-400">·</span>
        <span i18n="@@pagination.page">Page {{ page() + 1 }} of {{ totalPages() }}</span>
      </p>
      <div class="flex items-center gap-2">
        <label class="flex items-center gap-1.5">
          <span class="text-zinc-500" i18n="@@pagination.perPage">Per page</span>
          <select [value]="pageSize()" (change)="pageSizeChange.emit(+$any($event.target).value)"
                  class="rounded-lg border-zinc-300 py-1 text-sm" aria-label="Rows per page">
            @for (option of [10, 25, 50]; track option) {
              <option [value]="option">{{ option }}</option>
            }
          </select>
        </label>
        <button type="button" (click)="pageChange.emit(page() - 1)" [disabled]="page() <= 0"
                class="rounded-lg border border-zinc-300 px-3 py-1 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40" i18n="@@pagination.prev">← Prev</button>
        <button type="button" (click)="pageChange.emit(page() + 1)" [disabled]="page() + 1 >= totalPages()"
                class="rounded-lg border border-zinc-300 px-3 py-1 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40" i18n="@@pagination.next">Next →</button>
      </div>
    </div>
  `
})
export class PaginationComponent {

  page = input.required<number>();
  totalPages = input.required<number>();
  totalElements = input.required<number>();
  pageSize = input.required<number>();
  pageChange = output<number>();
  pageSizeChange = output<number>();

}
