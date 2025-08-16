import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { OpportunityProductService } from 'app/opportunity-product/opportunity-product.service';
import { OpportunityProductDTO } from 'app/opportunity-product/opportunity-product.model';


@Component({
  selector: 'app-opportunity-product-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './opportunity-product-list.component.html'})
export class OpportunityProductListComponent implements OnInit, OnDestroy {

  opportunityProductService = inject(OpportunityProductService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  opportunityProducts?: OpportunityProductDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@opportunityProduct.delete.success:Opportunity Product was removed successfully.`    };
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
    this.opportunityProductService.getAllOpportunityProducts()
        .subscribe({
          next: (data) => this.opportunityProducts = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(quantity: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.opportunityProductService.deleteOpportunityProduct(quantity)
        .subscribe({
          next: () => this.router.navigate(['/opportunityProducts'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
