import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { AccountService } from 'app/account/account.service';
import { AccountDTO } from 'app/account/account.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-account-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './account-add.component.html'
})
export class AccountAddComponent implements OnInit {

  accountService = inject(AccountService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  ownerValues?: Record<string,string>;

  addForm = new FormGroup({
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
      created: $localize`:@@account.create.success:Account was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.accountService.getOwnerValues()
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
    const data = new AccountDTO(this.addForm.value);
    this.accountService.createAccount(data)
        .subscribe({
          next: () => this.router.navigate(['/accounts'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
