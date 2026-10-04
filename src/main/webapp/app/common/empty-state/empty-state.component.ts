import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';


/** Friendly empty-table state with an optional create action. */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
      <p class="text-lg font-medium">{{ title() }}</p>
      @if (hint()) {
        <p class="mx-auto mt-1 max-w-md text-sm text-zinc-500">{{ hint() }}</p>
      }
      @if (actionLink() && actionLabel()) {
        <a [routerLink]="actionLink()" class="mt-4 inline-block rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-500">
          {{ actionLabel() }}
        </a>
      }
    </div>
  `
})
export class EmptyStateComponent {

  title = input.required<string>();
  hint = input('');
  actionLink = input('');
  actionLabel = input('');

}
