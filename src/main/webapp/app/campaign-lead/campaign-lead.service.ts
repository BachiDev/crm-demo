import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CampaignLeadDTO } from 'app/campaign-lead/campaign-lead.model';


@Injectable({
  providedIn: 'root',
})
export class CampaignLeadService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/campaignLeads';

  getAllCampaignLeads() {
    return this.http.get<CampaignLeadDTO[]>(this.resourcePath);
  }

  getCampaignLead(status: string) {
    return this.http.get<CampaignLeadDTO>(this.resourcePath + '/' + status);
  }

  createCampaignLead(campaignLeadDTO: CampaignLeadDTO) {
    return this.http.post<string>(this.resourcePath, campaignLeadDTO);
  }

  updateCampaignLead(status: string, campaignLeadDTO: CampaignLeadDTO) {
    return this.http.put<string>(this.resourcePath + '/' + status, campaignLeadDTO);
  }

  deleteCampaignLead(status: string) {
    return this.http.delete(this.resourcePath + '/' + status);
  }

  getCampaignValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/campaignValues');
  }

  getContactValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/contactValues');
  }

}
