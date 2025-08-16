import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { ProductService } from 'app/product/product.service';
import { ProductDTO } from 'app/product/product.model';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html'})
export class ProductListComponent implements OnInit, OnDestroy {

  productService = inject(ProductService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  products?: ProductDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@product.delete.success:Product was removed successfully.`,
      'product.opportunityProduct.product.referenced': $localize`:@@product.opportunityProduct.product.referenced:This entity is still referenced by Opportunity Product ${details?.id} via field Product.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }
  
  loadData() {
    this.productService.getAllProducts()
        .subscribe({
          next: (data) => this.products = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(productId: string) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.productService.deleteProduct(productId)
        .subscribe({
          next: () => this.router.navigate(['/products'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/products'], {
                state: {
                  msgError: this.getMessage(messageParts[0], { id: messageParts[1] })
                }
              });
              return;
            }
            this.errorHandler.handleServerError(error.error)
          }
        });
  }

}
