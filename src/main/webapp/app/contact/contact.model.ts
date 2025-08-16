export class ContactDTO {

  constructor(data:Partial<ContactDTO>) {
    Object.assign(this, data);
  }

  contactId?: string|null;
  firstName?: string|null;
  lastName?: string|null;
  email?: string|null;
  phone?: string|null;
  jobTitle?: string|null;
  isLead?: boolean|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  metadata?: string|null;
  account?: string|null;
  owner?: string|null;

}
