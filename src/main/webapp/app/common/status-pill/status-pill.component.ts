import { ChangeDetectionStrategy, Component, input } from '@angular/core';


export type PillTone = 'violet' | 'emerald' | 'amber' | 'sky' | 'rose' | 'zinc';

/** Small status/stage/type badge. Tone maps to a fixed Tailwind palette. */
@Component({
  selector: 'app-status-pill',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium" [class]="classes">{{ value() }}</span>
  `
})
export class StatusPillComponent {

  value = input.required<string>();
  tone = input<PillTone>('zinc');

  protected get classes(): string {
    switch (this.tone()) {
      case 'violet': return 'bg-brand-50 text-brand-700';
      case 'emerald': return 'bg-emerald-50 text-emerald-700';
      case 'amber': return 'bg-amber-50 text-amber-700';
      case 'sky': return 'bg-sky-50 text-sky-700';
      case 'rose': return 'bg-rose-50 text-rose-700';
      default: return 'bg-zinc-100 text-zinc-600';
    }
  }

}
