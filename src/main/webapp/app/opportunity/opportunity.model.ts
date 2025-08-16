export class OpportunityDTO {

  constructor(data:Partial<OpportunityDTO>) {
    Object.assign(this, data);
  }

  opportunityId?: string|null;
  opportunityName?: string|null;
  amount?: string|null;
  stage?: string|null;
  closeDate?: string|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  account?: string|null;
  contact?: string|null;
  owner?: string|null;

}
