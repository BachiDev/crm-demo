export class ActivityDTO {

  constructor(data:Partial<ActivityDTO>) {
    Object.assign(this, data);
  }

  activityId?: string|null;
  activityType?: string|null;
  subject?: string|null;
  dueDate?: string|null;
  status?: string|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  owner?: string|null;

}
