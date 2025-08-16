import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { OpportunityService } from 'app/opportunity/opportunity.service';
import { OpportunityDTO } from 'app/opportunity/opportunity.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validNumeric, validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-opportunity-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './opportunity-edit.component.html'
})
export class OpportunityEditComponent implements OnInit {

  opportunityService = inject(OpportunityService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  accountValues?: Record<string,string>;
  contactValues?: Record<string,string>;
  ownerValues?: Record<string,string>;
  currentOpportunityId?: string;

  editForm = new FormGroup({
    opportunityId: new FormControl({ value: null, disabled: true }),
    opportunityName: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    amount: new FormControl(null, [validNumeric(15, 2)]),
    stage: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    closeDate: new FormControl(null),
    createdAt: new FormControl(null, [validOffsetDateTime]),
    updatedAt: new FormControl(null, [validOffsetDateTime]),
    account: new FormControl(null),
    contact: new FormControl(null),
    owner: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@opportunity.update.success:Opportunity was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentOpportunityId = this.route.snapshot.params['opportunityId'];
    this.opportunityService.getAccountValues()
        .subscribe({
          next: (data) => this.accountValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.opportunityService.getContactValues()
        .subscribe({
          next: (data) => this.contactValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.opportunityService.getOwnerValues()
        .subscribe({
          next: (data) => this.ownerValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.opportunityService.getOpportunity(this.currentOpportunityId!)
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
    const data = new OpportunityDTO(this.editForm.value);
    this.opportunityService.updateOpportunity(this.currentOpportunityId!, data)
        .subscribe({
          next: () => this.router.navigate(['/opportunities'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
