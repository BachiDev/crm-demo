import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { UserService } from 'app/user/user.service';
import { UserDTO } from 'app/user/user.model';
import { PageHeaderComponent } from 'app/common/page-header/page-header.component';
import { PaginationComponent } from 'app/common/pagination/pagination.component';
import { ConfirmDialogComponent } from 'app/common/confirm-dialog/confirm-dialog.component';
import { EmptyStateComponent } from 'app/common/empty-state/empty-state.component';


@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterLink, PageHeaderComponent, PaginationComponent, ConfirmDialogComponent, EmptyStateComponent],
  templateUrl: './user-list.component.html'})
export class UserListComponent implements OnInit, OnDestroy {

  userService = inject(UserService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  users: UserDTO[] = [];
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
      deleted: $localize`:@@user.delete.success:User was removed successfully.`,
      'user.account.owner.referenced': $localize`:@@user.account.owner.referenced:This entity is still referenced by Account ${details?.id} via field Owner.`,
      'user.contact.owner.referenced': $localize`:@@user.contact.owner.referenced:This entity is still referenced by Contact ${details?.id} via field Owner.`,
      'user.opportunity.owner.referenced': $localize`:@@user.opportunity.owner.referenced:This entity is still referenced by Opportunity ${details?.id} via field Owner.`,
      'user.activity.owner.referenced': $localize`:@@user.activity.owner.referenced:This entity is still referenced by Activity ${details?.id} via field Owner.`,
      'user.memo.user.referenced': $localize`:@@user.memo.user.referenced:This entity is still referenced by Memo ${details?.id} via field User.`,
      'user.campaign.owner.referenced': $localize`:@@user.campaign.owner.referenced:This entity is still referenced by Campaign ${details?.id} via field Owner.`
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
    this.userService.getUsersPaged(this.page, this.pageSize)
        .subscribe({
          next: (data) => {
            this.users = data.content;
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

  requestDelete(userId: string) {
    this.pendingDelete = userId;
    this.confirmDialog.open();
  }

  deleteConfirmed() {
    const userId = this.pendingDelete;
    if (!userId) {
      return;
    }
    this.pendingDelete = undefined;
    this.userService.deleteUser(userId)
        .subscribe({
          next: () => this.router.navigate(['/users'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/users'], {
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
