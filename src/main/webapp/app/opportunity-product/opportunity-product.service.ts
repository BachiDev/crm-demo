import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { OpportunityProductDTO } from 'app/opportunity-product/opportunity-product.model';


@Injectable({
  providedIn: 'root',
})
export class OpportunityProductService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/opportunityProducts';

  getAllOpportunityProducts() {
    return this.http.get<OpportunityProductDTO[]>(this.resourcePath);
  }

  getOpportunityProduct(quantity: number) {
    return this.http.get<OpportunityProductDTO>(this.resourcePath + '/' + quantity);
  }

  createOpportunityProduct(opportunityProductDTO: OpportunityProductDTO) {
    return this.http.post<number>(this.resourcePath, opportunityProductDTO);
  }

  updateOpportunityProduct(quantity: number, opportunityProductDTO: OpportunityProductDTO) {
    return this.http.put<number>(this.resourcePath + '/' + quantity, opportunityProductDTO);
  }

  deleteOpportunityProduct(quantity: number) {
    return this.http.delete(this.resourcePath + '/' + quantity);
  }

  getOpportunityValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/opportunityValues');
  }

  getProductValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/productValues');
  }

}
