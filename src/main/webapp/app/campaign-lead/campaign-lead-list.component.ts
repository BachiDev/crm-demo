import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { CampaignLeadService } from 'app/campaign-lead/campaign-lead.service';
import { CampaignLeadDTO } from 'app/campaign-lead/campaign-lead.model';


@Component({
  selector: 'app-campaign-lead-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './campaign-lead-list.component.html'})
export class CampaignLeadListComponent implements OnInit, OnDestroy {

  campaignLeadService = inject(CampaignLeadService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  campaignLeads?: CampaignLeadDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@campaignLead.delete.success:Campaign Lead was removed successfully.`    };
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
    this.campaignLeadService.getAllCampaignLeads()
        .subscribe({
          next: (data) => this.campaignLeads = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(status: string) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.campaignLeadService.deleteCampaignLead(status)
        .subscribe({
          next: () => this.router.navigate(['/campaignLeads'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
