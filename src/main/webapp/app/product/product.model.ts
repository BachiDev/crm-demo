export class ProductDTO {

  constructor(data:Partial<ProductDTO>) {
    Object.assign(this, data);
  }

  productId?: string|null;
  productName?: string|null;
  sku?: string|null;
  price?: string|null;
  description?: string|null;
  createdAt?: string|null;
  updatedAt?: string|null;

}
