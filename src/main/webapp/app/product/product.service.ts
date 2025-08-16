import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ProductDTO } from 'app/product/product.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/products';

  getAllProducts() {
    return this.http.get<ProductDTO[]>(this.resourcePath);
  }

  getProduct(productId: string) {
    return this.http.get<ProductDTO>(this.resourcePath + '/' + productId);
  }

  createProduct(productDTO: ProductDTO) {
    return this.http.post<string>(this.resourcePath, productDTO);
  }

  updateProduct(productId: string, productDTO: ProductDTO) {
    return this.http.put<string>(this.resourcePath + '/' + productId, productDTO);
  }

  deleteProduct(productId: string) {
    return this.http.delete(this.resourcePath + '/' + productId);
  }

}
