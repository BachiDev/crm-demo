import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { ContactService } from 'app/contact/contact.service';
import { ContactDTO } from 'app/contact/contact.model';


@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './contact-list.component.html'})
export class ContactListComponent implements OnInit, OnDestroy {

  contactService = inject(ContactService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  contacts?: ContactDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@contact.delete.success:Contact was removed successfully.`,
      'contact.opportunity.contact.referenced': $localize`:@@contact.opportunity.contact.referenced:This entity is still referenced by Opportunity ${details?.id} via field Contact.`,
      'contact.activityRelation.contact.referenced': $localize`:@@contact.activityRelation.contact.referenced:This entity is still referenced by Activity Relation ${details?.id} via field Contact.`,
      'contact.campaignLead.contact.referenced': $localize`:@@contact.campaignLead.contact.referenced:This entity is still referenced by Campaign Lead ${details?.id} via field Contact.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }
  
  loadData() {
    this.contactService.getAllContacts()
        .subscribe({
          next: (data) => this.contacts = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(contactId: string) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.contactService.deleteContact(contactId)
        .subscribe({
          next: () => this.router.navigate(['/contacts'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/contacts'], {
                state: {
                  msgError: this.getMessage(messageParts[0], { id: messageParts[1] })
                }
              });
              return;
            }
            this.errorHandler.handleServerError(error.error)
          }
        });
  }

}
