import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user/user-list.component';
import { UserAddComponent } from './user/user-add.component';
import { UserEditComponent } from './user/user-edit.component';
import { AccountListComponent } from './account/account-list.component';
import { AccountAddComponent } from './account/account-add.component';
import { AccountEditComponent } from './account/account-edit.component';
import { ContactListComponent } from './contact/contact-list.component';
import { ContactAddComponent } from './contact/contact-add.component';
import { ContactEditComponent } from './contact/contact-edit.component';
import { OpportunityListComponent } from './opportunity/opportunity-list.component';
import { OpportunityAddComponent } from './opportunity/opportunity-add.component';
import { OpportunityEditComponent } from './opportunity/opportunity-edit.component';
import { ActivityListComponent } from './activity/activity-list.component';
import { ActivityAddComponent } from './activity/activity-add.component';
import { ActivityEditComponent } from './activity/activity-edit.component';
import { ActivityRelationListComponent } from './activity-relation/activity-relation-list.component';
import { ActivityRelationAddComponent } from './activity-relation/activity-relation-add.component';
import { ActivityRelationEditComponent } from './activity-relation/activity-relation-edit.component';
import { MemoListComponent } from './memo/memo-list.component';
import { MemoAddComponent } from './memo/memo-add.component';
import { MemoEditComponent } from './memo/memo-edit.component';
import { CampaignListComponent } from './campaign/campaign-list.component';
import { CampaignAddComponent } from './campaign/campaign-add.component';
import { CampaignEditComponent } from './campaign/campaign-edit.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductAddComponent } from './product/product-add.component';
import { ProductEditComponent } from './product/product-edit.component';
import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: $localize`:@@home.index.headline:Welcome to your new app!`
  },
  {
    path: 'users',
    component: UserListComponent,
    title: $localize`:@@user.list.headline:Users`
  },
  {
    path: 'users/add',
    component: UserAddComponent,
    title: $localize`:@@user.add.headline:Add User`
  },
  {
    path: 'users/edit/:userId',
    component: UserEditComponent,
    title: $localize`:@@user.edit.headline:Edit User`
  },
  {
    path: 'accounts',
    component: AccountListComponent,
    title: $localize`:@@account.list.headline:Accounts`
  },
  {
    path: 'accounts/add',
    component: AccountAddComponent,
    title: $localize`:@@account.add.headline:Add Account`
  },
  {
    path: 'accounts/edit/:accountId',
    component: AccountEditComponent,
    title: $localize`:@@account.edit.headline:Edit Account`
  },
  {
    path: 'contacts',
    component: ContactListComponent,
    title: $localize`:@@contact.list.headline:Contacts`
  },
  {
    path: 'contacts/add',
    component: ContactAddComponent,
    title: $localize`:@@contact.add.headline:Add Contact`
  },
  {
    path: 'contacts/edit/:contactId',
    component: ContactEditComponent,
    title: $localize`:@@contact.edit.headline:Edit Contact`
  },
  {
    path: 'opportunities',
    component: OpportunityListComponent,
    title: $localize`:@@opportunity.list.headline:Opportunities`
  },
  {
    path: 'opportunities/add',
    component: OpportunityAddComponent,
    title: $localize`:@@opportunity.add.headline:Add Opportunity`
  },
  {
    path: 'opportunities/edit/:opportunityId',
    component: OpportunityEditComponent,
    title: $localize`:@@opportunity.edit.headline:Edit Opportunity`
  },
  {
    path: 'activities',
    component: ActivityListComponent,
    title: $localize`:@@activity.list.headline:Activities`
  },
  {
    path: 'activities/add',
    component: ActivityAddComponent,
    title: $localize`:@@activity.add.headline:Add Activity`
  },
  {
    path: 'activities/edit/:activityId',
    component: ActivityEditComponent,
    title: $localize`:@@activity.edit.headline:Edit Activity`
  },
  {
    path: 'activityRelations',
    component: ActivityRelationListComponent,
    title: $localize`:@@activityRelation.list.headline:Activity Relations`
  },
  {
    path: 'activityRelations/add',
    component: ActivityRelationAddComponent,
    title: $localize`:@@activityRelation.add.headline:Add Activity Relation`
  },
  {
    path: 'activityRelations/edit/:id',
    component: ActivityRelationEditComponent,
    title: $localize`:@@activityRelation.edit.headline:Edit Activity Relation`
  },
  {
    path: 'memos',
    component: MemoListComponent,
    title: $localize`:@@memo.list.headline:Memoes`
  },
  {
    path: 'memos/add',
    component: MemoAddComponent,
    title: $localize`:@@memo.add.headline:Add Memo`
  },
  {
    path: 'memos/edit/:memoId',
    component: MemoEditComponent,
    title: $localize`:@@memo.edit.headline:Edit Memo`
  },
  {
    path: 'campaigns',
    component: CampaignListComponent,
    title: $localize`:@@campaign.list.headline:Campaigns`
  },
  {
    path: 'campaigns/add',
    component: CampaignAddComponent,
    title: $localize`:@@campaign.add.headline:Add Campaign`
  },
  {
    path: 'campaigns/edit/:campaignId',
    component: CampaignEditComponent,
    title: $localize`:@@campaign.edit.headline:Edit Campaign`
  },
  {
    path: 'products',
    component: ProductListComponent,
    title: $localize`:@@product.list.headline:Products`
  },
  {
    path: 'products/add',
    component: ProductAddComponent,
    title: $localize`:@@product.add.headline:Add Product`
  },
  {
    path: 'products/edit/:productId',
    component: ProductEditComponent,
    title: $localize`:@@product.edit.headline:Edit Product`
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: $localize`:@@error.page.headline:Error`
  },
  {
    path: '**',
    component: ErrorComponent,
    title: $localize`:@@notFound.headline:Page not found`
  }
];
