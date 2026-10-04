import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { ContactService } from 'app/contact/contact.service';
import { ContactDTO } from 'app/contact/contact.model';
import { PageHeaderComponent } from 'app/common/page-header/page-header.component';
import { PaginationComponent } from 'app/common/pagination/pagination.component';
import { ConfirmDialogComponent } from 'app/common/confirm-dialog/confirm-dialog.component';
import { EmptyStateComponent } from 'app/common/empty-state/empty-state.component';
import { SearchInputComponent } from 'app/common/search-input/search-input.component';
import { StatusPillComponent } from 'app/common/status-pill/status-pill.component';


@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, RouterLink, PageHeaderComponent, PaginationComponent, ConfirmDialogComponent, EmptyStateComponent, SearchInputComponent, StatusPillComponent],
  templateUrl: './contact-list.component.html'})
export class ContactListComponent implements OnInit, OnDestroy {

  contactService = inject(ContactService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  contacts: ContactDTO[] = [];
  page = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements: number | null = null;
  loading = true;
  q = '';
  pendingDelete?: string;
  navigationSubscription?: Subscription;

  @ViewChild(ConfirmDialogComponent) private confirmDialog!: ConfirmDialogComponent;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      deleted: $localize`:@@contact.delete.success:Contact was removed successfully.`,
      'contact.opportunity.contact.referenced': $localize`:@@contact.opportunity.contact.referenced:This entity is still referenced by Opportunity ${details?.id} via field Contact.`,
      'contact.activityRelation.contact.referenced': $localize`:@@contact.activityRelation.contact.referenced:This entity is still referenced by Activity Relation ${details?.id} via field Contact.`
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
    this.contactService.getContactsPaged(this.page, this.pageSize, this.q || undefined)
        .subscribe({
          next: (data) => {
            this.contacts = data.content;
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

  onSearch(query: string) {
    this.q = query;
    this.page = 0;
    this.loadData();
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

  requestDelete(contactId: string) {
    this.pendingDelete = contactId;
    this.confirmDialog.open();
  }

  deleteConfirmed() {
    const contactId = this.pendingDelete;
    if (!contactId) {
      return;
    }
    this.pendingDelete = undefined;
    this.contactService.deleteContact(contactId)
        .subscribe({
          next: () => this.router.navigate(['/contacts'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/contacts'], {
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
