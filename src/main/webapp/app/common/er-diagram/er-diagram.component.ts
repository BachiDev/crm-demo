import { ChangeDetectionStrategy, Component } from '@angular/core';


interface DiagramField {
  name: string;
  kind: '' | 'PK' | 'FK';
}

interface DiagramTable {
  name: string;
  x: number;
  y: number;
  h: number;
  fields: DiagramField[];
}

/**
 * Static entity-relationship diagram of the demo schema (nine tables, as
 * created by Flyway V1). Pure SVG, no dependencies. Relationship lines mirror
 * the real foreign keys; ownership (user → …) and domain links share one
 * violet one-to-many style. Positions are hand-tuned so no line crosses a box.
 */
@Component({
  selector: 'app-er-diagram',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 960 600" class="h-auto w-full" role="img"
         aria-label="Entity-relationship diagram: users own accounts, contacts, opportunities, activities, memos and campaigns; accounts have contacts and opportunities; contacts have opportunities; activities, accounts, contacts and opportunities link through activity relations.">
      <title>CRM demo schema</title>
      <defs>
        <marker id="crow" viewBox="0 0 10 8" refX="9" refY="4" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M0,0 L9,4 L0,8 M4.5,0 L4.5,8" fill="none" stroke="#8b5cf6" stroke-width="1.4" />
        </marker>
      </defs>

      <!-- relationship lines (one-to-many, parent → child) -->
      <g fill="none" stroke="#a78bfa" stroke-width="1.5">
        <path d="M250,90 H370" marker-end="url(#crow)" />
        <path d="M590,90 H710" marker-end="url(#crow)" />
        <path d="M120,160 V200" marker-end="url(#crow)" />
        <path d="M480,160 V200" marker-end="url(#crow)" />
        <path d="M590,110 H660 V270 H710" marker-end="url(#crow)" />
        <path d="M140,160 V180 H480 V200" marker-end="url(#crow)" />
        <path d="M800,160 V180 H540 V200" marker-end="url(#crow)" />
        <path d="M540,340 V360 H820 V380" marker-end="url(#crow)" />
        <path d="M820,340 V380" marker-end="url(#crow)" />
      </g>

      <!-- tables -->
      @for (table of tables; track table.name) {
        <g>
          <rect [attr.x]="table.x" [attr.y]="table.y" width="220" [attr.height]="table.h" rx="10" fill="#ffffff" stroke="#e4e4e7" />
          <text [attr.x]="table.x + 12" [attr.y]="table.y + 22" font-size="12.5" font-weight="700" fill="#6d28d9" font-family="ui-monospace, monospace" style="text-transform: uppercase; letter-spacing: 0.04em;">{{ table.name }}</text>
          <line [attr.x1]="table.x + 12" [attr.x2]="table.x + 208" [attr.y1]="table.y + 32" [attr.y2]="table.y + 32" stroke="#f4f4f5" />
          @for (field of table.fields; track field.name) {
            <text [attr.x]="table.x + 12" [attr.y]="table.y + 54 + $index * 22" font-size="11.5" fill="#3f3f46" font-family="ui-monospace, monospace">{{ field.name }}</text>
            @if (field.kind) {
              <text [attr.x]="table.x + 208" [attr.y]="table.y + 54 + $index * 22" text-anchor="end" font-size="10" font-weight="700" font-family="ui-monospace, monospace"
                    [attr.fill]="field.kind === 'PK' ? '#7c3aed' : '#0284c7'">{{ field.kind }}</text>
            }
          }
        </g>
      }

      <!-- legend -->
      <g font-size="11.5" font-family="ui-monospace, monospace" fill="#52525b">
        <line x1="30" y1="566" x2="90" y2="566" stroke="#a78bfa" stroke-width="1.5" marker-end="url(#crow)" />
        <text x="100" y="570">one-to-many</text>
        <text x="230" y="570" font-weight="700" fill="#7c3aed">PK</text>
        <text x="260" y="570">primary key</text>
        <text x="380" y="570" font-weight="700" fill="#0284c7">FK</text>
        <text x="410" y="570">foreign key</text>
      </g>
    </svg>
  `
})
export class ErDiagramComponent {

  tables: DiagramTable[] = [
    {
      name: 'users', x: 30, y: 20, h: 140,
      fields: [
        { name: 'user_id', kind: 'PK' },
        { name: 'username', kind: '' },
        { name: 'email', kind: '' }
      ]
    },
    {
      name: 'accounts', x: 370, y: 20, h: 140,
      fields: [
        { name: 'account_id', kind: 'PK' },
        { name: 'account_name', kind: '' },
        { name: 'owner_id', kind: 'FK' }
      ]
    },
    {
      name: 'contacts', x: 710, y: 20, h: 140,
      fields: [
        { name: 'contact_id', kind: 'PK' },
        { name: 'first_name', kind: '' },
        { name: 'account_id', kind: 'FK' },
        { name: 'owner_id', kind: 'FK' }
      ]
    },
    {
      name: 'campaigns', x: 30, y: 200, h: 140,
      fields: [
        { name: 'campaign_id', kind: 'PK' },
        { name: 'campaign_name', kind: '' },
        { name: 'owner_id', kind: 'FK' }
      ]
    },
    {
      name: 'opportunities', x: 370, y: 200, h: 140,
      fields: [
        { name: 'opportunity_id', kind: 'PK' },
        { name: 'opportunity_name', kind: '' },
        { name: 'stage', kind: '' },
        { name: 'account_id', kind: 'FK' }
      ]
    },
    {
      name: 'activities', x: 710, y: 200, h: 140,
      fields: [
        { name: 'activity_id', kind: 'PK' },
        { name: 'subject', kind: '' },
        { name: 'owner_id', kind: 'FK' }
      ]
    },
    {
      name: 'products', x: 30, y: 380, h: 140,
      fields: [
        { name: 'product_id', kind: 'PK' },
        { name: 'product_name', kind: '' },
        { name: 'sku', kind: '' }
      ]
    },
    {
      name: 'memos', x: 370, y: 380, h: 140,
      fields: [
        { name: 'memo_id', kind: 'PK' },
        { name: 'memo_text', kind: '' },
        { name: 'user_id', kind: 'FK' }
      ]
    },
    {
      name: 'activity_relations', x: 710, y: 380, h: 164,
      fields: [
        { name: 'id', kind: 'PK' },
        { name: 'activity_id', kind: 'FK' },
        { name: 'account_id', kind: 'FK' },
        { name: 'contact_id', kind: 'FK' },
        { name: 'opportunity_id', kind: 'FK' }
      ]
    }
  ];

}
