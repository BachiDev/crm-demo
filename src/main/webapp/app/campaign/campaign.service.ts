import { Injectable, inject } from '@angular/core';
import { ApiClient } from 'app/common/api-client.injectable';
import { Page } from 'app/common/page.model';
import { CampaignDTO } from 'app/campaign/campaign.model';


@Injectable({
  providedIn: 'root',
})
export class CampaignService {

  api = inject(ApiClient);
  resourcePath = '/api/campaigns';

  getAllCampaigns() {
    return this.api.get<CampaignDTO[]>(this.resourcePath);
  }

  getCampaignsPaged(page: number, size: number) {
    return this.api.get<Page<CampaignDTO>>(this.resourcePath + '/paged', { page, size });
  }

  countCampaigns() {
    return this.api.get<number>(this.resourcePath + '/count');
  }

  getCampaign(campaignId: string) {
    return this.api.get<CampaignDTO>(this.resourcePath + '/' + campaignId);
  }

  createCampaign(campaignDTO: CampaignDTO) {
    return this.api.post<string>(this.resourcePath, campaignDTO);
  }

  updateCampaign(campaignId: string, campaignDTO: CampaignDTO) {
    return this.api.put<string>(this.resourcePath + '/' + campaignId, campaignDTO);
  }

  deleteCampaign(campaignId: string) {
    return this.api.delete(this.resourcePath + '/' + campaignId);
  }

  getOwnerValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/ownerValues');
  }

}
