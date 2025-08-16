import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ContactDTO } from 'app/contact/contact.model';


@Injectable({
  providedIn: 'root',
})
export class ContactService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/contacts';

  getAllContacts() {
    return this.http.get<ContactDTO[]>(this.resourcePath);
  }

  getContact(contactId: string) {
    return this.http.get<ContactDTO>(this.resourcePath + '/' + contactId);
  }

  createContact(contactDTO: ContactDTO) {
    return this.http.post<string>(this.resourcePath, contactDTO);
  }

  updateContact(contactId: string, contactDTO: ContactDTO) {
    return this.http.put<string>(this.resourcePath + '/' + contactId, contactDTO);
  }

  deleteContact(contactId: string) {
    return this.http.delete(this.resourcePath + '/' + contactId);
  }

  getAccountValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/accountValues');
  }

  getOwnerValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/ownerValues');
  }

}
