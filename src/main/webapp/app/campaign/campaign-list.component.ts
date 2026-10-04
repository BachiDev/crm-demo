import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { CampaignService } from 'app/campaign/campaign.service';
import { CampaignDTO } from 'app/campaign/campaign.model';
import { PageHeaderComponent } from 'app/common/page-header/page-header.component';
import { PaginationComponent } from 'app/common/pagination/pagination.component';
import { ConfirmDialogComponent } from 'app/common/confirm-dialog/confirm-dialog.component';
import { EmptyStateComponent } from 'app/common/empty-state/empty-state.component';
import { SearchInputComponent } from 'app/common/search-input/search-input.component';
import { StatusPillComponent, PillTone } from 'app/common/status-pill/status-pill.component';


@Component({
  selector: 'app-campaign-list',
  imports: [CommonModule, RouterLink, PageHeaderComponent, PaginationComponent, ConfirmDialogComponent, EmptyStateComponent, SearchInputComponent, StatusPillComponent],
  templateUrl: './campaign-list.component.html'})
export class CampaignListComponent implements OnInit, OnDestroy {

  campaignService = inject(CampaignService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  campaigns: CampaignDTO[] = [];
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
      deleted: $localize`:@@campaign.delete.success:Campaign was removed successfully.`
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
    this.campaignService.getCampaignsPaged(this.page, this.pageSize, this.q || undefined)
        .subscribe({
          next: (data) => {
            this.campaigns = data.content;
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

  statusTone(status?: string | null): PillTone {
    switch ((status || '').toLowerCase()) {
      case 'active': return 'emerald';
      case 'planned': return 'sky';
      case 'paused': return 'amber';
      case 'completed': return 'violet';
      default: return 'zinc';
    }
  }

  requestDelete(campaignId: string) {
    this.pendingDelete = campaignId;
    this.confirmDialog.open();
  }

  deleteConfirmed() {
    const campaignId = this.pendingDelete;
    if (!campaignId) {
      return;
    }
    this.pendingDelete = undefined;
    this.campaignService.deleteCampaign(campaignId)
        .subscribe({
          next: () => this.router.navigate(['/campaigns'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
