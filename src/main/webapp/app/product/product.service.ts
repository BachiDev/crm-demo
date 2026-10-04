import { Injectable, inject } from '@angular/core';
import { ApiClient } from 'app/common/api-client.injectable';
import { Page } from 'app/common/page.model';
import { ProductDTO } from 'app/product/product.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  api = inject(ApiClient);
  resourcePath = '/api/products';

  getAllProducts() {
    return this.api.get<ProductDTO[]>(this.resourcePath);
  }

  getProductsPaged(page: number, size: number) {
    return this.api.get<Page<ProductDTO>>(this.resourcePath + '/paged', { page, size });
  }

  countProducts() {
    return this.api.get<number>(this.resourcePath + '/count');
  }

  getProduct(productId: string) {
    return this.api.get<ProductDTO>(this.resourcePath + '/' + productId);
  }

  createProduct(productDTO: ProductDTO) {
    return this.api.post<string>(this.resourcePath, productDTO);
  }

  updateProduct(productId: string, productDTO: ProductDTO) {
    return this.api.put<string>(this.resourcePath + '/' + productId, productDTO);
  }

  deleteProduct(productId: string) {
    return this.api.delete(this.resourcePath + '/' + productId);
  }

}
