import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { ActivityRelationService } from 'app/activity-relation/activity-relation.service';
import { ActivityRelationDTO } from 'app/activity-relation/activity-relation.model';
import { PageHeaderComponent } from 'app/common/page-header/page-header.component';
import { PaginationComponent } from 'app/common/pagination/pagination.component';
import { ConfirmDialogComponent } from 'app/common/confirm-dialog/confirm-dialog.component';
import { EmptyStateComponent } from 'app/common/empty-state/empty-state.component';
import { SearchInputComponent } from 'app/common/search-input/search-input.component';


@Component({
  selector: 'app-activity-relation-list',
  imports: [CommonModule, RouterLink, PageHeaderComponent, PaginationComponent, ConfirmDialogComponent, EmptyStateComponent, SearchInputComponent],
  templateUrl: './activity-relation-list.component.html'})
export class ActivityRelationListComponent implements OnInit, OnDestroy {

  activityRelationService = inject(ActivityRelationService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  activityRelations: ActivityRelationDTO[] = [];
  page = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements: number | null = null;
  loading = true;
  q = '';
  pendingDelete?: number;
  navigationSubscription?: Subscription;

  @ViewChild(ConfirmDialogComponent) private confirmDialog!: ConfirmDialogComponent;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      deleted: $localize`:@@activityRelation.delete.success:Activity Relation was removed successfully.`
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
    this.activityRelationService.getActivityRelationsPaged(this.page, this.pageSize, this.q || undefined)
        .subscribe({
          next: (data) => {
            this.activityRelations = data.content;
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

  requestDelete(id: number) {
    this.pendingDelete = id;
    this.confirmDialog.open();
  }

  deleteConfirmed() {
    const id = this.pendingDelete;
    if (id === undefined) {
      return;
    }
    this.pendingDelete = undefined;
    this.activityRelationService.deleteActivityRelation(id)
        .subscribe({
          next: () => this.router.navigate(['/activityRelations'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
