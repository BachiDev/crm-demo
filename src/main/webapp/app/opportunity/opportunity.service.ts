import { Injectable, inject } from '@angular/core';
import { ApiClient } from 'app/common/api-client.injectable';
import { Page } from 'app/common/page.model';
import { OpportunityDTO } from 'app/opportunity/opportunity.model';


@Injectable({
  providedIn: 'root',
})
export class OpportunityService {

  api = inject(ApiClient);
  resourcePath = '/api/opportunities';

  getAllOpportunities() {
    return this.api.get<OpportunityDTO[]>(this.resourcePath);
  }

  getOpportunitiesPaged(page: number, size: number, q?: string) {
    return this.api.get<Page<OpportunityDTO>>(this.resourcePath + '/paged', q ? { page, size, q } : { page, size });
  }

  countOpportunities() {
    return this.api.get<number>(this.resourcePath + '/count');
  }

  getOpportunity(opportunityId: string) {
    return this.api.get<OpportunityDTO>(this.resourcePath + '/' + opportunityId);
  }

  createOpportunity(opportunityDTO: OpportunityDTO) {
    return this.api.post<string>(this.resourcePath, opportunityDTO);
  }

  updateOpportunity(opportunityId: string, opportunityDTO: OpportunityDTO) {
    return this.api.put<string>(this.resourcePath + '/' + opportunityId, opportunityDTO);
  }

  deleteOpportunity(opportunityId: string) {
    return this.api.delete(this.resourcePath + '/' + opportunityId);
  }

  getAccountValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/accountValues');
  }

  getContactValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/contactValues');
  }

  getOwnerValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/ownerValues');
  }

}
