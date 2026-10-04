import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { BackendStatusComponent } from 'app/common/backend-status/backend-status.component';
import { FloatingActionButtonComponent } from '../floating-action-button/floating-action-button.component';
import { ErDiagramComponent } from 'app/common/er-diagram/er-diagram.component';
import { AccountService } from 'app/account/account.service';
import { ActivityService } from 'app/activity/activity.service';
import { ActivityRelationService } from 'app/activity-relation/activity-relation.service';
import { CampaignService } from 'app/campaign/campaign.service';
import { ContactService } from 'app/contact/contact.service';
import { MemoService } from 'app/memo/memo.service';
import { OpportunityService } from 'app/opportunity/opportunity.service';
import { ProductService } from 'app/product/product.service';
import { UserService } from 'app/user/user.service';


interface EntityCard {
  link: string;
  icon: string;
  title: string;
  count: number | null;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, BackendStatusComponent, FloatingActionButtonComponent, ErDiagramComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  private readonly entities = [
    { key: 'users', link: '/users', icon: 'assets/users.svg', title: $localize`:@@user.list.headline:Users` },
    { link: '/accounts', icon: 'assets/accounts.svg', title: $localize`:@@account.list.headline:Accounts`, key: 'accounts' },
    { link: '/contacts', icon: 'assets/contacts.svg', title: $localize`:@@contact.list.headline:Contacts`, key: 'contacts' },
    { link: '/opportunities', icon: 'assets/opportunities.svg', title: $localize`:@@opportunity.list.headline:Opportunities`, key: 'opportunities' },
    { link: '/activities', icon: 'assets/activities.svg', title: $localize`:@@activity.list.headline:Activities`, key: 'activities' },
    { link: '/activityRelations', icon: 'assets/activity_relations.svg', title: $localize`:@@activityRelation.list.headline:Activity Relations`, key: 'activityRelations' },
    { link: '/memos', icon: 'assets/memos.svg', title: $localize`:@@memo.list.headline:Memoes`, key: 'memos' },
    { link: '/campaigns', icon: 'assets/campaigns.svg', title: $localize`:@@campaign.list.headline:Campaigns`, key: 'campaigns' },
    { link: '/products', icon: 'assets/products.svg', title: $localize`:@@product.list.headline:Products`, key: 'products' }
  ] as const;

  environment = environment;
  private counts = signal<Record<string, number | null> | null>(null);

  /** Entity cards with live row counts (null while the backend is asleep). */
  cards = computed<EntityCard[]>(() =>
    this.entities.map(entity => ({
      link: entity.link,
      icon: entity.icon,
      title: entity.title,
      count: this.counts()?.[entity.key] ?? null
    }))
  );

  private userService = inject(UserService);
  private accountService = inject(AccountService);
  private contactService = inject(ContactService);
  private opportunityService = inject(OpportunityService);
  private activityService = inject(ActivityService);
  private activityRelationService = inject(ActivityRelationService);
  private memoService = inject(MemoService);
  private campaignService = inject(CampaignService);
  private productService = inject(ProductService);

  ngOnInit() {
    forkJoin({
      users: this.userService.countUsers().pipe(catchError(() => of(null))),
      accounts: this.accountService.countAccounts().pipe(catchError(() => of(null))),
      contacts: this.contactService.countContacts().pipe(catchError(() => of(null))),
      opportunities: this.opportunityService.countOpportunities().pipe(catchError(() => of(null))),
      activities: this.activityService.countActivities().pipe(catchError(() => of(null))),
      activityRelations: this.activityRelationService.countActivityRelations().pipe(catchError(() => of(null))),
      memos: this.memoService.countMemoes().pipe(catchError(() => of(null))),
      campaigns: this.campaignService.countCampaigns().pipe(catchError(() => of(null))),
      products: this.productService.countProducts().pipe(catchError(() => of(null)))
    }).subscribe(counts => {
      // All null (backend asleep) -> cards render without counts.
      if (Object.values(counts).every(count => count === null)) {
        return;
      }
      this.counts.set(counts);
    });
  }

}
