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
  showButton = true

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams["page"] > this.page) {
      this.page = 0;
      this.loadMore();
    }

    this.route.queryParams.subscribe(
      queryParams => {
        this.page =  Number(queryParams["page"]) || 1;
        const s = queryParams["s"] || '';
        const sort = queryParams["sort"] || '';


        this.productService.backend({
          page: this.page,
          s,
          sort
        }).subscribe(
          result => {
            this.products = this.page === 1 ? result.data : [...this.products, ...result.data];
            this.showButton = Number(result.meta.last_page) !== this.page
          }
        )
      }
    )
  }

  loadMore(): void {
     this.page++;
    this.router.navigate([], {
      queryParams: {
        page: this.page,
      },
      queryParamsHandling: 'merge'
    });
  }

  search(s: KeyboardEvent): void {
    if (s.target) {
      const search =  (s.target as HTMLInputElement).value
      this.router.navigate([], {
        queryParams: {
          s: search,
          page: 1
        },
        queryParamsHandling: 'merge'
      });
    }
  }

  sort(event: Event): void {
    if (event.target) {
      const sort = (event.target as HTMLSelectElement).value;
      this.router.navigate([], {
        queryParams: {
          sort,
          page: 1
        },
        queryParamsHandling: 'merge'
      });
    }
  }
}
