import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { UserService } from 'app/user/user.service';
import { AccountService } from 'app/account/account.service';
import { ContactService } from 'app/contact/contact.service';
import { OpportunityService } from 'app/opportunity/opportunity.service';
import { ActivityService } from 'app/activity/activity.service';
import { ActivityRelationService } from 'app/activity-relation/activity-relation.service';
import { MemoService } from 'app/memo/memo.service';
import { CampaignService } from 'app/campaign/campaign.service';
import { ProductService } from 'app/product/product.service';


describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HomeComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: { countUsers: () => of(3) } },
        { provide: AccountService, useValue: { countAccounts: () => of(2) } },
        { provide: ContactService, useValue: { countContacts: () => of(3) } },
        { provide: OpportunityService, useValue: { countOpportunities: () => of(1) } },
        { provide: ActivityService, useValue: { countActivities: () => of(2) } },
        { provide: ActivityRelationService, useValue: { countActivityRelations: () => of(2) } },
        { provide: MemoService, useValue: { countMemoes: () => of(2) } },
        { provide: CampaignService, useValue: { countCampaigns: () => of(1) } },
        { provide: ProductService, useValue: { countProducts: () => of(2) } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  });

  it('renders the hero and entity cards', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('CRM Demo');
    expect(text).toContain('How it runs');
    const component = fixture.componentInstance;
    expect(component.cards()?.length).toBe(9);
  });

});
