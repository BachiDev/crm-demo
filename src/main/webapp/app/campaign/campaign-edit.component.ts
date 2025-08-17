import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { CampaignService } from 'app/campaign/campaign.service';
import { CampaignDTO } from 'app/campaign/campaign.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-campaign-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './campaign-edit.component.html'
})
export class CampaignEditComponent implements OnInit {

  campaignService = inject(CampaignService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  ownerValues?: Record<string,string>;
  currentCampaignId?: string;

  editForm = new FormGroup({
    campaignId: new FormControl({ value: null, disabled: true }),
    campaignName: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    campaignType: new FormControl(null, [Validators.maxLength(50)]),
    startDate: new FormControl(null, [validOffsetDateTime]),
    endDate: new FormControl(null, [validOffsetDateTime]),
    status: new FormControl(null, [Validators.maxLength(20)]),
    owner: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@campaign.update.success:Campaign was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentCampaignId = this.route.snapshot.params['campaignId'];
    this.campaignService.getOwnerValues()
        .subscribe({
          next: (data) => this.ownerValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.campaignService.getCampaign(this.currentCampaignId!)
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
    const data = new CampaignDTO(this.editForm.value);
    this.campaignService.updateCampaign(this.currentCampaignId!, data)
        .subscribe({
          next: () => this.router.navigate(['/campaigns'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
