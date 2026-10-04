import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BackendStatusComponent } from 'app/common/backend-status/backend-status.component';
import { environment } from 'environments/environment';


interface NavEntry {
  link: string;
  title: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterLinkActive, BackendStatusComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  private elRef = inject(ElementRef);
  private router = inject(Router);

  apiPath = environment.apiPath;
  mobileOpen = signal(false);
  entitiesOpen = signal(false);

  entities: NavEntry[] = [
    { link: '/users', title: $localize`:@@user.list.headline:Users` },
    { link: '/accounts', title: $localize`:@@account.list.headline:Accounts` },
    { link: '/contacts', title: $localize`:@@contact.list.headline:Contacts` },
    { link: '/opportunities', title: $localize`:@@opportunity.list.headline:Opportunities` },
    { link: '/activities', title: $localize`:@@activity.list.headline:Activities` },
    { link: '/activityRelations', title: $localize`:@@activityRelation.list.headline:Activity Relations` },
    { link: '/memos', title: $localize`:@@memo.list.headline:Memoes` },
    { link: '/campaigns', title: $localize`:@@campaign.list.headline:Campaigns` },
    { link: '/products', title: $localize`:@@product.list.headline:Products` }
  ];

  constructor() {
    // Close menus on navigation (mobile + dropdown).
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.mobileOpen.set(false);
        this.entitiesOpen.set(false);
      });
  }

  toggleMobile(): void {
    const open = !this.mobileOpen();
    this.mobileOpen.set(open);
    if (!open) {
      this.entitiesOpen.set(false);
    }
  }

  toggleEntities(): void {
    this.entitiesOpen.set(!this.entitiesOpen());
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.mobileOpen.set(false);
    this.entitiesOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.entitiesOpen.set(false);
    }
  }

}
