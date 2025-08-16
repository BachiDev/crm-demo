import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ActivityService } from 'app/activity/activity.service';
import { ActivityDTO } from 'app/activity/activity.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-activity-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './activity-add.component.html'
})
export class ActivityAddComponent implements OnInit {

  activityService = inject(ActivityService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  ownerValues?: Record<string,string>;

  addForm = new FormGroup({
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
      created: $localize`:@@activity.create.success:Activity was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.activityService.getOwnerValues()
        .subscribe({
          next: (data) => this.ownerValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new ActivityDTO(this.addForm.value);
    this.activityService.createActivity(data)
        .subscribe({
          next: () => this.router.navigate(['/activities'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
