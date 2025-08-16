import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ActivityRelationService } from 'app/activity-relation/activity-relation.service';
import { ActivityRelationDTO } from 'app/activity-relation/activity-relation.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-activity-relation-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './activity-relation-add.component.html'
})
export class ActivityRelationAddComponent implements OnInit {

  activityRelationService = inject(ActivityRelationService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  activityValues?: Record<string,string>;
  accountValues?: Record<string,string>;
  contactValues?: Record<string,string>;
  opportunityValues?: Record<string,string>;

  addForm = new FormGroup({
    activity: new FormControl(null),
    account: new FormControl(null),
    contact: new FormControl(null),
    opportunity: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@activityRelation.create.success:Activity Relation was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
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
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new ActivityRelationDTO(this.addForm.value);
    this.activityRelationService.createActivityRelation(data)
        .subscribe({
          next: () => this.router.navigate(['/activityRelations'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
