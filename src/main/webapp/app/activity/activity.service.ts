import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ActivityDTO } from 'app/activity/activity.model';


@Injectable({
  providedIn: 'root',
})
export class ActivityService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/activities';

  getAllActivities() {
    return this.http.get<ActivityDTO[]>(this.resourcePath);
  }

  getActivity(activityId: string) {
    return this.http.get<ActivityDTO>(this.resourcePath + '/' + activityId);
  }

  createActivity(activityDTO: ActivityDTO) {
    return this.http.post<string>(this.resourcePath, activityDTO);
  }

  updateActivity(activityId: string, activityDTO: ActivityDTO) {
    return this.http.put<string>(this.resourcePath + '/' + activityId, activityDTO);
  }

  deleteActivity(activityId: string) {
    return this.http.delete(this.resourcePath + '/' + activityId);
  }

  getOwnerValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/ownerValues');
  }

}
