import { Injectable, inject } from '@angular/core';
import { ApiClient } from 'app/common/api-client.injectable';
import { Page } from 'app/common/page.model';
import { ActivityRelationDTO } from 'app/activity-relation/activity-relation.model';


@Injectable({
  providedIn: 'root',
})
export class ActivityRelationService {

  api = inject(ApiClient);
  resourcePath = '/api/activityRelations';

  getAllActivityRelations() {
    return this.api.get<ActivityRelationDTO[]>(this.resourcePath);
  }

  getActivityRelationsPaged(page: number, size: number, q?: string) {
    return this.api.get<Page<ActivityRelationDTO>>(this.resourcePath + '/paged', q ? { page, size, q } : { page, size });
  }

  countActivityRelations() {
    return this.api.get<number>(this.resourcePath + '/count');
  }

  getActivityRelation(id: number) {
    return this.api.get<ActivityRelationDTO>(this.resourcePath + '/' + id);
  }

  createActivityRelation(activityRelationDTO: ActivityRelationDTO) {
    return this.api.post<number>(this.resourcePath, activityRelationDTO);
  }

  updateActivityRelation(id: number, activityRelationDTO: ActivityRelationDTO) {
    return this.api.put<number>(this.resourcePath + '/' + id, activityRelationDTO);
  }

  deleteActivityRelation(id: number) {
    return this.api.delete(this.resourcePath + '/' + id);
  }

  getActivityValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/activityValues');
  }

  getAccountValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/accountValues');
  }

  getContactValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/contactValues');
  }

  getOpportunityValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/opportunityValues');
  }

}
