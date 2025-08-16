import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ActivityRelationDTO } from 'app/activity-relation/activity-relation.model';


@Injectable({
  providedIn: 'root',
})
export class ActivityRelationService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/activityRelations';

  getAllActivityRelations() {
    return this.http.get<ActivityRelationDTO[]>(this.resourcePath);
  }

  getActivityRelation(id: number) {
    return this.http.get<ActivityRelationDTO>(this.resourcePath + '/' + id);
  }

  createActivityRelation(activityRelationDTO: ActivityRelationDTO) {
    return this.http.post<number>(this.resourcePath, activityRelationDTO);
  }

  updateActivityRelation(id: number, activityRelationDTO: ActivityRelationDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, activityRelationDTO);
  }

  deleteActivityRelation(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

  getActivityValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/activityValues');
  }

  getAccountValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/accountValues');
  }

  getContactValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/contactValues');
  }

  getOpportunityValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/opportunityValues');
  }

}
