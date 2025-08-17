import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { CampaignService } from 'app/campaign/campaign.service';
import { CampaignDTO } from 'app/campaign/campaign.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-campaign-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './campaign-add.component.html'
})
export class CampaignAddComponent implements OnInit {

  campaignService = inject(CampaignService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  ownerValues?: Record<string,string>;

  addForm = new FormGroup({
    campaignName: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    campaignType: new FormControl(null, [Validators.maxLength(50)]),
    startDate: new FormControl(null, [validOffsetDateTime]),
    endDate: new FormControl(null, [validOffsetDateTime]),
    status: new FormControl(null, [Validators.maxLength(20)]),
    owner: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@campaign.create.success:Campaign was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.campaignService.getOwnerValues()
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
    const data = new CampaignDTO(this.addForm.value);
    this.campaignService.createCampaign(data)
        .subscribe({
          next: () => this.router.navigate(['/campaigns'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
