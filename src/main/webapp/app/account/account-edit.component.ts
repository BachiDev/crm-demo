import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { AccountService } from 'app/account/account.service';
import { AccountDTO } from 'app/account/account.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-account-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './account-edit.component.html'
})
export class AccountEditComponent implements OnInit {

  accountService = inject(AccountService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  ownerValues?: Record<string,string>;
  currentAccountId?: string;

  editForm = new FormGroup({
    accountId: new FormControl({ value: null, disabled: true }),
    accountName: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    industry: new FormControl(null, [Validators.maxLength(100)]),
    website: new FormControl(null, [Validators.maxLength(255)]),
    phone: new FormControl(null, [Validators.maxLength(20)]),
    addressLine1: new FormControl(null, [Validators.maxLength(255)]),
    city: new FormControl(null, [Validators.maxLength(100)]),
    state: new FormControl(null, [Validators.maxLength(50)]),
    postalCode: new FormControl(null, [Validators.maxLength(20)]),
    country: new FormControl(null, [Validators.maxLength(100)]),
    createdAt: new FormControl(null, [validOffsetDateTime]),
    updatedAt: new FormControl(null, [validOffsetDateTime]),
    metadata: new FormControl(null),
    owner: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@account.update.success:Account was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentAccountId = this.route.snapshot.params['accountId'];
    this.accountService.getOwnerValues()
        .subscribe({
          next: (data) => this.ownerValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.accountService.getAccount(this.currentAccountId!)
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
    const data = new AccountDTO(this.editForm.value);
    this.accountService.updateAccount(this.currentAccountId!, data)
        .subscribe({
          next: () => this.router.navigate(['/accounts'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
