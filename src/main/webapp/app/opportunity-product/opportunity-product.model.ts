export class OpportunityProductDTO {

  constructor(data:Partial<OpportunityProductDTO>) {
    Object.assign(this, data);
  }

  quantity?: number|null;
  price?: string|null;
  opportunity?: string|null;
  product?: string|null;

}
