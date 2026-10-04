import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, timer } from 'rxjs';
import { environment } from 'environments/environment';


/**
 * Live backend status dot. Polls `GET <api>/` fast (5 s) while the Render free
 * instance sleeps and backs off to every ~14.5 min once it is up, to spare
 * free-tier bandwidth. Compact mode (header) renders dot only.
 */
@Component({
  selector: 'app-backend-status',
  standalone: true,
  template: `
    <span class="inline-flex items-center gap-1.5" role="status" [attr.aria-label]="label">
      <span class="relative flex h-2.5 w-2.5" aria-hidden="true">
        @if (running() === true) {
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
        }
        <span class="relative inline-flex h-2.5 w-2.5 rounded-full" [class]="dotClass"></span>
      </span>
      @if (!compact()) {
        <span class="text-sm" [class]="textClass">{{ label }}</span>
      }
    </span>
  `
})
export class BackendStatusComponent {

  compact = input(false);

  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  /** null = still checking, true = up, false = asleep/unreachable. */
  running = signal<boolean | null>(null);

  constructor() {
    this.poll(0);
  }

  get label(): string {
    if (this.running() === true) {
      return $localize`:@@backend.running:Running`;
    }
    if (this.running() === false) {
      return $localize`:@@backend.waking:Server is waking up`;
    }
    return $localize`:@@backend.checking:Checking server…`;
  }

  get dotClass(): string {
    if (this.running() === true) {
      return 'bg-emerald-500';
    }
    if (this.running() === false) {
      return 'bg-amber-400 animate-pulse';
    }
    return 'bg-zinc-300 animate-pulse';
  }

  get textClass(): string {
    return this.running() === true ? 'text-emerald-700' : 'text-zinc-500';
  }

  private poll(delayMs: number): void {
    timer(delayMs)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() =>
          this.http.get(environment.apiPath + '/', { responseType: 'text' }).pipe(
            catchError(() => of('error'))
          )
        )
      )
      .subscribe(response => {
        const up = response !== 'error';
        this.running.set(up);
        this.poll(up ? 14.5 * 60 * 1000 : 5000);
      });
  }

}
