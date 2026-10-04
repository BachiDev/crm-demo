import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { BackendStatusComponent } from 'app/common/backend-status/backend-status.component';
import { FloatingActionButtonComponent } from '../floating-action-button/floating-action-button.component';
import { NavCardComponent } from '../nav-card/nav-card.component';
import { AccountService } from 'app/account/account.service';
import { ActivityService } from 'app/activity/activity.service';
import { ActivityRelationService } from 'app/activity-relation/activity-relation.service';
import { CampaignService } from 'app/campaign/campaign.service';
import { ContactService } from 'app/contact/contact.service';
import { MemoService } from 'app/memo/memo.service';
import { OpportunityService } from 'app/opportunity/opportunity.service';
import { ProductService } from 'app/product/product.service';
import { UserService } from 'app/user/user.service';


interface EntityStat {
  link: string;
  title: string;
  count: number | null;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, BackendStatusComponent, FloatingActionButtonComponent, NavCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  navLinks = [
    { link: '/users', icon: 'assets/users.svg', title: 'Users' },
    { link: '/accounts', icon: 'assets/accounts.svg', title: 'Accounts' },
    { link: '/contacts', icon: 'assets/contacts.svg', title: 'Contacts' },
    { link: '/opportunities', icon: 'assets/opportunities.svg', title: 'Opportunities' },
    { link: '/activities', icon: 'assets/activities.svg', title: 'Activities' },
    { link: '/activityRelations', icon: 'assets/activity_relations.svg', title: 'Activity Relations' },
    { link: '/memos', icon: 'assets/memos.svg', title: 'Memos' },
    { link: '/campaigns', icon: 'assets/campaigns.svg', title: 'Campaigns' },
    { link: '/products', icon: 'assets/products.svg', title: 'Products' }
  ];

  environment = environment;
  stats = signal<EntityStat[] | null>(null);

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
      // All null (backend asleep) -> hide the stats row entirely.
      if (Object.values(counts).every(count => count === null)) {
        return;
      }
      this.stats.set([
        { link: '/users', title: $localize`:@@user.list.headline:Users`, count: counts.users },
        { link: '/accounts', title: $localize`:@@account.list.headline:Accounts`, count: counts.accounts },
        { link: '/contacts', title: $localize`:@@contact.list.headline:Contacts`, count: counts.contacts },
        { link: '/opportunities', title: $localize`:@@opportunity.list.headline:Opportunities`, count: counts.opportunities },
        { link: '/activities', title: $localize`:@@activity.list.headline:Activities`, count: counts.activities },
        { link: '/activityRelations', title: $localize`:@@activityRelation.list.headline:Activity Relations`, count: counts.activityRelations },
        { link: '/memos', title: $localize`:@@memo.list.headline:Memoes`, count: counts.memos },
        { link: '/campaigns', title: $localize`:@@campaign.list.headline:Campaigns`, count: counts.campaigns },
        { link: '/products', title: $localize`:@@product.list.headline:Products`, count: counts.products }
      ]);
    });
  }

}
