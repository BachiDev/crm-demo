import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


/** Debounced (300 ms) search box with clear button; emits on change. */
@Component({
  selector: 'app-search-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <svg class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
      </svg>
      <input type="search" [value]="value" (input)="onInput($any($event.target).value)"
             [placeholder]="placeholder()" [attr.aria-label]="placeholder()"
             class="w-full rounded-full border-zinc-300 bg-white py-2 pl-9 pr-8 text-sm shadow-sm" />
      @if (value) {
        <button type="button" (click)="clear()" aria-label="Clear search"
                class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700">×</button>
      }
    </div>
  `
})
export class SearchInputComponent {

  placeholder = input($localize`:@@search.placeholder:Search…`);
  search = output<string>();

  protected value = '';
  private keystrokes = new Subject<string>();

  constructor() {
    this.keystrokes
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(inject(DestroyRef)))
      .subscribe(query => this.search.emit(query));
  }

  protected onInput(query: string): void {
    this.value = query;
    this.keystrokes.next(query);
  }

  protected clear(): void {
    this.onInput('');
  }

}
