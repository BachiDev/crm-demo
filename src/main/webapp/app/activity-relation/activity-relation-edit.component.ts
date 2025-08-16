import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ActivityRelationService } from 'app/activity-relation/activity-relation.service';
import { ActivityRelationDTO } from 'app/activity-relation/activity-relation.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-activity-relation-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './activity-relation-edit.component.html'
})
export class ActivityRelationEditComponent implements OnInit {

  activityRelationService = inject(ActivityRelationService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  activityValues?: Record<string,string>;
  accountValues?: Record<string,string>;
  contactValues?: Record<string,string>;
  opportunityValues?: Record<string,string>;
  currentId?: number;

  editForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    activity: new FormControl(null),
    account: new FormControl(null),
    contact: new FormControl(null),
    opportunity: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@activityRelation.update.success:Activity Relation was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentId = +this.route.snapshot.params['id'];
    this.activityRelationService.getActivityValues()
        .subscribe({
          next: (data) => this.activityValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.activityRelationService.getAccountValues()
        .subscribe({
          next: (data) => this.accountValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.activityRelationService.getContactValues()
        .subscribe({
          next: (data) => this.contactValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.activityRelationService.getOpportunityValues()
        .subscribe({
          next: (data) => this.opportunityValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.activityRelationService.getActivityRelation(this.currentId!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new ActivityRelationDTO(this.editForm.value);
    this.activityRelationService.updateActivityRelation(this.currentId!, data)
        .subscribe({
          next: () => this.router.navigate(['/activityRelations'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
