import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ActivityService } from 'app/activity/activity.service';
import { ActivityDTO } from 'app/activity/activity.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-activity-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './activity-edit.component.html'
})
export class ActivityEditComponent implements OnInit {

  activityService = inject(ActivityService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  ownerValues?: Record<string,string>;
  currentActivityId?: string;

  editForm = new FormGroup({
    activityId: new FormControl({ value: null, disabled: true }),
    activityType: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    subject: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    dueDate: new FormControl(null, [validOffsetDateTime]),
    status: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    createdAt: new FormControl(null, [validOffsetDateTime]),
    updatedAt: new FormControl(null, [validOffsetDateTime]),
    owner: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@activity.update.success:Activity was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentActivityId = this.route.snapshot.params['activityId'];
    this.activityService.getOwnerValues()
        .subscribe({
          next: (data) => this.ownerValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.activityService.getActivity(this.currentActivityId!)
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
    const data = new ActivityDTO(this.editForm.value);
    this.activityService.updateActivity(this.currentActivityId!, data)
        .subscribe({
          next: () => this.router.navigate(['/activities'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
