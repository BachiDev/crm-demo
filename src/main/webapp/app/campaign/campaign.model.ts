export class CampaignDTO {

  constructor(data:Partial<CampaignDTO>) {
    Object.assign(this, data);
  }

  campaignId?: string|null;
  campaignName?: string|null;
  campaignType?: string|null;
  startDate?: string|null;
  endDate?: string|null;
  status?: string|null;
  owner?: string|null;

}
