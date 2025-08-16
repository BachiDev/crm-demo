export class CampaignLeadDTO {

  constructor(data:Partial<CampaignLeadDTO>) {
    Object.assign(this, data);
  }

  status?: string|null;
  createdAt?: string|null;
  campaign?: string|null;
  contact?: string|null;

}
