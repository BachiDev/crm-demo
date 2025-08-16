import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { AccountService } from 'app/account/account.service';
import { AccountDTO } from 'app/account/account.model';


@Component({
  selector: 'app-account-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './account-list.component.html'})
export class AccountListComponent implements OnInit, OnDestroy {

  accountService = inject(AccountService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  accounts?: AccountDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@account.delete.success:Account was removed successfully.`,
      'account.contact.account.referenced': $localize`:@@account.contact.account.referenced:This entity is still referenced by Contact ${details?.id} via field Account.`,
      'account.opportunity.account.referenced': $localize`:@@account.opportunity.account.referenced:This entity is still referenced by Opportunity ${details?.id} via field Account.`,
      'account.activityRelation.account.referenced': $localize`:@@account.activityRelation.account.referenced:This entity is still referenced by Activity Relation ${details?.id} via field Account.`
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
    this.accountService.getAllAccounts()
        .subscribe({
          next: (data) => this.accounts = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(accountId: string) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.accountService.deleteAccount(accountId)
        .subscribe({
          next: () => this.router.navigate(['/accounts'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/accounts'], {
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
