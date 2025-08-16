import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { CampaignLeadService } from 'app/campaign-lead/campaign-lead.service';
import { CampaignLeadDTO } from 'app/campaign-lead/campaign-lead.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-campaign-lead-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './campaign-lead-add.component.html'
})
export class CampaignLeadAddComponent implements OnInit {

  campaignLeadService = inject(CampaignLeadService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  campaignValues?: Record<string,string>;
  contactValues?: Record<string,string>;

  addForm = new FormGroup({
    status: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    createdAt: new FormControl(null, [validOffsetDateTime]),
    campaign: new FormControl(null),
    contact: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@campaignLead.create.success:Campaign Lead was created successfully.`,
      CAMPAIGN_LEAD_STATUS_VALID: $localize`:@@Exists.campaignLead.status:This Status is already taken.`
    };
    return messages[key];
  }

  ngOnInit() {
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
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new CampaignLeadDTO(this.addForm.value);
    this.campaignLeadService.createCampaignLead(data)
        .subscribe({
          next: () => this.router.navigate(['/campaignLeads'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
