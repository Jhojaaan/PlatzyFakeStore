import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsRoutingModule } from './products-routing.module';
import { CardModule } from 'primeng/card';
import { ProductsService } from './shared/services/products.service';
import { PaginatorModule } from 'primeng/paginator';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProductsListComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CardModule,
    PaginatorModule,
    GalleriaModule,
    ButtonModule,
    SharedModule
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
