import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ContactService } from 'app/contact/contact.service';
import { ContactDTO } from 'app/contact/contact.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-contact-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './contact-add.component.html'
})
export class ContactAddComponent implements OnInit {

  contactService = inject(ContactService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  accountValues?: Record<string,string>;
  ownerValues?: Record<string,string>;

  addForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.maxLength(100)]),
    phone: new FormControl(null, [Validators.maxLength(20)]),
    jobTitle: new FormControl(null, [Validators.maxLength(100)]),
    isLead: new FormControl(false),
    metadata: new FormControl(null),
    account: new FormControl(null),
    owner: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@contact.create.success:Contact was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.contactService.getAccountValues()
        .subscribe({
          next: (data) => this.accountValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.contactService.getOwnerValues()
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
    const data = new ContactDTO(this.addForm.value);
    this.contactService.createContact(data)
        .subscribe({
          next: () => this.router.navigate(['/contacts'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
