import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { OpportunityProductService } from 'app/opportunity-product/opportunity-product.service';
import { OpportunityProductDTO } from 'app/opportunity-product/opportunity-product.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validNumeric } from 'app/common/utils';


@Component({
  selector: 'app-opportunity-product-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './opportunity-product-add.component.html'
})
export class OpportunityProductAddComponent implements OnInit {

  opportunityProductService = inject(OpportunityProductService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  opportunityValues?: Record<string,string>;
  productValues?: Record<string,string>;

  addForm = new FormGroup({
    price: new FormControl(null, [validNumeric(10, 2)]),
    opportunity: new FormControl(null),
    product: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@opportunityProduct.create.success:Opportunity Product was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.opportunityProductService.getOpportunityValues()
        .subscribe({
          next: (data) => this.opportunityValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.opportunityProductService.getProductValues()
        .subscribe({
          next: (data) => this.productValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new OpportunityProductDTO(this.addForm.value);
    this.opportunityProductService.createOpportunityProduct(data)
        .subscribe({
          next: () => this.router.navigate(['/opportunityProducts'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
