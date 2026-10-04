import { Injectable, inject } from '@angular/core';
import { ApiClient } from 'app/common/api-client.injectable';
import { Page } from 'app/common/page.model';
import { ContactDTO } from 'app/contact/contact.model';


@Injectable({
  providedIn: 'root',
})
export class ContactService {

  api = inject(ApiClient);
  resourcePath = '/api/contacts';

  getAllContacts() {
    return this.api.get<ContactDTO[]>(this.resourcePath);
  }

  getContactsPaged(page: number, size: number) {
    return this.api.get<Page<ContactDTO>>(this.resourcePath + '/paged', { page, size });
  }

  countContacts() {
    return this.api.get<number>(this.resourcePath + '/count');
  }

  getContact(contactId: string) {
    return this.api.get<ContactDTO>(this.resourcePath + '/' + contactId);
  }

  createContact(contactDTO: ContactDTO) {
    return this.api.post<string>(this.resourcePath, contactDTO);
  }

  updateContact(contactId: string, contactDTO: ContactDTO) {
    return this.api.put<string>(this.resourcePath + '/' + contactId, contactDTO);
  }

  deleteContact(contactId: string) {
    return this.api.delete(this.resourcePath + '/' + contactId);
  }

  getAccountValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/accountValues');
  }

  getOwnerValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/ownerValues');
  }

}
