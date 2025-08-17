export class MemoDTO {

  constructor(data:Partial<MemoDTO>) {
    Object.assign(this, data);
  }

  memoId?: string|null;
  relatedToType?: string|null;
  relatedToId?: string|null;
  memoText?: string|null;
  user?: string|null;

}
