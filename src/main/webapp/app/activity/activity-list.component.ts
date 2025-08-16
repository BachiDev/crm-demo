import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { ActivityService } from 'app/activity/activity.service';
import { ActivityDTO } from 'app/activity/activity.model';


@Component({
  selector: 'app-activity-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './activity-list.component.html'})
export class ActivityListComponent implements OnInit, OnDestroy {

  activityService = inject(ActivityService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  activities?: ActivityDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@activity.delete.success:Activity was removed successfully.`,
      'activity.activityRelation.activity.referenced': $localize`:@@activity.activityRelation.activity.referenced:This entity is still referenced by Activity Relation ${details?.id} via field Activity.`
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
    this.activityService.getAllActivities()
        .subscribe({
          next: (data) => this.activities = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(activityId: string) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.activityService.deleteActivity(activityId)
        .subscribe({
          next: () => this.router.navigate(['/activities'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/activities'], {
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
