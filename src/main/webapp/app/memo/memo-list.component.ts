import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { MemoService } from 'app/memo/memo.service';
import { MemoDTO } from 'app/memo/memo.model';


@Component({
  selector: 'app-memo-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './memo-list.component.html'})
export class MemoListComponent implements OnInit, OnDestroy {

  memoService = inject(MemoService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  memoes?: MemoDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@memo.delete.success:Memo was removed successfully.`    };
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
    this.memoService.getAllMemoes()
        .subscribe({
          next: (data) => this.memoes = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(memoId: string) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.memoService.deleteMemo(memoId)
        .subscribe({
          next: () => this.router.navigate(['/memos'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
