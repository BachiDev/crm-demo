import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from 'environments/environment';


/** Site footer: brand, shortcuts, resources, legal line. */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-zinc-200 bg-white">
      <div class="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div class="grid gap-8 md:grid-cols-3">
          <div>
            <p class="text-lg font-semibold tracking-tight" i18n="@@app.title">CRM Demo</p>
            <p class="mt-1 text-sm text-zinc-500" i18n="@@footer.blurb">A full-stack demo by Fabian Bachmayer — Spring Boot, Angular and Postgres on free-tier cloud.</p>
          </div>
          <nav aria-label="Footer" class="text-sm">
            <p class="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-400" i18n="@@footer.explore">Explore</p>
            <ul class="space-y-1.5">
              <li><a routerLink="/" class="text-zinc-600 hover:text-brand-700" i18n="@@navigation.home">Home</a></li>
              <li><a routerLink="/users" class="text-zinc-600 hover:text-brand-700" i18n="@@user.list.headline">Users</a></li>
              <li><a routerLink="/accounts" class="text-zinc-600 hover:text-brand-700" i18n="@@account.list.headline">Accounts</a></li>
              <li><a routerLink="/opportunities" class="text-zinc-600 hover:text-brand-700" i18n="@@opportunity.list.headline">Opportunities</a></li>
            </ul>
          </nav>
          <nav aria-label="Resources" class="text-sm">
            <p class="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-400" i18n="@@footer.resources">Resources</p>
            <ul class="space-y-1.5">
              <li><a [href]="apiPath + '/swagger-ui.html'" target="_blank" rel="noreferrer" class="text-zinc-600 hover:text-brand-700" i18n="@@navigation.api">API Docs</a></li>
              <li><a href="https://github.com/BachiDev/crm-demo" target="_blank" rel="noreferrer" class="text-zinc-600 hover:text-brand-700" i18n="@@footer.source">Source on GitHub</a></li>
              <li><a href="https://bachi.dev" target="_blank" rel="noreferrer" class="text-zinc-600 hover:text-brand-700">bachi.dev</a></li>
            </ul>
          </nav>
        </div>
        <div class="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 pt-4 text-sm text-zinc-500">
          <p i18n="@@footer.copy">© {{ year }} Fabian Bachmayer · Vienna · Demo data only, no real user data</p>
          <p class="font-mono text-xs" i18n="@@footer.stack">Spring Boot · Angular · Neon Postgres</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {

  apiPath = environment.apiPath;
  year = new Date().getFullYear();

}
