export class AccountDTO {

  constructor(data:Partial<AccountDTO>) {
    Object.assign(this, data);
  }

  accountId?: string|null;
  accountName?: string|null;
  industry?: string|null;
  website?: string|null;
  phone?: string|null;
  addressLine1?: string|null;
  city?: string|null;
  state?: string|null;
  postalCode?: string|null;
  country?: string|null;
  metadata?: string|null;
  owner?: string|null;

}
