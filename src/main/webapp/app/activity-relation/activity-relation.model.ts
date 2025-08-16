export class ActivityRelationDTO {

  constructor(data:Partial<ActivityRelationDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  activity?: string|null;
  account?: string|null;
  contact?: string|null;
  opportunity?: string|null;

}
