import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ContactService } from 'app/contact/contact.service';
import { ContactDTO } from 'app/contact/contact.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-contact-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './contact-edit.component.html'
})
export class ContactEditComponent implements OnInit {

  contactService = inject(ContactService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  accountValues?: Record<string,string>;
  ownerValues?: Record<string,string>;
  currentContactId?: string;

  editForm = new FormGroup({
    contactId: new FormControl({ value: null, disabled: true }),
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
      updated: $localize`:@@contact.update.success:Contact was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentContactId = this.route.snapshot.params['contactId'];
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
    this.contactService.getContact(this.currentContactId!)
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
    const data = new ContactDTO(this.editForm.value);
    this.contactService.updateContact(this.currentContactId!, data)
        .subscribe({
          next: () => this.router.navigate(['/contacts'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
