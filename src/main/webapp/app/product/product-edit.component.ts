import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ProductService } from 'app/product/product.service';
import { ProductDTO } from 'app/product/product.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validNumeric, validOffsetDateTime } from 'app/common/utils';


@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {

  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  currentProductId?: string;

  editForm = new FormGroup({
    productId: new FormControl({ value: null, disabled: true }),
    productName: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    sku: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    price: new FormControl(null, [validNumeric(10, 2)]),
    description: new FormControl(null),
    createdAt: new FormControl(null, [validOffsetDateTime]),
    updatedAt: new FormControl(null, [validOffsetDateTime])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@product.update.success:Product was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentProductId = this.route.snapshot.params['productId'];
    this.productService.getProduct(this.currentProductId!)
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
    const data = new ProductDTO(this.editForm.value);
    this.productService.updateProduct(this.currentProductId!, data)
        .subscribe({
          next: () => this.router.navigate(['/products'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
