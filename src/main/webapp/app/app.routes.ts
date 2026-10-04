import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    title: $localize`:@@home.index.headline:CRM Demo`
  },
  {
    path: 'users',
    loadComponent: () => import('./user/user-list.component').then(m => m.UserListComponent),
    title: $localize`:@@user.list.headline:Users`
  },
  {
    path: 'users/add',
    loadComponent: () => import('./user/user-add.component').then(m => m.UserAddComponent),
    title: $localize`:@@user.add.headline:Add User`
  },
  {
    path: 'users/edit/:userId',
    loadComponent: () => import('./user/user-edit.component').then(m => m.UserEditComponent),
    title: $localize`:@@user.edit.headline:Edit User`
  },
  {
    path: 'accounts',
    loadComponent: () => import('./account/account-list.component').then(m => m.AccountListComponent),
    title: $localize`:@@account.list.headline:Accounts`
  },
  {
    path: 'accounts/add',
    loadComponent: () => import('./account/account-add.component').then(m => m.AccountAddComponent),
    title: $localize`:@@account.add.headline:Add Account`
  },
  {
    path: 'accounts/edit/:accountId',
    loadComponent: () => import('./account/account-edit.component').then(m => m.AccountEditComponent),
    title: $localize`:@@account.edit.headline:Edit Account`
  },
  {
    path: 'contacts',
    loadComponent: () => import('./contact/contact-list.component').then(m => m.ContactListComponent),
    title: $localize`:@@contact.list.headline:Contacts`
  },
  {
    path: 'contacts/add',
    loadComponent: () => import('./contact/contact-add.component').then(m => m.ContactAddComponent),
    title: $localize`:@@contact.add.headline:Add Contact`
  },
  {
    path: 'contacts/edit/:contactId',
    loadComponent: () => import('./contact/contact-edit.component').then(m => m.ContactEditComponent),
    title: $localize`:@@contact.edit.headline:Edit Contact`
  },
  {
    path: 'opportunities',
    loadComponent: () => import('./opportunity/opportunity-list.component').then(m => m.OpportunityListComponent),
    title: $localize`:@@opportunity.list.headline:Opportunities`
  },
  {
    path: 'opportunities/add',
    loadComponent: () => import('./opportunity/opportunity-add.component').then(m => m.OpportunityAddComponent),
    title: $localize`:@@opportunity.add.headline:Add Opportunity`
  },
  {
    path: 'opportunities/edit/:opportunityId',
    loadComponent: () => import('./opportunity/opportunity-edit.component').then(m => m.OpportunityEditComponent),
    title: $localize`:@@opportunity.edit.headline:Edit Opportunity`
  },
  {
    path: 'activities',
    loadComponent: () => import('./activity/activity-list.component').then(m => m.ActivityListComponent),
    title: $localize`:@@activity.list.headline:Activities`
  },
  {
    path: 'activities/add',
    loadComponent: () => import('./activity/activity-add.component').then(m => m.ActivityAddComponent),
    title: $localize`:@@activity.add.headline:Add Activity`
  },
  {
    path: 'activities/edit/:activityId',
    loadComponent: () => import('./activity/activity-edit.component').then(m => m.ActivityEditComponent),
    title: $localize`:@@activity.edit.headline:Edit Activity`
  },
  {
    path: 'activityRelations',
    loadComponent: () => import('./activity-relation/activity-relation-list.component').then(m => m.ActivityRelationListComponent),
    title: $localize`:@@activityRelation.list.headline:Activity Relations`
  },
  {
    path: 'activityRelations/add',
    loadComponent: () => import('./activity-relation/activity-relation-add.component').then(m => m.ActivityRelationAddComponent),
    title: $localize`:@@activityRelation.add.headline:Add Activity Relation`
  },
  {
    path: 'activityRelations/edit/:id',
    loadComponent: () => import('./activity-relation/activity-relation-edit.component').then(m => m.ActivityRelationEditComponent),
    title: $localize`:@@activityRelation.edit.headline:Edit Activity Relation`
  },
  {
    path: 'memos',
    loadComponent: () => import('./memo/memo-list.component').then(m => m.MemoListComponent),
    title: $localize`:@@memo.list.headline:Memoes`
  },
  {
    path: 'memos/add',
    loadComponent: () => import('./memo/memo-add.component').then(m => m.MemoAddComponent),
    title: $localize`:@@memo.add.headline:Add Memo`
  },
  {
    path: 'memos/edit/:memoId',
    loadComponent: () => import('./memo/memo-edit.component').then(m => m.MemoEditComponent),
    title: $localize`:@@memo.edit.headline:Edit Memo`
  },
  {
    path: 'campaigns',
    loadComponent: () => import('./campaign/campaign-list.component').then(m => m.CampaignListComponent),
    title: $localize`:@@campaign.list.headline:Campaigns`
  },
  {
    path: 'campaigns/add',
    loadComponent: () => import('./campaign/campaign-add.component').then(m => m.CampaignAddComponent),
    title: $localize`:@@campaign.add.headline:Add Campaign`
  },
  {
    path: 'campaigns/edit/:campaignId',
    loadComponent: () => import('./campaign/campaign-edit.component').then(m => m.CampaignEditComponent),
    title: $localize`:@@campaign.edit.headline:Edit Campaign`
  },
  {
    path: 'products',
    loadComponent: () => import('./product/product-list.component').then(m => m.ProductListComponent),
    title: $localize`:@@product.list.headline:Products`
  },
  {
    path: 'products/add',
    loadComponent: () => import('./product/product-add.component').then(m => m.ProductAddComponent),
    title: $localize`:@@product.add.headline:Add Product`
  },
  {
    path: 'products/edit/:productId',
    loadComponent: () => import('./product/product-edit.component').then(m => m.ProductEditComponent),
    title: $localize`:@@product.edit.headline:Edit Product`
  },
  {
    path: 'error',
    loadComponent: () => import('./error/error.component').then(m => m.ErrorComponent),
    title: $localize`:@@error.page.headline:Error`
  },
  {
    path: '**',
    loadComponent: () => import('./error/error.component').then(m => m.ErrorComponent),
    title: $localize`:@@notFound.headline:Page not found`
  }
];
