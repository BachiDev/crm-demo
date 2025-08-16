import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { OpportunityDTO } from 'app/opportunity/opportunity.model';


@Injectable({
  providedIn: 'root',
})
export class OpportunityService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/opportunities';

  getAllOpportunities() {
    return this.http.get<OpportunityDTO[]>(this.resourcePath);
  }

  getOpportunity(opportunityId: string) {
    return this.http.get<OpportunityDTO>(this.resourcePath + '/' + opportunityId);
  }

  createOpportunity(opportunityDTO: OpportunityDTO) {
    return this.http.post<string>(this.resourcePath, opportunityDTO);
  }

  updateOpportunity(opportunityId: string, opportunityDTO: OpportunityDTO) {
    return this.http.put<string>(this.resourcePath + '/' + opportunityId, opportunityDTO);
  }

  deleteOpportunity(opportunityId: string) {
    return this.http.delete(this.resourcePath + '/' + opportunityId);
  }

  getAccountValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/accountValues');
  }

  getContactValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/contactValues');
  }

  getOwnerValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/ownerValues');
  }

}
