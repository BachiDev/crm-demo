import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { OpportunityProductService } from 'app/opportunity-product/opportunity-product.service';
import { OpportunityProductDTO } from 'app/opportunity-product/opportunity-product.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validNumeric } from 'app/common/utils';


@Component({
  selector: 'app-opportunity-product-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './opportunity-product-edit.component.html'
})
export class OpportunityProductEditComponent implements OnInit {

  opportunityProductService = inject(OpportunityProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  opportunityValues?: Record<string,string>;
  productValues?: Record<string,string>;
  currentQuantity?: number;

  editForm = new FormGroup({
    quantity: new FormControl({ value: null, disabled: true }),
    price: new FormControl(null, [validNumeric(10, 2)]),
    opportunity: new FormControl(null),
    product: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@opportunityProduct.update.success:Opportunity Product was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentQuantity = +this.route.snapshot.params['quantity'];
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
    this.opportunityProductService.getOpportunityProduct(this.currentQuantity!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new OpportunityProductDTO(this.editForm.value);
    this.opportunityProductService.updateOpportunityProduct(this.currentQuantity!, data)
        .subscribe({
          next: () => this.router.navigate(['/opportunityProducts'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
