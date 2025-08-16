import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { CampaignLeadService } from 'app/campaign-lead/campaign-lead.service';
import { CampaignLeadDTO } from 'app/campaign-lead/campaign-lead.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-campaign-lead-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './campaign-lead-edit.component.html'
})
export class CampaignLeadEditComponent implements OnInit {

  campaignLeadService = inject(CampaignLeadService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  campaignValues?: Record<string,string>;
  contactValues?: Record<string,string>;
  currentStatus?: string;

  editForm = new FormGroup({
    status: new FormControl({ value: null, disabled: true }),
    createdAt: new FormControl(null, [validOffsetDateTime]),
    campaign: new FormControl(null),
    contact: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@campaignLead.update.success:Campaign Lead was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentStatus = this.route.snapshot.params['status'];
    this.campaignLeadService.getCampaignValues()
        .subscribe({
          next: (data) => this.campaignValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.campaignLeadService.getContactValues()
        .subscribe({
          next: (data) => this.contactValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.campaignLeadService.getCampaignLead(this.currentStatus!)
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
    const data = new CampaignLeadDTO(this.editForm.value);
    this.campaignLeadService.updateCampaignLead(this.currentStatus!, data)
        .subscribe({
          next: () => this.router.navigate(['/campaignLeads'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
