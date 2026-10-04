import { Injectable, inject } from '@angular/core';
import { ApiClient } from 'app/common/api-client.injectable';
import { Page } from 'app/common/page.model';
import { ActivityDTO } from 'app/activity/activity.model';


@Injectable({
  providedIn: 'root',
})
export class ActivityService {

  api = inject(ApiClient);
  resourcePath = '/api/activities';

  getAllActivities() {
    return this.api.get<ActivityDTO[]>(this.resourcePath);
  }

  getActivitiesPaged(page: number, size: number) {
    return this.api.get<Page<ActivityDTO>>(this.resourcePath + '/paged', { page, size });
  }

  countActivities() {
    return this.api.get<number>(this.resourcePath + '/count');
  }

  getActivity(activityId: string) {
    return this.api.get<ActivityDTO>(this.resourcePath + '/' + activityId);
  }

  createActivity(activityDTO: ActivityDTO) {
    return this.api.post<string>(this.resourcePath, activityDTO);
  }

  updateActivity(activityId: string, activityDTO: ActivityDTO) {
    return this.api.put<string>(this.resourcePath + '/' + activityId, activityDTO);
  }

  deleteActivity(activityId: string) {
    return this.api.delete(this.resourcePath + '/' + activityId);
  }

  getOwnerValues() {
    return this.api.get<Record<string, string>>(this.resourcePath + '/ownerValues');
  }

}
