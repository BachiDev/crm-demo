import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { OpportunityService } from 'app/opportunity/opportunity.service';
import { OpportunityDTO } from 'app/opportunity/opportunity.model';


@Component({
  selector: 'app-opportunity-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './opportunity-list.component.html'})
export class OpportunityListComponent implements OnInit, OnDestroy {

  opportunityService = inject(OpportunityService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  opportunities?: OpportunityDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@opportunity.delete.success:Opportunity was removed successfully.`,
      'opportunity.activityRelation.opportunity.referenced': $localize`:@@opportunity.activityRelation.opportunity.referenced:This entity is still referenced by Activity Relation ${details?.id} via field Opportunity.`,
      'opportunity.opportunityProduct.opportunity.referenced': $localize`:@@opportunity.opportunityProduct.opportunity.referenced:This entity is still referenced by Opportunity Product ${details?.id} via field Opportunity.`
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
    this.opportunityService.getAllOpportunities()
        .subscribe({
          next: (data) => this.opportunities = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(opportunityId: string) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.opportunityService.deleteOpportunity(opportunityId)
        .subscribe({
          next: () => this.router.navigate(['/opportunities'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/opportunities'], {
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
