import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-backend-products',
  templateUrl: './backend-products.component.html',
  styleUrls: ['./backend-products.component.css']
})
export class BackendProductsComponent implements OnInit {
  products: Product[] = []
  page = 1

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      queryParams => {
        this.page =  Number(queryParams["page"]) || 1;
        this.productService.backend({page: this.page}).subscribe(
          result => {
            this.products = [...this.products, ...result.data]
          }
        )
      }
    )
  }

  loadMore(): void {
     this.page++;
    this.router.navigate([], {
      queryParams: {
        page: this.page
      },
      queryParamsHandling: 'merge'
    });
  }
}
