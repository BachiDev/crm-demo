import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CampaignDTO } from 'app/campaign/campaign.model';


@Injectable({
  providedIn: 'root',
})
export class CampaignService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/campaigns';

  getAllCampaigns() {
    return this.http.get<CampaignDTO[]>(this.resourcePath);
  }

  getCampaign(campaignId: string) {
    return this.http.get<CampaignDTO>(this.resourcePath + '/' + campaignId);
  }

  createCampaign(campaignDTO: CampaignDTO) {
    return this.http.post<string>(this.resourcePath, campaignDTO);
  }

  updateCampaign(campaignId: string, campaignDTO: CampaignDTO) {
    return this.http.put<string>(this.resourcePath + '/' + campaignId, campaignDTO);
  }

  deleteCampaign(campaignId: string) {
    return this.http.delete(this.resourcePath + '/' + campaignId);
  }

  getOwnerValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/ownerValues');
  }

}
