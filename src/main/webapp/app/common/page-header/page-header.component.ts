import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';


/** Uniform list header: title + record-count badge + primary create action. */
@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-6 flex flex-wrap items-center gap-3">
      <h1 class="grow text-3xl font-semibold tracking-tight md:text-4xl">{{ title() }}</h1>
      @if (count() !== null) {
        <span class="rounded-full bg-zinc-100 px-3 py-1 font-mono text-sm text-zinc-600" [attr.aria-label]="countLabel">
          {{ count() }}
        </span>
      }
      <a [routerLink]="createLink()" class="inline-block rounded-full bg-violet-600 px-5 py-2 font-medium text-white hover:bg-violet-500">
        {{ createLabel() }}
      </a>
    </div>
  `
})
export class PageHeaderComponent {

  title = input.required<string>();
  count = input<number | null>(null);
  countLabel = input('');
  createLink = input.required<string>();
  createLabel = input.required<string>();

}
