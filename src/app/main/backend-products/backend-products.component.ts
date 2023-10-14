import { Component, OnInit } from '@angular/core';

import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-backend-products',
  templateUrl: './backend-products.component.html',
  styleUrls: ['./backend-products.component.css']
})
export class BackendProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.productService.backend().subscribe(
      result => {
        this.products = result.data
      }
    )
  }
}
