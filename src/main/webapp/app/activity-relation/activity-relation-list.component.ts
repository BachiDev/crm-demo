import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { ActivityRelationService } from 'app/activity-relation/activity-relation.service';
import { ActivityRelationDTO } from 'app/activity-relation/activity-relation.model';


@Component({
  selector: 'app-activity-relation-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './activity-relation-list.component.html'})
export class ActivityRelationListComponent implements OnInit, OnDestroy {

  activityRelationService = inject(ActivityRelationService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  activityRelations?: ActivityRelationDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@activityRelation.delete.success:Activity Relation was removed successfully.`    };
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
    this.activityRelationService.getAllActivityRelations()
        .subscribe({
          next: (data) => this.activityRelations = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
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
