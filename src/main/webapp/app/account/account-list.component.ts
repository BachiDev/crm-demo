import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { AccountService } from 'app/account/account.service';
import { AccountDTO } from 'app/account/account.model';
import { PageHeaderComponent } from 'app/common/page-header/page-header.component';
import { PaginationComponent } from 'app/common/pagination/pagination.component';
import { ConfirmDialogComponent } from 'app/common/confirm-dialog/confirm-dialog.component';
import { EmptyStateComponent } from 'app/common/empty-state/empty-state.component';


@Component({
  selector: 'app-account-list',
  imports: [CommonModule, RouterLink, PageHeaderComponent, PaginationComponent, ConfirmDialogComponent, EmptyStateComponent],
  templateUrl: './account-list.component.html'})
export class AccountListComponent implements OnInit, OnDestroy {

  accountService = inject(AccountService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  accounts: AccountDTO[] = [];
  page = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements: number | null = null;
  loading = true;
  pendingDelete?: string;
  navigationSubscription?: Subscription;

  @ViewChild(ConfirmDialogComponent) private confirmDialog!: ConfirmDialogComponent;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
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
        this.page = 0;
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }

  loadData() {
    this.loading = true;
    this.accountService.getAccountsPaged(this.page, this.pageSize)
        .subscribe({
          next: (data) => {
            this.accounts = data.content;
            this.totalPages = data.totalPages;
            this.totalElements = data.totalElements;
            this.loading = false;
          },
          error: (error) => {
            this.loading = false;
            this.errorHandler.handleServerError(error.error);
          }
        });
  }

  onPage(next: number) {
    if (next < 0 || next >= this.totalPages) {
      return;
    }
    this.page = next;
    this.loadData();
  }

  onPageSize(size: number) {
    this.pageSize = size;
    this.page = 0;
    this.loadData();
  }

  shortId(id?: string | null): string {
    return id ? id.substring(0, 8) + '…' : '–';
  }

  requestDelete(accountId: string) {
    this.pendingDelete = accountId;
    this.confirmDialog.open();
  }

  deleteConfirmed() {
    const accountId = this.pendingDelete;
    if (!accountId) {
      return;
    }
    this.pendingDelete = undefined;
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
                  // New API sends a human-readable message directly; old key-based
                  // lookup kept as fallback.
                  msgError: this.getMessage(messageParts[0], { id: messageParts[1] }) ?? error.error.message
                }
              });
              return;
            }
            this.errorHandler.handleServerError(error.error)
          }
        });
  }

}
