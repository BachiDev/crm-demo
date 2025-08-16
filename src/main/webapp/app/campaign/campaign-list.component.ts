import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { CampaignService } from 'app/campaign/campaign.service';
import { CampaignDTO } from 'app/campaign/campaign.model';


@Component({
  selector: 'app-campaign-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './campaign-list.component.html'})
export class CampaignListComponent implements OnInit, OnDestroy {

  campaignService = inject(CampaignService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  campaigns?: CampaignDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@campaign.delete.success:Campaign was removed successfully.`,
      'campaign.campaignLead.campaign.referenced': $localize`:@@campaign.campaignLead.campaign.referenced:This entity is still referenced by Campaign Lead ${details?.id} via field Campaign.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }
  
  loadData() {
    this.campaignService.getAllCampaigns()
        .subscribe({
          next: (data) => this.campaigns = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(campaignId: string) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.campaignService.deleteCampaign(campaignId)
        .subscribe({
          next: () => this.router.navigate(['/campaigns'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/campaigns'], {
                state: {
                  msgError: this.getMessage(messageParts[0], { id: messageParts[1] })
                }
              });
              return;
            }
            this.errorHandler.handleServerError(error.error)
          }
        });
  }

}
