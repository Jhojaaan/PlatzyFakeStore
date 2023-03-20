import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Image } from '../../shared/interfaces/images.interface';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  private productId!: number;
  public product!: Product;
  public images!: Image[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productsService: ProductsService
  ) {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
      },
    });
  }

  ngOnInit(): void {
    this.getProductDetail();
  }

  private getProductDetail(): void {
    this.productsService
      .getProductDetail(this.productId)
      .pipe(
        tap((product: Product) => {
          this.images = this.getImages(product.images);
        })
      )
      .subscribe({
        next: (product: Product) => {
          this.product = product;
        },
      });
  }

  private getImages(images: string[]): Image[] {
    return images.map((image, i) => {
      return { url: image, alt: `Product Image ${i + 1}` };
    });
  }
}
